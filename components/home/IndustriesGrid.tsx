import { customerSegments, industries } from "@/content/industries";
import { industriesIntro, segmentsLabel } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import ImageSlot from "@/components/ui/ImageSlot";

/**
 * Industries We Serve — image-led grid of identical tiles: fixed 4:3 image box (object-cover) and equal tile heights.
 * 4 columns desktop, 2 tablet, 1 mobile.
 * Hover (fine pointers, hv-group): image zooms and a solid semi-opaque bar with the name + pain point slides up from
 * the bottom edge (no gradient overlay). Touch devices get the pain point as plain text under the tile instead.
 * Then the Customer Segments chips (PRD §8.1 list, exactly as written).
 */
export default function IndustriesGrid() {
  return (
    <section aria-labelledby="industries-title" className="section-y border-y border-border bg-elevated">
      <div className="container-x">
        <SectionHeading id="industries-title" {...industriesIntro} layout="split" />

        <ul className="mt-12 grid auto-rows-fr gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => {
            return (
              <li key={industry.slug}>
                <ScrollReveal delay={(i % 4) * 0.05} className="hv-group h-full">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border">
                    <ImageSlot slot={industry.image} fill framed={false} />
                    <div aria-hidden="true" className="hv-bar hv-fine-only absolute inset-x-0 bottom-0 border-t border-border bg-background/90 px-4 py-3.5">
                      <p className="font-heading text-[0.9375rem] font-bold">{industry.name}</p>
                      <p className="mt-1 text-[0.8125rem] leading-snug text-muted-foreground">{industry.painPoint}</p>
                    </div>
                  </div>
                  <div className="mt-3.5 flex items-start justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="label-caps text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-lg">{industry.name}</h3>
                    </div>
                    <Icon name={industry.icon} className="hv-icon-rot hv-accent mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  </div>
                  {/* Screen readers and touch users get the pain point as text; fine pointers see it in the hover bar. */}
                  <p className="hv-touch-only mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{industry.painPoint}</p>
                  <p className="hv-fine-only sr-only">{industry.painPoint}</p>
                </ScrollReveal>
              </li>
            );
          })}
        </ul>

        <ScrollReveal className="mt-14 grid gap-4 border-t border-border pt-6 lg:grid-cols-12 lg:gap-10">
          <h3 className="label-caps pt-2 text-muted-foreground lg:col-span-2">{segmentsLabel}</h3>
          <ul className="flex flex-wrap gap-2 lg:col-span-10">
            {customerSegments.map((segment) => (
              <li key={segment} className="hv-chip rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium">
                {segment}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
