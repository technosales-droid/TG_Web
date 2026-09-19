"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Lightbulb, PenTool, Search, Sparkles, Target } from "lucide-react";
import { cn } from "cn";

type Area = {
  title: string;
  icon: LucideIcon;
  topics: { name: string; detail: string }[];
};

// Topics and one-line descriptions are taken from "What You Will Learn" in the Techno Gurukul web copy.
const AREAS: Area[] = [
  {
    title: "Strategy & Consumer Understanding",
    icon: Lightbulb,
    topics: [
      { name: "Digital Marketing Strategy", detail: "Understand the role of digital in the overall marketing mix." },
      { name: "Consumer Psychology", detail: "Understand audiences, behaviour, motivations and purchase decisions." },
      { name: "Brand Building", detail: "Learn how brands create positioning, identity and meaningful connections." },
    ],
  },
  {
    title: "Content & Social Media",
    icon: PenTool,
    topics: [
      { name: "Content & Copywriting", detail: "Create content that attracts attention and drives action." },
      { name: "Social Media Marketing", detail: "Plan, create, manage and evaluate social media campaigns." },
    ],
  },
  {
    title: "Search & Web Presence",
    icon: Search,
    topics: [
      { name: "Search Engine Optimisation", detail: "Learn how websites earn visibility through organic search." },
      {
        name: "AEO & GEO",
        detail: "Understand how content is structured for answer engines and generative search.",
      },
      {
        name: "Website & Landing Pages",
        detail: "Learn the principles behind conversion-focused digital experiences.",
      },
    ],
  },
  {
    title: "Digital Advertising",
    icon: Target,
    topics: [
      { name: "Google Ads", detail: "Learn search advertising, campaign structure, targeting and optimisation." },
      {
        name: "Meta Ads",
        detail: "Understand audience targeting, campaign creation and performance optimisation.",
      },
    ],
  },
  {
    title: "Analytics & Measurement",
    icon: BarChart3,
    topics: [
      {
        name: "Performance Marketing",
        detail: "Learn how marketers use data to measure and improve campaign performance.",
      },
      { name: "Analytics & Tracking", detail: "Understand marketing data and turn numbers into decisions." },
    ],
  },
  {
    title: "Growth, AI & Client Work",
    icon: Sparkles,
    topics: [
      {
        name: "AI for Marketing",
        detail: "Use emerging AI tools to research, create, analyse and improve marketing work.",
      },
      { name: "WhatsApp & Lead Generation", detail: "Learn how businesses can generate, nurture and convert leads." },
      { name: "E-commerce Marketing", detail: "Understand how digital channels support online commerce." },
      {
        name: "Freelancing & Client Acquisition",
        detail: "Learn the fundamentals of finding clients and delivering marketing services.",
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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function DigitalMarketingCurriculum() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="curriculum" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "grid items-end gap-5 transition-all duration-700 xl:grid-cols-[1.2fr_1fr] xl:gap-16",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Curriculum Overview
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Digital Marketing Is Bigger Than Social Media.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Our program covers the complete digital marketing ecosystem.
          </p>
        </div>

        <ul aria-label="Curriculum areas" className="mt-10 columns-1 gap-5 md:columns-2 lg:mt-12 xl:columns-3">
          {AREAS.map((area, index) => {
            const Icon = area.icon;
            return (
              <li
                key={area.title}
                style={{ transitionDelay: visible ? `${(index % 3) * 100 + 100}ms` : "0ms" }}
                className={cn(
                  "group mb-5 break-inside-avoid rounded-[2rem] border border-primary/10 bg-card p-5 transition-all duration-500 hover:bg-muted motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:p-6",
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-balance text-foreground">
                    {area.title}
                  </h3>
                </div>

                <ul className="mt-5 divide-y divide-primary/10 border-t border-primary/10">
                  {area.topics.map((topic) => (
                    <li key={topic.name} className="py-4 last:pb-0">
                      <h4 className="text-base font-semibold text-foreground">{topic.name}</h4>
                      <p className="mt-1 text-base leading-relaxed text-muted-foreground">{topic.detail}</p>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
