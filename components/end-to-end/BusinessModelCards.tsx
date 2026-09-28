import { REVEAL } from "@/lib/motion";
import { endToEnd } from "@/content/end-to-end";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";

/** Our Business Model (PRD §8.8) — 4 identical cards (equal heights), each with "Best for" business types. */
export default function BusinessModelCards({ index }: { index: string }) {
  const { eyebrow, title, bestForLabel, items } = endToEnd.models;
  return (
    <section aria-labelledby="models-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="models-title" index={index} eyebrow={eyebrow} title={title} />
        <ul className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((model, i) => (
            <li key={model.id}>
              <ScrollReveal delay={i * REVEAL.stagger} className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
                <Icon name={model.icon} className="size-7 text-accent" />
                <h3 className="mt-6 text-xl">{model.name}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{model.summary}</p>
                <p className="label-caps mt-6 border-t border-border pt-4 text-muted-foreground">{bestForLabel}</p>
                <ul className="mt-3 grid gap-2">
                  {model.bestFor.map((example) => (
                    <li key={example} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-xs bg-accent" />
                      {example}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
