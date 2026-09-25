import { MessageCircle, Phone } from "lucide-react";
import { CONTACT, whatsappHref } from "@/lib/constants";
import { quoteBand } from "@/content/common";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import ImageSlot from "@/components/ui/ImageSlot";
import ComplianceNote from "@/components/ui/ComplianceNote";

/**
 * Closing quote CTA used at the bottom of every page except Contact and legal pages (PRD §6).
 * Solid brand-blue band with white text in both themes, left-aligned: heading left, actions right.
 * The optional cta-bg image sits at ≤20% opacity, blended to luminosity, keeping white text above WCAG AA.
 */
export default function QuoteCTABand() {
  return (
    <section aria-labelledby="quote-band-title" className="section-y">
      <div className="container-x">
        <ScrollReveal>
          <div className="relative isolate overflow-hidden rounded-lg bg-brand-blue px-6 py-12 text-on-brand sm:px-12 lg:px-16 lg:py-16">
            <ImageSlot slot="cta-bg" fill decorative className="-z-10 opacity-20 mix-blend-luminosity" />

            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow label={quoteBand.eyebrow} tone="onBrand" className="mb-5" />
                <h2 id="quote-band-title" className="text-4xl leading-[1.02] font-bold text-balance sm:text-5xl">
                  {quoteBand.title}
                </h2>
                <p className="mt-5 max-w-xl text-on-brand/85 sm:text-lg">{quoteBand.description}</p>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-4">
                <CtaLink href={quoteBand.primaryCta.href} variant="onBrand" size="lg" arrow magnetic track="quote_cta_click">
                  {quoteBand.primaryCta.label}
                </CtaLink>
                <CtaLink href={CONTACT.tollFreeHref} variant="outlineOnBrand" size="lg" track="call_click">
                  <Phone className="size-4" aria-hidden="true" />
                  {CONTACT.tollFree}
                </CtaLink>
                <CtaLink href={whatsappHref()} variant="outlineOnBrand" size="lg" track="whatsapp_click">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </CtaLink>
              </div>
            </div>

            <ComplianceNote className="mt-10 border-t border-on-brand/20 pt-5 text-on-brand/80" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
