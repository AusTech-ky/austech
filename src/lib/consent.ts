/**
 * Cookie consent, stored in the visitor's browser.
 *
 * Nothing optional runs on the site today, so "essential" and "all" behave the
 * same. Anything added later that isn't strictly necessary (analytics, pixels,
 * embeds) must check `hasConsent()` first and listen for CONSENT_EVENT.
 */

export type Consent = "essential" | "all";

export const CONSENT_KEY = "austech-consent";
export const CONSENT_EVENT = "austech:consent";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "essential" || v === "all" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked (private mode): the choice lasts for this page view only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** True only when the visitor accepted optional cookies. */
export function hasConsent() {
  return readConsent() === "all";
}
