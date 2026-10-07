"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

// Public by design: a GA4 measurement ID is meant to be embedded in client-side code, not a secret.
const GA_MEASUREMENT_ID = "G-H1G7WG6CBP";

/**
 * Loads Google Analytics (GA4) only once the visitor has allowed analytics in their cookie preferences (see
 * src/lib/consent.ts). Renders nothing beforehand -- no script is requested, no cookie is set, until then.
 */
export function GoogleAnalytics() {
  const { analytics } = useConsent();
  if (!analytics) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
