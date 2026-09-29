"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AUTO_REVEAL, MQ, REVEAL } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Safety net for entrance animations. Every block directly inside a section's container that no <ScrollReveal>
 * covers (marked with data-reveal) fades and rises in, staggered per section, exactly like ScrollReveal does.
 * Skipped: the first (hero) section of a page, anything marked data-hero-item / data-no-reveal, blocks that already
 * contain a ScrollReveal, and blocks that run their own scroll animation (data-flow). Reduced motion: nothing.
 * Runs per route (re-created on pathname change). Inline transform / opacity are cleared once the reveal is done,
 * so sticky and fixed descendants (e.g. the article table of contents) are unaffected afterwards.
 */
export default function AutoReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia(MQ.reduced).matches) return;
    const main = document.getElementById("main");
    if (!main) return;

    const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > section, :scope > div > section")).slice(1);
    const ctx = gsap.context(() => {
      for (const section of sections) {
        const container = section.querySelector<HTMLElement>(":scope > .container-x") ?? section;
        const blocks = Array.from(container.children).filter((el): el is HTMLElement => {
          if (!(el instanceof HTMLElement)) return false;
          if (el.matches("[data-reveal], [data-hero-item], [data-no-reveal], script, style")) return false;
          if (el.querySelector("[data-reveal], [data-flow], [data-no-reveal]")) return false;
          return el.offsetHeight > 0;
        });
        if (!blocks.length) continue;
        gsap.set(blocks, { opacity: 0, y: REVEAL.y });
        ScrollTrigger.batch(blocks, {
          start: AUTO_REVEAL.start,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: REVEAL.duration,
              stagger: AUTO_REVEAL.stagger,
              ease: "power3.out",
              clearProps: "transform,opacity",
            }),
        });
      }
    }, main);

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
