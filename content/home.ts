import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import { ROUTES, productHref, quoteHref, serviceHref } from "@/content/navigation";

/**
 * All Home page copy (PRD §8.1). Components render this; they don't own copy.
 * Voice: concrete and plain. Short sentences about sites, DG sets, delivery, records, theft and downtime.
 * Keep compliance qualifiers on every supply / delivery claim. No invented stats, clients or certifications.
 */

export type SectionIntro = {
  /** Section number shown in the eyebrow, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
};

/* 1 — Hero */
export const hero = {
  eyebrow: "Fuel supply · Storage · Monitoring",
  /** Each entry is one masked line of the h1. */
  titleLines: ["From fuel supply", "to fuel intelligence"],
  subline:
    "We supply diesel to sites, plants and fleets. It comes from authorized sources, arrives metered, and goes into tanks you can check from your phone. Every litre is on record.",
  primaryCta: { label: "Get a Quote", href: ROUTES.quote },
  secondaryCta: { label: "Explore Services", href: ROUTES.services },
  image: "hero-bowser" as ImageSlotKey,
  caption: "FIG. 01 — Fuel bowser, metered site delivery",
  labels: ["Metered", "Documented", "GST invoiced"],
};

/* 7b — Two offerings (split cards between the EV teaser and Industries; unnumbered so sections 01–10 keep their numbers) */
export type Offering = {
  id: string;
  icon: IconName;
  /** Card surface tint: blue = bg-elevated, green = bg-tint-green. Solid tokens, never a gradient. */
  tone: "blue" | "green";
  tag: string;
  /** Each entry is one line of the card heading. */
  titleLines: [string, string];
  description: string;
  cta: { label: string; href: string };
  /** Two short differentiators already stated elsewhere on the site. Never numbers or counters. */
  stats: [{ value: string; label: string }, { value: string; label: string }];
};

export const offeringsIntro: SectionIntro = {
  eyebrow: "Fuel and EV",
  title: "Two lines of work, one team",
};

export const offerings: Offering[] = [
  {
    id: "fuel",
    icon: "fuel",
    tone: "blue",
    tag: "For sites, plants and fleets",
    titleLines: ["Doorstep diesel", "and bulk fuel supply"],
    // = products.ts › hsd-diesel-supply › promise
    description: "Bulk high-speed diesel for eligible businesses, drawn from authorized sources and supplied as per applicable regulations.",
    cta: { label: "Get a Quote", href: quoteHref({ product: "hsd-diesel-supply" }) },
    // = approachSteps › deliver
    stats: [
      { value: "Metered delivery", label: "A delivery document each time." },
      { value: "GST invoiced", label: "Against the delivered quantity." },
    ],
  },
  {
    id: "ev",
    icon: "plugZap",
    tone: "green",
    tag: "For host sites and depots",
    titleLines: ["AC and DC EV charging,", "from site survey to AMC"],
    // = ev.ts › solutions.description (not the hero promise: the EV teaser directly above already says that)
    description: "Everything a host site needs, from the charger on the wall to the support after it goes live.",
    cta: { label: "Book a Site Survey", href: quoteHref({ service: "ev-charging" }) },
    // = ev.ts › solutions.items (the teaser above already lists AC/DC and the site survey)
    stats: [
      { value: "OCPP integration", label: "Chargers connect to a management platform." },
      { value: "Monitoring platform", label: "Charger status, sessions and usage on one dashboard." },
    ],
  },
];

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
  eyebrow: "Approach",
  title: "Six steps. One record.",
  description:
    "Most sites buy fuel from one vendor, store it in someone else's tank and track it on paper. We run the whole chain, so there is one record from depot to dashboard.",
};

export const approachSteps: ApproachStep[] = [
  {
    id: "source",
    icon: "droplet",
    image: "approach-source",
    title: "Source",
    line: "Fuel from authorized sources only.",
    details: [
      "Drawn through authorized channels, subject to applicable regulations",
      "Grade and quantity confirmed before dispatch",
      "Paperwork travels with every load",
    ],
  },
  {
    id: "deliver",
    icon: "truck",
    image: "approach-deliver",
    title: "Deliver",
    line: "Metered delivery to your site.",
    details: ["Delivery slots planned around your shifts", "Metered fill with a delivery document each time", "GST invoice against the delivered quantity"],
  },
  {
    id: "store",
    icon: "cylinder",
    image: "approach-store",
    title: "Store",
    line: "Tanks sized to what you burn.",
    details: ["Tank size set by consumption and site layout", "PESO-compliant equipment", "Level sensing ready from day one"],
  },
  {
    id: "dispense",
    icon: "fuel",
    image: "approach-dispense",
    title: "Dispense",
    line: "Each fill logged to a machine.",
    details: ["Metered dispensing units at the point of use", "Issues logged by machine, vehicle or operator", "Bowsers for equipment that can't come to the tank"],
  },
  {
    id: "monitor",
    icon: "activity",
    image: "approach-monitor",
    title: "Monitor",
    line: "Live levels and alerts.",
    details: ["ATG and IoT sensors report tank levels", "GPS on delivery and bowser movements, where applicable", "Alerts on sudden drops or unusual draw"],
  },
  {
    id: "analyze",
    icon: "chartLine",
    image: "approach-analyze",
    title: "Analyze",
    line: "Know where the fuel went.",
    details: ["Consumption by site, machine and period", "Delivered, stored and dispensed quantities reconciled", "Reports for reorders and budgets"],
  },
];

export const marqueeItems = ["Source", "Deliver", "Store", "Dispense", "Monitor", "Analyze"];

/* 4 — Products */
export const productsIntro: SectionIntro = {
  index: "02",
  eyebrow: "Products",
  title: "What we supply and install",
  description: "The fuel itself, and the equipment that keeps it counted on site.",
};

/* 5 — Services */
export const servicesIntro: SectionIntro = {
  index: "03",
  eyebrow: "Services",
  title: "How we run it for you",
  description: "Take one service or several. Each is set up around your site and consumption, not a fixed package.",
};

/* 6 — Technology */
export type TechChip = { icon: IconName; label: string; description: string };

export const technologyIntro: SectionIntro = {
  index: "04",
  eyebrow: "Technology",
  title: "See the tank, not just the invoice",
  description:
    "Sensors on the tank, GPS on the bowser, RFID at the nozzle. The readings land on one dashboard, and your site head gets an alert when something is off.",
};

export const techChips: TechChip[] = [
  { icon: "gauge", label: "ATG", description: "Tank level, measured automatically" },
  { icon: "cpu", label: "IoT", description: "Sensors that report without a site visit" },
  { icon: "mapPin", label: "GPS", description: "Where the bowser is, and where it stopped" },
  { icon: "nfc", label: "RFID", description: "Only tagged machines get fuel" },
  { icon: "dashboard", label: "Dashboard", description: "Every site on one screen" },
  { icon: "smartphone", label: "App", description: "Levels and alerts on your phone" },
  { icon: "chartBars", label: "Analytics", description: "Use per machine, site and week" },
  { icon: "bell", label: "Alerts", description: "Sudden drops, refills and low stock" },
];

/** Dashboard mockup values. Illustrative only — always rendered with a "Sample data" label (PRD §9 rule 5). */
export const sampleDashboard = {
  label: "Sample data",
  note: "Illustrative mockup. Not customer data.",
  title: "Fuel overview",
  sites: [
    { name: "Site A", level: 72 },
    { name: "Site B", level: 38 },
    { name: "Site C", level: 91 },
  ],
  weeklyUsage: [42, 58, 51, 66, 49, 73, 61],
  weekDays: ["M", "T", "W", "T", "F", "S", "S"],
  alerts: [
    { tone: "warn", text: "Site B below reorder level" },
    { tone: "ok", text: "Delivery reconciled, Site A" },
  ] as { tone: "warn" | "ok"; text: string }[],
};

/* 7 — EV Charging teaser */
export const evTeaser = {
  index: "05",
  eyebrow: "EV Charging",
  title: "EV charging, planned like fuel",
  description:
    "We survey the site, plan the electrical load, install AC or DC chargers and look after them afterwards. For hotels, highways, housing societies, fleet depots and parking.",
  points: [
    { title: "AC and DC chargers", description: "Chosen by how long vehicles stay parked." },
    { title: "Site survey first", description: "Load, layout and access checked before we quote." },
    { title: "Installed and maintained", description: "Commissioning, OCPP software and AMC support." },
  ],
  image: "ev-charger" as ImageSlotKey,
  caption: "FIG. 05 — EV charger, host site",
  primaryCta: { label: "Book a Site Survey", href: quoteHref({ service: "ev-charging" }) },
  secondaryCta: { label: "Explore EV Charging", href: ROUTES.evCharging },
};

/* 8 — Industries + segments */
export const industriesIntro: SectionIntro = {
  index: "07",
  eyebrow: "Industries",
  title: "Sites that can't stop for fuel",
  description: "When a DG set, excavator or truck runs dry, work stops with it. These are the sectors we plan for.",
};

export const segmentsLabel = "Customer segments";

/* 9 — End-to-end teaser */
export const endToEndTeaser = {
  index: "08",
  eyebrow: "End-to-End",
  title: "One partner from first litre to first charge",
  description: "Take one step or the whole chain. Each connects to the next, and one team answers for all of it.",
  steps: [
    { icon: "fuel", label: "Fuel Supply", href: productHref("hsd-diesel-supply") },
    { icon: "truck", label: "Transportation", href: productHref("fuel-bowser") },
    { icon: "cylinder", label: "Storage", href: productHref("smart-diesel-storage-tanks") },
    { icon: "gauge", label: "Dispensing", href: productHref("fuel-dispensing-units") },
    { icon: "activity", label: "Digital Monitoring", href: serviceHref("fuel-monitoring-iot") },
    { icon: "dashboard", label: "Fuel Management", href: serviceHref("fuel-management-solution") },
    { icon: "plugZap", label: "EV Charging", href: ROUTES.evCharging },
  ] as { icon: IconName; label: string; href: string }[],
  cta: { label: "See the full ecosystem", href: ROUTES.endToEnd },
};

/* 10 — Pan-India network */
export const networkIntro: SectionIntro = {
  index: "09",
  eyebrow: "Network",
  title: "Check delivery to your site",
  description:
    "We are building supply coverage across India, city by city. Enter your city or PIN code. If it is on our list you'll see it here. If not, our team will confirm.",
};

export const coverageCopy = {
  label: "City or PIN code",
  placeholder: "e.g. Pune or 411001",
  button: "Check",
  errorMessage: "Enter a city name or a 6-digit PIN code.",
  matchActive: "{location} is in our active network.",
  matchExpanding: "{location} is in an area we are expanding into.",
  noMatch: "Our team will confirm availability for your location.",
  noMatchBody: "Send a quote request with your site location and monthly volume, or call us.",
  quoteLabel: "Get a Quote",
  /** PLACEHOLDER — shown until content/coverage.ts has client-confirmed data. */
  mapNote: "Coverage regions will appear here once confirmed. Markers are reference cities, not coverage.",
  legend: { active: "Active", expanding: "Expanding", reference: "Reference city" },
};

/* 11 — Why IndoX (titles exactly as PRD §8.1) */
export const whyIntro: SectionIntro = {
  index: "10",
  eyebrow: "Why IndoX",
  title: "Why IndoX Energy",
};

export const whyPoints: { icon: IconName; title: string; description: string }[] = [
  { icon: "truck", title: "Reliable Supply Network", description: "Authorized sources and planned delivery slots, so sites aren't left waiting on fuel." },
  { icon: "cpu", title: "Technology Driven", description: "ATG, IoT sensors, GPS and dashboards come with the supply, not as an extra." },
  { icon: "wrench", title: "Customized Solutions", description: "Tank size, delivery frequency and monitoring set by your consumption and site layout." },
  { icon: "workflow", title: "End-to-End Support", description: "Supply, storage, dispensing and monitoring handled by one team, one point of contact." },
  { icon: "receipt", title: "Transparent Operations", description: "Metered deliveries, delivery documents and GST invoices. Every litre can be traced." },
  { icon: "route", title: "Scalable Network", description: "Start with one site. Add more as projects and fleets grow." },
];

/* 12 — Blog */
export const blogIntro: SectionIntro = {
  index: "11",
  eyebrow: "Blog",
  title: "Notes for site and fuel managers",
};

export const blogLabels = { viewAll: "All articles", readMore: "Read article" };



/* 7c — Franchise (two cards; unnumbered like the offerings split so sections 01–10 keep their numbers) */
export type FranchiseOffer = {
  id: string;
  icon: IconName;
  /** Card surface tint: blue = bg-elevated, green = bg-tint-green. Solid tokens, never a gradient. */
  tone: "blue" | "green";
  badge: string;
  kicker: string;
  /** Each entry is one line of the card heading. */
  titleLines: [string, string];
  description: string;
  points: string[];
  cta: { label: string; href: string };
  /** Two short differentiators. Never invented numbers or counters. */
  stats: [{ value: string; label: string }, { value: string; label: string }];
};

export const franchiseIntro: SectionIntro = {
  index: "06",
  eyebrow: "Franchise",
  title: "Start your own fuel business",
  description: "Two ways to join us. We help with setup, supply and support.",
};

export const franchiseOffers: FranchiseOffer[] = [
  {
    id: "bowser",
    icon: "truck",
    tone: "blue",
    badge: "High-demand franchise opportunity",
    kicker: "Bowser tank for",
    titleLines: ["Door-to-door diesel", "delivery business"],
    description: "Start a petroleum franchise with certified bowser tanks, direct supply and complete setup support.",
    points: ["Certified bowser tanks", "Direct fuel supply", "Complete setup support"],
    cta: { label: "Get an Enquiry", href: ROUTES.quote },
    stats: [
      { value: "Metered delivery", label: "A delivery document each time." },
      { value: "Authorized sources", label: "Supplied as per applicable regulations." },
    ],
  },
  {
    id: "bio-pump",
    icon: "leaf",
    tone: "green",
    badge: "Clean energy franchise",
    kicker: "New franchise setup for",
    titleLines: ["Bio diesel &", "bio petrol pump"],
    description: "Start an eco-friendly bio pump franchise. We provide setup assistance, site layout design, licence support and direct fuel supply.",
    points: ["Setup assistance", "Site layout design", "Licence support"],
    cta: { label: "Get an Enquiry", href: ROUTES.quote },
    stats: [
      { value: "Green fuel", label: "A cleaner-burning alternative." },
      { value: "Direct supply", label: "Fuel supplied straight to your pump." },
    ],
  },
];
