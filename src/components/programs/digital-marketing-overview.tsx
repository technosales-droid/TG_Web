"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Building2, Clock, Gauge, Lightbulb, MapPin, Rocket, Target, Users } from "lucide-react";
import { cn } from "cn";

const STAGES = [
  { label: "Concept", note: "How digital marketing works", icon: Lightbulb },
  { label: "Strategy", note: "Why consumers behave the way they do", icon: Target },
  { label: "Execution", note: "How brands acquire customers", icon: Rocket },
  { label: "Measurement", note: "How marketers measure what works", icon: Gauge },
] as const;

const DETAILS = [
  { n: "01", label: "Duration", value: "4.5–5 Months", icon: Clock },
  { n: "02", label: "Mode", value: "Offline / In-Person", icon: Building2 },
  { n: "03", label: "Location", value: "Nashik, Maharashtra", icon: MapPin },
  { n: "04", label: "Learning Model", value: (
      <>
        Practical + <span className="whitespace-nowrap">Industry-Oriented</span>
      </>
    ),
    icon: Briefcase,
  },
  { n: "05", label: "Batch Size", value: "Limited", icon: Users },
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function DigitalMarketingOverview() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="program-overview" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid items-start gap-10 xl:grid-cols-[1fr_1fr] xl:gap-16">
          <div
            className={cn(
              "transition-all duration-700",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              About The Program
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-[2.5rem] 2xl:text-5xl">
              <span className="block text-balance">A Digital Marketing Program</span>{" "}
              <span className="block text-balance">Built Around Doing.</span>
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                The Digital Marketing Professional Program at TechnoGurukul is designed to take you
                from learning concepts to executing campaigns.
              </p>
              <p>
                You will learn how digital marketing works, why consumers behave the way they do,
                how brands acquire customers and how marketers measure what works.
              </p>
              <p className="font-medium text-foreground">
                Most importantly, you will put that knowledge into practice.
              </p>
            </div>
          </div>

          {/* PROGRAM PROCESS VISUAL — abstract workflow, no figures. Final asset may replace it. */}
          <ol
            aria-label="From concept to measurement"
            className="relative rounded-[2.5rem] border border-primary/10 bg-muted/50 p-3 sm:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute top-14 bottom-14 left-[3.3rem] w-px bg-gradient-to-b from-primary/40 via-primary/25 to-brand-green/50 sm:left-[4.8rem]"
            />
            {STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const last = index === STAGES.length - 1;
              return (
                <li
                  key={stage.label}
                  style={{ transitionDelay: visible ? `${index * 120 + 150}ms` : "0ms" }}
                  className={cn(
                    "group relative flex items-center gap-4 rounded-[1.75rem] border p-4 transition-all duration-500 motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:p-5",
                    index > 0 && "mt-4",
                    last
                      ? "border-transparent bg-gradient-to-br from-primary to-[#0b3d50] text-white"
                      : "border-primary/10 bg-card hover:bg-muted",
                    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6",
                      last ? "bg-white/15 text-white" : "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-semibold tracking-widest uppercase",
                        last ? "text-white/80" : "text-primary"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")} — {stage.label}
                    </p>
                    <p className={cn("mt-1 text-base leading-snug", last ? "text-white" : "text-foreground")}>
                      {stage.note}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <ul
          aria-label="Program details"
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 xl:grid-cols-5 xl:gap-5"
        >
          {DETAILS.map((d, index) => {
            const Icon = d.icon;
            return (
              <li
                key={d.label}
                style={{ transitionDelay: visible ? `${index * 100 + 200}ms` : "0ms" }}
                className={cn(
                  "group flex items-start gap-4 rounded-[2rem] border border-primary/10 bg-card p-5 transition-all duration-500 hover:bg-muted motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:flex-col sm:gap-6 sm:p-6 sm:last:col-span-2 xl:last:col-span-1",
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
              >
                <div className="flex items-center justify-between sm:w-full">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden text-sm font-semibold tracking-widest text-primary/60 sm:block"
                  >
                    {d.n}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold tracking-widest text-primary uppercase">{d.label}</h3>
                  <p className="mt-1.5 text-xl font-semibold tracking-tight text-foreground">{d.value}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
