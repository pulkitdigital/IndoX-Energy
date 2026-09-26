import type { IconName } from "@/lib/icons";
import { ROUTES } from "@/content/navigation";

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
  primaryCta: { label: "Get a Quote", href: ROUTES.contact },
};

export const brandBlurb =
  "Diesel supply, storage, dispensing and monitoring for sites, plants and fleets. EV charging infrastructure for what runs next.";

export const cookieNotice = {
  text: "We use cookies for analytics and to measure our ads. Nothing loads unless you accept.",
  accept: "Accept",
  decline: "Decline",
  policyLabel: "Privacy Policy",
};
