"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, FileText, FlaskConical, FolderOpen, Layers, Puzzle, Target } from "lucide-react";
import { cn } from "cn";

const OUTCOMES = [
  {
    tag: "Practice Work",
    title: "Start Small. Build Confidence.",
    description:
      "Apply a concept through exercises, challenges and smaller pieces of work. Practice helps turn new ideas into skills you can use.",
    highlights: ["Short, focused exercises", "Increasing difficulty", "Skills you can reuse"],
    icon: Target,
    image: "/brand/practice-work.jpg",
    alt: "A desk by a window overlooking a lake, with a laptop, papers and books",
  },
  {
    tag: "Projects",
    title: "Bring Skills Together.",
    description:
      "Combine what you have learned to solve a problem, explore an idea or create something from start to finish.",
    highlights: ["Multiple skills at once", "A real start-to-finish flow", "Room to make decisions"],
    icon: Layers,
    image: "/brand/projects.jpg",
    alt: "A group reviewing notes and sketches pinned to a wall in a studio",
  },
  {
    tag: "Experiments",
    title: "Try. Test. Improve.",
    description:
      "Explore different approaches, tools and ideas. Not everything needs to become a finished project; experimentation is part of learning.",
    highlights: ["Low-stakes exploration", "Comparing approaches", "Learning from what doesn't work"],
    icon: FlaskConical,
    image: "/brand/experiments.jpg",
    alt: "A person reviewing printed charts and wireframes on a glass wall",
  },
  {
    tag: "Problem Solving",
    title: "Think Through Real Problems.",
    description:
      "Break down a challenge, make decisions, test possible solutions and learn from what works and what needs to change.",
    highlights: ["Breaking down challenges", "Weighing trade-offs", "Iterating on solutions"],
    icon: Puzzle,
    image: "/brand/problem-solving.jpg",
    alt: "An illustration of a person thinking through a problem toward an idea",
  },
  {
    tag: "Documentation",
    title: "Make Your Work Understandable.",
    description:
      "Explain what you built, how you approached it, what you learned and how you improved it. Good work becomes more useful when others can understand it.",
    highlights: ["Explaining your process", "Recording decisions", "Writing for other people"],
    icon: FileText,
    image: "/brand/documentation.jpg",
    alt: "A person writing goals and notes on a whiteboard",
  },
  {
    tag: "Portfolio Work",
    title: "Turn Your Work Into Evidence.",
    description:
      "Select and refine work that represents your skills, process and progress, then present it in a way that is easy to understand.",
    highlights: ["Selecting your best work", "Refining and polishing", "Presenting it clearly"],
    icon: FolderOpen,
    image: "/brand/portfolio.jpg",
    alt: "A stylized desk scene with a laptop and everyday objects",
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
            "mx-auto max-w-[1400px] text-center transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
            What You Can Build
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Don&rsquo;t Just Learn the Skill. Build Something With It.
          </h2>

          <p className="mx-auto mt-5 max-w-6xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
            Learning becomes more meaningful when you can use what you know.
            From focused practice and experiments to complete projects and
            portfolio pieces, the goal is to turn learning into work you can
            understand, improve and show.
          </p>
        </div>

        {/* Below lg: a static grid, every card fully readable (no hover on touch devices).
            At lg+: a single accordion row: each card is narrow at rest and grows on hover
            to reveal the description + highlights, matching the reference layout. */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:flex lg:h-[540px] lg:gap-3">
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
    // ponytail: hover-only expand; fine here since the lg:grid-cols-2 fallback below already
    // shows every card's full content unconditionally, so touch/keyboard users never lose access
    // to it; they just don't get the accordion animation.
    <div
      className={cn(
        "group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary p-6 transition-all duration-500 lg:aspect-auto lg:h-full lg:min-w-0 lg:flex-1 lg:p-0 lg:hover:flex-[3]",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
    >
      <Image
        src={outcome.image}
        alt={outcome.alt}
        fill
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover"
      />
      {/* Base scrim: capped at 70% black (not solid), small bands top/bottom, most of the
          photo left clear; sized for the short resting label. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7)_0%,transparent_10%,transparent_85%,rgba(0,0,0,0.7)_100%)]"
      />
      {/* Extends the bottom band upward to cover the taller title/description/highlights.
          Below lg that content is always shown (no hover there), so this stays on permanently;
          at lg+ the content is hover-only, so this fades in only on hover to match it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] bg-[linear-gradient(to_bottom,transparent_0%,transparent_35%,rgba(0,0,0,0.7)_50%,rgba(0,0,0,0.7)_100%)] opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:delay-150"
      />

      {/* Tag pill and icon badge share one row so they stay vertically aligned and the pill
          truncates gracefully instead of running under the icon on narrower (shrunk) cards. */}
      <div className="absolute inset-x-5 top-5 flex h-10 items-center justify-between gap-2">
        <div className="flex h-10 min-w-0 items-center gap-1.5 rounded-full bg-white/15 px-3 text-xs font-medium text-white backdrop-blur-sm">
          <span className="truncate">{outcome.tag}</span>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>

      {/* Collapsed state: lg+ only, rest state. Horizontal label (no rotation), hidden below
          lg where the expanded content (next block) is always shown instead. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 hidden px-6 pb-6 transition-opacity duration-200 lg:block lg:group-hover:opacity-0"
      >
        <span className="text-lg font-semibold text-white">{outcome.tag}</span>
      </div>

      {/* Expanded content: always shown below lg; at lg+ it's the hover reveal. */}
      <div className="relative lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-6 lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100 lg:group-hover:delay-150">
        <h3 className="text-lg font-semibold text-white">{outcome.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{outcome.description}</p>
        <ul className="mt-4 space-y-1.5">
          {outcome.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-1.5 text-xs text-white/70">
              <Check className="size-3.5 shrink-0 text-brand-sky" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
