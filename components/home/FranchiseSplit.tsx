import { cn } from "@/lib/utils";
import { REVEAL } from "@/lib/motion";
import { franchiseOffers, franchiseIntro, type FranchiseOffer } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import Icon from "@/components/ui/Icon";
import ComplianceLine from "@/components/layout/ComplianceLine";

/** Solid surface tints (theme tokens): the only difference between the two cards. */
const TONE: Record<FranchiseOffer["tone"], string> = {
  blue: "bg-elevated",
  green: "bg-tint-green",
};

/**
 * Franchise: two equal cards (side by side from md, stacked below; equal heights via auto-rows-fr).
 * Each: badge pill + index, kicker, two-line heading, description, 3-point checklist, one CTA and a
 * two-column differentiator row pinned to the bottom. A large faded icon sits behind the content.
 * ScrollReveal owns the entrance transform, hv-card the hover lift (nested).
 */
export default function FranchiseSplit() {
  return (
    <section aria-labelledby="franchise-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="franchise-title" {...franchiseIntro} />

        <ul className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:gap-6">
          {franchiseOffers.map((offer, i) => (
            <li key={offer.id}>
              <ScrollReveal delay={i * REVEAL.stagger} className="h-full">
                <article
                  className={cn(
                    "hv-card relative flex h-full flex-col overflow-hidden rounded-lg border border-border p-6 lg:p-10",
                    TONE[offer.tone],
                  )}
                >
                  {/* Decorative watermark icon */}
                  <Icon
                    name={offer.icon}
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -bottom-10 size-64 text-accent opacity-[0.07]"
                  />

                  {/* Badge + index */}
                  <div className="relative flex items-center justify-between gap-4">
                    <span className="label-caps inline-flex items-center gap-2 rounded-full border border-border-strong bg-background px-3 py-1.5 text-foreground">
                      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                      {offer.badge}
                    </span>
                    <span aria-hidden className="label-caps text-muted-foreground tabular-nums">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Kicker + heading + description */}
                  <p className="label-caps relative mt-8 text-link">{offer.kicker}</p>
                  <h3 className="relative mt-2 text-[clamp(1.625rem,3vw,2.375rem)] leading-[1.1]">
                    {offer.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="relative mt-4 max-w-xl text-muted-foreground">{offer.description}</p>

                  {/* Checklist */}
                  <ul className="relative mt-6 grid gap-3">
                    {offer.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-[0.9375rem] font-medium text-foreground">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border-strong bg-background">
                          <Icon name="check" className="size-3.5 text-accent" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-8 mb-8">
                    <CtaLink href={offer.cta.href} size="lg" arrow className="w-full sm:w-auto">
                      {offer.cta.label}
                    </CtaLink>
                  </div>

                  {/* Differentiators pinned to the bottom */}
                  <dl className="relative mt-auto grid grid-cols-2 gap-x-6 border-t border-border pt-5">
                    {offer.stats.map((stat) => (
                      <div key={stat.value} className="min-w-0">
                        <dt className="font-heading text-[0.9375rem] leading-snug font-bold text-foreground">{stat.value}</dt>
                        <dd className="mt-1 text-[0.8125rem] leading-snug text-muted-foreground">{stat.label}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ComplianceLine className="mt-6" />
      </div>
    </section>
  );
}