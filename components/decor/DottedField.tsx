import { cn } from "@/lib/utils";
import { DECOR_BASE, SIDE_CLASS, decorStyle, fadeMask, type DecorSide } from "@/components/decor/decor";

/** Sparse dot pattern (one 2px dot per 28px cell), faded toward one side. */
export default function DottedField({ side = "full", className }: { side?: DecorSide; className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-decor="dots"
      className={cn(DECOR_BASE, SIDE_CLASS[side], className)}
      style={{
        ...decorStyle,
        ...fadeMask(side),
        backgroundImage: "radial-gradient(circle, var(--decor-ink) 0 2px, transparent 2.1px)",
        backgroundSize: "26px 26px",
      }}
    />
  );
}
