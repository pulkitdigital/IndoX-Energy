"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  /** "icon" = round icon button (header). "row" = full-width labelled row (mobile menu). */
  variant?: "icon" | "row";
};

/**
 * Light/dark switch. The theme is unknown during SSR, so the button renders a neutral,
 * same-size shell until mounted — no hydration mismatch, no layout shift.
 */
export default function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const nextLabel = isDark ? "Switch to light theme" : "Switch to dark theme";
  const toggle = () => setTheme(isDark ? "light" : "dark");
  const IconComponent = isDark ? Sun : Moon;

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={!mounted}
        aria-label={nextLabel}
        className={cn(
          "hv-toggle flex w-full items-center justify-between rounded-md border border-border px-4 py-3.5 text-sm",
          className,
        )}
      >
        <span>{mounted ? (isDark ? "Dark theme" : "Light theme") : "Theme"}</span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="hv-toggle-icon grid size-4 place-items-center" aria-hidden="true">
            {mounted ? <IconComponent className="size-4" strokeWidth={1.5} /> : null}
          </span>
          {mounted ? (isDark ? "Switch to light" : "Switch to dark") : null}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!mounted}
      aria-label={nextLabel}
      title={mounted ? nextLabel : undefined}
      className={cn(
        "hv-toggle hv-chip grid size-10 place-items-center rounded-md border border-border text-foreground",
        className,
      )}
    >
      {/* hv-toggle: icon rotates 30deg on hover; the swap itself is a quick cross-fade. */}
      <span className="hv-toggle-icon grid size-4 place-items-center" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          {mounted ? (
            <motion.span
              key={isDark ? "sun" : "moon"}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="block"
            >
              <IconComponent className="size-4" strokeWidth={1.5} />
            </motion.span>
          ) : null}
        </AnimatePresence>
      </span>
    </button>
  );
}
