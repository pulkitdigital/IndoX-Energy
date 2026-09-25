/** Conversion events (PRD §6). Safe to call when analytics is not loaded — it no-ops. */
export type ConversionEvent = "call_click" | "whatsapp_click" | "quote_cta_click" | "generate_lead";

type Gtag = (command: "event" | "config" | "js", target: string | Date, params?: Record<string, unknown>) => void;
type Fbq = (command: "track" | "trackCustom" | "init", event: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
    dataLayer?: unknown[];
  }
}

const META_EVENT: Record<ConversionEvent, string> = {
  call_click: "Contact",
  whatsapp_click: "Contact",
  quote_cta_click: "ViewContent",
  generate_lead: "Lead",
};

export function trackEvent(event: ConversionEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  window.fbq?.("track", META_EVENT[event], params);
}
