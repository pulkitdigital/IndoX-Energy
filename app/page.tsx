import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { marqueeItems } from "@/content/home";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/layout/TrustStrip";
import OurApproachFlow from "@/components/home/OurApproachFlow";
import Marquee from "@/components/animations/Marquee";
import ProductGrid from "@/components/home/ProductGrid";
import ServiceGrid from "@/components/home/ServiceGrid";
import TechDashboardPreview from "@/components/home/TechDashboardPreview";
import EVTeaser from "@/components/home/EVTeaser";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import EndToEndTeaser from "@/components/home/EndToEndTeaser";
import PanIndiaMap from "@/components/home/PanIndiaMap";
import WhyIndox from "@/components/home/WhyIndox";
import BlogPreview from "@/components/home/BlogPreview";
import QuoteCTABand from "@/components/layout/QuoteCTABand";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "IndoX Energy | Bulk Diesel Supply, Site Delivery & Fuel Monitoring in India",
    description:
      "Diesel from authorized sources, metered delivery to your site, smart storage tanks with ATG, dispensing, fuel monitoring and EV charging. One partner, one record.",
    path: "/",
  });
}

/** Home — 13 sections in PRD §8.1 order (+ the text marquee between Approach and Products). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <OurApproachFlow />
      <Marquee items={marqueeItems} label="Source, Deliver, Store, Dispense, Monitor, Analyze" />
      <ProductGrid />
      <ServiceGrid />
      <TechDashboardPreview />
      <EVTeaser />
      <IndustriesGrid />
      <EndToEndTeaser />
      <PanIndiaMap />
      <WhyIndox />
      <BlogPreview />
      <QuoteCTABand />
    </>
  );
}
