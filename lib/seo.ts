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
  /** Open Graph / Twitter image: a public path such as /images/blog/blog-atg.webp. */
  image?: { src: string; alt: string; width: number; height: number };
  /** Article pages: og:type "article" + published time. */
  article?: { publishedTime: string; section: string };
};

const withTrailingSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** Per-page metadata: title, description, canonical (trailing slash), Open Graph, Twitter. Every page uses this. */
export function buildMetadata({ title, description, path, noindex = false, image, article }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${withTrailingSlash(path)}`;
  const images = image ? [{ url: `${SITE_URL}${image.src}`, alt: image.alt, width: image.width, height: image.height }] : undefined;
  const base = { url, siteName: company.name, title, description, locale: "en_IN", ...(images ? { images } : {}) };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: article
      ? { ...base, type: "article", publishedTime: article.publishedTime, section: article.section }
      : { ...base, type: "website" },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images: images.map((i) => i.url) } : {}) },
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

/** Absolute URL for a site path (trailing slash enforced for routes, left alone for files). */
const absolute = (path: string) => `${SITE_URL}${/\.[a-z0-9]+$/i.test(path) ? path : withTrailingSlash(path)}`;

export type Crumb = { name: string; path: string };

/** BreadcrumbList for inner pages. The last crumb is the current page. */
export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, item: absolute(crumb.path) })),
  };
}

/** Product pages. No offers / price (PRD §9: no pricing claims); brand + manufacturer point at the Organization. */
export function productJsonLd({ name, description, path, image }: { name: string; description: string; path: string; image: string }): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: absolute(path),
    image: absolute(image),
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Any block of FAQs (rendered by FAQSection). */
export function faqPageJsonLd(faqs: { q: string; a: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };
}

/** Service pages. Provider = the Organization; served across India (coverage detail stays on the page). */
export function serviceJsonLd({ name, description, path, image, category }: { name: string; description: string; path: string; image: string; category: string }): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    category,
    url: absolute(path),
    image: absolute(image),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
  };
}

/** /contact/: ContactPage pointing at the Organization (its ContactPoint carries the toll-free number). */
export function contactPageJsonLd({ name, description, path }: { name: string; description: string; path: string }): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name,
    description,
    url: absolute(path),
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: { "@id": `${SITE_URL}/#localbusiness` },
  };
}

/** Blog articles. The author is the editorial team (an Organization-style byline, no personal names). */
export function articleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  authorName,
  section,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  authorName: string;
  section: string;
}): JsonLdObject {
  const url = absolute(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: absolute(image),
    datePublished,
    dateModified: datePublished,
    articleSection: section,
    author: { "@type": "Organization", name: authorName, url: `${SITE_URL}/` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}
