import { REVEAL } from "@/lib/motion";
import { about } from "@/content/about";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";

/** Vision & Mission — two equal cards side by side (stacked on mobile). */
export default function VisionMission({ index }: { index: string }) {
  const { eyebrow, title, cards } = about.visionMission;
  return (
    <section aria-labelledby="vision-title" className="section-y border-y border-border bg-elevated">
      <div className="container-x">
        <SectionHeading id="vision-title" index={index} eyebrow={eyebrow} title={title} />
        <ul className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2">
          {cards.map((card, i) => (
            <li key={card.label}>
              <ScrollReveal delay={i * REVEAL.stagger} className="flex h-full flex-col rounded-lg border border-border bg-card p-7 sm:p-9">
                <Icon name={card.icon} className="size-7 text-accent" />
                <h3 className="mt-6 text-2xl">{card.label}</h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">{card.text}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
