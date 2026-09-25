"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT, REVEAL } from "@/lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use small increments (≈0.06) to stagger grid items. */
  delay?: number;
  /** Vertical offset in px the element travels while fading in. */
  y?: number;
  /** Fraction of the element that must be visible before revealing. */
  amount?: number;
};

/** Shared section/item entrance. Plain wrapper (no motion) for prefers-reduced-motion users. */
export default function ScrollReveal({ children, className, delay = 0, y = REVEAL.y, amount = 0.2 }: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: REVEAL.duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
