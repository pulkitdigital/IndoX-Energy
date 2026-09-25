import { cn } from "@/lib/utils";

type EyebrowProps = {
  /** Section number, e.g. "01". Omit for unnumbered labels. */
  index?: string;
  label: string;
  className?: string;
  /** "default" = theme tokens; "onBrand" = white on the solid brand-blue band. */
  tone?: "default" | "onBrand";
};

/** Technical section label: `01 / OUR APPROACH ────` in small mono caps with a thin rule. */
export default function Eyebrow({ index, label, className, tone = "default" }: EyebrowProps) {
  const onBrand = tone === "onBrand";
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] uppercase",
        onBrand ? "text-on-brand/85" : "text-muted-foreground",
        className,
      )}
    >
      {index ? <span className={onBrand ? "text-on-brand" : "text-link"}>{index}</span> : null}
      {index ? <span aria-hidden="true">/</span> : null}
      <span>{label}</span>
      <span aria-hidden="true" className={cn("h-px w-10 shrink-0 sm:w-16", onBrand ? "bg-on-brand/40" : "bg-border-strong")} />
    </p>
  );
}
