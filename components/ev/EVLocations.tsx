import { REVEAL } from "@/lib/motion";
import { ev } from "@/content/ev";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import DottedField from "@/components/decor/DottedField";

/**
 * Suitable locations (PRD §8.7 section 4): 8 identical tiles, plain accent icons, no images.
 * 8 tiles fill 1 / 2 / 4 columns exactly, so a gap-px grid draws clean 1px hairlines at every width.
 */
export default function EVLocations({ index }: { index: string }) {
  const { eyebrow, title, items } = ev.locations;
  return (
    <section aria-labelledby="ev-locations-title" className="relative isolate section-y border-y border-border bg-elevated">
        <DottedField side="right" />
      <div className="container-x">
        <SectionHeading id="ev-locations-title" index={index} eyebrow={eyebrow} title={title} />
        <ul className="mt-12 grid auto-rows-fr gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={item.label} className="bg-card">
              <ScrollReveal delay={(i % 4) * REVEAL.stagger} y={10} className="flex h-full flex-col p-6">
                <Icon name={item.icon} className="size-7 text-accent" />
                <h3 className="mt-6 text-lg">{item.label}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.text}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
