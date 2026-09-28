import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { company, COMPLIANCE_LINE } from "@/content/company";
import { quoteBand } from "@/content/common";
import { images } from "@/content/images";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Closing quote CTA — bottom of every page except Contact, Thank-you, legal and 404 (PRD §7).
 * Outer section carries the background image (slot "cta-bg" in content/images.ts) with no overlay;
 * the card inside is semi-transparent brand-blue with white text. The one centred section on the site.
 */
type QuoteCTABandProps = {
  index?: string;
  /** Deep link into the quote form (product / service pages pre-select themselves). */
  quoteHref?: string;
  /** Override the default copy (e.g. EV: "Host an IndoX charger."). Defaults come from content/common.ts. */
  copy?: { eyebrow?: string; title?: string; description?: string; primaryLabel?: string };
  /** Solid brand-blue band without the background photo. */
  solid?: boolean;
  /** Show the WhatsApp button (default true). */
  whatsapp?: boolean;
};

export default function QuoteCTABand({ index = "11", quoteHref = quoteBand.primaryCta.href, copy, solid = false, whatsapp = true }: QuoteCTABandProps) {
  const text = {
    eyebrow: copy?.eyebrow ?? quoteBand.eyebrow,
    title: copy?.title ?? quoteBand.title,
    description: copy?.description ?? quoteBand.description,
    primaryLabel: copy?.primaryLabel ?? quoteBand.primaryCta.label,
  };
  return (
    <section aria-labelledby="quote-band-title" className="section-y relative isolate overflow-hidden">
      {/* Section background image (no overlay) — omitted for the solid variant */}
      {solid ? null : (
        <Image
          src={images["cta-bg"].src}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
          aria-hidden="true"
        />
      )}

      <div className="container-x">
        <ScrollReveal>
          <div
            className={cn(
              "rounded-lg px-5 py-12 text-center text-on-brand sm:px-12 lg:py-16",
              solid ? "bg-brand-blue" : "bg-brand-blue/90 backdrop-blur-sm",
            )}
          >
            <Eyebrow index={index} label={text.eyebrow} tone="onBrand" className="mb-6 justify-center" />
            <h2 id="quote-band-title" className="text-section mx-auto max-w-4xl text-on-brand">
              {text.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-on-brand/85">{text.description}</p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <CtaLink href={quoteHref} variant="onBrand" size="lg" arrow magnetic className="w-full sm:w-auto">
                {text.primaryLabel}
              </CtaLink>
              <CtaLink contact={{ kind: "call", location: "quote_band" }} variant="outlineOnBrand" size="lg">
                <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Call {company.tollFree}
              </CtaLink>
              {whatsapp ? (
                <CtaLink contact={{ kind: "whatsapp", location: "quote_band" }} variant="outlineOnBrand" size="lg">
                  <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  WhatsApp
                </CtaLink>
              ) : null}
            </div>

            <p className="label-caps mt-10 text-on-brand/75">* {COMPLIANCE_LINE}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}