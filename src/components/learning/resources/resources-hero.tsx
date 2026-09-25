"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { cn } from "cn";
import { CATEGORY_OF, DIFFICULTY_LABEL, RESOURCES } from "@/data/resources";

// The carousel shows the featured records only. They are sample records, and the slide says so.
const FEATURED = RESOURCES.filter((r) => r.featured);
const HOLD_MS = 6000;

// Temporary photography, one per featured resource. Swap for real imagery as resources are published.
const IMAGES: Record<string, string> = {
  "sample-seo-guide": "/brand/programs-digital-marketing.jpg",
  "sample-game-design-guide": "/brand/course-tg-gamedesign-studio.png",
  "sample-project-planning-template": "/brand/documentation.jpg",
  "sample-campaign-planning-guide": "/brand/course-tg-digital-marketing.png",
};

const NAV_BTN =
  "flex size-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function ResourcesHero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const go = (n: number) => setIndex((n + FEATURED.length) % FEATURED.length);

  useEffect(() => {
    if (!playing || hovered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % FEATURED.length), HOLD_MS);
    return () => clearTimeout(id);
  }, [index, playing, hovered]);

  const r = FEATURED[index];
  const details = [
    { label: "Type", value: `${CATEGORY_OF[r.resourceType]} · ${r.resourceType}` },
    { label: "Format", value: r.format },
    { label: "Level", value: r.difficulty ? DIFFICULTY_LABEL[r.difficulty] : "All levels" },
    { label: "Area", value: r.industry ?? "General" },
  ];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured resources"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14"
    >
      <h1 className="sr-only">Learning resources at Techno Gurukul</h1>
      <div className="mx-auto max-w-[1800px]">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#0a3d54] px-6 py-10 text-white sm:px-12 sm:py-14 xl:min-h-[640px] xl:px-20 xl:py-16">
          {/* One photo per resource, stacked and cross-faded. The overlay keeps the text readable. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            {FEATURED.map((f, i) => (
              <Image
                key={f.slug}
                src={IMAGES[f.slug] ?? "/brand/documentation.jpg"}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={cn("object-cover transition-opacity duration-700 motion-reduce:transition-none", i === index ? "opacity-100" : "opacity-0")}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[#062c3d]/95 via-[#0a4a66]/75 to-[#0a6a8f]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062c3d]/70 to-transparent" />
          </div>

          <div className="flex items-center justify-between gap-4 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
            <span>Featured resources</span>
            <span aria-live="off">
              {index + 1} / {FEATURED.length}
            </span>
          </div>

          <div
            key={r.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${FEATURED.length}`}
            className="mt-10 grid items-center gap-10 animate-in fade-in duration-500 motion-safe:slide-in-from-bottom-3 xl:mt-14 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-16"
          >
            <div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-white/80">
                <span className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold tracking-wide uppercase">Sample resource</span>
                {r.resourceType}
              </p>
              <h2 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl">{r.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{r.shortDescription}</p>
              <ul aria-label="Topics" className="mt-6 flex flex-wrap gap-2">
                {r.topics.map((t) => (
                  <li key={t} className="rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid grid-cols-2 gap-3 rounded-3xl border border-white/20 bg-black/25 p-5 backdrop-blur-md sm:p-7">
              {details.map((d) => (
                <div key={d.label} className="rounded-2xl bg-white/10 px-4 py-3.5">
                  <dt className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">{d.label}</dt>
                  <dd className="mt-1 text-base font-semibold">{d.value}</dd>
                </div>
              ))}
              <p className="col-span-2 px-1 pt-1 text-sm text-white/70">Preview coming soon</p>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6 xl:mt-14">
            <div className="flex items-center gap-2" role="group" aria-label="Choose a resource">
              {FEATURED.map((f, i) => (
                <button
                  key={f.slug}
                  type="button"
                  aria-label={`Show ${f.title}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className="flex h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className={cn("h-1.5 rounded-full transition-all duration-300", i === index ? "w-10 bg-white" : "w-5 bg-white/35")} />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause carousel" : "Play carousel"} className={NAV_BTN}>
                {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
              </button>
              <button type="button" onClick={() => go(index - 1)} aria-label="Previous resource" className={NAV_BTN}>
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(index + 1)} aria-label="Next resource" className={NAV_BTN}>
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
