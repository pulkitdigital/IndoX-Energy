"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
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

/**
 * Colour of the line at step i: blue → green → lime (allowed gradient #1). Each segment between two steps is a
 * gradient from its own start colour to the next one, so the whole line reads as one continuous blue → lime run.
 */
function stopColor(i: number): string {
  const t = i / (LAST + 1);
  return t <= 0.5
    ? `color-mix(in oklab, var(--flow-start) ${Math.round(100 - t * 200)}%, var(--color-brand-green))`
    : `color-mix(in oklab, var(--color-brand-green) ${Math.round(100 - (t - 0.5) * 200)}%, var(--color-brand-lime))`;
}

/**
 * Our Approach — vertical 6-step navigator (GSAP ScrollTrigger).
 * Left: a fixed-width column with the step dot on the connecting line and the large numeral. Right: icon, title and
 * one-line description. The line runs top to bottom through the dots and is drawn per segment: a segment fills
 * (downward) once its step has been passed, so the line reads as filled up to the ACTIVE step and neutral beyond it.
 * States: upcoming = outlined dot + outline numeral; current = solid ring, numeral scaled up with a soft ring that
 * pulses twice, brand-tinted row chip; passed = solid dot with a check. The active step changes with scroll
 * (ScrollTrigger progress → 6 equal segments) or on click; hover / focus / tap previews a step's detail panel.
 * Reduced motion: every step shown as reached, line fully filled, no pulse, no transitions.
 */
export default function OurApproachFlow() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const reachedRef = useRef(-1);
  const [reached, setReached] = useState(-1);
  const [selected, setSelected] = useState<number | null>(null);
  /** Step chosen by click; drives the line fill until scrolling reaches a different step. */
  const [picked, setPicked] = useState<number | null>(null);

  /** Step the line is filled up to. */
  const progress = picked ?? Math.max(reached, 0);
  /** Step whose detail is shown (hover / focus / tap preview wins over progress). */
  const active = selected ?? progress;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia(MQ.reduced).matches) {
      setReached(LAST);
      return;
    }

    const updateReached = (scrollProgress: number) => {
      // 6 equal scroll segments, one per step.
      const next = Math.min(LAST, Math.floor(scrollProgress * (LAST + 1)));
      if (next !== reachedRef.current) {
        reachedRef.current = next;
        setReached(next);
        setPicked(null);
      }
    };

    const ctx = gsap.context(() => {
      const onScroll = (self: ScrollTrigger) => updateReached(self.progress);
      ScrollTrigger.create({ trigger: "[data-flow='list']", start: "top 65%", end: "bottom 70%", onUpdate: onScroll, onRefresh: onScroll });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="approach-title" className="section-y overflow-x-clip">
      <div className="container-x">
        <SectionHeading id="approach-title" {...approachIntro} layout="split" />

        <div className="mt-12 lg:mt-14">
          <ol data-flow="list" className="relative max-w-5xl">
            {approachSteps.map((step, i) => {
              const isPassed = i < progress;
              const isCurrent = i === progress;
              const isActive = i === active;
              const numeral = String(i + 1).padStart(2, "0");
              return (
                <li key={step.id} className="relative pb-1.5">
                  {/* Line segment from this step's dot down to the next one. */}
                  {i < LAST ? (
                    <span aria-hidden="true" className="absolute top-[44px] left-6 h-full w-0.5 bg-border-strong">
                      <span
                        className="absolute inset-0 origin-top transition-transform duration-500 ease-out motion-reduce:transition-none"
                        style={{
                          backgroundImage: `linear-gradient(180deg, ${stopColor(i)}, ${stopColor(i + 1)})`,
                          transform: `scaleY(${isPassed ? 1 : 0})`,
                        }}
                      />
                    </span>
                  ) : null}

                  <button
                    type="button"
                    data-flow-row
                    onClick={() => {
                      setPicked(i);
                      setSelected(i === selected && i === picked ? null : i);
                    }}
                    onMouseEnter={() => setSelected(i)}
                    onMouseLeave={() => setSelected(null)}
                    onFocus={() => setSelected(i)}
                    onBlur={() => setSelected(null)}
                    aria-pressed={isActive}
                    aria-controls="approach-detail"
                    aria-current={isCurrent ? "step" : undefined}
                    className={cn(
                      "hv-row group relative grid w-full grid-cols-[18px_3.25rem_minmax(0,1fr)] items-start gap-x-3 rounded-md p-4 text-left md:grid-cols-[18px_4.75rem_minmax(0,1fr)] md:gap-x-5",
                      isCurrent && "bg-approach-chip",
                    )}
                  >
                    {/* Step dot on the line: passed = solid + check, current = solid ring, upcoming = outline. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative z-10 mt-[19px] grid size-[18px] place-items-center rounded-full border transition-[background-color,border-color] duration-300",
                        isPassed && "border-accent bg-accent text-accent-foreground",
                        isCurrent && "border-primary bg-primary ring-4 ring-primary/25",
                        !isPassed && !isCurrent && "border-border-strong bg-background",
                      )}
                    >
                      {isPassed ? <Check className="size-3" strokeWidth={3} /> : null}
                    </span>

                    {/* Numeral: fixed-width column; current = scaled up with a soft ring that pulses twice. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative grid h-14 origin-left font-heading text-[2.5rem] leading-[3.5rem] font-extrabold tracking-tight tabular-nums transition-transform duration-300 ease-out motion-reduce:transition-none md:text-[3.25rem]",
                        isCurrent && "scale-110",
                      )}
                    >
                      {isCurrent && !reduceMotion ? (
                        <span
                          className="approach-pulse pointer-events-none absolute -inset-x-1 inset-y-1 rounded-md border-2 border-link"
                          style={{ animationDuration: `${APPROACH.pulseSeconds}s`, animationIterationCount: APPROACH.pulseCount }}
                        />
                      ) : null}
                      <span className="col-start-1 row-start-1 text-transparent [-webkit-text-stroke:1px_var(--border-strong)]">{numeral}</span>
                      <span
                        className={cn(
                          "col-start-1 row-start-1 transition-[opacity,color] duration-300",
                          isCurrent || isActive ? "text-link" : "text-foreground group-hover:text-link group-focus-visible:text-link",
                          isPassed || isCurrent || isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                        )}
                      >
                        {numeral}
                      </span>
                    </span>

                    <span className="pt-[14px] md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:items-baseline md:gap-6">
                      <span className="flex items-center gap-2">
                        <Icon name={step.icon} className={cn("size-4.5 shrink-0 transition-colors", isActive ? "text-accent" : "text-muted-foreground")} />
                        <span
                          className={cn(
                            "font-heading text-lg font-bold transition-colors duration-300 lg:text-xl",
                            !(isPassed || isCurrent || isActive) && "text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground",
                          )}
                        >
                          {step.title}
                        </span>
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-muted-foreground md:mt-0 md:text-base">{step.line}</span>
                    </span>
                  </button>

                  {/* Mobile: detail opens in place only when a step is tapped (never while scrolling). */}
                  <AnimatePresence initial={false} onExitComplete={() => ScrollTrigger.refresh()}>
                    {selected === i ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT }}
                        onAnimationComplete={() => ScrollTrigger.refresh()}
                        className="px-4 pt-3 pb-4 md:hidden"
                      >
                        <ApproachStepDetails step={step} index={i} />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

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
