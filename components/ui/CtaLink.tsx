"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOVER, MQ } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { trackEvent, type ConversionEvent } from "@/lib/analytics";

export type CtaVariant = "primary" | "outline" | "text" | "onBrand" | "outlineOnBrand";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  /**
   * primary = solid brand-blue, white text. outline = 1px border, neutral text. text = link-colored text.
   * onBrand / outlineOnBrand = for use on a solid brand-blue surface (e.g. QuoteCTABand).
   */
  variant?: CtaVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
  /** Button follows the cursor slightly (desktop fine pointer only, off under reduced motion). */
  magnetic?: boolean;
  /** Fires a conversion event on click (call / WhatsApp / quote). */
  track?: ConversionEvent;
  "aria-label"?: string;
};

const VARIANTS: Record<CtaVariant, string> = {
  primary: "bg-primary font-semibold text-primary-foreground hover:bg-primary-hover",
  outline: "border border-border-strong bg-transparent font-semibold text-foreground hover:border-link hover:text-link",
  text: "px-0! font-semibold text-link hover:underline underline-offset-4",
  onBrand: "bg-on-brand font-semibold text-brand-blue hover:bg-on-brand/90",
  outlineOnBrand: "border border-on-brand/40 font-semibold text-on-brand hover:border-on-brand hover:bg-on-brand/10",
};

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
} as const;

const MotionLink = motion.create(Link);

function isExternal(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href);
}

/** Link styled as a button. Uses next/link for internal routes, <a> for tel/mailto/external. */
export default function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  magnetic = false,
  track,
  ...rest
}: CtaLinkProps) {
  const reduceMotion = useReducedMotion();
  const desktopFine = useMediaQuery(MQ.desktopFine);
  const magnetOn = magnetic && desktopFine && !reduceMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, HOVER.magnetSpring);
  const y = useSpring(rawY, HOVER.magnetSpring);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!magnetOn) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * HOVER.magnetStrength);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * HOVER.magnetStrength);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-md whitespace-nowrap transition-[background-color,border-color,color,translate] duration-300 hover:-translate-y-0.5",
    SIZES[size],
    VARIANTS[variant],
    className,
  );
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /> : null}
    </>
  );
  const shared = {
    className: classes,
    onClick: track ? () => trackEvent(track) : undefined,
    onPointerMove,
    onPointerLeave,
    style: { x, y },
    ...rest,
  };

  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <motion.a href={href} {...shared} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </motion.a>
    );
  }
  return (
    <MotionLink href={href} {...shared}>
      {content}
    </MotionLink>
  );
}
