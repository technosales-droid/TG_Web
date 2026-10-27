"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { ACTIVE_PROGRAMS, type ActiveProgram } from "@/data/active-programs";
import { AI_PROGRAM_HREF, DM_PROGRAM_HREF, GD_PROGRAM_HREF } from "@/lib/program-routes";

// The three courses Techno Gurukul currently teaches, in Nashik, as a compact numbered list rather than big
// photo cards -- the AI Program carries a small "Signature" pill instead of a larger tile. All three pull from
// the site's existing program data, so this section can never drift out of sync with what /programs actually
// offers. Asserted here (not filtered defensively) because these are three specific, known entries.
const PROGRAMS: ActiveProgram[] = [
  ACTIVE_PROGRAMS.find((p) => p.href === AI_PROGRAM_HREF)!,
  ACTIVE_PROGRAMS.find((p) => p.href === DM_PROGRAM_HREF)!,
  ACTIVE_PROGRAMS.find((p) => p.href === GD_PROGRAM_HREF)!,
];

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

export function AvailableCourses() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} aria-labelledby="available-courses-heading" className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div
          className={cn(
            "flex flex-wrap items-end justify-between gap-4 transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
              Available Courses
            </div>
            <h2 id="available-courses-heading" className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Start With What&rsquo;s Available Today.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Open for enrolment at our Nashik institute right now. Everything else further down is on the way.
          </p>
        </div>

        <div
          className={cn(
            "mt-8 divide-y divide-primary/10 border-y border-primary/10 transition-all delay-150 duration-700 sm:mt-10",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          {PROGRAMS.map((program, i) => (
            <CourseRow key={program.href} program={program} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseRow({ program, index }: { program: ActiveProgram; index: number }) {
  return (
    <Link href={program.href} className="group/row flex items-center gap-4 py-5 sm:gap-6 sm:py-6">
      <span className="hidden w-10 shrink-0 font-mono text-sm text-muted-foreground/50 sm:block">{String(index).padStart(2, "0")}</span>

      {program.image && (
        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl sm:size-16">
          <Image src={program.image} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover/row:scale-110" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover/row:text-primary sm:text-xl">
            {program.title}
          </h3>
          {index === 1 && (
            <span className="inline-flex items-center rounded-full bg-brand-sky/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-brand-sky uppercase">
              Signature
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground sm:text-[15px]">{program.description}</p>
      </div>

      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/20 text-foreground transition-all duration-200 sm:size-10",
          "group-hover/row:border-primary group-hover/row:bg-primary group-hover/row:text-primary-foreground",
          "motion-safe:group-hover/row:-translate-y-0.5 motion-safe:group-hover/row:translate-x-0.5"
        )}
      >
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
