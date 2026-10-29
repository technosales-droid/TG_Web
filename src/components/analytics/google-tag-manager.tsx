"use client";

import { useEffect } from "react";
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
 */
export function GoogleTagManager() {
  const { analytics } = useConsent();

  useEffect(() => {
    if (!analytics) clearCookiesByPrefix(["_ga"]);
  }, [analytics]);

  if (!analytics) return null;
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {gtmScript()}
    </Script>
  );
}
