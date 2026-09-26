import type { IconName } from "@/lib/icons";
import { products } from "@/content/products";
import { services } from "@/content/services";

/**
 * Routes and navigation (PRD §5 sitemap, §6 navigation). Every href ends with "/" to match
 * `trailingSlash: true`. Never invent a slug that isn't in the sitemap.
 */

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

export type NavLink = { label: string; href: string };
export type MegaKey = "products" | "services";
export type NavItem = ({ kind: "link" } & NavLink) | { kind: "mega"; label: string; href: string; menu: MegaKey };

/** Desktop header, left → right (PRD §6). */
export const mainNav: NavItem[] = [
  { kind: "link", label: "About Us", href: ROUTES.about },
  { kind: "mega", label: "Our Products", href: ROUTES.products, menu: "products" },
  { kind: "mega", label: "Our Services", href: ROUTES.services, menu: "services" },
  { kind: "link", label: "EV Charging", href: ROUTES.evCharging },
  { kind: "link", label: "End-to-End Infrastructure", href: ROUTES.endToEnd },
  { kind: "link", label: "Blog", href: ROUTES.blog },
  { kind: "link", label: "Contact Us", href: ROUTES.contact },
];

export const megaMenus: Record<MegaKey, { title: string; viewAll: string; href: string; items: (NavLink & { icon: IconName; oneLiner: string })[] }> = {
  products: {
    title: "Our Products",
    viewAll: "View all products",
    href: ROUTES.products,
    items: products.map((p) => ({ label: p.name, href: productHref(p.slug), icon: p.icon, oneLiner: p.oneLiner })),
  },
  services: {
    title: "Our Services",
    viewAll: "View all services",
    href: ROUTES.services,
    items: services.map((s) => ({ label: s.name, href: serviceHref(s.slug), icon: s.icon, oneLiner: s.promise })),
  },
};

export const quoteCta: NavLink = { label: "Get a Quote", href: ROUTES.contact };

/** Footer columns 2–4 (PRD §6). Column 1 (brand) and 5 (contact) render from content/company.ts. */
export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Our Products",
    links: [...products.map((p) => ({ label: p.shortName, href: productHref(p.slug) })), { label: "View all products", href: ROUTES.products }],
  },
  {
    title: "Our Services",
    links: [...services.map((s) => ({ label: s.shortName, href: serviceHref(s.slug) })), { label: "View all services", href: ROUTES.services }],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: ROUTES.about },
      { label: "EV Charging", href: ROUTES.evCharging },
      { label: "End-to-End Infrastructure", href: ROUTES.endToEnd },
      { label: "Blog", href: ROUTES.blog },
      { label: "Contact Us", href: ROUTES.contact },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms", href: ROUTES.terms },
];

/** Every public route for sitemap.xml (PRD §5 minus /thank-you, which is noindex; 404 has no URL). */
export const sitemapRoutes: string[] = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.products,
  ...products.map((p) => productHref(p.slug)),
  ROUTES.services,
  ...services.map((s) => serviceHref(s.slug)),
  ROUTES.evCharging,
  ROUTES.endToEnd,
  ROUTES.blog,
  ROUTES.contact,
  ROUTES.privacy,
  ROUTES.terms,
];
