import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/content/images";
import { quoteHref } from "@/content/navigation";

/**
 * /ev-charging/ copy (PRD §8.7). Rules: qualitative wording only — never kW ratings, charging times, prices,
 * connector counts, subsidies, savings or ROI. Keep "subject to site conditions, approvals and applicable
 * regulations" on installation claims.
 */

/** Value the quote form's solution multi-select uses for EV (see content/contact.ts `solutionOptions`). */
export const EV_SERVICE = "ev-charging";

export const ev = {
  name: "EV Charging Solutions",
  seo: {
    title: "EV Charging Solutions for Businesses | Survey to AMC | IndoX Energy",
    description:
      "AC and DC EV charger installation for highways, hotels, housing societies, fleet depots and parking: site survey, load planning, installation, commissioning and AMC.",
  },
  hero: {
    eyebrow: "EV Charging",
    title: "Powering the transition to electric mobility",
    promise:
      "We survey your site, plan the electrical load, install AC or DC chargers and look after them afterwards, subject to site conditions, approvals and applicable regulations.",
    cta: { label: "Book a Site Survey", href: quoteHref({ service: EV_SERVICE }) },
    call: "Call",
    image: "ev-hero" as ImageSlotKey,
    caption: "FIG. EV-00 — Charger at a host site",
    /** MiniQuoteForm: must match an entry in requirementOptions (content/common.ts). */
    requirement: "EV Charging Solutions",
    formTitle: "Get a quote for EV charging",
  },
  solutions: {
    eyebrow: "Our EV solutions",
    title: "Chargers, software and support",
    description: "Everything a host site needs, from the charger on the wall to the support after it goes live.",
    items: [
      { icon: "plug" as IconName, title: "AC chargers", text: "For places where vehicles stay parked for hours: offices, hotels and housing societies." },
      { icon: "zap" as IconName, title: "DC fast chargers", text: "For quick top-ups where vehicles stop briefly: highways and fleet turnarounds." },
      { icon: "cloud" as IconName, title: "OCPP integration", text: "Chargers on the open OCPP protocol, so they connect to a management platform." },
      { icon: "qrCode" as IconName, title: "RFID, QR and digital payments", text: "Drivers start and pay at the charger by RFID card, QR code or digital payment." },
      { icon: "dashboard" as IconName, title: "Monitoring platform", text: "Charger status, sessions and usage on one dashboard." },
      { icon: "headset" as IconName, title: "AMC and technical support", text: "Maintenance under an annual contract, and support when a charger needs attention." },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "From site survey to AMC",
    stepLabel: "Step",
    steps: [
      { title: "Site Survey", text: "We visit to check the parking layout, access and the existing electrical supply." },
      { title: "Load & Electrical Planning", text: "We work out the load and plan the supply, cabling and charger mix." },
      { title: "Civil & Electrical Work", text: "Foundations, cable routes and electrical works are completed to the plan." },
      { title: "Installation", text: "Chargers are mounted, connected and configured." },
      { title: "Testing & Commissioning", text: "Each charger is tested and commissioned before handover, subject to approvals." },
      { title: "AMC", text: "Scheduled maintenance and support keep chargers working after handover." },
    ],
  },
  locations: {
    eyebrow: "Suitable locations",
    title: "Where chargers work well",
    items: [
      { icon: "route" as IconName, label: "Highways", text: "Quick top-ups on long drives." },
      { icon: "building" as IconName, label: "Commercial complexes", text: "Charging for visitors and staff." },
      { icon: "hotel" as IconName, label: "Hotels & restaurants", text: "A reason for guests to stop and stay." },
      { icon: "fuel" as IconName, label: "Petrol pumps", text: "EV charging beside an existing forecourt." },
      { icon: "truck" as IconName, label: "Fleet depots", text: "Overnight and between-shift charging." },
      { icon: "house" as IconName, label: "Residential societies", text: "Shared chargers in residents' parking." },
      { icon: "factory" as IconName, label: "Industrial facilities", text: "Charging for staff and site vehicles." },
      { icon: "parking" as IconName, label: "Parking", text: "Chargers in paid or public parking." },
    ],
  },
  acdc: {
    eyebrow: "AC vs DC",
    title: "Which charger fits your site",
    description: "A plain comparison to start the conversation. The right mix depends on your site, supply and vehicles; we confirm it after the survey.",
    caption: "AC and DC chargers compared in plain terms",
    featureLabel: "Compare",
    columns: [
      { key: "ac", label: "AC charger", image: "ev-ac" as ImageSlotKey },
      { key: "dc", label: "DC fast charger", image: "ev-dc" as ImageSlotKey },
    ],
    rows: [
      { label: "Speed", ac: "Slower", dc: "Faster" },
      { label: "Best use", ac: "Long stays and overnight charging", dc: "Quick top-ups between trips" },
      { label: "Typical location", ac: "Offices, hotels, residential societies, parking", dc: "Highways, fleet depots, petrol pumps, busy commercial sites" },
      { label: "Typical dwell time", ac: "Several hours or overnight", dc: "A short stop" },
    ],
    note: "Indicative only. Charger ratings, charging times and costs depend on the site, the supply available and the vehicle, and are confirmed after the survey.",
  },
  faqs: {
    eyebrow: "FAQs",
    title: "Common questions",
    items: [
      {
        q: "Do I need a site survey before a quote?",
        a: "Yes. The survey shows the parking layout, access and the electrical supply available, which decide the charger type and how many a site can take.",
      },
      {
        q: "AC or DC: which should I choose?",
        a: "It depends on how long vehicles stay. AC suits long stays and overnight parking; DC suits quick top-ups. Many sites use a mix, and we recommend one after the survey.",
      },
      {
        q: "Who handles approvals?",
        a: "The approvals needed depend on your location, supply and site. We go through them with you during planning, and installation goes ahead subject to those approvals and applicable regulations.",
      },
      { q: "How do drivers pay?", a: "Chargers can accept RFID cards, QR codes and digital payments, depending on the setup chosen for the site." },
      {
        q: "What happens after installation?",
        a: "An AMC covers scheduled maintenance and technical support, and the monitoring platform shows charger status and usage.",
      },
      { q: "Can you install chargers at a petrol pump or fleet depot?", a: "Yes, both are common host sites. The survey confirms space, access and supply for each one." },
    ],
  },
  cta: {
    eyebrow: "Host a charger",
    title: "Host an IndoX charger.",
    description: "Tell us about your site. We start with a survey and come back with a plan.",
    primaryLabel: "Book a Site Survey",
  },
};
