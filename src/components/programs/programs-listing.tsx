"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Boxes, Code2, Megaphone, PenTool, Search } from "lucide-react";
import { cn } from "cn";

const PROGRAMS = [
  {
    category: "Digital & Marketing",
    title: "Digital Marketing",
    description:
      "Learn how brands grow in the digital world — from strategy and content to social media, search, advertising and analytics.",
    support: "Learn. Execute. Measure. Grow.",
    cta: "Explore Digital Marketing",
    href: "/programs/tg-digital-marketing",
    icons: [Megaphone, BarChart3, Search],
    base: "from-primary via-primary/70 to-brand-green/50",
  },
  {
    category: "Creative Technology",
    title: "Game Development & Design",
    description:
      "Learn to turn ideas into interactive experiences through game design, programming, digital art, engines, animation and practical project work.",
    support: "Design. Build. Play.",
    cta: "Explore Game Development",
    href: "/programs/tg-gameforge",
    icons: [Code2, PenTool, Boxes],
    base: "from-brand-green/80 via-primary/70 to-[#0b3d50]",
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

export function ProgramsListing() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="programs-listing" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "max-w-2xl transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Explore Our Programs
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Choose a Skill.
            <br />
            Build Your Path.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Choose a practical learning direction based on what you want to
            create, build and explore. Each program combines structured
            learning with hands-on work and projects.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:gap-8">
          {PROGRAMS.map((program, index) => (
            <Link
              key={program.href}
              href={program.href}
              className={cn(
                "group flex flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(16,20,28,0.35)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
              style={{ transitionDelay: visible ? `${index * 150 + 150}ms` : "0ms" }}
            >
              {/* DIGITAL MARKETING / GAME DEVELOPMENT PROGRAM VISUAL — FINAL ASSET TO BE PROVIDED.
                  Final markup: replace the gradient + icons with
                  <img src="..." className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> */}
              <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[2/1]">
                <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105", program.base)} />
                <div className="absolute inset-0 flex items-center justify-center gap-5 text-background/15 sm:gap-8" aria-hidden="true">
                  {program.icons.map((Icon, i) => (
                    <Icon key={i} className="size-12 sm:size-16" />
                  ))}
                </div>
                <span className="absolute top-5 left-5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground">
                  {program.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">{program.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{program.description}</p>
                <p className="mt-4 text-sm font-semibold text-primary">{program.support}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                  {program.cta}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
