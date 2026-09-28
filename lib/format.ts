/** "2026-09-24" → "24 Sept 2026" (en-IN, UTC so build and browser agree). */
export const formatPostDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
