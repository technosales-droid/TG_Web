"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

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
    <section ref={ref} className="px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0d6386] to-[#0b3d50]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 size-72 rounded-full border border-white/10 sm:size-96" />
          <div className="absolute -top-8 -right-8 size-40 rounded-full border border-white/10 sm:size-56" />
        </div>

        <div
          className={cn(
            "relative grid grid-cols-[minmax(0,1fr)] items-center gap-8 px-5 py-10 transition-all duration-700 sm:px-10 sm:py-12 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-16 xl:px-16",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-white/85">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Ready to Start Building?
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              Choose Your Direction. Start Building What&rsquo;s Next.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Explore a program, understand what you&rsquo;ll learn, and take the first step toward
              building practical skills.
            </p>
          </div>

          <div className="xl:justify-self-end">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default" }),
                "min-h-12 w-full rounded-full bg-white px-4 py-2 text-center text-base font-semibold text-[#0b3d50] shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0 sm:w-auto sm:px-8"
              )}
            >
              Talk to Techno Gurukul
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
