// The literal loader-script text for GTM and the Meta Pixel, kept in their own plain (non-JSX) module so
// src/lib/__tests__ can import and execute them directly -- the components that actually render these via
// next/script (src/components/analytics/) contain JSX, which Node's own TS loader can't parse, so tests can't
// import those files at all. This file has none, by design, and should stay that way.

// Public by design: both ids are meant to be embedded in client-side code, not secrets.
export const GTM_ID = "GTM-WMBMSM8C";
export const META_PIXEL_ID = "1448322024089398";

// Window-scoped flags (NOT sessionStorage) guarding each script's init/track calls against running more than
// once per real page load. A plain `var` assignment inside an inline <script> attaches to `window`, so this
// still survives a React remount of the <Script> tag within the same loaded page -- the actual case these
// exist to guard against (toggling consent off then back on in the same tab, with no navigation) -- but,
// unlike sessionStorage, correctly resets on every full page load/reload. sessionStorage was tried first and
// was wrong: it survives a reload, so after the very first page view in a tab, every later reload or non-SPA
// navigation would see the flag already set and silently skip fbq('init'/'track') or gtm.start forever after
// -- a real, silent tracking gap, not just a harmless skipped duplicate.
export const GTM_FIRED_FLAG = "__tgGtmFired";
export const META_PIXEL_FIRED_FLAG = "__tgMetaPixelFired";

/** Google's own GTM loader snippet, verbatim, except wrapped in the window-flag guard above. Toggling
 * analytics consent off then back on in the same tab (without a page reload) remounts GoogleTagManager, which
 * would otherwise re-run this snippet -- pushing a second 'gtm.start' event and inserting a second gtm.js
 * <script> tag, since Google's own snippet has no guard against running twice. SPA navigation to a later page
 * is handled separately, in GoogleTagManager's own pathname effect -- this only ever runs once, for whichever
 * page the visitor actually landed on. */
export function gtmScript(): string {
  return `
    if (!window.${GTM_FIRED_FLAG}) {
      window.${GTM_FIRED_FLAG} = true;
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    }
  `;
}

/** Meta's own Pixel loader snippet, verbatim, wrapped in two guards: a consent check around the whole thing
 * (so an opted-out visitor's browser never even requests fbevents.js from connect.facebook.net -- not just
 * "no init call", no network contact at all), and the window-flag guard above around the two fbq() calls
 * (Meta's loader IIFE already guards itself against re-running via `if(f.fbq)return`, but those two calls are
 * not inside that guard, so without this they'd fire again on every remount of MetaPixel -- the off-then-
 * back-on-without-reload case -- a duplicate 'init' and a duplicate PageView for one real page view).
 *
 * The consent check (tgMetaMarketingAllowed) duplicates consent.ts's read() by hand, rather than importing
 * it: this function's return value becomes a literal string embedded in a plain <script> tag, including one
 * rendered directly in src/app/layout.tsx -- a Server Component, which can't read localStorage anyway, and
 * needs this check to run as browser JS, not at render time. It mirrors read()'s exact two-step logic, not
 * just the marketing field's own fallback, because the two differ: a STORED record missing `marketing` (one
 * written before the Pixel existed) is NOT the same as NO record at all -- read() only accepts a record as
 * valid once `embeds` is present and boolean, and only then falls back a missing `marketing` to false, not to
 * DEFAULT's true; true is reserved for "no valid record exists yet". Collapsing that into one fallback would
 * silently re-enable tracking for a visitor who'd already made some other explicit choice. Keep the two in
 * sync if read()'s validation or the marketing default ever changes.
 *
 * That layout.tsx placement is the reason the whole snippet is wrapped like this at all, not just gated by a
 * `marketing &&` in MetaPixel.tsx (a next/script "afterInteractive" <Script>, which MetaPixel still also
 * renders, never appears in the server-rendered HTML -- only once the browser runs it after hydration): Meta's
 * own "Install Meta Pixel" checker in Events Manager reads the page's raw HTML for this exact code shape, and
 * never found it there, no matter how correctly it actually ran once a visitor's browser executed the page.
 * Rendering this same text as a plain, always-present <script> fixes that, while the consent check inside it
 * -- evaluated by the browser, not skipped by a crawler reading the source as text -- keeps the actual
 * tracking gated exactly as before. MetaPixel.tsx's own conditional <Script> mount still exists for real-time
 * consent changes and the SPA pathname re-fire; running this text twice on the same page load is harmless,
 * since both guards above are idempotent. */
export function metaPixelScript(): string {
  return `
    function tgMetaMarketingAllowed() {
      try {
        var raw = window.localStorage.getItem('tg-cookie-preferences');
        if (!raw) return true;
        var v = JSON.parse(raw);
        if (typeof v.embeds !== 'boolean') return true;
        return typeof v.marketing === 'boolean' ? v.marketing : false;
      } catch (e) { return true; }
    }
    if (tgMetaMarketingAllowed()) {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      if (!window.${META_PIXEL_FIRED_FLAG}) {
        window.${META_PIXEL_FIRED_FLAG} = true;
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      }
    }
  `;
}
