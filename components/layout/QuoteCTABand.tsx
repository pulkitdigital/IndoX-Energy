import { MessageCircle, Phone } from "lucide-react";
import { company, COMPLIANCE_LINE } from "@/content/company";
import { quoteBand } from "@/content/common";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Closing quote CTA — bottom of every page except Contact, Thank-you, legal and 404 (PRD §7).
 * Solid brand-blue band, white text, in both themes. The one centred section on the site.
 */
export default function QuoteCTABand({ index = "11" }: { index?: string }) {
  return (
    <section aria-labelledby="quote-band-title" className="section-y">
      <div className="container-x">
        <ScrollReveal>
          <div className="rounded-lg bg-brand-blue px-5 py-12 text-center text-on-brand sm:px-12 lg:py-16">
            <Eyebrow index={index} label={quoteBand.eyebrow} tone="onBrand" className="mb-6 justify-center" />
            <h2 id="quote-band-title" className="text-section mx-auto max-w-4xl text-on-brand">
              {quoteBand.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-on-brand/85">{quoteBand.description}</p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <CtaLink href={quoteBand.primaryCta.href} variant="onBrand" size="lg" arrow magnetic className="w-full sm:w-auto">
                {quoteBand.primaryCta.label}
              </CtaLink>
              <CtaLink contact={{ kind: "call", location: "quote_band" }} variant="outlineOnBrand" size="lg">
                <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Call {company.tollFree}
              </CtaLink>
              <CtaLink contact={{ kind: "whatsapp", location: "quote_band" }} variant="outlineOnBrand" size="lg">
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp
              </CtaLink>
            </div>

            <p className="label-caps mt-10 text-on-brand/75">* {COMPLIANCE_LINE}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
