import { ArrowUpRight, FileText } from "lucide-react";
import { REVEAL } from "@/lib/motion";
import { about } from "@/content/about";
import { licences } from "@/content/company";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Licences & certifications (PRD §8.2 section 7) — data-driven from content/company.ts `licences`.
 * Real documents only. Renders NOTHING while the list is empty: no invented licence names or numbers.
 */
export default function Licences({ index }: { index: string }) {
  if (licences.length === 0) return null;
  const { eyebrow, title, numberLabel, viewLabel } = about.licences;
  return (
    <section aria-labelledby="licences-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="licences-title" index={index} eyebrow={eyebrow} title={title} />
        <ul className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {licences.map((licence, i) => (
            <li key={`${licence.name}-${licence.number}`}>
              <ScrollReveal delay={(i % 3) * REVEAL.stagger} className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
                <FileText className="size-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-lg">{licence.name}</h3>
                <p className="mt-1 text-[0.9375rem] text-muted-foreground">
                  {numberLabel} {licence.number}
                </p>
                {licence.href ? (
                  <a href={licence.href} target="_blank" rel="noopener noreferrer" className="hv-text-link mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-link">
                    {viewLabel}
                    <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                ) : null}
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
