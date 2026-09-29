import { REVEAL } from "@/lib/motion";
import type { LegalDoc } from "@/content/legal";
import { ROUTES } from "@/content/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import TableOfContents from "@/components/blog/TableOfContents";
import DraftBanner from "@/components/legal/DraftBanner";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Shared body of /privacy/ and /terms/ (PRD §8.13): plain-text sections with a sticky (desktop) / collapsible
 * (mobile) table of contents — the blog's TableOfContents — and the draft banner at the top and bottom.
 * No QuoteCTABand on legal pages (PRD §7).
 */
export default function LegalDocument({ doc, path }: { doc: LegalDoc; path: string }) {
  const headings = doc.sections.map((s) => ({ level: 2 as const, text: s.title, id: s.id }));
  return (
    <>
      <section aria-labelledby="legal-title" className="pt-28 pb-10 sm:pt-32 lg:pt-36 lg:pb-12">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: doc.crumb, href: path },
            ]}
          />
          <ScrollReveal className="mt-10 max-w-3xl">
            <Eyebrow index="00" label={doc.eyebrow} />
            <h1 id="legal-title" className="text-display mt-6">
              {doc.title}
            </h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{doc.intro}</p>
          </ScrollReveal>
          <ScrollReveal className="mt-8 max-w-3xl" delay={REVEAL.stagger}>
            <DraftBanner />
          </ScrollReveal>
        </div>
      </section>

      <section aria-label={doc.title} className="pb-16 lg:pb-24">
        <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          <aside>
            <TableOfContents headings={headings} />
          </aside>
          <div className="max-w-[70ch]">
            {doc.sections.map((section, i) => (
              <section key={section.id} aria-labelledby={section.id} className={i === 0 ? "" : "mt-12"}>
                <h2 id={section.id} className="scroll-mt-28 text-2xl sm:text-3xl">
                  {section.title}
                </h2>
                {section.blocks.map((block, j) =>
                  block.type === "p" ? (
                    <p key={j} className="mt-5 text-[1.0625rem] leading-[1.75]">
                      {block.text}
                    </p>
                  ) : (
                    <ul key={j} className="mt-5 grid list-disc gap-2.5 pl-6 text-[1.0625rem] leading-relaxed marker:text-accent">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
            <DraftBanner className="mt-14" />
          </div>
        </div>
      </section>
    </>
  );
}
