"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

// Public by design: a Meta Pixel ID is meant to be embedded in client-side code, not a secret.
export const META_PIXEL_ID = "982290634949305";

/**
 * Loads the Meta Pixel only once the visitor has allowed marketing in their cookie preferences (see
 * src/lib/consent.ts) -- this is an advertising/retargeting pixel, kept in its own "marketing" consent bucket
 * rather than lumped in with analytics, so the cookie settings stay honest about what each toggle does. Renders
 * nothing beforehand -- no script is requested, no cookie is set, until then. The <noscript> fallback pixel Meta
 * also asks for is not gated: it only ever matters to visitors with JS disabled, for whom this consent system
 * (itself React) could never have run anyway -- see src/app/layout.tsx.
 */
export function MetaPixel() {
  const { marketing } = useConsent();
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
