"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, Code2, FolderOpen, Palette } from "lucide-react";
import { cn } from "cn";

const PROJECTS = [
  {
    step: "01",
    title: "Digital Projects",
    description:
      "Plan and create digital marketing work across content, campaigns, social media, search and analytics.",
    icon: BarChart3,
    tint: "from-primary/40 to-transparent group-has-[[data-p='0']:hover]/grid:opacity-100",
  },
  {
    step: "02",
    title: "Creative Work",
    description:
      "Develop visual ideas, creative concepts and interactive experiences that turn ideas into something people can see, use or experience.",
    icon: Palette,
    tint: "from-brand-green/40 to-transparent group-has-[[data-p='1']:hover]/grid:opacity-100",
  },
  {
    step: "03",
    title: "Technical Builds",
    description:
      "Apply technical skills to create functional experiences, interactive projects and digital products.",
    icon: Code2,
    tint: "from-[#0b3d50]/50 to-transparent group-has-[[data-p='2']:hover]/grid:opacity-100",
  },
  {
    step: "04",
    title: "Portfolio Work",
    description:
      "Turn completed projects into work you can refine, document and present as evidence of what you can do.",
    icon: FolderOpen,
    tint: "from-primary/40 via-brand-green/20 to-transparent group-has-[[data-p='3']:hover]/grid:opacity-100",
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

export function ProgramsOutcomes() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "max-w-3xl transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            What You Can Build
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Don&apos;t Just Learn the Skill.
            <br />
            Build Something With It.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Learning becomes more meaningful when students can put their skills together. From
            individual exercises to larger projects, the focus is on creating work that can be
            tested, refined and eventually presented.
          </p>
        </div>

        <div className="group/grid mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* PROJECT SHOWCASE VISUAL — FINAL ASSET TO BE PROVIDED */}
          <div
            className={cn(
              "relative min-h-[320px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/80 to-[#0b3d50] transition-all duration-700 sm:min-h-[420px] lg:min-h-[520px]",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
          >
            {PROJECTS.map((p) => (
              <div
                key={p.step}
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 bg-gradient-to-tr opacity-0 transition-opacity duration-500",
                  p.tint
                )}
              />
            ))}
            <div
              aria-hidden="true"
              className="absolute inset-6 flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm sm:inset-10"
            >
              <div className="flex items-center gap-1.5 border-b border-white/15 px-5 py-3.5">
                <span className="size-2.5 rounded-full bg-white/40" />
                <span className="size-2.5 rounded-full bg-white/30" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="ml-3 h-2.5 w-24 rounded-full bg-white/20 sm:w-40" />
              </div>
              <div className="grid flex-1 grid-cols-3 grid-rows-3 gap-3 p-5 sm:gap-4 sm:p-6">
                <div className="col-span-2 row-span-2 rounded-2xl bg-white/20" />
                <div className="rounded-2xl bg-brand-green/40" />
                <div className="rounded-2xl bg-white/10" />
                <div className="rounded-2xl bg-white/15" />
                <div className="col-span-3 rounded-2xl bg-white/10" />
              </div>
            </div>
          </div>

          <ul className="grid gap-4 lg:gap-5">
            {PROJECTS.map((p, index) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.step}
                  data-p={index}
                  className={cn(
                    "group flex gap-4 rounded-[2rem] border border-primary/10 bg-card p-5 transition-all duration-500 hover:bg-muted motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:p-6",
                    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  )}
                  style={{ transitionDelay: visible ? `${index * 100 + 150}ms` : "0ms" }}
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">{p.title}</h3>
                      <ArrowRight
                        className="size-4 shrink-0 text-primary transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
