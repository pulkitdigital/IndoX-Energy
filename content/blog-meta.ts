import type { ImageSlotKey } from "@/content/images";

/**
 * Blog metadata for previews. Titles are working titles based on the planned launch articles (TRD §2).
 * Phase 2 adds the MDX bodies in content/blog/*.mdx and the /blog/[slug] route.
 */
export type BlogCategory = "Loss Prevention" | "Fuel Delivery" | "Technology" | "Fuel Types" | "EV Charging" | "Safety";

export type BlogMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** Cover image slot. Articles without one get a code-drawn cover. */
  image?: ImageSlotKey;
};

export const blogMeta: BlogMeta[] = [
  {
    slug: "construction-diesel-theft",
    title: "How Construction Sites Lose Diesel — and How to Stop It",
    excerpt:
      "Where fuel disappears on a typical project site, the warning signs to look for, and the controls that make every litre accountable.",
    category: "Loss Prevention",
    image: "blog-diesel-theft",
  },
  {
    slug: "doorstep-delivery-vs-pump",
    title: "Doorstep Diesel Delivery vs. the Fuel Pump: What Works for Your Site?",
    excerpt:
      "Comparing the hidden costs of pump runs — downtime, transport, pilferage — with scheduled, metered delivery to site.",
    category: "Fuel Delivery",
    image: "blog-doorstep-vs-pump",
  },
  {
    slug: "what-is-atg",
    title: "What Is an Automatic Tank Gauge (ATG) and Why Does It Matter?",
    excerpt:
      "A plain-language guide to ATG systems: how they measure fuel, what data they give you, and when they pay for themselves.",
    category: "Technology",
    image: "blog-atg",
  },
  {
    slug: "hsd-vs-ldo-vs-mho",
    title: "HSD vs. LDO vs. MHO: Choosing the Right Industrial Fuel",
    excerpt: "Differences in grade, typical applications and handling requirements for common industrial fuels.",
    category: "Fuel Types",
  },
  {
    slug: "ev-charger-setup-guide",
    title: "Setting Up an EV Charger at Your Site: A Practical Guide",
    excerpt: "From site survey and load assessment to AC/DC selection and commissioning.",
    category: "EV Charging",
  },
  {
    slug: "fuel-safety-checklist",
    title: "The On-Site Fuel Safety Checklist",
    excerpt: "Storage, handling and dispensing practices every site manager should have in place.",
    category: "Safety",
  },
];
