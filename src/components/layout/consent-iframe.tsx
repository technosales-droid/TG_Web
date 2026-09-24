"use client";

import { MapPin } from "lucide-react";
import { setConsent, useConsent } from "@/lib/consent";

/**
 * A third-party embed that loads only after the visitor allows it. Until then nothing is requested from the provider,
 * and the visitor sees a plain placeholder with a button to load it.
 */
export function ConsentIframe({ src, title }: { src: string; title: string }) {
  const { embeds } = useConsent();
  if (embeds) {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full border-0"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a3444] p-4 text-center">
      <MapPin className="size-6 text-white/70" aria-hidden="true" />
      <p className="max-w-xs text-sm text-white/85">The map is a Google service and is not loaded until you allow it.</p>
      <button
        type="button"
        onClick={() => setConsent({ embeds: true, choice: "custom" })}
        className="relative z-10 inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0b3d50] hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Load map
      </button>
    </div>
  );
}
