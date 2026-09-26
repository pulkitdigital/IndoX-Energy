import { cn } from "@/lib/utils";

/** Spec-sheet micro label, e.g. `METERED`. Mono, hairline border, no fill. */
export default function SpecLabel({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("label-caps inline-flex items-center gap-1.5 rounded-xs  border-border px-1.5 py-0.5 text-muted-foreground text-white", className)}>
      <span aria-hidden="true" className="size-1 bg-white" />
      {children}
    </span>
  );
}
