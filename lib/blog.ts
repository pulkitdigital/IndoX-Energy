import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isImageSlotKey, type ImageSlotKey } from "@/content/images";

/**
 * Build-time blog reader (TRD §4). Reads content/blog/*.mdx with gray-matter.
 * Server-only: runs during `next build`; nothing touches the filesystem at runtime.
 */

export const BLOG_CATEGORIES = ["Fuel Management", "Diesel Supply", "Storage & Safety", "EV Charging", "Industry Guides", "Company News"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type PostFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO date */
  date: string;
  author: { name: string; role: string; photo?: string };
  heroImage: ImageSlotKey;
  featured?: boolean;
  /** In-article CTA target */
  relatedLink: { label: string; href: string };
};

export type Post = PostFrontmatter & { body: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function str(data: Record<string, unknown>, key: string, file: string): string {
  const value = data[key];
  // gray-matter parses unquoted ISO dates as Date objects.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value !== "string" || !value.trim()) throw new Error(`content/blog/${file}: frontmatter "${key}" must be a non-empty string`);
  return value;
}

/** Validates frontmatter so a malformed post fails the build instead of rendering broken. */
function parseFrontmatter(data: Record<string, unknown>, file: string): PostFrontmatter {
  const category = str(data, "category", file);
  if (!(BLOG_CATEGORIES as readonly string[]).includes(category)) throw new Error(`content/blog/${file}: unknown category "${category}"`);

  const heroImage = str(data, "heroImage", file);
  if (!isImageSlotKey(heroImage)) throw new Error(`content/blog/${file}: heroImage "${heroImage}" is not a slot in content/images.ts`);

  const author = data.author;
  const related = data.relatedLink;
  if (!isRecord(author) || !isRecord(related)) throw new Error(`content/blog/${file}: author and relatedLink are required`);

  return {
    title: str(data, "title", file),
    slug: str(data, "slug", file),
    excerpt: str(data, "excerpt", file),
    category: category as BlogCategory,
    date: str(data, "date", file),
    author: {
      name: str(author, "name", file),
      role: str(author, "role", file),
      ...(typeof author.photo === "string" ? { photo: author.photo } : {}),
    },
    heroImage,
    featured: data.featured === true,
    relatedLink: { label: str(related, "label", file), href: str(related, "href", file) },
  };
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
      return { ...parseFrontmatter(data, file), body: content.trim() };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
