import { cn } from "@/lib/utils";
import { REVEAL } from "@/lib/motion";
import type { ImageSlotKey } from "@/content/images";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ProductCard from "@/components/home/ProductCard";

export type OverviewItem = {
  key: string;
  href: string;
  title: string;
  description: string;
  image: ImageSlotKey;
  labels: string[];
};

/**
 * Overview pages (/products/, later /services/): identical cards — same 4:3 image box, equal heights via
 * auto-rows-fr. Desktop rows of 3 (a trailing row of 2 sits centred on the 6-col grid), tablet 2, mobile 1.
 */
export default function OverviewGrid({ items, ctaLabel, className }: { items: OverviewItem[]; ctaLabel?: string; className?: string }) {
  const centreFrom = items.length % 3 === 2 ? items.length - 2 : -1;
  return (
    <ul className={cn("grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-6", className)}>
      {items.map((item, i) => (
        <li key={item.key} className={cn("lg:col-span-2", i === centreFrom && "lg:col-start-2")}>
          <ScrollReveal delay={(i % 3) * REVEAL.stagger} className="h-full">
            <ProductCard
              href={item.href}
              title={item.title}
              description={item.description}
              image={item.image}
              labels={item.labels}
              index={String(i + 1).padStart(2, "0")}
              ctaLabel={ctaLabel}
            />
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}
