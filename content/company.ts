import type { ImageSlotKey } from "@/content/images";

/**
 * Company facts, contact channels and legal lines. Values marked PLACEHOLDER must be confirmed by the
 * client before launch (PRD §12 item 6). `null` = not supplied yet; components render a PlaceholderBadge.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.indoxenergy.com").replace(/\/$/, "");

/** Mirrors the dark --bg token (--color-brand-navy) in app/globals.css; needed as a literal for the viewport theme-color meta tag. */
export const THEME_COLOR = "#011433";

const digits = (value: string | undefined) => (value ?? "").replace(/\D/g, "");

/** Toll-free from env (digits only), falling back to the published number. */
const TOLL_FREE_DIGITS = digits(process.env.NEXT_PUBLIC_TOLL_FREE) || "18002021200";

/** 18002021200 → 1800-202-1200 */
function formatTollFree(value: string): string {
  return /^1800\d{7}$/.test(value) ? `${value.slice(0, 4)}-${value.slice(4, 7)}-${value.slice(7)}` : value;
}

/** PLACEHOLDER — WhatsApp business number from NEXT_PUBLIC_WHATSAPP_NUMBER (country code + number, e.g. 919XXXXXXXXX). */
const WHATSAPP_DIGITS = digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
/** A real number is 12 digits for India (91 + 10). The .env.example value "91XXXXXXXXXX" strips to "91" and is ignored. */
export const hasWhatsApp = WHATSAPP_DIGITS.length >= 11;

export type SocialLink = { label: string; href: string | null };

export const company = {
  name: "IndoX Energy",
  legalName: "IndoX Energy Private Limited",
  /** Working tagline — final choice pending (PRD §12 item 2). */
  tagline: "Powering Sustainable Energy",
  positioning: "From Fuel Supply to Fuel Intelligence",
  /** PLACEHOLDER — client to provide (PRD §12 item 6) */
  cin: null as string | null,
  /** PLACEHOLDER — client to provide (PRD §12 item 6) */
  gstin: null as string | null,
  /** PLACEHOLDER — registered office address, client to provide (PRD §12 item 6) */
  address: null as string | null,
  /** PLACEHOLDER — Google Maps link for the registered office */
  mapUrl: null as string | null,
  email: "info@indoxenergy.com",
  tollFree: formatTollFree(TOLL_FREE_DIGITS),
  tollFreeDigits: TOLL_FREE_DIGITS,
  /** PLACEHOLDER — social profiles. LinkedIn first (PRD §6). Hidden until a URL is supplied. */
  socials: [
    { label: "LinkedIn", href: null },
    { label: "Instagram", href: null },
    { label: "Facebook", href: null },
    { label: "YouTube", href: null },
  ] as SocialLink[],
} as const;

/** Leadership card (About › Leadership). The section renders nothing while `leadership` is empty. */
export type Leader = {
  name: string;
  role: string;
  /** Image slot from content/images.ts (add an about/ slot per person). */
  photo?: ImageSlotKey;
  linkedin?: string;
};

/** Licence / certificate card (About › Licences). Real documents only; the section renders nothing while empty. */
export type Licence = {
  name: string;
  number: string;
  /** Optional link to the document, e.g. /docs/licence-peso.pdf in public/docs/. */
  href?: string;
};

/** PLACEHOLDER — client to supply: founder and key team (name, role, photo, LinkedIn). Never invent people. */
export const leadership: Leader[] = [];

/** PLACEHOLDER — client to supply: licence / certificate name + number (+ document). Never invent licences. */
export const licences: Licence[] = [];

/**
 * PLACEHOLDER — callback promise in working hours ("Our team calls back within X working hours", PRD §8.11).
 * null = not confirmed; the site then says "Our team will call you back shortly." Never invent a time.
 */
export const RESPONSE_HOURS: number | null = null;

/** Company profile PDF. The About download button renders only if this file exists in public/ at build time. */
export const COMPANY_PROFILE_PDF = "/docs/indox-company-profile.pdf";

export const WHATSAPP_DEFAULT_MESSAGE = "Hi IndoX, I need a quote for…";

export const telHref = `tel:${company.tollFreeDigits}`;
export const mailHref = `mailto:${company.email}`;

/** wa.me deep link with a pre-filled message. Until the number is configured, falls back to the contact page. */
export function whatsappHref(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  if (!hasWhatsApp) return "/contact/";
  return `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(message)}`;
}

/** Under every product / supply / delivery claim (PRD §7 "Compliance line"). */
export const COMPLIANCE_LINE = "Subject to applicable regulations, location, product and quantity.";

/** Footer bottom strip (PRD §6). */
export const FOOTER_LEGAL_LINE = "All supply subject to applicable laws, approvals and permissions.";
