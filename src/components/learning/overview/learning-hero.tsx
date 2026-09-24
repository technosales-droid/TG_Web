"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import { cn } from "cn";

// Each message is [plain text, highlighted ending]. One headline element shows one at a time.
const LEARNING_MESSAGES: readonly (readonly [string, string])[] = [
  ["Learning Should Lead to ", "Something You Can Build."],
  ["Understand It. Practice It. ", "Build It."],
  ["Learn Through ", "Doing."],
  ["Turn Knowledge Into ", "Practical Work."],
  ["Build Skills Through ", "Practice."],
  ["Learn. Build. ", "Improve."],
  ["Learning Becomes Powerful When ", "You Use It."],
  ["Don’t Just Learn It. ", "Build With It."],
  ["Build ", "What You Learn."],
  ["Make Learning ", "Practical."],
];

const STAGES = ["Learn", "Practice", "Build", "Show"];

const HOLD_MS = 3600;
const OUT_MS = 300;

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Strongest behind the text (left and lower third), fading out so the photograph stays visible.
const OVERLAY = {
  backgroundImage: [
    "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 38%, rgba(0,0,0,0.2) 68%, rgba(0,0,0,0) 100%)",
    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 38%)",
    "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 22%)",
  ].join(", "),
};

export function LearningHero() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const swap = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!playing || hovered) return;
    const id = setInterval(() => {
      setLeaving(true);
      swap.current = setTimeout(() => {
        setIndex((i) => (i + 1) % LEARNING_MESSAGES.length);
        setLeaving(false);
      }, OUT_MS);
    }, HOLD_MS + OUT_MS);
    return () => {
      clearInterval(id);
      if (swap.current) clearTimeout(swap.current);
    };
  }, [playing, hovered]);

  function scrollToProcess(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("learning-process");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", "#learning-process");
  }

  const [lead, accent] = LEARNING_MESSAGES[index];

  return (
    <section
      aria-labelledby="learning-hero-heading"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative -mt-[5.25rem] flex min-h-[84svh] flex-col overflow-hidden bg-black text-white lg:min-h-[88svh]"
    >
      {/* Temporary photo, mirrored so the student sits on the right, clear of the text. Replace with a
          dedicated photo of students learning and building together. */}
      <div aria-hidden="true" className="absolute inset-0 -scale-x-100">
        <Image
          src="/brand/learn.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] lg:object-center"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-black/30 lg:bg-transparent" />
      <div aria-hidden="true" className="absolute inset-0" style={OVERLAY} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-1 flex-col justify-end px-5 pt-32 pb-6 sm:px-10 sm:pb-8 xl:px-16">
        <div className="max-w-[1000px] pb-10 sm:pb-14">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-white/85 uppercase sm:text-sm">
            How we learn
          </p>

          <div className="mt-6 min-h-[3.3em] text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:min-h-[2.2em] sm:text-5xl lg:text-6xl xl:text-7xl">
            <h1
              id="learning-hero-heading"
              key={index}
              className={cn(
                "transition-all duration-300 ease-out motion-reduce:transition-opacity",
                leaving
                  ? "-translate-y-3 opacity-0 motion-reduce:translate-y-0"
                  : "translate-y-0 opacity-100 animate-in fade-in duration-500 ease-out motion-safe:slide-in-from-bottom-4"
              )}
            >
              {lead}
              <span className="text-brand-sky">{accent}</span>
            </h1>
          </div>

          <p className="mt-5 max-w-[600px] text-base leading-relaxed text-white/80 sm:text-lg">
            At Techno Gurukul, learning moves beyond theory through practice, projects and continuous improvement.
          </p>

          <a
            href="#learning-process"
            onClick={scrollToProcess}
            className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-white/70 pb-1 text-sm font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:border-brand-sky hover:text-brand-sky focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore the learning process
            <ArrowDown className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-y-1" aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/25 pt-4">
          <ol aria-label="Learn, practice, build, show" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold tracking-[0.2em] text-white/85 uppercase sm:text-xs">
            {STAGES.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                {s}
                {i < STAGES.length - 1 && <ArrowRight className="mx-1 size-3.5 text-white/40" aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause rotating headline" : "Play rotating headline"}
            className="flex min-h-11 items-center gap-1.5 rounded px-1 text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </section>
  );
}
