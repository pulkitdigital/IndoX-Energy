import { cn } from "@/lib/utils";
import { REVEAL } from "@/lib/motion";
import { serviceJsonLd } from "@/lib/seo";
import { images } from "@/content/images";
import { industries } from "@/content/industries";
import { ROUTES, productHref, quoteHref, serviceHref } from "@/content/navigation";
import { products } from "@/content/products";
import { servicePageCopy as copy, services, type Service } from "@/content/services";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ComplianceLine from "@/components/layout/ComplianceLine";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import TrustStrip from "@/components/layout/TrustStrip";
import ProductCard from "@/components/home/ProductCard";
import ChipList from "@/components/templates/ChipList";
import DetailHero from "@/components/templates/DetailHero";
import FAQSection from "@/components/templates/FAQSection";
import FeatureGrid from "@/components/templates/FeatureGrid";
import ProcessStrip from "@/components/templates/ProcessStrip";
import RelatedCard from "@/components/templates/RelatedCard";
import CtaLink from "@/components/ui/CtaLink";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";

/** Three other services: same group first, then catalogue order. */
function otherServices(current: Service): Service[] {
  const rest = services.filter((s) => s.slug !== current.slug);
  return [...rest.filter((s) => s.group === current.group), ...rest.filter((s) => s.group !== current.group)].slice(0, 3);
}

/**
 * The one template behind all 7 service pages (PRD §8.6, 10 blocks, in order):
 *   1 Hero (breadcrumbs, name, promise, image, Get a Quote + MiniQuoteForm) → trust strip
 *   2 The problem (3) · 3 What we do (grid) · 4 How it works (numbered strip, line draw) · 5 Benefits (3–4 cards)
 *   6 Who it's for (industry chips) · 7 Related product card · 8 FAQs (FAQPage JSON-LD) · 9 Other services (3)
 *   10 QuoteCTABand
 * All copy comes from content/services.ts. Service JSON-LD + BreadcrumbList JSON-LD.
 */
export default function ServicePageTemplate({ service }: { service: Service }) {
  const position = services.findIndex((s) => s.slug === service.slug) + 1;
  const fig = String(position).padStart(2, "0");
  const path = serviceHref(service.slug);
  const product = products.find((p) => p.slug === service.relatedProductSlug);
  const industryNames = service.industries.flatMap((slug) => industries.find((industry) => industry.slug === slug)?.name ?? []);
  const benefitCols = service.benefits.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <>
      {/* 1 — Hero (+ MiniQuoteForm) */}
      <DetailHero
        breadcrumbs={[
          { label: "Home", href: ROUTES.home },
          { label: "Our Services", href: ROUTES.services },
          { label: service.name, href: path },
        ]}
        eyebrow={`${copy.heroEyebrow} · ${service.group}`}
        title={service.name}
        promise={service.promise}
        ctaLabel={copy.getQuote}
        callLabel={copy.call}
        callLocation={`service_hero_${service.slug}`}
        image={service.heroImage}
        caption={`FIG. S-${fig} — ${service.shortName}`}
        requirement={service.name}
        formTitle={copy.formTitle}
      />

      <TrustStrip />

      {/* 2 — The problem */}
      <section aria-labelledby="problem-title" className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <SectionHeading id="problem-title" index="01" eyebrow={copy.problem.eyebrow} title={copy.problem.title} className="lg:col-span-4" />
          <ol className="grid border-t border-border md:grid-cols-3 lg:col-span-8">
            {service.problems.map((problem, i) => (
              <li key={problem} className="border-b border-border py-6 md:border-b-0 md:px-6 md:py-8 md:first:pl-0 md:[&+li]:border-l">
                <ScrollReveal delay={i * REVEAL.stagger} y={10}>
                  <p className="label-caps text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-lg leading-snug font-medium">{problem}</p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3 — What we do */}
      <section aria-labelledby="whatwedo-title" className="section-y border-y border-border bg-elevated">
        <div className="container-x">
          <SectionHeading id="whatwedo-title" index="02" eyebrow={copy.whatWeDo.eyebrow} title={copy.whatWeDo.title} />
          <FeatureGrid items={service.whatWeDo} className="mt-12" />
        </div>
      </section>

      {/* 4 — How it works */}
      <section aria-labelledby="how-title" className="section-y">
        <div className="container-x">
          <SectionHeading id="how-title" index="03" eyebrow={copy.howItWorks.eyebrow} title={copy.howItWorks.title} />
          <ScrollReveal className="mt-14">
            <ProcessStrip steps={service.howItWorks} stepLabel={copy.howItWorks.stepLabel} />
          </ScrollReveal>
          <ComplianceLine className="mt-12 border-t border-border pt-4" />
        </div>
      </section>

      {/* 5 — Benefits */}
      <section aria-labelledby="benefits-title" className="section-y border-y border-border bg-elevated">
        <div className="container-x">
          <SectionHeading id="benefits-title" index="04" eyebrow={copy.benefits.eyebrow} title={copy.benefits.title} />
          <ul className={cn("mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2", benefitCols)}>
            {service.benefits.map((benefit, i) => (
              <li key={benefit.title}>
                <ScrollReveal delay={i * REVEAL.stagger} className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
                  <span className="label-caps text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-lg leading-snug">{benefit.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{benefit.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Who it's for */}
      <section aria-labelledby="who-title" className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <SectionHeading id="who-title" index="05" eyebrow={copy.who.eyebrow} title={copy.who.title} className="lg:col-span-5" />
          <ChipList items={industryNames} className="lg:col-span-7 lg:pt-14" />
        </div>
      </section>

      {/* 7 — Related product */}
      {product ? (
        <section aria-labelledby="related-title" className="section-y border-y border-border bg-elevated">
          <div className="container-x">
            <SectionHeading
              id="related-title"
              index="06"
              eyebrow={copy.related.eyebrow}
              title={copy.related.title}
              description={copy.related.description}
              layout="split"
            />
            <RelatedCard
              className="mt-10"
              href={productHref(product.slug)}
              icon={product.icon}
              kicker={copy.related.eyebrow}
              title={product.name}
              text={product.oneLiner}
              cta={copy.related.cta}
            />
          </div>
        </section>
      ) : null}

      {/* 8 — FAQs (+ FAQPage JSON-LD) */}
      <FAQSection intro={{ index: "07", eyebrow: copy.faqs.eyebrow, title: copy.faqs.title }} faqs={service.faqs} className="border-y-0 bg-background" />

      {/* 9 — Other services */}
      <section aria-labelledby="others-title" className="section-y border-y border-border bg-elevated">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="others-title" index="08" eyebrow={copy.others.eyebrow} title={copy.others.title} />
            <ScrollReveal className="shrink-0">
              <CtaLink href={ROUTES.services} variant="outline" arrow>
                {copy.others.cta}
              </CtaLink>
            </ScrollReveal>
          </div>
          <ul className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices(service).map((other, i) => (
              <li key={other.slug}>
                <ScrollReveal delay={i * REVEAL.stagger} className="h-full">
                  <ProductCard
                    href={serviceHref(other.slug)}
                    title={other.name}
                    description={other.promise}
                    image={other.heroImage}
                    labels={[other.group]}
                    index={String(services.indexOf(other) + 1).padStart(2, "0")}
                  />
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10 — Quote CTA band */}
      <QuoteCTABand index="09" quoteHref={quoteHref({ service: service.slug, product: service.relatedProductSlug })} />

      <JsonLd
        data={serviceJsonLd({
          name: service.name,
          description: service.seo.description,
          path,
          image: images[service.heroImage].src,
          category: service.group,
        })}
      />
    </>
  );
}
