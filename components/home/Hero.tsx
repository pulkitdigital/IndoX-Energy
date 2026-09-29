// "use client";

// import { useLayoutEffect, useRef, type CSSProperties } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowDown, ChevronRight, Phone } from "lucide-react";
// import { hero } from "@/content/home";
// import { company } from "@/content/company";
// import { GSAP_EASE, HERO, MQ } from "@/lib/motion";
// import { cn } from "@/lib/utils";
// import { useLenis } from "@/components/animations/SmoothScrollProvider";
// import CtaLink from "@/components/ui/CtaLink";
// import Eyebrow from "@/components/ui/Eyebrow";
// import FigureFrame from "@/components/ui/FigureFrame";
// import ImageSlot from "@/components/ui/ImageSlot";
// import SpecLabel from "@/components/ui/SpecLabel";
// import ContactLink from "@/components/ui/ContactLink";
// import ComplianceLine from "@/components/layout/ComplianceLine";

// gsap.registerPlugin(ScrollTrigger);

// const CHEVRONS = [0, 1, 2, 3];
// /** The two flow arrows: one brand-blue (--link), one green/lime (--accent). */
// const FLOWS = ["text-link", "text-accent"];

// const gridStyle = {
//   "--hero-cell": `${HERO.gridCell}px`,
//   "--hero-major": `${HERO.gridCell * HERO.gridMajorEvery}px`,
// } as CSSProperties;

// /**
//  * Home hero — two columns inside the shared container: text left (widened), image right (fixed 16:11 box,
//  * object-cover). Stacks on mobile (text first). Behind it, full width: a masked architectural grid.
//  *
//  * One GSAP timeline on load (transform + opacity only, values in lib/motion.ts → HERO):
//  *   grid lines draw in (< 1s) · text and image fade up (< 1.2s) · chevrons beside the eyebrow sweep and settle
//  *   into one arrow (≈1.5s) · after the headline, two thin arrows run along grid rows and stop at the image.
//  * The scroll cue bobs only while the hero is on screen. Reduced motion: final static state, nothing moves.
//  */
// export default function Hero() {
//   const rootRef = useRef<HTMLElement>(null);
//   const lenis = useLenis();

//   useLayoutEffect(() => {
//     const root = rootRef.current;
//     if (!root || window.matchMedia(MQ.reduced).matches) return;

//     const ctx = gsap.context(() => {
//       const from = { autoAlpha: 0, y: HERO.fadeY };
//       const to = { autoAlpha: 1, y: 0, duration: HERO.fadeDuration };

//       const tl = gsap
//         .timeline({ defaults: { ease: GSAP_EASE.out } })
//         // Grid: vertical lines grow down, horizontal lines grow right, then the stronger lines fade in.
//         .fromTo("[data-hero='grid-v']", { autoAlpha: 0, scaleY: 0 }, { autoAlpha: 1, scaleY: 1, duration: HERO.gridDrawDuration }, 0)
//         .fromTo("[data-hero='grid-h']", { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: HERO.gridDrawDuration }, HERO.gridStagger)
//         .fromTo("[data-hero='grid-major']", { autoAlpha: 0 }, { autoAlpha: 1, duration: HERO.gridMajorDuration, stagger: HERO.gridStagger }, HERO.gridMajorDelay)
//         // Content.
//         .fromTo("[data-hero='text']", from, { ...to, stagger: HERO.stagger }, 0)
//         .fromTo("[data-hero='visual']", from, to, HERO.imageDelay)
//         // Eyebrow chevrons: sweep left → right while fading in and out, then one static chevron settles.
//         .to(
//           "[data-hero='chevron']",
//           {
//             keyframes: { x: [HERO.chevronFromX, HERO.chevronToX], autoAlpha: [0, 1, 0] },
//             duration: HERO.chevronDuration,
//             stagger: HERO.chevronStagger,
//             ease: GSAP_EASE.linear,
//           },
//           HERO.chevronStart,
//         )
//         .fromTo("[data-hero='chevron-settle']", { autoAlpha: 0, x: HERO.chevronFromX / 2 }, { autoAlpha: 1, x: 0, duration: HERO.chevronSettleDuration }, HERO.chevronSettleAt)
//         .fromTo("[data-hero='cue']", { autoAlpha: 0 }, { autoAlpha: 1, duration: HERO.fadeDuration }, HERO.cueDelay);

//       // Flow arrows: snap each to a horizontal grid line inside the image's height (side-by-side layout) or just
//       // above the image (stacked layout), and stop short of the image's left edge (or at 70% width when stacked).
//       const frame = root.querySelector<HTMLElement>("[data-hero='visual'] figure > div");
//       if (frame) {
//         const rootBox = root.getBoundingClientRect();
//         const box = frame.getBoundingClientRect();
//         const top = box.top - rootBox.top;
//         const left = box.left - rootBox.left;
//         const sideBySide = left > rootBox.width * 0.4;
//         const snap = (y: number) => Math.round(y / HERO.gridCell) * HERO.gridCell;

//         gsap.utils.toArray<HTMLElement>("[data-hero='flow']", root).forEach((flow, i) => {
//           const rowY = sideBySide ? snap(top + box.height * HERO.flowRows[i]) : snap(top) - HERO.gridCell * (i + 1);
//           const endX = (sideBySide ? left - HERO.flowGap : rootBox.width * 0.7) - flow.offsetWidth;
//           const at = HERO.flowStart + i * HERO.flowStagger;
//           gsap.set(flow, { y: rowY - flow.offsetHeight / 2, x: -flow.offsetWidth });
//           tl.to(flow, { x: endX, duration: HERO.flowDuration, ease: GSAP_EASE.inOut }, at)
//             .to(flow, { autoAlpha: 1, duration: HERO.flowFade, ease: GSAP_EASE.linear }, at)
//             .to(flow, { autoAlpha: 0, duration: HERO.flowFade, ease: GSAP_EASE.linear }, at + HERO.flowDuration - HERO.flowFade / 2);
//         });
//       }

//       // Scroll cue bob: a looping animation, so it only runs while the hero is on screen.
//       const bob = gsap.to("[data-hero='cue-icon']", {
//         y: HERO.cueBob,
//         duration: HERO.cueBobDuration,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//         paused: true,
//       });
//       const onScreen = ScrollTrigger.create({
//         trigger: root,
//         start: "top bottom",
//         end: "bottom top",
//         onToggle: (self) => (self.isActive ? bob.play() : bob.pause()),
//       });
//       if (onScreen.isActive) bob.play();
//     }, root);

//     return () => ctx.revert();
//   }, []);

//   /** Scroll so the section after the hero sits just under the fixed header (Lenis when active, native otherwise). */
//   const scrollToNext = () => {
//     const next = rootRef.current?.nextElementSibling;
//     if (!(next instanceof HTMLElement)) return;
//     const offset = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
//     if (lenis) {
//       lenis.scrollTo(next, { offset: -offset });
//       return;
//     }
//     const reduced = window.matchMedia(MQ.reduced).matches;
//     window.scrollTo({ top: next.getBoundingClientRect().top + window.scrollY - offset, behavior: reduced ? "auto" : "smooth" });
//   };

//   return (
//     <section ref={rootRef} aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-32 lg:pt-36 lg:pb-28">
//       {/* Allowed gradient #2: one faint radial glow (a softer tint in light mode via --glow). */}
//       <div aria-hidden="true" className="bg-hero-glow pointer-events-none absolute inset-0 -z-10" />

//       {/* Architectural grid + flow arrows: full width, behind everything, masked out at the sides and bottom. */}
//       <div aria-hidden="true" style={gridStyle} className="hero-grid pointer-events-none absolute inset-0 -z-10">
//         <div data-hero="grid-v" data-hero-item className="hero-grid-v absolute inset-0" />
//         <div data-hero="grid-h" data-hero-item className="hero-grid-h absolute inset-0" />
//         <div data-hero="grid-major" data-hero-item className="hero-grid-v-major absolute inset-0" />
//         <div data-hero="grid-major" data-hero-item className="hero-grid-h-major absolute inset-0" />
//         {FLOWS.map((tone) => (
//           <div key={tone} data-hero="flow" className={cn("absolute top-0 left-0 flex w-24 items-center opacity-0", tone)}>
//             <span className="h-px flex-1 bg-current" />
//             <ChevronRight className="-ml-2 size-3.5 shrink-0" strokeWidth={1.75} />
//           </div>
//         ))}
//       </div>

//       <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] lg:gap-12">
//         <div>
//           <div data-hero="text" data-hero-item className="flex items-center gap-2">
//             <Eyebrow index="00" label={hero.eyebrow} />
//             {/* Opening chevrons (decorative): four sweep and fade, one stays. */}
//             <span aria-hidden="true" className="relative size-4 shrink-0 text-accent">
//               {CHEVRONS.map((i) => (
//                 <ChevronRight key={i} data-hero="chevron" className="absolute inset-0 size-4 opacity-0" strokeWidth={1.75} />
//               ))}
//               <ChevronRight data-hero="chevron-settle" data-hero-item className="absolute inset-0 size-4" strokeWidth={1.75} />
//             </span>
//           </div>

//           {/* Exactly two lines from 640px up (nowrap per line); below that a line may wrap, the structure stays. */}
//           <h1 id="hero-title" data-hero="text" data-hero-item className="text-display mt-6">
//             {hero.titleLines.map((line, i) => (
//               <span key={line} className={cn("block sm:whitespace-nowrap", i === hero.titleLines.length - 1 && "text-accent")}>
//                 {line}
//               </span>
//             ))}
//           </h1>

//           <div data-hero="text" data-hero-item className="mt-7">
//             <p className="max-w-lg text-[1.0625rem] leading-relaxed text-muted-foreground">{hero.subline}</p>
//             <div className="mt-5 flex flex-wrap gap-2">
//               {hero.labels.map((label) => (
//                 <SpecLabel key={label}>{label}</SpecLabel>
//               ))}
//             </div>
//           </div>

//           <div data-hero="text" data-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row">
//             <CtaLink href={hero.primaryCta.href} size="lg" arrow magnetic className="w-full sm:w-auto">
//               {hero.primaryCta.label}
//             </CtaLink>
//             <CtaLink href={hero.secondaryCta.href} size="lg" variant="outline" className="w-full sm:w-auto">
//               {hero.secondaryCta.label}
//             </CtaLink>
//           </div>

//           <div data-hero="text" data-hero-item>
//             <p className="mt-5 text-sm text-muted-foreground">
//               Or call toll-free{" "}
//               <ContactLink kind="call" location="hero" className="hv-text-link inline-flex items-center gap-1.5 font-semibold text-foreground">
//                 <Phone className="size-3.5 text-accent" strokeWidth={1.5} aria-hidden="true" />
//                 {company.tollFree}
//               </ContactLink>
//             </p>
//             <ComplianceLine className="mt-7 border-t border-border pt-4" />
//           </div>
//         </div>

//         <div data-hero="visual" data-hero-item>
//           <FigureFrame caption={hero.caption} frameClassName="aspect-[16/11]">
//             <ImageSlot slot={hero.image} fill priority framed={false} zoomOnHover={false} />
//           </FigureFrame>
//         </div>
//       </div>

//       {/* Scroll cue: GSAP fades the wrapper and bobs the inner icon; the button in between keeps the hv-chip hover. */}
//       <div data-hero="cue" data-hero-item className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
//         <button
//           type="button"
//           onClick={scrollToNext}
//           aria-label="Scroll to the next section"
//           className="hv-chip pointer-events-auto grid size-10 place-items-center rounded-md border border-border bg-background text-link"
//         >
//           <span data-hero="cue-icon" className="block">
//             <ArrowDown className="size-4" strokeWidth={1.5} aria-hidden="true" />
//           </span>
//         </button>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ChevronRight, Phone } from "lucide-react";

import { hero } from "@/content/home";
import { company } from "@/content/company";
import { GSAP_EASE, HERO, MQ } from "@/lib/motion";
import { useLenis } from "@/components/animations/SmoothScrollProvider";
import { images } from "@/content/images";

import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import SpecLabel from "@/components/ui/SpecLabel";
import ContactLink from "@/components/ui/ContactLink";
import ComplianceLine from "@/components/layout/ComplianceLine";

gsap.registerPlugin(ScrollTrigger);

const CHEVRONS = [0, 1, 2, 3];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia(MQ.reduced).matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: GSAP_EASE.out,
        },
      });

      /* Background reveal */
      tl.fromTo(
        "[data-hero='background']",
        {
          scale: 1.06,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.4,
        },
        0
      );

      /* Text reveal */
      tl.fromTo(
        "[data-hero='text']",
        {
          y: HERO.fadeY,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: HERO.fadeDuration,
          stagger: HERO.stagger,
        },
        0.25
      );

      /* Truck reveal */
      tl.fromTo(
        "[data-hero='truck']",
        {
          x: 120,
          y: 30,
          scale: 0.94,
          autoAlpha: 0,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 1.35,
          ease: "power3.out",
        },
        0.2
      );

      /* Eyebrow chevrons */
      tl.to(
        "[data-hero='chevron']",
        {
          keyframes: {
            x: [HERO.chevronFromX, HERO.chevronToX],
            autoAlpha: [0, 1, 0],
          },
          duration: HERO.chevronDuration,
          stagger: HERO.chevronStagger,
          ease: GSAP_EASE.linear,
        },
        HERO.chevronStart
      );

      tl.fromTo(
        "[data-hero='chevron-settle']",
        {
          autoAlpha: 0,
          x: HERO.chevronFromX / 2,
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: HERO.chevronSettleDuration,
        },
        HERO.chevronSettleAt
      );

      /* Scroll cue */
      tl.fromTo(
        "[data-hero='cue']",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: HERO.fadeDuration,
        },
        HERO.cueDelay
      );

      const bob = gsap.to("[data-hero='cue-icon']", {
        y: HERO.cueBob,
        duration: HERO.cueBobDuration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true,
      });

      /* Truck idle float — starts once the entrance animation lands */
      const truckFloat = gsap.to("[data-hero='truck']", {
        y: -14,
        rotate: 0.6,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true,
      });

      tl.call(() => {
        if (onScreen.isActive) truckFloat.play();
      });

      const onScreen = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            bob.play();
            if (tl.progress() === 1) truckFloat.play();
          } else {
            bob.pause();
            truckFloat.pause();
          }
        },
      });

      if (onScreen.isActive) bob.play();
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const next = rootRef.current?.nextElementSibling;

    if (!(next instanceof HTMLElement)) return;

    const offset =
      document
        .querySelector("header")
        ?.getBoundingClientRect().height ?? 0;

    if (lenis) {
      lenis.scrollTo(next, {
        offset: -offset,
      });

      return;
    }

    const reduced = window.matchMedia(MQ.reduced).matches;

    window.scrollTo({
      top:
        next.getBoundingClientRect().top +
        window.scrollY -
        offset,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className="
        relative
        isolate
        min-h-0
        overflow-hidden
        bg-background
        pt-24
        sm:pt-28
        lg:min-h-[820px]
        lg:pt-36
      "
    >
      {/* =====================================================
          INDUSTRIAL BACKGROUND
      ====================================================== */}

      <div
        data-hero="background"
        className="absolute inset-0 -z-30"
      >
        <Image
          src={images["indox-industrial-bg"].src}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />
      </div>

      {/* =====================================================
          OVERLAYS (gradients lightened)
      ====================================================== */}

      {/* Base overlay: navy in dark mode, pale wash in light mode (tokens in app/globals.css) */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          -z-20
          hero-scrim-base
        "
      />

      {/* Scrim behind the left text: dark navy in dark mode, near-white in light mode */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          -z-20
          hero-scrim-side
        "
      />

      {/* Bottom cinematic depth */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          -z-20
          h-[42%]
          hero-scrim-bottom
        "
      />

      {/* =====================================================
          MAIN LAYOUT
      ====================================================== */}

      <div
        className="
          container-x
          relative
          z-10
          grid
          min-h-0
          items-center
          gap-6
          sm:gap-10
          lg:min-h-[620px]
          lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
          lg:gap-4
        "
      >
        {/* =====================================================
            LEFT — TEXT CONTENT
        ====================================================== */}

        <div
          className="
            relative
            z-20
            max-w-[720px]
            pb-8
            pt-2
            sm:pb-16
            sm:pt-4
            lg:pb-24
            lg:pt-0
          "
        >
          {/* Eyebrow */}
          <div
            data-hero="text"
            className="flex items-center gap-3"
          >
            <Eyebrow
              index="00"
              label={hero.eyebrow}
            />

            <span
              aria-hidden="true"
              className="
                relative
                size-4
                shrink-0
                text-accent
              "
            >
              {CHEVRONS.map((i) => (
                <ChevronRight
                  key={i}
                  data-hero="chevron"
                  className="
                    absolute
                    inset-0
                    size-4
                    opacity-0
                  "
                  strokeWidth={1.75}
                />
              ))}

              <ChevronRight
                data-hero="chevron-settle"
                className="
                  absolute
                  inset-0
                  size-4
                "
                strokeWidth={1.75}
              />
            </span>
          </div>

          {/* =================================================
              EXACTLY TWO HEADING ROWS
          ================================================== */}

          <h1
            id="hero-title"
            data-hero="text"
            className="
              mt-5
              text-[2.15rem]
              font-bold
              leading-[1.05]
              tracking-[-0.03em]
              text-heading
              hero-text-shadow

              xs:text-[2.5rem]
              sm:mt-6
              sm:text-[3.8rem]
              sm:leading-[0.98]
              sm:tracking-[-0.045em]
              lg:text-[4.4rem]
              xl:text-[4.9rem]
            "
          >
            <span
              className="
                block
                sm:whitespace-nowrap
              "
            >
              From fuel supply
            </span>

            <span
              className="
                block
                text-accent
                sm:whitespace-nowrap
              "
            >
              to fuel intelligence
            </span>
          </h1>

          {/* Description */}
          <div
            data-hero="text"
            className="mt-7"
          >
            <p
              className="
                max-w-[600px]
                text-[1.05rem]
                leading-[1.75]
                text-foreground/90
                hero-text-shadow
                sm:text-[1.1rem]
              "
            >
              {hero.subline}
            </p>

            {/* Labels */}
            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              {hero.labels.map((label) => (
                <SpecLabel key={label} className="bg-background/60 text-foreground">
                  {label}
                </SpecLabel>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div
            data-hero="text"
            className="
              mt-9
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >
            <CtaLink
              href={hero.primaryCta.href}
              size="lg"
              arrow
              magnetic
              className="
                w-full
                bg-primary
                text-primary-foreground
                sm:w-auto
              "
            >
              {hero.primaryCta.label}
            </CtaLink>

            <CtaLink
              href={hero.secondaryCta.href}
              size="lg"
              variant="outline"
              className="
                w-full
                bg-background/50
                backdrop-blur-md
                sm:w-auto
              "
            >
              {hero.secondaryCta.label}
            </CtaLink>
          </div>

          {/* Contact */}
          <div data-hero="text">
            <p
              className="
                mt-6
                text-sm
                text-foreground/80
              "
            >
              Or call toll-free{" "}

              <ContactLink
                kind="call"
                location="hero"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  font-semibold
                  text-foreground
                "
              >
                <Phone
                  className="
                    size-3.5
                    text-accent
                  "
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                {company.tollFree}
              </ContactLink>
            </p>

            <ComplianceLine
              className="
                mt-7
                border-t
                border-border-strong
                pt-4
                text-foreground/75
              "
            />
          </div>
        </div>

        {/* =====================================================
            RIGHT — TRUCK
        ====================================================== */}

        <div
          data-hero="truck"
          className="
            pointer-events-none
            relative
            z-10

            mx-auto
            h-[220px]
            w-full
            max-w-[420px]

            xs:h-[260px]

            sm:mx-0
            sm:h-[430px]
            sm:max-w-none

            lg:h-[610px]
            lg:w-[125%]

            xl:h-[670px]
            xl:w-[130%]
          "
        >
          <Image
            src={images["indox-truck-3d"].src}
            alt={images["indox-truck-3d"].alt}
            fill
            priority
            sizes="
              (max-width: 1024px) 100vw,
              60vw
            "
            className="
              object-contain
              object-center
              lg:object-right-bottom
              hero-truck-shadow
            "
          />
        </div>
      </div>

      {/* =====================================================
          TRUCK FLOOR SHADOW
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[70px]
          right-[-2%]
          z-[1]
          hidden
          h-24
          w-[50%]
          rounded-[100%]
          hero-floor
          blur-3xl
          lg:block
        "
      />

      {/* =====================================================
          SCROLL CUE
      ====================================================== */}

      <div
        data-hero="cue"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-5
          z-30
          flex
          justify-center
        "
      >
        <button
          type="button"
          onClick={scrollToNext}
          aria-label="Scroll to the next section"
          className="
            pointer-events-auto
            grid
            size-10
            place-items-center
            rounded-md
            border
            border-border-strong
            bg-background/70
            text-foreground
            backdrop-blur-md
            transition
            hover:bg-elevated
          "
        >
          <span
            data-hero="cue-icon"
            className="block"
          >
            <ArrowDown
              className="size-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </section>
  );
}