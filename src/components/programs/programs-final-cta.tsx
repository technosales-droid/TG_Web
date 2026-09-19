"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const TRAIL = ["Learn", "Build", "Move Forward"] as const;

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

export function ProgramsFinalCta() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 pt-2 pb-14 sm:px-6 sm:pb-16">
      <div className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-[#0d6386] to-[#0b3d50]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            }}
          />
          <div className="absolute -top-24 -right-24 size-72 rounded-full border border-white/10 sm:size-96" />
          <div className="absolute -top-8 -right-8 size-40 rounded-full border border-white/10 sm:size-56" />
          <div className="absolute -bottom-28 -left-24 size-72 rounded-full border border-white/10 sm:size-96" />
          <div className="absolute top-[28%] left-[10%] hidden size-3 rounded-full bg-brand-green/80 motion-safe:animate-[gentle-float_6s_ease-in-out_infinite] xl:block" />
          <div className="absolute right-[12%] bottom-[30%] hidden size-2.5 rounded-full bg-white/40 motion-safe:animate-[gentle-float_7s_ease-in-out_infinite] xl:block" />
          <div className="absolute top-[22%] right-[20%] hidden size-6 rotate-12 rounded-lg border border-white/20 motion-safe:animate-[gentle-float_8s_ease-in-out_infinite] xl:block" />
        </div>

        <div
          className={cn(
            "relative mx-auto flex max-w-4xl flex-col items-center px-4 py-14 text-center transition-all duration-700 sm:px-10 sm:py-20 lg:py-24",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-white/85">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Ready to Start Building?
          </div>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            <span className="block text-balance">Choose Your Direction.</span>
            <span className="block text-balance">Start Building What&rsquo;s Next.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Explore a program, understand what you&rsquo;ll learn, and take the first step toward
            building skills you can use in the real world.
          </p>

          <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="#programs-listing"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-12 rounded-full bg-white px-8 text-base font-semibold text-[#0b3d50] shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
              )}
            >
              Explore Programs
            </Link>
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-white/30 px-5 text-base whitespace-nowrap sm:px-7 font-medium text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Talk to Techno Gurukul
              <ArrowUpRight
                className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div
            aria-hidden="true"
            className="mt-12 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider whitespace-nowrap text-white/60 uppercase sm:mt-14 sm:gap-3 sm:text-xs sm:tracking-widest"
          >
            {TRAIL.map((label, i) => (
              <span key={label} className="flex items-center gap-1.5 sm:gap-3">
                <span className="flex items-center gap-1.5">
                  <span
                    className={cn("size-2 rounded-full", i === TRAIL.length - 1 ? "bg-brand-green" : "bg-white/50")}
                  />
                  {label}
                </span>
                {i < TRAIL.length - 1 && <span className="h-px w-4 bg-white/25 sm:w-12" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
