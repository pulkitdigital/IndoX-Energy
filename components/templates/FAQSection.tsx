import { cn } from "@/lib/utils";
import { faqPageJsonLd } from "@/lib/seo";
import type { SectionIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { REVEAL } from "@/lib/motion";

type FAQSectionProps = {
  intro: SectionIntro;
  faqs: { q: string; a: string }[];
  className?: string;
};

/**
 * Shared FAQ block (product, service and EV pages): heading left, accordion right, FAQPage JSON-LD.
 * Renders nothing when there are no FAQs (so no empty schema is emitted).
 */
export default function FAQSection({ intro, faqs, className }: FAQSectionProps) {
  if (faqs.length === 0) return null;
  return (
    <section aria-labelledby="faqs-title" className={cn("section-y border-y border-border bg-elevated", className)}>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <SectionHeading id="faqs-title" {...intro} className="lg:col-span-4" />
        <div className="lg:col-span-8">
          <Accordion>
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * REVEAL.stagger} y={16}>
                <AccordionItem value={faq.q}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </div>
      <JsonLd data={faqPageJsonLd(faqs)} />
    </section>
  );
}
