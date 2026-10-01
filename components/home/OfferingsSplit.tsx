import { cn } from "@/lib/utils";
import { REVEAL } from "@/lib/motion";
import { franchiseOffers, franchiseIntro, type FranchiseOffer } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import Icon from "@/components/ui/Icon";
import ComplianceLine from "@/components/layout/ComplianceLine";

/** Solid surface tint, top bar and check-circle colours per tone. Theme tokens only, no gradients. */
const TONE: Record<FranchiseOffer["tone"], { surface: string; bar: string; check: string }> = {
  blue: {
    surface: "bg-elevated",
    bar: "bg-primary",
    check: "bg-primary text-primary-foreground",
  },
  green: {
    surface: "bg-tint-green",
    bar: "bg-accent",
    check: "bg-accent text-accent-foreground",
  },
};

/* ------------------------------------------------------------------
 * One quiet line-art illustration per card, top-right corner. Decorative only.
 * ------------------------------------------------------------------ */
const ART_CLASS = "pointer-events-none absolute top-8 right-6 hidden w-44 text-accent opacity-[0.14] sm:block lg:right-10 lg:w-52";
const ART_PROPS = {
  "aria-hidden": true,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Fuel bowser: tank, droplet, cab, wheels, road. */
function BowserArt() {
  return (
    <svg viewBox="0 0 340 170" className={ART_CLASS} {...ART_PROPS}>
      <rect x="10" y="20" width="200" height="90" rx="45" />
      <path d="M92 52c-9 13-15 20-15 28a15 15 0 0 0 30 0c0-8-6-15-15-28z" />
      <path d="M214 110V62h42l34 34v14z" />
      <circle cx="70" cy="126" r="20" />
      <circle cx="150" cy="126" r="20" />
      <circle cx="262" cy="126" r="20" />
      <path d="M0 160h340" strokeDasharray="14 12" />
    </svg>
  );
}

/** Bio pump: pump body, leaf, hose and nozzle. */
function BioPumpArt() {
  return (
    <svg viewBox="0 0 340 170" className={ART_CLASS} {...ART_PROPS}>
      <rect x="100" y="8" width="100" height="140" rx="10" />
      <rect x="116" y="24" width="68" height="34" rx="5" />
      <path d="M128 112c0-22 16-34 36-34 0 22-14 36-36 34z" />
      <path d="M128 112l22-24" />
      <path d="M80 148h140" />
      <path d="M200 44h26a14 14 0 0 1 14 14v52a10 10 0 0 0 20 0V70l-12-14" />
      <path d="M0 160h340" strokeDasharray="14 12" />
    </svg>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  bowser: BowserArt,
  "bio-pump": BioPumpArt,
};

/* ------------------------------------------------------------------
 * Section background scene. Kept minimal: one dot grid (top-left), one storage tank on a pipeline
 * (bottom-left), one hill line with two leaves (bottom-right). Hidden below md.
 * Colour comes only from --decor-ink / --decor-accent, opacity from --decor-opacity,
 * so it follows light/dark mode. No CSS gradients (SVG <pattern> for the dots).
 * ------------------------------------------------------------------ */
function SectionScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden text-(--decor-ink) opacity-(--decor-opacity) md:block"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern id="offerings-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="currentColor" stroke="none" />
          </pattern>
        </defs>

        {/* Dot grid, top-left */}
        <rect x="0" y="0" width="360" height="240" fill="url(#offerings-dots)" stroke="none" />

        {/* Storage tank on a pipeline, bottom-left */}
        <g>
          <path d="M60 900V740a64 26 0 0 1 128 0v160" />
          <path d="M60 740a64 26 0 0 0 128 0" />
          <path d="M60 820a64 26 0 0 0 128 0" />
          <path d="M0 868h420" />
          <circle cx="124" cy="868" r="7" />
        </g>

        {/* Hill line with two leaves, bottom-right */}
        <g>
          <path d="M1000 840C1120 790 1260 790 1440 840" />
        </g>
        <g className="text-(--decor-accent)">
          <g fill="currentColor" fillOpacity="0.4">
            <path d="M1250 760c0-48 32-78 78-78 0 48-30 80-78 78z" />
            <path d="M1140 800c0-30 22-48 50-48 0 30-20 50-50 48z" />
          </g>
          <path d="M1250 760l46-46M1140 800l30-30" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Franchise offerings: two equal cards (side by side from md, stacked below; equal heights via auto-rows-fr).
 * Every card is one left-aligned column: badge, kicker, heading, description, checklist, CTA, then a
 * divider and a two-column differentiator row pinned to the bottom (mt-auto).
 * ScrollReveal owns the entrance transform, hv-card the hover lift (nested).
 * The section itself carries the decorative scene (-z-10 inside an isolated stacking context).
 */
export default function OfferingsSplit() {
  return (
    <section aria-labelledby="offerings-title" className="section-y relative isolate overflow-hidden">
      <SectionScene />

      <div className="container-x">
        <SectionHeading id="offerings-title" {...franchiseIntro} />

        <ul className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:gap-8">
          {franchiseOffers.map((offer, i) => {
            const tone = TONE[offer.tone];
            const Art = ART[offer.id];
            return (
              <li key={offer.id}>
                <ScrollReveal delay={i * REVEAL.stagger} className="h-full">
                  <article
                    className={cn(
                      "hv-card relative flex h-full flex-col overflow-hidden rounded-lg border border-border p-6 pt-9 sm:p-8 sm:pt-11 lg:p-10 lg:pt-12",
                      tone.surface,
                    )}
                  >
                    <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1.5", tone.bar)} />
                    {Art ? <Art /> : null}

                    {/* Badge */}
                    <span className="label-caps relative inline-flex w-fit items-center gap-2 rounded-full border border-border-strong bg-background px-3 py-1.5 text-foreground">
                      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                      {offer.badge}
                    </span>

                    {/* Kicker + heading + description */}
                    <p className="label-caps relative mt-10 text-link">{offer.kicker}</p>
                    <h3 className="relative mt-3 text-[clamp(1.75rem,2.8vw,2.375rem)] leading-[1.1] font-extrabold">
                      {offer.titleLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="relative mt-4 max-w-md text-muted-foreground">{offer.description}</p>

                    {/* Checklist */}
                    <ul className="relative mt-6 grid gap-3">
                      {offer.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-[0.9375rem] font-medium text-foreground">
                          <span className={cn("grid size-5 shrink-0 place-items-center rounded-full", tone.check)}>
                            <Icon name="check" className="size-3" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="relative mt-8">
                      <CtaLink href={offer.cta.href} size="lg" arrow className="w-full sm:w-auto">
                        {offer.cta.label}
                      </CtaLink>
                    </div>

                    {/* Differentiators */}
                    <dl className="relative mt-10 grid grid-cols-1 gap-5 border-t border-border-strong pt-6 sm:mt-auto sm:grid-cols-2 sm:gap-6">
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
            );
          })}
        </ul>

        <ComplianceLine className="mt-6" />
      </div>
    </section>
  );
}