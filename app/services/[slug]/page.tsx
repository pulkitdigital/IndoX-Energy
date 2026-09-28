import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { serviceHref } from "@/content/navigation";
import { getService, services } from "@/content/services";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

/** Service pages 10–16 (PRD §5): one template, params from content/services.ts, all built at export time. */
export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.seo.title} | IndoX Energy`,
    description: service.seo.description,
    path: serviceHref(service.slug),
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
