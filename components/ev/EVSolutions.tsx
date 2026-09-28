import { ev } from "@/content/ev";
import FeatureGrid from "@/components/templates/FeatureGrid";
import SectionHeading from "@/components/ui/SectionHeading";

/** Our EV solutions (PRD §8.7 section 2) — the shared FeatureGrid (6 items → 3×2). */
export default function EVSolutions({ index }: { index: string }) {
  const { eyebrow, title, description, items } = ev.solutions;
  return (
    <section aria-labelledby="ev-solutions-title" className="section-y border-y border-border bg-elevated">
      <div className="container-x">
        <SectionHeading id="ev-solutions-title" index={index} eyebrow={eyebrow} title={title} description={description} layout="split" />
        <FeatureGrid items={items} className="mt-12" />
      </div>
    </section>
  );
}
