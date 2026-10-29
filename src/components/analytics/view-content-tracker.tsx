"use client";

import { useEffect, useRef } from "react";
import { trackViewContent } from "@/lib/track";

/**
 * Fires ViewContent once per mount for whichever program detail page rendered this -- the page itself is a
 * server component (src/app/programs/[slug]/page.tsx), so this is the client sliver that can actually call
 * trackViewContent. The ref guard is only against React re-rendering this same instance (e.g. Strict Mode's
 * dev-only double-effect) -- navigating to a different program remounts a fresh instance with new props,
 * which is a genuine second content view and fires again as it should.
 */
export function ViewContentTracker({ contentName, contentId, contentCategory }: { contentName: string; contentId: string; contentCategory?: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackViewContent({ contentName, contentId, contentCategory });
  }, [contentName, contentId, contentCategory]);

  return null;
}
