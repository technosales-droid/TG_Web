"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { HERO_SLIDES } from "@/data/institute";
import { Media } from "./media";

const HOLD_MS = 6500;
const pad = (n: number) => String(n).padStart(2, "0");

const ARROW =
  "flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Large image-led hero: slides cross-fade, and the whole area can be swiped. Autoplay is slow and pauses on hover. */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const startX = useRef<number | null>(null);
  const total = HERO_SLIDES.length;
  const go = (n: number) => setIndex((n + total) % total);

  useEffect(() => {
    if (hovered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % total), HOLD_MS);
    return () => clearTimeout(id);
  }, [index, hovered, total]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="The Techno Gurukul institute"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14"
    >
      <div className="mx-auto max-w-[1800px]">
        <div
          className="relative isolate min-h-[34rem] touch-pan-y overflow-hidden rounded-[2.5rem] bg-[#062c3d] text-white sm:min-h-[38rem] xl:min-h-[44rem]"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
          }}
        >
          {HERO_SLIDES.map((s, i) => (
            <div key={s.label} aria-hidden={i !== index} className={cn("absolute inset-0 -z-10 transition-opacity duration-700 motion-reduce:transition-none", i === index ? "opacity-100" : "opacity-0")}>
              <Media item={s} sizes="100vw" priority={i === 0} />
            </div>
          ))}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#062c3d]/85 via-[#062c3d]/45 to-transparent" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#062c3d]/80 via-transparent to-[#062c3d]/25" />

          <div className="flex min-h-[inherit] flex-col justify-between p-6 sm:p-10 xl:p-14">
            <div className="flex items-center justify-between text-xs font-semibold tracking-[0.2em] uppercase">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Techno Gurukul
              </span>
              <span aria-live="off" className="tabular-nums">
                {pad(index + 1)} / {pad(total)}
              </span>
            </div>

            <div className="max-w-3xl pt-24 pb-4">
              <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl xl:text-7xl">
                Where Learning Happens{" "}
                <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">by Doing.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Explore the spaces, people and experiences that make learning at Techno Gurukul practical, collaborative and hands-on.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="#experience" className={cn(buttonVariants({ variant: "default" }), "h-12 rounded-full bg-white px-7 text-base font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg motion-reduce:transition-none")}>
                  Explore Our Institute
                </Link>
                <Link href="#faculty" className="flex min-h-12 items-center border-b border-white/60 text-base font-medium text-white transition-colors hover:border-brand-green hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  Meet Our Faculty
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2" role="group" aria-label="Choose a slide">
                {HERO_SLIDES.map((s, i) => (
                  <button key={s.label} type="button" aria-label={`Show ${s.label}`} aria-current={i === index} onClick={() => go(i)} className="flex h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    <span className={cn("h-1.5 rounded-full transition-all duration-300", i === index ? "w-10 bg-white" : "w-5 bg-white/40")} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className={ARROW}>
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className={ARROW}>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
