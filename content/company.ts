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
