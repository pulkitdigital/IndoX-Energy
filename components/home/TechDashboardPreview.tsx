import { techChips, technologyIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import SampleDashboard from "@/components/home/SampleDashboard";

/**
 * Our Technology — split: 8 tech chips (left) + coded "Sample data" dashboard (right) on the elevated band.
 * Chips (hv-chip): border → accent + 1px lift, icon nudges; no colour flood.
 */
export default function TechDashboardPreview() {
  return (
    <section aria-labelledby="technology-title" className="section-y border-y border-border bg-elevated">
      <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="technology-title" {...technologyIntro} />
          <dl className="mt-9 grid grid-cols-2 gap-2">
            {techChips.map((chip, i) => (
              <ScrollReveal key={chip.label} delay={i * 0.03} y={8} className="hv-chip rounded-md border border-border bg-card px-4 py-3.5">
                <dt className="flex items-center gap-2 font-heading text-[0.9375rem] font-bold">
                  <Icon name={chip.icon} className="hv-icon size-4 text-accent" />
                  {chip.label}
                </dt>
                <dd className="mt-1 text-[0.8125rem] leading-snug text-muted-foreground">{chip.description}</dd>
              </ScrollReveal>
            ))}
          </dl>
        </div>
        <ScrollReveal className="lg:col-span-7 lg:pt-3" y={32}>
          <SampleDashboard />
        </ScrollReveal>
      </div>
    </section>
  );
}
