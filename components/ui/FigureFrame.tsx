import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FigureFrameProps = {
  children: ReactNode;
  /** Mono caption under the frame, e.g. "FIG. 01 — Fuel bowser". Omit for no caption. */
  caption?: string;
  className?: string;
  /** Classes for the inner framed box (sizing / aspect). */
  frameClassName?: string;
};

const TICK = "pointer-events-none absolute size-2.5 border-foreground/50";

/**
 * Technical image frame: 1px border, 6px radius, small crosshair ticks just outside each corner, and an optional
 * FIG. caption in mono. Used around content images so near-black photos read as intentional in light mode.
 */
export default function FigureFrame({ children, caption, className, frameClassName }: FigureFrameProps) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative">
        <div className={cn("relative overflow-hidden rounded-md border border-border", frameClassName)}>{children}</div>
        <span aria-hidden="true" className={cn(TICK, "-top-1.5 -left-1.5 border-t border-l")} />
        <span aria-hidden="true" className={cn(TICK, "-top-1.5 -right-1.5 border-t border-r")} />
        <span aria-hidden="true" className={cn(TICK, "-bottom-1.5 -left-1.5 border-b border-l")} />
        <span aria-hidden="true" className={cn(TICK, "-right-1.5 -bottom-1.5 border-r border-b")} />
      </div>
      {caption ? <figcaption className="label-caps mt-3 text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}
