import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Building2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { buildMetadata, contactPageJsonLd } from "@/lib/seo";
import { REVEAL } from "@/lib/motion";
import { company, hasWhatsApp, mailHref } from "@/content/company";
import { contact, responsePromise } from "@/content/contact";
import { ROUTES } from "@/content/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import TrustStrip from "@/components/layout/TrustStrip";
import CoverageCheck from "@/components/forms/CoverageCheck";
import QuoteFormFull from "@/components/forms/QuoteFormFull";
import ContactLink from "@/components/ui/ContactLink";
import Eyebrow from "@/components/ui/Eyebrow";
import FigureFrame from "@/components/ui/FigureFrame";
import ImageSlot from "@/components/ui/ImageSlot";
import PlaceholderBadge from "@/components/ui/PlaceholderBadge";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...contact.seo, path: ROUTES.contact });
}

function ContactCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
      <span className="mt-0.5 shrink-0 text-accent">{icon}</span>
      <div className="min-w-0">
        <p className="label-caps text-muted-foreground">{title}</p>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}

const ICON = { className: "size-5", strokeWidth: 1.5, "aria-hidden": true } as const;

/**
 * Contact Us (PRD §8.11): hero → trust strip → QuoteFormFull (#quote-form) beside the contact cards → coverage
 * check → office map. No QuoteCTABand here. Numbers, email and office come from content/company.ts; the map
 * only renders once a registered address exists (no invented address). ContactPage + BreadcrumbList JSON-LD.
 */
export default function ContactPage() {
  const { hero, cards, coverage, office } = contact;
  const mapQuery = company.address ? encodeURIComponent(company.address) : "";

  return (
    <>
      <section aria-labelledby="contact-hero-title" className="pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Contact Us", href: ROUTES.contact },
            ]}
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <ScrollReveal className="lg:col-span-7">
              <Eyebrow index="00" label={hero.eyebrow} />
              <h1 id="contact-hero-title" className="text-display mt-6">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">{hero.intro}</p>
              <p className="mt-6 inline-flex items-center gap-2.5 rounded-md border border-border bg-card px-4 py-2.5 font-medium">
                <Clock className="size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
                {responsePromise}
              </p>
            </ScrollReveal>
            <ScrollReveal className="lg:col-span-5" delay={REVEAL.stagger}>
              <FigureFrame caption={hero.caption} frameClassName="aspect-[16/9]">
                <ImageSlot slot={hero.image} fill priority framed={false} zoomOnHover={false} />
              </FigureFrame>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="section-y">
        <div className="container-x grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <QuoteFormFull />
          </div>

          <aside aria-labelledby="contact-cards-title" className="lg:sticky lg:top-28 lg:col-span-5">
            <ScrollReveal className="rounded-lg border border-border bg-card px-5 sm:px-7">
              <h2 id="contact-cards-title" className="sr-only">
                {cards.eyebrow}
              </h2>
              <ContactCard icon={<Phone {...ICON} />} title={cards.tollFree.title}>
                <ContactLink kind="call" location="contact_card" className="hv-text-link font-heading text-xl font-bold text-heading">
                  {company.tollFree}
                </ContactLink>
              </ContactCard>
              <ContactCard icon={<MessageCircle {...ICON} />} title={cards.whatsapp.title}>
                {hasWhatsApp ? (
                  <ContactLink kind="whatsapp" location="contact_card" className="hv-text-link font-semibold text-link">
                    {cards.whatsapp.text}
                  </ContactLink>
                ) : (
                  <PlaceholderBadge>{cards.whatsapp.pending}</PlaceholderBadge>
                )}
              </ContactCard>
              <ContactCard icon={<Mail {...ICON} />} title={cards.email.title}>
                <a href={mailHref} className="hv-text-link font-semibold break-all text-link">
                  {company.email}
                </a>
              </ContactCard>
              <ContactCard icon={<Building2 {...ICON} />} title={cards.office.title}>
                {company.address ? <address className="not-italic">{company.address}</address> : <PlaceholderBadge>{cards.office.pending}</PlaceholderBadge>}
              </ContactCard>
            </ScrollReveal>
          </aside>
        </div>
      </section>

      <section aria-labelledby="coverage-title" className="section-y border-y border-border bg-elevated">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <SectionHeading id="coverage-title" index={coverage.index} eyebrow={coverage.eyebrow} title={coverage.title} description={coverage.description} className="lg:col-span-5" />
          <ScrollReveal className="lg:col-span-7 lg:pt-12">
            <CoverageCheck />
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="office-title" className="section-y">
        <div className="container-x">
          <SectionHeading id="office-title" index={office.index} eyebrow={office.eyebrow} title={office.title} />
          <ScrollReveal className="mt-10">
            {company.address ? (
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <iframe
                  title={office.mapTitle}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[16/9] w-full border-0 sm:aspect-[21/9]"
                />
                <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                  <address className="not-italic">{company.address}</address>
                  <a
                    href={company.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hv-text-link shrink-0 text-sm font-semibold text-link"
                  >
                    {office.openInMaps}
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-4 rounded-lg border border-dashed border-border-strong bg-card p-8 sm:flex-row sm:items-center">
                <MapPin className="size-7 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
                <p className="flex-1 text-muted-foreground">{office.placeholder}</p>
                <PlaceholderBadge>{cards.office.pending}</PlaceholderBadge>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      <JsonLd data={contactPageJsonLd({ name: contact.seo.title, description: contact.seo.description, path: ROUTES.contact })} />
    </>
  );
}
