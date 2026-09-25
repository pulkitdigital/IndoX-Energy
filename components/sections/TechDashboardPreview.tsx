import { techChips, technologyIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import ImageSlot from "@/components/ui/ImageSlot";
import SampleDashboard from "@/components/sections/SampleDashboard";

/** Technology: spec table (2-col, 1px dividers) + code-built sample dashboard. */
export default function TechDashboardPreview() {
  return (
    <section aria-labelledby="technology-title" className="section-y relative isolate overflow-hidden">
      {/* tech-bg is a near-black full-bleed photo: dark theme only (a dark slab behind a light page reads as broken). */}
      <ImageSlot slot="tech-bg" fill decorative className="-z-10 hidden opacity-25 dark:block" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-background/70 dark:block" />

      <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="technology-title" {...technologyIntro} />
          <dl className="mt-10 grid grid-cols-2 border-t border-l border-border">
            {techChips.map((chip, i) => (
              <ScrollReveal
                key={chip.label}
                delay={i * 0.03}
                y={8}
                className="group flex flex-col gap-2 border-r border-b border-border p-4 transition-colors duration-300 hover:bg-surface-hover"
              >
                <dt className="flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase">
                  <Icon name={chip.icon} className="size-4 text-link transition-colors group-hover:text-accent" />
                  {chip.label}
                </dt>
                <dd className="text-sm text-muted-foreground">{chip.description}</dd>
              </ScrollReveal>
            ))}
          </dl>
        </div>
        <ScrollReveal className="lg:col-span-7 lg:pt-4" y={40}>
          <SampleDashboard />
        </ScrollReveal>
      </div>
    </section>
  );
}
