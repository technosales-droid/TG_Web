"use client";

import { useEffect } from "react";
import Script from "next/script";
import { clearCookiesByPrefix, useConsent } from "@/lib/consent";

// Public by design: a Meta Pixel ID is meant to be embedded in client-side code, not a secret.
export const META_PIXEL_ID = "982290634949305";

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
 */
export function MetaPixel() {
  const { marketing } = useConsent();

  useEffect(() => {
    if (!marketing) clearCookiesByPrefix(["_fbp", "_fbc"]);
  }, [marketing]);

  if (!marketing) return null;
  return (
    <Script id="meta-pixel-init" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
