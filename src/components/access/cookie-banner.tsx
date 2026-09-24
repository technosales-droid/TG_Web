"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Check, Cookie } from "lucide-react";
import { openCookieSettings, setConsent, useConsent } from "@/lib/consent";
import { cn } from "cn";
import { FOCUS } from "./form-ui";

// True on the client once hydrated, false on the server, so the notice never flashes for a returning visitor.
const useHydrated = () => useSyncExternalStore(() => () => {}, () => true, () => false);

const BTN = "h-11 w-full rounded-full px-5 text-[15px] font-semibold transition-all duration-200 sm:w-auto lg:w-full";
const FACTS = ["Necessary storage is always on", "Google Map loads only if you allow it", "No analytics or advertising cookies"];

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
      className="cookie-banner fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/15 bg-card text-foreground shadow-[0_28px_70px_-24px_rgba(11,61,80,0.6)] sm:inset-x-6 sm:bottom-5"
    >
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-[#0b3d50] via-primary to-brand-sky" />
      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-center lg:gap-10 lg:p-7">
        <div className="flex gap-4">
          <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b3d50] to-primary text-white shadow-[0_10px_20px_-10px_rgba(12,112,154,0.9)] sm:flex" aria-hidden="true">
            <Cookie className="size-6" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Your privacy</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">Your cookie choices</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              We use necessary cookies and storage to keep the site and your access profile working. Anything optional stays off until you say so.
            </p>
            <ul className="mt-3 hidden flex-wrap gap-2 sm:flex">
              {FACTS.map((f) => (
                <li key={f} className="flex items-center gap-1.5 rounded-full bg-primary/[0.08] py-1 pr-3 pl-2 text-xs font-medium text-foreground/85">
                  <Check className="size-3.5 text-primary" strokeWidth={3} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/cookie-policy" className={cn("rounded font-medium text-primary underline underline-offset-2", FOCUS)}>Cookie Policy</Link>
              <span aria-hidden="true" className="mx-2">&middot;</span>
              <button type="button" onClick={openCookieSettings} className={cn("rounded font-medium text-primary underline underline-offset-2", FOCUS)}>
                Cookie settings
              </button>
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          <button type="button" onClick={() => setConsent({ embeds: true, choice: "all" })} className={cn(BTN, "bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_rgba(12,112,154,0.9)] hover:bg-primary/90", FOCUS)}>
            Accept all
          </button>
          <button type="button" onClick={() => setConsent({ embeds: false, choice: "necessary" })} className={cn(BTN, "border border-primary/30 hover:bg-muted", FOCUS)}>
            Accept necessary
          </button>
          <button type="button" onClick={() => setConsent({ embeds: false, choice: "rejected" })} className={cn(BTN, "border border-primary/30 hover:bg-muted", FOCUS)}>
            Reject all
          </button>
        </div>
      </div>
    </section>
  );
}
