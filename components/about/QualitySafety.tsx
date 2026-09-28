import { REVEAL } from "@/lib/motion";
import { about } from "@/content/about";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FigureFrame from "@/components/ui/FigureFrame";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Quality & Safety (PRD §8.2 section 6), anchor #quality-safety (linked from every product page).
 * 9-point grid + annotated bowser: numbered markers are HTML overlays placed with % coordinates from
 * content/about.ts (never text baked into the photo), so they stay aligned at every size. The legend is the
 * accessible list (markers are aria-hidden); it sits beside the image on desktop and under it on mobile.
 */
export default function QualitySafety({ index }: { index: string }) {
  const q = about.qualitySafety;
  return (
    <section id="quality-safety" aria-labelledby="quality-title" className="section-y scroll-mt-20 border-y border-border bg-elevated">
      <div className="container-x">
        <SectionHeading id="quality-title" index={index} eyebrow={q.eyebrow} title={q.title} description={q.description} layout="split" />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {q.points.map((point, i) => (
            <li key={point.title} className="bg-card">
              <ScrollReveal delay={(i % 3) * REVEAL.stagger} y={10} className="h-full p-6">
                <span className="label-caps text-accent">{pad(i + 1)}</span>
                <h3 className="mt-3 text-lg leading-snug">{point.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{point.text}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <ScrollReveal className="lg:col-span-7">
            <FigureFrame caption={q.caption} frameClassName="aspect-[4/3]">
              <ImageSlot slot={q.image} fill framed={false} zoomOnHover={false} />
              <div aria-hidden="true" className="absolute inset-0">
                {q.callouts.map((callout, i) => (
                  <span
                    key={callout.label}
                    className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 border-on-brand bg-brand-blue font-heading text-sm font-bold text-on-brand sm:size-9"
                    style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </FigureFrame>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5" delay={REVEAL.stagger}>
            <h3 className="label-caps text-muted-foreground">{q.legendTitle}</h3>
            <ol className="mt-4 border-t border-border">
              {q.callouts.map((callout, i) => (
                <li key={callout.label} className="flex gap-4 border-b border-border py-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-brand-blue font-heading text-sm font-bold text-on-brand">{i + 1}</span>
                  <span>
                    <span className="block font-heading font-bold text-heading">{callout.label}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted-foreground">{callout.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
