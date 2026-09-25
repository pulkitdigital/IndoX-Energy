import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import { ROUTES } from "@/lib/constants";

/** All Home page copy. Components render this; they don't own copy. */

export type SectionIntro = {
  /** Section number shown in the eyebrow, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: string;
  /** Portion of the title rendered with the brand gradient (must appear in `title`). */
  highlight?: string;
  description?: string;
};

export type IconPoint = {
  icon: IconName;
  title: string;
  description: string;
};

/* 1 — Hero */
export const hero = {
  eyebrow: "Powering Sustainable Energy",
  titleLead: "From Fuel Supply to",
  titleHighlight: "Fuel Intelligence",
  subline:
    "IndoX Energy sources, delivers, stores and monitors diesel for businesses that can't afford downtime — with metered delivery, smart storage and real-time visibility in one partner.",
  primaryCta: { label: "Get a Quote", href: ROUTES.contact },
  secondaryCta: { label: "Explore Services", href: ROUTES.services },
  chain: ["Source", "Deliver", "Store", "Dispense", "Monitor", "Analyze"],
  visual: {
    // Image file: public/images/hero-bowser.webp (alt text lives in content/images.ts)
    image: "hero-bowser" as ImageSlotKey,
    tags: [
      { icon: "gauge", label: "Metered delivery" },
      { icon: "activity", label: "Live monitoring" },
      { icon: "shieldCheck", label: "Authorized sourcing" },
    ] as { icon: IconName; label: string }[],
  },
};

/* 3 — Our Approach */
export type ApproachStep = {
  id: string;
  icon: IconName;
  image: ImageSlotKey;
  title: string;
  line: string;
  details: string[];
};

export const approachIntro: SectionIntro = {
  index: "01",
  eyebrow: "Our Approach",
  title: "Six steps. One accountable partner.",
  highlight: "One accountable partner.",
  description:
    "Every litre moves through a single, documented chain — from authorized source to the insight on your dashboard. Select a step to see what happens there.",
};

export const approachSteps: ApproachStep[] = [
  {
    id: "source",
    image: "approach-source",
    icon: "droplet",
    title: "Source",
    line: "Fuel procured from authorized sources only.",
    details: [
      "Supply drawn through authorized channels, subject to applicable regulations",
      "Grade and quantity confirmed before dispatch",
      "Documentation that travels with every load",
    ],
  },
  {
    id: "deliver",
    image: "approach-deliver",
    icon: "truck",
    title: "Deliver",
    line: "Metered, scheduled delivery to your site.",
    details: [
      "Delivery windows planned around your operations",
      "Metered dispensing with a record for every drop",
      "GST invoice issued against the delivered quantity",
    ],
  },
  {
    id: "store",
    image: "approach-store",
    icon: "cylinder",
    title: "Store",
    line: "Safe on-site storage, sized to your usage.",
    details: [
      "Tanks specified to consumption and site layout",
      "Fabrication and installation with PESO-compliant equipment",
      "Level sensing ready to connect from day one",
    ],
  },
  {
    id: "dispense",
    image: "approach-dispense",
    icon: "fuel",
    title: "Dispense",
    line: "Every litre issued against a vehicle or asset.",
    details: [
      "Metered dispensing units at the point of use",
      "Issue logs by machine, vehicle or operator",
      "Mobile bowsers for equipment that can't come to the tank",
    ],
  },
  {
    id: "monitor",
    image: "approach-monitor",
    icon: "activity",
    title: "Monitor",
    line: "Live levels, movements and alerts.",
    details: [
      "Automatic tank gauging and IoT sensors report stock levels",
      "GPS tracking on delivery and bowser movements",
      "Instant alerts on sudden drops or unusual activity",
    ],
  },
  {
    id: "analyze",
    image: "approach-analyze",
    icon: "chartLine",
    title: "Analyze",
    line: "Consumption insight that cuts cost and loss.",
    details: [
      "Consumption trends by site, asset and period",
      "Reconciliation of delivered, stored and dispensed quantities",
      "Reports that support smarter reorder and budgeting",
    ],
  },
];

/* 4 — Products */
export const productsIntro: SectionIntro = {
  index: "02",
  eyebrow: "Our Products",
  title: "Fuel and the infrastructure to manage it",
  highlight: "infrastructure to manage it",
  description: "From the diesel itself to the tanks, dispensers and bowsers that keep it accountable on your site.",
};

/* 5 — Services */
export const servicesIntro: SectionIntro = {
  index: "03",
  eyebrow: "Our Services",
  title: "Services that keep your operations fuelled",
  highlight: "fuelled",
  description: "Delivery, storage, monitoring and control — take one service or combine them into a managed programme.",
};

/* 6 — Technology */
export type TechChip = { icon: IconName; label: string; description: string };

export const technologyIntro: SectionIntro = {
  index: "04",
  eyebrow: "Our Technology",
  title: "See every litre, not just the invoice",
  highlight: "every litre",
  description:
    "Sensors, tracking and software turn fuel from a blind spot into a measurable line item — with alerts the moment something looks wrong.",
};

export const techChips: TechChip[] = [
  { icon: "gauge", label: "ATG", description: "Automatic tank gauging" },
  { icon: "cpu", label: "IoT", description: "Connected sensors" },
  { icon: "mapPin", label: "GPS", description: "Delivery & bowser tracking" },
  { icon: "nfc", label: "RFID", description: "Authorized dispensing" },
  { icon: "dashboard", label: "Dashboard", description: "Live multi-site view" },
  { icon: "smartphone", label: "App", description: "Updates on mobile" },
  { icon: "chartBars", label: "Analytics", description: "Consumption trends" },
  { icon: "bell", label: "Alerts", description: "Drops, refills & thresholds" },
];

/** Values shown in the dashboard mockup. Illustrative only — always rendered with a "Sample" label. */
export const sampleDashboard = {
  label: "Sample dashboard — illustrative data only",
  title: "Fuel overview",
  sites: [
    { name: "Site A", level: 72 },
    { name: "Site B", level: 38 },
    { name: "Site C", level: 91 },
  ],
  weeklyUsage: [42, 58, 51, 66, 49, 73, 61],
  weekDays: ["M", "T", "W", "T", "F", "S", "S"],
  trend: [30, 42, 38, 55, 48, 62, 58, 70, 64, 78],
  alerts: [
    { tone: "warn", text: "Site B below reorder level" },
    { tone: "ok", text: "Delivery reconciled at Site A" },
  ] as { tone: "warn" | "ok"; text: string }[],
};

/* 7 — EV Charging teaser */
export const evTeaser = {
  index: "05",
  eyebrow: "EV Charging Solutions",
  title: "Ready for what powers your fleet next",
  highlight: "what powers your fleet next",
  description:
    "The same infrastructure discipline we bring to fuel, applied to EV charging — for hotels, highways, residential societies, fleet depots and parking operators.",
  points: [
    { icon: "plugZap", title: "AC & DC charging", description: "Charger options matched to dwell time and usage." },
    { icon: "mapPin", title: "Site survey first", description: "Load, layout and access assessed before we propose anything." },
    { icon: "wrench", title: "Install & support", description: "Installation, commissioning and ongoing support." },
  ] satisfies IconPoint[],
  image: "ev-charger" as ImageSlotKey,
  primaryCta: { label: "Book a Site Survey", href: `${ROUTES.contact}?solution=ev-charging` },
  secondaryCta: { label: "Explore EV Charging", href: ROUTES.evCharging },
};

/* 8 — Industries + segments */
export const industriesIntro: SectionIntro = {
  index: "06",
  eyebrow: "Industries We Serve",
  title: "Built for operations that run on diesel",
  highlight: "run on diesel",
  description: "Wherever generators, machines and fleets can't stop, fuel has to arrive on time — and be accounted for.",
};

export type Industry = IconPoint & { image: ImageSlotKey };

export const industries: Industry[] = [
  { icon: "hardHat", image: "industry-construction", title: "Construction", description: "Earthmovers, DG sets and batching plants on active building sites." },
  { icon: "factory", image: "industry-manufacturing", title: "Manufacturing", description: "Boilers, gensets and process equipment in plants and units." },
  { icon: "mountain", image: "industry-mining", title: "Mining", description: "Heavy equipment running long shifts in remote locations." },
  { icon: "truck", image: "industry-logistics", title: "Logistics & Fleet", description: "Depot refuelling with per-vehicle issue records." },
  { icon: "tower", image: "industry-telecom", title: "Telecom Towers", description: "Backup power for tower sites spread across regions." },
  { icon: "route", image: "industry-infrastructure", title: "Infrastructure", description: "Road, rail, metro and bridge projects with equipment spread across long stretches." },
  { icon: "building", image: "industry-commercial", title: "Commercial Facilities", description: "Malls, offices, hospitals and data centres running DG backup." },
];

export const customerSegments = {
  label: "Customer segments",
  items: ["Builders", "Contractors", "Factories", "Fleets", "Telecom"],
};

/* 9 — End-to-end teaser */
export const ecosystemTeaser = {
  index: "07",
  eyebrow: "End-to-End Energy Infrastructure",
  title: "One ecosystem, from the first litre to the first charge",
  highlight: "first charge",
  description: "Take a single service or the full chain. Every step connects to the next, with one partner accountable for the whole.",
  steps: [
    { icon: "fuel", label: "Fuel Supply" },
    { icon: "truck", label: "Transportation" },
    { icon: "cylinder", label: "Storage" },
    { icon: "gauge", label: "Dispensing" },
    { icon: "activity", label: "Digital Monitoring" },
    { icon: "dashboard", label: "Fuel Management" },
    { icon: "batteryCharging", label: "EV Charging" },
  ] as { icon: IconName; label: string }[],
  image: "end-to-end-panorama" as ImageSlotKey,
  cta: { label: "See the full ecosystem", href: ROUTES.endToEnd },
};

/* 10 — Pan-India network */
export const networkIntro: SectionIntro = {
  index: "08",
  eyebrow: "Pan-India Network",
  title: "Check availability at your location",
  highlight: "your location",
  description:
    "We're building supply coverage across India. Enter your city or PIN code and our team will confirm availability for your site.",
};

export const coverageCheck = {
  label: "City or PIN code",
  placeholder: "e.g. Pune or 411001",
  button: "Check availability",
  errorMessage: "Enter a city name or a 6-digit PIN code.",
  successTitle: "Thanks — we've noted your location.",
  successBody: "Our team will confirm availability for {location}. For a faster answer, call our toll-free line or request a quote.",
  // PLACEHOLDER — active vs expanding coverage is not yet confirmed by the client (PRD §9 item 8).
  mapNote: "Coverage map is illustrative. Active and expanding regions to be confirmed.",
};

/* 11 — Why IndoX */
export const whyIntro: SectionIntro = {
  index: "09",
  eyebrow: "Why IndoX Energy",
  title: "Fuel you can account for",
  highlight: "account for",
  description: "What you get when supply, storage and data come from one partner.",
};

export const whyPoints: IconPoint[] = [
  { icon: "badgeCheck", title: "Authorized sourcing", description: "Fuel drawn from authorized sources, subject to applicable regulations — never grey-market." },
  { icon: "receipt", title: "Metered & documented", description: "Every delivery metered, recorded and backed by a GST invoice." },
  { icon: "cpu", title: "Technology built in", description: "ATG, IoT and dashboards come as part of the solution, not an afterthought." },
  { icon: "workflow", title: "End-to-end ownership", description: "Supply, storage, dispensing and monitoring under one accountable partner." },
  { icon: "shieldCheck", title: "Safety & compliance first", description: "PESO-compliant equipment and handling practices on every site." },
  { icon: "headset", title: "Responsive support", description: "A toll-free line and WhatsApp for fast answers when your site needs fuel." },
];

/* 12 — Blog */
export const blogIntro: SectionIntro = {
  index: "10",
  eyebrow: "Latest from the blog",
  title: "Insights for fuel-intensive operations",
  highlight: "fuel-intensive operations",
};

export const blogPreviewLabels = { viewAll: "View all articles", readMore: "Read article" };
