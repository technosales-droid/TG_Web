"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function ClosingCta() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-[#0b3d50] px-6 py-14 sm:px-10 sm:py-16 lg:flex lg:items-end lg:gap-10 lg:px-16 lg:py-16">
          <div
            className={cn(
              "relative max-w-2xl transition-all duration-700 lg:w-[42%] lg:shrink-0 lg:self-center",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <span className="inline-flex w-fit shrink-0 items-center gap-2 self-start rounded-full bg-background/15 px-3 py-1.5 text-xs font-semibold text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Start Building
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl lg:text-5xl">
              Learn Skills.
              <br />
              Build Real Work.{" "}
              <span className="text-brand-green">Move Forward.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75 sm:text-lg">
              Turn practical learning into projects, skills and experiences
              you can take into your next opportunity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-11 rounded-full bg-background px-6 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-lg active:translate-y-0"
                )}
              >
                Explore Our Programs
              </Link>
              <Link
                href="/contact"
                className="group flex items-center gap-1 text-base font-medium text-background/90 transition-colors hover:text-background"
              >
                Talk to Techno Gurukul
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Intrinsic width/height (not `fill`) so the image's own aspect ratio drives its
              rendered height directly — it always uses its full column width with zero
              letterboxing, instead of being forced into a fixed box that leaves empty space
              above it. Stacked below the text on mobile/tablet (DOM order), side-by-side with
              the text (never overlapping, by flex construction) from lg up. */}
          <div aria-hidden="true" className="pointer-events-none relative mt-10 lg:mt-0 lg:flex-1">
            <Image
              src="/brand/index-cta.png"
              alt=""
              width={1672}
              height={941}
              sizes="(min-width: 1024px) 56vw, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
