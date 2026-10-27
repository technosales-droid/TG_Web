"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { cn } from "cn";
import { ACTIVE_PROGRAMS, type ActiveProgram } from "@/data/active-programs";
import { AI_PROGRAM_HREF, DM_PROGRAM_HREF, GD_PROGRAM_HREF } from "@/lib/program-routes";

// The three courses Techno Gurukul currently teaches, in Nashik, as equal-size cards (inset photo, category
// pill, title + description, a footer meta row) -- the AI Program's pill just reads "Signature" instead of its
// category. All three pull from the site's existing program data, so this section can never drift out of sync
// with what /programs actually offers. Asserted here (not filtered defensively) because these are three
// specific, known entries.
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
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
            Available Courses
          </div>
          <h2 id="available-courses-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Start With What&rsquo;s Available Today.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The AI Program, Digital Marketing and Game Development are open for enrolment at our Nashik institute
            right now. Everything else further down the page is on the way.
          </p>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-6 transition-all delay-150 duration-700 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          {PROGRAMS.map((program, i) => (
            <CourseCard key={program.href} program={program} signature={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ program, signature }: { program: ActiveProgram; signature?: boolean }) {
  return (
    <Link
      href={program.href}
      className="group block rounded-[1.75rem] bg-card p-3 ring-1 ring-primary/10 transition-shadow duration-300 hover:shadow-[0_20px_45px_-25px_rgba(6,44,61,0.35)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
        {program.image && (
          <Image
            src={program.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="px-2 pt-4 pb-1">
        <span className="inline-flex items-center rounded-full bg-brand-sky/15 px-2.5 py-1 text-xs font-semibold text-brand-sky">
          {signature ? "Signature" : program.category}
        </span>

        <div className="mt-3 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{program.title}</h3>
          <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" aria-hidden="true" />
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{program.description}</p>
      </div>

      <div className="mt-4 flex items-center gap-2.5 border-t border-primary/10 px-2 pt-4">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Clock className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 text-sm">
          <p className="truncate font-medium text-foreground">{program.outcome}</p>
        </div>
      </div>
    </Link>
  );
}
