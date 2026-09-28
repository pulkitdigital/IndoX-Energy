import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ImageSlotKey } from "@/content/images";
import { blogIndex } from "@/content/blog-ui";
import { formatPostDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import ImageSlot from "@/components/ui/ImageSlot";

export type BlogCardPost = {
  href: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: ImageSlotKey;
  /** Shown as "N min read" when present (blog listing). */
  readingMinutes?: number;
};

/**
 * Article card with a fixed 16:9 image (object-cover), same look as the Home blog cards.
 * Used on /blog/ (grid, related articles) and /thank-you/. Hover: hv-card lift, image zoom, arrows.
 * `excerptLines` clamps the excerpt so cards in a grid stay the same height.
 */
export default function BlogCard({ post, readMore, excerptLines = 3 }: { post: BlogCardPost; readMore: string; excerptLines?: 2 | 3 }) {
  return (
    <Link href={post.href} data-cursor="view" className="hv-card flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-border">
        <ImageSlot slot={post.image} fill framed={false} />
        <span className="hv-arrow-in absolute top-3 right-3 grid size-8 place-items-center rounded-md bg-background text-link">
          <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="label-caps flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
          <span className="text-foreground">{post.category}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.readingMinutes ? (
            <>
              <span aria-hidden="true">/</span>
              <span>{blogIndex.readTime(post.readingMinutes)}</span>
            </>
          ) : null}
        </p>
        <h3 className="mt-3 text-lg">{post.title}</h3>
        <p className={cn("mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground", excerptLines === 2 ? "line-clamp-2 min-h-[3.25em]" : "line-clamp-3")}>
          {post.excerpt}
        </p>
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-link">
          {readMore}
          <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
