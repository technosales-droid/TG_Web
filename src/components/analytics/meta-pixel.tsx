"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { clearCookiesByPrefix, useConsent } from "@/lib/consent";
import { metaPixelScript } from "@/lib/tracker-scripts";

/**
 * Loads the Meta Pixel based on the "marketing" bucket in the visitor's cookie preferences (see
 * src/lib/consent.ts) -- kept in its own bucket rather than lumped in with analytics, so the cookie settings
 * stay honest about what's actually running. Unlike every other tracker on this site, marketing is opt-OUT:
 * it defaults to true, so this fires for every visitor who hasn't explicitly turned it off, not only those
 * who clicked "Accept all". That default -- and the compliance tradeoff it carries for EU/UK/EEA visitors --
 * is documented on the `marketing` field in consent.ts; this component just reads whatever that is.
 *
 * Turning marketing off (default-on visitor opts out, or it was off already) unmounts the <Script> below, but
 * that alone doesn't delete the _fbp/_fbc cookies the Pixel already set while it was loaded -- the effect
 * below clears those the moment marketing goes false, so "off" actually means off, not just "no new cookies
 * from now on". (Deliberately not using Meta's `fbq('consent', 'revoke')` API instead: that pattern loads
 * fbevents.js and contacts facebook.net on every visit even for a visitor who already opted out, just told to
 * suppress data afterwards -- a real network request to a third party either way, which this project avoids
 * wherever the tracker is actually off.)
 *
 * The script's own text (metaPixelScript) lives in src/lib/tracker-scripts.ts, a plain module with no JSX, so
 * src/lib/__tests__ can import and run it directly -- it can't import this file at all, since Node's own TS
 * loader doesn't parse JSX.
 *
 * App Router navigation never reloads the page, so metaPixelScript()'s own PageView (fired once, for whichever
 * page the visitor actually landed on) would otherwise be the only PageView ever sent in a tab, no matter how
 * many pages are visited after. The effect below re-fires the standard PageView event on every later pathname
 * change, directly on the already-initialized window.fbq, bypassing the loader script's own guard entirely --
 * this component stays mounted across client-side navigation (it lives in the root layout), so `fbq` is
 * already defined by the time a visitor navigates anywhere else. The first pathname is skipped since the
 * loader script already covers it; see src/app/layout.tsx for why GoogleTagManager/MetaPixel are mounted
 * before {children}, which keeps window.fbq defined before any page content can ever observe otherwise.
 */
export function MetaPixel() {
  const { marketing } = useConsent();
  const pathname = usePathname();
  const trackedFirstPathname = useRef(false);

  useEffect(() => {
    if (!marketing) clearCookiesByPrefix(["_fbp", "_fbc"]);
  }, [marketing]);

  useEffect(() => {
    if (!marketing) return;
    if (!trackedFirstPathname.current) {
      trackedFirstPathname.current = true;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [marketing, pathname]);

  if (!marketing) return null;
  return (
    <Script id="meta-pixel-init" strategy="afterInteractive">
      {metaPixelScript()}
    </Script>
  );
}
