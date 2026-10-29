"use client";

import { useEffect } from "react";
import Script from "next/script";
import { clearCookiesByPrefix, useConsent } from "@/lib/consent";
import { metaPixelScript } from "@/lib/tracker-scripts";

/**
 * Loads the Meta Pixel only once the visitor has allowed marketing in their cookie preferences (see
 * src/lib/consent.ts) -- this is an advertising/retargeting pixel, kept in its own "marketing" consent bucket
 * rather than lumped in with analytics, so the cookie settings stay honest about what each toggle does. Renders
 * nothing beforehand -- no script is requested, no cookie is set, until then. The <noscript> fallback pixel Meta
 * also asks for is not gated: it only ever matters to visitors with JS disabled, for whom this consent system
 * (itself React) could never have run anyway -- see src/app/layout.tsx.
 *
 * Revoking consent unmounts the <Script> below, but that alone doesn't delete the _fbp/_fbc cookies the Pixel
 * already set while it was loaded -- the effect below clears those the moment marketing consent goes false, so
 * "off" actually means off, not just "no new cookies from now on". (Deliberately not using Meta's `fbq('consent',
 * 'revoke')` API instead: that pattern loads fbevents.js and contacts facebook.net on every visit regardless of
 * consent, just told to suppress data -- a real network request to a third party either way. This component's
 * current behaviour -- no request at all until consent -- is the stricter guarantee and matches every other
 * tracker on this site, so it's kept instead.)
 *
 * The script's own text (metaPixelScript) lives in src/lib/tracker-scripts.ts, a plain module with no JSX, so
 * src/lib/__tests__ can import and run it directly -- it can't import this file at all, since Node's own TS
 * loader doesn't parse JSX.
 */
export function MetaPixel() {
  const { marketing } = useConsent();

  useEffect(() => {
    if (!marketing) clearCookiesByPrefix(["_fbp", "_fbc"]);
  }, [marketing]);

  if (!marketing) return null;
  return (
    <Script id="meta-pixel-init" strategy="afterInteractive">
      {metaPixelScript()}
    </Script>
  );
}
