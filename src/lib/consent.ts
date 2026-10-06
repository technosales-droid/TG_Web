"use client";

import { useSyncExternalStore } from "react";

// Cookie and embed preferences. The site sets no advertising cookies, so the only optional items are third-party
// embedded content (the Google Map) and analytics (Google Analytics). Neither loads until the visitor allows it,
// and this record of their choice is kept in the browser's local storage (a "necessary" item: without it the
// choice could not be kept).

export type ConsentChoice = "all" | "necessary" | "rejected" | "custom";

export interface Consent {
  /** Allow third-party embedded content (Google Maps). */
  embeds: boolean;
  /** Allow Google Analytics (GA4) to load. */
  analytics: boolean;
  /** When the choice was made; null until the visitor chooses, which is when the cookie notice is shown. */
  at: string | null;
  choice: ConsentChoice | null;
}

const KEY = "tg-cookie-preferences";
const DEFAULT: Consent = { embeds: false, analytics: false, at: null, choice: null };
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
          at: typeof v.at === "string" ? v.at : null,
          choice: ["all", "necessary", "rejected", "custom"].includes(v.choice) ? v.choice : null,
        };
    } catch {}
  }
  cache = { raw, value };
  return value;
}

export function setConsent(next: { embeds: boolean; analytics: boolean; choice?: ConsentChoice }) {
  const value: Consent = {
    embeds: next.embeds,
    analytics: next.analytics,
    at: new Date().toISOString(),
    choice: next.choice ?? (next.embeds || next.analytics ? "all" : "necessary"),
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
