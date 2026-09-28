import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import type { Service } from "@/content/services";

/**
 * Product catalogue — drives /products/, /products/[slug]/ (ProductPageTemplate), the Home product cards,
 * the mega menu and the footer. Type follows TRD §4 (+ a few presentation fields).
 *
 * Rules (PRD §5, §8.4, §9):
 * - Product pages say WHAT IndoX supplies or installs. Service pages say HOW. Never share sentences between them.
 * - Features and applications come from the PRD §8.4 table. No invented specs, capacities, prices, stats,
 *   clients or certifications. `specs` stays undefined until the client confirms real values; the template
 *   hides the spec table while it is empty.
 * - Keep the qualifiers: "eligible customers", "where applicable", "subject to applicable regulations".
 * - `name`, `oneLiner` and `labels` also feed the Home cards: changing them changes Home.
 */
export type Product = {
  slug: "hsd-diesel-supply" | "bulk-fuel-oil-supply" | "smart-diesel-storage-tanks" | "fuel-dispensing-units" | "fuel-bowser";
  name: string;
  /** Shorter label for tight spaces (footer, strips). */
  shortName: string;
  /** Card line (Home, /products/, mega menu). */
  oneLiner: string;
  /** Product page hero: the one-line promise under the H1. */
  promise: string;
  icon: IconName;
  /** Title without the brand; the page appends " | IndoX Energy". */
  seo: { title: string; description: string };
  heroImage: ImageSlotKey;
  /** 4:3 image beside the Overview paragraph. */
  detailImage: ImageSlotKey;
  /** Spec-sheet micro labels on cards — short, factual, no numbers. */
  labels: string[];
  /** Overview block heading (unique per product). */
  overviewTitle: string;
  overview: string;
  /** 6–8 items. */
  features: { icon: IconName; title: string; text?: string }[];
  /** Client-confirmed values only. Undefined = the spec table is not rendered. */
  specs?: { label: string; value: string }[];
  applications: string[];
  relatedServiceSlug: Service["slug"];
  /** Safety & compliance block: one line (the template adds the About › Quality & Safety link). */
  safetyNote: string;
  /** 4–6. Rendered with FAQPage JSON-LD. */
  faqs: { q: string; a: string }[];
};

export const products: Product[] = [
  {
    slug: "hsd-diesel-supply",
    name: "HSD / Diesel Supply",
    shortName: "HSD / Diesel Supply",
    oneLiner: "Bulk high-speed diesel for eligible commercial and industrial users, drawn from authorized sources.",
    promise: "Bulk high-speed diesel for eligible businesses, drawn from authorized sources and supplied as per applicable regulations.",
    icon: "fuel",
    seo: {
      title: "HSD / Diesel Supply for Businesses in India",
      description:
        "Bulk HSD for eligible commercial and industrial customers, drawn from authorized sources, metered at delivery and GST invoiced, as per applicable regulations.",
    },
    heroImage: "product-hsd",
    detailImage: "detail-hsd",
    labels: ["Authorized source", "Bulk"],
    overviewTitle: "The diesel your sites, plants and fleets run on",
    overview:
      "HSD (high-speed diesel) powers most of the equipment on an Indian worksite: DG sets, excavators, cranes, trucks and pumps. IndoX Energy supplies it in bulk to eligible commercial and industrial customers. The diesel comes from authorized sources, is supplied as per applicable regulations, and arrives with what your fuel register needs: a metered quantity, a delivery record and a GST invoice.",
    features: [
      { icon: "fuel", title: "Bulk HSD", text: "For eligible commercial and industrial customers." },
      { icon: "badgeCheck", title: "Authorized sources", text: "Diesel drawn only from authorized supply points." },
      { icon: "shieldCheck", title: "Supplied as per applicable regulations", text: "Eligibility, quantity and location checked against the rules that apply." },
      { icon: "gauge", title: "Metered quantity", text: "The litres you receive are measured at delivery." },
      { icon: "fileText", title: "Delivery record", text: "A document for every supply, ready for your fuel register." },
      { icon: "receipt", title: "GST invoice", text: "Every supply is invoiced with GST." },
      { icon: "truck", title: "Into your tank or your equipment", text: "Filled into site storage, or straight into machines by bowser where applicable." },
      { icon: "cylinder", title: "Pairs with smart storage", text: "Add an IndoX smart tank to see stock levels live." },
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
    safetyNote: "Diesel is drawn from authorized sources and handled as per applicable safety and regulatory requirements.",
    faqs: [
      {
        q: "Who can buy bulk HSD from IndoX Energy?",
        a: "Eligible commercial and industrial customers: construction sites, plants, fleets, DG set operators and similar businesses. Eligibility, quantity and location are checked as per applicable regulations before supply.",
      },
      { q: "Where does the diesel come from?", a: "From authorized sources only. We do not supply fuel of unknown origin." },
      {
        q: "Is there a minimum order quantity?",
        a: "It depends on your location and the applicable regulations. Share your site and expected monthly volume, and we will confirm what we can supply.",
      },
      { q: "What documents come with each supply?", a: "A delivery record showing the metered quantity, and a GST invoice." },
      {
        q: "Can the diesel go straight into my machines?",
        a: "Where applicable, yes, by fuel bowser. The Doorstep / Site Diesel Delivery page explains how booking and receiving fuel at your site works.",
      },
      {
        q: "How is the price worked out?",
        a: "Each order is quoted on quantity, location and the prevailing rate. We do not publish prices on the website; ask for a quote with your site and volume.",
      },
    ],
  },
  {
    slug: "bulk-fuel-oil-supply",
    name: "Bulk Fuel & Oil Supply",
    shortName: "Bulk Fuel & Oil",
    oneLiner: "HSD, 10ppm ULSD where applicable, MHO, MTO, LDO and biodiesel, subject to specs and regulations.",
    promise: "Industrial fuels and oils in bulk, from HSD and ULSD to MHO, MTO, LDO and biodiesel, subject to specifications and regulations.",
    icon: "droplets",
    seo: {
      title: "Bulk Fuel & Oil Supply: HSD, ULSD, MHO, MTO, LDO",
      description:
        "Bulk HSD, 10ppm ULSD where applicable, MHO, MTO, LDO, biodiesel and other industrial oils for eligible businesses, subject to product specs and regulations.",
    },
    heroImage: "product-bulk",
    detailImage: "detail-bulk",
    labels: ["Multi-grade", "Per spec"],
    overviewTitle: "One supplier for more of your fuel list",
    overview:
      "Not every operation runs on diesel alone. Furnaces and boilers burn heavier oils, some processes need a solvent, and some fleets are moving to biodiesel. IndoX Energy supplies these grades in bulk to eligible businesses, so fewer suppliers cover your whole fuel list. Every grade is supplied to its product specification and subject to applicable regulations.",
    features: [
      { icon: "fuel", title: "HSD", text: "High-speed diesel for engines, DG sets and fleets." },
      { icon: "fuel", title: "10ppm ULSD", text: "Ultra-low sulphur diesel, where applicable." },
      { icon: "droplets", title: "MHO", text: "Mixed hydrocarbon oil, used as an industrial heating fuel." },
      { icon: "droplets", title: "MTO", text: "Mineral turpentine oil, used as a solvent." },
      { icon: "droplets", title: "LDO", text: "Light diesel oil for furnaces and boilers." },
      { icon: "leaf", title: "Biodiesel / Biofuel", text: "Bio-based fuel, where applicable." },
      { icon: "droplet", title: "Other industrial oils", text: "Subject to specifications and regulations." },
    ],
    applications: ["Industrial heating", "Solvents", "Machinery", "Fleets"],
    relatedServiceSlug: "bulk-fuel-supply",
    safetyNote: "Each grade is supplied to its product specification and handled as per applicable safety and regulatory requirements.",
    faqs: [
      {
        q: "Which fuels and oils can you supply?",
        a: "HSD, 10ppm ULSD where applicable, MHO, MTO, LDO, biodiesel or biofuel, and other industrial oils. Every grade is subject to its specification and applicable regulations, and availability depends on your location.",
      },
      {
        q: "Is 10ppm ULSD available everywhere?",
        a: "No. ULSD is supplied where applicable, depending on location and availability. Tell us your site and we will confirm.",
      },
      {
        q: "Can I order more than one grade?",
        a: "Yes. Different grades can come from the same supplier. Each one is quoted and supplied subject to its specification and applicable regulations.",
      },
      { q: "Do you supply to individuals?", a: "No. Bulk fuels and oils are supplied to eligible businesses only." },
      {
        q: "How is this different from HSD / Diesel Supply?",
        a: "HSD / Diesel Supply covers diesel alone. This page covers the wider range of industrial fuels and oils. How large orders are sourced, transported and delivered is explained on the Bulk Fuel Supply service page.",
      },
    ],
  },
  {
    slug: "smart-diesel-storage-tanks",
    name: "Smart Diesel Storage Tanks",
    shortName: "Smart Storage Tanks",
    oneLiner: "On-site tanks with automatic tank gauging, live levels and alerts on your phone.",
    promise: "On-site diesel storage that measures itself: automatic tank gauging, live levels and alerts on an app and web dashboard.",
    icon: "cylinder",
    seo: {
      title: "Smart Diesel Storage Tanks with ATG & Live Monitoring",
      description:
        "On-site diesel storage tanks with automatic tank gauging (ATG), live levels, consumption tracking, alerts and an app plus web dashboard. GPS/IoT where applicable.",
    },
    heroImage: "product-tank",
    detailImage: "detail-tank",
    labels: ["ATG", "Live level"],
    overviewTitle: "A tank that reports its own level",
    overview:
      "A smart tank is a diesel storage tank with measurement built in. An automatic tank gauge (ATG) reads the level, receipts and draw-downs are recorded as they happen, and the numbers appear on an app and a web dashboard. Site heads check stock without dipping the tank, and an unusual drop raises an alert the same day instead of turning up at month-end.",
    features: [
      { icon: "cylinder", title: "Storage tank", text: "Diesel storage installed at your site." },
      { icon: "gauge", title: "Automatic tank gauging (ATG)", text: "The level is measured automatically, no manual dipping." },
      { icon: "activity", title: "Live level monitoring", text: "Current stock visible on the dashboard at any time." },
      { icon: "chartLine", title: "Consumption tracking and digital reports", text: "Receipts and draw-downs recorded and reported digitally." },
      { icon: "bell", title: "Alerts", text: "Low stock and unusual drops flagged on your phone." },
      { icon: "shieldCheck", title: "Theft and loss monitoring", text: "Fuel that leaves without a record shows up as a variance." },
      { icon: "fuel", title: "Dispensing management", text: "Issues from the tank recorded when paired with a dispensing unit." },
      { icon: "smartphone", title: "App and web dashboard", text: "GPS / IoT connectivity where applicable." },
    ],
    applications: [
      "Construction sites",
      "DG set installations",
      "Plants and factories",
      "Mining and quarry sites",
      "Fleet depots",
      "Commercial buildings",
    ],
    relatedServiceSlug: "tank-fabrication-installation",
    safetyNote: "Tanks are installed to applicable technical, safety and regulatory requirements.",
    faqs: [
      {
        q: "What does ATG mean?",
        a: "Automatic tank gauging. A probe inside the tank measures the fuel level continuously, so nobody has to dip the tank by hand.",
      },
      { q: "Can I see the tank level on my phone?", a: "Yes. Levels, consumption and alerts are on the app and on the web dashboard." },
      {
        q: "What alerts does the tank send?",
        a: "Alerts for low stock, and for unusual drops in level that can point to a leak, pilferage or dispensing that was not recorded.",
      },
      { q: "Are GPS and IoT included?", a: "Where applicable, depending on the site and the setup you choose." },
      {
        q: "What tank sizes are available?",
        a: "Capacity is planned around your consumption, available space and the applicable regulations. We confirm the options after understanding your site.",
      },
      {
        q: "Who installs the tank?",
        a: "IndoX Energy. Design, fabrication, installation and commissioning are explained on the Tank Fabrication & Installation service page.",
      },
    ],
  },
  {
    slug: "fuel-dispensing-units",
    name: "Fuel Dispensing Units",
    shortName: "Dispensing Units",
    oneLiner: "Metered dispensing that logs each fill against a machine, vehicle or operator.",
    promise: "Professional dispensing units for on-site fueling, integrated with fuel-management technology so every fill is accounted for.",
    icon: "gauge",
    seo: {
      title: "Fuel Dispensing Units for On-site Fueling",
      description:
        "Professional fuel dispensing units for controlled on-site fueling at sites, plants and depots, integrated with fuel-management technology for control and accountability.",
    },
    heroImage: "product-du",
    detailImage: "detail-du",
    labels: ["Metered", "Per-asset log"],
    overviewTitle: "Every fill tied to a machine",
    overview:
      "A dispensing unit is the point where fuel leaves your tank and goes into a machine. IndoX Energy supplies professional dispensing units for on-site use and integrates them with fuel-management technology. That link turns a pump into a record: each fill can be tied to the vehicle, machine or operator that received it.",
    features: [
      { icon: "gauge", title: "Professional dispensing units", text: "For on-site fueling at sites, plants and depots." },
      { icon: "dashboard", title: "Fuel-management integration", text: "Fills flow into the fuel-management system for control and accountability." },
      { icon: "clipboard", title: "A record for every fill", text: "Each issue logged as it happens, not written up later." },
      { icon: "truck", title: "Per-asset logging", text: "Fills logged against the machine, vehicle or operator." },
      { icon: "nfc", title: "Tagged-asset dispensing", text: "Only tagged machines draw fuel, where RFID is set up." },
      { icon: "cylinder", title: "Pairs with smart storage", text: "Works alongside IndoX smart tanks at the same site." },
    ],
    applications: ["Fleets", "Construction", "Industrial facilities", "DG sets", "Mining", "Infrastructure", "Commercial fuel users"],
    relatedServiceSlug: "fuel-management-solution",
    safetyNote: "Dispensing equipment is supplied and installed as per applicable safety and regulatory requirements.",
    faqs: [
      {
        q: "What is a fuel dispensing unit?",
        a: "The pump, meter and nozzle that issue fuel from your storage tank into vehicles and equipment on site.",
      },
      {
        q: "Can the unit record which machine took fuel?",
        a: "Yes, when it is integrated with fuel-management technology. Fills can be logged against the machine, vehicle or operator.",
      },
      {
        q: "Do I need a storage tank to use one?",
        a: "Yes. The unit dispenses from on-site storage. If you do not have a tank yet, see Smart Diesel Storage Tanks.",
      },
      {
        q: "Can it stop unauthorized fills?",
        a: "Where RFID tagging is set up, only tagged machines can draw fuel. How unusual fills are flagged is covered on the Fuel Theft & Loss Prevention page.",
      },
      {
        q: "Is it suitable for DG sets?",
        a: "Yes. DG sets are a common use, along with fleets, construction equipment, mining and industrial facilities.",
      },
    ],
  },
  {
    slug: "fuel-bowser",
    name: "Fuel Bowser / Mobile Fuel Solutions",
    shortName: "Fuel Bowser",
    oneLiner: "A mobile tanker that meters diesel straight into equipment on remote sites.",
    promise: "A mobile tanker that carries fuel in bulk, meters it into equipment where it works, and leaves a delivery record.",
    icon: "truck",
    seo: {
      title: "Fuel Bowser & Mobile Fuel Solutions",
      description:
        "Fuel bowsers for bulk transport, site delivery and mobile fueling, with metered dispensing, delivery documentation and GPS where applicable, for eligible sites.",
    },
    heroImage: "product-bowser",
    detailImage: "detail-bowser",
    labels: ["Metered", "Mobile"],
    overviewTitle: "A tank and a meter that come to the machine",
    overview:
      "A fuel bowser is a tanker built to dispense. It carries fuel in bulk to where your equipment is working and fills machines directly through a meter. On remote sites, spread-out projects and fleets without on-site storage, the bowser does the job of a tank and a pump, and every fill leaves a delivery record.",
    features: [
      { icon: "truck", title: "Bulk transport", text: "Carries fuel in bulk to eligible sites." },
      { icon: "mapPin", title: "Site delivery", text: "Reaches equipment where it is working." },
      { icon: "fuel", title: "Mobile fueling", text: "Fills machines directly, no on-site tank needed." },
      { icon: "gauge", title: "Metered dispensing", text: "Each fill measured through the meter." },
      { icon: "fileText", title: "Delivery documentation", text: "A delivery record for every fill." },
      { icon: "route", title: "GPS", text: "Route and stops tracked, where applicable." },
      { icon: "shieldCheck", title: "Safety fittings", text: "Carries the safety equipment required under applicable rules." },
    ],
    applications: ["Remote sites", "Fleets", "Projects without on-site storage"],
    relatedServiceSlug: "doorstep-diesel-delivery",
    safetyNote: "Bowsers carry and dispense fuel as per applicable transport and safety requirements.",
    faqs: [
      {
        q: "What is a fuel bowser?",
        a: "A tanker fitted with a meter and dispensing hose, so it can carry fuel in bulk and fill equipment directly on site.",
      },
      {
        q: "When is a bowser better than an on-site tank?",
        a: "When equipment is spread across a large or changing site, when a project is short, or when you would rather not hold fuel stock on site.",
      },
      { q: "Is fuel from the bowser metered?", a: "Yes. Each fill goes through the meter and is recorded on the delivery documents." },
      { q: "Does the bowser have GPS?", a: "Where applicable, so its route and stops can be checked." },
      {
        q: "What capacity is the bowser?",
        a: "It depends on the vehicle assigned to your site. Share your requirement and we will confirm what fits.",
      },
      {
        q: "How do I book bowser delivery?",
        a: "Booking, scheduling and receiving fuel at your site are explained on the Doorstep / Site Diesel Delivery page, or ask for a quote below.",
      },
    ],
  },
];

export const getProduct = (slug: string): Product | undefined => products.find((product) => product.slug === slug);

/** /products/ overview page (PRD §8.3). */
export const productsOverview = {
  seo: {
    title: "Products: Diesel, Industrial Oils, Tanks & Bowsers | IndoX Energy",
    description:
      "Five products for business: bulk HSD, industrial fuels and oils, smart diesel storage tanks, fuel dispensing units and fuel bowsers. For eligible customers across India.",
  },
  hero: {
    eyebrow: "Products",
    title: "Fuel and fuel infrastructure for business.",
    description:
      "The diesel and oils your sites run on, and the tanks, dispensing units and bowsers that store, issue and move them. Supplied to eligible businesses, subject to applicable regulations.",
  },
  grid: {
    index: "01",
    eyebrow: "All products",
    title: "Five products, one supplier",
    description: "Each card opens the full product page: what it is, what's included, where it's used and common questions.",
    cta: "Explore",
  },
  together: {
    index: "02",
    eyebrow: "Products + services together",
    title: "Every product has a service behind it",
    description: "The product is what you get. The service is how we deliver, install or run it for you.",
    productLabel: "Product",
    serviceLabel: "Service",
  },
};

/** Shared labels for ProductPageTemplate. Per-product copy lives on each Product. */
export const productPageCopy = {
  heroEyebrow: "Product",
  enquire: "Enquire now",
  call: "Call",
  overview: { eyebrow: "Overview" },
  features: {
    eyebrow: "Key features",
    title: "What's included",
    specsTitle: "Specifications",
  },
  applications: { eyebrow: "Applications", title: "Where it's used" },
  related: {
    eyebrow: "Related service",
    title: "The service that goes with it",
    description: "This page covers what we supply. The service page covers how it reaches your site and how we run it for you.",
    cta: "See the service",
  },
  safety: { eyebrow: "Safety & compliance", linkLabel: "Quality & Safety at IndoX" },
  faqs: { eyebrow: "FAQs", title: "Common questions" },
  others: { eyebrow: "Other products", title: "More from IndoX Energy", cta: "View all products" },
};
