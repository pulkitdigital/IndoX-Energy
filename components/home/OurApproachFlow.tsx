"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { APPROACH, EASE_OUT, MQ } from "@/lib/motion";
import { approachIntro, approachSteps } from "@/content/home";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import ApproachStepDetails from "@/components/home/ApproachStepDetails";

gsap.registerPlugin(ScrollTrigger);

const LAST = approachSteps.length - 1;

/** Fuel-drop marker that rides the line. */
function DropMarker() {
  return (
    <svg viewBox="0 0 20 26" className="h-6.5 w-5" aria-hidden="true">
      <path d="M10 1C10 1 2 10.6 2 16.2A8 8 0 0 0 18 16.2C18 10.6 10 1 10 1Z" fill="var(--accent)" stroke="var(--bg)" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Our Approach — scroll-scrubbed 6-step flow (GSAP + ScrollTrigger).
 * The blue → green → lime line fills (allowed gradient #1), a fuel-drop marker travels along it, and each step
 * activates as the marker reaches it: its outline numeral fills and its title brightens (opacity only).
 * Desktop: horizontal, section pinned while the line fills. Mobile: vertical stepper, no pin.
 * Reduced motion: final state, no scrub, no pin. Hover / focus / tap highlights a step (numeral fills, title
 * brightens, its first detail fades in, the other steps dim via hv-dim-siblings) and shows its detail panel.
 */
export default function OurApproachFlow() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const reachedRef = useRef(-1);
  const [reached, setReached] = useState(-1);
  const [selected, setSelected] = useState<number | null>(null);

  const active = selected ?? Math.max(reached, 0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia(MQ.reduced).matches) {
      setReached(LAST);
      return;
    }

    const updateReached = (progress: number) => {
      const next = Math.min(LAST, Math.floor(progress * LAST + 0.001));
      if (next !== reachedRef.current) {
        reachedRef.current = next;
        setReached(next);
      }
    };

    const ctx = gsap.context(() => {
      const track = section.querySelector<HTMLElement>("[data-flow='track']");
      if (!track) return;

      gsap.matchMedia().add({ desktop: MQ.desktop, mobile: MQ.mobile }, (context) => {
        const desktop = Boolean(context.conditions?.desktop);
        const tl = gsap.timeline({
          scrollTrigger: desktop
            ? { trigger: "[data-flow='pin']", start: "top 12%", end: "+=85%", pin: true, scrub: APPROACH.scrub }
            : { trigger: "[data-flow='list']", start: "top 70%", end: "bottom 60%", scrub: APPROACH.scrub },
          onUpdate() {
            updateReached(this.progress());
          },
        });
        tl.fromTo("[data-flow='fill']", desktop ? { scaleX: 0 } : { scaleY: 0 }, { ...(desktop ? { scaleX: 1 } : { scaleY: 1 }), ease: "none" }, 0).fromTo(
          "[data-flow='marker']",
          desktop ? { x: 0 } : { y: 0 },
          desktop ? { x: () => track.offsetWidth, ease: "none" } : { y: () => track.offsetHeight, ease: "none" },
          0,
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="approach-title" className="section-y overflow-x-clip">
      <div className="container-x">
        <SectionHeading id="approach-title" {...approachIntro} layout="split" />

        <div data-flow="pin" className="mt-14 md:bg-background md:py-10 lg:mt-16">
          <div data-flow="list" className="relative">
            {/* Track: vertical on mobile (left edge), horizontal on desktop (first dot → last dot). */}
            <div
              data-flow="track"
              aria-hidden="true"
              className="absolute top-[7px] bottom-2 left-[7px] w-0.5 bg-border-strong md:right-[calc(100%/6-8px)] md:bottom-auto md:h-0.5 md:w-auto"
            >
              <div data-flow="fill" className="bg-flow-y md:bg-flow-x absolute inset-0 origin-top md:origin-left" />
              {/* Offsets are margins so GSAP owns the transform. */}
              <div data-flow="marker" className="absolute top-0 left-0 -mt-3.5 -ml-2.5 md:-mt-5">
                <DropMarker />
              </div>
            </div>

            <ol className="hv-dim-siblings relative grid gap-10 md:grid-cols-6 md:gap-0">
              {approachSteps.map((step, i) => {
                const isReached = i <= reached;
                const isActive = i === active;
                const numeral = String(i + 1).padStart(2, "0");
                return (
                  <li key={step.id} className="pl-10 md:pl-0">
                    <button
                      type="button"
                      onClick={() => setSelected(i === selected ? null : i)}
                      onMouseEnter={() => setSelected(i)}
                      onMouseLeave={() => setSelected(null)}
                      onFocus={() => setSelected(i)}
                      aria-pressed={isActive}
                      aria-controls="approach-detail"
                      className="group relative block w-full text-left md:pr-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute top-0 -left-10 block size-[15px] rounded-full border bg-background transition-colors duration-300 md:static md:mb-9",
                          isReached ? "border-accent bg-accent" : "border-border-strong",
                        )}
                      />

                      {/* Large numeral: outline layer + filled layer cross-fade when reached */}
                      <span aria-hidden="true" className="grid font-heading text-5xl leading-none font-extrabold tracking-tight lg:text-6xl">
                        <span className="col-start-1 row-start-1 text-transparent [-webkit-text-stroke:1px_var(--border-strong)]">{numeral}</span>
                        <span
                          className={cn(
                            "col-start-1 row-start-1 transition-opacity duration-500",
                            isActive ? "text-link" : "text-foreground",
                            isReached ? "opacity-100" : "opacity-0",
                          )}
                        >
                          {numeral}
                        </span>
                      </span>

                      <span className={cn("mt-5 flex items-center gap-2 transition-opacity duration-500", isReached || isActive ? "opacity-100" : "opacity-55")}>
                        <Icon name={step.icon} className={cn("size-4.5 transition-colors", isActive ? "text-accent" : "text-muted-foreground")} />
                        <span className="font-heading text-lg font-bold lg:text-xl">{step.title}</span>
                      </span>
                      <span className={cn("mt-2 block text-sm leading-snug text-muted-foreground transition-opacity duration-500", isReached || isActive ? "opacity-100" : "opacity-60")}>
                        {step.line}
                      </span>
                      {/* Hover / focus / tap: the step's first detail fades in (space reserved, so nothing shifts). */}
                      <span
                        className={cn(
                          "mt-3 hidden text-[0.8125rem] leading-snug text-foreground transition-opacity duration-200 md:block",
                          selected === i ? "opacity-100" : "opacity-0",
                        )}
                      >
                        {step.details[0]}
                      </span>
                    </button>

                    {/* Mobile: detail opens in place only when a step is tapped (never while scrubbing). */}
                    <AnimatePresence initial={false} onExitComplete={() => ScrollTrigger.refresh()}>
                      {selected === i ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT }}
                          onAnimationComplete={() => ScrollTrigger.refresh()}
                          className="pt-5 md:hidden"
                        >
                          <ApproachStepDetails step={step} index={i} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Desktop: shared detail panel for the active step */}
          <div id="approach-detail" className="mt-12 hidden min-h-56 border-t border-border pt-10 md:block" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={approachSteps[active].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : APPROACH.stepFade / 2 }}
              >
                <ApproachStepDetails step={approachSteps[active]} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
