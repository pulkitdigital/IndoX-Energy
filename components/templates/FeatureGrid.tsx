import { cn } from "@/lib/utils";
import { REVEAL } from "@/lib/motion";
import type { IconName } from "@/lib/icons";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Icon from "@/components/ui/Icon";

export type FeatureItem = { icon: IconName; title: string; text?: string };

/**
 * Icon + title + line cards (product Key features, service What we do). Plain accent icon, no tile.
 * 3 columns when the count divides by 3, otherwise 4 (desktop); 2 on tablet; 1 on mobile.
 */
export default function FeatureGrid({ items, className }: { items: FeatureItem[]; className?: string }) {
  const cols = items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", cols, className)}>
      {items.map((item, i) => (
        <li key={item.title}>
          <ScrollReveal delay={(i % 4) * REVEAL.stagger} className="h-full rounded-lg border border-border bg-card p-6">
            <Icon name={item.icon} className="size-6 text-accent" />
            <h3 className="mt-5 text-base leading-snug">{item.title}</h3>
            {item.text ? <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.text}</p> : null}
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}
