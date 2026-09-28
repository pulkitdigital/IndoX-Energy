import { cn } from "@/lib/utils";

type SpecLabelProps = {
  children: string;
  className?: string;
  /** "default" = theme tokens (light + dark). "onDark" = white, for labels sitting on a dark photo (Home hero). */
  tone?: "default" | "onDark";
};

/** Spec-sheet micro label, e.g. `METERED`. Caps, 1px hairline border, no fill, small accent square. */
export default function SpecLabel({ children, className, tone = "default" }: SpecLabelProps) {
  const onDark = tone === "onDark";
  return (
    <span
      className={cn(
        "label-caps inline-flex items-center gap-1.5 rounded-xs border px-1.5 py-0.5",
        onDark ? "border-white/35 text-white" : "border-border text-muted-foreground",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1 bg-accent" />
      {children}
    </span>
  );
}
