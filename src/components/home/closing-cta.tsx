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
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-[#0b3d50] px-6 py-14 sm:px-10 sm:py-16 lg:overflow-visible lg:px-16 lg:py-16">
          <div
            className={cn(
              "relative z-10 max-w-2xl transition-all duration-700",
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

          {/* Mobile/tablet (below lg): stacked below the text, full column width, intrinsic
              aspect ratio — never cropped. */}
          <div className="px-6 pb-14 sm:px-10 sm:pb-16 lg:hidden">
            <Image
              src="/brand/index-cta.png"
              alt=""
              aria-hidden="true"
              width={1672}
              height={941}
              sizes="90vw"
              className="pointer-events-none mt-10 h-auto w-full"
            />
          </div>

          {/* Desktop (lg+): sized off its own aspect ratio, taller than the panel and
              bottom-anchored so the extra height pushes it up past the panel's top edge. The
              panel switches to `overflow-visible` at lg (its rounded corners are painted by its
              own border-radius regardless, so they still read as rounded) so her head genuinely
              breaks the frame instead of being clipped. Free to sit under the text (z-10) where
              they overlap, since the source PNG is transparent there. */}
          <Image
            src="/brand/index-cta.png"
            alt=""
            aria-hidden="true"
            width={1672}
            height={941}
            sizes="60vw"
            className="pointer-events-none absolute right-0 bottom-0 z-0 hidden h-[155%] w-auto max-w-none lg:block"
          />
        </div>
      </div>
    </section>
  );
}
