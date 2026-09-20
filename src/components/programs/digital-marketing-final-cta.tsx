"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { CTA_LINK } from "@/components/navigation/nav-data";

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

// Copy is the program-page and admissions CTA wording from the Techno Gurukul web copy.
// The enquiry destination is the site-wide "Enquire Now" route.
export function DigitalMarketingFinalCta() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="enquire" className="scroll-mt-28 px-4 pt-2 pb-16 sm:px-6 sm:pb-20">
      <div className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0d6386] to-[#0b3d50]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 size-72 rounded-full border border-white/10 sm:size-96" />
          <div className="absolute -top-8 -right-8 size-40 rounded-full border border-white/10 sm:size-56" />
        </div>

        <div
          className={cn(
            "relative grid grid-cols-[minmax(0,1fr)] items-center gap-8 px-5 py-12 transition-all duration-700 sm:px-10 sm:py-16 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-16 xl:px-16 xl:py-20",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-white/85">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Your Next Skill Starts Here.
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
              Ready to Turn Knowledge Into Work?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Applications are open for the next Digital Marketing Professional Program at
              TechnoGurukul, Nashik.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center xl:w-full xl:max-w-sm xl:flex-col xl:items-stretch xl:justify-self-end">
            <Link
              href={CTA_LINK.href}
              className={cn(
                buttonVariants({ variant: "default" }),
                "min-h-12 rounded-full bg-white px-4 py-2 text-center text-base font-semibold sm:px-8 text-[#0b3d50] shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
              )}
            >
              Enquire About the Program
            </Link>
            <Link
              href="/programs"
              className="group inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-center text-base font-medium text-white sm:px-7 sm:whitespace-nowrap transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore All Programs
              <ArrowUpRight
                className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
