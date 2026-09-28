/**
 * Every animation speed, distance and easing lives here. Tune the feel of the site from this file only.
 * Durations are in seconds, distances in px unless noted.
 *
 * Ownership (never both on the same element):
 *   GSAP + ScrollTrigger → hero timeline, Our Approach flow, marquee, footer truck, image parallax, pinned/scrubbed pieces
 *   motion (motion/react) → section reveals, hovers, card lift/tilt, magnetic button, mega menu, small state changes
 */

/** Shared "expo-ish out" curve for motion. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** GSAP equivalents. */
export const GSAP_EASE = { out: "expo.out", inOut: "power2.inOut", linear: "none" } as const;

/** Media queries used to gate motion tiers. */
export const MQ = {
  reduced: "(prefers-reduced-motion: reduce)",
  motionOk: "(prefers-reduced-motion: no-preference)",
  /** Desktop extras: magnetic buttons, card tilt, parallax. */
  desktopFine: "(min-width: 1024px) and (pointer: fine)",
  desktop: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
} as const;

export const REVEAL = {
  /** ScrollReveal fade + rise. */
  duration: 0.7,
  y: 24,
  /** Stagger step for grid items. */
  stagger: 0.06,
  /** Heading accent underline draw-in. */
  underlineDuration: 0.6,
  underlineDelay: 0.2,
  /** Image wipe, left → right (a transform-only cover panel). */
  imageWipeDuration: 0.9,
} as const;

export const HERO = {
  /** Simple fade-up on load: text items stagger, image follows. Text is readable in under 1.2s. */
  fadeDuration: 0.6,
  /** Distance (px) each item rises while fading in. */
  fadeY: 16,
  stagger: 0.08,
  /** When the image starts fading up (s). */
  imageDelay: 0.2,

  /** Background grid: cell size (px) and every-Nth stronger line. Written onto the grid as --hero-cell / --hero-major. */
  gridCell: 60,
  gridMajorEvery: 4,
  /** Grid draw-in: minor lines grow (vertical scaleY, then horizontal scaleX), stronger lines fade in. All done < 1s. */
  gridDrawDuration: 0.8,
  gridStagger: 0.1,
  gridMajorDelay: 0.35,
  gridMajorDuration: 0.5,

  /** Eyebrow chevrons: 4 sweep left → right and fade (≈1.5s total), then one static chevron settles in. */
  chevronStart: 0.3,
  chevronStagger: 0.1,
  chevronFromX: -8,
  chevronToX: 28,
  chevronDuration: 0.9,
  chevronSettleAt: 1.2,
  chevronSettleDuration: 0.3,

  /** Flow lines: two thin arrows run along grid rows after the headline reveal, stop short of the image, fade. */
  flowStart: 0.8,
  flowDuration: 1.1,
  flowStagger: 0.25,
  flowFade: 0.25,
  /** Gap (px) left between an arrow tip and the image. */
  flowGap: 16,
  /** Where the two rows sit, as fractions of the image height (then snapped to the nearest grid line). */
  flowRows: [0.3, 0.7],

  /** Scroll cue: fades in, then bobs slowly (yoyo) while the hero is on screen. */
  cueDelay: 1,
  cueBob: 6,
  cueBobDuration: 1.2,
} as const;

/** Service pages — How it works strip: each step's accent line draws in order (scaleX from 640px up, scaleY below). No pinning. */
export const PROCESS = {
  lineDuration: 0.6,
  stagger: 0.18,
  /** ScrollTrigger start for the one-shot draw. */
  start: "top 80%",
} as const;

export const APPROACH = {
  /** ScrollTrigger scrub smoothing (seconds of lag). */
  scrub: 0.6,
  /** Step state cross-fade. */
  stepFade: 0.4,
} as const;

/** End-to-End ecosystem flow: the line scrubs with scroll (no pin) and nodes activate as it reaches them. */
export const ECOSYSTEM = {
  scrub: 0.6,
  start: "top 75%",
  end: "bottom 55%",
} as const;

export const PARALLAX = {
  /** Image drift inside its frame: ±this % of the box while it crosses the viewport. */
  imageYPercent: 6,
} as const;

export const HOVER = {
  cardLift: -4,
  /** Max product-card tilt in degrees (desktop fine pointer only). */
  tiltMaxDeg: 4,
  tiltSpring: { stiffness: 200, damping: 20 },
  liftSpring: { type: "spring", stiffness: 320, damping: 26 },
  /** Magnetic button pull: fraction of the cursor offset applied to the button. */
  magnetStrength: 0.22,
  magnetSpring: { stiffness: 220, damping: 18, mass: 0.4 },
  /** Image zoom on hover (CSS scale). */
  imageZoom: 1.05,
} as const;

/**
 * Shared hover system (app/globals.css → "Hover system"). These values are written onto <html> as CSS custom
 * properties by app/layout.tsx, so the CSS hover classes read them from here. 150–250ms, ease-out.
 */
export const HOVER_CSS = {
  durationMs: 200,
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  /** Card lift (px, negative = up). */
  cardLiftPx: -4,
  /** Button / chip lift (px). */
  smallLiftPx: -1,
  /** Image zoom inside a hovered card. */
  imageZoom: 1.05,
  /** Arrow nudge inside buttons / links (px). */
  arrowNudgePx: 4,
  /** Icon nudge inside a hovered parent (px) and rotation (deg). */
  iconNudgePx: 2,
  iconRotateDeg: 6,
  /** Theme toggle icon rotation (deg). */
  toggleRotateDeg: 30,
  /** WhatsApp float scale. */
  floatScale: 1.06,
  /** Steps / nodes that are NOT hovered dim to this opacity. */
  dimOpacity: 0.5,
} as const;

export const hoverCssVars = {
  "--hv-dur": `${HOVER_CSS.durationMs}ms`,
  "--hv-ease": HOVER_CSS.ease,
  "--hv-lift": `${HOVER_CSS.cardLiftPx}px`,
  "--hv-lift-sm": `${HOVER_CSS.smallLiftPx}px`,
  "--hv-zoom": String(HOVER_CSS.imageZoom),
  "--hv-arrow": `${HOVER_CSS.arrowNudgePx}px`,
  "--hv-nudge": `${HOVER_CSS.iconNudgePx}px`,
  "--hv-rotate": `${HOVER_CSS.iconRotateDeg}deg`,
  "--hv-toggle-rotate": `${HOVER_CSS.toggleRotateDeg}deg`,
  "--hv-float-scale": String(HOVER_CSS.floatScale),
  "--hv-dim": String(HOVER_CSS.dimOpacity),
} as const;

/** Custom cursor ring (desktop fine pointer only; off under reduced motion). Sizes in px. */
export const CURSOR = {
  size: 10,
  linkSize: 32,
  viewSize: 56,
  spring: { stiffness: 500, damping: 40, mass: 0.35 },
} as const;

export const MENU = {
  /** Mega menu: fade + scale from 0.98. */
  duration: 0.15,
  fromScale: 0.98,
  /** Mobile nav fade and item stagger. */
  mobileFade: 0.25,
  mobileStagger: 0.04,
  /** Hover-intent close delay (ms). */
  closeDelayMs: 140,
} as const;

export const MARQUEE = {
  /** Seconds for one full loop of the content. Higher = slower. */
  loopSeconds: 40,
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
