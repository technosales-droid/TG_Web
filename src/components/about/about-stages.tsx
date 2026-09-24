"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

// A generic learning journey, not a company history: no years, counts, results or milestones.
const STAGES = [
  {
    title: "Understand",
    tag: "Concepts",
    description:
      "Start with strong fundamentals. Learners explore concepts clearly, ask questions and build the foundation they need to move forward with confidence.",
    image: "/brand/learn.jpg",
    alt: "A learner reaching for a book in a library",
  },
  {
    title: "Practise",
    tag: "Skills",
    description:
      "Turn concepts into skills through guided exercises, experimentation and repeated practice. Learning becomes stronger when learners actively work with what they know.",
    image: "/brand/practise.jpg",
    alt: "A desk with a laptop, tablet and notebook set up for practice",
  },
  {
    title: "Build",
    tag: "Projects",
    description:
      "Apply knowledge through practical projects. Learners work through real problems, create solutions and develop the confidence to turn ideas into something tangible.",
    image: "/brand/build.jpg",
    alt: "A laptop showing a 3D model beside hand-drawn plans",
  },
  {
    title: "Show",
    tag: "Portfolio",
    description:
      "Projects become evidence of learning. Learners learn to present their work, explain their thinking and communicate what they have created.",
    image: "/brand/projects.jpg",
    alt: "A group reviewing ideas pinned to a wall around a shared table",
  },
  {
    title: "Prepare",
    tag: "Career readiness",
    description:
      "Build the habits, communication skills and practical confidence needed for the next step — whether that means further learning, a career or building something independently.",
    image: "/brand/show.jpg",
    alt: "A graduate walking towards a city skyline",
  },
];

/** How we learn: pick a stage on the left, see it on the right. */
export function AboutStages() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <section aria-labelledby="ab-stages-heading" className="px-4 py-16 sm:px-6 sm:py-20 xl:py-28">
      <div className="mx-auto max-w-[1280px] xl:px-8">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-primary uppercase">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            How we learn
          </div>
          <h2 id="ab-stages-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
            From Learning to <span className={GRADIENT_TEXT}>Building.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Learning becomes meaningful when knowledge moves beyond the classroom. Our approach takes learners from
            understanding concepts to practising skills, building projects and preparing for what comes next.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <div role="group" aria-label="Learning stages" className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-l lg:border-primary/15">
            {STAGES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-left text-base font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none",
                  "lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:px-6 lg:py-4",
                  i === active
                    ? "border-primary bg-primary text-white lg:bg-transparent lg:text-foreground lg:border-primary"
                    : "border-primary/20 text-muted-foreground hover:text-foreground lg:border-transparent"
                )}
              >
                <span className="block text-lg lg:text-2xl">{s.title}</span>
                <span className={cn("hidden text-sm font-medium lg:block", i === active ? "text-primary" : "text-muted-foreground")}>{s.tag}</span>
              </button>
            ))}
          </div>

          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted">
              {STAGES.map((s, i) => (
                <Image
                  key={s.title}
                  src={s.image}
                  alt={i === active ? s.alt : ""}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={cn("object-cover transition-opacity duration-500 motion-reduce:transition-none", i === active ? "opacity-100" : "opacity-0")}
                />
              ))}
            </div>
            <div aria-live="polite" className="mt-6 max-w-2xl">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{stage.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">{stage.description}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
