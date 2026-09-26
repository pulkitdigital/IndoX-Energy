import type { Metadata } from "next";
import { SITE_URL, company, mailHref } from "@/content/company";

type PageMetaInput = {
  /** Unique per page. Rendered as-is (no template), so include the brand where you want it. */
  title: string;
  /** Unique per page, ~140–160 characters. */
  description: string;
  /** Route path, e.g. "/products/fuel-bowser/". A trailing slash is enforced to match the static export. */
  path: string;
  /** Pages like /thank-you/ opt out of indexing. */
  noindex?: boolean;
};

const withTrailingSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** Per-page metadata: title, description, canonical (trailing slash), Open Graph, Twitter. Every page uses this. */
export function buildMetadata({ title, description, path, noindex = false }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${withTrailingSlash(path)}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, siteName: company.name, title, description, locale: "en_IN" },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export type JsonLdObject = { "@context": "https://schema.org"; "@type": string } & Record<string, unknown>;

const telephone = `+91-${company.tollFree}`;
const sameAs = company.socials.flatMap((s) => (s.href ? [s.href] : []));

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo/logo.png`,
    email: company.email,
    slogan: company.tagline,
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [{ "@type": "ContactPoint", telephone, contactType: "sales", areaServed: "IN", availableLanguage: ["en", "hi"] }],
  };
}

export function localBusinessJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: company.name,
    url: `${SITE_URL}/`,
    telephone,
    email: mailHref.replace("mailto:", ""),
    areaServed: { "@type": "Country", name: "India" },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    // Registered address omitted until the client confirms it (PRD §12 item 6) — no invented data.
    ...(company.address ? { address: company.address } : {}),
  };
}
