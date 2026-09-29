"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MQ, PAGE_TRANSITION } from "@/lib/motion";
import { useLenis } from "@/components/animations/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger);

/** Gauge geometry in SVG user units (viewBox 0 0 200 124). Centre of the dial is (CX, CY). */
const CX = 100;
const CY = 100;
const R = 80; // arc radius
const NEEDLE_LEN = 68;
/** Needle holds here while the route loads; it snaps to 1 once the new route commits. */
const HOLD_PROGRESS = 0.85;

/** Ticks every 15° (0° = right end, 180° = left end); majors at 0/45/90/135/180. */
const TICKS = Array.from({ length: 13 }, (_, i) => {
  const angle = i * 15;
  const major = angle % 45 === 0;
  const outer = R - 8;
  const inner = outer - (major ? 12 : 6);
  const rad = (angle * Math.PI) / 180;
  return {
    angle,
    major,
    x1: CX + outer * Math.cos(rad),
    y1: CY - outer * Math.sin(rad),
    x2: CX + inner * Math.cos(rad),
    y2: CY - inner * Math.sin(rad),
  };
});

/** Semicircle from the left end to the right end (over the top). */
const ARC_PATH = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

/**
 * Route-change layer, mounted once in the root layout (inside SmoothScrollProvider).
 *  1. Scroll reset: on every pathname change the page opens at the top (native scroll AND Lenis' own virtual
 *     position). Links with a #hash keep their anchor instead.
 *  2. Transition: a click on an internal link wipes an overlay in from the LEFT. A speedometer-style gauge sits
 *     in the middle: the needle sweeps left → right and a green arc fills behind it while Next loads the route.
 *     When the new pathname commits, the needle finishes the sweep, the gauge fades and the overlay wipes away
 *     left → right to reveal the page (already at the top). Back / forward navigations get the same overlay.
 *  reduced motion: no gauge, one plain ~150ms fade in and out.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const coverRef = useRef<gsap.core.Timeline | null>(null);
  const failsafeRef = useRef<number | undefined>(undefined);
  const covered = useRef(false);
  const previous = useRef(pathname);
  /** Gauge progress 0..1, tweened by GSAP; draw() maps it to needle angle + arc fill. */
  const prog = useRef({ p: 0 });

  const reduced = () => window.matchMedia(MQ.reduced).matches;

  /** Apply the current progress to the needle rotation and the green arc. */
  const draw = () => {
    const p = prog.current.p;
    if (needleRef.current) gsap.set(needleRef.current, { rotation: p * 180, svgOrigin: `${CX} ${CY}` });
    if (arcRef.current) gsap.set(arcRef.current, { strokeDashoffset: 100 - p * 100 });
  };

  /** Show the overlay and start the gauge sweep. */
  const cover = () => {
    const overlay = overlayRef.current;
    const art = artRef.current;
    if (!overlay || !art || covered.current) return;
    covered.current = true;
    coverRef.current?.kill();
    gsap.killTweensOf([overlay, art, prog.current]);

    if (reduced()) {
      gsap.set(overlay, { autoAlpha: 0, scaleX: 1, transformOrigin: "0% 50%" });
      gsap.set(art, { autoAlpha: 0 });
      coverRef.current = gsap.timeline().to(overlay, { autoAlpha: 1, duration: PAGE_TRANSITION.reducedFade, ease: "none" });
    } else {
      prog.current.p = 0;
      draw();
      gsap.set(art, { autoAlpha: 1, scale: 1 });
      // overlay wipes in from the left edge
      gsap.set(overlay, { autoAlpha: 1, scaleX: 0, transformOrigin: "0% 50%" });
      coverRef.current = gsap.timeline().to(overlay, { scaleX: 1, duration: PAGE_TRANSITION.coverFade, ease: "power2.inOut" });
      // needle creeps left → right and slows down while we wait for the route
      gsap.to(prog.current, { p: HOLD_PROGRESS, duration: PAGE_TRANSITION.fill, ease: "power2.out", onUpdate: draw });
    }
    window.clearTimeout(failsafeRef.current);
    failsafeRef.current = window.setTimeout(reveal, PAGE_TRANSITION.failsafeMs);
  };

  /** Finish the gauge and wipe the overlay away (after the cover timeline has finished). */
  const reveal = () => {
    const overlay = overlayRef.current;
    const art = artRef.current;
    if (!overlay || !art || !covered.current) return;
    window.clearTimeout(failsafeRef.current);
    const exit = () => {
      coverRef.current = null;
      if (reduced()) {
        gsap.to(overlay, { autoAlpha: 0, duration: PAGE_TRANSITION.reducedFade, ease: "none", onComplete: () => void (covered.current = false) });
        return;
      }
      gsap.killTweensOf(prog.current);
      gsap
        .timeline({ onComplete: () => void (covered.current = false) })
        // needle finishes the sweep to the right end
        .to(prog.current, { p: 1, duration: 0.25, ease: "power2.out", onUpdate: draw }, 0)
        // gauge fades, then the overlay collapses toward the right edge (= reveal runs left → right)
        .to(art, { autoAlpha: 0, scale: 0.94, duration: PAGE_TRANSITION.exit * 0.6, ease: "power1.in" }, 0.28)
        .set(overlay, { transformOrigin: "100% 50%" }, 0.3)
        .to(overlay, { scaleX: 0, duration: PAGE_TRANSITION.exit, ease: "power2.inOut" }, 0.3)
        .set(overlay, { autoAlpha: 0 });
    };
    if (coverRef.current?.isActive()) coverRef.current.eventCallback("onComplete", exit);
    else exit();
  };

  // Internal link click → start covering right away. Next's Link has already called preventDefault by the time the
  // event bubbles to document, which is how a client-side navigation is told apart from a hash / external / new-tab click.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !event.defaultPrevented) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      cover();
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(failsafeRef.current);
    };
    // cover() only touches refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // New route committed → reset scroll first, then lift the overlay.
  useLayoutEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;

    const hash = window.location.hash;
    const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      const offset = -((document.querySelector("header")?.getBoundingClientRect().height ?? 0) + 16);
      if (lenis) lenis.scrollTo(target, { offset, immediate: true, force: true });
      else target.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      lenis?.scrollTo(0, { immediate: true, force: true });
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());

    if (!covered.current) cover(); // back / forward: no click preceded this
    reveal();
    // cover() / reveal() only touch refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div ref={overlayRef} aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-[90] grid place-items-center bg-background opacity-0">
      <div ref={artRef} className="w-64 sm:w-80">
        <svg viewBox="0 0 200 124" className="block h-auto w-full" fill="none">
          {/* Track: light semicircle */}
          <path d={ARC_PATH} strokeWidth="2.5" className="stroke-border-strong" style={{ opacity: 0.45 }} />

          {/* Ticks */}
          {TICKS.map((t) => (
            <line
              key={t.angle}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              strokeWidth={t.major ? 2.5 : 1.5}
              strokeLinecap="round"
              className="stroke-border-strong"
              style={{ opacity: t.major ? 0.6 : 0.35 }}
            />
          ))}

          {/* Progress arc: green, fills left → right via dash offset (pathLength normalised to 100) */}
          <path
            ref={arcRef}
            d={ARC_PATH}
            pathLength={100}
            strokeWidth="5"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{ stroke: "var(--color-brand-green)" }}
          />

          {/* Needle: drawn pointing left, rotated around the dial centre (0° → 180° = left → right) */}
          <g ref={needleRef}>
            <line x1={CX} y1={CY} x2={CX - NEEDLE_LEN} y2={CY} strokeWidth="3.5" strokeLinecap="round" style={{ stroke: "var(--color-brand-blue, #0b4fa3)" }} />
          </g>

          {/* Hub */}
          <circle cx={CX} cy={CY} r="8" strokeWidth="2.5" className="fill-background" style={{ stroke: "var(--color-brand-blue, #0b4fa3)" }} />
          <circle cx={CX} cy={CY} r="2.5" style={{ fill: "var(--color-brand-green)" }} />

          {/* Ground line */}
          <line x1="0" x2="200" y1="118" y2="118" strokeWidth="1.5" className="stroke-border" />
        </svg>
      </div>
    </div>
  );
}