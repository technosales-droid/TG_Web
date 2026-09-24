"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { openCookieSettings, setConsent, useConsent } from "@/lib/consent";
import { cn } from "cn";
import { FOCUS } from "./form-ui";

// True on the client once hydrated, false on the server, so the notice never flashes for a returning visitor.
const useHydrated = () => useSyncExternalStore(() => () => {}, () => true, () => false);

const BTN = "h-11 shrink-0 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold transition-colors";

/**
 * First-visit cookie notice. It is shown until the visitor chooses, and the three buttons are equally easy to reach:
 * reject all optional items, accept only the necessary ones, or accept all. Nothing optional loads before a choice.
 * "Reject all" and "Accept necessary" both leave only the necessary storage in place, because that cannot be switched off.
 */
export function CookieBanner() {
  const hydrated = useHydrated();
  const { at } = useConsent();
  if (!hydrated || at !== null) return null;

  return (
    <section
      data-cookie-banner
      aria-label="Cookie notice"
      className="cookie-banner fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-6xl rounded-2xl border border-primary/15 bg-card px-5 py-5 text-foreground shadow-[0_16px_40px_-16px_rgba(16,20,28,0.4)] sm:inset-x-6 sm:bottom-5 sm:px-7 sm:py-6"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 lg:max-w-2xl">
          <h2 className="text-lg font-semibold tracking-tight">Your cookie choices</h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
            We use necessary cookies and storage to keep the site and your access profile working. Optional third-party content, such as the Google Map, loads only if you allow it. We do not use analytics or advertising cookies.{" "}
            <Link href="/cookie-policy" className={cn("rounded font-medium text-primary underline underline-offset-2", FOCUS)}>Cookie Policy</Link>
            <span aria-hidden="true" className="mx-1.5">&middot;</span>
            <button type="button" onClick={openCookieSettings} className={cn("rounded font-medium text-primary underline underline-offset-2", FOCUS)}>
              Cookie settings
            </button>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:shrink-0 lg:flex-nowrap">
          <button type="button" onClick={() => setConsent({ embeds: false, choice: "rejected" })} className={cn(BTN, "border border-primary/30 hover:bg-muted", FOCUS)}>
            Reject all
          </button>
          <button type="button" onClick={() => setConsent({ embeds: false, choice: "necessary" })} className={cn(BTN, "border border-primary/30 hover:bg-muted", FOCUS)}>
            Accept necessary
          </button>
          <button type="button" onClick={() => setConsent({ embeds: true, choice: "all" })} className={cn(BTN, "bg-primary text-primary-foreground hover:bg-primary/90", FOCUS)}>
            Accept all
          </button>
        </div>
      </div>
    </section>
  );
}
