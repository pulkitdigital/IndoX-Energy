"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ROUTES } from "@/content/navigation";
import { readConsent, writeConsent, type ConsentState } from "@/lib/consent";
import { cookieNotice } from "@/content/common";
import { EASE_OUT } from "@/lib/motion";

/** Minimal first-visit cookie bar. Analytics stays off unless the visitor accepts. */
export default function CookieNotice() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay slightly so the bar never competes with the hero entrance.
    const timer = window.setTimeout(() => setVisible(readConsent() === null), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (value: ConsentState) => {
    writeConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="region"
          aria-label="Cookie notice"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="fixed inset-x-3 bottom-20 z-50 sm:inset-x-auto sm:left-6 sm:max-w-md lg:bottom-6"
        >
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-popover p-4 shadow-subtle sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              <span>
                {cookieNotice.text}{" "}
                <Link href={ROUTES.privacy} className="hv-text-link text-foreground">
                  {cookieNotice.policyLabel}
                </Link>
              </span>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="h-9 flex-1 rounded-md border border-border-strong px-4 text-sm transition-colors hover:border-foreground"
              >
                {cookieNotice.decline}
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="h-9 flex-1 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
              >
                {cookieNotice.accept}
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
