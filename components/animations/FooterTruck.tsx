"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOOTER_TRUCK, MQ } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** ---- Truck image config (edit these to match your PNGs) ---- */
const TRUCK_SRC = "/images/fuel-truck.png";
/** Real pixel size of the truck PNG (only used for the aspect ratio + Next/Image). */
const TRUCK_SIZE = { w: 1536, h: 512 };

/**
 * Option B: separate spinning wheels. Set to "/images/truck-wheel.png" when the truck PNG has NO wheels.
 * Keep it null when the truck PNG already has its wheels baked in (Option A: wheels stay still).
 */
const WHEEL_SRC: string | null = null;
/**
 * Wheel overlay positions, all in % of the truck image:
 *  - left: horizontal CENTRE of the wheel (% of truck width)
 *  - bottom: distance of the wheel's bottom edge from the truck image bottom (% of truck height)
 *  - size: wheel diameter (% of truck width)
 * These are starting values: nudge them until the wheels sit exactly in the arches.
 */
const WHEEL_SPOTS = [
  { left: 20, bottom: 0, size: 13 },
  { left: 30, bottom: 0, size: 13 },
  { left: 80, bottom: 0, size: 13 },
];

/** Road centre-line dash: width + gap in px. The dash strip loops by exactly one period. */
const DASH_W = 28;
const DASH_GAP = 36;
const DASH_COUNT = 64;

/**
 * Fuel bowser (real PNG image) driving across its own lane in the footer, left → right, on a loop.
 * - The truck PNG must face RIGHT, with a transparent background.
 * - GSAP: crossing, 1–2px body bounce, road dashes moving the other way, optional wheel spin (Option B).
 *   The contact shadow rides with the truck but does not bounce, so it stays grounded.
 * - Plays only while the lane is in view (ScrollTrigger toggle); everything pauses offscreen.
 * - Reduced motion (or no JS): truck parked near the left, nothing moves.
 */
export default function FooterTruck() {
  const rootRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
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

        // Wheels (only exist when WHEEL_SRC is set): plain HTML elements, so they rotate around their own centre.
        const wheels = gsap.utils.toArray<HTMLElement>("[data-wheel]", root).map((wheel) =>
          gsap.to(wheel, {
            rotation: 360,
            transformOrigin: "50% 50%",
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
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none relative h-32 overflow-hidden border-t border-border sm:h-36 lg:h-40">
      {/* Road */}
      <div className="absolute inset-x-0 bottom-[14px] h-px bg-foreground/40" />
      <div className="absolute inset-x-0 bottom-[11px] overflow-hidden">
        <div ref={roadRef} className="flex w-max" style={{ gap: DASH_GAP }}>
          {Array.from({ length: DASH_COUNT }, (_, i) => (
            <span key={i} className="block h-0.5 shrink-0 bg-foreground/60" style={{ width: DASH_W }} />
          ))}
        </div>
      </div>

      {/* Truck: parked near the left until GSAP takes over (also the reduced-motion / no-JS state). */}
      <div
        ref={truckRef}
        className="absolute bottom-[12px] w-[230px] sm:bottom-[10px] sm:w-[300px] lg:bottom-[10px] lg:w-[360px]"
        style={{ left: `${FOOTER_TRUCK.parkedAt * 100}%` }}
      >
        {/* Contact shadow (travels with the truck, does not bounce) */}
        <div className="absolute inset-x-[4%] -bottom-[3px] h-[10px] rounded-[50%] bg-foreground/20 blur-[3px]" />

        {/* Body: truck image (+ optional wheels). Bounces as one piece. */}
        <div ref={bodyRef} className="relative">
          <Image
            src={TRUCK_SRC}
            alt=""
            width={TRUCK_SIZE.w}
            height={TRUCK_SIZE.h}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 300px, 230px"
            draggable={false}
            className="block h-auto w-full select-none"
          />

          {WHEEL_SRC
            ? WHEEL_SPOTS.map((spot, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: `${spot.left}%`, bottom: `${spot.bottom}%`, width: `${spot.size}%`, transform: "translateX(-50%)" }}
                >
                  <div data-wheel className="aspect-square w-full">
                    <Image src={WHEEL_SRC} alt="" width={256} height={256} draggable={false} className="block h-full w-full select-none" />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}