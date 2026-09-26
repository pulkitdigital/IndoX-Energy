import { cn } from "@/lib/utils";
import { REVEAL } from "@/lib/motion";
import { products } from "@/content/products";
import { megaMenus, productHref } from "@/content/navigation";
import { productsIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import ComplianceLine from "@/components/layout/ComplianceLine";
import ProductCard from "@/components/home/ProductCard";

/**
 * Products — five identical cards (same 4:3 image box, equal heights via auto-rows-fr).
 * Desktop 3 + 2 (second row centred on a 6-col grid), tablet 2 columns, mobile 1.
 */
export default function ProductGrid() {
  // With 5 products the last row holds 2 cards: start it one column in so it sits centred under the 3 above.
  const centreFrom = products.length % 3 === 2 ? products.length - 2 : -1;
  return (
    <section aria-labelledby="products-title" className="section-y border-b border-border bg-elevated">
      <div className="container-x">
        <SectionHeading id="products-title" {...productsIntro} layout="split" />

        <ul className="mt-14 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {products.map((product, i) => (
            <li key={product.slug} className={cn("lg:col-span-2", i === centreFrom && "lg:col-start-2")}>
              <ScrollReveal delay={(i % 3) * REVEAL.stagger} className="h-full">
                <ProductCard
                  href={productHref(product.slug)}
                  title={product.name}
                  description={product.oneLiner}
                  image={product.heroImage}
                  labels={product.labels}
                  index={String(i + 1).padStart(2, "0")}
                />
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <ComplianceLine />
          <CtaLink href={megaMenus.products.href} variant="text" arrow className="shrink-0">
            {megaMenus.products.viewAll}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
