import { trustPoints } from "@/content/common";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Icon from "@/components/ui/Icon";
import ComplianceLine from "@/components/layout/ComplianceLine";
import { REVEAL } from "@/lib/motion";

/** Four trust points as a ruled row on the elevated band. Home, Product, Service and Contact pages (PRD §7). */
export default function TrustStrip() {
  return (
    <section aria-label="Sourcing, equipment, delivery and invoicing standards" className="border-y border-border bg-elevated">
      <div className="container-x">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <li
              key={point.label}
              className="border-border py-5 odd:pr-4 even:border-l even:pl-4 max-lg:[&:nth-child(-n+2)]:border-b lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <ScrollReveal delay={i * REVEAL.stagger} y={10} className="flex items-center gap-3">
                <Icon name={point.icon} className="size-5 shrink-0 text-accent" />
                <span className="text-[0.9375rem] leading-snug font-medium">{point.label}</span>
              </ScrollReveal>
            </li>
          ))}
        </ul>
        <ComplianceLine className="border-t border-border py-3" />
      </div>
    </section>
  );
}
