"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HOVER, MQ } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { ImageSlotKey } from "@/content/images";
import ImageSlot from "@/components/ui/ImageSlot";
import SpecLabel from "@/components/ui/SpecLabel";

type ProductCardProps = {
  href: string;
  title: string;
  description: string;
  image: ImageSlotKey;
  labels: string[];
  /** Index, e.g. "01". */
  index: string;
  /** Footer link text. Home keeps the default; /products/ passes "Explore" (PRD §8.3). */
  ctaLabel?: string;
};

/**
 * Product card (all five identical): fixed 4:3 image box, solid surface, 1px border, 8px radius. Hover / focus: lifts 4px (motion), border → accent,
 * image zooms 1.05, corner arrow slides in, "View details" arrow nudges (hover system: hv-surface).
 * Light 3D tilt toward the cursor (max 4deg) on desktop fine pointers only.
 * motion owns the card transform; the image only zooms via the CSS hover system — different elements.
 */
export default function ProductCard({ href, title, description, image, labels, index, ctaLabel = "View details" }: ProductCardProps) {
  const reduceMotion = useReducedMotion();
  const desktopFine = useMediaQuery(MQ.desktopFine);
  const tiltOn = desktopFine && !reduceMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, HOVER.tiltSpring);
  const rotateY = useSpring(rawY, HOVER.tiltSpring);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!tiltOn) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawY.set(((event.clientX - rect.left) / rect.width - 0.5) * HOVER.tiltMaxDeg * 2);
    rawX.set(-((event.clientY - rect.top) / rect.height - 0.5) * HOVER.tiltMaxDeg * 2);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: HOVER.cardLift }}
      transition={HOVER.liftSpring}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={tiltOn ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className="h-full"
    >
      <Link
        href={href}
        data-cursor="view"
        className="hv-surface flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card"
      >
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden border-b border-border">
          <ImageSlot slot={image} fill framed={false} />
          {/* <span className="label-caps absolute top-3 left-3 rounded-xs bg-background px-1.5 py-0.5 text-muted-foreground">FIG. P-{index}</span> */}
          {/* Corner "View" arrow slides in on hover / focus. */}
          <span className="hv-arrow-in absolute top-3 right-3 grid size-9 place-items-center rounded-md bg-background text-link">
            <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* <div className="flex flex-wrap gap-1.5">
            {labels.map((label) => (
              <SpecLabel key={label}>{label}</SpecLabel>
            ))}
          </div> */}
          <h3 className="text-lg">{title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>
          <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-link">
            {ctaLabel}
            <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
