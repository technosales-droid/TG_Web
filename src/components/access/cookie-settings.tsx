"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useModal } from "@/components/learning/projects/use-modal";
import { OPEN_SETTINGS_EVENT, openCookieSettings, setConsent, useConsent } from "@/lib/consent";
import { cn } from "cn";
import { FOCUS } from "./form-ui";

/** Footer and policy-page trigger. */
export function CookieSettingsButton({ className, children = "Cookie settings" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children}
    </button>
  );
}

function Row({ title, text, control }: { title: string; text: string; control: React.ReactNode }) {
  return (
    <li className="flex items-start justify-between gap-4 border-t border-primary/10 py-4 first:border-t-0">
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
      <div className="shrink-0 pt-0.5">{control}</div>
    </li>
  );
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn("relative inline-flex h-7 w-12 items-center rounded-full border transition-colors", FOCUS, checked ? "border-primary bg-primary" : "border-primary/30 bg-muted")}
    >
      <span aria-hidden="true" className={cn("inline-block size-5 rounded-full bg-white shadow transition-transform motion-reduce:transition-none", checked ? "translate-x-6" : "translate-x-1")} />
      <span className="sr-only">{checked ? "On" : "Off"}</span>
    </button>
  );
}

const Fixed = ({ text }: { text: string }) => <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{text}</span>;

/**
 * Cookie preferences. Only what the site really does is offered as a choice: third-party embedded content (the Google
 * Map). Necessary storage is shown as always on, and analytics and marketing are shown as not used, because the site
 * runs neither. There are no switches that do nothing.
 */
export function CookieSettings() {
  const consent = useConsent();
  const [open, setOpen] = useState(false);
  const [embeds, setEmbeds] = useState(false);
  const ref = useModal(open);

  useEffect(() => {
    const show = () => {
      setEmbeds(consent.embeds);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, show);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, show);
  }, [consent.embeds]);

  if (!open) return null;
  const save = (value: boolean) => {
    setConsent({ embeds: value });
    setOpen(false);
  };

  return (
    <dialog
      ref={ref}
      onClose={() => setOpen(false)}
      aria-labelledby="cookie-settings-title"
      className="access-dialog m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto overscroll-contain rounded-3xl border border-primary/10 bg-card p-5 text-foreground shadow-[0_24px_60px_-20px_rgba(16,20,28,0.5)] backdrop:bg-black/60 sm:p-7"
    >
      <button type="button" onClick={() => setOpen(false)} aria-label="Close" className={cn("absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted", FOCUS)}>
        <X className="size-5" aria-hidden="true" />
      </button>
      <h2 id="cookie-settings-title" className="pr-8 text-xl font-semibold tracking-tight sm:text-2xl">Cookie preferences</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Nothing optional is loaded unless you allow it. Read the <a href="/cookie-policy" className="font-medium text-primary underline underline-offset-2">Cookie Policy</a> for the full list.
      </p>
      <ul className="mt-4">
        <Row title="Necessary" text="Keeps your access session and remembers these choices. The website cannot work as described without them." control={<Fixed text="Always on" />} />
        <Row title="Third-party embeds" text="Loads the Google Map in the footer. Google may set its own cookies when it loads." control={<Switch checked={embeds} onChange={setEmbeds} label="Allow third-party embeds" />} />
        <Row title="Analytics" text="This site does not use analytics." control={<Fixed text="Not used" />} />
        <Row title="Marketing" text="This site does not use advertising or marketing cookies." control={<Fixed text="Not used" />} />
      </ul>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row-reverse">
        <button type="button" onClick={() => save(true)} className={cn("h-11 flex-1 rounded-full bg-primary px-5 text-[15px] font-semibold text-primary-foreground hover:bg-primary/90", FOCUS)}>Allow all</button>
        <button type="button" onClick={() => save(embeds)} className={cn("h-11 flex-1 rounded-full border border-primary/30 px-5 text-[15px] font-semibold hover:bg-muted", FOCUS)}>Save choices</button>
        <button type="button" onClick={() => save(false)} className={cn("h-11 flex-1 rounded-full border border-primary/30 px-5 text-[15px] font-semibold hover:bg-muted", FOCUS)}>Reject optional</button>
      </div>
    </dialog>
  );
}
