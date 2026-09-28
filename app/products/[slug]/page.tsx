import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { productHref } from "@/content/navigation";
import { getProduct, products } from "@/content/products";
import ProductPageTemplate from "@/components/templates/ProductPageTemplate";

/** Product pages 4–8 (PRD §5): one template, params from content/products.ts, all built at export time. */
export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.seo.title} | IndoX Energy`,
    description: product.seo.description,
    path: productHref(product.slug),
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <ProductPageTemplate product={product} />;
}
