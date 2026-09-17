"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "cn";
import { ChecklistIcon } from "@/components/icons/checklist";
import { IterationIcon } from "@/components/icons/iteration";
import { IntegrationIcon } from "@/components/icons/integration";
import { HandoffIcon } from "@/components/icons/handoff";

const STAGES = [
  {
    number: "01",
    label: "Learn",
    icon: ChecklistIcon,
    heading: "Build the Fundamentals",
    description:
      "Understand the concepts, tools and workflows that form the foundation of your chosen discipline.",
    panel: "bg-card text-foreground",
    badge: "bg-primary/10 text-primary",
    numeral: "text-primary",
    muted: "text-muted-foreground",
  },
  {
    number: "02",
    label: "Practice",
    icon: IterationIcon,
    heading: "Learn by Doing",
    description:
      "Apply what you learn through practical exercises and progressively more complex work.",
    panel: "bg-accent text-foreground",
    badge: "bg-card/80 text-primary",
    numeral: "text-primary",
    muted: "text-foreground/70",
  },
  {
    number: "03",
    label: "Build",
    icon: IntegrationIcon,
    heading: "Create Real Projects",
    description:
      "Combine your skills to develop projects that move beyond isolated exercises.",
    panel: "bg-brand-green/15 text-foreground",
    badge: "bg-card/80 text-brand-green",
    numeral: "text-brand-green",
    muted: "text-foreground/70",
  },
  {
    number: "04",
    label: "Show",
    icon: HandoffIcon,
    heading: "Build Your Portfolio",
    description:
      "Turn completed work into projects you can present, refine and use to demonstrate your abilities.",
    panel: "bg-foreground text-background",
    badge: "bg-background/15 text-brand-green",
    numeral: "text-background",
    muted: "text-background/70",
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function LearningApproach() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 p-6 sm:p-10 lg:p-12">
          <div
            className={cn(
              "max-w-2xl transition-all duration-700",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              How We Learn
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Learning Should Lead to Something You Can Build.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              At Techno Gurukul, learning is designed to move beyond theory.
              Students build their understanding step by step, apply their
              skills through practical work, and bring what they learn
              together in projects they can actually show.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 lg:mt-12 lg:flex-row">
            {STAGES.map((stage, index) => (
              <StageCard key={stage.number} stage={stage} index={index} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StageCard({
  stage,
  index,
  visible,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = stage.icon;

  return (
    <div
      className={cn(
        "group relative flex-1 overflow-hidden rounded-[1.75rem] p-6 transition-all duration-500 sm:p-7 lg:transition-[flex-grow,opacity,transform] lg:duration-500 lg:hover:flex-[1.2]",
        stage.panel,
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-2 right-4 text-7xl font-bold opacity-[0.08] select-none sm:text-8xl",
          stage.numeral
        )}
      >
        {stage.number}
      </span>

      <span
        className={cn(
          "relative flex size-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
          stage.badge
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>

      <p className={cn("relative mt-6 text-xs font-semibold tracking-wide", stage.muted)}>
        {stage.number} — {stage.label}
      </p>
      <p className="relative mt-3 text-lg font-semibold">{stage.heading}</p>
      <p className={cn("relative mt-2 text-sm leading-relaxed", stage.muted)}>{stage.description}</p>
    </div>
  );
}
