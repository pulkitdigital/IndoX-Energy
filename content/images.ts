/**
 * Single source of truth for every image slot on the site.
 *
 * To replace an image: drop a file with the SAME filename into public/images/
 * (e.g. public/images/hero-bowser.webp). No code change is needed. Until the file
 * exists, <ImageSlot> renders a branded placeholder showing the slot name.
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
  | "end-to-end-panorama"
  | "blog-diesel-theft"
  | "blog-doorstep-vs-pump"
  | "blog-atg"
  | "cta-bg";

export type ImageSlotData = {
  key: ImageSlotKey;
  /** Public path. Always /images/<key>.webp. */
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
  return { key, src: `/images/${key}.webp`, aspectRatio: `${input.width / d} / ${input.height / d}`, ...input };
}

export const images: Record<ImageSlotKey, ImageSlotData> = {
  "hero-bowser": slot("hero-bowser", {
    alt: "IndoX Energy fuel bowser delivering metered diesel at a customer site",
    ...SIZE.landscape,
  }),

  "approach-source": slot("approach-source", { alt: "Diesel being loaded from an authorized fuel depot", ...SIZE.card }),
  "approach-deliver": slot("approach-deliver", { alt: "Fuel delivery vehicle arriving at a customer site", ...SIZE.card }),
  "approach-store": slot("approach-store", { alt: "On-site diesel storage tank installed at a project site", ...SIZE.card }),
  "approach-dispense": slot("approach-dispense", { alt: "Metered fuel dispensing unit refuelling heavy equipment", ...SIZE.card }),
  "approach-monitor": slot("approach-monitor", { alt: "Tank level sensor and IoT device reporting fuel levels", ...SIZE.card }),
  "approach-analyze": slot("approach-analyze", { alt: "Fuel consumption analytics dashboard on a laptop screen", ...SIZE.card }),

  "product-hsd": slot("product-hsd", { alt: "High-speed diesel supply for commercial and industrial use", ...SIZE.card }),
  "product-bulk": slot("product-bulk", { alt: "Bulk fuel and oil supply tanker for high-volume operations", ...SIZE.card }),
  "product-tank": slot("product-tank", { alt: "Smart diesel storage tank with level monitoring", ...SIZE.card }),
  "product-du": slot("product-du", { alt: "Fuel dispensing unit with digital metering", ...SIZE.card }),
  "product-bowser": slot("product-bowser", { alt: "Mobile fuel bowser for on-site refuelling", ...SIZE.card }),

  "tech-bg": slot("tech-bg", { alt: "Abstract visual of connected fuel monitoring technology", ...SIZE.background }),
  "ev-charger": slot("ev-charger", { alt: "Electric vehicle charging station ready for use", ...SIZE.landscape }),

  "industry-construction": slot("industry-construction", { alt: "Construction site with earthmoving equipment", ...SIZE.card }),
  "industry-manufacturing": slot("industry-manufacturing", { alt: "Manufacturing plant floor with industrial machinery", ...SIZE.card }),
  "industry-mining": slot("industry-mining", { alt: "Mining and quarry operation with heavy vehicles", ...SIZE.card }),
  "industry-logistics": slot("industry-logistics", { alt: "Logistics fleet of trucks at a depot", ...SIZE.card }),
  "industry-telecom": slot("industry-telecom", { alt: "Telecom tower site with backup power equipment", ...SIZE.card }),
  "industry-infrastructure": slot("industry-infrastructure", { alt: "Road and infrastructure project under construction", ...SIZE.card }),
  "industry-commercial": slot("industry-commercial", { alt: "Commercial building with diesel generator backup", ...SIZE.card }),

  "end-to-end-panorama": slot("end-to-end-panorama", {
    alt: "End-to-end fuel infrastructure from supply and storage to EV charging",
    ...SIZE.panorama,
  }),

  "blog-diesel-theft": slot("blog-diesel-theft", { alt: "Diesel storage on a construction site at risk of theft", ...SIZE.wide }),
  "blog-doorstep-vs-pump": slot("blog-doorstep-vs-pump", { alt: "Doorstep diesel delivery compared with refuelling at a pump", ...SIZE.wide }),
  "blog-atg": slot("blog-atg", { alt: "Automatic tank gauge probe measuring fuel level in a tank", ...SIZE.wide }),

  "cta-bg": slot("cta-bg", { alt: "Fuel infrastructure at dusk", ...SIZE.background }),
};
