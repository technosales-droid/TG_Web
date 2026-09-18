"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Hammer, Lightbulb, Rocket, Sparkles, Star } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const STEPS = [
  { label: "Learn", icon: Lightbulb },
  { label: "Build", icon: Hammer },
  { label: "Move Forward", icon: Rocket },
] as const;

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
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-[#0b3d50] px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Decorative accents, desktop only, subtle - same restrained
              language as the Hero's own decorative doodles. */}
          <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
            <Star className="absolute top-10 right-[22%] size-5 fill-background/10 text-background/20 motion-safe:animate-[pulse_5s_ease-in-out_infinite]" />
            <Sparkles
              className="absolute right-16 bottom-16 size-6 text-brand-green/40 motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Learn -> Build -> Move Forward progression, desktop only -
              fills the open right side without becoming a card grid. */}
          <div
            className={cn(
              "absolute top-1/2 right-14 hidden -translate-y-1/2 flex-col gap-7 transition-all delay-300 duration-700 xl:flex xl:right-20",
              visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            )}
          >
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-background/10 text-background">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-background/80">{step.label}</span>
                  {index < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-11 left-[1.375rem] h-7 w-px translate-y-full bg-background/15"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div
            className={cn(
              "relative max-w-2xl transition-all duration-700",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1.5 text-xs font-semibold text-background">
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
        </div>
      </div>
    </section>
  );
}
