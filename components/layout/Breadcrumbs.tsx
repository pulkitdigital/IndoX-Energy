import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export type BreadcrumbItem = { label: string; href: string };

/**
 * Inner-page trail, e.g. Home › Our Products › Fuel Bowser (PRD §7) + BreadcrumbList JSON-LD.
 * The last item is the current page (plain text, aria-current).
 */
export default function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {current ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hv-text-link">
                  {item.label}
                </Link>
              )}
              {current ? null : <ChevronRight className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(items.map((item) => ({ name: item.label, path: item.href })))} />
    </nav>
  );
}
