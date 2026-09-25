import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import HighlightText from "@/components/ui/HighlightText";
import AccentRule from "@/components/ui/AccentRule";

type SectionHeadingProps = SectionIntro & {
  /**
   * stacked = eyebrow, title, description in one column (default).
   * split   = title left, description right on desktop (editorial header).
   * center  = centered; use sparingly.
   */
  layout?: "stacked" | "split" | "center";
  className?: string;
  /** Heading id, for aria-labelledby on the section. */
  id?: string;
};

export default function SectionHeading({ index, eyebrow, title, highlight, description, layout = "stacked", className, id }: SectionHeadingProps) {
  const center = layout === "center";
  const heading = (
    <h2 id={id} className="text-4xl leading-[1.02] font-bold text-balance sm:text-5xl lg:text-[3.5rem]">
      <HighlightText text={title} highlight={highlight} />
    </h2>
  );

  if (layout === "split") {
    return (
      <ScrollReveal className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
        <div className="lg:col-span-7">
          <Eyebrow index={index} label={eyebrow} className="mb-5" />
          {heading}
          <AccentRule center={false} />
        </div>
        {description ? <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-5 lg:pb-4">{description}</p> : null}
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <Eyebrow index={index} label={eyebrow} className={cn("mb-5", center && "justify-center")} />
      {heading}
      <AccentRule center={center} />
      {description ? <p className={cn("mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg", center && "mx-auto")}>{description}</p> : null}
    </ScrollReveal>
  );
}
