import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleCopy } from "@/content/blog-ui";

/** In-article CTA (PRD §8.10): card after the 2nd H2 section, linking to the post's relatedLink. */
export default function InArticleCTA({ href, label }: { href: string; label: string }) {
  const { cta } = articleCopy;
  return (
    <aside className="my-12">
      <Link href={href} className="hv-card group flex flex-col gap-4 rounded-lg border border-border bg-elevated p-6 sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="label-caps block text-accent">{cta.eyebrow}</span>
          <span className="mt-2 block font-heading text-xl font-bold text-heading">{label}</span>
          <span className="mt-1 block text-[0.9375rem] text-muted-foreground">{cta.text}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-link">
          {cta.action}
          <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </Link>
    </aside>
  );
}
