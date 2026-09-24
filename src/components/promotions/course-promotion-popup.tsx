"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useModal } from "@/components/learning/projects/use-modal";
import { buttonVariants } from "@/components/ui/button";
import { COURSE_PROMOTIONS, type PromotionMessage } from "@/data/course-promotions";
import { cn } from "cn";
import { pickNext } from "./rotation";

const DELAY_S = 45;
const STORAGE_KEY = "tg-course-promo";
const IDS = COURSE_PROMOTIONS.map((p) => p.courseId);

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

/** True while something else owns the visitor's attention: an open menu or dialog, a locked page, or a field being used. */
function isBusy() {
  const el = document.activeElement;
  return Boolean(
    document.querySelector('dialog[open], header [aria-expanded="true"], header [data-popup-open]') ||
      document.body.style.overflow === "hidden" ||
      el?.closest("form, input, textarea, select, [contenteditable='true']"),
  );
}

/**
 * One global promotion modal (native <dialog>: dims and inerts the page, locks scroll, traps focus). After 45 seconds of active browsing (tab visible) it promotes one course; once
 * closed the next 45 seconds start and a different course is shown, until all have been shown. Copy and courses live in
 * data/course-promotions.ts. It stays until the visitor closes it (button or Escape), not on backdrop click.
 */
export function CoursePromotionPopup() {
  const pathname = usePathname();
  const [current, setCurrent] = useState<{ courseId: string; message: PromotionMessage } | null>(null);
  const seconds = useRef(0);
  const modalRef = useModal(current !== null);
  const onContact = pathname.startsWith("/contact");

  const close = useCallback(() => {
    seconds.current = 0;
    setCurrent(null);
  }, []);

  useEffect(() => {
    if (current || !IDS.length) return;
    const tick = setInterval(() => {
      if (document.hidden) return;
      seconds.current += 1;
      // Past the delay, keep waiting until the visitor is free rather than skipping the promotion.
      if (seconds.current < DELAY_S || onContact || isBusy()) return;
      const next = pickNext(IDS, readShown());
      writeShown(next.shown);
      const { messages } = COURSE_PROMOTIONS.find((p) => p.courseId === next.id)!;
      setCurrent({ courseId: next.id, message: messages[Math.floor(Math.random() * messages.length)] });
    }, 1000);
    return () => clearInterval(tick);
  }, [current, onContact]);

  if (!current) return null;
  const promo = COURSE_PROMOTIONS.find((p) => p.courseId === current.courseId)!;
  const { headline, description, ctaLabel } = current.message;

  return (
    <dialog
      ref={modalRef}
      onClose={close}
      aria-label={`Featured program: ${promo.courseName}`}
      className="course-promo m-auto w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl sm:max-w-md sm:rounded-3xl lg:max-w-xl xl:max-w-2xl border border-primary/10 bg-card p-0 text-foreground shadow-[0_24px_60px_-20px_rgba(16,20,28,0.5)] backdrop:bg-black/60"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close promotion"
        className="absolute top-2 right-2 lg:top-4 lg:right-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:size-10 lg:size-11"
      >
        <X className="size-5 sm:size-5" aria-hidden="true" />
      </button>

      {promo.image && (
        <div className="relative aspect-[16/9] bg-muted">
          <Image src={promo.image.src} alt={promo.image.alt} fill sizes="(min-width: 1280px) 672px, (min-width: 1024px) 576px, (min-width: 640px) 448px, 384px" className="object-cover" />
        </div>
      )}

      <div className={cn("p-4 sm:p-6 lg:p-8", !promo.image && "pr-14")}>
        <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] lg:text-sm text-primary uppercase">
          <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
          {promo.category}
        </div>
        <p className="mt-2 text-lg leading-snug sm:mt-3 sm:text-xl lg:text-2xl xl:text-3xl font-semibold tracking-tight text-balance text-foreground">{headline}</p>
        <p className="mt-1.5 text-sm leading-relaxed sm:mt-2 sm:text-base lg:text-lg text-muted-foreground">{description}</p>
        <Link
          href={promo.href}
          onClick={close}
          className={cn(buttonVariants({ variant: "default" }), "mt-4 h-11 w-full rounded-full px-5 text-[15px] sm:mt-6 sm:h-12 sm:text-base lg:h-14 lg:text-lg")}
        >
          {ctaLabel ?? `Explore ${promo.courseName}`}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </dialog>
  );
}
