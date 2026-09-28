import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/slug";

/** Plain text of rendered heading children, so the id matches lib/blog.ts's TOC (both use lib/slug.ts). */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) return textOf((node as { props: { children?: ReactNode } }).props.children);
  return "";
}

type CalloutType = "note" | "tip" | "warning";
const CALLOUT_ICON = { note: Info, tip: Lightbulb, warning: AlertTriangle } as const;

/** <Callout type="note|tip|warning" title="…">markdown</Callout> — solid tinted box, plain icon. */
function Callout({ type = "note", title, children }: { type?: CalloutType; title?: string; children: ReactNode }) {
  const Icon = CALLOUT_ICON[type];
  return (
    <aside
      className={cn(
        "my-8 rounded-lg border bg-card p-5 sm:p-6",
        type === "warning" ? "border-accent" : "border-border-strong",
      )}
    >
      <p className="flex items-center gap-2 font-heading font-bold text-heading">
        <Icon className="size-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
        {title}
      </p>
      <div className="mt-2 text-[0.9375rem] leading-relaxed [&>p]:m-0">{children}</div>
    </aside>
  );
}

/** <PullQuote>…</PullQuote> — large quote with an accent rule, for one line worth remembering. */
function PullQuote({ children }: { children: ReactNode }) {
  return (
    <figure className="my-10 border-l-2 border-accent pl-6">
      <blockquote className="font-heading text-xl leading-snug font-bold text-heading sm:text-2xl">{children}</blockquote>
    </figure>
  );
}

/**
 * MDX element map for articles. Headings get stable ids + scroll margin (fixed header), tables scroll inside their
 * own focusable region on narrow screens, GFM task lists render as a checklist, internal links use next/link.
 */
export const mdxComponents = {
  h2: ({ children }: ComponentPropsWithoutRef<"h2">) => (
    <h2 id={slugify(textOf(children))} className="mt-14 scroll-mt-28 text-2xl sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }: ComponentPropsWithoutRef<"h3">) => (
    <h3 id={slugify(textOf(children))} className="mt-9 scroll-mt-28 text-xl">
      {children}
    </h3>
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="mt-5 text-[1.0625rem] leading-[1.75]" {...props} />,
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn(
        "mt-5 grid gap-2.5 text-[1.0625rem] leading-relaxed",
        className?.includes("contains-task-list") ? "pl-0" : "list-disc pl-6 marker:text-accent",
        className,
      )}
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="mt-5 grid list-decimal gap-2.5 pl-6 text-[1.0625rem] leading-relaxed marker:text-accent" {...props} />,
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn(className?.includes("task-list-item") && "flex list-none items-start gap-3 rounded-md border border-border bg-card px-4 py-3", className)} {...props} />
  ),
  input: (props: ComponentPropsWithoutRef<"input">) =>
    props.type === "checkbox" ? <input {...props} disabled aria-hidden="true" className="mt-1.5 size-4 shrink-0 accent-[var(--accent)]" /> : <input {...props} />,
  a: ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} className="hv-text-link text-link">
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hv-text-link text-link" {...props}>
        {children}
      </a>
    ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-foreground" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-8 border-l-2 border-accent pl-6 text-lg leading-relaxed text-muted-foreground" {...props} />
  ),
  hr: () => <hr className="my-12 border-border" />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div tabIndex={0} role="region" aria-label="Table" className="my-8 overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[36rem] border-collapse text-left text-[0.9375rem]" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => <thead className="border-b border-border-strong bg-elevated" {...props} />,
  tr: (props: ComponentPropsWithoutRef<"tr">) => <tr className="border-b border-border last:border-b-0" {...props} />,
  th: (props: ComponentPropsWithoutRef<"th">) => <th scope="col" className="label-caps px-4 py-3 align-bottom text-muted-foreground" {...props} />,
  td: (props: ComponentPropsWithoutRef<"td">) => <td className="px-4 py-3 align-top leading-relaxed" {...props} />,
  Callout,
  PullQuote,
};
