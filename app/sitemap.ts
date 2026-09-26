import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/company";
import { sitemapRoutes } from "@/content/navigation";

// Static export: emit /sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "/" || route === "/blog/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").filter(Boolean).length === 1 ? 0.8 : 0.6,
  }));
}
