import { ExternalLink } from "lucide-react";
import { REVEAL } from "@/lib/motion";
import { about } from "@/content/about";
import { leadership } from "@/content/company";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Leadership (PRD §8.2 section 5) — data-driven from content/company.ts `leadership`.
 * Renders NOTHING while the list is empty: no invented people, photos or roles.
 */
export default function Leadership({ index }: { index: string }) {
  if (leadership.length === 0) return null;
  const { eyebrow, title, linkedinLabel } = about.leadership;
  return (
    <section aria-labelledby="leadership-title" className="section-y border-y border-border bg-elevated">
      <div className="container-x">
        <SectionHeading id="leadership-title" index={index} eyebrow={eyebrow} title={title} />
        <ul className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((person, i) => (
            <li key={person.name}>
              <ScrollReveal delay={(i % 4) * REVEAL.stagger} className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                {person.photo ? (
                  <div className="relative aspect-[4/5] border-b border-border">
                    <ImageSlot slot={person.photo} fill framed={false} zoomOnHover={false} />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg">{person.name}</h3>
                  <p className="mt-1 text-[0.9375rem] text-muted-foreground">{person.role}</p>
                  {person.linkedin ? (
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="hv-text-link mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-link">
                      <ExternalLink className="size-4" strokeWidth={1.5} aria-hidden="true" />
                      {linkedinLabel}
                    </a>
                  ) : null}
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
