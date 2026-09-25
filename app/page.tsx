import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import OurApproachFlow from "@/components/sections/OurApproachFlow";
import ProductGrid from "@/components/sections/ProductGrid";
import ServiceGrid from "@/components/sections/ServiceGrid";
import TechDashboardPreview from "@/components/sections/TechDashboardPreview";
import EVTeaser from "@/components/sections/EVTeaser";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import EcosystemTeaser from "@/components/sections/EcosystemTeaser";
import PanIndiaMap from "@/components/sections/PanIndiaMap";
import WhyIndox from "@/components/sections/WhyIndox";
import BlogPreview from "@/components/sections/BlogPreview";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import Marquee from "@/components/animations/Marquee";
import { approachIntro, hero } from "@/content/home";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "IndoX Energy | Diesel Supply, Smart Fuel Storage & Fuel Management in India",
    description:
      "Bulk and doorstep diesel supply from authorized sources, smart storage tanks, metered dispensing, IoT fuel monitoring and EV charging — one partner from fuel supply to fuel intelligence.",
    path: "/",
    absoluteTitle: true,
  });
}

/** Home — 13 sections in PRD §7 order. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <OurApproachFlow />
      <Marquee items={hero.chain} label={approachIntro.eyebrow} />
      <ProductGrid />
      <ServiceGrid />
      <TechDashboardPreview />
      <EVTeaser />
      <IndustriesGrid />
      <EcosystemTeaser />
      <PanIndiaMap />
      <WhyIndox />
      <BlogPreview />
      <QuoteCTABand />
    </>
  );
}
