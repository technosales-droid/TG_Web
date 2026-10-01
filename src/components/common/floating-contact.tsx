"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { ACTIVE_PROGRAMS } from "@/data/active-programs";
import { footerContact } from "@/components/layout/footer-data";
import { useConsent } from "@/lib/consent";
import { useAnyDialogOpen } from "@/lib/use-any-dialog-open";
import { cn } from "cn";

// True on the client once hydrated, so the buttons never flash on then off while consent loads from storage.
const useHydrated = () => useSyncExternalStore(() => () => {}, () => true, () => false);

/** Hides the buttons while the visitor is actively scrolling down (where they're most likely to be passing over,
 * not reading, content), and brings them back on any upward scroll or once scrolling has settled for a moment. This
 * doesn't stop them from ever sitting over content at rest — no fixed corner widget can promise that on a page with
 * scrolling images and cards, and every site with one behaves the same way — but it keeps them out of the way for
 * most of the time a visitor spends scrolling past a section, rather than tracking down the page with it. */
function useScrollSettled() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    let idleTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY + 4 && y > 120) setVisible(false);
        else if (y < lastY - 4) setVisible(true);
        lastY = y;
        ticking = false;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => setVisible(true), 500);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, []);
  return visible;
}

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
 * bottom on phones, right where these buttons sit) or while any dialog on the site is open, and dimmed out while
 * actively scrolling down.
 */
export function FloatingContact() {
  const hydrated = useHydrated();
  const { at } = useConsent();
  const pathname = usePathname();
  const dialogOpen = useAnyDialogOpen();
  const scrollSettled = useScrollSettled();

  if (!footerContact.whatsapp || !hydrated || at === null || dialogOpen) return null;

  const telHref = `tel:+${footerContact.whatsapp}`;
  const waHref = `https://wa.me/${footerContact.whatsapp}?text=${encodeURIComponent(whatsappMessageFor(pathname))}`;

  return (
    <div
      // `inert`, not `aria-hidden`: aria-hidden on an ancestor of focusable links without also pulling them out of
      // the tab order is an accessibility bug in itself (a keyboard user could still tab to an invisible button).
      // `inert` removes the whole subtree from both the accessibility tree and tab order in one go.
      inert={!scrollSettled}
      className={cn(
        "fixed right-[calc(0.875rem+env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-2 transition-[opacity,transform] duration-200 sm:right-[calc(1.5rem+env(safe-area-inset-right))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:gap-3 motion-reduce:transition-none",
        scrollSettled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
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
