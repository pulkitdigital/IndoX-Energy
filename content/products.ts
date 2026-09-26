import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import type { Service } from "@/content/services";

/**
 * Product catalogue — drives /products/[slug] (Phase 2), the Home bento, mega menu and footer.
 * Type follows TRD §4. Features/applications come from PRD §8.4 only; `specs` stays empty until the
 * client confirms real numbers. `faqs` are written in Phase 2 with the product pages.
 * Product pages say WHAT IndoX supplies or installs; service pages say HOW (PRD §5 overlap rule).
 */
export type Product = {
  slug: "hsd-diesel-supply" | "bulk-fuel-oil-supply" | "smart-diesel-storage-tanks" | "fuel-dispensing-units" | "fuel-bowser";
  name: string;
  /** Shorter label for tight spaces (footer). */
  shortName: string;
  oneLiner: string;
  icon: IconName;
  seo: { title: string; description: string };
  heroImage: ImageSlotKey;
  /** Spec-sheet micro labels on Home cards — short, factual, no numbers. */
  labels: string[];
  overview: string;
  features: { icon: IconName; title: string; text?: string }[];
  /** Client-confirmed values only. */
  specs?: { label: string; value: string }[];
  applications: string[];
  relatedServiceSlug: Service["slug"];
  faqs: { q: string; a: string }[];
};

export const products: Product[] = [
  {
    slug: "hsd-diesel-supply",
    name: "HSD / Diesel Supply",
    shortName: "HSD / Diesel Supply",
    oneLiner: "Bulk high-speed diesel for eligible commercial and industrial users, drawn from authorized sources.",
    icon: "fuel",
    seo: {
      title: "HSD / Diesel Supply for Businesses",
      description:
        "Bulk high-speed diesel (HSD) for eligible commercial and industrial customers, sourced from authorized suppliers and supplied as per applicable regulations.",
    },
    heroImage: "product-hsd",
    labels: ["Authorized source", "Bulk"],
    overview:
      "IndoX Energy supplies bulk HSD to eligible commercial and industrial customers. Fuel is drawn from authorized sources and supplied as per applicable regulations.",
    features: [
      { icon: "fuel", title: "Bulk HSD for eligible commercial and industrial customers" },
      { icon: "badgeCheck", title: "Authorized sources" },
      { icon: "shieldCheck", title: "Supply as per applicable regulations" },
    ],
    applications: [
      "Construction",
      "DG sets",
      "Manufacturing",
      "Infrastructure",
      "Mining & heavy equipment",
      "Logistics & fleet",
      "Telecom",
      "Agriculture & commercial",
    ],
    relatedServiceSlug: "bulk-fuel-supply",
    faqs: [],
  },
  {
    slug: "bulk-fuel-oil-supply",
    name: "Bulk Fuel & Oil Supply",
    shortName: "Bulk Fuel & Oil",
    oneLiner: "HSD, 10ppm ULSD where applicable, MHO, MTO, LDO and biodiesel, subject to specs and regulations.",
    icon: "droplets",
    seo: {
      title: "Bulk Fuel & Oil Supply — HSD, ULSD, MHO, MTO, LDO",
      description:
        "Bulk supply of HSD, 10ppm ULSD (where applicable), MHO, MTO, LDO, biodiesel and other industrial oils, subject to product specifications and regulations.",
    },
    heroImage: "product-bulk",
    labels: ["Multi-grade", "Per spec"],
    overview:
      "For operations that run on more than diesel. IndoX Energy supplies a range of industrial fuels and oils in bulk, subject to product specifications and applicable regulations.",
    features: [
      { icon: "fuel", title: "HSD" },
      { icon: "fuel", title: "10ppm ULSD", text: "Where applicable" },
      { icon: "droplets", title: "MHO" },
      { icon: "droplets", title: "MTO" },
      { icon: "droplets", title: "LDO" },
      { icon: "leaf", title: "Biodiesel / Biofuel" },
      { icon: "droplet", title: "Other industrial oils", text: "Subject to specs and regulations" },
    ],
    applications: ["Industrial heating", "Solvents", "Machinery", "Fleets"],
    relatedServiceSlug: "bulk-fuel-supply",
    faqs: [],
  },
  {
    slug: "smart-diesel-storage-tanks",
    name: "Smart Diesel Storage Tanks",
    shortName: "Smart Storage Tanks",
    oneLiner: "On-site tanks with automatic tank gauging, live levels and alerts on your phone.",
    icon: "cylinder",
    seo: {
      title: "Smart Diesel Storage Tanks with ATG & Live Monitoring",
      description:
        "On-site diesel storage tanks with automatic tank gauging (ATG), live level monitoring, consumption tracking, alerts and an app plus web dashboard.",
    },
    heroImage: "product-tank",
    labels: ["ATG", "Live level"],
    overview:
      "A storage tank that reports on itself. Levels, receipts and draw-downs are measured automatically and show up on a dashboard, so stock is never a guess.",
    features: [
      { icon: "cylinder", title: "Storage tank" },
      { icon: "gauge", title: "Automatic tank gauging (ATG)" },
      { icon: "activity", title: "Live level monitoring" },
      { icon: "chartLine", title: "Consumption tracking" },
      { icon: "fileText", title: "Digital reports" },
      { icon: "bell", title: "Alerts" },
      { icon: "fuel", title: "Dispensing management" },
      { icon: "shieldCheck", title: "Theft and loss monitoring" },
      { icon: "mapPin", title: "GPS / IoT", text: "Where applicable" },
      { icon: "smartphone", title: "App + web dashboard" },
    ],
    applications: ["Sites that need on-site storage and controlled dispensing"],
    relatedServiceSlug: "tank-fabrication-installation",
    faqs: [],
  },
  {
    slug: "fuel-dispensing-units",
    name: "Fuel Dispensing Units",
    shortName: "Dispensing Units",
    oneLiner: "Metered dispensing that logs each fill against a machine, vehicle or operator.",
    icon: "gauge",
    seo: {
      title: "Fuel Dispensing Units for On-site Fueling",
      description:
        "Professional fuel dispensing units for controlled on-site fueling, integrated with fuel-management technology for control and accountability.",
    },
    heroImage: "product-du",
    labels: ["Metered", "Per-asset log"],
    overview:
      "Controlled fueling at the point of use. Dispensing units can connect to fuel-management technology, so every issue is recorded against the asset that received it.",
    features: [
      { icon: "gauge", title: "Professional dispensing units" },
      { icon: "dashboard", title: "Integration with fuel-management technology", text: "For control and accountability" },
    ],
    applications: ["Fleets", "Construction", "Industrial facilities", "DG sets", "Mining", "Infrastructure", "Commercial fuel users"],
    relatedServiceSlug: "fuel-management-solution",
    faqs: [],
  },
  {
    slug: "fuel-bowser",
    name: "Fuel Bowser / Mobile Fuel Solutions",
    shortName: "Fuel Bowser",
    oneLiner: "A mobile tanker that meters diesel straight into equipment on remote sites.",
    icon: "truck",
    seo: {
      title: "Fuel Bowser & Mobile Fuel Solutions",
      description:
        "Fuel bowsers for bulk transport, site delivery and mobile fueling, with metered dispensing, delivery documentation and GPS where applicable.",
    },
    heroImage: "product-bowser",
    labels: ["Metered", "Mobile"],
    overview:
      "The bowser brings the fuel to the machine. It carries fuel in bulk, dispenses it through a meter and leaves a delivery record behind.",
    features: [
      { icon: "truck", title: "Bulk transport" },
      { icon: "mapPin", title: "Site delivery" },
      { icon: "fuel", title: "Mobile fueling" },
      { icon: "gauge", title: "Metered dispensing" },
      { icon: "fileText", title: "Delivery documentation" },
      { icon: "route", title: "GPS", text: "Where applicable" },
    ],
    applications: ["Remote sites", "Fleets", "Projects without on-site storage"],
    relatedServiceSlug: "doorstep-diesel-delivery",
    faqs: [],
  },
];
