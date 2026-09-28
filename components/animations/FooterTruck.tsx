"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOOTER_TRUCK, MQ } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Wheel centres in SVG user units (viewBox 0 0 260 110). */
const WHEELS = [
  { cx: 50, cy: 88 },
  { cx: 82, cy: 88 },
  { cx: 212, cy: 88 },
];
const WHEEL_R = 13;
/** Road centre-line dash: width + gap in px. The dash strip loops by exactly one period. */
const DASH_W = 28;
const DASH_GAP = 36;
const DASH_COUNT = 64;

/**
 * Decorative fuel bowser that drives across the footer background, left → right, on a loop.
 * - Inline SVG, flat shapes, theme tokens only; no text, logo or phone number on the truck.
 * - GSAP: truck travel, wheel spin, 1–2px body bounce, road dashes scrolling the opposite way.
 * - Plays only while the footer is in view; everything pauses offscreen.
 * - Reduced motion (or no JS): truck parked near the left, nothing moves.
 * Sits behind footer content: aria-hidden, pointer-events none, clipped, low opacity via --truck-opacity.
 */
export default function FooterTruck() {
  const rootRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const truck = truckRef.current;
    if (!root || !truck || window.matchMedia(MQ.reduced).matches) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ mobile: MQ.mobile, desktop: MQ.desktop }, (context) => {
        const crossing = context.conditions?.mobile ? FOOTER_TRUCK.crossingSecondsMobile : FOOTER_TRUCK.crossingSecondsDesktop;

        // Drive from fully off-screen left to fully off-screen right.
        gsap.set(truck, { left: 0 });
        const drive = gsap.fromTo(
          truck,
          { x: () => -truck.offsetWidth },
          { x: () => root.offsetWidth, duration: crossing, ease: "none", repeat: -1, paused: true },
        );
        const wheels = gsap.utils.toArray<SVGGElement>("[data-wheel]", root).map((wheel, i) =>
          gsap.to(wheel, {
            rotation: 360,
            svgOrigin: `${WHEELS[i].cx} ${WHEELS[i].cy}`,
            duration: FOOTER_TRUCK.wheelTurnSeconds,
            ease: "none",
            repeat: -1,
            paused: true,
          }),
        );
        const bounce = gsap.to(bodyRef.current, {
          y: -FOOTER_TRUCK.bouncePx,
          duration: FOOTER_TRUCK.bounceSeconds,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
        });
        // Road dashes move opposite to the truck (right → left) so it reads as driving.
        const road = gsap.to(roadRef.current, {
          x: -(DASH_W + DASH_GAP),
          duration: FOOTER_TRUCK.roadDashSeconds,
          ease: "none",
          repeat: -1,
          paused: true,
        });

        const all = [drive, bounce, road, ...wheels];
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => all.forEach((tween) => (self.isActive ? tween.play() : tween.pause())),
          // Re-measure the crossing distance after resizes (function-based x values re-run on invalidate).
          onRefresh: () => drive.invalidate(),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 bottom-20 -z-10 overflow-hidden lg:bottom-0"
      style={{ opacity: "var(--truck-opacity)" }}
    >
      {/* Road */}
      <div className="absolute inset-x-0 bottom-3 h-px bg-foreground/40" />
      <div className="absolute inset-x-0 bottom-[5px] overflow-hidden">
        <div ref={roadRef} className="flex w-max" style={{ gap: DASH_GAP }}>
          {Array.from({ length: DASH_COUNT }, (_, i) => (
            <span key={i} className="block h-0.5 shrink-0 bg-foreground/60" style={{ width: DASH_W }} />
          ))}
        </div>
      </div>

      {/* Truck — parked near the left until GSAP takes over (also the reduced-motion / no-JS state). */}
      <div ref={truckRef} className="absolute bottom-3 w-[150px] sm:w-[220px] lg:w-[260px]" style={{ left: `${FOOTER_TRUCK.parkedAt * 100}%` }}>
        <svg viewBox="0 0 260 110" className="block h-auto w-full" fill="none">
          <g ref={bodyRef}>
            {/* Exhaust stack */}
            <rect x="168" y="14" width="4" height="62" rx="1" fill="var(--text-muted)" />
            {/* Tank */}
            <rect x="12" y="24" width="152" height="50" rx="22" fill="var(--text-muted)" />
            {/* Accent stripe on the tank */}
            <rect x="12" y="45" width="152" height="7" fill="var(--accent)" />
            {/* Manhole domes */}
            <rect x="46" y="17" width="20" height="9" rx="2" fill="var(--text-muted)" />
            <rect x="104" y="17" width="20" height="9" rx="2" fill="var(--text-muted)" />
            {/* Rear ladder */}
            <rect x="4" y="34" width="3" height="40" rx="1" fill="var(--text-muted)" />
            {/* Chassis */}
            <rect x="6" y="74" width="240" height="8" rx="2" fill="var(--text-muted)" />
            {/* Cab, facing right */}
            <path d="M176 76V34a6 6 0 0 1 6-6h34a8 8 0 0 1 6.4 3.2L246 60v16Z" fill="var(--text-muted)" />
            {/* Cab window */}
            <path d="M186 36h29l17 22h-46Z" fill="var(--primary)" />
            {/* Bumper */}
            <rect x="240" y="68" width="12" height="10" rx="2" fill="var(--text-muted)" />
          </g>

          {/* Wheels (rotate around their own centre) */}
          {WHEELS.map(({ cx, cy }) => (
            <g key={cx} data-wheel>
              <circle cx={cx} cy={cy} r={WHEEL_R} fill="var(--text-muted)" />
              <circle cx={cx} cy={cy} r={WHEEL_R - 5} fill="var(--bg-elevated)" />
              <rect x={cx - 1} y={cy - WHEEL_R + 5} width="2" height={(WHEEL_R - 5) * 2} fill="var(--text-muted)" />
              <rect x={cx - WHEEL_R + 5} y={cy - 1} width={(WHEEL_R - 5) * 2} height="2" fill="var(--text-muted)" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
