"use client";

import { useEffect, useState } from "react";

/** True whenever any of the site's native <dialog> overlays (course promo, brochure/access form, filter sheets,
 * cookie settings, the hero video popup...) is open. A dialog's own top-layer backdrop should already sit above a
 * plain fixed or sticky element, but that didn't hold up on real devices (the element stayed visible, undimmed,
 * over an open dialog), so this watches the DOM directly instead of trusting that layering. */
export function useAnyDialogOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => setOpen(document.querySelectorAll("dialog[open]").length > 0);
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, attributeFilter: ["open"], subtree: true });
    return () => observer.disconnect();
  }, []);
  return open;
}
