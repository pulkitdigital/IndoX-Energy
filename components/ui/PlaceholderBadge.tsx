import { cn } from "@/lib/utils";

/** Visible marker for content awaiting real client data. Search the codebase for "PLACEHOLDER" to find them all. */
export default function PlaceholderBadge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-dashed border-border-strong bg-elevated px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
