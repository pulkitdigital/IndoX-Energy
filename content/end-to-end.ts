import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import { ROUTES, productHref, quoteHref, serviceHref } from "@/content/navigation";
import type { ModelId } from "@/content/packages";

/**
 * /end-to-end-energy-infrastructure/ copy (PRD §8.8). Every node / link points at a real route. "Best for" lines
 * are business TYPES, never client names. No stats. Selector rules live in content/packages.ts.
 */

export const endToEnd = {
  seo: {
    title: "End-to-End Energy Infrastructure | IndoX Energy",
    description:
      "Fuel supply, transport, storage, dispensing, monitoring, fuel management and EV charging from one partner. Compare four business models and build your package.",
  },
  hero: {
    eyebrow: "End-to-End",
    title: "One partner. Multiple energy solutions.",
    intro:
      "Take one part of the chain or all of it. Fuel supply, storage, dispensing, monitoring and EV charging are planned together, and one team answers for them, subject to applicable regulations.",
    cta: { label: "Get a Quote", href: quoteHref({ service: "end-to-end" }) },
    image: "e2e-hero" as ImageSlotKey,
    caption: "FIG. E-00 — Fuel and EV infrastructure on one site",
  },
  flow: {
    eyebrow: "Ecosystem",
    title: "Seven steps, one partner",
    description: "Each step is a product or service you can take on its own. Together they give you one record from the first litre to the first charge.",
    learnMore: "Learn more",
    nodes: [
      { icon: "fuel", title: "Fuel Supply", line: "Bulk fuel sourced from authorized suppliers.", href: serviceHref("bulk-fuel-supply") },
      { icon: "truck", title: "Transportation", line: "Bowsers that carry and meter fuel to site.", href: productHref("fuel-bowser") },
      { icon: "cylinder", title: "Storage", line: "Smart tanks that report their own level.", href: productHref("smart-diesel-storage-tanks") },
      { icon: "gauge", title: "Dispensing", line: "Metered units that log every fill.", href: productHref("fuel-dispensing-units") },
      { icon: "activity", title: "Digital Monitoring", line: "ATG, GPS and RFID data on one dashboard.", href: serviceHref("fuel-monitoring-iot") },
      { icon: "dashboard", title: "Fuel Management", line: "One digital record from receipt to report.", href: serviceHref("fuel-management-solution") },
      { icon: "plugZap", title: "EV Charging", line: "Chargers surveyed, installed and maintained.", href: ROUTES.evCharging },
    ] as { icon: IconName; title: string; line: string; href: string }[],
  },
  models: {
    eyebrow: "Our business model",
    title: "Four ways to work with us",
    bestForLabel: "Best for",
    items: [
      {
        id: "supply",
        icon: "truck",
        name: "Supply Model",
        summary: "Bulk fuel procurement and delivery.",
        bestFor: ["Contractors with several active sites", "Plants that already have their own storage", "Fleet operators buying fuel in volume"],
      },
      {
        id: "infrastructure",
        icon: "cylinder",
        name: "Infrastructure Model",
        summary: "Tank, dispensing and monitoring infrastructure.",
        bestFor: ["New sites that need on-site storage", "Facilities replacing drums with a proper tank", "Depots that want controlled dispensing"],
      },
      {
        id: "technology",
        icon: "dashboard",
        name: "Technology Model",
        summary: "Digital fuel monitoring and management.",
        bestFor: ["Businesses with tanks but no live stock data", "Owners who want consumption per machine", "Sites dealing with unexplained fuel losses"],
      },
      {
        id: "integrated",
        icon: "workflow",
        name: "Integrated Model",
        summary: "Fuel, storage, dispensing, technology and support together.",
        bestFor: ["Large projects that want one accountable partner", "Multi-site operators standardising fuel", "Sites adding EV charging alongside diesel"],
      },
    ] as { id: ModelId; icon: IconName; name: string; summary: string; bestFor: string[] }[],
  },
  selector: {
    eyebrow: "Build your package",
    title: "Tell us what you need",
    description: "Tick what your site needs and we'll show the model that fits. Nothing is sent until you ask for a quote.",
    legend: "What do you need?",
    prompt: "Choose one or more needs to see the model that fits.",
    recommendedLabel: "Recommended model",
    includesLabel: "Covers",
    request: "Request a quote for this",
    reset: "Reset",
    announce: (model: string) => `Recommended: ${model}.`,
    announceEmpty: "No needs selected.",
  },
};
