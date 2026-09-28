import { ev } from "@/content/ev";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ComplianceLine from "@/components/layout/ComplianceLine";
import ProcessStrip from "@/components/templates/ProcessStrip";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * How it works (PRD §8.7 section 3): Site Survey → … → AMC. Reuses ProcessStrip: accent lines draw in step order
 * (one-shot GSAP ScrollTrigger, no pin), vertical rail on mobile, fully drawn under reduced motion.
 */
export default function EVProcess({ index }: { index: string }) {
  const { eyebrow, title, steps, stepLabel } = ev.process;
  return (
    <section aria-labelledby="ev-process-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="ev-process-title" index={index} eyebrow={eyebrow} title={title} />
        <ScrollReveal className="mt-14">
          <ProcessStrip steps={steps} stepLabel={stepLabel} />
        </ScrollReveal>
        <ComplianceLine className="mt-12 border-t border-border pt-4" />
      </div>
    </section>
  );
}
