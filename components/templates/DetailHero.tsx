import { Phone } from "lucide-react";
import { REVEAL } from "@/lib/motion";
import { company } from "@/content/company";
import type { ImageSlotKey } from "@/content/images";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import ComplianceLine from "@/components/layout/ComplianceLine";
import MiniQuoteForm from "@/components/forms/MiniQuoteForm";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import FigureFrame from "@/components/ui/FigureFrame";
import ImageSlot from "@/components/ui/ImageSlot";

type DetailHeroProps = {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  promise: string;
  /** Primary button label; by default it jumps to the MiniQuoteForm below. */
  ctaLabel: string;
  /** Primary button target (default: the MiniQuoteForm, #enquire). */
  ctaHref?: string;
  /** Image frame ratio (default 4:3 — product / service slots). */
  imageAspect?: "4/3" | "16/9";
  callLabel: string;
  /** Analytics location for the call button. */
  callLocation: string;
  image: ImageSlotKey;
  caption: string;
  /** MiniQuoteForm: pre-selected Requirement + optional heading. */
  requirement: string;
  formTitle?: string;
};

export const ENQUIRE_ID = "enquire";

/**
 * Hero shared by every product and service page: breadcrumbs, eyebrow, H1, one-line promise, primary button
 * (→ #enquire) + tracked call button, compliance line, 4:3 framed image, and the MiniQuoteForm underneath.
 */
export default function DetailHero({
  breadcrumbs,
  eyebrow,
  title,
  promise,
  ctaLabel,
  ctaHref = `#${ENQUIRE_ID}`,
  imageAspect = "4/3",
  callLabel,
  callLocation,
  image,
  caption,
  requirement,
  formTitle,
}: DetailHeroProps) {
  return (
    <section aria-labelledby="detail-title" className="pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
      <div className="container-x">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <ScrollReveal className="lg:col-span-7">
            <Eyebrow index="00" label={eyebrow} />
            <h1 id="detail-title" className="text-display mt-6">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">{promise}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={ctaHref} size="lg" arrow magnetic className="w-full sm:w-auto">
                {ctaLabel}
              </CtaLink>
              <CtaLink contact={{ kind: "call", location: callLocation }} variant="outline" size="lg">
                <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {callLabel} {company.tollFree}
              </CtaLink>
            </div>
            <ComplianceLine className="mt-8 border-t border-border pt-4" />
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5" delay={REVEAL.stagger}>
            <FigureFrame caption={caption} frameClassName={imageAspect === "16/9" ? "aspect-[16/9]" : "aspect-[4/3]"}>
              <ImageSlot slot={image} fill priority framed={false} zoomOnHover={false} />
            </FigureFrame>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-12 lg:mt-16">
          <MiniQuoteForm id={ENQUIRE_ID} requirement={requirement} title={formTitle} />
        </ScrollReveal>
      </div>
    </section>
  );
}
