"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { ACTIVE_PROGRAMS } from "@/data/active-programs";

const SLIDE_DURATION = 5500;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProgramsHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const canRotate = ACTIVE_PROGRAMS.length > 1;

  useEffect(() => {
    if (!canRotate || paused || prefersReducedMotion()) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ACTIVE_PROGRAMS.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused, index, canRotate]);

  function goTo(next: number) {
    setIndex(((next % ACTIVE_PROGRAMS.length) + ACTIVE_PROGRAMS.length) % ACTIVE_PROGRAMS.length);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!canRotate) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  }

  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={handleKeyDown}
          className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border border-primary/10 bg-muted sm:aspect-[16/9] lg:aspect-auto lg:h-[600px]"
        >
          {ACTIVE_PROGRAMS.map((program, i) => (
            <div
              key={program.href}
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-0 transition-all duration-[650ms] ease-out",
                i === index ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.04] opacity-0"
              )}
            >
              {program.video ? (
                <video
                  src={program.video}
                  aria-label={program.alt}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={i === 0 ? "auto" : "none"}
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <Image
                  src={program.image}
                  alt={program.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/40 lg:to-transparent"
              />
            </div>
          ))}

          {/* Per-slide copy: remounted on index change so motion-safe:animate-in replays each time. */}
          <div
            key={index}
            className="absolute inset-0 z-20 flex flex-col justify-end p-6 pb-16 sm:p-10 sm:pb-20 lg:w-[60%] lg:justify-center lg:p-14"
          >
            <span
              className="inline-flex w-fit items-center rounded-full bg-background/90 px-3.5 py-1.5 text-xs font-semibold text-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-500"
            >
              {ACTIVE_PROGRAMS[index].category}
            </span>

            <h1
              className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl lg:text-5xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
              style={{ animationDelay: "80ms" }}
            >
              {ACTIVE_PROGRAMS[index].title}
            </h1>

            <p
              className="mt-2 text-sm font-semibold tracking-wide text-brand-green sm:text-base motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
              style={{ animationDelay: "160ms" }}
            >
              {ACTIVE_PROGRAMS[index].outcome}
            </p>

            <p
              className="mt-4 max-w-md text-base leading-relaxed text-background/80 sm:text-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
              style={{ animationDelay: "240ms" }}
            >
              {ACTIVE_PROGRAMS[index].description}
            </p>

            <Link
              href={ACTIVE_PROGRAMS[index].href}
              className={cn(
                buttonVariants({ variant: "default" }),
                "group mt-6 h-11 w-fit gap-1.5 rounded-full bg-background px-6 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-lg active:translate-y-0 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
              )}
              style={{ animationDelay: "320ms" }}
            >
              Explore Program
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {canRotate && (
            <div
              role="group"
              aria-label="Featured programs"
              className="absolute inset-x-0 bottom-6 z-30 flex items-center justify-center gap-2.5 sm:bottom-7 lg:bottom-8"
            >
              {ACTIVE_PROGRAMS.map((program, i) => (
                <button
                  key={program.href}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${program.title}`}
                  aria-current={i === index}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background",
                    i === index ? "w-6 bg-background" : "w-2 bg-background/40 hover:bg-background/70"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
