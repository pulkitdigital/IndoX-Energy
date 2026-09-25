/**
 * Site-wide constants: contact details, company info, routes and navigation.
 * Values marked PLACEHOLDER must be confirmed by the client before launch (PRD §9).
 */

/** Mirrors --bg-base in globals.css; needed as a literal for the viewport theme-color meta tag. */
export const THEME_COLOR = "#050505";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.indoxenergy.com").replace(/\/$/, "");

export const COMPANY = {
  name: "IndoX Energy",
  legalName: "IndoX Energy Private Limited",
  tagline: "Powering Sustainable Energy",
  positioning: "From Fuel Supply to Fuel Intelligence",
  // PLACEHOLDER — client to provide (PRD §9 item 6)
  cin: null as string | null,
  // PLACEHOLDER — client to provide (PRD §9 item 6)
  gstin: null as string | null,
  // PLACEHOLDER — client to provide registered office address (PRD §9 item 6)
  address: null as string | null,
} as const;

export const CONTACT = {
  tollFree: "1800-202-1200",
  tollFreeHref: "tel:18002021200",
  email: "info@indoxenergy.com",
  emailHref: "mailto:info@indoxenergy.com",
} as const;

// PLACEHOLDER — WhatsApp number comes from NEXT_PUBLIC_WHATSAPP_NUMBER (digits with country code).
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
export const WHATSAPP_DEFAULT_MESSAGE = "Hi IndoX, I need a quote for…";

export const hasWhatsApp = WHATSAPP_NUMBER.length > 0;

/** wa.me deep link with a pre-filled message. Falls back to the contact page until the number is configured. */
export function whatsappHref(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  if (!hasWhatsApp) return ROUTES.contact;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Canonical routes from the PRD §4 sitemap. Trailing slashes match `trailingSlash: true`. */
export const ROUTES = {
  home: "/",
  about: "/about/",
  products: "/products/",
  services: "/services/",
  evCharging: "/ev-charging/",
  endToEnd: "/end-to-end-energy-infrastructure/",
  blog: "/blog/",
  contact: "/contact/",
  thankYou: "/thank-you/",
  privacy: "/privacy/",
  terms: "/terms/",
} as const;

export const productHref = (slug: string) => `/products/${slug}/`;
export const serviceHref = (slug: string) => `/services/${slug}/`;
export const blogHref = (slug: string) => `/blog/${slug}/`;

export const COMPLIANCE_LINE = "All supply subject to applicable laws, approvals and permissions.";

export type NavLink = { label: string; href: string };
export type NavItem =
  | ({ kind: "link" } & NavLink)
  | { kind: "mega"; label: string; href: string; menu: "products" | "services" };

/** Desktop header order — PRD §5. */
export const MAIN_NAV: NavItem[] = [
  { kind: "link", label: "About Us", href: ROUTES.about },
  { kind: "mega", label: "Our Products", href: ROUTES.products, menu: "products" },
  { kind: "mega", label: "Our Services", href: ROUTES.services, menu: "services" },
  { kind: "link", label: "EV Charging", href: ROUTES.evCharging },
  { kind: "link", label: "End-to-End Infrastructure", href: ROUTES.endToEnd },
  { kind: "link", label: "Blog", href: ROUTES.blog },
  { kind: "link", label: "Contact Us", href: ROUTES.contact },
];

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { label: "About Us", href: ROUTES.about },
  { label: "EV Charging", href: ROUTES.evCharging },
  { label: "End-to-End Infrastructure", href: ROUTES.endToEnd },
  { label: "Blog", href: ROUTES.blog },
  { label: "Contact Us", href: ROUTES.contact },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms", href: ROUTES.terms },
];
