/**
 * Every animation speed / distance / easing lives here. Tune the feel of the site from this file only.
 * Durations are in seconds, distances in px unless noted.
 */

/** Shared easing (matches Framer's [0.22, 1, 0.36, 1] "expo-ish out"). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const GSAP_EASE_OUT = "expo.out";

/** Media queries used to gate motion tiers. */
export const MQ = {
  reduced: "(prefers-reduced-motion: reduce)",
  /** Desktop extras: magnetic buttons, card tilt, parallax. */
  desktopFine: "(min-width: 1024px) and (pointer: fine)",
  desktop: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
} as const;

export const REVEAL = {
  /** ScrollReveal fade/slide duration and travel. */
  duration: 0.7,
  y: 24,
  /** Heading accent underline draw-in. */
  underlineDuration: 0.6,
  /** Image curtain wipe (left → right). */
  imageWipeDuration: 0.9,
} as const;

export const HERO = {
  lineDuration: 0.9,
  lineStagger: 0.12,
  fadeDuration: 0.6,
  imageDuration: 1.1,
  /** How far (px) the bowser image slides in from the right. */
  imageFromX: 80,
  /** Dashed route line draw-in. */
  routeDuration: 1.6,
  /** Scroll parallax on the hero image (yPercent travelled while the hero scrolls out). */
  imageParallaxYPercent: 12,
} as const;

export const APPROACH = {
  /** ScrollTrigger scrub smoothing (seconds of lag). */
  scrub: 0.6,
} as const;

export const PARALLAX = {
  /** Image parallax inside cards: image travels ±this % of its box while the card crosses the viewport. */
  imageYPercent: 6,
} as const;

export const HOVER = {
  cardLift: -4,
  /** Max product-card tilt in degrees (desktop fine pointer only). */
  tiltMaxDeg: 4,
  /** Magnetic button pull: fraction of the cursor offset applied to the button. */
  magnetStrength: 0.25,
  magnetSpring: { stiffness: 220, damping: 18, mass: 0.4 },
} as const;

export const MARQUEE = {
  /** Seconds for one full loop of the content. Higher = slower. */
  loopSeconds: 38,
} as const;

export const FOOTER_TRUCK = {
  /** Seconds for one full left → right crossing. */
  crossingSecondsDesktop: 20,
  crossingSecondsMobile: 14,
  /** Seconds per full wheel rotation. */
  wheelTurnSeconds: 0.9,
  /** Vertical bounce amplitude (px) and half-cycle duration. */
  bouncePx: 1.5,
  bounceSeconds: 0.35,
  /** Road centre-line dash scroll: seconds to move one dash period. */
  roadDashSeconds: 0.6,
  /** Where the parked truck sits under prefers-reduced-motion (fraction of footer width). */
  parkedAt: 0.06,
} as const;
