"use client";

import { useState } from "react";
import { ArrowRight, Check, Code2, Palette, Presentation, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";

// Program-agnostic project TYPES, not promises that every student completes every item. The workspace
// is an abstract placeholder: no real screenshots, students, clients, dates or results.
type FrameKey = "digital" | "creative" | "technical" | "portfolio";

const STEPS = ["Idea", "Build", "Test", "Refine", "Present"];

const CATEGORIES: {
  id: FrameKey;
  number: string;
  icon: LucideIcon;
  title: string;
  /** Project types listed on the selector. */
  types: string[];
  /** Featured workspace content. */
  featuredTitle: string;
  chips: string[];
  meta: { project: string; status: string; stage: string };
  /** Index of the current step in STEPS. */
  step: number;
}[] = [
  {
    id: "digital",
    number: "01",
    icon: TrendingUp,
    title: "Digital Projects",
    types: ["Campaigns", "Content projects", "SEO projects", "Analytics work", "Digital strategy"],
    featuredTitle: "Featured Digital Project",
    chips: ["Campaign", "SEO", "Analytics", "Content"],
    meta: { project: "Practical Build", status: "In Progress", stage: "Build → Refine → Present" },
    step: 1,
  },
  {
    id: "creative",
    number: "02",
    icon: Palette,
    title: "Creative Projects",
    types: ["Visual concepts", "3D work", "Animation", "VFX", "Interactive experiences"],
    featuredTitle: "Featured Creative Project",
    chips: ["3D", "Animation", "VFX", "Visual Design"],
    meta: { project: "Creative Build", status: "In Progress", stage: "Explore → Build → Refine" },
    step: 1,
  },
  {
    id: "technical",
    number: "03",
    icon: Code2,
    title: "Technical Projects",
    types: ["Applications", "Interactive systems", "Prototypes", "Gameplay systems", "Technical experiments"],
    featuredTitle: "Featured Technical Project",
    chips: ["Prototype", "Application", "Interactive System", "Gameplay"],
    meta: { project: "Technical Build", status: "Testing", stage: "Build → Test → Refine" },
    step: 2,
  },
  {
    id: "portfolio",
    number: "04",
    icon: Presentation,
    title: "Portfolio Projects",
    types: ["Polished final projects", "Project documentation", "Case-study style presentations", "Portfolio-ready work"],
    featuredTitle: "Featured Portfolio Project",
    chips: ["Case Study", "Documentation", "Presentation", "Final Project"],
    meta: { project: "Portfolio Piece", status: "Ready to Present", stage: "Document → Refine → Present" },
    step: 4,
  },
];

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// Abstract picture of the project. Decorative, not a screenshot of any tool or real work.
function ProjectFrame({ kind }: { kind: FrameKey }) {
  const block = "rounded-md bg-background/20";
  return (
    <div aria-hidden="true" className="h-32 rounded-2xl border border-background/15 bg-background/10 p-4 sm:h-36">
      {kind === "digital" && (
        <div className="flex h-full items-end gap-2.5">
          {[45, 70, 55, 85, 65].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={cn("flex-1", block, i === 3 && "bg-brand-green/70")} />
          ))}
        </div>
      )}
      {kind === "creative" && (
        <div className="relative h-full">
          <span className="absolute top-1 left-2 size-16 rounded-full bg-background/25 sm:size-20" />
          <span className="absolute top-6 left-16 size-14 rotate-12 rounded-xl bg-brand-green/50 sm:left-20 sm:size-16" />
          <span className="absolute right-2 bottom-1 h-10 w-24 rounded-full bg-background/15 sm:w-32" />
        </div>
      )}
      {kind === "technical" && (
        <div className="grid h-full grid-cols-3 items-center gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={cn("h-8 rounded-md", i === 4 ? "bg-brand-green/60" : "bg-background/20")} />
          ))}
        </div>
      )}
      {kind === "portfolio" && (
        <div className="flex h-full items-center gap-3">
          <span className="h-full w-1/3 rounded-lg bg-background/25" />
          <span className="grid h-full flex-1 content-center gap-2.5">
            <span className={cn("h-2.5 w-4/5", block)} />
            <span className={cn("h-2.5 w-3/5", block)} />
            <span className="h-2.5 w-2/5 rounded-md bg-brand-green/60" />
          </span>
        </div>
      )}
    </div>
  );
}

export function LearningProjectsPreview() {
  const [selected, setSelected] = useState<FrameKey>("digital");
  const current = CATEGORIES.find((c) => c.id === selected) ?? CATEGORIES[0];

  return (
    <section id="learning-projects" aria-labelledby="learning-projects-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Projects That Put Skills to Work
          </div>
          <h2
            id="learning-projects-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            <span className="block">Don&rsquo;t Just Finish Lessons.</span>
            <span className="block bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
              Build Something You Can Show.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Projects bring learning together. Students combine concepts, tools and practical skills to create work
            they can test, refine, document and present.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:mt-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
          {/* Featured project workspace */}
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary p-5 text-background shadow-[0_28px_56px_-32px_rgba(11,61,80,0.7)] sm:p-8">
            <span aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-28 size-72 rounded-full border border-background/10" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-background/40" />
                  <span className="size-2.5 rounded-full bg-brand-green/70" />
                  <span className="size-2.5 rounded-full bg-background/25" />
                </span>
                <p className="text-[11px] font-semibold tracking-widest text-background/70 uppercase">Project workspace</p>
              </div>

              {/* Announced politely when the category changes */}
              <div aria-live="polite" className="mt-6">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{current.featuredTitle}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-background/80 sm:text-lg">
                  A practical project that brings multiple skills together into one complete piece of work.
                </p>

                <div className="mt-6">
                  <ProjectFrame kind={current.id} />
                </div>

                <ul aria-label={`${current.title} examples`} className="mt-5 flex flex-wrap gap-2">
                  {current.chips.map((chip) => (
                    <li key={chip} className="rounded-full border border-background/25 bg-background/10 px-3.5 py-1.5 text-sm font-medium">
                      {chip}
                    </li>
                  ))}
                </ul>

                <dl className="mt-6 grid gap-4 border-t border-background/15 pt-5 sm:grid-cols-3">
                  {(
                    [
                      ["Project", current.meta.project],
                      ["Status", current.meta.status],
                      ["Stage", current.meta.stage],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="min-w-0">
                      <dt className="text-[11px] font-semibold tracking-widest text-background/60 uppercase">{label}</dt>
                      <dd className="mt-1 text-base font-semibold [overflow-wrap:anywhere]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Idea -> Build -> Test -> Refine -> Present, with the current step marked */}
              <ol aria-label="Project progression" className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-background/15 pt-5">
                {STEPS.map((step, i) => {
                  const done = i < current.step;
                  const active = i === current.step;
                  return (
                    <li key={step} className="flex items-center gap-2">
                      {i > 0 && <ArrowRight className="size-3.5 text-background/40" aria-hidden="true" />}
                      <span
                        aria-current={active ? "step" : undefined}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 sm:text-sm",
                          active
                            ? "bg-background text-foreground"
                            : done
                              ? "bg-brand-green/30 text-background"
                              : "border border-background/25 text-background/70"
                        )}
                      >
                        {done && <Check className="size-3.5" aria-hidden="true" />}
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Category selector */}
          <div className="flex flex-col">
            <p id="project-type-label" className="text-sm font-medium text-muted-foreground">
              Choose a project type
            </p>
            <ul aria-labelledby="project-type-label" className="mt-3 grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                const active = c.id === selected;
                return (
                  <li key={c.id} className="min-w-0">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelected(c.id)}
                      className={cn(
                        "group flex h-full w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 motion-safe:hover:-translate-y-0.5 sm:p-5",
                        FOCUS,
                        active
                          ? "border-primary bg-card shadow-[0_16px_32px_-20px_rgba(13,99,134,0.5)]"
                          : "border-primary/10 bg-card/60 hover:border-primary/40 hover:bg-card"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                          active ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
                        )}
                      >
                        <Icon
                          className="size-5 transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-lg font-semibold tracking-tight text-foreground">{c.title}</span>
                          <ArrowRight
                            className={cn(
                              "size-4 shrink-0 text-primary transition-all duration-300 motion-safe:group-hover:translate-x-0.5",
                              active ? "opacity-100" : "opacity-40"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                          {c.types.join(" · ")}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="mt-8 max-w-3xl border-l-4 border-brand-green pl-5 text-lg leading-relaxed font-medium text-foreground sm:text-xl lg:mt-10">
          Projects give students something they can improve, document and eventually present as part of their
          portfolio.
        </p>
      </div>
    </section>
  );
}
