import { cn } from "@/lib/utils";
import { ecosystemTeaser } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import Icon from "@/components/ui/Icon";
import ImageSlot from "@/components/ui/ImageSlot";

/**
 * End-to-end teaser: panorama image + a 7-column spec strip with oversized outline numerals and 1px dividers.
 * Solid colors only. Scrolls horizontally on small screens.
 */
export default function EcosystemTeaser() {
  const { steps } = ecosystemTeaser;

  return (
    <section aria-labelledby="ecosystem-title" className="section-y border-y border-border bg-elevated">
      <div className="container-x">
        <SectionHeading
          id="ecosystem-title"
          index={ecosystemTeaser.index}
          eyebrow={ecosystemTeaser.eyebrow}
          title={ecosystemTeaser.title}
          highlight={ecosystemTeaser.highlight}
          description={ecosystemTeaser.description}
          layout="split"
        />

        <ScrollReveal className="mt-12" y={32}>
          <ImageSlot slot={ecosystemTeaser.image} parallax />
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0" data-lenis-prevent-horizontal>
            <ol className="grid min-w-[56rem] grid-cols-7 border-t border-l border-border lg:min-w-0">
              {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                return (
                  <li key={step.label} className={cn("group border-r border-b border-border p-5 transition-colors duration-300", isLast ? "bg-card" : "hover:bg-card")}>
                    <span aria-hidden="true" className="block font-heading text-5xl leading-none font-extrabold text-transparent [-webkit-text-stroke:1px_var(--border-strong)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon name={step.icon} className={cn("mt-6 size-5", isLast ? "text-accent" : "text-link")} />
                    <span className="mt-3 block font-heading text-base leading-tight font-bold">{step.label}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <CtaLink href={ecosystemTeaser.cta.href} variant="text" arrow>
            {ecosystemTeaser.cta.label}
          </CtaLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
