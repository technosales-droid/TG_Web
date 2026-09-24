"use client";

import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, GraduationCap, Handshake, Shuffle, TrendingUp } from "lucide-react";
import { cn } from "cn";

// Audiences come from the FAQ "Who can join the program?" in the Techno Gurukul web copy
// (students and graduates are combined into one profile). Descriptions reuse the program's own
// take-away and career-path wording; the source gives no per-audience eligibility rules.
const PROFILES = [
  {
    title: "Students & Graduates",
    icon: GraduationCap,
    text: "Move beyond classroom knowledge to practical campaign experience and portfolio-worthy projects.",
  },
  {
    title: "Working Professionals",
    icon: BriefcaseBusiness,
    text: "Add industry-relevant digital marketing skills through practical, hands-on work.",
  },
  {
    title: "Career Switchers",
    icon: Shuffle,
    text: "Build the skill first, then decide where you want to take it.",
  },
  {
    title: "Aspiring Freelancers",
    icon: Handshake,
    text: "Learn how to find clients, understand requirements, pitch services, execute campaigns and report results.",
  },
  {
    title: "Business Owners",
    icon: TrendingUp,
    text: "Use digital marketing to build awareness, generate leads, acquire customers and measure performance.",
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

export function DigitalMarketingAudience() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="who-its-for" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto grid max-w-[1800px] gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center xl:gap-16">
        <div
          className={cn(
            "transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Who This Is For
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Is This Program Right for You?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The program can be relevant for students, graduates, working professionals, career
            switchers, aspiring freelancers and business owners.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground">
            Specific eligibility should be confirmed with the admissions team.
          </p>
        </div>

        <ul
          aria-label="Who this program can be relevant for"
          style={{ transitionDelay: visible ? "150ms" : "0ms" }}
          className={cn(
            "rounded-[2.5rem] border border-primary/10 bg-card p-2 transition-all duration-700 sm:p-3",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          {PROFILES.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                className="group grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 rounded-[2rem] p-4 transition-colors duration-300 hover:bg-muted sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-x-5 sm:gap-y-1.5 sm:p-5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6 sm:row-span-2">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="min-w-0 text-xl font-semibold tracking-tight text-foreground sm:pt-1">{p.title}</h3>
                <p className="col-span-2 text-base leading-relaxed text-muted-foreground sm:col-span-1 sm:col-start-2">
                  {p.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
