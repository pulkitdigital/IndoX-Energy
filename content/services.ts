import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import type { Industry } from "@/content/industries";
import type { Product } from "@/content/products";

/**
 * Service catalogue — drives /services/[slug] (Phase 2), the Home services list, mega menu and footer.
 * Type follows TRD §4. whatWeDo / howItWorks come from PRD §8.6. `faqs` are written in Phase 2.
 * Service pages say HOW IndoX does it for you; product pages say WHAT (PRD §5 overlap rule).
 */
export type Service = {
  slug:
    | "doorstep-diesel-delivery"
    | "bulk-fuel-supply"
    | "fuel-inventory-management"
    | "fuel-monitoring-iot"
    | "tank-fabrication-installation"
    | "fuel-theft-prevention"
    | "fuel-management-solution";
  name: string;
  shortName: string;
  group: "Supply" | "Infrastructure" | "Intelligence";
  icon: IconName;
  promise: string;
  seo: { title: string; description: string };
  heroImage: ImageSlotKey;
  problems: [string, string, string];
  whatWeDo: { icon: IconName; title: string; text?: string }[];
  /** Numbered steps */
  howItWorks: string[];
  /** 3–4 */
  benefits: string[];
  industries: Industry["slug"][];
  relatedProductSlug: Product["slug"];
  faqs: { q: string; a: string }[];
};

const ALL_INDUSTRIES: Industry["slug"][] = [
  "construction-infrastructure",
  "mining-heavy-equipment",
  "manufacturing-industrial",
  "logistics-fleet",
  "telecom",
  "agriculture",
  "commercial-institutional",
];

export const services: Service[] = [
  {
    slug: "doorstep-diesel-delivery",
    name: "Doorstep / Site Diesel Delivery",
    shortName: "Doorstep Diesel Delivery",
    group: "Supply",
    icon: "truck",
    promise: "Metered diesel delivered to your site on schedule, with delivery documents every time.",
    seo: {
      title: "Doorstep & Site Diesel Delivery",
      description:
        "Metered diesel delivered to eligible sites through an organized network. Book, schedule and receive fuel at your site with delivery documents.",
    },
    heroImage: "service-doorstep",
    problems: [
      "Machines stand idle while someone drives to the pump.",
      "Diesel carried in drums goes missing on the way.",
      "Purchases are logged by hand, if at all.",
    ],
    whatWeDo: [
      { icon: "mapPin", title: "Fuel at your site", text: "Delivery to eligible sites through an organized network" },
      { icon: "clock", title: "Less downtime" },
      { icon: "clipboard", title: "Better fuel management" },
    ],
    howItWorks: ["Book", "Schedule", "Dispatch", "Metered fill", "Delivery documents"],
    benefits: ["No pump runs", "A metered record for every delivery", "Delivery planned around your shifts"],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "fuel-bowser",
    faqs: [],
  },
  {
    slug: "bulk-fuel-supply",
    name: "Bulk Fuel Supply",
    shortName: "Bulk Fuel Supply",
    group: "Supply",
    icon: "factory",
    promise: "Large volumes sourced, transported and delivered against one order.",
    seo: {
      title: "Bulk Fuel Supply for Industry & Projects",
      description:
        "Coordinated procurement, transport and delivery of large fuel quantities: requirement, sourcing, quote, dispatch, delivery and invoice.",
    },
    heroImage: "service-bulk",
    problems: [
      "Several vendors for one monthly requirement.",
      "Unclear sourcing and paperwork.",
      "Deliveries that do not match the consumption plan.",
    ],
    whatWeDo: [{ icon: "workflow", title: "Coordinated procurement, transport and delivery", text: "For large quantities" }],
    howItWorks: ["Requirement", "Sourcing", "Quote", "Dispatch", "Delivery", "Invoice"],
    benefits: ["One point of contact for volume", "Documented sourcing", "GST invoicing"],
    industries: ["construction-infrastructure", "mining-heavy-equipment", "manufacturing-industrial", "logistics-fleet"],
    relatedProductSlug: "bulk-fuel-oil-supply",
    faqs: [],
  },
  {
    slug: "fuel-inventory-management",
    name: "Fuel Inventory Management",
    shortName: "Inventory Management",
    group: "Intelligence",
    icon: "clipboard",
    promise: "Opening stock, receipts, issues and closing stock tracked daily, with variance flagged.",
    seo: {
      title: "Fuel Inventory Management",
      description:
        "Track opening stock, fuel received, dispensed and closing stock, daily and equipment-wise consumption, delivery records and variance, digitally.",
    },
    heroImage: "service-inventory",
    problems: ["Stock is counted by dipstick and memory.", "Nobody can say which machine used what.", "Variance shows up at month-end, too late to act."],
    whatWeDo: [
      { icon: "cylinder", title: "Opening and closing stock" },
      { icon: "truck", title: "Fuel received and dispensed" },
      { icon: "chartBars", title: "Daily and equipment-wise consumption" },
      { icon: "fileText", title: "Delivery records" },
      { icon: "activity", title: "Variance" },
    ],
    howItWorks: ["Setup", "Daily capture", "Reconciliation", "Reports"],
    benefits: ["Stock you can trust daily", "Consumption per machine", "Variance caught early"],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "smart-diesel-storage-tanks",
    faqs: [],
  },
  {
    slug: "fuel-monitoring-iot",
    name: "Fuel Monitoring & IoT Solutions",
    shortName: "Monitoring & IoT",
    group: "Intelligence",
    icon: "radio",
    promise: "ATG, GPS and RFID data on one dashboard, with alerts to your phone.",
    seo: {
      title: "Fuel Monitoring & IoT Solutions",
      description:
        "ATG, IoT sensors, GPS, RFID, cloud monitoring, mobile app, web dashboard, analytics and alerts for diesel tanks, bowsers and dispensing.",
    },
    heroImage: "service-monitoring",
    problems: ["Tank levels are only known when someone checks.", "Bowser movements are not tracked.", "Alerts come from a phone call after the fact."],
    whatWeDo: [
      { icon: "gauge", title: "ATG" },
      { icon: "cpu", title: "IoT sensors" },
      { icon: "mapPin", title: "GPS" },
      { icon: "nfc", title: "RFID" },
      { icon: "cloud", title: "Cloud monitoring" },
      { icon: "smartphone", title: "Mobile app" },
      { icon: "dashboard", title: "Web dashboard" },
      { icon: "chartLine", title: "Analytics" },
      { icon: "bell", title: "Alerts" },
    ],
    howItWorks: ["Sensors", "Cloud", "Dashboard", "Alerts"],
    benefits: ["Live levels across sites", "Alerts when something changes", "Data you can export"],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "smart-diesel-storage-tanks",
    faqs: [],
  },
  {
    slug: "tank-fabrication-installation",
    name: "Tank Fabrication & Installation",
    shortName: "Tank Fabrication",
    group: "Infrastructure",
    icon: "wrench",
    promise: "Storage designed, built, installed and commissioned to applicable safety requirements.",
    seo: {
      title: "Diesel Tank Fabrication & Installation",
      description:
        "End-to-end fuel storage infrastructure: design, fabrication, installation, piping, dispensing, automation, testing and commissioning.",
    },
    heroImage: "service-fabrication",
    problems: ["Tanks sized by guesswork.", "Separate vendors for tank, piping and dispenser.", "Safety requirements handled late."],
    whatWeDo: [{ icon: "wrench", title: "End-to-end storage infrastructure", text: "To applicable technical, safety and regulatory requirements" }],
    howItWorks: ["Design", "Fabrication", "Installation", "Piping", "Dispensing", "Automation", "Testing", "Commissioning"],
    benefits: ["One contractor from design to handover", "Sized to your consumption", "Monitoring-ready from day one"],
    industries: ["construction-infrastructure", "mining-heavy-equipment", "manufacturing-industrial", "logistics-fleet", "commercial-institutional"],
    relatedProductSlug: "smart-diesel-storage-tanks",
    faqs: [],
  },
  {
    slug: "fuel-theft-prevention",
    name: "Fuel Theft & Loss Prevention",
    shortName: "Theft & Loss Prevention",
    group: "Intelligence",
    icon: "shieldCheck",
    promise: "Alerts on unusual draw-downs, unauthorized dispensing and stock gaps.",
    seo: {
      title: "Fuel Theft & Loss Prevention",
      description:
        "Flag unusual fuel movement, unauthorized dispensing, stock variation and potential losses, with alerts and reports.",
    },
    heroImage: "service-theft",
    problems: ["Fuel disappears overnight from tanks and machines.", "Dispensing without authorization.", "Losses found weeks later, with no trail."],
    whatWeDo: [
      { icon: "activity", title: "Unusual fuel movement" },
      { icon: "nfc", title: "Unauthorized dispensing" },
      { icon: "chartBars", title: "Stock variation" },
      { icon: "shieldCheck", title: "Potential losses" },
    ],
    howItWorks: ["Monitor", "Detect", "Alert", "Investigate", "Report"],
    benefits: ["Alerts while it is happening", "A trail for every litre", "Fewer write-offs"],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "fuel-dispensing-units",
    faqs: [],
  },
  {
    slug: "fuel-management-solution",
    name: "Fuel Management Solution",
    shortName: "Fuel Management",
    group: "Intelligence",
    icon: "dashboard",
    promise: "Move from paper registers to a digital record of every litre.",
    seo: {
      title: "Fuel Management Solution",
      description:
        "Move from manual registers to digital fuel management: fuel receipt, storage, dispensing, monitoring, reporting and analytics in one system.",
    },
    heroImage: "service-management",
    problems: ["Paper registers that nobody reconciles.", "Separate records for delivery, stock and issue.", "No clear view of cost per machine or site."],
    whatWeDo: [{ icon: "dashboard", title: "Manual records to digital fuel management" }],
    howItWorks: ["Fuel receipt", "Storage", "Dispensing", "Monitoring", "Reporting", "Analytics"],
    benefits: ["One record from receipt to report", "Cost per site and per machine", "Audit-ready history"],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "fuel-dispensing-units",
    faqs: [],
  },
];
