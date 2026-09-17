"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Code2, Megaphone, PenTool } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const DIRECTIONS = [
  {
    number: "01",
    label: "Creative",
    heading: "Create What People See.",
    tags: ["Design", "Visual Content", "Animation"],
    icon: PenTool,
    base: "from-primary via-primary/70 to-brand-green/40",
  },
  {
    number: "02",
    label: "Technology",
    heading: "Build What Makes It Work.",
    tags: ["Development", "Programming", "Digital Products"],
    icon: Code2,
    base: "from-brand-green via-primary/60 to-[#0b3d50]",
  },
  {
    number: "03",
    label: "Digital & Marketing",
    heading: "Help Ideas Reach People.",
    tags: ["Content & Social", "Search", "Analytics"],
    icon: Megaphone,
    base: "from-primary via-primary/70 to-brand-green/40",
  },
  {
    number: "04",
    label: "Independent & Freelance",
    heading: "Build Work You Can Take With You.",
    tags: ["Freelance Projects", "Remote Work", "Entrepreneurship"],
    icon: Briefcase,
    base: "from-[#0b3d50] to-primary",
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

export function CareerDirections() {
  const { ref, visible } = useRevealOnView<HTMLElement>();
  const [creative, technology, marketing, independent] = DIRECTIONS;

  return (
    <section ref={ref} className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Career Paths
          </div>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Build Skills That Open More Than One Door.
            </h2>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-xl lg:pt-2 lg:text-right">
              Different students want different futures. Techno Gurukul
              focuses on practical skills, real project work and portfolio
              development so students can explore career directions that
              match what they enjoy and what they can build.
            </p>
          </div>

          <Link
            href="/career-paths"
            className={cn(buttonVariants({ variant: "default" }), "mt-6 h-11 rounded-full px-6 text-base")}
          >
            Explore Career Paths
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          <LargeTile direction={creative} index={0} visible={visible} />

          <div className="flex flex-col gap-4 lg:gap-6">
            <MediumTile direction={technology} index={1} visible={visible} />
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <AccentTile direction={marketing} index={2} visible={visible} />
              <SmallTile direction={independent} index={3} visible={visible} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Direction = (typeof DIRECTIONS)[number];

function revealClass(visible: boolean) {
  return cn(
    "transition-all duration-500",
    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  );
}

function tileStyle(index: number, visible: boolean) {
  return { transitionDelay: visible ? `${index * 120 + 150}ms` : "0ms" };
}

/* CAREER SECTION VISUAL — FINAL ASSET TO BE PROVIDED for each tile below.
   Final markup: replace each gradient div's contents with
   <img src="..." className="absolute inset-0 h-full w-full object-cover" /> */

function LargeTile({ direction, index, visible }: { direction: Direction; index: number; visible: boolean }) {
  const Icon = direction.icon;
  return (
    <div
      className={cn(
        "group relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:aspect-auto lg:h-full",
        revealClass(visible)
      )}
      style={tileStyle(index, visible)}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105", direction.base)} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute top-5 left-5 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="absolute inset-x-5 bottom-5">
        <p className="text-xl font-semibold text-background sm:text-2xl">{direction.heading}</p>
        <p className="mt-2 text-sm leading-relaxed text-background/75">{direction.tags.join(" · ")}</p>
      </div>
    </div>
  );
}

function MediumTile({ direction, index, visible }: { direction: Direction; index: number; visible: boolean }) {
  const Icon = direction.icon;
  return (
    <div
      className={cn(
        "group relative aspect-[16/9] overflow-hidden rounded-[2rem]",
        revealClass(visible)
      )}
      style={tileStyle(index, visible)}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105", direction.base)} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
      <span className="absolute top-5 left-5 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="absolute inset-x-5 bottom-5">
        <p className="text-lg font-semibold text-background sm:text-xl">{direction.heading}</p>
        <p className="mt-1 text-sm text-background/75">{direction.tags[0]}</p>
      </div>
    </div>
  );
}

function AccentTile({ direction, index, visible }: { direction: Direction; index: number; visible: boolean }) {
  const Icon = direction.icon;
  return (
    <div
      className={cn(
        "flex aspect-square flex-col justify-between rounded-[1.75rem] bg-brand-green/90 p-5 transition-all duration-500 hover:-translate-y-0.5",
        revealClass(visible)
      )}
      style={tileStyle(index, visible)}
    >
      <div className="flex items-center justify-between">
        <Icon className="size-6 text-background" aria-hidden="true" />
        <ArrowUpRight className="size-5 text-background/80" aria-hidden="true" />
      </div>
      <div>
        <p className="text-base font-semibold text-background sm:text-lg">{direction.label}</p>
        <p className="mt-1 text-xs text-background/75 sm:text-sm">{direction.heading}</p>
      </div>
    </div>
  );
}

function SmallTile({ direction, index, visible }: { direction: Direction; index: number; visible: boolean }) {
  const Icon = direction.icon;
  return (
    <div
      className={cn(
        "group relative aspect-square overflow-hidden rounded-[1.75rem]",
        revealClass(visible)
      )}
      style={tileStyle(index, visible)}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105", direction.base)} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
      <span className="absolute top-4 left-4 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <p className="absolute inset-x-4 bottom-4 text-sm font-semibold text-background">{direction.label}</p>
    </div>
  );
}
