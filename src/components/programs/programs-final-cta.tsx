"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Quote, Star } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { CTA_LINK } from "@/components/navigation/nav-data";
import { TESTIMONIALS } from "@/data/testimonials";

const AUTOPLAY_MS = 5500;
const TRANSITION_MS = 300;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useRevealOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function TestimonialCarousel({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [entering, setEntering] = useState(true);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(prefersReducedMotion());
  const swapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => {
    const target = (next + TESTIMONIALS.length) % TESTIMONIALS.length;
    if (target === index) return;
    if (swapTimeout.current) clearTimeout(swapTimeout.current);
    if (reducedMotion.current) {
      setIndex(target);
      return;
    }
    setEntering(false);
    swapTimeout.current = setTimeout(() => {
      setIndex(target);
      setEntering(true);
    }, TRANSITION_MS);
  };

  useEffect(() => {
    if (reducedMotion.current || paused || TESTIMONIALS.length < 2) return;
    const id = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  useEffect(() => () => { if (swapTimeout.current) clearTimeout(swapTimeout.current); }, []);

  const t = TESTIMONIALS[index];
  if (!t) return null;

  const fade = cn("transition-all motion-reduce:transition-none", entering ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0");
  const fadeStyle = { transitionDuration: `${TRANSITION_MS}ms` };

  return (
    <div
      className={cn("relative flex w-full flex-col", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative z-10 flex flex-1 flex-col rounded-[1.75rem] bg-card p-6 pt-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] sm:p-8 sm:pt-12 xl:p-10 xl:pt-14">
        <span aria-hidden="true" className="absolute -top-5 left-6 flex size-12 items-center justify-center rounded-full bg-foreground text-background sm:left-8 xl:size-14">
          <Quote className="size-5 fill-current" />
        </span>
        <div className={cn("flex gap-1", fade)} style={fadeStyle} role="img" aria-label={`Rated ${t.rating} out of 5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} aria-hidden="true" className={cn("size-5 xl:size-6", n <= t.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/20")} />
          ))}
        </div>
        <blockquote aria-live="polite" className={cn("mt-4 text-lg leading-relaxed text-balance text-foreground xl:my-auto xl:text-2xl", fade)} style={fadeStyle}>
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      <div className="-mt-8 rounded-[1.75rem] bg-gradient-to-br from-primary to-[#0b3d50] px-6 pt-14 pb-6 sm:px-8 xl:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div className={cn("flex items-center gap-4", fade)} style={fadeStyle}>
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white" aria-hidden="true">
              {t.avatar ? (
                <Image src={t.avatar} alt="" width={48} height={48} className="size-full rounded-full object-cover" />
              ) : (
                initials(t.name)
              )}
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-white uppercase xl:text-2xl">{t.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-white/75 uppercase">
                <ArrowDownRight className="size-4" aria-hidden="true" />
                {t.role}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span className={cn("inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground", fade)} style={fadeStyle}>
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              {t.program}
            </span>
            {TESTIMONIALS.length > 1 && (
              <div role="group" aria-label="Testimonials" className="flex items-center gap-2">
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show testimonial from ${item.name}`}
                    aria-current={i === index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      i === index ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// The emotional close of the Programs page: after browsing the catalogue above, this answers
// "what happens next" — pick a direction, learn by doing, build something real.
export function ProgramsFinalCta() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="enquire" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[2.5rem]">
        <div aria-hidden="true" className="absolute inset-0">
          <Image src="/brand/programs-final-cta.png" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/60 xl:bg-transparent xl:bg-gradient-to-r xl:from-black/80 xl:from-0% xl:via-black/45 xl:via-35% xl:to-transparent xl:to-60%" />
        </div>

        <div
          className={cn(
            "relative flex flex-col gap-10 px-5 py-12 transition-all duration-700 sm:px-10 sm:py-16 xl:min-h-[620px] xl:flex-row xl:items-center xl:justify-between xl:gap-12 xl:px-16 xl:py-20",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-sm font-medium text-white/85">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Your Next Step
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
              Choose a Skill. Build Something Real.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
              Explore practical programs in digital marketing, game development and game design
              &mdash; built around learning by doing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/programs#programs-listing"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "min-h-12 rounded-full bg-white px-8 text-base font-semibold text-[#0b3d50] shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
                )}
              >
                Explore Programs
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={CTA_LINK.href}
                className="group flex items-center gap-1 text-base font-medium text-white/90 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Talk to Admissions
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

          </div>

          <TestimonialCarousel className="w-full max-w-3xl xl:absolute xl:top-[12%] xl:right-[5%] xl:bottom-[12%] xl:w-[45%] xl:max-w-[860px]" />
        </div>
      </div>
    </section>
  );
}
