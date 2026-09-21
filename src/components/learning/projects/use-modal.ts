"use client";

import { useEffect, useRef } from "react";

/**
 * Drives a native <dialog> from a boolean: opens it modally, locks page scroll while it is open and closes it
 * again when `open` turns false. Escape and the backdrop close it through the dialog's own `close` event.
 */
export function useModal(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d || !open) return;
    if (!d.open) d.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if (d.open) d.close();
    };
  }, [open]);
  return ref;
}
