/**
 * Single source of truth for every image slot on the site.
 *
 * Files live in public/images/<folder>/<key>.webp, one folder per page/section (IMAGE_FOLDERS below).
 * To replace an image: drop a file with the SAME filename into its folder
 * (e.g. public/images/home/hero-bowser.webp). No code change is needed. Until the file
 * exists, <ImageSlot> renders a branded placeholder showing the slot name.
 *
 * Tooling (scripts/images.mjs, reads this file):
 *   npm run images:check         list missing files and dev placeholders that still need a real photo
 *   npm run images:readme        regenerate public/images/README.md from this file
 *   npm run images:placeholders  create labelled placeholder .webp files for missing slots only (dev helper)
 *
 * width/height are the recommended export size (pre-compress before upload — there is
 * no runtime image optimization on static hosting). The rendered box uses aspectRatio.
 *
 * Do NOT add the supplied retail fuel station image to any slot: whether IndoX runs retail
 * stations is unconfirmed (PRD §9 item 4).
 */

export type ImageSlotKey =
  | "hero-bowser"
  | "indox-industrial-bg"
  | "indox-truck-3d"
  | "approach-source"
  | "approach-deliver"
  | "approach-store"
  | "approach-dispense"
  | "approach-monitor"
  | "approach-analyze"
  | "product-hsd"
  | "product-bulk"
  | "product-tank"
  | "product-du"
  | "product-bowser"
  | "detail-hsd"
  | "detail-bulk"
  | "detail-tank"
  | "detail-du"
  | "detail-bowser"
  | "tech-bg"
  | "ev-charger"
  | "industry-construction"
  | "industry-manufacturing"
  | "industry-mining"
  | "industry-logistics"
  | "industry-telecom"
  | "industry-infrastructure"
  | "industry-commercial"
  | "industry-agriculture"
  | "service-doorstep"
  | "service-bulk"
  | "service-inventory"
  | "service-monitoring"
  | "service-fabrication"
  | "service-theft"
  | "service-management"
  | "end-to-end-panorama"
  | "blog-diesel-theft"
  | "blog-doorstep-vs-pump"
  | "blog-atg"
  | "blog-fuel-grades"
  | "blog-ev-setup"
  | "blog-fuel-safety"
  | "cta-bg"
  | "about-hero"
  | "about-story"
  | "about-quality-bowser"
  | "contact-hero"
  | "ev-hero"
  | "ev-ac"
  | "ev-dc"
  | "e2e-hero";

/** Folder per page/section under public/images/. services/ and about/ also hold future page images. */
export const IMAGE_FOLDERS = ["home", "home/hero", "products", "services", "industries", "blog", "ev", "about", "contact", "end-to-end"] as const;
export type ImageFolder = (typeof IMAGE_FOLDERS)[number];

export function isImageSlotKey(value: string): value is ImageSlotKey {
  return Object.prototype.hasOwnProperty.call(images, value);
}

export type ImageSlotData = {
  key: ImageSlotKey;
  /** Folder under public/images/ (page/section). */
  folder: ImageFolder;
  /** Public path. Always /images/<folder>/<key>.webp. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS aspect-ratio value for the rendered box, e.g. "4 / 5". */
  aspectRatio: string;
};

type SlotInput = Omit<ImageSlotData, "key" | "src" | "aspectRatio">;

/** Standard export sizes, reused so related slots stay consistent. */
const SIZE = {
  portrait: { width: 1200, height: 1500 },
  card: { width: 1200, height: 900 },
  landscape: { width: 1500, height: 1000 },
  wide: { width: 1600, height: 900 },
  panorama: { width: 2400, height: 1000 },
  background: { width: 1920, height: 1080 },
} as const;

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function slot(key: ImageSlotKey, input: SlotInput): ImageSlotData {
  const d = gcd(input.width, input.height);
  return { key, src: `/images/${input.folder}/${key}.webp`, aspectRatio: `${input.width / d} / ${input.height / d}`, ...input };
}

export const images: Record<ImageSlotKey, ImageSlotData> = {
  "hero-bowser": slot("hero-bowser", {
    folder: "home",
    alt: "IndoX Energy fuel bowser delivering metered diesel at a customer site",
    ...SIZE.landscape,
  }),

  /* Home hero (home/hero/): full-bleed background + cut-out truck. Rendered by components/home/Hero.tsx. */
  "indox-industrial-bg": slot("indox-industrial-bg", {
    folder: "home/hero",
    alt: "Industrial fuel depot with storage tanks behind the IndoX Energy hero",
    width: 1672,
    height: 941,
  }),
  "indox-truck-3d": slot("indox-truck-3d", { folder: "home/hero", alt: "IndoX Energy fuel delivery bowser", width: 1536, height: 1024 }),

  "approach-source": slot("approach-source", { folder: "home", alt: "Diesel being loaded from an authorized fuel depot", ...SIZE.card }),
  "approach-deliver": slot("approach-deliver", { folder: "home", alt: "Fuel delivery vehicle arriving at a customer site", ...SIZE.card }),
  "approach-store": slot("approach-store", { folder: "home", alt: "On-site diesel storage tank installed at a project site", ...SIZE.card }),
  "approach-dispense": slot("approach-dispense", { folder: "home", alt: "Metered fuel dispensing unit refuelling heavy equipment", ...SIZE.card }),
  "approach-monitor": slot("approach-monitor", { folder: "home", alt: "Tank level sensor and IoT device reporting fuel levels", ...SIZE.card }),
  "approach-analyze": slot("approach-analyze", { folder: "home", alt: "Fuel consumption analytics dashboard on a laptop screen", ...SIZE.card }),

  "product-hsd": slot("product-hsd", { folder: "products", alt: "High-speed diesel supply for commercial and industrial use", ...SIZE.card }),
  "product-bulk": slot("product-bulk", { folder: "products", alt: "Bulk fuel and oil supply tanker for high-volume operations", ...SIZE.card }),
  "product-tank": slot("product-tank", { folder: "products", alt: "Smart diesel storage tank with level monitoring", ...SIZE.card }),
  "product-du": slot("product-du", { folder: "products", alt: "Fuel dispensing unit with digital metering", ...SIZE.card }),
  "product-bowser": slot("product-bowser", { folder: "products", alt: "Mobile fuel bowser for on-site refuelling", ...SIZE.card }),

  /* Product page Overview blocks (4:3) */
  "detail-hsd": slot("detail-hsd", { folder: "products", alt: "Diesel being received into a site storage tank through a metered hose", ...SIZE.card }),
  "detail-bulk": slot("detail-bulk", { folder: "products", alt: "Drums and a bulk tanker holding different industrial fuel and oil grades", ...SIZE.card }),
  "detail-tank": slot("detail-tank", { folder: "products", alt: "Automatic tank gauge probe and level display fitted on a diesel storage tank", ...SIZE.card }),
  "detail-du": slot("detail-du", { folder: "products", alt: "Close-up of a fuel dispensing unit meter and nozzle beside a storage tank", ...SIZE.card }),
  "detail-bowser": slot("detail-bowser", { folder: "products", alt: "Metering panel and hose reel on the side of a fuel bowser", ...SIZE.card }),

  "tech-bg": slot("tech-bg", { folder: "home", alt: "Abstract visual of connected fuel monitoring technology", ...SIZE.background }),
  "ev-charger": slot("ev-charger", { folder: "ev", alt: "Electric vehicle charging station ready for use", ...SIZE.landscape }),

  "industry-construction": slot("industry-construction", { folder: "industries", alt: "Construction site with earthmoving equipment", ...SIZE.card }),
  "industry-manufacturing": slot("industry-manufacturing", { folder: "industries", alt: "Manufacturing plant floor with industrial machinery", ...SIZE.card }),
  "industry-mining": slot("industry-mining", { folder: "industries", alt: "Mining and quarry operation with heavy vehicles", ...SIZE.card }),
  "industry-logistics": slot("industry-logistics", { folder: "industries", alt: "Logistics fleet of trucks at a depot", ...SIZE.card }),
  "industry-telecom": slot("industry-telecom", { folder: "industries", alt: "Telecom tower site with backup power equipment", ...SIZE.card }),
  "industry-infrastructure": slot("industry-infrastructure", { folder: "industries", alt: "Road and infrastructure project under construction", ...SIZE.card }),
  "industry-commercial": slot("industry-commercial", { folder: "industries", alt: "Commercial building with diesel generator backup", ...SIZE.card }),
  "industry-agriculture": slot("industry-agriculture", { folder: "industries", alt: "Tractor working a field during the harvest season", ...SIZE.card }),

  /* Service page heroes (4:3) — /services/ cards, service page hero, Other services cards */
  "service-doorstep": slot("service-doorstep", { folder: "services", alt: "Fuel bowser refuelling equipment at a project site", ...SIZE.card }),
  "service-bulk": slot("service-bulk", { folder: "services", alt: "Bulk fuel tanker arriving at an industrial facility", ...SIZE.card }),
  "service-inventory": slot("service-inventory", { folder: "services", alt: "Site supervisor checking fuel stock records on a tablet", ...SIZE.card }),
  "service-monitoring": slot("service-monitoring", { folder: "services", alt: "Tank level sensor wired to an IoT gateway on a diesel tank", ...SIZE.card }),
  "service-fabrication": slot("service-fabrication", { folder: "services", alt: "Diesel storage tank being installed on a concrete plinth", ...SIZE.card }),
  "service-theft": slot("service-theft", { folder: "services", alt: "Locked dispensing unit next to a monitored diesel tank", ...SIZE.card }),
  "service-management": slot("service-management", { folder: "services", alt: "Fuel management dashboard showing site-wise consumption", ...SIZE.card }),

  "end-to-end-panorama": slot("end-to-end-panorama", {
    folder: "home",
    alt: "End-to-end fuel infrastructure from supply and storage to EV charging",
    ...SIZE.panorama,
  }),

  "blog-diesel-theft": slot("blog-diesel-theft", { folder: "blog", alt: "Diesel storage on a construction site at risk of theft", ...SIZE.wide }),
  "blog-doorstep-vs-pump": slot("blog-doorstep-vs-pump", { folder: "blog", alt: "Doorstep diesel delivery compared with refuelling at a pump", ...SIZE.wide }),
  "blog-atg": slot("blog-atg", { folder: "blog", alt: "Automatic tank gauge probe measuring fuel level in a tank", ...SIZE.wide }),
  "blog-fuel-grades": slot("blog-fuel-grades", { folder: "blog", alt: "Sample bottles of HSD, LDO and MHO fuel grades side by side", ...SIZE.wide }),
  "blog-ev-setup": slot("blog-ev-setup", { folder: "blog", alt: "EV charger installed in a hotel parking bay", ...SIZE.wide }),
  "blog-fuel-safety": slot("blog-fuel-safety", { folder: "blog", alt: "Fire extinguisher and safety signage beside a DG set fuel tank", ...SIZE.wide }),

  "cta-bg": slot("cta-bg", { folder: "home", alt: "Fuel infrastructure at dusk", ...SIZE.background }),

  /* About (about/) and Contact (contact/) */
  "about-hero": slot("about-hero", { folder: "about", alt: "IndoX Energy fuel bowser and storage tanks at an industrial site", ...SIZE.wide }),
  "about-story": slot("about-story", { folder: "about", alt: "IndoX Energy team member checking a delivery at a customer site", ...SIZE.card }),
  "about-quality-bowser": slot("about-quality-bowser", {
    folder: "about",
    alt: "Side view of an IndoX Energy fuel bowser showing its fire extinguisher, hazard panel, metered dispensing unit and valve box",
    ...SIZE.card,
  }),
  "contact-hero": slot("contact-hero", { folder: "contact", alt: "IndoX Energy fuel delivery at a customer site", ...SIZE.wide }),

  /* EV Charging (ev/) and End-to-End (end-to-end/) pages */
  "ev-hero": slot("ev-hero", { folder: "ev", alt: "IndoX EV charger installed in a commercial parking bay", ...SIZE.wide }),
  "ev-ac": slot("ev-ac", { folder: "ev", alt: "Wall-mounted AC EV charger connected to a parked car", ...SIZE.card }),
  "ev-dc": slot("ev-dc", { folder: "ev", alt: "Standalone DC fast charger at a highway charging bay", ...SIZE.card }),
  "e2e-hero": slot("e2e-hero", {
    folder: "end-to-end",
    alt: "Fuel bowser, storage tanks and an EV charger at one IndoX-run site",
    ...SIZE.wide,
  }),
};

/**
 * Where each slot appears on the site. Tooling only (public/images/README.md); not imported by components,
 * so it never reaches the client bundle. Record<ImageSlotKey, …> keeps it exhaustive.
 */
export const imageUsage: Record<ImageSlotKey, string> = {
  "hero-bowser": "Reserved — earlier Home hero image (not rendered by the current hero)",
  "indox-industrial-bg": "Home — hero full-bleed background (decorative, object-cover)",
  "indox-truck-3d": "Home — hero truck cut-out (object-contain, transparent background)",
  "approach-source": "Home — Our Approach, step 01 Source (step detail)",
  "approach-deliver": "Home — Our Approach, step 02 Deliver (step detail)",
  "approach-store": "Home — Our Approach, step 03 Store (step detail)",
  "approach-dispense": "Home — Our Approach, step 04 Dispense (step detail)",
  "approach-monitor": "Home — Our Approach, step 05 Monitor (step detail)",
  "approach-analyze": "Home — Our Approach, step 06 Analyze (step detail)",
  "tech-bg": "Reserved — technology background (not rendered yet)",
  "end-to-end-panorama": "Reserved — End-to-End Infrastructure panorama (not rendered yet)",
  "cta-bg": "Reserved — quote CTA background (not rendered yet)",
  "product-hsd": "Home — Products card; /products/ card; /products/hsd-diesel-supply/ hero; Other products cards (all 4:3)",
  "product-bulk": "Home — Products card; /products/ card; /products/bulk-fuel-oil-supply/ hero; Other products cards (all 4:3)",
  "product-tank": "Home — Products card; /products/ card; /products/smart-diesel-storage-tanks/ hero; Other products cards (all 4:3)",
  "product-du": "Home — Products card; /products/ card; /products/fuel-dispensing-units/ hero; Other products cards (all 4:3)",
  "product-bowser": "Home — Products card; /products/ card; /products/fuel-bowser/ hero; Other products cards (all 4:3)",
  "detail-hsd": "/products/hsd-diesel-supply/ — Overview block (4:3)",
  "detail-bulk": "/products/bulk-fuel-oil-supply/ — Overview block (4:3)",
  "detail-tank": "/products/smart-diesel-storage-tanks/ — Overview block (4:3)",
  "detail-du": "/products/fuel-dispensing-units/ — Overview block (4:3)",
  "detail-bowser": "/products/fuel-bowser/ — Overview block (4:3)",
  "service-doorstep": "/services/ card; service page hero; Other services cards (all 4:3)",
  "service-bulk": "/services/ card; service page hero; Other services cards (all 4:3)",
  "service-inventory": "/services/ card; service page hero; Other services cards (all 4:3)",
  "service-monitoring": "/services/ card; service page hero; Other services cards (all 4:3)",
  "service-fabrication": "/services/ card; service page hero; Other services cards (all 4:3)",
  "service-theft": "/services/ card; service page hero; Other services cards (all 4:3)",
  "service-management": "/services/ card; service page hero; Other services cards (all 4:3)",
  "industry-construction": "Home — Industries tile (4:3)",
  "industry-manufacturing": "Home — Industries tile (4:3)",
  "industry-mining": "Home — Industries tile (4:3)",
  "industry-logistics": "Home — Industries tile (4:3)",
  "industry-telecom": "Home — Industries tile (4:3)",
  "industry-agriculture": "Home — Industries tile (4:3)",
  "industry-commercial": "Home — Industries tile (4:3)",
  "industry-infrastructure": "Reserved — not assigned to an industry yet",
  "blog-diesel-theft": "Home — Blog card (16:9); blog post cover",
  "blog-doorstep-vs-pump": "Home — Blog card (16:9); blog post cover",
  "blog-atg": "Home — Blog card (16:9); blog post cover",
  "blog-fuel-grades": "Blog post cover (not in the Home preview while 3 newer posts exist)",
  "blog-ev-setup": "Blog post cover (not in the Home preview while 3 newer posts exist)",
  "blog-fuel-safety": "Blog post cover (not in the Home preview while 3 newer posts exist)",
  "ev-charger": "Home — EV Charging teaser (Home only)",
  "ev-hero": "/ev-charging/ — hero (16:9)",
  "ev-ac": "/ev-charging/ — AC vs DC table, AC column header (4:3)",
  "ev-dc": "/ev-charging/ — AC vs DC table, DC column header (4:3)",
  "e2e-hero": "/end-to-end-energy-infrastructure/ — hero, full-width 16:9 frame",
  "about-hero": "/about/ — hero, full-width 16:9 frame",
  "about-story": "/about/ — Our story (4:3)",
  "about-quality-bowser": "/about/#quality-safety — annotated bowser (4:3); callouts are code overlays, keep the bowser side-on",
  "contact-hero": "/contact/ — hero (16:9)",
};
