import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IconName } from "@/lib/icons";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Icon from "@/components/ui/Icon";

type RelatedCardProps = {
  href: string;
  icon: IconName;
  /** Small caps line above the name, e.g. the service group or "Product". */
  kicker: string;
  title: string;
  text: string;
  cta: string;
  className?: string;
};

/** Wide link card pairing a product with its service (and back). Hover: hv-card lift + accent border, arrow nudge. */
export default function RelatedCard({ href, icon, kicker, title, text, cta, className }: RelatedCardProps) {
  return (
    <ScrollReveal className={className}>
      <Link
        href={href}
        className="hv-card group flex flex-col gap-6 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="flex items-start gap-5">
          <Icon name={icon} className="hv-icon mt-1 size-7 shrink-0 text-accent" />
          <div>
            <p className="label-caps text-muted-foreground">{kicker}</p>
            <h3 className="mt-2 text-xl sm:text-2xl">{title}</h3>
            <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-link">
          {cta}
          <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </Link>
    </ScrollReveal>
  );
}
