import type { IconName } from "@/lib/icons";

/**
 * Service catalogue. Phase 2 extends this type with problem, whatWeDo, howItWorks,
 * benefits, industries, relatedProductSlug and faqs (TRD §3).
 */
export type Service = {
  slug: string;
  name: string;
  shortName: string;
  oneLiner: string;
  icon: IconName;
};

export const services: Service[] = [
  {
    slug: "doorstep-diesel-delivery",
    name: "Doorstep / Site Diesel Delivery",
    shortName: "Doorstep Diesel Delivery",
    oneLiner: "Metered diesel delivered to your site, on your schedule.",
    icon: "truck",
  },
  {
    slug: "bulk-fuel-supply",
    name: "Bulk Fuel Supply",
    shortName: "Bulk Fuel Supply",
    oneLiner: "Contracted volumes for plants, projects and fleets.",
    icon: "factory",
  },
  {
    slug: "fuel-inventory-management",
    name: "Fuel Inventory Management",
    shortName: "Inventory Management",
    oneLiner: "Stock visibility and reorder planning so sites never run dry.",
    icon: "clipboard",
  },
  {
    slug: "fuel-monitoring-iot",
    name: "Fuel Monitoring & IoT Solutions",
    shortName: "Monitoring & IoT",
    oneLiner: "Sensors and telemetry that report tank levels in real time.",
    icon: "radio",
  },
  {
    slug: "tank-fabrication-installation",
    name: "Tank Fabrication & Installation",
    shortName: "Tank Fabrication",
    oneLiner: "Storage tanks built and installed to your site's requirements.",
    icon: "wrench",
  },
  {
    slug: "fuel-theft-prevention",
    name: "Fuel Theft & Loss Prevention",
    shortName: "Theft & Loss Prevention",
    oneLiner: "Alerts, audit trails and access controls that close leakage gaps.",
    icon: "shieldCheck",
  },
  {
    slug: "fuel-management-solution",
    name: "Fuel Management Solution",
    shortName: "Fuel Management",
    oneLiner: "One system for supply, stock, dispensing and reporting.",
    icon: "dashboard",
  },
];
