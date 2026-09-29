import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { REVEAL } from "@/lib/motion";
import { ROUTES, productHref, serviceHref } from "@/content/navigation";
import { products, productsOverview as copy } from "@/content/products";
import { services } from "@/content/services";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComplianceLine from "@/components/layout/ComplianceLine";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import OverviewGrid from "@/components/templates/OverviewGrid";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import RouteLine from "@/components/decor/RouteLine";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...copy.seo, path: ROUTES.products });
}

/** Products overview (PRD §8.3): hero → 5 identical cards → products + services strip → quote band. */
export default function ProductsPage() {
  return (
    <>
      <section aria-labelledby="products-hero-title" className="pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Our Products", href: ROUTES.products },
            ]}
          />
          <ScrollReveal className="mt-10 max-w-4xl">
            <Eyebrow index="00" label={copy.hero.eyebrow} />
            <h1 id="products-hero-title" className="text-display mt-6">
              {copy.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">{copy.hero.description}</p>
            <ComplianceLine className="mt-8 max-w-2xl border-t border-border pt-4" />
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="products-grid-title" className="section-y border-y border-border bg-elevated">
        <div className="container-x">
          <SectionHeading id="products-grid-title" {...copy.grid} layout="split" />
          <OverviewGrid
            className="mt-12"
            ctaLabel={copy.grid.cta}
            items={products.map((product) => ({
              key: product.slug,
              href: productHref(product.slug),
              title: product.name,
              description: product.oneLiner,
              image: product.heroImage,
              labels: product.labels,
            }))}
          />
        </div>
      </section>

      <section aria-labelledby="together-title" className="relative isolate section-y">
        <RouteLine/>
        <div className="container-x">
          <SectionHeading id="together-title" {...copy.together} layout="split" />
          <ul className="mt-12 border-t border-border">
            {products.map((product, i) => {
              const service = services.find((s) => s.slug === product.relatedServiceSlug);
              if (!service) return null;
              return (
                <li key={product.slug} className="border-b border-border">
                  <ScrollReveal delay={i * REVEAL.stagger} y={10} className="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-8">
                    <Link href={productHref(product.slug)} className="hv-group flex items-start gap-4">
                      <Icon name={product.icon} className="hv-icon mt-1 size-6 shrink-0 text-accent" />
                      <span>
                        <span className="label-caps block text-muted-foreground">{copy.together.productLabel}</span>
                        <span className="hv-accent mt-1 block font-heading text-lg font-bold text-heading">{product.name}</span>
                      </span>
                    </Link>
                    <ArrowRight className="hidden size-5 text-link md:block" strokeWidth={1.5} aria-hidden="true" />
                    <Link href={serviceHref(service.slug)} className="hv-group flex items-start gap-4">
                      <Icon name={service.icon} className="hv-icon mt-1 size-6 shrink-0 text-link" />
                      <span>
                        <span className="label-caps block text-muted-foreground">{copy.together.serviceLabel}</span>
                        <span className="hv-accent mt-1 block font-heading text-lg font-bold text-heading">{service.name}</span>
                        <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted-foreground">{service.promise}</span>
                      </span>
                    </Link>
                  </ScrollReveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <QuoteCTABand index="03" />
    </>
  );
}
