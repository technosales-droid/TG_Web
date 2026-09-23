"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, Pause, Play } from "lucide-react";
import { cn } from "cn";
import { ENQUIRY_ID } from "./contact-data";
import { FOCUS } from "./contact-ui";

const CONTACT_MESSAGES = [
  "Have a question? Let’s talk.",
  "Not sure where to start? Ask us.",
  "Looking for the right program?",
  "Want to know what you’ll learn?",
  "Planning your next career move?",
  "Curious about Game Development?",
  "Interested in Digital Marketing?",
  "Have a question about admissions?",
  "Let’s find the right path for you.",
  "Your next step starts with a conversation.",
] as const;

const HOLD_MS = 4000;
const FADE_MS = 300;

const pad = (n: number) => String(n).padStart(2, "0");
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Darkest in the middle, letting the photograph show toward the edges.
const OVERLAY = {
  backgroundImage: [
    "radial-gradient(ellipse 75% 60% at 50% 52%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)",
    "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.35) 100%)",
  ].join(", "),
};

export function ContactHero() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reduced = useRef(false);
  const swap = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Respect reduced motion: start paused; the visitor can still press play.
  useEffect(() => {
    if (prefersReducedMotion()) {
      reduced.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!playing || hovered) return;
    const id = setInterval(() => {
      if (reduced.current) {
        setIndex((i) => (i + 1) % CONTACT_MESSAGES.length);
        return;
      }
      setLeaving(true);
      swap.current = setTimeout(() => {
        setIndex((i) => (i + 1) % CONTACT_MESSAGES.length);
        setLeaving(false);
      }, FADE_MS);
    }, HOLD_MS + FADE_MS * 2);
    return () => {
      clearInterval(id);
      if (swap.current) clearTimeout(swap.current);
    };
  }, [playing, hovered]);

  function scrollToForm(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(ENQUIRY_ID);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${ENQUIRY_ID}`);
  }

  return (
    <section
      aria-labelledby="ct-hero-heading"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative -mt-[5.25rem] flex min-h-[82svh] flex-col overflow-hidden bg-black text-white lg:min-h-[92svh]"
    >
      {/* Temporary photo — replace with a dedicated contact-page image. */}
      <Image
        src="/brand/projects.jpg"
        alt="A group of learners gathered around a wall of notes during a planning workshop"
        fill
        priority
        sizes="100vw"
        quality={80}
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0" style={OVERLAY} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-10 text-center sm:px-10">
        <div aria-hidden="true" className="h-px w-full max-w-3xl bg-white/25" />

        <div className="w-full max-w-5xl py-10 sm:py-14">
          <p className="text-xs font-semibold tracking-[0.3em] text-white/80 uppercase sm:text-sm">Get in touch</p>

          <div className="mt-6 flex min-h-[3.4em] items-center justify-center text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:min-h-[2.3em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <h1
              id="ct-hero-heading"
              key={index}
              className={cn(
                "transition-all motion-reduce:transition-none",
                leaving ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-300"
              )}
              style={{ transitionDuration: `${FADE_MS}ms` }}
            >
              {CONTACT_MESSAGES[index]}
            </h1>
          </div>

          <p className="mx-auto mt-6 max-w-[600px] text-base leading-relaxed text-white/80 sm:text-lg">
            Tell us what you&rsquo;re looking for and we&rsquo;ll help you figure out the next step.
          </p>

          <a
            href={`#${ENQUIRY_ID}`}
            onClick={scrollToForm}
            className={cn(
              "group mt-9 inline-flex min-h-11 items-center gap-2 border-b border-white/70 pb-1 text-sm font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:border-brand-green hover:text-brand-green focus-visible:outline-offset-4 focus-visible:outline-white",
              "focus-visible:outline-2 focus-visible:outline-solid"
            )}
          >
            Start a conversation
            <ArrowDown className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-y-1" aria-hidden="true" />
          </a>
        </div>

        <div aria-hidden="true" className="h-px w-full max-w-3xl bg-white/25" />
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4 px-6 pb-6 text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase sm:px-10">
        <span className="hidden sm:inline">Techno Gurukul &middot; Get in touch</span>
        <div className="ml-auto flex items-center gap-4">
          <span className="tabular-nums">
            <span className="sr-only">Question </span>
            {pad(index + 1)} / {pad(CONTACT_MESSAGES.length)}
          </span>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause rotating questions" : "Play rotating questions"}
            className={cn("flex min-h-11 items-center gap-1.5 rounded px-1 uppercase transition-colors hover:text-white", FOCUS, "focus-visible:outline-white")}
          >
            {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </section>
  );
}
