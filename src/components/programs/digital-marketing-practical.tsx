"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Check, Hammer, RefreshCw, Wrench } from "lucide-react";
import { cn } from "cn";

// Wording follows the "Teaching Methodology" and "What You Take Away" copy in the Techno Gurukul web copy.
const CYCLE = [
  {
    verb: "Learn",
    icon: BookOpen,
    text: "The concepts, strategy and tools marketers use every day.",
  },
  {
    verb: "Apply",
    icon: Wrench,
    text: "Use the tools, build campaigns, analyse outcomes and solve problems.",
  },
  {
    verb: "Create",
    icon: Hammer,
    text: "Produce content, campaign work and projects that demonstrate your skills.",
  },
  {
    verb: "Refine",
    icon: RefreshCw,
    text: "Learn from what happens next, then get better at it.",
  },
] as const;

const TAKE_AWAY = [
  "Practical campaign experience",
  "Portfolio-worthy projects",
  "Industry-relevant digital marketing skills",
  "Exposure to professional tools",
  "A better understanding of client requirements",
  "Career and freelancing knowledge",
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

export function DigitalMarketingPractical() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="practical-work" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto grid max-w-[1800px] gap-10 xl:grid-cols-[1.05fr_1fr] xl:gap-16">
        <div
          className={cn(
            "transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Practical Work
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Learn It. Do It. Get Better At It.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            At TechnoGurukul, concepts are followed by application. Students don&rsquo;t simply discuss
            marketing &mdash; they use the tools, build campaigns, analyse outcomes and solve problems.
          </p>

          <ol className="mt-8 sm:mt-10">
            {CYCLE.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.verb}
                  style={{ transitionDelay: visible ? `${index * 120 + 150}ms` : "0ms" }}
                  className={cn(
                    "group relative flex gap-4 pb-6 transition-all duration-500 last:pb-0 sm:gap-5",
                    "after:absolute after:top-12 after:bottom-1 after:left-6 after:w-px after:-translate-x-1/2 after:bg-primary/25 after:content-[''] last:after:hidden",
                    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  )}
                >
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-card text-primary shadow-[0_8px_20px_-12px_rgba(16,20,28,0.35)] transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {step.verb}
                    </h3>
                    <p className="mt-1 text-base leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          className={cn(
            "flex flex-col justify-between gap-8 rounded-[2.5rem] bg-gradient-to-br from-[#0d6386] to-[#0b3d50] p-5 text-white transition-all duration-700 sm:p-10",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-white/85 uppercase">What You Take Away</h3>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              By the end of the program, you should have more than classroom knowledge.
            </p>
            <p className="mt-4 text-base text-white/85 sm:text-lg">You&rsquo;ll have:</p>
          </div>

          <ul className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3 xl:flex xl:flex-col xl:gap-2">
            {TAKE_AWAY.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-3.5 sm:gap-4 sm:px-4 transition-colors duration-300 hover:bg-white/15"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="text-base leading-snug font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
