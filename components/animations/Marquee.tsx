"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MARQUEE, MQ } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type MarqueeProps = {
  items: string[];
  /** Accessible summary of the strip (the moving copy is aria-hidden). */
  label: string;
  /** How many times the sequence repeats inside one half of the track (ensures it's wider than the viewport). */
  repeat?: number;
};

/**
 * Thin continuous text strip. The track holds two identical halves and slides -50% on a loop, so the
 * seam is invisible. GSAP tween: pauses on hover and whenever the strip is offscreen. Reduced motion → static.
 */
export default function Marquee({ items, label, repeat = 3 }: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !trackRef.current || window.matchMedia(MQ.reduced).matches) return;

    let hovered = false;
    let inView = false;
    const ctx = gsap.context(() => {
      const tween = gsap.to(trackRef.current, { xPercent: -50, ease: "none", duration: MARQUEE.loopSeconds, repeat: -1, paused: true });
      const sync = () => (inView && !hovered ? tween.play() : tween.pause());

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          inView = self.isActive;
          sync();
        },
      });

      const onEnter = () => {
        hovered = true;
        sync();
      };
      const onLeave = () => {
        hovered = false;
        sync();
      };
      root.addEventListener("pointerenter", onEnter);
      root.addEventListener("pointerleave", onLeave);
      return () => {
        root.removeEventListener("pointerenter", onEnter);
        root.removeEventListener("pointerleave", onLeave);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const sequence = Array.from({ length: repeat }, () => items).flat();
  const half = (
    <div className="flex shrink-0 items-center">
      {sequence.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="px-6 font-heading text-xl font-semibold tracking-tight whitespace-nowrap text-muted-foreground uppercase sm:px-8 sm:text-2xl">
            {item}
          </span>
          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} role="region" aria-label={label} className="overflow-hidden border-y border-border py-5 sm:py-6">
      <p className="sr-only">{items.join(", ")}</p>
      <div ref={trackRef} aria-hidden="true" className="flex w-max will-change-transform">
        {half}
        {half}
      </div>
    </div>
  );
}
