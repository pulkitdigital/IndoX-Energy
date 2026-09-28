import { company } from "@/content/company";
import { trackEvent } from "@/lib/analytics";

/**
 * The ONE place forms are submitted (TRD §7). Client-side POST to Web3Forms — no backend, no API route.
 * Adds the access key, subject, from_name and form_source (page URL + form name), drops honeypot hits,
 * fires `lead_submit` on success and leaves a short summary in sessionStorage for /thank-you/.
 * Never throws: callers get { ok: false } and show the phone / WhatsApp fallback without clearing input.
 */

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "").trim();
/** sessionStorage key read by /thank-you/. */
export const LEAD_SUMMARY_KEY = "indox-lead-summary";
/** Set once the /thank-you/ backup conversion has fired for the current lead (guards refreshes). */
export const CONVERSION_FIRED_KEY = "indox-lead-conversion-fired";

export type FormName = "mini_quote" | "quote_full" | "newsletter";

export type SubmitFormInput = {
  form: FormName;
  /** Email subject in the IndoX inbox. */
  subject: string;
  /** Field values as they should appear in the email. */
  fields: Record<string, string>;
  /** Requirement / product for the analytics event and the thank-you summary. */
  requirement?: string;
  /** Value of the hidden honeypot input; anything non-empty means a bot. */
  honeypot?: string;
  /** Shown on /thank-you/ (name, city) and used to pick related articles (topics = slugs or page names). */
  summary?: { name?: string; city?: string; topics?: string[] };
};

/** What /thank-you/ reads back from sessionStorage. */
export type LeadSummary = { form: FormName; requirement: string; name: string; city: string; topics: string[] };

export type SubmitFormResult = { ok: true } | { ok: false; reason: "not_configured" | "network" | "rejected" };

export async function submitForm({ form, subject, fields, requirement, honeypot, summary }: SubmitFormInput): Promise<SubmitFormResult> {
  // Honeypot filled: report success to the bot, send nothing, track nothing.
  if (honeypot) return { ok: true };
  if (!ACCESS_KEY) return { ok: false, reason: "not_configured" };

  const payload = {
    access_key: ACCESS_KEY,
    subject,
    from_name: `${company.name} website`,
    form_source: `${window.location.href} · ${form}`,
    ...fields,
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data: { success?: boolean } = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) return { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  }

  // Newsletter signups are not leads: no conversion event, and the thank-you summary is left untouched.
  if (form === "newsletter") return { ok: true };

  trackEvent("lead_submit", { form, requirement });
  try {
    const stored: LeadSummary = {
      form,
      requirement: requirement ?? "",
      name: summary?.name ?? "",
      city: summary?.city ?? "",
      topics: summary?.topics ?? [],
    };
    sessionStorage.setItem(LEAD_SUMMARY_KEY, JSON.stringify(stored));
    // A new lead may fire the thank-you backup conversion once (see ThankYouConversion).
    sessionStorage.removeItem(CONVERSION_FIRED_KEY);
  } catch {
    // Storage blocked (private mode etc.) — the thank-you page just skips the summary.
  }
  return { ok: true };
}
