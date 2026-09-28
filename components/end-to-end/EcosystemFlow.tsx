"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ECOSYSTEM, MQ } from "@/lib/motion";
import { endToEnd } from "@/content/end-to-end";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const { nodes } = endToEnd.flow;
const LAST = nodes.length - 1;

/**
 * Ecosystem flow (PRD §8.8) — same pattern as Home's Our Approach, without the pin: the blue → green → lime line
 * (allowed flow gradient) fills as you scroll and each node activates when the line reaches it. Horizontal row of 7
 * from lg, vertical stepper below. Every node is a real link (number, title, one line, "Learn more").
 * SSR / no-JS / reduced motion: final state (line full, all nodes active); GSAP only rewinds it when motion is allowed.
 */
export default function EcosystemFlow({ index }: { index: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reachedRef = useRef(LAST);
  const [reached, setReached] = useState(LAST);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia(MQ.reduced).matches) return;

    const update = (progress: number) => {
      const next = Math.min(LAST, Math.floor(progress * LAST + 0.001));
      if (next !== reachedRef.current) {
        reachedRef.current = next;
        setReached(next);
      }
    };

    const ctx = gsap.context(() => {
      gsap.matchMedia().add({ wide: "(min-width: 1024px)", narrow: "(max-width: 1023px)" }, (context) => {
        const wide = Boolean(context.conditions?.wide);
        const tween = gsap.fromTo(
          "[data-eco='fill']",
          wide ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(wide ? { scaleX: 1 } : { scaleY: 1 }),
            ease: "none",
            scrollTrigger: {
              trigger: "[data-eco='list']",
              start: ECOSYSTEM.start,
              end: ECOSYSTEM.end,
              scrub: ECOSYSTEM.scrub,
              onUpdate: (self) => update(self.progress),
            },
          },
        );
        // Nodes start in the final (no-JS) state; sync them to the line straight away, before any scroll.
        update(tween.scrollTrigger?.progress ?? 0);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const { eyebrow, title, description, learnMore } = endToEnd.flow;

  return (
    <section ref={sectionRef} aria-labelledby="eco-title" className="section-y overflow-x-clip border-y border-border bg-elevated">
      <div className="container-x">
        <SectionHeading id="eco-title" index={index} eyebrow={eyebrow} title={title} description={description} layout="split" />

        <div data-eco="list" className="relative mt-14">
          {/* Track: left rail below lg, first → last dot above. */}
          <div aria-hidden="true" className="absolute top-[7px] bottom-2 left-[7px] w-0.5 bg-border-strong lg:right-[calc(100%/7-8px)] lg:bottom-auto lg:h-0.5 lg:w-auto">
            <div data-eco="fill" className="bg-flow-y lg:bg-flow-x absolute inset-0 origin-top lg:origin-left" />
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-7 lg:gap-0">
            {nodes.map((node, i) => {
              const active = i <= reached;
              return (
                <li key={node.title} className="pl-10 lg:pl-0">
                  <Link href={node.href} className="hv-group group relative block h-full lg:pr-4">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-0 -left-10 block size-[15px] rounded-full border transition-colors duration-300 lg:static lg:mb-7",
                        active ? "border-accent bg-accent" : "border-border-strong bg-background",
                      )}
                    />
                    <span className={cn("block transition-opacity duration-500", active ? "opacity-100" : "opacity-55")}>
                      <span className="label-caps flex items-center gap-2 text-muted-foreground">
                        <span className={active ? "text-link" : undefined}>{String(i + 1).padStart(2, "0")}</span>
                        <Icon name={node.icon} className="hv-icon size-4 text-accent" />
                      </span>
                      <span className="hv-accent mt-3 block font-heading text-lg leading-snug font-bold text-heading">{node.title}</span>
                      <span className="mt-2 block text-[0.9375rem] leading-snug text-muted-foreground">{node.line}</span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                        {learnMore}
                        <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
