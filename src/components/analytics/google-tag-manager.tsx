"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

// Public by design: a GTM container ID is meant to be embedded in client-side code, not a secret.
const GTM_ID = "GTM-WMBMSM8C";

/**
 * Loads Google Tag Manager only once the visitor has allowed analytics in their cookie preferences (see
 * src/lib/consent.ts) -- the same gate already used for GA4 (google-analytics.tsx), since GTM is itself a tag
 * loader. Renders nothing beforehand -- no script is requested, no cookie is set, until then. The <noscript>
 * fallback iframe Google also asks for is not gated: it only ever matters to visitors with JS disabled, for
 * whom this consent system (itself React) could never have run anyway, and Google's own install instructions
 * require it as high in <body> as possible -- see src/app/layout.tsx.
 */
export function GoogleTagManager() {
  const { analytics } = useConsent();
  if (!analytics) return null;
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
    </Script>
  );
}
