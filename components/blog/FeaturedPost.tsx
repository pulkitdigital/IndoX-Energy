import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogIndex } from "@/content/blog-ui";
import { formatPostDate } from "@/lib/format";
import ImageSlot from "@/components/ui/ImageSlot";
import type { BlogCardPost } from "@/components/blog/BlogCard";

/** Featured article across the top of /blog/ (PRD §8.9): same 16:9 image box as every blog card, text beside it. */
export default function FeaturedPost({ post }: { post: BlogCardPost }) {
  return (
    <Link href={post.href} data-cursor="view" className="hv-card grid overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-2">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border lg:border-r lg:border-b-0">
        <ImageSlot slot={post.image} fill framed={false} priority />
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <p className="label-caps flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
          <span className="text-link">{blogIndex.featured}</span>
          <span aria-hidden="true">/</span>
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
        <h2 className="mt-4 text-2xl sm:text-3xl">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-[1.0625rem] leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-link">
          {blogIndex.readMore}
          <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
