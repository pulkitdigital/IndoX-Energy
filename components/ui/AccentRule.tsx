"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT, REVEAL } from "@/lib/motion";

/** Short solid accent underline that draws in (scaleX) when it enters the viewport. */
export default function AccentRule({ center = false, className }: { center?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={cn("mt-6 block h-[3px] w-14 bg-accent", center ? "mx-auto origin-center" : "origin-left", className)}
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: REVEAL.underlineDuration, delay: 0.25, ease: EASE_OUT }}
    />
  );
}
