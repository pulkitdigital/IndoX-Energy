/**
 * Conversion events (TRD §8). Safe to call before consent / when no IDs are set — it no-ops.
 *
 * | Event          | GA4            | Meta    | Google Ads                          |
 * |----------------|----------------|---------|-------------------------------------|
 * | lead_submit    | generate_lead  | Lead    | conversion (NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL) |
 * | call_click     | click_call     | Contact | secondary — add a label when the client creates one |
 * | whatsapp_click | click_whatsapp | Contact | secondary — add a label when the client creates one |
 */
export type AnalyticsEvent = "lead_submit" | "call_click" | "whatsapp_click";

type Gtag = (command: "event" | "config" | "js", target: string | Date, params?: Record<string, unknown>) => void;
type Fbq = (command: "track" | "trackCustom" | "init", event: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
    dataLayer?: unknown[];
  }
}

const GA4_EVENT: Record<AnalyticsEvent, string> = {
  lead_submit: "generate_lead",
  call_click: "click_call",
  whatsapp_click: "click_whatsapp",
};

const META_EVENT: Record<AnalyticsEvent, string> = {
  lead_submit: "Lead",
  call_click: "Contact",
  whatsapp_click: "Contact",
};

const ADS_ID = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim();
const ADS_LABEL: Partial<Record<AnalyticsEvent, string>> = {
  lead_submit: (process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL ?? "").trim(),
};

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", GA4_EVENT[event], params);
  window.fbq?.("track", META_EVENT[event], params);
  const label = ADS_LABEL[event];
  if (ADS_ID && label) window.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${label}` });
}
