"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BarChart3, Book, Settings2, Shapes } from "lucide-react";
import { cn } from "cn";

const STAGES = [
  {
    number: "01",
    label: "Learn",
    icon: Book,
    image: "/brand/learn.jpg",
    alt: "Reaching for a book on a shelf",
    description: "Understand the concepts, tools and workflows behind your discipline.",
  },
  {
    number: "02",
    label: "Practise",
    icon: Settings2,
    image: "/brand/practise.jpg",
    alt: "A laptop and tablet set up for focused work",
    description: "Apply what you learn through hands-on exercises that grow more complex.",
  },
  {
    number: "03",
    label: "Build",
    icon: Shapes,
    image: "/brand/build.jpg",
    alt: "A laptop showing a 3D structural model beside hand-drawn sketches",
    description: "Create real projects that bring your skills together.",
  },
  {
    number: "04",
    label: "Show",
    icon: BarChart3,
    image: "/brand/show.jpg",
    alt: "A graduate in cap and gown walking toward a city skyline",
    description: "Present your work, get feedback and prepare for what's next.",
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
    <section ref={ref} className="px-4 py-12 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 p-6 sm:p-8 lg:p-10">
          <div
            className={cn(
              "transition-all duration-700",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              How We Learn
            </div>

            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
                Learning Should Lead to Something You Can Build.
              </h2>

              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-xl lg:pt-2 lg:text-right">
                At Techno Gurukul, learning is designed to move beyond
                theory. Students build their understanding step by step,
                apply their skills through practical work, and bring what
                they learn together in projects they can actually show.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
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
        "group flex flex-col overflow-hidden rounded-[1.75rem] bg-card shadow-[0_0_0_rgba(16,20,28,0)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(16,20,28,0.35)]",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-primary/10 bg-muted">
        <Image
          src={stage.image}
          alt={stage.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative -mt-6 flex items-end justify-between px-6">
        <span className="flex size-12 items-center justify-center rounded-full bg-card text-primary shadow-[0_8px_20px_-8px_rgba(16,20,28,0.35)] ring-4 ring-card">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span aria-hidden="true" className="text-6xl font-bold text-primary/10">
          {stage.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-4 pb-7">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{stage.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
      </div>
    </div>
  );
}

