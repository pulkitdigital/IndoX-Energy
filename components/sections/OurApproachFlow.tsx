"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Droplet } from "lucide-react";
import { cn } from "@/lib/utils";
import { APPROACH, EASE_OUT, MQ } from "@/lib/motion";
import { approachIntro, approachSteps } from "@/content/home";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import ApproachStepDetails from "@/components/sections/ApproachStepDetails";

gsap.registerPlugin(ScrollTrigger);

const LAST = approachSteps.length - 1;

/**
 * Scroll-scrubbed 6-step flow (GSAP). As the user scrolls, the blue → green → lime line fills (allowed gradient #1),
 * a fuel-drop marker travels along it, and each step activates when reached: its outline numeral fills and its
 * title brightens (opacity cross-fades only). Hover / click / focus selects a step and shows its detail.
 * Desktop: horizontal, left-aligned columns. Mobile: vertical. Reduced motion: final state, no scrub.
 */
export default function OurApproachFlow() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const reachedRef = useRef(-1);
  const [reached, setReached] = useState(-1);
  const [selected, setSelected] = useState<number | null>(null);

  const active = selected ?? Math.max(reached, 0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia(MQ.reduced).matches) {
      setReached(LAST);
      return;
    }

    const updateReached = (progress: number) => {
      const next = Math.min(LAST, Math.floor(progress * LAST + 0.02));
      if (next !== reachedRef.current) {
        reachedRef.current = next;
        setReached(next);
      }
    };

    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>("[data-flow='track']");
      if (!track) return;
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (context) => {
        const desktop = Boolean(context.conditions?.desktop);
        const scrollTrigger = {
          trigger: "[data-flow='list']",
          start: desktop ? "top 75%" : "top 70%",
          end: desktop ? "bottom 55%" : "bottom 65%",
          scrub: APPROACH.scrub,
        };

        const tl = gsap.timeline({
          scrollTrigger,
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
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby="approach-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading id="approach-title" {...approachIntro} layout="split" />

        <div ref={rootRef} className="mt-16 lg:mt-20">
          <div data-flow="list" className="relative">
            {/* Track: vertical on mobile (left edge), horizontal on desktop (from first to last dot). */}
            <div
              data-flow="track"
              aria-hidden="true"
              className="absolute top-[7px] bottom-0 left-[7px] w-0.5 bg-border md:right-[calc(100%/6-8px)] md:bottom-auto md:h-0.5 md:w-auto"
            >
              {/* Allowed gradient #1 (CLAUDE.md theme rules): blue → green → lime */}
              <div data-flow="fill" className="absolute inset-0 origin-top bg-flow-y md:origin-left md:bg-flow-x" />
              {/* Fuel-drop marker rides the line. Offsets use margins so GSAP owns the transform. */}
              <div
                data-flow="marker"
                className="absolute top-0 left-0 -mt-3.5 -ml-3.5 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-card"
              >
                <Droplet className="size-3.5" aria-hidden="true" />
              </div>
            </div>

            <ol className="relative grid gap-10 md:grid-cols-6 md:gap-0">
              {approachSteps.map((step, i) => {
                const isReached = i <= reached;
                const isActive = i === active;
                const numeral = String(i + 1).padStart(2, "0");
                return (
                  <li key={step.id} className="pl-10 md:pl-0">
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      onMouseEnter={() => setSelected(i)}
                      onFocus={() => setSelected(i)}
                      aria-pressed={isActive}
                      className="group relative block w-full text-left md:pr-6"
                    >
                      {/* Dot on the line */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute top-0 -left-10 block size-4 rounded-full border-2 bg-background transition-colors duration-300 md:static md:mb-8",
                          isReached ? "border-accent" : "border-border-strong",
                        )}
                      />

                      {/* Oversized numeral: outline layer + filled layer cross-fade on reach */}
                      <span aria-hidden="true" className="grid font-heading text-6xl leading-none font-extrabold lg:text-7xl">
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

                      <span className={cn("mt-5 flex items-center gap-2 transition-opacity duration-500", isReached || isActive ? "opacity-100" : "opacity-60")}>
                        <Icon name={step.icon} className={cn("size-4.5", isActive ? "text-accent" : "text-muted-foreground")} />
                        <span className="font-heading text-xl font-bold">{step.title}</span>
                      </span>
                      <span className="mt-2 block text-sm leading-snug text-muted-foreground">{step.line}</span>
                      <span
                        aria-hidden="true"
                        className={cn("mt-4 block h-0.5 w-8 origin-left bg-accent transition-transform duration-300", isActive ? "scale-x-100" : "scale-x-0")}
                      />
                    </button>

                    {/* Mobile: detail expands in place under the active step */}
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE_OUT }}
                          className="overflow-hidden md:hidden"
                        >
                          <div className="pt-5">
                            <ApproachStepDetails step={step} index={i} />
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Desktop: shared detail panel */}
          <div className="relative mt-14 hidden min-h-40 border-t border-border pt-10 md:block" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={approachSteps[active].id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
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
