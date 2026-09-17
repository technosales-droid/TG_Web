"use client";

import { useEffect, useRef, useState } from "react";
import { Cpu, FolderOpen, Palette, Play } from "lucide-react";
import { cn } from "cn";

const OUTCOMES = [
  {
    icon: Play,
    heading: "Playable Projects",
    description:
      "Turn ideas into interactive experiences. Students progress from concepts and prototypes toward playable projects.",
  },
  {
    icon: Palette,
    heading: "Creative Work",
    description:
      "Create worlds, characters and visual experiences. Develop work across characters, environments, interfaces, animation and effects.",
  },
  {
    icon: Cpu,
    heading: "Technical Work",
    description:
      "Build the systems behind the experience. Apply programming, game engines, gameplay systems, AI and technical workflows.",
  },
  {
    icon: FolderOpen,
    heading: "Portfolio Work",
    description:
      "Turn completed work into something you can show. Refine projects and documentation into a portfolio that demonstrates practical ability.",
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
            Learning becomes more meaningful when students can put their
            skills together. From individual exercises to larger projects,
            the focus is on creating work that can be tested, refined and
            eventually presented.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div
            className={cn(
              "relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] transition-all duration-700",
              visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            )}
          >
            {/* SHOWCASE IMAGE PLACEHOLDER — FINAL STUDENT/PROJECT ASSET WILL BE PROVIDED.
                Final markup: replace this div's contents with
                <img src="..." className="absolute inset-0 h-full w-full object-cover" /> */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/70 to-[#0b3d50]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <Play className="absolute right-8 bottom-8 size-24 text-background/10" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-4">
            {OUTCOMES.map((outcome, index) => (
              <OutcomeRow key={outcome.heading} outcome={outcome} index={index} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OutcomeRow({
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
        "group flex items-start gap-4 rounded-2xl bg-muted/60 p-5 transition-all duration-500 hover:bg-muted sm:p-6",
        visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
      )}
      style={{ transitionDelay: visible ? `${index * 120 + 150}ms` : "0ms" }}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-base font-semibold text-foreground">{outcome.heading}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{outcome.description}</p>
      </div>
    </div>
  );
}
