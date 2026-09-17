"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Briefcase, Code2, Megaphone, PenTool } from "lucide-react";
import { cn } from "cn";

const DIRECTIONS = [
  {
    number: "01",
    label: "Creative",
    heading: "Create What People See.",
    tags: ["Design", "Visual Content", "Animation"],
    icon: PenTool,
  },
  {
    number: "02",
    label: "Technology",
    heading: "Build What Makes It Work.",
    tags: ["Development", "Programming", "Digital Products"],
    icon: Code2,
  },
  {
    number: "03",
    label: "Digital & Marketing",
    heading: "Help Ideas Reach People.",
    tags: ["Content & Social", "Search", "Analytics"],
    icon: Megaphone,
    featured: true,
  },
  {
    number: "04",
    label: "Independent & Freelance",
    heading: "Build Work You Can Take With You.",
    tags: ["Freelance Projects", "Remote Work", "Entrepreneurship"],
    icon: Briefcase,
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
            Career Paths
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Build Skills That Open More Than One Door.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Different students want different futures. Techno Gurukul
            focuses on practical skills, real project work and portfolio
            development so students can explore career directions that
            match what they enjoy and what they can build.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 lg:mt-12 lg:gap-4">
          {DIRECTIONS.map((direction, index) => (
            <DirectionRow key={direction.number} direction={direction} index={index} visible={visible} />
          ))}
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col items-start gap-4 border-t border-primary/10 pt-8 transition-all delay-500 duration-700 sm:flex-row sm:items-center sm:justify-between lg:mt-12",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <p className="text-base text-muted-foreground">
            Explore roles, skills and pathways in more detail.
          </p>
          <Link
            href="/career-paths"
            className="group flex items-center gap-1 text-base font-medium text-foreground transition-colors hover:text-primary"
          >
            Explore Career Paths
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DirectionRow({
  direction,
  index,
  visible,
}: {
  direction: (typeof DIRECTIONS)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = direction.icon;
  const isFeatured = "featured" in direction && direction.featured;

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-4 overflow-visible rounded-[1.75rem] border p-6 transition-all duration-500 sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:gap-8",
        isFeatured ? "border-brand-green/30 bg-brand-green/15" : "border-primary/10 bg-card hover:border-primary/20",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
    >
      <div className="flex items-center gap-4">
        <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-[0_8px_20px_-12px_rgba(16,20,28,0.3)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
          <Icon className="size-6" aria-hidden="true" />
          <span className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border border-primary/10 bg-background text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5">
            <ArrowDownRight className="size-3" aria-hidden="true" />
          </span>
        </span>

        <div>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground">
            {direction.number} — {direction.label}
          </p>
          <p className="mt-1 text-xl font-semibold text-foreground sm:text-2xl lg:text-3xl">
            {direction.heading}
          </p>
        </div>
      </div>

      {/* CAREER SECTION VISUAL — FINAL ASSET TO BE PROVIDED.
          Desktop-only floating visual on the featured row (matches the
          Hero's own floating-card pattern: decorative elements hide
          below lg rather than being squeezed into the mobile layout). */}
      {isFeatured && (
        <div
          aria-hidden="true"
          className="hidden shrink-0 lg:block lg:h-24 lg:w-24 lg:-translate-y-2 lg:rotate-6 lg:self-center"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl shadow-[0_16px_32px_-12px_rgba(16,20,28,0.35)]">
            <div className="h-full w-full bg-gradient-to-br from-brand-green via-primary/70 to-[#0b3d50]" />
          </div>
        </div>
      )}

      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground lg:flex-col lg:items-end lg:text-right">
        {direction.tags.map((tag) => (
          <li key={tag} className="before:mr-1.5 before:content-['•'] lg:before:content-none">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
