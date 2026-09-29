import { REVEAL } from "@/lib/motion";
import { about } from "@/content/about";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TruckSilhouette from "@/components/decor/TruckSilhouette";

/** Our Commitment — the 6 PRD points as a ruled two-column list (numbers, not cards). */
export default function Commitment({ index }: { index: string }) {
  const { eyebrow, title, points } = about.commitment;
  return (
    <section aria-labelledby="commitment-title" className="relative isolate section-y">
        <TruckSilhouette/>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <SectionHeading id="commitment-title" index={index} eyebrow={eyebrow} title={title} className="lg:col-span-4" />
        <ol className="grid border-t border-border sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
          {points.map((point, i) => (
            <li key={point.title} className="border-b border-border py-5">
              <ScrollReveal delay={(i % 2) * REVEAL.stagger} y={10} className="flex gap-4">
                <span className="label-caps pt-1 text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-heading text-lg font-bold text-heading">{point.title}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted-foreground">{point.text}</span>
                </span>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
