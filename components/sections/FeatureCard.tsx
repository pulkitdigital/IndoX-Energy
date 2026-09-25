"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOVER, MQ } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import Icon from "@/components/ui/Icon";
import ImageSlot from "@/components/ui/ImageSlot";
import SpecLabel from "@/components/ui/SpecLabel";
import { cardLabels } from "@/content/common";

type FeatureCardProps = {
  href: string;
  icon: IconName;
  title: string;
  description: string;
  /** Optional cover image at the top of the card (the card provides the frame). */
  image?: ImageSlotKey;
  /** Spec-sheet micro labels under the description. */
  specs?: string[];
  /** Small index shown top-right, e.g. "01". */
  index?: string;
  /** Larger card: taller image that stretches to fill a double-height grid cell. */
  featured?: boolean;
  /** Very light 3D tilt toward the cursor (desktop fine pointer only, off under reduced motion). */
  tilt?: boolean;
  className?: string;
};

/**
 * Solid card: --surface fill, 1px --border. Hover: lifts 4px, border turns --accent, arrow slides in, image zooms.
 * Framer Motion owns the lift/tilt transform; GSAP (inside ImageSlot) owns the image parallax.
 */
export default function FeatureCard({ href, icon, title, description, image, specs, index, featured = false, tilt = false, className }: FeatureCardProps) {
  const reduceMotion = useReducedMotion();
  const desktopFine = useMediaQuery(MQ.desktopFine);
  const tiltOn = tilt && desktopFine && !reduceMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawY, { stiffness: 200, damping: 20 });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!tiltOn) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rawY.set(px * HOVER.tiltMaxDeg * 2);
    rawX.set(-py * HOVER.tiltMaxDeg * 2);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: HOVER.cardLift }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={tiltOn ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={cn("h-full", className)}
    >
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-card"
      >
        {image ? (
          <div className={cn("relative border-b border-border", featured ? "min-h-64 flex-1 lg:min-h-80" : "h-44 sm:h-48")}>
            <ImageSlot slot={image} fill framed={false} parallax />
          </div>
        ) : null}
        <div className={cn("flex flex-col", featured ? "p-7 sm:p-9" : "flex-1 p-6")}>
          <div className="flex items-center justify-between gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-border text-link">
              <Icon name={icon} className="size-5" />
            </span>
            {index ? <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">{index}</span> : null}
          </div>
          <h3 className={cn("mt-6 font-bold", featured ? "text-2xl sm:text-3xl" : "text-xl")}>{title}</h3>
          <p className={cn("mt-2 leading-relaxed text-muted-foreground", featured ? "text-base sm:text-lg" : "text-sm")}>{description}</p>
          {specs?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {specs.map((spec) => (
                <SpecLabel key={spec}>{spec}</SpecLabel>
              ))}
            </div>
          ) : null}
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-link">
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">{cardLabels.learnMore}</span>
            <ArrowRight
              className="size-4 -translate-x-2 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
