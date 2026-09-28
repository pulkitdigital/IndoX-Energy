import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { REVEAL } from "@/lib/motion";
import { about } from "@/content/about";
import { leadership, licences } from "@/content/company";
import { ROUTES } from "@/content/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComplianceLine from "@/components/layout/ComplianceLine";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import Commitment from "@/components/about/Commitment";
import CompanyProfileTable from "@/components/about/CompanyProfileTable";
import CoreValues from "@/components/about/CoreValues";
import Leadership from "@/components/about/Leadership";
import Licences from "@/components/about/Licences";
import QualitySafety from "@/components/about/QualitySafety";
import VisionMission from "@/components/about/VisionMission";
import Eyebrow from "@/components/ui/Eyebrow";
import FigureFrame from "@/components/ui/FigureFrame";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...about.seo, path: ROUTES.about });
}

type SectionKey = "story" | "vision" | "values" | "leadership" | "quality" | "licences" | "commitment" | "profile";

/**
 * About Us (PRD §8.2), sections in order: Hero → Our story → Vision & Mission → Core Values → Leadership →
 * Quality & Safety (#quality-safety) → Licences → Our Commitment → Company Profile → QuoteCTABand.
 * Leadership and Licences are data-driven and hidden until content/company.ts has real entries; section
 * numbers are assigned from what is actually shown. Organization JSON-LD comes from the root layout.
 */
export default function AboutPage() {
  const shown: SectionKey[] = [
    "story",
    "vision",
    "values",
    ...(leadership.length ? (["leadership"] as const) : []),
    "quality",
    ...(licences.length ? (["licences"] as const) : []),
    "commitment",
    "profile",
  ];
  const n = (key: SectionKey) => String(shown.indexOf(key) + 1).padStart(2, "0");
  const { hero, story } = about;

  return (
    <>
      <section aria-labelledby="about-hero-title" className="pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "About Us", href: ROUTES.about },
            ]}
          />
          <ScrollReveal className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <Eyebrow index="00" label={hero.eyebrow} />
              <h1 id="about-hero-title" className="text-display mt-6">
                {hero.title}
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">{hero.intro}</p>
              <ComplianceLine className="mt-6 border-t border-border pt-4" />
            </div>
          </ScrollReveal>
          <ScrollReveal className="mt-12" delay={REVEAL.stagger}>
            <FigureFrame caption={hero.caption} frameClassName="aspect-[16/9]">
              <ImageSlot slot={hero.image} fill priority framed={false} zoomOnHover={false} />
            </FigureFrame>
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="story-title" className="section-y border-t border-border">
        <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading id="story-title" index={n("story")} eyebrow={story.eyebrow} title={story.title} />
            <ScrollReveal className="mt-6 grid max-w-xl gap-4 text-[1.0625rem] leading-relaxed">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </ScrollReveal>
          </div>
          <ScrollReveal className="lg:col-span-6" delay={REVEAL.stagger}>
            <FigureFrame caption={story.caption} frameClassName="aspect-[4/3]">
              <ImageSlot slot={story.image} fill framed={false} zoomOnHover={false} />
            </FigureFrame>
          </ScrollReveal>
        </div>
      </section>

      <VisionMission index={n("vision")} />
      <CoreValues index={n("values")} />
      <Leadership index={n("leadership")} />
      <QualitySafety index={n("quality")} />
      <Licences index={n("licences")} />
      <Commitment index={n("commitment")} />
      <CompanyProfileTable index={n("profile")} />
      <QuoteCTABand index={String(shown.length + 1).padStart(2, "0")} />
    </>
  );
}
