/**
 * Pan-India coverage (PRD §8.1 section 10, §12 item 8).
 *
 * PLACEHOLDER — EMPTY until the client confirms which cities / states are active and which are expanding.
 * Do not add entries from guesswork. While this list is empty, CoverageCheck answers every query with
 * "Our team will confirm availability for your location" and the map shows no coverage regions.
 *
 * Example entry once confirmed:
 *   { city: "Pune", state: "Maharashtra", pinPrefixes: ["411", "412"], status: "active", lon: 73.86, lat: 18.52 }
 */
export type CoverageStatus = "active" | "expanding";

export type CoverageArea = {
  city: string;
  state: string;
  /** First 3–6 digits of PIN codes served in this area. */
  pinPrefixes: string[];
  status: CoverageStatus;
  /** Map position (degrees). */
  lon: number;
  lat: number;
};

export const coverage: CoverageArea[] = [];

export const coverageConfirmed = coverage.length > 0;

/** Case-insensitive city or PIN match. Returns null when there is no match (or no data yet). */
export function findCoverage(query: string): CoverageArea | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  if (/^\d{6}$/.test(q)) return coverage.find((area) => area.pinPrefixes.some((prefix) => q.startsWith(prefix))) ?? null;
  return coverage.find((area) => area.city.toLowerCase() === q) ?? null;
}
