import { cn } from "@/lib/utils";

type EyebrowProps = {
  /** Section number, e.g. "01". */
  index?: string;
  label: string;
  className?: string;
  /** "default" = theme tokens; "onBrand" = white on the solid brand-blue band; "onDark" = white on a dark photo (Home hero). */
  tone?: "default" | "onBrand" | "onDark";
};

/** Technical section label: `01 / APPROACH ———` in mono caps with a thin rule. Every section starts with one. */
export default function Eyebrow({ index, label, className, tone = "default" }: EyebrowProps) {
  // onBrand and onDark share the white treatment: both sit on a dark surface in either theme.
  const onBrand = tone !== "default";
  return (
    <p className={cn("label-caps flex items-center gap-2.5", onBrand ? "text-on-brand/85" : "text-muted-foreground", className)}>
      {index ? (
        <>
          <span className={onBrand ? "text-on-brand" : "text-foreground"}>{index}</span>
          <span aria-hidden="true">/</span>
        </>
      ) : null}
      <span>{label}</span>
      <span aria-hidden="true" className={cn("h-px w-10 shrink-0 sm:w-20", onBrand ? "bg-on-brand/40" : "bg-border-strong")} />
    </p>
  );
}
