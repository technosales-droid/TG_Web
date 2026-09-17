"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Gamepad2, Megaphone } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const PROGRAMS = [
  {
    category: "Digital & Marketing",
    title: "Digital Marketing",
    description:
      "Learn how brands grow in the digital world — from strategy and content to social media, search, advertising and analytics.",
    outcome: "Learn. Execute. Measure. Grow.",
    cta: "Explore Digital Marketing",
    href: "/programs/tg-digital-marketing",
    icon: Megaphone,
    base: "from-primary via-primary/70 to-brand-green/40",
  },
  {
    category: "Creative Technology",
    title: "Game Development & Design",
    description:
      "Learn to turn ideas into interactive experiences through game design, programming, digital art, engines, animation and practical project work.",
    outcome: "Design. Build. Play.",
    cta: "Explore Game Development",
    href: "/programs/tg-gameforge",
    icon: Gamepad2,
    base: "from-brand-green via-primary/60 to-[#0b3d50]",
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

export function ProgramsPreview() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 py-14 sm:px-6 sm:py-16">
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
            Choose a Skill. Build Your Path.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Practical programs designed to help you learn, create and build
            work that moves you toward your next opportunity.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:gap-8">
          {PROGRAMS.map((program, index) => (
            <ProgramCard key={program.title} program={program} index={index} visible={visible} />
          ))}
        </div>

        <p
          className={cn(
            "mt-6 text-sm text-muted-foreground transition-all delay-300 duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          More learning pathways coming soon.
        </p>

        <div
          className={cn(
            "mt-10 flex flex-col items-start gap-4 border-t border-primary/10 pt-8 transition-all delay-500 duration-700 sm:flex-row sm:items-center sm:justify-between lg:mt-12",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <p className="text-base text-muted-foreground">
            Explore the full Techno Gurukul learning ecosystem.
          </p>
          <Link
            href="/programs"
            className={cn(buttonVariants({ variant: "default" }), "h-11 shrink-0 rounded-full px-6 text-base")}
          >
            Explore All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  program,
  index,
  visible,
}: {
  program: (typeof PROGRAMS)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = program.icon;

  return (
    <Link
      href={program.href}
      className={cn(
        "group relative flex aspect-[4/3] flex-col overflow-hidden rounded-[2rem] transition-all duration-500 sm:aspect-[16/11]",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
      style={{ transitionDelay: visible ? `${index * 150 + 150}ms` : "0ms" }}
    >
      {/* PROGRAM IMAGE PLACEHOLDER (per program: DIGITAL MARKETING / GAME DEVELOPMENT) —
          FINAL ASSET TO BE PROVIDED. Final markup: replace this div's contents with
          <img src="..." className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> */}
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105", program.base)}>
        <Icon className="absolute right-6 bottom-6 size-24 text-background/10" aria-hidden="true" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <span className="relative m-5 inline-flex w-fit items-center rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground">
        {program.category}
      </span>

      <span
        aria-hidden="true"
        className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <ArrowUpRight className="size-4" />
      </span>

      <div className="relative mt-auto flex flex-col gap-2 p-5 pt-0">
        <p className="text-xl font-semibold text-background">{program.title}</p>
        <p className="text-sm leading-relaxed text-background/80">{program.description}</p>
        <p className="mt-1 text-xs font-semibold tracking-wide text-background/70">{program.outcome}</p>
      </div>
    </Link>
  );
}
