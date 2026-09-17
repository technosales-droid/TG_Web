"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FolderOpen,
  Palette,
  Play,
} from "lucide-react";
import { cn } from "cn";

const OUTCOMES = [
  {
    label: "Playable Projects",
    icon: Play,
    heading: "Turn ideas into interactive experiences.",
    description: "Students can progress from concepts and prototypes toward playable projects.",
    base: "from-primary to-[#0b3d50]",
  },
  {
    label: "Creative Work",
    icon: Palette,
    heading: "Create worlds, characters and visual experiences.",
    description:
      "The broader learning ecosystem includes 2D/3D art, environments, characters, UI, animation and visual effects.",
    base: "from-brand-green to-primary",
  },
  {
    label: "Technical Work",
    icon: Cpu,
    heading: "Build systems that make experiences work.",
    description:
      "Programming, gameplay systems, engines, AI, optimisation and technical workflows are part of the learning journey.",
    base: "from-[#0b3d50] to-primary",
  },
  {
    label: "Portfolio Work",
    icon: FolderOpen,
    heading: "Turn completed work into something you can show.",
    description:
      "Projects, documentation and portfolio material become part of demonstrating practical ability.",
    base: "from-primary to-brand-green",
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function OutcomesShowcase() {
  const { ref, visible } = useRevealOnView<HTMLElement>();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 336, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div
            className={cn(
              "max-w-2xl transition-all duration-700",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              What You Can Build
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Don&rsquo;t Just Learn the Skill. Build Something With It.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Learning becomes more meaningful when students can put their
              skills together. From individual exercises to larger projects,
              the focus is on creating work that can be tested, refined and
              eventually presented.
            </p>
          </div>

          <div
            className={cn(
              "hidden items-center gap-3 lg:flex",
              visible ? "opacity-100" : "opacity-0",
              "transition-opacity duration-700"
            )}
          >
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              aria-label="Scroll to previous"
              className="flex size-11 items-center justify-center rounded-full border border-primary/15 bg-card text-foreground transition-all hover:border-primary/30 hover:shadow-[0_8px_20px_-12px_rgba(16,20,28,0.3)] disabled:pointer-events-none disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              aria-label="Scroll to next"
              className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className={cn(
            "mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] lg:mt-12 [&::-webkit-scrollbar]:hidden",
            "transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          {OUTCOMES.map((outcome, index) => (
            <OutcomeCard key={outcome.label} outcome={outcome} index={index} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomeCard({
  outcome,
  index,
  visible,
}: {
  outcome: (typeof OUTCOMES)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = outcome.icon;

  return (
    <div
      className="group relative aspect-[3/4] w-72 shrink-0 snap-start overflow-hidden rounded-[1.75rem] transition-all duration-500 sm:w-80"
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      {/* OUTCOME IMAGE PLACEHOLDER — FINAL PROJECT/STUDENT-WORK ASSET WILL BE PROVIDED.
          Final markup: replace this gradient div with
          <img src="..." className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> */}
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105", outcome.base)}>
        <Icon className="absolute right-6 bottom-24 size-28 text-background/10" aria-hidden="true" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <span className="absolute top-5 left-5 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <p className="absolute top-6 left-[4.25rem] text-xs font-semibold tracking-wide text-background/90">
        {outcome.label}
      </p>

      <div className="absolute inset-x-5 bottom-5">
        <p className="text-lg font-semibold text-background">{outcome.heading}</p>
        <p className="mt-2 text-sm leading-relaxed text-background/75">{outcome.description}</p>
        <span
          aria-hidden="true"
          className="mt-4 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </div>
  );
}
