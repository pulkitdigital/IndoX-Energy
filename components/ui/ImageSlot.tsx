"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
   * Content images are framed (rounded + 1px border) so near-black photos read as intentional
   * in light mode. Pass false when the parent card already provides the frame.
   */
  framed?: boolean;
  /** Purely decorative (backgrounds): empty alt, hidden from assistive tech, no frame, no label, no motion. */
  decorative?: boolean;
  /** Curtain wipe left → right when scrolled into view (transform-only). Default: on for content images. */
  reveal?: boolean;
  /** Image drifts slower than its box while scrolling (desktop fine-pointer only). */
  parallax?: boolean;
};

type Status = "loading" | "loaded" | "failed";

/**
 * Renders an image slot from content/images.ts with a plain <img> (static export, no optimizer).
 * While the file is loading or missing, a clean placeholder shows the slot name — never a broken image.
 * Swapping an image = dropping a same-named file into public/images/.
 *
 * Motion: Framer handles the one-shot curtain wipe; GSAP ScrollTrigger handles the scrubbed parallax.
 * They animate different elements, so they never conflict. Hover zoom (1.05) is CSS on the <img>.
 */
export default function ImageSlot({
  slot,
  className,
  imgClassName,
  fill = false,
  priority = false,
  framed = true,
  decorative = false,
  reveal = true,
  parallax = false,
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
    if (!parallax || decorative || !rootRef.current || !driftRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktopFine} and (prefers-reduced-motion: no-preference)`, () => {
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
  }, [parallax, decorative]);

  const showFrame = framed && !decorative;
  const showWipe = reveal && !decorative && !priority && !reduceMotion;
  const boxStyle: CSSProperties | undefined = fill ? undefined : { aspectRatio: image.aspectRatio };

  return (
    <div
      ref={rootRef}
      className={cn("group/img relative overflow-hidden", fill && "absolute inset-0", showFrame && "rounded-lg border border-border", className)}
      style={boxStyle}
    >
      {/* Parallax layer is taller than the box so drifting never exposes an edge. */}
      <div ref={driftRef} className={cn("absolute inset-x-0", parallax ? "-top-[8%] -bottom-[8%]" : "inset-y-0")}>
        {status !== "loaded" && !decorative ? (
          <div role="img" aria-label={image.alt} className="absolute inset-0 grid place-items-center bg-surface">
            <span className="px-3 text-center font-mono text-[11px] tracking-wide text-muted-foreground">{image.key}.webp</span>
          </div>
        ) : null}

        {status !== "failed" ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export: plain <img> by design, see content/images.ts
          <img
            ref={imgRef}
            src={image.src}
            alt={decorative ? "" : image.alt}
            aria-hidden={decorative ? true : undefined}
            width={image.width}
            height={image.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            data-image-slot
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("failed")}
            className={cn(
              "absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out",
              !decorative && "group-hover/img:scale-105",
              status === "loaded" ? "opacity-100" : "opacity-0",
              imgClassName,
            )}
          />
        ) : null}
      </div>

      {/* Curtain wipe: a --bg-colored panel shrinks toward the right edge, revealing the image left → right. */}
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
