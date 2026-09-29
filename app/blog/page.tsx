import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BLOG_CATEGORIES, getAllPosts } from "@/lib/blog";
import { blogIndex, newsletterCopy } from "@/content/blog-ui";
import { ROUTES, blogHref } from "@/content/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import BlogGrid, { type GridPost } from "@/components/blog/BlogGrid";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import DottedField from "@/components/decor/DottedField";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...blogIndex.seo, path: ROUTES.blog });
}

/**
 * Blog listing (PRD §8.9): hero + search → category chips → featured post → grid (pagination after 9) →
 * newsletter band → quote band. Posts are read at build time; filtering runs client-side in BlogGrid.
 */
export default function BlogPage() {
  const posts: GridPost[] = getAllPosts().map((post) => ({
    slug: post.slug,
    href: blogHref(post.slug),
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    image: post.heroImage,
    readingMinutes: post.readingMinutes,
    featured: Boolean(post.featured),
  }));

  return (
    <>
      <section aria-labelledby="blog-hero-title" className="pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Blog", href: ROUTES.blog },
            ]}
          />
          <ScrollReveal className="mt-10 max-w-3xl">
            <Eyebrow index="00" label={blogIndex.hero.eyebrow} />
            <h1 id="blog-hero-title" className="text-display mt-6">
              {blogIndex.hero.title}
            </h1>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">{blogIndex.hero.intro}</p>
          </ScrollReveal>
          <div className="mt-10">
            <BlogGrid posts={posts} categories={BLOG_CATEGORIES} />
          </div>
        </div>
      </section>

      <section aria-labelledby="newsletter-title" className="relative isolate section-y border-y border-border bg-elevated">
        <DottedField side="right" />
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading
            id="newsletter-title"
            index={newsletterCopy.index}
            eyebrow={newsletterCopy.eyebrow}
            title={newsletterCopy.title}
            description={newsletterCopy.description}
            className="lg:col-span-6"
          />
          <ScrollReveal className="lg:col-span-6">
            <NewsletterForm />
          </ScrollReveal>
        </div>
      </section>

      <QuoteCTABand index="03" />
    </>
  );
}
