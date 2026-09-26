"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, REVEAL } from "@/lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use REVEAL.stagger multiples to stagger grid items. */
  delay?: number;
  /** Vertical offset in px the element travels while fading in. */
  y?: number;
  /** Fraction of the element that must be visible before revealing. */
  amount?: number;
  as?: "div" | "li";
};

/** Shared section/item entrance (motion whileInView). Plain wrapper, no motion, for prefers-reduced-motion users. */
export default function ScrollReveal({ children, className, delay = 0, y = REVEAL.y, amount = 0.2, as = "div" }: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;
  if (reduceMotion) return <Tag className={className}>{children}</Tag>;

  const MotionTag = as === "li" ? motion.li : motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: REVEAL.duration, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
}
