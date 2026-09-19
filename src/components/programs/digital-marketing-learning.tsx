"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Brain, Compass, Megaphone } from "lucide-react";
import { cn } from "cn";

const AREAS = [
  {
    n: "01",
    verb: "Understand",
    title: "Concept",
    description: "Understanding consumers and why they behave the way they do.",
    icon: Brain,
  },
  {
    n: "02",
    verb: "Plan",
    title: "Strategy",
    description: "Understanding how brands acquire customers and how marketing strategy is developed.",
    icon: Compass,
  },
  {
    n: "03",
    verb: "Execute",
    title: "Execution",
    description: "Turning marketing ideas into actual campaigns and digital activity.",
    icon: Megaphone,
  },
  {
    n: "04",
    verb: "Measure",
    title: "Measurement",
    description: "Understanding how marketers measure what works.",
    icon: Activity,
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

export function DigitalMarketingLearning() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="what-youll-learn" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px] rounded-[2.5rem] border border-primary/10 bg-muted/50 px-4 py-8 sm:p-10 lg:p-14">
        <div
          className={cn(
            "px-2 transition-all duration-700 sm:px-0",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            What You&rsquo;ll Learn
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Understand. Plan. Execute. Measure.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            You move from understanding consumers and how brands acquire customers, to turning ideas
            into campaigns and measuring what works &mdash; then put that knowledge into practice.
          </p>
        </div>

        <ol className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {AREAS.map((area, index) => {
            const Icon = area.icon;
            return (
              <li
                key={area.n}
                style={{ transitionDelay: visible ? `${index * 120 + 150}ms` : "0ms" }}
                className={cn(
                  "group flex min-w-0 flex-col rounded-[2rem] border border-primary/10 bg-card p-5 transition-all duration-500 hover:bg-muted motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:p-6",
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
              >
                <span aria-hidden="true" className="block h-1.5 overflow-hidden rounded-full bg-primary/10">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-primary to-brand-green"
                    style={{ width: `${(index + 1) * 25}%` }}
                  />
                </span>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="text-3xl font-semibold tracking-tight text-primary/40">{area.n}</span>
                </div>

                <p className="mt-6 text-sm font-semibold tracking-widest text-primary uppercase">
                  {area.verb}
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{area.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{area.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
