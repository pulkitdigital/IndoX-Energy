import { REVEAL } from "@/lib/motion";
import { about } from "@/content/about";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";

/** Core Values — 6 tiles (3×2 desktop, 2 tablet, 1 mobile). Plain accent line icons, no icon boxes. */
export default function CoreValues({ index }: { index: string }) {
  const { eyebrow, title, values } = about.coreValues;
  return (
    <section aria-labelledby="values-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="values-title" index={index} eyebrow={eyebrow} title={title} layout="split" />
        {/* 6 tiles fill 1, 2 or 3 columns exactly, so a gap-px grid gives clean 1px hairlines at every width. */}
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <li key={value.title} className="bg-card">
              <ScrollReveal delay={(i % 3) * REVEAL.stagger} className="h-full p-7">
                <Icon name={value.icon} className="size-6 text-accent" />
                <h3 className="mt-5 text-xl">{value.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{value.text}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
