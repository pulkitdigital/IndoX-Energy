import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { evTeaser } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AccentRule from "@/components/ui/AccentRule";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import FigureFrame from "@/components/ui/FigureFrame";
import ImageSlot from "@/components/ui/ImageSlot";

/**
 * EV Charging teaser — image-led split. The framed charger image is itself a link card to /ev-charging/
 * (hv-group: image zooms, corner arrow slides in, "View" cursor). Copy + 3 ruled points on the right.
 */
export default function EVTeaser() {
  return (
    <section aria-labelledby="ev-title" className="section-y bg-tint-green">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <ScrollReveal className="lg:col-span-6" y={24}>
          <Link href={evTeaser.secondaryCta.href} data-cursor="view" aria-label={evTeaser.secondaryCta.label} className="hv-group block rounded-md">
            <FigureFrame caption={evTeaser.caption}>
              <ImageSlot slot={evTeaser.image} framed={false} parallax />
              <span className="hv-arrow-in absolute top-3 right-3 grid size-9 place-items-center rounded-md bg-background text-link">
                <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </FigureFrame>
          </Link>
        </ScrollReveal>

        <div className="lg:col-span-6">
          <ScrollReveal>
            <Eyebrow index={evTeaser.index} label={evTeaser.eyebrow} className="mb-5" />
            <h2 id="ev-title" className="text-section">
              {evTeaser.title}
            </h2>
            <AccentRule />
            <p className="mt-6 max-w-xl text-muted-foreground">{evTeaser.description}</p>
          </ScrollReveal>

          <ol className="mt-8 border-t border-border">
            {evTeaser.points.map((point, i) => (
              <li key={point.title} className="border-b border-border">
                <ScrollReveal delay={0.05 + i * 0.06} y={10} className="grid grid-cols-[2.25rem_1fr] gap-x-4 py-4">
                  <span className="label-caps pt-1 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-heading text-lg leading-snug font-bold">{point.title}</span>
                    <span className="mt-1 block text-[0.9375rem] text-muted-foreground">{point.description}</span>
                  </span>
                </ScrollReveal>
              </li>
            ))}
          </ol>

          <ScrollReveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={evTeaser.primaryCta.href} size="lg" arrow magnetic className="w-full sm:w-auto">
              {evTeaser.primaryCta.label}
            </CtaLink>
            <CtaLink href={evTeaser.secondaryCta.href} size="lg" variant="outline">
              {evTeaser.secondaryCta.label}
            </CtaLink>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
