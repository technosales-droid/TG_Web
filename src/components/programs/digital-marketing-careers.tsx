"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Briefcase, Laptop, Store } from "lucide-react";
import { cn } from "cn";

// Direction names and descriptions are the "Career Options" copy in the Techno Gurukul web copy.
// Skill tags are program topics / take-aways from the same document that connect to each direction.
const DIRECTIONS = [
  {
    kicker: "Employment",
    title: "Get Hired",
    icon: Briefcase,
    work: "Build the skills and portfolio needed to enter the digital marketing industry.",
    skills: ["Portfolio-worthy projects", "Practical campaign experience", "Industry-relevant digital marketing skills"],
  },
  {
    kicker: "Freelancing",
    title: "Go Freelance",
    icon: Laptop,
    work: "Learn how to find clients, understand their requirements and deliver marketing services.",
    skills: ["Freelancing & Client Acquisition", "A better understanding of client requirements", "Career and freelancing knowledge"],
  },
  {
    kicker: "Entrepreneurship",
    title: "Build Your Business",
    icon: Store,
    work: "Use digital marketing to attract customers, build your brand and grow your business.",
    skills: ["Brand Building", "Social Media Marketing", "WhatsApp & Lead Generation", "E-commerce Marketing"],
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

export function DigitalMarketingCareers() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} id="career-directions" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Career Directions
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            One Skill. Three Directions.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Build the portfolio, confidence and practical experience required to pursue employment,
            freelancing or entrepreneurship.
          </p>
        </div>

        <ul className="mt-10 space-y-4 lg:mt-12 lg:space-y-5">
          {DIRECTIONS.map((d, index) => {
            const Icon = d.icon;
            return (
              <li
                key={d.title}
                style={{ transitionDelay: visible ? `${index * 120 + 150}ms` : "0ms" }}
                className={cn(
                  "group grid gap-6 rounded-[2rem] border border-primary/10 bg-card p-5 transition-all duration-500 hover:bg-muted motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:p-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] xl:items-center xl:gap-14",
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
              >
                <div className="flex items-center gap-4 rounded-2xl bg-primary/10 p-4 sm:p-5 xl:relative xl:order-3">
                  <ArrowRight
                    className="absolute top-1/2 -left-[2.4rem] hidden size-5 -translate-y-1/2 text-primary/50 xl:block"
                    aria-hidden="true"
                  />
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-card text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold tracking-wider text-primary uppercase sm:tracking-widest">{d.kicker}</p>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{d.title}</h3>
                  </div>
                </div>

                <div className="xl:relative xl:order-2">
                  <ArrowRight
                    className="absolute top-1/2 -left-[2.4rem] hidden size-5 -translate-y-1/2 text-primary/50 xl:block"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                    Type of work
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-foreground sm:text-lg">{d.work}</p>
                </div>

                <div className="xl:order-1">
                  <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                    Skills you build
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {d.skills.map((skill) => (
                      <li key={skill} className="rounded-full bg-primary/10 px-3 py-1.5 text-sm text-foreground">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          These are possible directions, not guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}
