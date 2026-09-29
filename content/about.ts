import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import { company } from "@/content/company";

/**
 * /about/ copy (PRD §8.2). Company facts (legal name, CIN, GSTIN, office, leadership, licences) come from
 * content/company.ts only.
 *
 * Section numbers are assigned by app/about/page.tsx from the sections actually shown (Leadership and Licences
 * are hidden until data exists), so the eyebrows never skip a number.
 *
 * DRAFT — the PRD names these sections but no client text was supplied for Our story, Vision, Mission, Core Values
 * or Our Commitment. The wording below is derived from the PRD (positioning, core flow, audience) with no dates,
 * numbers, clients or certifications. Replace it with the client's own text when it arrives.
 */

export type AboutCallout = {
  label: string;
  text: string;
  /** Marker position on the image, in % of its width / height. Adjust when the real photo lands. */
  x: number;
  y: number;
};

export const about = {
  seo: {
    title: "About IndoX Energy | Story, Quality & Safety, Company Profile",
    description:
      "Who IndoX Energy is: our story, vision and mission, core values, nine quality and safety commitments and company profile. Fuel supply and fuel intelligence for business.",
  },

  hero: {
    eyebrow: "About us",
    title: "Powering businesses with reliable energy solutions",
    intro:
      "IndoX Energy supplies diesel and fuel infrastructure to businesses in India, and builds the technology that shows where every litre goes. One partner from source to report, for eligible customers and subject to applicable regulations.",
    image: "about-hero" as ImageSlotKey,
    caption: "FIG. A-00 — IndoX Energy on site",
  },

  story: {
    eyebrow: "Our story",
    title: "From fuel supply to fuel intelligence",
    paragraphs: [
      "Most businesses buy diesel from one vendor, store it in a tank somebody else installed and track it in a paper register. When fuel runs short or goes missing, nobody can say where it went.",
      "IndoX Energy was set up to close that gap. We supply fuel from authorized sources, deliver it to sites through a metered process, and install the tanks, dispensing units and monitoring that keep a record of every litre after it arrives.",
      "That work now runs in six steps: source, deliver, store, dispense, monitor and analyze. Alongside diesel, we build EV charging infrastructure for sites that are adding electric vehicles.",
    ],
    image: "about-story" as ImageSlotKey,
    caption: "FIG. A-01 — Delivery check at a customer site",
  },

  visionMission: {
    eyebrow: "Vision & mission",
    title: "Where we are headed",
    cards: [
      {
        icon: "route" as IconName,
        label: "Our vision",
        text: "A fuel supply chain where every business knows how much fuel it has, where it went and what it cost, and can add cleaner energy as it grows.",
      },
      {
        icon: "workflow" as IconName,
        label: "Our mission",
        text: "Deliver fuel reliably and safely to eligible businesses, and give them the tanks, equipment and data to manage it without guesswork, subject to applicable regulations.",
      },
    ],
  },

  coreValues: {
    eyebrow: "Core values",
    title: "Six values we work by",
    values: [
      { icon: "shieldCheck" as IconName, title: "Safety", text: "Fuel handled, stored and dispensed as per applicable safety requirements, every time." },
      { icon: "clock" as IconName, title: "Reliability", text: "Deliveries that arrive when planned, so sites keep working." },
      { icon: "fileText" as IconName, title: "Transparency", text: "Metered quantities, clear documents and records customers can check." },
      { icon: "cpu" as IconName, title: "Technology", text: "Sensors, dashboards and alerts that replace guesswork with data." },
      { icon: "headset" as IconName, title: "Service", text: "One team to call, from the first quote to the monthly report." },
      { icon: "chartLine" as IconName, title: "Growth", text: "Building alongside customers as their sites, fleets and energy needs grow." },
    ],
  },

  leadership: { eyebrow: "Leadership", title: "The people behind IndoX Energy", linkedinLabel: "LinkedIn profile" },

  qualitySafety: {
    eyebrow: "Quality & safety",
    title: "Nine commitments on every supply",
    description: "How fuel is handled, from where it comes from to how it reaches your equipment. Each point applies as per applicable regulations.",
    points: [
      { title: "Authorized sourcing", text: "Fuel drawn only from authorized sources." },
      { title: "Appropriate product specifications", text: "Each product supplied to its applicable specification." },
      { title: "Proper transportation practices", text: "Fuel moved as per applicable transport requirements." },
      { title: "Safe storage", text: "Storage installed to applicable safety requirements." },
      { title: "Controlled dispensing", text: "Metered dispensing, recorded against the receiving asset where set up." },
      { title: "Delivery documentation", text: "Documents for every delivery, showing the metered quantity." },
      { title: "Equipment inspection", text: "Tanks, dispensers and bowsers inspected as part of operations." },
      { title: "Applicable safety standards", text: "Work carried out to the safety standards that apply to each site." },
      { title: "Regulatory compliance", text: "Supply and installation subject to applicable laws, approvals and permissions." },
    ],
    image: "about-quality-bowser" as ImageSlotKey,
    caption: "FIG. A-05 — Safety fittings on an IndoX bowser",
    legendTitle: "What the markers show",
    callouts: [
      { label: "Fire extinguisher", text: "Carried on board for quick access.", x: 81, y: 37 },
      { label: "Hazmat panel", text: "Hazard identification panel for the product carried.", x: 65, y: 18 },
      { label: "Metered dispensing unit", text: "Measures each fill delivered on site.", x: 57, y: 50 },
      { label: "Valve box", text: "Houses the outlet valves, closed and secured in transit.", x: 62, y: 78 },
    ] as AboutCallout[],
  },

  licences: { eyebrow: "Licences & certifications", title: "Licences and certifications", numberLabel: "No.", viewLabel: "View document" },

  commitment: {
    eyebrow: "Our commitment",
    title: "What customers can count on",
    points: [
      { title: "Reliable supply", text: "Planned deliveries from authorized sources, subject to applicable regulations." },
      { title: "Smart technology", text: "Monitoring and reporting that make fuel visible." },
      { title: "Operational transparency", text: "Quantities, documents and records customers can check." },
      { title: "Safety", text: "Applicable safety requirements followed at every step." },
      { title: "Customer support", text: "A team that answers the phone and follows through." },
      { title: "Long-term partnerships", text: "Set up for ongoing supply, not one-off orders." },
    ],
  },

  companyProfile: {
    eyebrow: "Company profile",
    title: "Company profile",
    pending: "To be added",
    labels: { legalName: "Legal name", cin: "CIN", gstin: "GSTIN", office: "Registered office" },
    download: "Download company profile (PDF)",
    /** Rows that are not company-register facts (safe wording from the PRD). Register facts come from company.ts. */
    rows: [
      { label: "Industry", value: "Energy: fuel supply, fuel infrastructure and EV charging" },
      { label: "Core business", value: "Fuel supply, site delivery, storage, dispensing and fuel monitoring; EV charging infrastructure" },
      {
        label: "Customer base",
        value:
          "Commercial and industrial businesses: construction and infrastructure, mining, manufacturing, logistics and fleet, telecom, agriculture, commercial and institutional",
      },
      { label: "Service model", value: "One partner across supply, infrastructure and fuel intelligence" },
      { label: "Geographic vision", value: "Pan-India, expanding city by city as coverage is confirmed" },
      { label: "Positioning", value: company.positioning },
    ],
  },
};