import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";

/** Industries We Serve + Customer Segments — lists exactly as PRD §8.1. */
export type Industry = {
  slug:
    | "construction-infrastructure"
    | "mining-heavy-equipment"
    | "manufacturing-industrial"
    | "logistics-fleet"
    | "telecom"
    | "agriculture"
    | "commercial-institutional";
  name: string;
  icon: IconName;
  painPoint: string;
  image: ImageSlotKey;
};

export const industries: Industry[] = [
  {
    slug: "construction-infrastructure",
    name: "Construction & Infrastructure",
    icon: "hardHat",
    painPoint: "Excavators, batching plants and DG sets spread across a site that moves every month.",
    image: "industry-construction",
  },
  {
    slug: "mining-heavy-equipment",
    name: "Mining & Heavy Equipment",
    icon: "mountain",
    painPoint: "Heavy machines on long shifts, far from the nearest pump.",
    image: "industry-mining",
  },
  {
    slug: "manufacturing-industrial",
    name: "Manufacturing & Industrial",
    icon: "factory",
    painPoint: "Boilers, gensets and process lines that cannot run dry mid-batch.",
    image: "industry-manufacturing",
  },
  {
    slug: "logistics-fleet",
    name: "Logistics & Fleet",
    icon: "truck",
    painPoint: "Depot refuelling with a record against every vehicle.",
    image: "industry-logistics",
  },
  {
    slug: "telecom",
    name: "Telecom",
    icon: "tower",
    painPoint: "Backup DG sets at tower sites scattered across a region.",
    image: "industry-telecom",
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    icon: "tractor",
    painPoint: "Tractors, harvesters and pump sets that need fuel on time in peak season.",
    image: "industry-agriculture",
  },
  {
    slug: "commercial-institutional",
    name: "Commercial & Institutional",
    icon: "building",
    painPoint: "Hospitals, malls and offices that depend on DG backup.",
    image: "industry-commercial",
  },
];

export const customerSegments: string[] = [
  "Builders",
  "Contractors",
  "Infrastructure Companies",
  "Factories",
  "Mining Companies",
  "Logistics Companies",
  "Fleet Operators",
  "Telecom Operators",
  "Commercial Facilities",
  "Project Sites",
  "Industrial Units",
];
