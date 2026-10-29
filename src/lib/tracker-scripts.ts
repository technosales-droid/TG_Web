// The literal loader-script text for GTM and the Meta Pixel, kept in their own plain (non-JSX) module so
// src/lib/__tests__ can import and execute them directly -- the components that actually render these via
// next/script (src/components/analytics/) contain JSX, which Node's own TS loader can't parse, so tests can't
// import those files at all. This file has none, by design, and should stay that way.

// Public by design: both ids are meant to be embedded in client-side code, not secrets.
export const GTM_ID = "GTM-WMBMSM8C";
export const META_PIXEL_ID = "982290634949305";

// sessionStorage keys guarding each script against running its init/track calls more than once per tab. See
// each function's own comment for why that guard exists.
export const GTM_FIRED_KEY = "tg-gtm-fired";
export const META_PIXEL_FIRED_KEY = "tg-meta-pixel-fired";

/** Google's own GTM loader snippet, verbatim, except wrapped in the sessionStorage guard above. Toggling
 * analytics consent off then back on in the same tab (without a page reload) remounts GoogleTagManager, which
 * would otherwise re-run this snippet -- pushing a second 'gtm.start' event and inserting a second gtm.js
 * <script> tag, since Google's own snippet has no guard against running twice. */
export function gtmScript(): string {
  return `
    if (!window.sessionStorage.getItem('${GTM_FIRED_KEY}')) {
      window.sessionStorage.setItem('${GTM_FIRED_KEY}', '1');
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    }
  `;
}

/** Meta's own Pixel loader snippet, verbatim, except the two fbq() calls after it are wrapped in the
 * sessionStorage guard above. Meta's loader IIFE already guards itself against re-running (`if(f.fbq)return`),
 * but those two calls are not inside that guard, so without this they'd fire again on every remount of
 * MetaPixel (the same off-then-back-on-without-reload case as GTM above) -- a duplicate 'init' and a duplicate
 * PageView event sent to Meta for one real page view. */
export function metaPixelScript(): string {
  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    if (!window.sessionStorage.getItem('${META_PIXEL_FIRED_KEY}')) {
      window.sessionStorage.setItem('${META_PIXEL_FIRED_KEY}', '1');
      fbq('init', '${META_PIXEL_ID}');
      fbq('track', 'PageView');
    }
  `;
}
