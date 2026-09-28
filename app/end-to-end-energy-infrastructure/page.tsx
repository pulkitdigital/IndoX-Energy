import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { REVEAL } from "@/lib/motion";
import { endToEnd } from "@/content/end-to-end";
import { ROUTES } from "@/content/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComplianceLine from "@/components/layout/ComplianceLine";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import BusinessModelCards from "@/components/end-to-end/BusinessModelCards";
import EcosystemFlow from "@/components/end-to-end/EcosystemFlow";
import PackageSelector from "@/components/end-to-end/PackageSelector";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import FigureFrame from "@/components/ui/FigureFrame";
import ImageSlot from "@/components/ui/ImageSlot";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...endToEnd.seo, path: ROUTES.endToEnd });
}

/**
 * End-to-End Energy Infrastructure (PRD §8.8), in order: Hero → Ecosystem flow (7 linked nodes) → Our Business
 * Model (4 cards) → "Build your package" selector → QuoteCTABand (pre-selects End-to-End). BreadcrumbList JSON-LD.
 */
export default function EndToEndPage() {
  const { hero } = endToEnd;
  return (
    <>
      <section aria-labelledby="e2e-hero-title" className="pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "End-to-End Infrastructure", href: ROUTES.endToEnd },
            ]}
          />
          <ScrollReveal className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <Eyebrow index="00" label={hero.eyebrow} />
              <h1 id="e2e-hero-title" className="text-display mt-6">
                {hero.title}
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">{hero.intro}</p>
              <CtaLink href={hero.cta.href} size="lg" arrow magnetic className="mt-6 w-full sm:w-auto">
                {hero.cta.label}
              </CtaLink>
              <ComplianceLine className="mt-6 border-t border-border pt-4" />
            </div>
          </ScrollReveal>
          <ScrollReveal className="mt-12" delay={REVEAL.stagger}>
            <FigureFrame caption={hero.caption} frameClassName="aspect-[16/9]">
              <ImageSlot slot={hero.image} fill priority framed={false} zoomOnHover={false} />
            </FigureFrame>
          </ScrollReveal>
        </div>
      </section>

      <EcosystemFlow index="01" />
      <BusinessModelCards index="02" />
      <PackageSelector index="03" />
      <QuoteCTABand index="04" quoteHref={hero.cta.href} />
    </>
  );
}
