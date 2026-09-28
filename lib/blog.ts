import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isImageSlotKey, type ImageSlotKey } from "@/content/images";
import { slugify, stripInlineMarkdown } from "@/lib/slug";

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

export type Heading = { level: 2 | 3; text: string; id: string };

export type Post = PostFrontmatter & {
  body: string;
  /** Reading time in whole minutes (word count ÷ WORDS_PER_MINUTE, at least 1). */
  readingMinutes: number;
  /** H2 / H3 outline for the table of contents; ids match the rendered headings (lib/slug.ts). */
  headings: Heading[];
};

const WORDS_PER_MINUTE = 200;
/** Handles files saved with Windows (CRLF) or Unix (LF) line endings. */
const NEWLINE = /\r?\n/;

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

/** Word count of the prose (JSX tags and markdown symbols ignored). */
function readingMinutes(body: string): number {
  const words = body
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|\[\]()-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** H2 / H3 lines outside code fences. Duplicate ids fail the build (the TOC would jump to the wrong heading). */
function extractHeadings(body: string, file: string): Heading[] {
  let inFence = false;
  const headings: Heading[] = [];
  for (const line of body.split(NEWLINE)) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    const match = !inFence && /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = stripInlineMarkdown(match[2]);
    headings.push({ level: match[1].length as 2 | 3, text, id: slugify(text) });
  }
  const seen = new Set<string>();
  for (const heading of headings) {
    if (seen.has(heading.id)) throw new Error(`content/blog/${file}: duplicate heading id "${heading.id}" — make the heading text unique`);
    seen.add(heading.id);
  }
  return headings;
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
      const frontmatter = parseFrontmatter(data, file);
      if (`${frontmatter.slug}.mdx` !== file) throw new Error(`content/blog/${file}: slug "${frontmatter.slug}" must match the file name`);
      const body = content.trim();
      return { ...frontmatter, body, readingMinutes: readingMinutes(body), headings: extractHeadings(body, file) };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Splits an article after its Nth H2 section (for the in-article CTA): [before, after].
 * With fewer sections, everything is "before" and the CTA follows the body.
 */
export function splitAfterSection(body: string, sections = 2): [string, string] {
  const lines = body.split(NEWLINE);
  let inFence = false;
  let h2 = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("```")) inFence = !inFence;
    if (!inFence && /^##\s+/.test(lines[i]) && ++h2 === sections + 1) return [lines.slice(0, i).join("\n"), lines.slice(i).join("\n")];
  }
  return [body, ""];
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
