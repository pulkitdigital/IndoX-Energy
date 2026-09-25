import { trustPoints } from "@/content/common";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Icon from "@/components/ui/Icon";
import ComplianceNote from "@/components/ui/ComplianceNote";

/** Four trust points as a spec row divided by 1px rules. Used on Home, Product, Service and Contact pages (PRD §6). */
export default function TrustStrip() {
  return (
    <section aria-label="Why customers trust IndoX Energy" className="border-y border-border bg-elevated">
      <div className="container-x">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <li key={point.label} className="border-border py-6 odd:pr-4 even:border-l even:pl-4 lg:border-l lg:px-6 lg:py-8 lg:first:border-l-0 lg:first:pl-0">
              <ScrollReveal delay={i * 0.05} y={10} className="flex flex-col gap-3">
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
                  <Icon name={point.icon} className="size-4 text-accent" />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-base leading-snug font-bold sm:text-lg">{point.label}</span>
              </ScrollReveal>
            </li>
          ))}
        </ul>
        <ComplianceNote className="border-t border-border py-4" />
      </div>
    </section>
  );
}
