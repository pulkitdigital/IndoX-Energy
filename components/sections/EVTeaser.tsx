import { evTeaser } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AccentRule from "@/components/ui/AccentRule";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import HighlightText from "@/components/ui/HighlightText";
import Icon from "@/components/ui/Icon";
import ImageSlot from "@/components/ui/ImageSlot";

/** EV teaser: image-led split (image left, copy right) with a divided list of three points. */
export default function EVTeaser() {
  return (
    <section aria-labelledby="ev-title" className="section-y border-y border-border">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <ScrollReveal className="lg:col-span-6" y={32}>
          <ImageSlot slot={evTeaser.image} parallax />
        </ScrollReveal>

        <div className="lg:col-span-6">
          <ScrollReveal>
            <Eyebrow index={evTeaser.index} label={evTeaser.eyebrow} className="mb-5" />
            <h2 id="ev-title" className="text-4xl leading-[1.02] font-bold text-balance sm:text-5xl">
              <HighlightText text={evTeaser.title} highlight={evTeaser.highlight} />
            </h2>
            <AccentRule />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{evTeaser.description}</p>
          </ScrollReveal>

          <ul className="mt-8 border-t border-border">
            {evTeaser.points.map((point, i) => (
              <li key={point.title} className="border-b border-border">
                <ScrollReveal delay={0.05 + i * 0.06} y={10} className="flex items-start gap-4 py-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                    <Icon name={point.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block font-heading text-lg font-bold">{point.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{point.description}</span>
                  </span>
                </ScrollReveal>
              </li>
            ))}
          </ul>

          <ScrollReveal className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={evTeaser.primaryCta.href} size="lg" arrow magnetic track="quote_cta_click">
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
