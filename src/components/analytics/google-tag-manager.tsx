"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { clearCookiesByPrefix, useConsent } from "@/lib/consent";
import { gtmScript } from "@/lib/tracker-scripts";

/**
 * Loads Google Tag Manager only once the visitor has allowed analytics in their cookie preferences (see
 * src/lib/consent.ts). GA4 is configured as a tag inside this GTM container (in the GTM web console, not in
 * this codebase) rather than loaded separately, so gating GTM itself is enough -- there is no standalone GA4
 * script here. Renders nothing beforehand -- no script is requested, no cookie is set, until then. The
 * <noscript> fallback iframe Google also asks for is not gated: it only ever matters to visitors with JS
 * disabled, for whom this consent system (itself React) could never have run anyway, and Google's own install
 * instructions require it as high in <body> as possible -- see src/app/layout.tsx.
 *
 * Revoking consent unmounts the <Script> below, but that alone doesn't delete the _ga/_ga_<container-id>
 * cookies GA4 already set while it was loaded -- the effect below clears anything prefixed "_ga" the moment
 * analytics consent goes false (see meta-pixel.tsx for the same pattern and why this, not Google's Consent
 * Mode "load always, suppress via consent signal" API, is used).
 *
 * The script's own text (gtmScript) lives in src/lib/tracker-scripts.ts, a plain module with no JSX, so
 * src/lib/__tests__ can import and run it directly -- it can't import this file at all, since Node's own TS
 * loader doesn't parse JSX.
 *
 * App Router navigation never reloads the page, so gtm.js only ever sees the page a visitor actually landed
 * on. The effect below pushes a page_view-shaped event to window.dataLayer on every later pathname change --
 * whether anything in the GTM container is actually wired to react to it (a History Change trigger already
 * covering this, or a Custom Event trigger listening for "page_view") has to be checked in the GTM workspace
 * itself; this repo has no visibility into the container's internal tags/triggers. The first pathname is
 * skipped since gtm.js already covers it.
 */
export function GoogleTagManager() {
  const { analytics } = useConsent();
  const pathname = usePathname();
  const trackedFirstPathname = useRef(false);

  useEffect(() => {
    if (!analytics) clearCookiesByPrefix(["_ga"]);
  }, [analytics]);

  useEffect(() => {
    if (!analytics) return;
    if (!trackedFirstPathname.current) {
      trackedFirstPathname.current = true;
      return;
    }
    window.dataLayer?.push({ event: "page_view", page_path: pathname, page_location: window.location.href, page_title: document.title });
  }, [analytics, pathname]);

  if (!analytics) return null;
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {gtmScript()}
    </Script>
  );
}
