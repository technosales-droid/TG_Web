"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { clearCookiesByPrefix, useConsent } from "@/lib/consent";
import { metaPixelScript, META_PIXEL_FIRED_FLAG } from "@/lib/tracker-scripts";

function isMetaPixelFired(): boolean {
  return Boolean((window as unknown as Record<string, unknown>)[META_PIXEL_FIRED_FLAG]);
}

/**
 * Loads the Meta Pixel based on the "marketing" bucket in the visitor's cookie preferences (see
 * src/lib/consent.ts) -- kept in its own bucket rather than lumped in with analytics, so the cookie settings
 * stay honest about what's actually running. Unlike every other tracker on this site, marketing is opt-OUT:
 * it defaults to true, so this fires for every visitor who hasn't explicitly turned it off, not only those
 * who clicked "Accept all". That default -- and the compliance tradeoff it carries for EU/UK/EEA visitors --
 * is documented on the `marketing` field in consent.ts; this component just reads whatever that is.
 *
 * The actual base-install code (metaPixelScript) now runs from a single place: a static, always-present
 * <script> in src/app/layout.tsx, present directly in the server-rendered HTML -- not from a <Script> rendered
 * here. That used to be two independent places running the identical script text for the common case
 * (marketing true from page load), each trusting the shared window flag inside the script to coordinate --
 * Meta's own Ads Data Advisor then reported exactly what that risks: "'PageView' fired 2 times with identical
 * data". Rendering it from only one place removes the need to trust that coordination at all.
 *
 * This component now only handles what the static script's one-time, page-load consent check can't:
 * - Clearing _fbp/_fbc the moment marketing goes false, since unmounting a <Script> isn't what gates anything
 *   anymore, but the cookies the Pixel already set still need clearing (see the first effect below). Not using
 *   Meta's `fbq('consent', 'revoke')` API instead: that pattern loads fbevents.js and contacts facebook.net on
 *   every visit even for a visitor who already opted out, just told to suppress data afterwards -- a real
 *   network request to a third party either way, which this project avoids wherever the tracker is off.
 * - Marketing turning on LATER in the same page view (opting in via Cookie Settings, no reload) after the
 *   static script's one-time check already ran with the old, false answer -- isMetaPixelFired() tells us
 *   whether that already happened; if not, this re-runs the identical script text itself. Safe either way:
 *   Meta's own loader IIFE (`if(f.fbq)return`) and the window-flag guard inside metaPixelScript() both make
 *   re-running it, on the rare occasion it isn't actually needed, a no-op rather than a second real fire.
 * - Re-firing the standard PageView event on every later App Router pathname change, directly on the
 *   already-initialized window.fbq -- App Router navigation never reloads the page, so without this, only the
 *   very first page in a tab would ever be tracked.
 */
export function MetaPixel() {
  const { marketing } = useConsent();
  const pathname = usePathname();
  // Starts at the page actually landed on, so that page is never treated as a "new" pathname to re-track.
  const lastTrackedPathname = useRef(pathname);

  useEffect(() => {
    if (!marketing) clearCookiesByPrefix(["_fbp", "_fbc"]);
  }, [marketing]);

  useEffect(() => {
    if (!marketing) return;
    if (!isMetaPixelFired()) {
      // A plain dynamically-inserted <script> actually executes (unlike setting innerHTML), running the same
      // loader + consent-gated init/track as the static one in layout.tsx -- needed here because that static
      // script's own check already ran (and said no) before this effect could possibly know marketing had
      // since turned on.
      const el = document.createElement("script");
      el.text = metaPixelScript();
      document.head.appendChild(el);
      el.remove();
      lastTrackedPathname.current = pathname; // this run's own fbq('track','PageView') already covers it
    }
  }, [marketing, pathname]);

  useEffect(() => {
    if (!marketing) return;
    if (pathname === lastTrackedPathname.current) return;
    lastTrackedPathname.current = pathname;
    window.fbq?.("track", "PageView");
  }, [marketing, pathname]);

  return null;
}
