/** Cookie-consent state, persisted in localStorage. Analytics only loads after "accepted". */
export type ConsentState = "accepted" | "declined";

const STORAGE_KEY = "indox-cookie-consent";
export const CONSENT_EVENT = "indox:consent-change";

export function readConsent(): ConsentState | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage unavailable (private mode) — consent applies to this page view only.
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: value }));
}
