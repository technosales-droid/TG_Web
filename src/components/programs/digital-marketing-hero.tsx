"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Megaphone, Search, Share2 } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const BARS = [38, 58, 46, 74, 92];

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function DigitalMarketingHero({ focus }: { focus: string }) {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 pt-8 pb-14 sm:px-6 sm:pt-10 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-10 xl:grid-cols-2 xl:gap-16">
            <div
              className={cn(
                "transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Digital Marketing
              </div>

              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl xl:text-[2.75rem] 2xl:text-5xl">
                <span className="block text-balance">Learn Digital Marketing.</span>{" "}
                <span className="block text-balance bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
                  Build Work That Matters.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Learn how brands grow in the digital world through strategy, content, social media,
                search, advertising and analytics — then apply those skills through practical work.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {/* Anchor target arrives with Section 02 (program overview). */}
                <Link
                  href="#program-overview"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                  )}
                >
                  Explore the Program
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center gap-1 py-2 text-base font-medium text-foreground transition-colors duration-300 hover:text-primary"
                >
                  Talk to Techno Gurukul
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* DIGITAL MARKETING HERO VISUAL — abstract campaign/analytics composition, no real figures.
                Final asset may replace the frame below. */}
            <div
              className={cn(
                "group relative aspect-[4/3] w-full sm:aspect-[16/9] xl:aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary/80 to-[#0b3d50] transition-all delay-150 duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
            >
              <span className="absolute top-4 left-4 z-10 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground sm:top-5 sm:left-5">
                Digital &amp; Marketing
              </span>

              <div
                aria-hidden="true"
                className="absolute inset-x-4 top-14 bottom-4 flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm sm:inset-x-8 sm:top-16 sm:bottom-8 xl:bottom-32"
              >
                <div className="flex items-center gap-3 border-b border-white/15 px-4 py-2.5 sm:py-3">
                  <span className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-white/40" />
                    <span className="size-2 rounded-full bg-white/30" />
                    <span className="size-2 rounded-full bg-white/20" />
                  </span>
                  <span className="flex h-6 flex-1 items-center gap-2 rounded-full bg-white/15 px-3">
                    <Search className="size-3 text-white/70" />
                    <span className="h-1.5 w-1/3 rounded-full bg-white/30" />
                  </span>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-3 p-3 sm:p-4">
                  <div className="flex items-end gap-1.5 rounded-xl bg-white/15 p-3 sm:gap-2">
                    {BARS.map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}%` }}
                        className={cn(
                          "flex-1 origin-bottom rounded-t-md transition-transform duration-500 motion-safe:group-hover:scale-y-[1.08]",
                          i === BARS.length - 1 ? "bg-brand-green/80" : "bg-white/45"
                        )}
                      />
                    ))}
                  </div>
                  <div className="relative rounded-xl bg-white/15 p-3">
                    <svg viewBox="0 0 120 60" preserveAspectRatio="none" className="size-full">
                      <defs>
                        <linearGradient id="dm-area" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 46 C15 42 25 22 45 30 S75 12 90 20 S110 8 120 5 V60 H0 Z" fill="url(#dm-area)" />
                      <path
                        d="M0 46 C15 42 25 22 45 30 S75 12 90 20 S110 8 120 5"
                        fill="none"
                        stroke="white"
                        strokeOpacity="0.8"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                  <div className="col-span-2 hidden gap-3 lg:grid lg:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-xl bg-white/15 p-3">
                      <Share2 className="size-5 shrink-0 text-white/80" />
                      <span className="flex-1 space-y-1.5">
                        <span className="block h-1.5 rounded-full bg-white/40" />
                        <span className="block h-1.5 w-2/3 rounded-full bg-white/25" />
                      </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/15 p-3">
                      <Megaphone className="size-5 shrink-0 text-white/80" />
                      <span className="flex-1 space-y-1.5">
                        <span className="block h-1.5 rounded-full bg-white/40" />
                        <span className="block h-1.5 w-1/2 rounded-full bg-white/25" />
                      </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/15 p-3">
                      <BarChart3 className="size-5 shrink-0 text-white/80" />
                      <span className="flex-1 space-y-1.5">
                        <span className="block h-1.5 rounded-full bg-white/40" />
                        <span className="block h-1.5 w-3/4 rounded-full bg-white/25" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-5 left-8 hidden max-w-[20rem] items-start gap-3 rounded-2xl border border-primary/10 bg-card p-4 shadow-[0_12px_28px_-14px_rgba(16,20,28,0.3)] transition-all duration-300 hover:-translate-y-1 motion-safe:animate-[gentle-float_6s_ease-in-out_infinite] xl:flex"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Megaphone className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <p className="text-sm font-semibold text-foreground">Focus Areas</p>
                  <p className="text-xs text-muted-foreground">{focus}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
