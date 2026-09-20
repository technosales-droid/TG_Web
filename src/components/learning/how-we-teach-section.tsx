"use client";

import { useId, useState } from "react";
import { BookOpen, Check, ChevronDown, Layers, Presentation, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";

// Program-agnostic: this describes how ALL Techno Gurukul learning works. Keep programs, tools and
// course names out of this section; they belong on program and course pages.
type VisualKey = "learn" | "practice" | "build" | "show";

const STAGES: {
  key: VisualKey;
  number: string;
  icon: LucideIcon;
  title: string;
  headline: string;
  description: string;
  principle: string;
}[] = [
  {
    key: "learn",
    number: "01",
    icon: BookOpen,
    title: "Learn",
    headline: "Build the Fundamentals",
    description: "Understand the concepts, tools and workflows that form the foundation of the discipline.",
    principle: "Understand before you build.",
  },
  {
    key: "practice",
    number: "02",
    icon: Wrench,
    title: "Practice",
    headline: "Learn by Doing",
    description: "Apply what you learn through exercises and progressively more practical work.",
    principle: "Apply before you scale.",
  },
  {
    key: "build",
    number: "03",
    icon: Layers,
    title: "Build",
    headline: "Create Real Projects",
    description:
      "Combine your skills into projects that move beyond isolated exercises and demonstrate what you can actually do.",
    principle: "Create something tangible.",
  },
  {
    key: "show",
    number: "04",
    icon: Presentation,
    title: "Show",
    headline: "Build Your Portfolio",
    description:
      "Turn finished work into projects you can present, refine and use to demonstrate your abilities.",
    principle: "Turn work into proof.",
  },
];

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// Small abstract picture for each stage. Decorative only.
function StageVisual({ kind }: { kind: VisualKey }) {
  return (
    <div aria-hidden="true" className="flex h-16 items-center rounded-xl bg-primary/5 px-4">
      {kind === "learn" && (
        <div className="grid w-full gap-2">
          <span className="h-2 w-4/5 rounded-full bg-primary/25" />
          <span className="h-2 w-3/5 rounded-full bg-primary/15" />
          <span className="h-2 w-2/5 rounded-full bg-primary/10" />
        </div>
      )}
      {kind === "practice" && (
        <div className="flex w-full items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "flex size-7 items-center justify-center rounded-md border",
                i < 2 ? "border-brand-green/40 bg-brand-green/15 text-brand-green" : "border-dashed border-primary/30"
              )}
            >
              {i < 2 && <Check className="size-4" />}
            </span>
          ))}
          <span className="ml-1 h-2 flex-1 rounded-full bg-primary/15" />
        </div>
      )}
      {kind === "build" && (
        <div className="grid w-full grid-cols-4 gap-1.5">
          <span className="col-span-2 h-6 rounded-md bg-primary/30" />
          <span className="h-6 rounded-md bg-brand-green/35" />
          <span className="h-6 rounded-md bg-primary/15" />
          <span className="h-6 rounded-md bg-primary/15" />
          <span className="col-span-3 h-6 rounded-md bg-gradient-to-r from-primary/30 to-brand-green/35" />
        </div>
      )}
      {kind === "show" && (
        <div className="flex w-full items-center gap-3">
          <span className="h-10 w-16 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/25 to-brand-green/30" />
          <span className="grid flex-1 gap-1.5">
            <span className="h-2 w-4/5 rounded-full bg-primary/20" />
            <span className="h-2 w-1/2 rounded-full bg-brand-green/35" />
          </span>
        </div>
      )}
    </div>
  );
}

function Stage({ stage, isLast }: { stage: (typeof STAGES)[number]; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Icon = stage.icon;

  return (
    <li className="group relative min-w-0 pl-14 md:pl-0">
      {/* Connectors (decorative): a vertical rail on mobile, a horizontal link from lg up */}
      {!isLast && (
        <>
          <span
            aria-hidden="true"
            className="absolute top-10 bottom-[-1.5rem] left-5 w-px bg-primary/20 transition-colors duration-300 group-hover:bg-primary md:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute top-5 left-14 hidden h-px bg-primary/20 transition-colors duration-300 group-hover:bg-primary lg:block lg:right-[-1.5rem] xl:right-[-2rem]"
          />
        </>
      )}

      {/* Step number node */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-[0_10px_20px_-10px_rgba(13,99,134,0.6)] ring-4 ring-background transition-transform duration-300 motion-safe:group-hover:scale-110"
      >
        {stage.number}
      </span>

      <div
        className={cn(
          "rounded-3xl border border-primary/10 bg-card/70 p-5 transition-all duration-300 group-hover:bg-card group-hover:shadow-[0_18px_36px_-22px_rgba(16,20,28,0.35)] motion-safe:group-hover:-translate-y-1 md:mt-14 sm:p-6",
          open && "border-primary/30 bg-card"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
            <Icon
              className="size-5 transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
              aria-hidden="true"
            />
          </span>
          <div className="min-w-0">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">{stage.title}</h3>
            <p className="text-sm font-semibold text-primary">{stage.headline}</p>
          </div>
        </div>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{stage.description}</p>

        <div className="mt-4">
          <StageVisual kind={stage.key} />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-full text-sm font-semibold text-primary underline-offset-4 hover:underline",
            FOCUS
          )}
        >
          {open ? "Hide the principle" : "See the principle"}
          <ChevronDown
            className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
        <p
          id={panelId}
          hidden={!open}
          className="mt-1 border-l-2 border-brand-green pl-3 text-base font-medium text-foreground"
        >
          {stage.principle}
        </p>
      </div>
    </li>
  );
}

export function HowWeTeachSection() {
  return (
    <section id="how-we-teach" aria-labelledby="how-we-teach-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              How We Teach
            </div>
            <h2
              id="how-we-teach-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
            >
              <span className="block">Learn by Doing.</span>
              <span className="block bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
                Build by Practising.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Learning is designed to move beyond theory. Students build their understanding step by step, apply what
              they learn through practical work, and bring those skills together through projects.
            </p>
          </div>

          <ol
            aria-label="The four stages of learning"
            className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6 xl:gap-8"
          >
            {STAGES.map((stage, i) => (
              <Stage key={stage.key} stage={stage} isLast={i === STAGES.length - 1} />
            ))}
          </ol>

          <p className="mt-10 max-w-3xl border-l-4 border-brand-green pl-5 text-lg leading-relaxed font-medium text-foreground sm:text-xl lg:mt-14">
            Every stage builds on the previous one. The goal is not simply to finish lessons, but to develop the
            ability to use what you learn.
          </p>
        </div>
      </div>
    </section>
  );
}
