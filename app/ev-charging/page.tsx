import type { Metadata } from "next";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { ev } from "@/content/ev";
import { images } from "@/content/images";
import { ROUTES } from "@/content/navigation";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import ACvsDCTable from "@/components/ev/ACvsDCTable";
import EVLocations from "@/components/ev/EVLocations";
import EVProcess from "@/components/ev/EVProcess";
import EVSolutions from "@/components/ev/EVSolutions";
import DetailHero from "@/components/templates/DetailHero";
import FAQSection from "@/components/templates/FAQSection";
import JsonLd from "@/components/seo/JsonLd";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...ev.seo, path: ROUTES.evCharging });
}

/**
 * EV Charging Solutions (PRD §8.7), in order: Hero (Book a Site Survey → quote form with EV pre-selected,
 * + MiniQuoteForm) → Our EV solutions → How it works → Suitable locations → AC vs DC table → FAQs →
 * "Host an IndoX charger." band (solid brand-blue). Service + FAQPage + BreadcrumbList JSON-LD.
 */
export default function EVChargingPage() {
  const { hero } = ev;
  return (
    <>
      <DetailHero
        breadcrumbs={[
          { label: "Home", href: ROUTES.home },
          { label: "EV Charging", href: ROUTES.evCharging },
        ]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        promise={hero.promise}
        ctaLabel={hero.cta.label}
        ctaHref={hero.cta.href}
        callLabel={hero.call}
        callLocation="ev_hero"
        image={hero.image}
        imageAspect="16/9"
        caption={hero.caption}
        requirement={hero.requirement}
        formTitle={hero.formTitle}
      />
      <EVSolutions index="01" />
      <EVProcess index="02" />
      <EVLocations index="03" />
      <ACvsDCTable index="04" />
      <FAQSection intro={{ index: "05", eyebrow: ev.faqs.eyebrow, title: ev.faqs.title }} faqs={ev.faqs.items} />
      <QuoteCTABand index="06" quoteHref={hero.cta.href} copy={ev.cta} solid whatsapp={false} />

      <JsonLd
        data={serviceJsonLd({
          name: ev.name,
          description: ev.seo.description,
          path: ROUTES.evCharging,
          image: images[hero.image].src,
          category: "EV Charging",
        })}
      />
    </>
  );
}
