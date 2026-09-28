import type { IconName } from "@/lib/icons";
import type { BlogCategory } from "@/lib/blog";
import { ROUTES } from "@/content/navigation";
import { products } from "@/content/products";
import { services } from "@/content/services";

/** Copy for global / shared components used across many pages. */

/** Trust strip — Home, Product, Service and Contact pages (PRD §7). */
export const trustPoints: { icon: IconName; label: string }[] = [
  { icon: "badgeCheck", label: "Authorized sourcing" },
  { icon: "shieldCheck", label: "PESO-compliant equipment" },
  { icon: "gauge", label: "Metered, documented delivery" },
  { icon: "receipt", label: "GST invoicing" },
];

/** Quote CTA band — bottom of every page except Contact, Thank-you, legal and 404 (PRD §7). */
export const quoteBand = {
  eyebrow: "Get a quote",
  title: "Tell us your site, fuel and monthly volume",
  description: "We'll come back with a delivery plan and a quote.",
  primaryCta: { label: "Get a Quote", href: ROUTES.quote },
};

export const brandBlurb =
  "Diesel supply, storage, dispensing and monitoring for sites, plants and fleets. EV charging infrastructure for what runs next.";

export const cookieNotice = {
  text: "We use cookies for analytics and to measure our ads. Nothing loads unless you accept.",
  accept: "Accept",
  decline: "Decline",
  policyLabel: "Privacy Policy",
};

/**
 * "Requirement" options for MiniQuoteForm (and later QuoteFormFull). Each product / service page pre-selects
 * its own name, so the option values are the page names.
 */
export const requirementOptions: string[] = [
  ...products.map((p) => p.name),
  ...services.map((s) => s.name),
  "EV Charging Solutions",
  "End-to-End Energy Infrastructure",
  "Something else",
];

/** MiniQuoteForm — product, service and EV pages (PRD §7). 4 fields. */
export const miniQuoteForm = {
  eyebrow: "Enquire",
  title: "Get a quote for this product",
  description: "Four fields. Our team calls you back to understand the requirement and send a quote.",
  fields: {
    name: { label: "Your name", placeholder: "Full name" },
    phone: { label: "Mobile number", placeholder: "10-digit mobile" },
    requirement: { label: "Requirement" },
    city: { label: "Delivery city", placeholder: "City or town" },
  },
  submit: "Send enquiry",
  sending: "Sending…",
  errors: {
    name: "Enter your name.",
    phone: "Enter a valid 10-digit Indian mobile number.",
    requirement: "Choose what you need.",
    city: "Enter the city where you need it.",
  },
  failure: {
    title: "Your enquiry didn't go through.",
    text: "Nothing you typed is lost. Try again, or reach us directly:",
    call: "Call",
    whatsapp: "WhatsApp us",
  },
  note: "We only use these details to respond to this enquiry.",
};

/** /thank-you/ (PRD §8.12). The summary comes from sessionStorage (set by submitForm); direct visits get the generic text. */
export const thankYou = {
  seo: {
    title: "Thank you | IndoX Energy",
    description: "Your request has reached IndoX Energy. Our team will call you back on the number you shared.",
  },
  eyebrow: "Request received",
  title: "Thanks. We have your request.",
  titleWithName: (name: string) => `Thanks, ${name}. We have your request.`,
  text: "Our team will call you back on the number you shared to understand your requirement and prepare a quote.",
  summaryTitle: "Your request",
  summaryLabels: { name: "Name", requirement: "Requirement", city: "City" },
  next: {
    index: "01",
    eyebrow: "What happens next",
    title: "Three steps from here",
    stepLabel: "Step",
    steps: [
      { title: "Call back", text: "Our team calls you on the number you shared." },
      { title: "Requirement check", text: "We confirm the product, quantity, site and any approvals that apply." },
      { title: "Quote", text: "You receive a quote based on your requirement and location." },
    ],
  },
  urgent: "Need fuel urgently? Message us or call and we'll pick it up from there.",
  whatsapp: "Message us on WhatsApp",
  call: "Call",
  whatsappMessage: (requirement: string) => `Hi IndoX, I just sent a quote request${requirement ? ` for ${requirement}` : ""}. It's urgent.`,
  related: { index: "02", eyebrow: "Read while you wait", title: "Related articles", readMore: "Read article" },
  home: "Back to Home",
};

/**
 * Blog categories to suggest on /thank-you/ for what was requested. Keys are product / service slugs, the EV and
 * end-to-end solution values, or product / service names (MiniQuoteForm sends the page name).
 */
const TOPIC_CATEGORIES: Record<string, BlogCategory[]> = {
  "hsd-diesel-supply": ["Diesel Supply", "Industry Guides"],
  "bulk-fuel-oil-supply": ["Industry Guides", "Diesel Supply"],
  "smart-diesel-storage-tanks": ["Storage & Safety", "Fuel Management"],
  "fuel-dispensing-units": ["Fuel Management", "Storage & Safety"],
  "fuel-bowser": ["Diesel Supply", "Fuel Management"],
  "doorstep-diesel-delivery": ["Diesel Supply", "Fuel Management"],
  "bulk-fuel-supply": ["Diesel Supply", "Industry Guides"],
  "fuel-inventory-management": ["Fuel Management", "Storage & Safety"],
  "fuel-monitoring-iot": ["Storage & Safety", "Fuel Management"],
  "tank-fabrication-installation": ["Storage & Safety", "Fuel Management"],
  "fuel-theft-prevention": ["Fuel Management", "Storage & Safety"],
  "fuel-management-solution": ["Fuel Management", "Storage & Safety"],
  "ev-charging": ["EV Charging"],
  "end-to-end": ["Fuel Management", "EV Charging"],
};

export function relatedCategoriesFor(topics: string[]): BlogCategory[] {
  const toSlug = (topic: string) => products.find((p) => p.name === topic)?.slug ?? services.find((s) => s.name === topic)?.slug ?? topic;
  return [...new Set(topics.flatMap((topic) => TOPIC_CATEGORIES[toSlug(topic)] ?? []))];
}
