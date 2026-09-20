"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Compass, FolderOpen, Wrench } from "lucide-react";
import { cn } from "cn";

const PILLARS = [
  { n: "01", title: "Practical Learning", text: "Learn concepts by applying them.", icon: BookOpen },
  { n: "02", title: "Hands-On Work", text: "Practice through exercises and practical work.", icon: Wrench },
  { n: "03", title: "Build Your Portfolio", text: "Turn completed work into something you can show.", icon: FolderOpen },
  {
    n: "04",
    title: "Career Direction",
    text: "Build skills that can support different future directions.",
    icon: Compass,
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function ProgramsPhilosophy() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px] rounded-[2.5rem] border border-primary/10 bg-muted/50 px-4 py-8 sm:p-10 lg:p-12">
        <div
          className={cn(
            "grid gap-5 px-2 transition-all duration-700 sm:px-0 xl:grid-cols-[1.1fr_1fr] xl:items-end xl:gap-16",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              How We Learn
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl xl:text-4xl 2xl:text-5xl">
              Learning Should Lead to Something You Can Build.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            At Techno Gurukul, learning is designed to move beyond theory. Students build their
            understanding step by step, apply their skills through practical work, and bring what
            they learn together in projects they can actually show.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-4">
          {PILLARS.map((p, index) => {
            const Icon = p.icon;
            return (
              <li
                key={p.n}
                style={{ transitionDelay: visible ? `${index * 100 + 150}ms` : "0ms" }}
                className={cn(
                  "group grid min-w-0 grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-[1.75rem] border border-primary/10 bg-card p-5 transition-all duration-500 hover:bg-muted motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:flex sm:flex-col sm:gap-0",
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
              >
                <div className="row-span-2 sm:flex sm:items-center sm:justify-between sm:gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden text-2xl font-semibold tracking-tight text-primary/40 sm:inline"
                  >
                    {p.n}
                  </span>
                </div>
                <h3 className="self-center text-xl font-semibold tracking-tight text-foreground sm:mt-5 sm:self-auto">
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground sm:mt-2">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
