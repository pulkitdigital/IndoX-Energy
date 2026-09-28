import { quoteHref } from "@/content/navigation";
import type { Product } from "@/content/products";

/**
 * "Build your package" (PRD §8.8) — the whole recommendation logic lives here as data + a small ordered rules
 * table; components/end-to-end/PackageSelector.tsx only renders it. Client-side only, nothing is sent anywhere.
 */

export type NeedId = "fuel-supply" | "site-delivery" | "storage" | "dispensing" | "monitoring" | "ev";
export type NeedCategory = "supply" | "infrastructure" | "technology" | "ev";
export type ModelId = "supply" | "infrastructure" | "technology" | "integrated";

export type Need = {
  id: NeedId;
  label: string;
  category: NeedCategory;
  /** Quote form solution value this need pre-selects (service slug or "ev-charging"). */
  service: string;
  /** Optional product the quote form can pre-select. */
  product?: Product["slug"];
};

export const needs: Need[] = [
  { id: "fuel-supply", label: "Fuel supply", category: "supply", service: "bulk-fuel-supply" },
  { id: "site-delivery", label: "Site delivery", category: "supply", service: "doorstep-diesel-delivery" },
  { id: "storage", label: "On-site storage", category: "infrastructure", service: "tank-fabrication-installation", product: "smart-diesel-storage-tanks" },
  { id: "dispensing", label: "Dispensing", category: "infrastructure", service: "fuel-management-solution", product: "fuel-dispensing-units" },
  { id: "monitoring", label: "Monitoring & reports", category: "technology", service: "fuel-monitoring-iot" },
  { id: "ev", label: "EV charging", category: "ev", service: "ev-charging" },
];

type Selection = { needs: Need[]; categories: Set<NeedCategory> };
type Rule = { model: ModelId; when: (s: Selection) => boolean; reason: string };

const only = (s: Selection, ...allowed: NeedCategory[]) => [...s.categories].every((c) => allowed.includes(c));

/** First matching rule wins. Keep the order: specific combinations before the single-category rules. */
export const rules: Rule[] = [
  { model: "integrated", when: (s) => s.categories.has("ev") && s.needs.length > 1, reason: "EV charging alongside fuel is best planned as one site, with one team." },
  {
    model: "integrated",
    when: (s) => s.needs.length >= 3 && s.categories.size >= 2,
    reason: "Your needs span several parts of the chain, so one partner for all of them keeps it simple.",
  },
  { model: "supply", when: (s) => only(s, "supply"), reason: "You need fuel brought to you; the Supply Model covers procurement and delivery." },
  { model: "technology", when: (s) => only(s, "technology"), reason: "You already have fuel and storage; the Technology Model adds monitoring and reports." },
  {
    model: "infrastructure",
    when: (s) => only(s, "infrastructure", "technology"),
    reason: "You need equipment on site; the Infrastructure Model covers tanks, dispensing and monitoring.",
  },
  { model: "infrastructure", when: (s) => only(s, "ev"), reason: "EV chargers are site infrastructure: surveyed, installed, commissioned and maintained." },
  { model: "integrated", when: () => true, reason: "You need fuel and on-site equipment together, which the Integrated Model brings under one partner." },
];

export type Recommendation = { model: ModelId; reason: string; href: string };

/** null = nothing selected (show the neutral prompt). */
export function recommend(selectedIds: NeedId[]): Recommendation | null {
  const selected = needs.filter((need) => selectedIds.includes(need.id));
  if (selected.length === 0) return null;
  const selection: Selection = { needs: selected, categories: new Set(selected.map((need) => need.category)) };
  const rule = rules.find((r) => r.when(selection)) ?? rules[rules.length - 1];
  const services = [...new Set([...selected.map((need) => need.service), ...(rule.model === "integrated" ? ["end-to-end"] : [])])];
  const product = selected.find((need) => need.product)?.product;
  return { model: rule.model, reason: rule.reason, href: quoteHref({ service: services.join(","), product }) };
}
