"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Download, X } from "lucide-react";
import { useModal } from "@/components/learning/projects/use-modal";
import { buttonVariants } from "@/components/ui/button";
import { activeProgramInterest } from "@/data/active-programs";
import { COURSE_PROMOTIONS, type PromotionMessage } from "@/data/course-promotions";
import { cn } from "cn";
import { useBrochureDownload } from "./brochure-download";
import { pickNext } from "./rotation";

const DELAY_S = 45;
const STORAGE_KEY = "tg-course-promo";
// Only the two courses actually open for enrolment are promoted; the individual Game Development studios (Unity,
// Unreal, and so on) are not advertised on their own, matching how they're presented everywhere else on the site.
const PROMOTABLE_IDS = ["tg-digital-marketing", "tg-gameforge"];
const IDS = COURSE_PROMOTIONS.filter((p) => PROMOTABLE_IDS.includes(p.courseId)).map((p) => p.courseId);
// At most one popup per browser session, so a visitor is never interrupted twice in one visit.
const SESSION_SHOWN_KEY = "tg-course-promo-shown-session";

const readShown = (): string[] => {
  try {
    const v = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
};
const writeShown = (shown: string[]) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(shown));
  } catch {}
};
const alreadyShownThisSession = () => {
  try {
    return sessionStorage.getItem(SESSION_SHOWN_KEY) === "1";
  } catch {
    return false;
  }
};
const markShownThisSession = () => {
  try {
    sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
  } catch {}
};

/** True while something else owns the visitor's attention: an open menu or dialog, a locked page, or a field being used. */
function isBusy() {
  const el = document.activeElement;
  return Boolean(
    document.querySelector('dialog[open], [data-cookie-banner], header [aria-expanded="true"], header [data-popup-open]') ||
      document.body.style.overflow === "hidden" ||
      el?.closest("form, input, textarea, select, [contenteditable='true']"),
  );
}

/**
 * One global promotion modal (native <dialog>: dims and inerts the page, locks scroll, traps focus), for the two
 * courses currently open for enrolment (Digital Marketing, Game Development). After 45 seconds of active browsing
 * (tab visible) it promotes one of them; which one rotates across visits (data/promotions/rotation.ts), but never
 * more than once in a single browser session, so a visitor is interrupted at most once per visit. It stays until
 * the visitor closes it (button or Escape), not on backdrop click.
 */
export function CoursePromotionPopup() {
  const pathname = usePathname();
  const [current, setCurrent] = useState<{ courseId: string; message: PromotionMessage } | null>(null);
  const [brochureBusy, setBrochureBusy] = useState(false);
  const seconds = useRef(0);
  const modalRef = useModal(current !== null);
  const onContact = pathname.startsWith("/contact");
  const { open: openBrochure, viewer: brochureViewer } = useBrochureDownload();

  const close = useCallback(() => {
    seconds.current = 0;
    setCurrent(null);
  }, []);

  useEffect(() => {
    if (current || !IDS.length || alreadyShownThisSession()) return;
    const tick = setInterval(() => {
      if (document.hidden) return;
      seconds.current += 1;
      // Past the delay, keep waiting until the visitor is free rather than skipping the promotion.
      if (seconds.current < DELAY_S || onContact || isBusy()) return;
      const next = pickNext(IDS, readShown());
      writeShown(next.shown);
      markShownThisSession();
      const { messages } = COURSE_PROMOTIONS.find((p) => p.courseId === next.id)!;
      setCurrent({ courseId: next.id, message: messages[Math.floor(Math.random() * messages.length)] });
    }, 1000);
    return () => clearInterval(tick);
  }, [current, onContact]);

  // The brochure viewer is a separate dialog (its own access-gate step, then a ready/download step), so it must keep
  // rendering even once the promotion dialog below has closed.
  if (!current) return brochureViewer;
  const promo = COURSE_PROMOTIONS.find((p) => p.courseId === current.courseId)!;
  const { headline, description, ctaLabel } = current.message;
  const brochureInterest = activeProgramInterest(promo.href);

  const downloadBrochure = async () => {
    if (!brochureInterest || brochureBusy) return;
    setBrochureBusy(true);
    close(); // one dialog at a time: the access-gate/brochure dialog takes over from here
    try {
      await openBrochure({ slug: current.courseId, name: brochureInterest });
    } finally {
      setBrochureBusy(false);
    }
  };

  return (
    <>
      {/*
        Width: one formula (never wider than 900px, never wider than the viewport minus its side margin) replaces
        the old max-w-* ladder, so everything inside is sized against the popup's own real width at every viewport,
        not a breakpoint guess. overflow-x-hidden is deliberate, documented "vertical scroll only" behaviour, not a
        substitute for the real fix below: without the min-w-0/shrink/flex-wrap changes on the CTA row and the
        break-words/max-w-prose text, content that no longer fits would be silently clipped instead of visible; the
        point of this pass is that it now genuinely fits, and this line only forecloses the alternative (a stray
        scrollbar) if something ever regresses.
      */}
      <dialog
        ref={modalRef}
        onClose={close}
        aria-label={`Featured program: ${promo.courseName}`}
        className="course-promo relative m-auto box-border max-h-[92dvh] w-[min(900px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl border border-primary/10 bg-card p-0 text-foreground shadow-[0_24px_60px_-20px_rgba(16,20,28,0.5)] backdrop:bg-black/60 sm:rounded-3xl"
      >
        {/* A zero-height sticky anchor, not a plain absolute button: the dialog itself is the
            scrolling container (overflow-y-auto above), so a plainly-`absolute` close button would
            scroll away with the content on a short viewport where the popup's content needs to
            scroll. Sticking the anchor keeps it pinned to the visible top-right corner instead. */}
        <div className="sticky top-0 z-10 h-0">
          <button
            type="button"
            onClick={close}
            aria-label="Close promotion"
            className="absolute top-3 right-3 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:top-4 sm:right-4 sm:size-11"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {promo.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
            <Image src={promo.image.src} alt={promo.image.alt} fill sizes="(min-width: 932px) 900px, calc(100vw - 2rem)" className="object-cover" />
          </div>
        )}

        <div className={cn("min-w-0 p-4 sm:p-6 lg:p-8", !promo.image && "pr-14")}>
          <div className="flex min-w-0 items-center gap-2 text-xs font-medium tracking-[0.2em] lg:text-sm text-primary uppercase">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-sky" aria-hidden="true" />
            <span className="min-w-0 break-words">{promo.category}</span>
          </div>
          <p className="mt-2 text-lg leading-snug text-balance break-words text-foreground sm:mt-3 sm:text-xl lg:text-2xl xl:text-3xl font-semibold tracking-tight">{headline}</p>
          <p className="mt-1.5 max-w-prose text-sm leading-relaxed break-words text-muted-foreground sm:mt-2 sm:text-base lg:text-lg">{description}</p>

          {/* Each button is sized to its own label first (flex-auto: grow and shrink from its natural content width,
              not from a shared fixed share of the row) — a short "Explore ..." and a long "Download ... Brochure"
              sit at their own natural widths side by side, rather than being forced to an equal 50/50 split that
              leaves the long label wrapping while the short one has spare room. Either button is still free to drop
              to its own full-width line the moment both don't fit together; whitespace-normal only matters in the
              rare case a single button, alone on its own full-width line, still can't fit its label on one row. */}
          <div className="mt-4 flex flex-wrap gap-3 sm:mt-6">
            <Link
              href={promo.href}
              onClick={close}
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-11 max-w-full min-w-0 flex-auto justify-center rounded-full px-5 text-center text-[15px] whitespace-normal sm:h-12 sm:text-base lg:h-14 lg:text-lg"
              )}
            >
              {ctaLabel ?? `Explore ${promo.courseName}`}
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
            {brochureInterest && (
              <button
                type="button"
                onClick={downloadBrochure}
                disabled={brochureBusy}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11 max-w-full min-w-0 flex-auto justify-center rounded-full border-primary/30 px-5 text-center text-[15px] whitespace-normal text-foreground hover:bg-muted disabled:opacity-70 sm:h-12 sm:text-base lg:h-14 lg:text-lg"
                )}
              >
                <Download className="size-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0">Download {brochureInterest} Brochure</span>
              </button>
            )}
          </div>
        </div>
      </dialog>
      {brochureViewer}
    </>
  );
}
