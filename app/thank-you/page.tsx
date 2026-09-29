import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { thankYou as copy } from "@/content/common";
import { ROUTES, blogHref } from "@/content/navigation";
import ThankYouContent from "@/components/forms/ThankYouContent";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...copy.seo, path: ROUTES.thankYou, noindex: true });
}

/**
 * Thank-you (PRD §8.12) — noindex, never in the sitemap. The body is client-side (lead summary lives in
 * sessionStorage); posts are read at build time and passed down so related articles can match the request.
 */
export default function ThankYouPage() {
  const posts = getAllPosts().map((post) => ({
    key: post.slug,
    href: blogHref(post.slug),
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    image: post.heroImage,
  }));
  return <ThankYouContent posts={posts} />;
}
