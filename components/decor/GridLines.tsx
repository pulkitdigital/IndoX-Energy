import { cn } from "@/lib/utils";
import { DECOR_BASE, SIDE_CLASS, decorStyle, fadeMask, type DecorSide } from "@/components/decor/decor";

const CELL = 56;

/** Faint architectural grid (same language as the Home hero grid): solid 1px hard-stop lines, faded toward one side. */
export default function GridLines({ side = "full", className }: { side?: DecorSide; className?: string }) {
  const line = `var(--decor-ink) 0 1px, transparent 1px ${CELL}px`;
  return (
    <div
      aria-hidden="true"
      data-decor="grid"
      className={cn(DECOR_BASE, SIDE_CLASS[side], className)}
      style={{
        ...decorStyle,
        ...fadeMask(side),
        backgroundImage: `repeating-linear-gradient(to right, ${line}), repeating-linear-gradient(to bottom, ${line})`,
      }}
    />
  );
}
