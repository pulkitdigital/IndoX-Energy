import type { IconName } from "@/lib/icons";
import { ROUTES } from "@/lib/constants";

/** Copy for shared/global components used across many pages. */

export type TrustPoint = { icon: IconName; label: string };

export const trustPoints: TrustPoint[] = [
  { icon: "badgeCheck", label: "Authorized sourcing" },
  { icon: "shieldCheck", label: "PESO-compliant equipment" },
  { icon: "gauge", label: "Metered, documented delivery" },
  { icon: "receipt", label: "GST invoicing" },
];

export const quoteBand = {
  eyebrow: "Get a quote",
  title: "Tell us what your site needs. We'll handle the rest.",
  description: "Share your fuel type, monthly volume and location — our team will come back with a tailored proposal.",
  primaryCta: { label: "Get a Quote", href: ROUTES.contact },
};

export const brandBlurb =
  "Fuel supply, smart storage, dispensing and monitoring for businesses across India — plus EV charging infrastructure for what comes next.";

export const cardLabels = { learnMore: "Learn more" };

export const megaMenu = {
  products: { title: "Our Products", viewAll: "View all products", href: ROUTES.products },
  services: { title: "Our Services", viewAll: "View all services", href: ROUTES.services },
};

export const cookieNotice = {
  text: "We use cookies for analytics and to measure our ads. Nothing loads unless you accept.",
  accept: "Accept",
  decline: "Decline",
  policyLabel: "Privacy Policy",
};
