"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { CURSOR, MQ } from "@/lib/motion";

type CursorMode = "default" | "link" | "view" | "hidden";

/** Elements where the ring would get in the way of typing: hide it (the real cursor always stays visible). */
const TEXT_ENTRY = "input, textarea, select, [contenteditable='true']";
/** Image cards and product / industry tiles opt in with data-cursor="view". */
const VIEW_TARGET = "[data-cursor='view']";
const LINK_TARGET = "a, button, [role='button'], label, summary";

const SCALE: Record<CursorMode, number> = {
  default: CURSOR.size / CURSOR.viewSize,
  link: CURSOR.linkSize / CURSOR.viewSize,
  view: 1,
  hidden: CURSOR.size / CURSOR.viewSize,
};

/**
 * Subtle custom cursor (desktop fine pointer only). A 10px ring follows the mouse with a slight spring lag; it grows to
 * 32px over links / buttons and to 56px with a "View" label over image cards and tiles. It is decorative only:
 * the native cursor is never hidden, the ring hides over form fields, and it is not rendered on touch devices or
 * with prefers-reduced-motion. Transform + opacity only: a single 56px SVG ring that scales, with a non-scaling
 * stroke so the 1.5px border stays crisp at every size.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("hidden");

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, CURSOR.spring);
  const y = useSpring(rawY, CURSOR.spring);

  useEffect(() => {
    const capable = window.matchMedia(`(hover: hover) and (pointer: fine) and ${MQ.motionOk}`);
    const sync = () => setEnabled(capable.matches);
    sync();
    capable.addEventListener("change", sync);
    return () => capable.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      rawX.set(event.clientX);
      rawY.set(event.clientY);
    };
    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target || target.closest(TEXT_ENTRY)) return setMode("hidden");
      if (target.closest(VIEW_TARGET)) return setMode("view");
      if (target.closest(LINK_TARGET)) return setMode("link");
      setMode("default");
    };
    const onLeave = () => setMode("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  const isView = mode === "view";
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[80] -mt-7 -ml-7 size-14 text-foreground"
      style={{ x, y }}
    >
      <motion.div
        className="relative size-full"
        animate={{ scale: SCALE[mode], opacity: mode === "hidden" ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <svg viewBox="0 0 56 56" className="absolute inset-0 size-full overflow-visible">
          <circle
            cx="28"
            cy="28"
            r="27"
            fill="var(--bg)"
            fillOpacity={isView ? 0.85 : 0}
            stroke="currentColor"
            strokeOpacity={isView ? 0.9 : 0.55}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ transition: "fill-opacity 200ms ease-out, stroke-opacity 200ms ease-out" }}
          />
        </svg>
        <span className={cn("label-caps absolute inset-0 grid place-items-center transition-opacity duration-200", isView ? "opacity-100" : "opacity-0")}>
          View
        </span>
      </motion.div>
    </motion.div>
  );
}
