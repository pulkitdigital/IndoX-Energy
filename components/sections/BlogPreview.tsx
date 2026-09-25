import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES, blogHref } from "@/lib/constants";
import type { IconName } from "@/lib/icons";
import { blogMeta, type BlogCategory, type BlogMeta } from "@/content/blog-meta";
import { blogIntro, blogPreviewLabels, type SectionIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import Icon from "@/components/ui/Icon";
import ImageSlot from "@/components/ui/ImageSlot";
import SpecLabel from "@/components/ui/SpecLabel";

const CATEGORY_ICON: Record<BlogCategory, IconName> = {
  "Loss Prevention": "shieldCheck",
  "Fuel Delivery": "truck",
  Technology: "cpu",
  "Fuel Types": "droplets",
  "EV Charging": "plugZap",
  Safety: "badgeCheck",
};

type BlogPreviewProps = {
  posts?: BlogMeta[];
  intro?: SectionIntro;
};

/**
 * Latest articles: one featured article (large, left) + the next two as compact horizontal rows (right).
 * Articles without a cover slot get a quiet code-drawn cover.
 */
export default function BlogPreview({ posts = blogMeta.slice(0, 3), intro = blogIntro }: BlogPreviewProps) {
  const [featured, ...rest] = posts;
  if (!featured) return null;

  const cover = (post: BlogMeta, className: string) =>
    post.image ? (
      <div className={cn("relative overflow-hidden border-border", className)}>
        <ImageSlot slot={post.image} fill framed={false} parallax />
      </div>
    ) : (
      <div aria-hidden="true" className={cn("relative grid place-items-center overflow-hidden border-border bg-elevated", className)}>
        <Icon name={CATEGORY_ICON[post.category]} className="size-7 text-link" />
      </div>
    );

  return (
    <section aria-labelledby="blog-title" className="section-y border-t border-border">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="blog-title" {...intro} />
          <ScrollReveal className="shrink-0">
            <CtaLink href={ROUTES.blog} variant="outline" arrow>
              {blogPreviewLabels.viewAll}
            </CtaLink>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <Link
              href={blogHref(featured.slug)}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-card"
            >
              {cover(featured, "aspect-[16/9] border-b")}
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <SpecLabel>{featured.category}</SpecLabel>
                <h3 className="mt-5 text-2xl leading-tight font-bold text-balance transition-colors group-hover:text-link sm:text-3xl">{featured.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-link">
                  {blogPreviewLabels.readMore}
                  <ArrowRight className="size-4 -translate-x-2 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </ScrollReveal>

          <ul className="grid gap-5 lg:col-span-5">
            {rest.map((post, i) => (
              <li key={post.slug}>
                <ScrollReveal delay={0.08 + i * 0.08} className="h-full">
                  <Link
                    href={blogHref(post.slug)}
                    className="group grid h-full overflow-hidden rounded-lg border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-card sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
                  >
                    {cover(post, "aspect-[16/9] border-b sm:aspect-auto sm:border-r sm:border-b-0")}
                    <div className="flex flex-col p-6">
                      <SpecLabel>{post.category}</SpecLabel>
                      <h3 className="mt-4 text-lg leading-snug font-bold text-balance transition-colors group-hover:text-link">{post.title}</h3>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-link">
                        {blogPreviewLabels.readMore}
                        <ArrowRight className="size-4 -translate-x-2 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
