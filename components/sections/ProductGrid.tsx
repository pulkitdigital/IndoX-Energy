import { cn } from "@/lib/utils";
import { productHref } from "@/lib/constants";
import { products as allProducts, type Product } from "@/content/products";
import { megaMenu } from "@/content/common";
import { productsIntro, type SectionIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import ComplianceNote from "@/components/ui/ComplianceNote";
import FeatureCard from "@/components/sections/FeatureCard";

type ProductGridProps = {
  products?: Product[];
  intro?: SectionIntro;
  showViewAll?: boolean;
};

/**
 * Editorial product grid: the first product is a featured, double-height card on the left;
 * the rest sit in a 2×2 block on the right (desktop). Falls back to an even grid for other counts.
 */
export default function ProductGrid({ products = allProducts, intro = productsIntro, showViewAll = true }: ProductGridProps) {
  const editorial = products.length === 5;

  return (
    <section aria-labelledby="products-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="products-title" {...intro} layout="split" />

        <ul className={cn("mt-14 grid gap-5 sm:grid-cols-2", editorial ? "lg:grid-cols-12 lg:grid-rows-2" : "lg:grid-cols-3")}>
          {products.map((product, i) => {
            const featured = editorial && i === 0;
            return (
              <li key={product.slug} className={cn(editorial && (featured ? "sm:col-span-2 lg:col-span-6 lg:row-span-2" : "lg:col-span-3"))}>
                <ScrollReveal delay={i * 0.06} className="h-full">
                  <FeatureCard
                    href={productHref(product.slug)}
                    icon={product.icon}
                    title={product.name}
                    description={product.oneLiner}
                    image={product.image}
                    specs={product.specs}
                    index={String(i + 1).padStart(2, "0")}
                    featured={featured}
                    tilt
                  />
                </ScrollReveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ComplianceNote />
          {showViewAll ? (
            <CtaLink href={megaMenu.products.href} variant="text" arrow className="shrink-0">
              {megaMenu.products.viewAll}
            </CtaLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
