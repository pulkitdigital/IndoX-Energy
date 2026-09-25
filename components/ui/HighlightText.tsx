import { cn } from "@/lib/utils";

type HighlightTextProps = {
  text: string;
  /** Substring of `text` rendered in the solid accent color. */
  highlight?: string;
  highlightClassName?: string;
};

/** Renders `text`, coloring the `highlight` substring with a solid token color (no gradient text). */
export default function HighlightText({ text, highlight, highlightClassName = "text-accent" }: HighlightTextProps) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const index = text.indexOf(highlight);
  return (
    <>
      {text.slice(0, index)}
      <span className={cn(highlightClassName)}>{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}
