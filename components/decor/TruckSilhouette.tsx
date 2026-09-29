import { cn } from "@/lib/utils";
import { DECOR_BASE, decorStyle } from "@/components/decor/decor";

/**
 * Single-colour fuel bowser outline (same art as the footer truck, static, no wheels turning). A background mark:
 * bottom corner of the section, clipped by the layer, never animated.
 */
export default function TruckSilhouette({ side = "right", className }: { side?: "left" | "right"; className?: string }) {
  const stroke = { stroke: "var(--decor-ink)", strokeWidth: 2, strokeLinejoin: "round" as const, vectorEffect: "non-scaling-stroke" as const };
  return (
    <div
      aria-hidden="true"
      data-decor="truck"
      className={cn(DECOR_BASE, "bottom-0 h-40 w-full max-w-[420px] sm:h-52", side === "right" ? "right-0" : "left-0 -scale-x-100", className)}
      style={decorStyle}
    >
      <svg viewBox="0 0 260 110" className="absolute right-0 bottom-3 h-auto w-[260px] sm:w-[340px]" fill="none">
        <rect x="12" y="24" width="152" height="50" rx="22" {...stroke} />
        <rect x="46" y="17" width="20" height="9" rx="2" {...stroke} />
        <rect x="104" y="17" width="20" height="9" rx="2" {...stroke} />
        <path d="M12 48.5H164" {...stroke} stroke="var(--decor-accent)" />
        <rect x="168" y="14" width="4" height="62" rx="1" {...stroke} />
        <rect x="4" y="34" width="3" height="40" rx="1" {...stroke} />
        <rect x="6" y="74" width="240" height="8" rx="2" {...stroke} />
        <path d="M176 76V34a6 6 0 0 1 6-6h34a8 8 0 0 1 6.4 3.2L246 60v16Z" {...stroke} />
        <path d="M186 36h29l17 22h-46Z" {...stroke} />
        <rect x="240" y="68" width="12" height="10" rx="2" {...stroke} />
        {[50, 82, 212].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="88" r="13" {...stroke} />
            <circle cx={cx} cy="88" r="4" {...stroke} />
          </g>
        ))}
        <path d="M0 101H260" {...stroke} strokeDasharray="14 12" />
      </svg>
    </div>
  );
}
