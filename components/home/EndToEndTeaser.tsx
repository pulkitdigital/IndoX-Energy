import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { endToEndTeaser } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import Icon from "@/components/ui/Icon";
import RouteLine from "@/components/decor/RouteLine";
import { REVEAL } from "@/lib/motion";

/**
 * End-to-End teaser — the 7-step ecosystem as a linked strip built in code (no image). Each step links to its
 * product or service page. Desktop: one ruled row of 7. Mobile: ruled list.
 * Hover / focus (hv-row + hv-dim-siblings): the node highlights (bg shift, number + icon turn accent, arrow slides in)
 * and the other nodes dim.
 */
export default function EndToEndTeaser() {
  const { steps } = endToEndTeaser;

  return (
    <section aria-labelledby="e2e-title" className="relative isolate section-y">
        <RouteLine/>
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="e2e-title" index={endToEndTeaser.index} eyebrow={endToEndTeaser.eyebrow} title={endToEndTeaser.title} description={endToEndTeaser.description} />
          <ScrollReveal className="shrink-0">
            <CtaLink href={endToEndTeaser.cta.href} variant="outline" arrow>
              {endToEndTeaser.cta.label}
            </CtaLink>
          </ScrollReveal>
        </div>

        <ol className="hv-dim-siblings mt-12 grid border-t border-border-strong sm:grid-cols-2 lg:grid-cols-7">
          {steps.map((step, i) => (
            <ScrollReveal key={step.label} as="li" delay={i * REVEAL.stagger} y={12} className="border-b border-border sm:max-lg:odd:border-r lg:border-r lg:last:border-r-0">
              <Link href={step.href} className="hv-row relative flex h-full items-center gap-4 px-1 py-5 lg:flex-col lg:items-start lg:gap-0 lg:px-5 lg:py-7">
                <span className="hv-accent label-caps w-8 shrink-0 text-muted-foreground lg:w-auto">{String(i + 1).padStart(2, "0")}</span>
                <Icon name={step.icon} className="hv-icon hv-accent size-5 shrink-0 text-muted-foreground lg:mt-8" />
                <span className="font-heading text-base leading-snug font-bold lg:mt-3">{step.label}</span>
                <ArrowRight
                  className="hv-arrow-in ml-auto size-4 text-link lg:absolute lg:top-7 lg:right-4 lg:ml-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
