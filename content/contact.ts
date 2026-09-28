import type { ImageSlotKey } from "@/content/images";
import { RESPONSE_HOURS } from "@/content/company";
import { industries } from "@/content/industries";
import { products } from "@/content/products";
import { services } from "@/content/services";

/** /contact/ copy + QuoteFormFull options (PRD §8.11). Contact facts (numbers, email, office) come from content/company.ts. */

export type Option = { value: string; label: string };

/** Step 1 "Solution / service" (multi-select). Values are what `?service=` accepts. */
export const solutionOptions: Option[] = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "ev-charging", label: "EV Charging Solutions" },
  { value: "end-to-end", label: "End-to-End Energy Infrastructure" },
];

/** Step 1 "Product" (single select, optional). Values are what `?product=` accepts. */
export const productOptions: Option[] = products.map((p) => ({ value: p.slug, label: p.name }));

/** Step 1 "Estimated monthly volume (litres)": ranges for the enquiry only, not a minimum order. */
export const volumeOptions: string[] = [
  "Under 5,000 L",
  "5,000 – 20,000 L",
  "20,000 – 50,000 L",
  "50,000 – 1,00,000 L",
  "Over 1,00,000 L",
  "Not sure yet",
  "Not applicable (EV / equipment only)",
];

/** Step 2 "Industry" (optional): the 7 industries. */
export const industryOptions: string[] = industries.map((i) => i.name);

/** "Our team calls back within X working hours" only when X is confirmed in company.ts; never invented. */
export const responsePromise =
  RESPONSE_HOURS === null ? "Our team will call you back shortly." : `Our team calls back within ${RESPONSE_HOURS} working hours.`;

export const contact = {
  seo: {
    title: "Contact IndoX Energy | Get a Quote for Diesel Supply & Fuel Solutions",
    description:
      "Request a quote for diesel supply, storage tanks, dispensing, fuel monitoring or EV charging. Call toll-free, message on WhatsApp or use the 2-step form.",
  },
  hero: {
    eyebrow: "Contact",
    title: "Let's power your business.",
    intro: "Tell us what you need, where and how much. Our team reviews every request and comes back with a plan and a quote.",
    image: "contact-hero" as ImageSlotKey,
    caption: "FIG. C-00 — Site delivery",
  },
  cards: {
    eyebrow: "Reach us directly",
    tollFree: { title: "Toll-free", text: "Call us" },
    whatsapp: { title: "WhatsApp", text: "Message us", pending: "Number to be added" },
    email: { title: "Email", text: "Write to us" },
    office: { title: "Registered office", pending: "Address to be added" },
  },
  coverage: {
    index: "02",
    eyebrow: "Coverage",
    title: "Check if we deliver to your city",
    description: "Enter a city or PIN code. If it is not listed yet, send the form anyway and our team will confirm.",
  },
  office: {
    index: "03",
    eyebrow: "Office",
    title: "Find us",
    openInMaps: "Open in Maps",
    mapTitle: "Map of the IndoX Energy registered office",
    placeholder: "The office address and map will appear here once confirmed.",
  },
};

/** QuoteFormFull labels (2 steps, PRD §8.11 table). */
export const quoteForm = {
  index: "01",
  eyebrow: "Quote request",
  title: "Get a quote",
  stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
  steps: ["What do you need?", "About you"],
  optional: "(optional)",
  fields: {
    solutions: { label: "Solution / service", hint: "Choose all that apply." },
    product: { label: "Product", placeholder: "Select a product" },
    volume: { label: "Estimated monthly volume (litres)", placeholder: "Select a range" },
    location: { label: "Delivery city / PIN", placeholder: "e.g. Pune or 411001" },
    name: { label: "Your name", placeholder: "Full name" },
    company: { label: "Company", placeholder: "Company name" },
    phone: { label: "Mobile number", placeholder: "10-digit mobile" },
    email: { label: "Email", placeholder: "name@company.com" },
    industry: { label: "Industry", placeholder: "Select your industry" },
    message: { label: "Message", placeholder: "Site details, timelines, anything else we should know" },
    consent: { before: "I agree to be contacted about this request and accept the", link: "Privacy Policy", after: "." },
  },
  next: "Next",
  back: "Back",
  submit: "Send request",
  sending: "Sending…",
  errors: {
    solutions: "Choose at least one solution or service.",
    volume: "Choose an estimated monthly volume.",
    location: "Enter the delivery city or a 6-digit PIN.",
    name: "Enter your name.",
    phone: "Enter a valid 10-digit Indian mobile number.",
    email: "Enter a valid email address, or leave it empty.",
    message: "Keep the message under 2,000 characters.",
    consent: "Please accept to send the request.",
  },
};
