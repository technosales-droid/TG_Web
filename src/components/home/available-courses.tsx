"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { ACTIVE_PROGRAMS, type ActiveProgram } from "@/data/active-programs";
import { AI_PROGRAM_HREF, DM_PROGRAM_HREF, GD_PROGRAM_HREF } from "@/lib/program-routes";

// The three courses Techno Gurukul currently teaches, in Nashik. The AI Program is the signature/primary course,
// shown as a wide spotlight banner; Digital Marketing and Game Development are real, available courses, shown
// side by side below it. All three pull from the site's existing program data, so this section can never drift
// out of sync with what /programs actually offers. Asserted here (not filtered defensively) because these are
// three specific, known entries, not an arbitrary list.
const AI_PROGRAM = ACTIVE_PROGRAMS.find((p) => p.href === AI_PROGRAM_HREF)!;
const DIGITAL_MARKETING = ACTIVE_PROGRAMS.find((p) => p.href === DM_PROGRAM_HREF)!;
const GAME_DEVELOPMENT = ACTIVE_PROGRAMS.find((p) => p.href === GD_PROGRAM_HREF)!;

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
            "mt-10 flex flex-col gap-6 transition-all delay-150 duration-700 lg:mt-12",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <SpotlightCourseCard program={AI_PROGRAM} />
          <div className="grid gap-6 sm:grid-cols-2">
            <SecondaryCourseCard program={DIGITAL_MARKETING} />
            <SecondaryCourseCard program={GAME_DEVELOPMENT} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The AI Program's wide spotlight banner: image and content sit side by side on desktop, stacked on phone, so
 * it reads as a distinct, horizontal "featured" format rather than just a bigger version of the cards below. */
function SpotlightCourseCard({ program }: { program: ActiveProgram }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary lg:flex-row lg:items-stretch">
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9] lg:aspect-auto lg:w-[46%] lg:shrink-0">
        {program.image ? (
          <Image
            src={program.image}
            alt={program.alt}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0b3d50] via-primary/80 to-brand-sky/60">
            <Sparkles className="size-20 text-white/15 transition-transform duration-500 group-hover:scale-105" />
          </div>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b3d50] via-[#0b3d50]/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0b3d50]/40" />
        <span className="absolute top-6 left-6 inline-flex items-center rounded-full bg-brand-sky px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">
          Signature Course
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-widest text-brand-sky uppercase">{program.category}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{program.title}</h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80">{program.description}</p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={program.href}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 rounded-full bg-white px-7 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg active:translate-y-0"
            )}
          >
            Explore {program.title}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="text-sm font-medium text-white/75 underline underline-offset-4 hover:text-white">
            Enquire now
          </Link>
        </div>
      </div>
    </article>
  );
}

function SecondaryCourseCard({ program }: { program: ActiveProgram }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-primary/10 bg-card">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {program.image ? (
          <Image
            src={program.image}
            alt={program.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d5674] to-primary">
            <Sparkles className="size-12 text-white/20 transition-transform duration-500 group-hover:scale-105" />
          </div>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">{program.category}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{program.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{program.description}</p>

        <div className="mt-auto pt-6">
          <Link
            href={program.href}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 w-full rounded-full border-primary/30 px-6 text-base text-foreground hover:bg-muted sm:w-auto"
            )}
          >
            Explore {program.title}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
