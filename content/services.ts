import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import type { Industry } from "@/content/industries";
import type { Product } from "@/content/products";

/**
 * Service catalogue — drives /services/, /services/[slug]/ (ServicePageTemplate), the Home services list,
 * the mega menu and the footer. Type follows TRD §4; `howItWorks` and `benefits` carry a title (exactly as the
 * PRD §8.6 table / outcome) plus one explanatory line each.
 *
 * Rules (PRD §5, §8.6, §9):
 * - Service pages say HOW IndoX handles it for the customer (process, outcome, what they get). Product pages
 *   say WHAT is supplied or installed. Never reuse a sentence from content/products.ts.
 * - No invented stats, prices, response times, capacities, clients or certifications.
 * - Keep the qualifiers: "eligible", "where applicable", "subject to applicable regulations".
 * - `name`, `shortName`, `group`, `icon` and `promise` also feed Home, the mega menu and the footer.
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
  group: ServiceGroup;
  icon: IconName;
  /** One-line promise (hero, cards, Home list). */
  promise: string;
  /** Title without the brand; the page appends " | IndoX Energy". */
  seo: { title: string; description: string };
  /** 4:3 slot in public/images/services/. */
  heroImage: ImageSlotKey;
  /** Exactly 3 pain points. */
  problems: [string, string, string];
  /** 4–6 items. */
  whatWeDo: { icon: IconName; title: string; text?: string }[];
  /** Numbered steps; titles exactly as in PRD §8.6. */
  howItWorks: { title: string; text: string }[];
  /** 3–4 outcome cards. */
  benefits: { title: string; text: string }[];
  industries: Industry["slug"][];
  relatedProductSlug: Product["slug"];
  /** 4–6. Rendered with FAQPage JSON-LD. */
  faqs: { q: string; a: string }[];
};

export type ServiceGroup = "Supply" | "Infrastructure" | "Intelligence";

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
      title: "Doorstep & Site Diesel Delivery for Businesses",
      description:
        "Book diesel delivery to your eligible site. We schedule it, dispatch a bowser, fill through a meter and hand over delivery documents, as per applicable rules.",
    },
    heroImage: "service-doorstep",
    problems: [
      "Machines stand idle while someone drives to the pump.",
      "Diesel carried in drums goes missing on the way.",
      "Purchases are logged by hand, if at all.",
    ],
    whatWeDo: [
      { icon: "mapPin", title: "Fuel at your site", text: "We bring diesel to eligible sites through an organized delivery network." },
      { icon: "clock", title: "Less downtime", text: "Deliveries are planned around your shifts and site access, so work does not stop for fuel." },
      { icon: "fuel", title: "Filled where you need it", text: "Into your storage tank or DG set, or straight into machines where applicable." },
      { icon: "gauge", title: "Measured on the spot", text: "Each fill is read off the meter and noted at the time of delivery." },
      { icon: "fileText", title: "Paperwork handed over", text: "You get the delivery documents and a GST invoice for each drop." },
      { icon: "clipboard", title: "Better fuel management", text: "Every delivery adds to a clear record of what arrived, when and where." },
    ],
    howItWorks: [
      { title: "Book", text: "Tell us the site, quantity and preferred time by phone, WhatsApp or the form." },
      { title: "Schedule", text: "We confirm a slot that fits your working hours and site access." },
      { title: "Dispatch", text: "A bowser leaves with your order, drawn from an authorized source." },
      { title: "Metered fill", text: "Fuel goes into your tank or equipment through the meter." },
      { title: "Delivery documents", text: "You sign off and keep the documents and invoice for the quantity filled." },
    ],
    benefits: [
      { title: "Machines keep working", text: "The fuel comes to the equipment instead of the equipment going to the fuel." },
      { title: "No drums on the road", text: "Fuel travels in a bowser, not loose in the back of a vehicle." },
      { title: "Every drop on paper", text: "Quantity, date and site recorded on each delivery document." },
      { title: "One way to reorder", text: "Book the next delivery the same way, from the same team." },
    ],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "fuel-bowser",
    faqs: [
      {
        q: "Who can book doorstep diesel delivery?",
        a: "Eligible businesses with a site that can receive fuel safely: projects, plants, DG set installations, fleet yards and similar sites. We confirm eligibility for your site and location under applicable regulations before the first delivery.",
      },
      {
        q: "How do I book a delivery?",
        a: "Call the toll-free number, message us on WhatsApp or send the form on this page with your site, quantity and preferred time. We confirm the slot with you.",
      },
      { q: "Can you fill my machines directly?", a: "Where applicable, yes. The bowser can fill equipment on site as well as storage tanks and DG sets." },
      { q: "What do I get after each delivery?", a: "Delivery documents showing the quantity filled, and a GST invoice." },
      {
        q: "Do you deliver in my city?",
        a: "Delivery depends on your location and applicable regulations. Share your city in the form and we will confirm.",
      },
      {
        q: "Can deliveries run on a regular schedule?",
        a: "Yes. Once your consumption is known, deliveries can be planned in advance instead of booked one at a time.",
      },
    ],
  },
  {
    slug: "bulk-fuel-supply",
    name: "Bulk Fuel Supply",
    shortName: "Bulk Fuel Supply",
    group: "Supply",
    icon: "factory",
    promise: "Large volumes sourced, transported and delivered against one order.",
    seo: {
      title: "Bulk Fuel Supply: Sourcing, Transport & Delivery",
      description:
        "For large fuel requirements: we take your requirement, arrange supply from authorized sources, quote, dispatch and deliver against one order, with a GST invoice.",
    },
    heroImage: "service-bulk",
    problems: [
      "Several vendors for one monthly requirement.",
      "Unclear sourcing and paperwork.",
      "Deliveries that do not match the consumption plan.",
    ],
    whatWeDo: [
      { icon: "clipboard", title: "Requirement mapped first", text: "Grade, monthly volume, sites and storage are understood before anything is quoted." },
      { icon: "badgeCheck", title: "Supply arranged from authorized sources", text: "Procurement for your grade and volume, subject to specifications and regulations." },
      { icon: "truck", title: "Transport planned", text: "Movement from source to site is part of the same order, not a separate vendor." },
      { icon: "mapPin", title: "One site or several", text: "Large quantities split across your sites, where applicable." },
      { icon: "receipt", title: "Paperwork that matches", text: "Quote, delivery documents and GST invoice line up with each other." },
      { icon: "handshake", title: "One point of contact", text: "One team coordinates the order from requirement to invoice." },
    ],
    howItWorks: [
      { title: "Requirement", text: "You share the grade, volume, sites and timelines." },
      { title: "Sourcing", text: "We arrange supply from authorized sources for that requirement." },
      { title: "Quote", text: "You receive a quote for the grade, quantity and delivery location." },
      { title: "Dispatch", text: "Once confirmed, loads are dispatched as planned." },
      { title: "Delivery", text: "Fuel reaches your site with delivery documents." },
      { title: "Invoice", text: "A GST invoice closes the order." },
    ],
    benefits: [
      { title: "Fewer vendors to manage", text: "One order covers sourcing, transport and delivery." },
      { title: "Known origin", text: "Fuel comes from authorized sources, and the paperwork shows it." },
      { title: "Deliveries that follow your plan", text: "Dispatch is planned against your consumption, not the other way round." },
      { title: "Clean records", text: "Quote, delivery documents and invoice agree, so accounts close faster." },
    ],
    industries: ["construction-infrastructure", "mining-heavy-equipment", "manufacturing-industrial", "logistics-fleet"],
    relatedProductSlug: "bulk-fuel-oil-supply",
    faqs: [
      {
        q: "What counts as a bulk requirement?",
        a: "It depends on the grade, your location and applicable regulations. If your sites use fuel in volume every month, share the numbers and we will tell you how we can supply.",
      },
      {
        q: "Which fuels can you supply in bulk?",
        a: "HSD and the other grades listed on the Bulk Fuel & Oil Supply page, subject to specifications, availability and regulations.",
      },
      { q: "Can one order cover several sites?", a: "Yes, where applicable. List each site and its quantity when you share the requirement." },
      {
        q: "How is the quote worked out?",
        a: "On the grade, quantity, delivery location and the prevailing rate at the time of order. We do not publish prices online.",
      },
      { q: "What paperwork do I get?", a: "Delivery documents for each delivery, and a GST invoice for the order." },
    ],
  },
  {
    slug: "fuel-inventory-management",
    name: "Fuel Inventory Management",
    shortName: "Inventory Management",
    group: "Intelligence",
    icon: "clipboard",
    promise: "Opening stock, receipts, issues and closing stock tracked daily, with variance flagged.",
    seo: {
      title: "Fuel Inventory Management for Sites & Fleets",
      description:
        "Daily tracking of opening stock, fuel received, fuel issued and closing stock, with equipment-wise consumption, delivery records and variance, kept digitally.",
    },
    heroImage: "service-inventory",
    problems: ["Stock is counted by dipstick and memory.", "Nobody can say which machine used what.", "Variance shows up at month-end, too late to act."],
    whatWeDo: [
      { icon: "cylinder", title: "Opening and closing stock", text: "Stock recorded at the start and end of every day." },
      { icon: "truck", title: "Fuel received", text: "Each receipt logged against its delivery document." },
      { icon: "fuel", title: "Fuel dispensed", text: "Every issue recorded against the machine or vehicle that took it." },
      { icon: "chartBars", title: "Daily and equipment-wise consumption", text: "Usage broken down by day and by asset." },
      { icon: "fileText", title: "Delivery records", text: "Receipts kept in one place, easy to check against invoices." },
      { icon: "activity", title: "Variance", text: "The gap between book stock and actual stock, flagged for review." },
    ],
    howItWorks: [
      { title: "Setup", text: "We map your tanks, machines and current register, and set up the digital record." },
      { title: "Daily capture", text: "Receipts, issues and stock readings are captured every day." },
      { title: "Reconciliation", text: "Book stock is matched against actual stock and gaps are flagged." },
      { title: "Reports", text: "Daily and monthly reports by site and by equipment." },
    ],
    benefits: [
      { title: "Stock you can quote", text: "A current number, not an estimate from last week's dip." },
      { title: "Consumption by machine", text: "See which assets use the most fuel and when." },
      { title: "Variance caught early", text: "Gaps surface within days, not at month-end." },
      { title: "Records that stand up", text: "Receipts, issues and stock in one history for audits." },
    ],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "smart-diesel-storage-tanks",
    faqs: [
      {
        q: "Do I need a smart tank for inventory management?",
        a: "No. It can start from manual readings. With a smart tank, levels are captured automatically and reconciliation takes less effort.",
      },
      {
        q: "What is variance?",
        a: "The difference between the stock your records say you should have and the stock actually in the tank. Small steady gaps and sudden jumps both need a look.",
      },
      {
        q: "Can I see consumption per machine?",
        a: "Yes. When each issue is recorded against a machine or vehicle, consumption can be reported equipment-wise.",
      },
      { q: "How often are reports shared?", a: "Daily and monthly reporting is part of the service. The exact format is agreed during setup." },
      { q: "Can it cover more than one site?", a: "Yes. Each site keeps its own record, and reports can be viewed site by site." },
    ],
  },
  {
    slug: "fuel-monitoring-iot",
    name: "Fuel Monitoring & IoT Solutions",
    shortName: "Monitoring & IoT",
    group: "Intelligence",
    icon: "radio",
    promise: "ATG, GPS and RFID data on one dashboard, with alerts to your phone.",
    seo: {
      title: "Fuel Monitoring & IoT Solutions: ATG, GPS, RFID",
      description:
        "We connect ATG, IoT sensors, GPS and RFID to a cloud dashboard and mobile app, so your team sees fuel levels, movement and alerts across sites.",
    },
    heroImage: "service-monitoring",
    problems: ["Tank levels are only known when someone checks.", "Bowser movements are not tracked.", "Alerts come from a phone call after the fact."],
    whatWeDo: [
      { icon: "gauge", title: "ATG and IoT sensors", text: "Tank levels read automatically and sent to the cloud." },
      { icon: "mapPin", title: "GPS", text: "Bowser and vehicle movement tracked, where applicable." },
      { icon: "nfc", title: "RFID", text: "Fills tied to tagged machines and users." },
      { icon: "cloud", title: "Cloud monitoring", text: "Readings from every connected site collected in one place." },
      { icon: "smartphone", title: "Mobile app and web dashboard", text: "Levels, movement and history on phone and desktop." },
      { icon: "bell", title: "Analytics and alerts", text: "Trends for planning, and alerts when something changes." },
    ],
    howItWorks: [
      { title: "Sensors", text: "Devices are fitted on tanks, bowsers and dispensing points, as the site needs." },
      { title: "Cloud", text: "Readings travel to the cloud automatically." },
      { title: "Dashboard", text: "Your team sees levels, movement and consumption on the app and dashboard." },
      { title: "Alerts", text: "Low stock and unusual changes notify the people you choose." },
    ],
    benefits: [
      { title: "Levels without site visits", text: "Check any connected tank from your phone." },
      { title: "Movement on record", text: "See where the bowser went and what it filled, where GPS is fitted." },
      { title: "Earlier warnings", text: "Alerts arrive when levels change, not after someone calls." },
      { title: "One view across sites", text: "Every connected site on the same dashboard." },
    ],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "smart-diesel-storage-tanks",
    faqs: [
      {
        q: "What equipment is used?",
        a: "ATG probes, IoT devices, GPS units and RFID readers, chosen for your tanks, vehicles and dispensing points.",
      },
      { q: "Can it work with my existing tank?", a: "It depends on the tank and the site. We check first and tell you what can be fitted." },
      { q: "Who receives the alerts?", a: "The people you choose, such as site heads, fuel managers or accounts." },
      { q: "Is GPS included?", a: "Where applicable, for bowsers and vehicles." },
      { q: "Do I need the app to see the data?", a: "No. The same data is available on the web dashboard." },
    ],
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
        "Fuel storage built end to end: design, fabrication, installation, piping, dispensing, automation, testing and commissioning, to applicable safety requirements.",
    },
    heroImage: "service-fabrication",
    problems: ["Tanks sized by guesswork.", "Separate vendors for tank, piping and dispenser.", "Safety requirements handled late."],
    whatWeDo: [
      { icon: "clipboard", title: "Design for your site", text: "Size and layout planned around consumption, space and applicable rules." },
      { icon: "wrench", title: "Fabrication", text: "The tank is built to the agreed design." },
      { icon: "hardHat", title: "Installation and piping", text: "Placed, secured and piped at your site." },
      { icon: "fuel", title: "Dispensing", text: "Dispensing units fitted where fuel needs to be issued." },
      { icon: "cpu", title: "Automation", text: "ATG and monitoring installed so the tank is connected from day one." },
      {
        icon: "shieldCheck",
        title: "Testing and commissioning",
        text: "Checked and handed over to applicable technical, safety and regulatory requirements.",
      },
    ],
    howItWorks: [
      { title: "Design", text: "A site survey, your consumption and the space set the size and layout." },
      { title: "Fabrication", text: "The tank is built to the agreed design." },
      { title: "Installation", text: "The tank is placed and secured on site." },
      { title: "Piping", text: "Pipework connects the tank, fill point and dispenser." },
      { title: "Dispensing", text: "Dispensing units are fitted and connected." },
      { title: "Automation", text: "ATG and monitoring are installed and configured." },
      { title: "Testing", text: "The system is checked before first use." },
      { title: "Commissioning", text: "Handed over, ready to receive and issue fuel." },
    ],
    benefits: [
      { title: "One contractor, one handover", text: "Design to commissioning with a single team." },
      { title: "Sized to your use", text: "Capacity planned around your consumption, not guessed." },
      { title: "Connected from day one", text: "Monitoring fitted during installation, not added later." },
      { title: "Safety handled early", text: "Requirements considered at the design stage." },
    ],
    industries: ["construction-infrastructure", "mining-heavy-equipment", "manufacturing-industrial", "logistics-fleet", "commercial-institutional"],
    relatedProductSlug: "smart-diesel-storage-tanks",
    faqs: [
      {
        q: "Do you handle the whole project?",
        a: "Yes. Design, fabrication, installation, piping, dispensing, automation, testing and commissioning are done by one team.",
      },
      { q: "How is the tank size decided?", a: "From your consumption, the space available and the applicable regulations, after a site survey." },
      {
        q: "Will the new tank have monitoring?",
        a: "Yes. ATG and monitoring are fitted in the automation step, so the tank reports its level from the start.",
      },
      {
        q: "What about safety and approvals?",
        a: "Installation follows applicable technical, safety and regulatory requirements. The approvals needed depend on your location, capacity and site; we go through them with you at the design stage.",
      },
      {
        q: "Can you also supply fuel to the tank?",
        a: "Yes. Once the tank is commissioned, diesel can be supplied through Doorstep / Site Diesel Delivery or Bulk Fuel Supply.",
      },
    ],
  },
  {
    slug: "fuel-theft-prevention",
    name: "Fuel Theft & Loss Prevention",
    shortName: "Theft & Loss Prevention",
    group: "Intelligence",
    icon: "shieldCheck",
    promise: "Alerts on unusual draw-downs, unauthorized dispensing and stock gaps.",
    seo: {
      title: "Fuel Theft & Loss Prevention for Sites and Fleets",
      description:
        "Monitoring that flags unusual fuel movement, unauthorized dispensing and stock variation, alerts your team and builds a report you can act on.",
    },
    heroImage: "service-theft",
    problems: ["Fuel disappears overnight from tanks and machines.", "Dispensing without authorization.", "Losses found weeks later, with no trail."],
    whatWeDo: [
      { icon: "activity", title: "Unusual fuel movement", text: "Sudden drops in tank or vehicle levels flagged." },
      { icon: "nfc", title: "Unauthorized dispensing", text: "Fills by untagged machines or users flagged, where RFID controls are set up." },
      { icon: "chartBars", title: "Stock variation", text: "Gaps between recorded and actual stock brought to the surface." },
      { icon: "shieldCheck", title: "Potential losses", text: "Patterns that point to leaks or pilferage highlighted." },
      { icon: "bell", title: "Alerts", text: "Sent to the people you choose when an event is detected." },
      { icon: "fileText", title: "A trail to investigate", text: "The readings around each event kept for review." },
    ],
    howItWorks: [
      { title: "Monitor", text: "Tank levels, fills and movements are watched." },
      { title: "Detect", text: "Unusual drops, unauthorized fills and stock gaps are picked out." },
      { title: "Alert", text: "The right people are notified." },
      { title: "Investigate", text: "The event is checked against the readings and records." },
      { title: "Report", text: "Findings go into a report you can act on." },
    ],
    benefits: [
      { title: "Know while it is fresh", text: "Alerts arrive while the trail can still be followed." },
      { title: "A trail for every litre", text: "Receipts, fills and levels kept on record." },
      { title: "Fewer write-offs", text: "Losses investigated with data instead of guesswork." },
    ],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "fuel-dispensing-units",
    faqs: [
      {
        q: "How is theft detected?",
        a: "By watching tank levels, fills and movements for patterns that do not match normal use, such as a drop in level with no matching fill record.",
      },
      { q: "Who gets alerted?", a: "The people you choose, when an event is detected." },
      {
        q: "Can it stop unauthorized fills, or only report them?",
        a: "Both, depending on the setup. With RFID controls on the dispensing unit, untagged machines are blocked from drawing fuel. Everything else unusual is flagged for review.",
      },
      { q: "Does it cover fuel inside machines and vehicles?", a: "Where applicable, with sensors fitted on the vehicle or equipment." },
      { q: "What does the report include?", a: "The event, the readings around it and what the investigation found." },
    ],
  },
  {
    slug: "fuel-management-solution",
    name: "Fuel Management Solution",
    shortName: "Fuel Management",
    group: "Intelligence",
    icon: "dashboard",
    promise: "Move from paper registers to a digital record of every litre.",
    seo: {
      title: "Fuel Management Solution: From Registers to Digital",
      description:
        "Replace paper fuel registers with one digital record, from fuel receipt and storage to dispensing, monitoring, reporting and analytics, set up with your team.",
    },
    heroImage: "service-management",
    problems: ["Paper registers that nobody reconciles.", "Separate records for delivery, stock and issue.", "No clear view of cost per machine or site."],
    whatWeDo: [
      { icon: "fileText", title: "Registers moved to digital", text: "Your current records and process mapped into one system." },
      { icon: "workflow", title: "Receipt to issue in one record", text: "Receipts, storage and dispensing linked instead of kept in separate books." },
      { icon: "building", title: "Site and head-office view", text: "The same numbers for the site team and for management." },
      { icon: "chartLine", title: "Reporting and analytics", text: "Cost and consumption by site, machine and period." },
      { icon: "gauge", title: "Connected to your equipment", text: "Works with dispensing units, tanks and monitoring, where fitted." },
      { icon: "headset", title: "Help moving over", text: "Your team is shown how to use the system during rollout." },
    ],
    howItWorks: [
      { title: "Fuel receipt", text: "Every delivery is logged against its documents." },
      { title: "Storage", text: "Stock in each tank is tracked." },
      { title: "Dispensing", text: "Each issue is recorded against a machine, vehicle or operator." },
      { title: "Monitoring", text: "Levels and movements are watched for anything unusual." },
      { title: "Reporting", text: "Daily and monthly reports are generated." },
      { title: "Analytics", text: "Trends show where fuel goes and where cost can come down." },
    ],
    benefits: [
      { title: "One record, receipt to report", text: "No copying numbers between registers." },
      { title: "Cost per site and per machine", text: "See where the fuel budget actually goes." },
      { title: "History you can audit", text: "Every litre traceable back to its delivery." },
      { title: "Less time on paperwork", text: "Records are captured as fuel moves, not written up later." },
    ],
    industries: ALL_INDUSTRIES,
    relatedProductSlug: "fuel-dispensing-units",
    faqs: [
      {
        q: "What does moving to digital fuel management involve?",
        a: "We map your current registers and process, set the system up for your tanks, dispensing points and machines, and show your team how to use it.",
      },
      { q: "Can I keep my existing tanks and pumps?", a: "It depends on the equipment. We check what you have and tell you what can connect." },
      {
        q: "Who is it for?",
        a: "Businesses that issue fuel to their own machines, vehicles or DG sets: construction, mining, fleets, plants and commercial buildings.",
      },
      { q: "What reports will I get?", a: "Receipts, stock, issues and consumption by site, machine and period. The exact reports are agreed during setup." },
      {
        q: "How is this different from Fuel Inventory Management?",
        a: "Inventory management tracks stock and variance. The fuel management solution covers the whole chain: receipt, storage, dispensing, monitoring, reporting and analytics.",
      },
    ],
  },
];

export const getService = (slug: string): Service | undefined => services.find((service) => service.slug === slug);

/** Display order + one line per band on /services/ (PRD §8.5). */
export const serviceGroups: { group: ServiceGroup; description: string }[] = [
  { group: "Supply", description: "Getting fuel to your site." },
  { group: "Infrastructure", description: "Storing and issuing it safely." },
  { group: "Intelligence", description: "Knowing where every litre went." },
];

/** /services/ overview page (PRD §8.5). */
export const servicesOverview = {
  seo: {
    title: "Services: Diesel Delivery, Tanks & Fuel Monitoring | IndoX Energy",
    description:
      "Seven fuel services for business: site diesel delivery, bulk supply, tank fabrication, inventory management, IoT monitoring, theft prevention and fuel management.",
  },
  hero: {
    eyebrow: "Services",
    title: "Fuel at your site. Less downtime. Better fuel management.",
    description:
      "Seven services that cover how fuel reaches your site, how it is stored and issued, and how every litre is accounted for. For eligible businesses, subject to applicable regulations.",
  },
  grid: {
    index: "01",
    eyebrow: "All services",
    title: "Seven services in three groups",
    description: "Each card opens the full service page: the problem it solves, what we do, how it works and common questions.",
    cta: "Explore",
    count: (n: number) => `${n} ${n === 1 ? "service" : "services"}`,
  },
  products: {
    index: "02",
    eyebrow: "Also see the products",
    title: "The fuels and equipment behind these services",
    cta: "View all products",
  },
};

/** Shared labels for ServicePageTemplate. Per-service copy lives on each Service. */
export const servicePageCopy = {
  heroEyebrow: "Service",
  getQuote: "Get a Quote",
  call: "Call",
  formTitle: "Get a quote for this service",
  problem: { eyebrow: "The problem", title: "What goes wrong today" },
  whatWeDo: { eyebrow: "What we do", title: "What IndoX handles for you" },
  howItWorks: { eyebrow: "How it works", title: "Step by step", stepLabel: "Step" },
  benefits: { eyebrow: "Benefits", title: "What changes for you" },
  who: { eyebrow: "Who it's for", title: "Industries we do this for" },
  related: {
    eyebrow: "Related product",
    title: "The product behind this service",
    description: "This page covers how we handle it for you. The product page covers what we supply or install.",
    cta: "See the product",
  },
  faqs: { eyebrow: "FAQs", title: "Common questions" },
  others: { eyebrow: "Other services", title: "More ways we can help", cta: "View all services" },
};
