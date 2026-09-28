"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { REVEAL } from "@/lib/motion";
import { blogIndex as copy } from "@/content/blog-ui";
import ScrollReveal from "@/components/animations/ScrollReveal";
import BlogCard, { type BlogCardPost } from "@/components/blog/BlogCard";
import FeaturedPost from "@/components/blog/FeaturedPost";

export type GridPost = BlogCardPost & { slug: string; featured: boolean };

const PER_PAGE = 9;
type Filters = { q: string; category: string; page: number };
const EMPTY: Filters = { q: "", category: "", page: 1 };

function readUrl(categories: readonly string[]): Filters {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") ?? "";
  const page = Number.parseInt(params.get("page") ?? "1", 10);
  return { q: params.get("q") ?? "", category: categories.includes(category) ? category : "", page: Number.isFinite(page) && page > 0 ? page : 1 };
}

function writeUrl({ q, category, page }: Filters) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

/**
 * /blog/ listing (PRD §8.9), client-side over build-time data: search box, category chips (All + every category,
 * even empty ones), featured card (default view only), grid of identical cards (3 / 2 / 1 columns, 16:9 images,
 * 2-line excerpts), pagination after 9 posts (hidden otherwise) and a "No articles found" state.
 * State lives in the URL (?q=&category=&page=) so filtered views can be shared; SSR shows the unfiltered page 1.
 */
export default function BlogGrid({ posts, categories }: { posts: GridPost[]; categories: readonly string[] }) {
  const uid = useId();
  const [filters, setFilters] = useState<Filters>(EMPTY);

  useEffect(() => {
    setFilters(readUrl(categories));
    const onPop = () => setFilters(readUrl(categories));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [categories]);

  const update = useCallback((next: Partial<Filters>) => {
    setFilters((current) => {
      const merged = { ...current, ...next };
      writeUrl(merged);
      return merged;
    });
  }, []);

  const { q, category, page } = filters;
  const query = q.trim().toLowerCase();
  const defaultView = !query && !category;
  const featured = defaultView ? posts.find((post) => post.featured) : undefined;

  const matches = useMemo(
    () =>
      posts.filter(
        (post) =>
          (!category || post.category === category) &&
          (!query || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(query)),
      ),
    [posts, category, query],
  );
  const listed = featured ? matches.filter((post) => post.slug !== featured.slug) : matches;
  const pages = Math.max(1, Math.ceil(listed.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = listed.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, posts.filter((p) => p.category === c).length])), [categories, posts]);

  const chip = (active: boolean) =>
    cn(
      "hv-chip inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium",
      active ? "border-accent bg-card text-foreground" : "border-border bg-background text-muted-foreground",
    );

  return (
    <div>
      {/* Search */}
      <form role="search" onSubmit={(event) => event.preventDefault()} className="max-w-xl">
        <label htmlFor={`${uid}-q`} className="sr-only">
          {copy.search.label}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
          <input
            id={`${uid}-q`}
            type="search"
            value={q}
            onChange={(event) => update({ q: event.target.value, page: 1 })}
            placeholder={copy.search.placeholder}
            className="h-12 w-full rounded-md border border-border-strong bg-card pr-4 pl-11 text-[0.9375rem] text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </form>

      {/* Category chips */}
      <div role="group" aria-label={copy.categoriesLabel} className="mt-6 flex flex-wrap gap-2">
        <button type="button" aria-pressed={!category} onClick={() => update({ category: "", page: 1 })} className={chip(!category)}>
          {copy.all}
          <span className="label-caps text-muted-foreground">{posts.length}</span>
        </button>
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={category === c} onClick={() => update({ category: c, page: 1 })} className={chip(category === c)}>
            {c}
            <span className="label-caps text-muted-foreground">{counts[c]}</span>
          </button>
        ))}
      </div>

      <p className="label-caps mt-8 text-muted-foreground" aria-live="polite">
        {copy.results(matches.length)}
      </p>

      {featured ? (
        <ScrollReveal className="mt-6">
          <FeaturedPost post={featured} />
        </ScrollReveal>
      ) : null}

      {matches.length === 0 ? (
        <div className="mt-6 flex flex-col items-start gap-4 rounded-lg border border-dashed border-border-strong bg-card p-8">
          <p className="font-heading text-xl font-bold text-heading">{copy.empty.title}</p>
          <p className="text-muted-foreground">{copy.empty.text}</p>
          <button type="button" onClick={() => update(EMPTY)} className={chip(false)}>
            <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
            {copy.empty.reset}
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post, i) => (
            <li key={post.slug}>
              <ScrollReveal delay={(i % 3) * REVEAL.stagger} className="h-full">
                <BlogCard post={post} readMore={copy.readMore} excerptLines={2} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      )}

      {pages > 1 ? (
        <nav aria-label={copy.pagination.label} className="mt-10 flex flex-wrap items-center gap-2">
          <button type="button" disabled={current === 1} onClick={() => update({ page: current - 1 })} className={cn(chip(false), "disabled:opacity-50")}>
            <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
            {copy.pagination.previous}
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button key={n} type="button" aria-current={n === current ? "page" : undefined} aria-label={copy.pagination.page(n)} onClick={() => update({ page: n })} className={chip(n === current)}>
              {n}
            </button>
          ))}
          <button type="button" disabled={current === pages} onClick={() => update({ page: current + 1 })} className={cn(chip(false), "disabled:opacity-50")}>
            {copy.pagination.next}
            <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
