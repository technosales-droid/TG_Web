"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Boxes, Code2, Megaphone, PenTool, Search, Share2, TrendingUp } from "lucide-react";
import { cn } from "cn";

type Direction = {
  n: string;
  title: string;
  direction: string;
  roles: string[];
  icon: LucideIcon;
};

type Area = {
  name: string;
  label: string;
  icon: LucideIcon;
  root: string;
  chip: string;
  directions: Direction[];
};

// Add a new entry here to show another learning area; the grid wraps automatically.
const AREAS: Area[] = [
  {
    name: "Digital Marketing",
    label: "Learning area",
    icon: Megaphone,
    root: "from-primary to-[#0b3d50]",
    chip: "bg-primary/10",
    directions: [
      {
        n: "01",
        title: "Digital Marketing",
        direction: "Digital marketing, campaign planning, content and online growth.",
        roles: ["Digital Marketing Executive", "Digital Marketing Specialist", "Marketing Coordinator"],
        icon: TrendingUp,
      },
      {
        n: "02",
        title: "Social Media & Content",
        direction: "Social media, content planning, brand communication and digital campaigns.",
        roles: ["Social Media Executive", "Content Coordinator", "Social Media Specialist"],
        icon: Share2,
      },
      {
        n: "03",
        title: "SEO & Performance",
        direction: "Search, paid campaigns, analytics and performance-focused digital marketing.",
        roles: ["SEO Executive", "Performance Marketing Executive", "Digital Advertising Executive"],
        icon: Search,
      },
    ],
  },
  {
    name: "Game Development & Design",
    label: "Learning area",
    icon: Boxes,
    root: "from-[#1f7a40] to-[#0b3d50]",
    chip: "bg-brand-green/10",
    directions: [
      {
        n: "04",
        title: "Game Development",
        direction: "Game development, gameplay systems and interactive experiences.",
        roles: ["Game Developer", "Gameplay Programmer", "Junior Game Developer"],
        icon: Code2,
      },
      {
        n: "05",
        title: "Game Design & Creative",
        direction: "Game design, level design, visual development and interactive experiences.",
        roles: ["Game Designer", "Level Designer", "Game Artist / 3D Creative"],
        icon: PenTool,
      },
    ],
  },
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function ProgramsCareers() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Where Skills Can Take You
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Build Skills.
            <br />
            Explore Your Direction.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The skills you develop can open different paths across digital, creative and technical
            work. Explore the kinds of roles and directions you can work toward as you build your
            experience and portfolio.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 xl:grid-cols-2 xl:items-start xl:gap-8">
          {AREAS.map((area, areaIndex) => {
            const AreaIcon = area.icon;
            return (
              <div
                key={area.name}
                className={cn(
                  "flex flex-col rounded-[2.5rem] border border-primary/10 bg-muted/50 p-3 transition-all duration-700 sm:p-8",
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
                style={{ transitionDelay: visible ? `${areaIndex * 150 + 150}ms` : "0ms" }}
              >
                <div
                  className={cn(
                    "flex items-center gap-4 rounded-[1.75rem] bg-gradient-to-br p-5 text-white sm:p-6",
                    area.root
                  )}
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                    <AreaIcon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">{area.label}</p>
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{area.name}</h3>
                  </div>
                </div>

                <ul className="relative mt-6 flex flex-col gap-4 pl-6 sm:pl-8">
                  {area.directions.map((d) => {
                    const Icon = d.icon;
                    return (
                      <li
                        key={d.n}
                        className="group relative flex flex-col after:absolute after:top-[38px] after:-bottom-4 after:-left-[13px] sm:after:-left-[21px] after:w-px after:bg-primary/25 after:content-[''] last:after:hidden first:before:absolute first:before:-top-6 first:before:-left-[13px] sm:first:before:-left-[21px] first:before:h-[calc(1.5rem+38px)] first:before:w-px first:before:bg-primary/25 first:before:content-[''] rounded-[1.75rem] border border-primary/10 bg-card p-4 transition-all duration-500 hover:bg-muted motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:p-6"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute top-[38px] -left-3 h-px w-3 bg-primary/25 sm:-left-5 sm:w-5 transition-colors duration-300 group-hover:bg-primary"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute top-8 -left-[18px] size-3 sm:-left-[26px] rounded-full border-2 border-primary/40 bg-background transition-all duration-300 group-hover:border-primary group-hover:bg-primary motion-safe:group-hover:scale-125"
                        />
                        <div className="flex items-center gap-4">
                          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                            <Icon className="size-6" aria-hidden="true" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold tracking-widest text-primary uppercase">{d.n}</p>
                            <div className="flex items-center justify-between gap-3">
                              <h4 className="text-lg font-semibold tracking-tight text-foreground">{d.title}</h4>
                              <ArrowRight
                                className="size-4 shrink-0 text-primary transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{d.direction}</p>
                        <div className="mt-5">
                          <p className="text-sm font-semibold text-foreground">Roles to explore</p>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {d.roles.map((role) => (
                              <li
                                key={role}
                                className={cn("rounded-full px-3 py-1.5 text-sm text-foreground", area.chip)}
                              >
                                {role}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          These are possible directions, not guaranteed outcomes. Career paths can include different
          roles depending on skills, portfolio and experience.
        </p>
      </div>
    </section>
  );
}
