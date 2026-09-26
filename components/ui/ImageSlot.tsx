"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { EASE_OUT, MQ, PARALLAX, REVEAL } from "@/lib/motion";
import { images, type ImageSlotKey } from "@/content/images";

gsap.registerPlugin(ScrollTrigger);

type ImageSlotProps = {
  slot: ImageSlotKey;
  /** Classes for the outer box (positioning, sizing, rounding overrides). */
  className?: string;
  /** Extra classes for the <img> itself. */
  imgClassName?: string;
  /** Fill the nearest positioned parent instead of sizing by the slot's aspect ratio. */
  fill?: boolean;
  /** Above-the-fold image: load eagerly with high fetch priority (also skips the scroll wipe). */
  priority?: boolean;
  /**
   * Content images are framed (6px radius + 1px border) so near-black photos read as intentional in light mode.
   * Pass false when a parent (FigureFrame, a card) already provides the frame.
   */
  framed?: boolean;
  /** Left → right wipe when scrolled into view. Default on for content images. */
  reveal?: boolean;
  /** Image drifts slower than its box while scrolling (desktop fine pointer only). */
  parallax?: boolean;
  /** Zoom the image (hover system `hv-img`) when an ancestor hv-card / hv-surface / hv-group is hovered or focused. */
  zoomOnHover?: boolean;
};

type Status = "loading" | "loaded" | "failed";

/**
 * Renders an image slot from content/images.ts with a plain <img> (static export, no optimizer).
 * While the file is loading or missing, a clean placeholder shows the expected filename — never a broken image.
 * Swapping an image = dropping a same-named .webp into its folder, public/images/<folder>/ (see content/images.ts).
 *
 * Motion ownership: motion runs the one-shot wipe (a cover panel scaling away to the right — transform only,
 * so it reads as a clip wipe without animating clip-path); GSAP runs the scrubbed parallax on a separate layer;
 * hover zoom is the shared `hv-img` class on the <img>. Three different elements, no conflicts.
 */
export default function ImageSlot({
  slot,
  className,
  imgClassName,
  fill = false,
  priority = false,
  framed = true,
  reveal = true,
  parallax = false,
  zoomOnHover = true,
}: ImageSlotProps) {
  const image = images[slot];
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  // The image may finish (or fail) before hydration attaches onLoad/onError — check its state once mounted.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "failed");
  }, []);

  // Scroll parallax — desktop fine pointer only, never under reduced motion.
  useLayoutEffect(() => {
    if (!parallax || !rootRef.current || !driftRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktopFine} and ${MQ.motionOk}`, () => {
        gsap.fromTo(
          driftRef.current,
          { yPercent: -PARALLAX.imageYPercent },
          {
            yPercent: PARALLAX.imageYPercent,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [parallax]);

  const showWipe = reveal && !priority && !reduceMotion;
  const boxStyle: CSSProperties | undefined = fill ? undefined : { aspectRatio: image.aspectRatio };

  return (
    <div
      ref={rootRef}
      className={cn("relative overflow-hidden bg-elevated", fill && "absolute inset-0", framed && "rounded-md border border-border", className)}
      style={boxStyle}
    >
      {/* Parallax layer is taller than the box so drifting never exposes an edge. */}
      <div ref={driftRef} className={cn("absolute inset-x-0", parallax ? "-top-[8%] -bottom-[8%]" : "inset-y-0")}>
        {status !== "loaded" ? (
          <div role="img" aria-label={image.alt} className="absolute inset-0 grid place-items-center bg-elevated">
            <span className="flex flex-col items-center gap-2 px-3 text-center">
              <span aria-hidden="true" className="label-caps text-muted-foreground/70">
                Image pending
              </span>
              <span className="text-xs text-muted-foreground">{image.key}.webp</span>
            </span>
          </div>
        ) : null}

        {status !== "failed" ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export: plain <img> by design, see content/images.ts
          <img
            ref={imgRef}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            data-image-slot
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("failed")}
            className={cn(
              "absolute inset-0 size-full object-cover",
              zoomOnHover && "hv-img",
              status === "loaded" ? "opacity-100" : "opacity-0",
              imgClassName,
            )}
          />
        ) : null}
      </div>

      {showWipe ? (
        <motion.div
          aria-hidden="true"
          data-image-wipe
          className="pointer-events-none absolute inset-0 origin-right bg-background"
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: REVEAL.imageWipeDuration, ease: EASE_OUT }}
        />
      ) : null}
    </div>
  );
}
