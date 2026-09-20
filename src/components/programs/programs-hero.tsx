"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, Code2, Compass, Hammer, Lightbulb, Megaphone, PenTool } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const CARDS = [
  { icon: Lightbulb, title: "Practical Learning", detail: "Learn by Doing", className: "left-5 top-6", delay: "0s" },
  { icon: Hammer, title: "Real Projects", detail: "Build What You Learn", className: "right-5 top-1/2 -translate-y-1/2", delay: "1s" },
  { icon: Compass, title: "Career Direction", detail: "Skills for What's Next", className: "bottom-6 left-8", delay: "0.5s" },
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function ProgramsHero() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 pt-8 pb-14 sm:px-6 sm:pt-10 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div
              className={cn(
                "transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Our Programs
              </div>

              <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl xl:text-6xl">
                Learn Skills. Build Work.{" "}
                <span className="bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
                  Move Forward.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Explore practical learning programs designed to help you
                develop real skills, create meaningful work and build a
                foundation for your next opportunity.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                  )}
                >
                  Talk to Techno Gurukul
                </Link>
                <Link
                  href="#programs-listing"
                  className="group flex items-center gap-1 py-2 text-base font-medium text-foreground transition-colors duration-300 hover:text-primary"
                >
                  Explore Programs
                  <ArrowDown
                    className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <div
              className={cn(
                "relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] transition-all delay-150 duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
            >
              {/* PROGRAMS HERO IMAGE — FINAL ASSET TO BE PROVIDED.
                  Final markup: replace the gradient/icons below with
                  <img src="..." className="absolute inset-0 h-full w-full object-cover" /> */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/70 to-[#0b3d50]" />
              <div className="absolute inset-0 flex items-center justify-center gap-6 text-background/15" aria-hidden="true">
                <PenTool className="size-12 sm:size-16" />
                <Code2 className="size-12 sm:size-16" />
                <Megaphone className="size-12 sm:size-16" />
              </div>

              {CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    style={{ animationDelay: card.delay }}
                    className={cn(
                      "absolute hidden w-48 items-start gap-3 rounded-2xl border border-primary/10 bg-card p-4 shadow-[0_12px_28px_-14px_rgba(16,20,28,0.3)] transition-all duration-300 hover:-translate-y-1 motion-safe:animate-[gentle-float_6s_ease-in-out_infinite] xl:flex",
                      card.className
                    )}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <p className="text-sm font-semibold text-foreground">{card.title}</p>
                      <p className="text-xs text-muted-foreground">{card.detail}</p>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
