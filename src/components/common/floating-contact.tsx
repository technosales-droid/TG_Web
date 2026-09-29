"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { ACTIVE_PROGRAMS } from "@/data/active-programs";
import { footerContact } from "@/components/layout/footer-data";
import { useConsent } from "@/lib/consent";
import { cn } from "cn";

// True on the client once hydrated, so the buttons never flash on then off while consent loads from storage.
const useHydrated = () => useSyncExternalStore(() => () => {}, () => true, () => false);

/** The enrollable program a path belongs to, if any, for a one-line contextual message; every other page (including
 * program studios that aren't open for enrolment yet) falls back to the generic message. */
function whatsappMessageFor(pathname: string): string {
  const program = ACTIVE_PROGRAMS.find((p) => pathname === p.href || pathname.startsWith(`${p.href}/`));
  return program
    ? `Hi Techno Gurukul, I would like to know more about the ${program.title} program.`
    : "Hi Techno Gurukul, I would like to know more about your courses.";
}

const BUTTON =
  "group relative flex size-12 items-center justify-center rounded-full text-white shadow-[0_12px_28px_-8px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:size-14";

const TOOLTIP =
  "pointer-events-none absolute right-full mr-3 hidden rounded-full bg-foreground px-3 py-1.5 text-sm font-medium whitespace-nowrap text-background opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block";

/**
 * Global floating contact buttons: a call button and a WhatsApp button, stacked bottom-right on every route,
 * mounted once from the root layout. Hidden while the cookie notice is on screen (it spans the full width at the
 * bottom on phones, right where these buttons sit); every other overlay on the site is a native <dialog>, whose
 * own top-layer backdrop already dims and sits above a fixed element like this one without any extra handling here.
 */
export function FloatingContact() {
  const hydrated = useHydrated();
  const { at } = useConsent();
  const pathname = usePathname();

  if (!footerContact.whatsapp || !hydrated || at === null) return null;

  const telHref = `tel:+${footerContact.whatsapp}`;
  const waHref = `https://wa.me/${footerContact.whatsapp}?text=${encodeURIComponent(whatsappMessageFor(pathname))}`;

  return (
    <div className="fixed right-[calc(0.875rem+env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-2 sm:right-[calc(1.5rem+env(safe-area-inset-right))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:gap-3">
      <a href={telHref} aria-label="Call Techno Gurukul" className={cn(BUTTON, "bg-primary")}>
        <Phone className="size-5 sm:size-6" aria-hidden="true" />
        <span aria-hidden="true" className={TOOLTIP}>
          Call Techno Gurukul
        </span>
      </a>
      <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with Techno Gurukul on WhatsApp" className={cn(BUTTON, "bg-[#25D366]")}>
        <FaWhatsapp className="size-6 sm:size-7" aria-hidden="true" />
        <span aria-hidden="true" className={TOOLTIP}>
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
