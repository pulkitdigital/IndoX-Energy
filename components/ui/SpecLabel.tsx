import { cn } from "@/lib/utils";

/** Spec-sheet style micro label, e.g. `METERED`. Used instead of decorative badges/glows. */
export default function SpecLabel({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
      {children}
    </span>
  );
}
