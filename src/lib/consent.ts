"use client";

import { useSyncExternalStore } from "react";

// Cookie and embed preferences. Third-party embedded content (the Google Map) and analytics (Google Analytics
// via Google Tag Manager) are opt-in: off until the visitor allows them. Marketing (the Meta Pixel) is
// opt-OUT instead, by the business owner's explicit choice: it runs by default, and a visitor can turn it off
// here or in the cookie notice. This is a real compliance tradeoff, not a neutral default -- see the long
// comment on the `marketing` field below before changing it again. Whatever the current state is, it's kept
// in the browser's local storage (a "necessary" item: without it the choice/default could not be kept).

export type ConsentChoice = "all" | "necessary" | "rejected" | "custom";

export interface Consent {
  /** Allow third-party embedded content (Google Maps). Opt-in: false until the visitor allows it. */
  embeds: boolean;
  /** Allow Google Analytics (GA4, via Google Tag Manager) to load. Opt-in: false until the visitor allows it. */
  analytics: boolean;
  /**
   * Allow the Meta Pixel to load. Opt-OUT: true by default (see DEFAULT below), so the Pixel fires for every
   * visitor who hasn't explicitly turned it off, not only those who clicked "Accept all". This was a deliberate
   * business decision (notice-and-opt-out), made after being told explicitly that strict prior opt-in meant
   * the Pixel almost never fired and Meta Ads measurement stayed empty.
   *
   * Known residual gap, stated plainly rather than glossed over: opt-out is not a valid consent mechanism
   * under GDPR/ePrivacy for advertising cookies -- EU/UK/EEA visitors are supposed to see a true prior opt-in
   * before a marketing pixel like this runs. This codebase has no visitor-location detection, so there is no
   * carve-out here for those visitors; they get the same opt-out default as everyone else. That gap was
   * accepted knowingly, not overlooked -- revisit with real legal advice before treating it as closed.
   */
  marketing: boolean;
  /** When the choice was made; null until the visitor chooses (or until they just let the default stand),
   * which is when the cookie notice is shown. */
  at: string | null;
  choice: ConsentChoice | null;
}

const KEY = "tg-cookie-preferences";
// marketing: true here (not false) is what makes it opt-out -- see the field comment on `marketing` above.
// Exported so a test can assert this default directly, without duplicating it.
export const DEFAULT: Consent = { embeds: false, analytics: false, marketing: true, at: null, choice: null };
const listeners = new Set<() => void>();
let cache: { raw: string | null; value: Consent } | null = null;

function read(): Consent {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  if (cache && cache.raw === raw) return cache.value;
  let value = DEFAULT;
  if (raw) {
    try {
      const v = JSON.parse(raw);
      if (typeof v.embeds === "boolean")
        value = {
          embeds: v.embeds,
          analytics: typeof v.analytics === "boolean" ? v.analytics : false,
          marketing: typeof v.marketing === "boolean" ? v.marketing : false,
          at: typeof v.at === "string" ? v.at : null,
          choice: ["all", "necessary", "rejected", "custom"].includes(v.choice) ? v.choice : null,
        };
    } catch {}
  }
  cache = { raw, value };
  return value;
}

export function setConsent(next: { embeds: boolean; analytics: boolean; marketing: boolean; choice?: ConsentChoice }) {
  const value: Consent = {
    embeds: next.embeds,
    analytics: next.analytics,
    marketing: next.marketing,
    at: new Date().toISOString(),
    choice: next.choice ?? (next.embeds || next.analytics || next.marketing ? "all" : "necessary"),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  cache = { raw, value };
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  window.addEventListener("storage", l);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", l);
  };
};

export const useConsent = () => useSyncExternalStore(subscribe, read, () => DEFAULT);

export const OPEN_SETTINGS_EVENT = "tg:open-cookie-settings";
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));

/**
 * Deletes every cookie on this domain whose name starts with one of the given prefixes. A tracker's own
 * consent-gated component (GoogleTagManager, MetaPixel) stops being rendered the moment consent is revoked, but
 * that alone doesn't remove cookies it already set while it was loaded -- call this alongside that so revoking
 * consent actually clears them, not just stops new ones. Doesn't touch anything already loaded in memory (e.g.
 * a stray fbq()/gtag() reference); only a full page reload drops that, which isn't forced here since nothing in
 * this codebase calls either after the initial page-view.
 */
export function clearCookiesByPrefix(prefixes: string[]) {
  if (typeof document === "undefined") return;
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0]?.trim();
    if (name && prefixes.some((p) => name.startsWith(p))) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}
