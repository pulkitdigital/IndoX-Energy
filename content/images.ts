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
  | "cta-bg";

/** Folder per page/section under public/images/. services/ and about/ also hold future page images. */
export const IMAGE_FOLDERS = ["home", "products", "services", "industries", "blog", "ev", "about"] as const;
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

  /* Service page heroes (Phase 2 templates) */
  "service-doorstep": slot("service-doorstep", { folder: "services", alt: "Fuel bowser refuelling equipment at a project site", ...SIZE.landscape }),
  "service-bulk": slot("service-bulk", { folder: "services", alt: "Bulk fuel tanker arriving at an industrial facility", ...SIZE.landscape }),
  "service-inventory": slot("service-inventory", { folder: "services", alt: "Site supervisor checking fuel stock records on a tablet", ...SIZE.landscape }),
  "service-monitoring": slot("service-monitoring", { folder: "services", alt: "Tank level sensor wired to an IoT gateway on a diesel tank", ...SIZE.landscape }),
  "service-fabrication": slot("service-fabrication", { folder: "services", alt: "Diesel storage tank being installed on a concrete plinth", ...SIZE.landscape }),
  "service-theft": slot("service-theft", { folder: "services", alt: "Locked dispensing unit next to a monitored diesel tank", ...SIZE.landscape }),
  "service-management": slot("service-management", { folder: "services", alt: "Fuel management dashboard showing site-wise consumption", ...SIZE.landscape }),

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
};

/**
 * Where each slot appears on the site. Tooling only (public/images/README.md); not imported by components,
 * so it never reaches the client bundle. Record<ImageSlotKey, …> keeps it exhaustive.
 */
export const imageUsage: Record<ImageSlotKey, string> = {
  "hero-bowser": "Home — hero, right column (16:11 frame)",
  "approach-source": "Home — Our Approach, step 01 Source (step detail)",
  "approach-deliver": "Home — Our Approach, step 02 Deliver (step detail)",
  "approach-store": "Home — Our Approach, step 03 Store (step detail)",
  "approach-dispense": "Home — Our Approach, step 04 Dispense (step detail)",
  "approach-monitor": "Home — Our Approach, step 05 Monitor (step detail)",
  "approach-analyze": "Home — Our Approach, step 06 Analyze (step detail)",
  "tech-bg": "Reserved — technology background (not rendered yet)",
  "end-to-end-panorama": "Reserved — End-to-End Infrastructure panorama (not rendered yet)",
  "cta-bg": "Reserved — quote CTA background (not rendered yet)",
  "product-hsd": "Home — Products card (4:3); product page hero (Phase 2)",
  "product-bulk": "Home — Products card (4:3); product page hero (Phase 2)",
  "product-tank": "Home — Products card (4:3); product page hero (Phase 2)",
  "product-du": "Home — Products card (4:3); product page hero (Phase 2)",
  "product-bowser": "Home — Products card (4:3); product page hero (Phase 2)",
  "service-doorstep": "Service page hero (Phase 2)",
  "service-bulk": "Service page hero (Phase 2)",
  "service-inventory": "Service page hero (Phase 2)",
  "service-monitoring": "Service page hero (Phase 2)",
  "service-fabrication": "Service page hero (Phase 2)",
  "service-theft": "Service page hero (Phase 2)",
  "service-management": "Service page hero (Phase 2)",
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
  "ev-charger": "Home — EV Charging teaser",
};
