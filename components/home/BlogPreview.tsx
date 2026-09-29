import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getAllPosts, type Post } from "@/lib/blog";
import { ROUTES, blogHref } from "@/content/navigation";
import { blogIntro, blogLabels } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import ImageSlot from "@/components/ui/ImageSlot";
import { REVEAL } from "@/lib/motion";

const formatDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

function Meta({ post }: { post: Post }) {
  return (
    <p className="label-caps flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
      <span className="text-foreground">{post.category}</span>
      <span aria-hidden="true">/</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
    </p>
  );
}

/**
 * Latest from the blog — first 3 posts from lib/blog.ts (build time) as three identical cards: fixed 16:9 image
 * (object-cover), equal heights. Hover: lift, border change, arrow slides in, image zooms.
 */
export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  // Hover system: hv-card (lift 4px + accent border), image zoom, corner arrow slides in, "Read" arrow nudges.
  const arrow = <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />;
  const corner = (
    <span className="hv-arrow-in absolute top-3 right-3 grid size-8 place-items-center rounded-md bg-background text-link">
      <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
    </span>
  );

  return (
    <section aria-labelledby="blog-title" className="section-y border-y border-border bg-elevated">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="blog-title" {...blogIntro} />
          <ScrollReveal className="shrink-0">
            <CtaLink href={ROUTES.blog} variant="outline" arrow>
              {blogLabels.viewAll}
            </CtaLink>
          </ScrollReveal>
        </div>

        <ul className="mt-14 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <ScrollReveal delay={i * REVEAL.stagger} className="h-full">
                <Link href={blogHref(post.slug)} data-cursor="view" className="hv-card flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                  <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-border">
                    <ImageSlot slot={post.heroImage} fill framed={false} />
                    {corner}
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <Meta post={post} />
                    <h3 className="mt-3 text-lg">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-link">
                      {blogLabels.readMore}
                      {arrow}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
