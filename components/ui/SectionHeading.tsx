import { cn } from "@/lib/utils";
import { REVEAL } from "@/lib/motion";
import type { SectionIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import AccentRule from "@/components/ui/AccentRule";

type SectionHeadingProps = SectionIntro & {
  /**
   * stacked = eyebrow, title, description in one left-aligned column (default).
   * split   = title left, description right on desktop.
   */
  layout?: "stacked" | "split";
  className?: string;
  /** Heading id, for aria-labelledby on the section. */
  id?: string;
};

/** Every section heading on the site: mono eyebrow + left-aligned h2 + accent underline that draws in. */
export default function SectionHeading({ index, eyebrow, title, description, layout = "stacked", className, id }: SectionHeadingProps) {
  const heading = (
    <h2 id={id} className="text-section">
      {title}
    </h2>
  );

  if (layout === "split") {
    return (
      <ScrollReveal className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
        <div className="lg:col-span-7">
          <Eyebrow index={index} label={eyebrow} className="mb-6" />
          {heading}
          <AccentRule />
        </div>
        {description ? <p className="max-w-xl text-muted-foreground lg:col-span-5 lg:pb-3">{description}</p> : null}
      </ScrollReveal>
    );
  }

  return (
    <div className={cn("max-w-3xl", className)}>
      <ScrollReveal y={24}>
        <Eyebrow index={index} label={eyebrow} className="mb-6" />
      </ScrollReveal>
      <ScrollReveal delay={REVEAL.stagger}>{heading}</ScrollReveal>
      <AccentRule />
      {description ? (
        <ScrollReveal delay={REVEAL.stagger * 2}>
          <p className="mt-6 max-w-2xl text-muted-foreground">{description}</p>
        </ScrollReveal>
      ) : null}
    </div>
  );
}
