import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { REVEAL } from "@/lib/motion";
import { ROUTES, productHref, serviceHref } from "@/content/navigation";
import { products } from "@/content/products";
import { serviceGroups, services, servicesOverview as copy } from "@/content/services";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComplianceLine from "@/components/layout/ComplianceLine";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import ProductCard from "@/components/home/ProductCard";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import DottedField from "@/components/decor/DottedField";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...copy.seo, path: ROUTES.services });
}

/** Rows each band spans on desktop (3 cards per row beside the band label). */
const ROW_SPAN: Record<number, string> = { 1: "lg:row-span-1", 2: "lg:row-span-2", 3: "lg:row-span-3" };

/**
 * Services overview (PRD §8.5): hero → 7 identical cards in three labelled bands (Supply / Infrastructure /
 * Intelligence) → "Also see the products" strip → quote band. Desktop: one 4-column grid with equal row heights
 * (band label in column 1, cards in 2–4), so every card is the same size across bands.
 */
export default function ServicesPage() {
  return (
    <>
      <section aria-labelledby="services-hero-title" className="pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Our Services", href: ROUTES.services },
            ]}
          />
          <ScrollReveal className="mt-10 max-w-4xl">
            <Eyebrow index="00" label={copy.hero.eyebrow} />
            <h1 id="services-hero-title" className="text-display mt-6">
              {copy.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">{copy.hero.description}</p>
            <ComplianceLine className="mt-8 max-w-2xl border-t border-border pt-4" />
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="services-grid-title" className="section-y border-y border-border bg-elevated">
        <div className="container-x">
          <SectionHeading id="services-grid-title" index={copy.grid.index} eyebrow={copy.grid.eyebrow} title={copy.grid.title} description={copy.grid.description} layout="split" />
          {/* Cards reserve 3 description lines so they match in height at every width, not only on desktop. */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4 [&_a_p]:min-h-[4.875em]">
            {serviceGroups.map(({ group, description }) => {
              const inGroup = services.filter((service) => service.group === group);
              return (
                <Fragment key={group}>
                  <ScrollReveal
                    className={cn(
                      "border-t border-border-strong pt-4 sm:col-span-2 max-lg:[&:not(:first-child)]:mt-6 lg:col-span-1 lg:col-start-1 lg:pr-6",
                      ROW_SPAN[Math.ceil(inGroup.length / 3)],
                    )}
                  >
                    <p className="label-caps text-accent">{copy.grid.count(inGroup.length)}</p>
                    <h3 className="mt-3 text-2xl">{group}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>
                  </ScrollReveal>
                  {inGroup.map((service, i) => (
                    <ScrollReveal key={service.slug} delay={(i % 3) * REVEAL.stagger} className="h-full">
                      <ProductCard
                        href={serviceHref(service.slug)}
                        title={service.name}
                        description={service.promise}
                        image={service.heroImage}
                        labels={[service.group]}
                        index={String(services.indexOf(service) + 1).padStart(2, "0")}
                        ctaLabel={copy.grid.cta}
                      />
                    </ScrollReveal>
                  ))}
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="services-products-title" className="relative isolate section-y">
        <DottedField side="left" />
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="services-products-title" index={copy.products.index} eyebrow={copy.products.eyebrow} title={copy.products.title} />
            <ScrollReveal className="shrink-0">
              <CtaLink href={ROUTES.products} variant="outline" arrow>
                {copy.products.cta}
              </CtaLink>
            </ScrollReveal>
          </div>
          <ScrollReveal className="mt-10">
            <ul className="flex flex-wrap gap-2.5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={productHref(product.slug)} className="hv-chip flex items-center gap-2.5 rounded-md border border-border bg-card px-4 py-2.5 text-[0.9375rem] font-medium">
                    <Icon name={product.icon} className="hv-icon size-4 text-accent" />
                    {product.name}
                    <ArrowRight className="size-3.5 text-link" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <QuoteCTABand index="03" />
    </>
  );
}
