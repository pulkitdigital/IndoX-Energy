import type { Metadata } from "next";
import { COMPANY, CONTACT, SITE_URL } from "@/lib/constants";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path with trailing slash, e.g. "/products/fuel-bowser/" */
  path: string;
  /** Use the title as-is instead of applying the "| IndoX Energy" template. */
  absoluteTitle?: boolean;
};

/** Per-page metadata with canonical + Open Graph + Twitter. Every page must use this. */
export function buildMetadata({ title, description, path, absoluteTitle = false }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} | ${COMPANY.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: COMPANY.name,
      title: fullTitle,
      description,
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export type JsonLdObject = { "@context": "https://schema.org"; "@type": string } & Record<string, unknown>;

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    email: CONTACT.email,
    slogan: COMPANY.tagline,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-1800-202-1200",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
  };
}

export function localBusinessJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: COMPANY.name,
    url: SITE_URL,
    telephone: "+91-1800-202-1200",
    email: CONTACT.email,
    areaServed: { "@type": "Country", name: "India" },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    // Registered address omitted until the client confirms it (PRD §9 item 6) — no invented data.
    ...(COMPANY.address ? { address: COMPANY.address } : {}),
  };
}
