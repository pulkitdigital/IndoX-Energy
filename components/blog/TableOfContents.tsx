"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MQ } from "@/lib/motion";
import type { Heading } from "@/lib/blog";
import { articleCopy } from "@/content/blog-ui";
import { useLenis } from "@/components/animations/SmoothScrollProvider";

/** Headings count as "current" once their top passes this line (px from the viewport top, below the fixed header). */
const SPY_OFFSET = 140;

/**
 * Table of contents from the article's H2 / H3 (ids from lib/slug.ts). Desktop: sticky list on the left with
 * scroll-spy (the heading you are reading is highlighted). Mobile: a collapsible <details> above the body.
 * Clicking scrolls to the heading below the fixed header (Lenis when active, instant under reduced motion).
 */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const lenis = useLenis();
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0]?.id ?? "";
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) current = heading.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    const offset = (document.querySelector("header")?.getBoundingClientRect().height ?? 0) + 24;
    if (lenis) lenis.scrollTo(el, { offset: -offset });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: window.matchMedia(MQ.reduced).matches ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
    const details = event.currentTarget.closest("details");
    if (details) details.open = false;
  };

  const list = (
    <ol className="grid gap-1 border-l border-border">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={(event) => go(event, heading.id)}
            aria-current={active === heading.id ? "location" : undefined}
            className={cn(
              "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors",
              heading.level === 3 ? "pl-7" : "pl-4",
              active === heading.id ? "border-accent font-semibold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* Mobile / tablet: collapsible */}
      <details className="group rounded-lg border border-border bg-card lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-heading font-bold text-heading [&::-webkit-details-marker]:hidden">
          {articleCopy.toc}
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" strokeWidth={1.5} aria-hidden="true" />
        </summary>
        <nav aria-label={articleCopy.toc} className="px-5 pb-5">
          {list}
        </nav>
      </details>

      {/* Desktop: sticky */}
      <nav aria-label={articleCopy.toc} className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block" data-lenis-prevent>
        <p className="label-caps mb-4 text-muted-foreground">{articleCopy.toc}</p>
        {list}
      </nav>
    </>
  );
}
