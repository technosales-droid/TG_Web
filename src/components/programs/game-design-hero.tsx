"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Layers, PenTool, Wrench } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

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

const TOOLS = ["Unity", "Unreal Engine", "Figma", "Design & prototyping tools", "Git / GitHub"];

export function GameDesignHero() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 pt-8 pb-14 sm:px-6 sm:pt-10 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 p-6 sm:p-10 lg:p-14">
          <div className="grid items-start gap-10 xl:grid-cols-[1.1fr_1fr] xl:gap-16">
            <div
              className={cn(
                "transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Creative Technology
              </div>

              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl xl:text-[2.75rem] 2xl:text-5xl">
                <span className="block text-balance">TG GameDesign Studio</span>{" "}
                <span className="block text-balance bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
                  Game &amp; Level Design.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Turn ideas into structured game experiences by designing mechanics, levels, progression,
                challenges and rewards.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="#program-overview"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                  )}
                >
                  Explore the Program
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center gap-1 py-2 text-base font-medium text-foreground transition-colors duration-300 hover:text-primary"
                >
                  Talk to Techno Gurukul
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <div
              className={cn(
                "rounded-[2rem] border border-primary/10 bg-card p-6 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] transition-all delay-150 duration-700 sm:p-8",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
            >
              <p className="text-sm font-semibold tracking-widest text-primary uppercase">Program Snapshot</p>

              <div className="mt-5 flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Clock className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Duration</p>
                  <p className="text-lg font-semibold text-foreground">6–12 months</p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Layers className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Focus areas</p>
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {["Game Design", "Level Design"].map((tag) => (
                      <li key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Wrench className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Tools you&rsquo;ll use</p>
                  <p className="mt-1 text-base leading-relaxed text-foreground">{TOOLS.join(", ")}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/10 bg-muted/60 p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <PenTool className="size-4" aria-hidden="true" />
                </span>
                <p className="text-sm leading-snug text-muted-foreground">
                  Part of Techno Gurukul&rsquo;s Game Development &amp; Design pathway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
