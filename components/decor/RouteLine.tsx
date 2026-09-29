import { Droplet } from "lucide-react";
import { cn } from "@/lib/utils";
import { DECOR_BASE, decorStyle } from "@/components/decor/decor";

/**
 * Thin dashed route with a gentle curve running across the section, and a small fuel-drop marker at one end.
 * The path stretches with the section (non-scaling stroke keeps it 2px); the marker is a separate element so
 * it never distorts.
 */
export default function RouteLine({ marker = "end", className }: { marker?: "start" | "end" | "none"; className?: string }) {
  return (
    <div aria-hidden="true" data-decor="route" className={cn(DECOR_BASE, "inset-x-0 top-1/2 h-40 -translate-y-1/2 sm:h-56", className)} style={decorStyle}>
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
        <path
          d="M0 150 C 240 30, 420 200, 660 110 S 1030 40, 1200 60"
          stroke="var(--decor-ink)"
          strokeWidth="2"
          strokeDasharray="6 10"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {marker === "none" ? null : (
        <Droplet
          strokeWidth={1.5}
          className={cn("absolute size-6 text-[var(--decor-accent)]", marker === "end" ? "right-3 top-[26%]" : "top-[70%] left-3")}
        />
      )}
    </div>
  );
}
