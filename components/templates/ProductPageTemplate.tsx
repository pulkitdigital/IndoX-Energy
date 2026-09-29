import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { REVEAL } from "@/lib/motion";
import { productJsonLd } from "@/lib/seo";
import { images } from "@/content/images";
import { ROUTES, productHref, quoteHref, serviceHref } from "@/content/navigation";
import { productPageCopy as copy, products, type Product } from "@/content/products";
import { services } from "@/content/services";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ComplianceLine from "@/components/layout/ComplianceLine";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import TrustStrip from "@/components/layout/TrustStrip";
import ProductCard from "@/components/home/ProductCard";
import ChipList from "@/components/templates/ChipList";
import DetailHero from "@/components/templates/DetailHero";
import FAQSection from "@/components/templates/FAQSection";
import FeatureGrid from "@/components/templates/FeatureGrid";
import RelatedCard from "@/components/templates/RelatedCard";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import FigureFrame from "@/components/ui/FigureFrame";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";
import DottedField from "@/components/decor/DottedField";

/**
 * The one template behind all 5 product pages (PRD §8.4, 9 blocks, in order):
 *   1 Hero (breadcrumbs, name, promise, image, Enquire + MiniQuoteForm) → trust strip
 *   2 Overview (+ 4:3 detail image) · 3 Key features (+ spec table only when client specs exist)
 *   4 Applications · 5 Related service card · 6 Safety & compliance note · 7 FAQs (FAQPage JSON-LD)
 *   8 Other products (4 cards) · 9 QuoteCTABand
 * All copy comes from content/products.ts. Product JSON-LD (no price) + BreadcrumbList JSON-LD.
 */
export default function ProductPageTemplate({ product }: { product: Product }) {
  const position = products.findIndex((p) => p.slug === product.slug) + 1;
  const fig = String(position).padStart(2, "0");
  const service = services.find((s) => s.slug === product.relatedServiceSlug);
  const others = products.filter((p) => p.slug !== product.slug);
  const path = productHref(product.slug);

  return (
    <>
      {/* 1 — Hero (+ MiniQuoteForm) */}
      <DetailHero
        breadcrumbs={[
          { label: "Home", href: ROUTES.home },
          { label: "Our Products", href: ROUTES.products },
          { label: product.name, href: path },
        ]}
        eyebrow={copy.heroEyebrow}
        title={product.name}
        promise={product.promise}
        ctaLabel={copy.enquire}
        callLabel={copy.call}
        callLocation={`product_hero_${product.slug}`}
        image={product.heroImage}
        caption={`FIG. ${fig} — ${product.shortName}`}
        requirement={product.name}
      />

      <TrustStrip />

      {/* 2 — Overview */}
      <section aria-labelledby="overview-title" className="section-y">
        <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading id="overview-title" index="01" eyebrow={copy.overview.eyebrow} title={product.overviewTitle} />
            <ScrollReveal>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed">{product.overview}</p>
              <ComplianceLine className="mt-6" />
            </ScrollReveal>
          </div>
          <ScrollReveal className="lg:col-span-6" delay={REVEAL.stagger}>
            <FigureFrame caption={`FIG. ${fig}.2 — ${product.shortName}, detail`} frameClassName="aspect-[4/3]">
              <ImageSlot slot={product.detailImage} fill framed={false} zoomOnHover={false} />
            </FigureFrame>
          </ScrollReveal>
        </div>
      </section>

      {/* 3 — Key features / specs */}
      <section aria-labelledby="features-title" className="section-y border-y border-border bg-elevated">
        <div className="container-x">
          <SectionHeading id="features-title" index="02" eyebrow={copy.features.eyebrow} title={copy.features.title} />
          <FeatureGrid items={product.features} className="mt-12" />

          {/* Spec table: client-confirmed values only — hidden until content/products.ts has them. */}
          {product.specs?.length ? (
            <ScrollReveal className="mt-10">
              <h3 className="label-caps text-muted-foreground">{copy.features.specsTitle}</h3>
              <dl className="mt-4 divide-y divide-border border-y border-border">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-6">
                    <dt className="text-sm font-medium text-muted-foreground">{spec.label}</dt>
                    <dd className="sm:col-span-2">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          ) : null}

          <ComplianceLine className="mt-8 border-t border-border pt-4" />
        </div>
      </section>

      {/* 4 — Applications */}
      <section aria-labelledby="applications-title" className="relative isolate section-y">
        <DottedField side="left" />
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <SectionHeading id="applications-title" index="03" eyebrow={copy.applications.eyebrow} title={copy.applications.title} className="lg:col-span-5" />
          <ChipList items={product.applications} className="lg:col-span-7 lg:pt-14" />
        </div>
      </section>

      {/* 5 — Related service */}
      {service ? (
        <section aria-labelledby="related-title" className="section-y border-y border-border bg-elevated">
          <div className="container-x">
            <SectionHeading
              id="related-title"
              index="04"
              eyebrow={copy.related.eyebrow}
              title={copy.related.title}
              description={copy.related.description}
              layout="split"
            />
            <RelatedCard
              className="mt-10"
              href={serviceHref(service.slug)}
              icon={service.icon}
              kicker={service.group}
              title={service.name}
              text={service.promise}
              cta={copy.related.cta}
            />
          </div>
        </section>
      ) : null}

      {/* 6 — Safety & compliance note */}
      <section aria-labelledby="safety-title" className="border-b border-border py-10 sm:py-12">
        <ScrollReveal className="container-x flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <ShieldCheck className="size-7 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
          <div className="flex-1">
            <h2 id="safety-title" className="sr-only">
              {copy.safety.eyebrow}
            </h2>
            <Eyebrow index="05" label={copy.safety.eyebrow} />
            <p className="mt-3 text-[1.0625rem]">{product.safetyNote}</p>
          </div>
          <Link href={`${ROUTES.about}#quality-safety`} className="hv-text-link shrink-0 text-sm font-semibold text-link">
            {copy.safety.linkLabel}
          </Link>
        </ScrollReveal>
      </section>

      {/* 7 — FAQs (+ FAQPage JSON-LD) */}
      <FAQSection intro={{ index: "06", eyebrow: copy.faqs.eyebrow, title: copy.faqs.title }} faqs={product.faqs} className="border-t-0" />

      {/* 8 — Other products */}
      <section aria-labelledby="others-title" className="section-y">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="others-title" index="07" eyebrow={copy.others.eyebrow} title={copy.others.title} />
            <ScrollReveal className="shrink-0">
              <CtaLink href={ROUTES.products} variant="outline" arrow>
                {copy.others.cta}
              </CtaLink>
            </ScrollReveal>
          </div>
          <ul className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other, i) => (
              <li key={other.slug}>
                <ScrollReveal delay={i * REVEAL.stagger} className="h-full">
                  <ProductCard
                    href={productHref(other.slug)}
                    title={other.name}
                    description={other.oneLiner}
                    image={other.heroImage}
                    labels={other.labels}
                    index={String(products.indexOf(other) + 1).padStart(2, "0")}
                  />
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — Quote CTA band */}
      <QuoteCTABand index="08" quoteHref={quoteHref({ product: product.slug, service: product.relatedServiceSlug })} />

      <JsonLd data={productJsonLd({ name: product.name, description: product.seo.description, path, image: images[product.heroImage].src })} />
    </>
  );
}
