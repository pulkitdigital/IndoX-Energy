import { Archivo, JetBrains_Mono, Manrope } from "next/font/google";
// Alternatives to try — import one and assign it to `headingFont` below:
// import { Bricolage_Grotesque, Big_Shoulders_Display } from "next/font/google";

/*
 * Fonts. Every font exposes a fixed CSS variable, consumed in app/globals.css:
 *   --font-display  → headings   (font-heading)
 *   --font-body     → body copy  (font-sans)
 *   --font-label    → eyebrows / spec labels (font-mono)
 *
 * TO SWAP THE HEADING FONT: change the one `headingFont` line below. Nothing else needs to change.
 *   export const headingFont = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700", "800"], display: "swap" });
 *   export const headingFont = Big_Shoulders_Display({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700", "800"], display: "swap" });
 */
export const headingFont = Archivo({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700", "800"], display: "swap" });

export const bodyFont = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const labelFont = JetBrains_Mono({ subsets: ["latin"], variable: "--font-label", weight: ["500"], display: "swap" });
