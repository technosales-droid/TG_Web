"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, FlaskConical, FolderOpen, Layers, Puzzle, Target } from "lucide-react";
import { cn } from "cn";

const OUTCOMES = [
  {
    number: "01",
    tag: "Practice Work",
    title: "Start Small. Build Confidence.",
    description:
      "Apply a concept through exercises, challenges and smaller pieces of work. Practice helps turn new ideas into skills you can use.",
    icon: Target,
  },
  {
    number: "02",
    tag: "Projects",
    title: "Bring Skills Together.",
    description:
      "Combine what you have learned to solve a problem, explore an idea or create something from start to finish.",
    icon: Layers,
  },
  {
    number: "03",
    tag: "Experiments",
    title: "Try. Test. Improve.",
    description:
      "Explore different approaches, tools and ideas. Not everything needs to become a finished project; experimentation is part of learning.",
    icon: FlaskConical,
  },
  {
    number: "04",
    tag: "Problem Solving",
    title: "Think Through Real Problems.",
    description:
      "Break down a challenge, make decisions, test possible solutions and learn from what works and what needs to change.",
    icon: Puzzle,
  },
  {
    number: "05",
    tag: "Documentation",
    title: "Make Your Work Understandable.",
    description:
      "Explain what you built, how you approached it, what you learned and how you improved it. Good work becomes more useful when others can understand it.",
    icon: FileText,
  },
  {
    number: "06",
    tag: "Portfolio Work",
    title: "Turn Your Work Into Evidence.",
    description:
      "Select and refine work that represents your skills, process and progress, then present it in a way that is easy to understand.",
    icon: FolderOpen,
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

  return (
    <section ref={ref} className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "mx-auto max-w-2xl text-center transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            What You Can Build
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Don&rsquo;t Just Learn the Skill. Build Something With It.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Learning becomes more meaningful when you can use what you know.
            From focused practice and experiments to complete projects and
            portfolio pieces, the goal is to turn learning into work you can
            understand, improve and show.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {OUTCOMES.map((outcome, index) => (
            <OutcomeCard key={outcome.tag} outcome={outcome} index={index} visible={visible} />
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
      className={cn(
        "group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary p-6 transition-all duration-500 hover:-translate-y-1",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
    >
      {/* CARD IMAGE PLACEHOLDER — no photo exists per topic yet, so this stays an honest gradient
          panel (matching the hero's dark-teal treatment) rather than a fabricated stock photo.
          Swap in a real photo later: replace this div and the two overlay divs below it with
          <Image src="..." alt="..." fill className="object-cover" />, keep the scrim div. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-[5] bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute top-5 left-5 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        <span aria-hidden="true">{outcome.number}</span>
        <span aria-hidden="true" className="text-white/50">/</span>
        {outcome.tag}
      </div>
      <span className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <Icon className="size-4" aria-hidden="true" />
      </span>

      <div className="relative">
        <h3 className="text-lg font-semibold text-white">{outcome.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{outcome.description}</p>
      </div>
    </div>
  );
}
