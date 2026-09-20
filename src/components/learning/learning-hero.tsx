"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Check, ChevronRight, Layers, Presentation, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const STAGES: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: BookOpen, title: "Learn", detail: "Build the fundamentals" },
  { icon: Wrench, title: "Practice", detail: "Learn by doing" },
  { icon: Layers, title: "Build", detail: "Create real projects" },
  { icon: Presentation, title: "Show", detail: "Build your portfolio" },
];

const LABELS = ["Practical Learning", "Hands-On Work", "Real Projects", "Portfolio Evidence"];

// The abstract "project" fills in as the learner moves through the stages. It is a placeholder
// composition, not a screenshot of any real tool or student work.
function ProjectPreview({ stage }: { stage: number }) {
  const step = "transition-all duration-500";
  return (
    <div aria-hidden="true" className="rounded-2xl border border-primary/10 bg-card p-4 shadow-[0_18px_36px_-24px_rgba(16,20,28,0.35)]">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-primary/25" />
        <span className="size-2.5 rounded-full bg-brand-green/40" />
        <span className={cn("ml-2 h-2.5 rounded-full bg-primary/15", step, stage >= 1 ? "w-24" : "w-12")} />
      </div>

      <div
        className={cn(
          "mt-4 h-24 rounded-xl border border-dashed transition-all duration-500 sm:h-28",
          stage >= 2 ? "border-transparent bg-gradient-to-br from-primary/30 to-brand-green/35" : "border-primary/25 bg-primary/5"
        )}
      />

      <div className="mt-4 grid gap-2">
        <div className={cn("h-2.5 rounded-full", step, stage >= 1 ? "w-4/5 bg-primary/20" : "w-4/5 bg-muted")} />
        <div className={cn("h-2.5 rounded-full", step, stage >= 1 ? "w-3/5 bg-primary/15" : "w-3/5 bg-muted")} />
        <div className={cn("h-2.5 rounded-full", step, stage >= 2 ? "w-2/5 bg-brand-green/40" : "w-2/5 bg-muted")} />
      </div>

      <div
        className={cn(
          "mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-500",
          stage >= 3 ? "bg-brand-green text-white opacity-100" : "bg-muted text-muted-foreground opacity-70"
        )}
      >
        <Check className="size-3.5" />
        {stage >= 3 ? "Portfolio-ready" : "In progress"}
      </div>
    </div>
  );
}

function LearningVisual() {
  const [stage, setStage] = useState(0);
  const current = STAGES[stage];

  return (
    <div className="w-full">
      <ul aria-label="What this learning looks like" className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:justify-start">
        {LABELS.map((label, i) => (
          <li
            key={label}
            style={{ animationDelay: `${i * 0.8}s` }}
            className="rounded-full border border-primary/10 bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-[0_8px_20px_-12px_rgba(16,20,28,0.3)] transition-all duration-300 hover:-translate-y-1 sm:text-sm motion-safe:animate-[gentle-float_7s_ease-in-out_infinite]"
          >
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center sm:gap-5">
        {/* Four connected stages */}
        <ol aria-label="Learning workflow" className="relative grid gap-3">
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-[1.6rem] w-px bg-primary/20" />
          {STAGES.map(({ icon: Icon, title, detail }, i) => {
            const active = i === stage;
            const done = i < stage;
            return (
              <li key={title} className="relative min-w-0">
                <button
                  type="button"
                  aria-current={active ? "step" : undefined}
                  onClick={() => setStage(i)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 motion-safe:hover:-translate-y-0.5 sm:p-3.5",
                    FOCUS,
                    active
                      ? "border-primary/40 bg-card shadow-[0_14px_28px_-16px_rgba(13,99,134,0.45)]"
                      : "border-primary/10 bg-card/70 hover:bg-card"
                  )}
                >
                  <span
                    className={cn(
                      "relative flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300",
                      active || done ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
                    )}
                  >
                    <Icon
                      className="size-4 transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      0{i + 1}
                    </span>
                    <span className="block text-base font-semibold text-foreground">{title}</span>
                    <span className="block text-sm text-muted-foreground">{detail}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Central project that builds up */}
        <div className="min-w-0">
          <ProjectPreview stage={stage} />
          <p aria-live="polite" className="mt-3 text-center text-sm font-medium text-muted-foreground">
            Stage {stage + 1} of 4: {current.title} &mdash; {current.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

export function LearningHero() {
  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 lg:min-h-[650px] lg:px-12 lg:py-14 xl:px-16">
          {/* Restrained backdrop tint, desktop only */}
          <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[54%] lg:block">
            <div className="absolute inset-0 bg-primary/8 [clip-path:polygon(16%_0%,100%_0%,100%_100%,0%_100%)]" />
            <div className="absolute inset-0 bg-brand-green/10 [clip-path:polygon(62%_0%,100%_0%,100%_45%)]" />
          </div>

          <div className="relative grid items-center gap-10 lg:min-h-[520px] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 xl:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                How We Learn
              </div>

              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl xl:text-6xl">
                Learning Should Lead to{" "}
                <span className="inline-block bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
                  Something You Can Build.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                At Techno Gurukul, learning is designed to move beyond theory. Students build their understanding
                step by step, apply their skills through practical work, and bring what they learn together in
                projects they can actually show.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/programs"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                  )}
                >
                  Explore Our Programs
                </Link>
                <Link
                  href="/learning/how-we-teach"
                  className="group flex items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  See How We Teach
                  <ChevronRight
                    className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <LearningVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
