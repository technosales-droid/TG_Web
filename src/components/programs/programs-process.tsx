"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, BookOpen, Hammer, Presentation, Wrench } from "lucide-react";
import { cn } from "cn";

const STAGES = [
  {
    step: "01",
    label: "Learn",
    title: "Build the Fundamentals",
    description:
      "Understand the concepts, tools and workflows that form the foundation of your chosen discipline.",
    icon: BookOpen,
    surface: "bg-card border-primary/10 hover:bg-muted",
    iconWrap: "bg-primary/10 text-primary",
    tone: "text-primary",
    body: "text-muted-foreground",
  },
  {
    step: "02",
    label: "Practice",
    title: "Learn by Doing",
    description:
      "Apply what you learn through hands-on exercises and progressively more practical work.",
    icon: Wrench,
    surface: "bg-primary/10 border-primary/15 hover:bg-primary/15",
    iconWrap: "bg-background text-primary",
    tone: "text-primary",
    body: "text-muted-foreground",
  },
  {
    step: "03",
    label: "Build",
    title: "Create Real Projects",
    description:
      "Combine your skills into projects that go beyond isolated exercises and demonstrate what you can actually do.",
    icon: Hammer,
    surface: "bg-brand-green/10 border-brand-green/20 hover:bg-brand-green/15",
    iconWrap: "bg-background text-brand-green",
    tone: "text-[#1f7a40]",
    body: "text-muted-foreground",
  },
  {
    step: "04",
    label: "Show",
    title: "Build Your Portfolio",
    description:
      "Turn finished work into projects you can present, refine and use to demonstrate your abilities.",
    icon: Presentation,
    surface: "bg-gradient-to-br from-primary to-[#0b3d50] border-transparent",
    iconWrap: "bg-white/15 text-white",
    tone: "text-white/80",
    body: "text-white/85",
  },
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

export function ProgramsProcess() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px] rounded-[2.5rem] border border-primary/10 bg-muted/50 px-4 py-8 sm:p-10 lg:p-14">
        <div
          className={cn(
            "grid gap-6 px-2 sm:px-0 transition-all duration-700 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-12",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              How Our Programs Work
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Learning Should Lead to Something You Can Build.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:pt-9">
            At Techno Gurukul, learning is designed to move beyond theory. Students build their
            understanding step by step, apply their skills through practical work, and bring what
            they learn together in projects they can actually show.
          </p>
        </div>

        <ol className="mt-10 grid gap-8 lg:mt-14 xl:grid-cols-4">
          {STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const dark = index === STAGES.length - 1;
            return (
              <li
                key={stage.step}
                className={cn(
                  "group relative flex flex-col gap-5 rounded-[2rem] border p-6 transition-all duration-500 motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:flex-row sm:items-start sm:p-8 xl:flex-col",
                  stage.surface,
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
                style={{ transitionDelay: visible ? `${index * 120 + 150}ms` : "0ms" }}
              >
                <div className="flex items-center gap-4 xl:w-full xl:justify-between">
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6",
                      stage.iconWrap
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className={cn("text-sm font-semibold tracking-widest uppercase sm:hidden xl:inline", stage.tone)}>
                    {stage.step} — {stage.label}
                  </span>
                </div>

                <div className="min-w-0 sm:flex-1">
                  <p className={cn("hidden text-sm font-semibold tracking-widest uppercase sm:block xl:hidden", stage.tone)}>
                    {stage.step} — {stage.label}
                  </p>
                  <h3
                    className={cn(
                      "text-xl font-semibold tracking-tight text-balance sm:mt-2 xl:mt-0",
                      dark ? "text-white" : "text-foreground"
                    )}
                  >
                    {stage.title}
                  </h3>
                  <p className={cn("mt-3 text-base leading-relaxed", stage.body)}>{stage.description}</p>
                </div>

                {index < STAGES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[calc(100%+1rem)] left-1/2 z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/15 bg-background text-primary shadow-sm transition-transform duration-300 group-hover:translate-y-[-30%] xl:top-1/2 xl:left-[calc(100%+1rem)] xl:-translate-y-1/2 xl:group-hover:translate-x-[-30%] xl:group-hover:translate-y-[-50%]"
                  >
                    <ArrowDown className="size-4 xl:-rotate-90" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
