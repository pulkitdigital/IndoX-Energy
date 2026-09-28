import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/company";
import { blogHref, sitemapRoutes } from "@/content/navigation";
import { getAllPosts } from "@/lib/blog";

// Static export: emit /sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Articles are read from content/blog/ at build time (lib/blog.ts uses fs, so they can't live in navigation.ts).
  const routes = [...sitemapRoutes, ...getAllPosts().map((post) => blogHref(post.slug))];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "/" || route === "/blog/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").filter(Boolean).length === 1 ? 0.8 : 0.6,
  }));
}
