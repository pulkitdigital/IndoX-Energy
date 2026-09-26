"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT, REVEAL } from "@/lib/motion";

/** Short solid accent underline under a section heading; draws in (scaleX) on enter. */
export default function AccentRule({ center = false, className }: { center?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={cn("mt-6 block h-0.5 w-12 bg-accent", center ? "mx-auto origin-center" : "origin-left", className)}
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: REVEAL.underlineDuration, delay: REVEAL.underlineDelay, ease: EASE_OUT }}
    />
  );
}
