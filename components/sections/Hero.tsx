"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "@/content/home";
import { GSAP_EASE_OUT, HERO, MQ } from "@/lib/motion";
import CtaLink from "@/components/ui/CtaLink";
import ComplianceNote from "@/components/ui/ComplianceNote";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import ImageSlot from "@/components/ui/ImageSlot";
import HeroBackground from "@/components/sections/HeroBackground";

gsap.registerPlugin(ScrollTrigger);

/** Positions for the spec tags around the hero visual, matched by index to `hero.visual.tags`. */
const TAG_POSITIONS = ["left-4 -top-4", "-right-2 top-1/2 sm:-right-4", "-bottom-4 left-6"];

/**
 * Home hero. GSAP owns the entrance timeline (masked line reveal → subline → CTAs; image slides in from the
 * right; dashed route draws in) and the desktop scroll parallax on the image. Transform + opacity only.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia(MQ.reduced).matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: GSAP_EASE_OUT } });
      tl.fromTo("[data-hero='line']", { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: HERO.lineDuration, stagger: HERO.lineStagger })
        .fromTo("[data-hero='eyebrow']", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: HERO.fadeDuration }, 0.1)
        .fromTo("[data-hero='sub']", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: HERO.fadeDuration }, "-=0.55")
        .fromTo("[data-hero='cta']", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: HERO.fadeDuration, stagger: 0.08 }, "-=0.45")
        .fromTo("[data-hero='chain']", { autoAlpha: 0 }, { autoAlpha: 1, duration: HERO.fadeDuration }, "-=0.35")
        .fromTo("[data-hero='visual']", { autoAlpha: 0, x: HERO.imageFromX }, { autoAlpha: 1, x: 0, duration: HERO.imageDuration }, 0.2)
        .fromTo("[data-hero='tag']", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1 }, "-=0.5")
        .fromTo(
          "[data-hero='route-reveal']",
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "0% 50%", duration: HERO.routeDuration, ease: "power2.inOut" },
          0.3,
        );

      const mm = gsap.matchMedia();
      mm.add(MQ.desktopFine, () => {
        gsap.to("[data-hero='parallax']", {
          yPercent: HERO.imageParallaxYPercent,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-36 lg:pb-24"
    >
      <noscript>
        <style>{`[data-hero-item]{opacity:1!important}`}</style>
      </noscript>
      <HeroBackground />

      <div className="container-x">
        {/* Row 1: full-width headline so both lines hold at display size */}
        <div data-hero="eyebrow" data-hero-item>
          <Eyebrow label={hero.eyebrow} />
        </div>
        <h1 id="hero-title" className="mt-7 text-[clamp(2.75rem,7.2vw,5.5rem)] leading-[1.02] font-extrabold">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero="line" data-hero-item className="block">
              {hero.titleLead}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero="line" data-hero-item className="block text-accent">
              {hero.titleHighlight}
            </span>
          </span>
        </h1>

        {/* Row 2: copy + CTAs left, landscape bowser image right */}
        <div className="mt-10 grid items-start gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div data-hero="sub" data-hero-item className="max-w-xl">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{hero.subline}</p>
              <ComplianceNote className="mt-3" />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <span data-hero="cta" data-hero-item>
                <CtaLink href={hero.primaryCta.href} size="lg" arrow magnetic track="quote_cta_click" className="w-full sm:w-auto">
                  {hero.primaryCta.label}
                </CtaLink>
              </span>
              <span data-hero="cta" data-hero-item>
                <CtaLink href={hero.secondaryCta.href} size="lg" variant="outline" className="w-full sm:w-auto">
                  {hero.secondaryCta.label}
                </CtaLink>
              </span>
            </div>

            <ol
              aria-label="Our approach"
              data-hero="chain"
              data-hero-item
              className="mt-10 grid grid-cols-3 gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase"
            >
              {hero.chain.map((step, i) => (
                <li key={step}>
                  <span className="text-link">{String(i + 1).padStart(2, "0")}</span> {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <div data-hero="visual" data-hero-item className="relative">
              <div data-hero="parallax">
                <ImageSlot slot={hero.visual.image} priority className="shadow-card" />
              </div>

              {hero.visual.tags.map(({ icon, label }, i) => (
                <div
                  key={label}
                  data-hero="tag"
                  data-hero-item
                  className={`absolute hidden items-center gap-2 rounded-sm border border-border bg-popover px-3 py-2 font-mono text-[11px] tracking-[0.1em] uppercase shadow-card sm:flex ${TAG_POSITIONS[i % TAG_POSITIONS.length]}`}
                >
                  <Icon name={icon} className="size-3.5 text-accent" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
