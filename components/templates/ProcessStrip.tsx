"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MQ, PROCESS } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Step = { title: string; text: string };

/** Desktop columns per step count: short processes stay on one row, 6 → 3×2, 8 → 4×2. */
const LG_COLS: Record<number, string> = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-3", 8: "lg:grid-cols-4" };

/**
 * Numbered How it works strip (service pages). Each step has a hairline with an accent line on top; on scroll
 * the accent lines draw in step order (GSAP, one-shot, transform only, no pin). Horizontal lines from 640px,
 * a vertical rail below. Reduced motion / no JS: lines are simply fully drawn.
 */
export default function ProcessStrip({ steps, stepLabel, className }: { steps: Step[]; stepLabel: string; className?: string }) {
  const rootRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia(MQ.reduced).matches) return;

    const ctx = gsap.context(() => {
      const draw = (selector: string, axis: "scaleX" | "scaleY") =>
        gsap.fromTo(
          selector,
          { [axis]: 0 },
          { [axis]: 1, duration: PROCESS.lineDuration, stagger: PROCESS.stagger, ease: "none", scrollTrigger: { trigger: root, start: PROCESS.start, once: true } },
        );
      draw("[data-process-line='x']", "scaleX");
      draw("[data-process-line='y']", "scaleY");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <ol ref={rootRef} className={cn("grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12", LG_COLS[steps.length] ?? "lg:grid-cols-4", className)}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step.title} className={cn("relative pl-9 sm:pt-7 sm:pl-0", last ? "pb-0" : "pb-9 sm:pb-0")}>
            {/* Vertical rail (mobile) */}
            {last ? null : (
              <>
                <span aria-hidden="true" className="absolute top-3 bottom-0 left-[5px] w-px bg-border-strong sm:hidden" />
                <span aria-hidden="true" data-process-line="y" className="absolute top-3 bottom-0 left-[5px] w-px origin-top bg-accent sm:hidden" />
              </>
            )}
            {/* Horizontal line (sm+) */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-border-strong sm:block" />
            <span aria-hidden="true" data-process-line="x" className="absolute inset-x-0 top-0 hidden h-px origin-left bg-accent sm:block" />
            {/* Step marker */}
            <span aria-hidden="true" className="absolute top-1.5 left-0 size-[11px] rounded-xs border border-accent bg-background sm:-top-[5px]" />

            <p className="label-caps text-muted-foreground">
              {stepLabel} {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-lg">{step.title}</h3>
            <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-muted-foreground">{step.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
