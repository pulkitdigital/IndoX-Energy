import type { CSSProperties } from "react";
import { Archivo, Inter } from "next/font/google";

/*
 * Typography — two families only, no presets:
 *   --font-heading → Archivo 700/800 for h1–h4 and display numerals; 600 only for the 11px label-caps (Tailwind: font-heading)
 *   --font-body    → Inter 400/500/600: body, descriptions, UI text                                     (Tailwind: font-sans)
 * No other fonts anywhere (no mono). Type scale lives in app/globals.css (text-display, text-section, label-caps).
 */
const archivo = Archivo({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

/** Registers both @font-face variables. Put on <html>. */
export const fontClassName = `${archivo.variable} ${inter.variable}`;

/** Maps the families onto the two semantic font variables (overrides the @theme fallbacks). Put on <html> as `style`. */
export const fontStyle = {
  "--font-heading": "var(--font-archivo), ui-sans-serif, sans-serif",
  "--font-body": "var(--font-inter), ui-sans-serif, sans-serif",
} as CSSProperties;
