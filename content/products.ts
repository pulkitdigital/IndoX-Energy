import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";

/**
 * Product catalogue. Phase 1 holds the fields the Home page and mega menu need;
 * Phase 2 extends this type with overview, features, applications, relatedServiceSlug and faqs (TRD §3).
 */
export type Product = {
  slug: string;
  name: string;
  /** Shorter label for tight spaces (menus, footer). */
  shortName: string;
  oneLiner: string;
  icon: IconName;
  image: ImageSlotKey;
  /** Spec-sheet micro labels shown on cards (short, factual). */
  specs: string[];
};

export const products: Product[] = [
  {
    slug: "hsd-diesel-supply",
    name: "HSD / Diesel Supply",
    shortName: "HSD / Diesel Supply",
    oneLiner: "High-speed diesel from authorized sources, delivered metered and invoiced to your site.",
    icon: "fuel",
    image: "product-hsd",
    specs: ["Metered", "GST-invoiced"],
  },
  {
    slug: "bulk-fuel-oil-supply",
    name: "Bulk Fuel & Oil Supply",
    shortName: "Bulk Fuel & Oil",
    oneLiner: "Scheduled bulk volumes of diesel and industrial fuels for high-consumption operations.",
    icon: "droplets",
    image: "product-bulk",
    specs: ["Scheduled", "High volume"],
  },
  {
    slug: "smart-diesel-storage-tanks",
    name: "Smart Diesel Storage Tanks",
    shortName: "Smart Storage Tanks",
    oneLiner: "On-site storage with level sensing and remote monitoring built in from day one.",
    icon: "cylinder",
    image: "product-tank",
    specs: ["Level sensing", "Remote view"],
  },
  {
    slug: "fuel-dispensing-units",
    name: "Fuel Dispensing Units",
    shortName: "Fuel Dispensing Units",
    oneLiner: "Metered dispensing that records every litre against a vehicle, machine or operator.",
    icon: "gauge",
    image: "product-du",
    specs: ["Metered", "Per-asset log"],
  },
  {
    slug: "fuel-bowser",
    name: "Fuel Bowser / Mobile Fuel Solutions",
    shortName: "Fuel Bowser",
    oneLiner: "Mobile refuelling that reaches your equipment wherever it is working on site.",
    icon: "truck",
    image: "product-bowser",
    specs: ["Mobile", "On-site"],
  },
];
