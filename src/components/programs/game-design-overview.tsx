"use client";

import { useEffect, useRef, useState } from "react";
import { Layers, MapPin, Repeat2, Sparkles } from "lucide-react";
import { cn } from "cn";

const TOPICS = [
  {
    label: "Game Mechanics & Loops",
    note: "Designing the rules and repeating loops that make a game work and feel worth playing.",
    icon: Repeat2,
  },
  {
    label: "Progression & Balancing",
    note: "Shaping difficulty, pacing and reward so a game stays fair and engaging as it goes on.",
    icon: Layers,
  },
  {
    label: "Narrative & World Building",
    note: "Building the story, setting and context a game world is designed around.",
    icon: Sparkles,
  },
  {
    label: "Quest Design & Prototyping",
    note: "Turning ideas into playable quests and levels through hands-on prototyping.",
    icon: MapPin,
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function GameDesignOverview() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="program-overview" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "max-w-3xl transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            About The Program
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Designing Games, Not Just Playing Them.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            TG GameDesign Studio focuses on how a game is designed rather than how it is built end to
            end: turning ideas into structured game experiences by designing mechanics, levels,
            progression, challenges and rewards.
          </p>
        </div>

        <ul aria-label="What this program covers" className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 xl:grid-cols-4 xl:gap-6">
          {TOPICS.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <li
                key={topic.label}
                style={{ transitionDelay: visible ? `${index * 100 + 150}ms` : "0ms" }}
                className={cn(
                  "group flex flex-col gap-4 rounded-[2rem] border border-primary/10 bg-card p-6 transition-all duration-500 hover:bg-muted motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)]",
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{topic.label}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{topic.note}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
