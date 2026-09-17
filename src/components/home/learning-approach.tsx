"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
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
    offset: 0,
  },
  {
    number: "02",
    label: "Practice",
    icon: IterationIcon,
    heading: "Learn by Doing",
    description:
      "Apply what you learn through practical exercises and progressively more complex work.",
    offset: 16,
  },
  {
    number: "03",
    label: "Build",
    icon: IntegrationIcon,
    heading: "Create Real Projects",
    description:
      "Combine your skills to develop projects that move beyond isolated exercises.",
    offset: 32,
  },
  {
    number: "04",
    label: "Show",
    icon: HandoffIcon,
    heading: "Build Your Portfolio",
    description:
      "Turn completed work into projects you can present, refine and use to demonstrate your abilities.",
    offset: 48,
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
    <section ref={ref} className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1800px]">
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

        {/* Desktop: staggered ascending progression */}
        <div className="mt-16 hidden items-end gap-3 lg:flex">
          {STAGES.map((stage, index) => (
            <div key={stage.number} className="flex flex-1 items-end gap-3">
              <StageNode stage={stage} index={index} visible={visible} />
              {index < STAGES.length - 1 && (
                <ChevronRight
                  className={cn(
                    "mb-16 size-5 shrink-0 text-primary/30 transition-opacity duration-500",
                    visible ? "opacity-100" : "opacity-0"
                  )}
                  style={{ transitionDelay: visible ? `${index * 150 + 200}ms` : "0ms" }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile / tablet: vertical progression */}
        <div className="mt-12 flex flex-col lg:hidden">
          {STAGES.map((stage, index) => (
            <div key={stage.number} className="flex gap-4">
              <div className="flex flex-col items-center">
                <StageBadge icon={stage.icon} />
                {index < STAGES.length - 1 && (
                  <span className="my-2 h-full w-px flex-1 bg-primary/15" aria-hidden="true" />
                )}
              </div>
              <div className={cn("pb-10", index === STAGES.length - 1 && "pb-0")}>
                <p className="text-xs font-semibold tracking-wide text-primary">
                  {stage.number} — {stage.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">{stage.heading}</p>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StageBadge({ icon: Icon }: { icon: typeof ChecklistIcon }) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-card text-primary shadow-[0_8px_20px_-12px_rgba(16,20,28,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-[0_10px_24px_-10px_rgba(16,20,28,0.35)]">
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}

function StageNode({
  stage,
  index,
  visible,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex flex-1 flex-col items-start transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
      style={{
        transitionDelay: visible ? `${index * 150}ms` : "0ms",
        transform: visible ? `translateY(-${stage.offset}px)` : undefined,
      }}
    >
      <div className="flex items-center gap-3">
        <StageBadge icon={stage.icon} />
        <span className="text-sm font-semibold tracking-wide text-muted-foreground transition-colors duration-300 group-hover:text-primary">
          {stage.number} — {stage.label}
        </span>
      </div>
      <p className="mt-4 text-lg font-semibold text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
        {stage.heading}
      </p>
      <p className="mt-1 max-w-[13rem] text-sm leading-relaxed text-muted-foreground">
        {stage.description}
      </p>
    </div>
  );
}
