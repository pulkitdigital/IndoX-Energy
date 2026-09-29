import type { CSSProperties } from "react";

/**
 * Shared by every decorative layer in components/decor/. The layer sits behind the section content (-z-10, so the
 * section needs `relative isolate`), never takes pointer events, is clipped to its own box (no horizontal scroll)
 * and uses the theme-aware --decor-opacity (≈7% light, ≈9% dark) with solid brand ink (--decor-ink / --decor-accent).
 */
export const DECOR_BASE = "pointer-events-none absolute -z-10 overflow-hidden";

export const decorStyle: CSSProperties = { opacity: "var(--decor-opacity)" };

/** Which part of the section a layer covers. */
export type DecorSide = "full" | "left" | "right";

export const SIDE_CLASS: Record<DecorSide, string> = {
  full: "inset-0",
  left: "inset-y-0 left-0 w-full lg:w-1/2",
  right: "inset-y-0 right-0 w-full lg:w-1/2",
};

/** Mask that fades a layer out toward the opposite side (alpha only). */
export function fadeMask(side: DecorSide): CSSProperties {
  const dir = side === "left" ? "to right" : side === "right" ? "to left" : "to bottom";
  const mask = side === "full" ? "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)" : `linear-gradient(${dir}, #000 40%, transparent)`;
  return { maskImage: mask, WebkitMaskImage: mask };
}
