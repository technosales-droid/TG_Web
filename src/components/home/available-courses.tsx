"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { ACTIVE_PROGRAMS } from "@/data/active-programs";
import { ALL_OFFERINGS } from "@/data/programs";

// The two courses Techno Gurukul currently teaches, in Nashik. Digital Marketing is the signature/primary course;
// Game Development is a real, available second course, shown as one entry rather than its full studio ecosystem
// (that detail lives on /programs and its own program pages). Both pull from the site's existing program data, so
// this section can never drift out of sync with what /programs actually offers.
// Both real photos in the data, asserted here (not filtered defensively) because these are two specific, known
// entries, not an arbitrary list.
const DIGITAL_MARKETING = { ...ACTIVE_PROGRAMS.find((p) => p.href === "/programs/tg-digital-marketing")! } as typeof ACTIVE_PROGRAMS[number] & { image: string };
const GAME_DEVELOPMENT = { ...ACTIVE_PROGRAMS.find((p) => p.href === "/programs/tg-gameforge")! } as typeof ACTIVE_PROGRAMS[number] & { image: string };
const dmTags = ALL_OFFERINGS.find((o) => o.slug === "tg-digital-marketing")?.tags ?? [];

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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function AvailableCourses() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} aria-labelledby="available-courses-heading" className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1800px]">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
            Available Courses in Nashik
          </div>
          <h2 id="available-courses-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Practical Digital Marketing and Game Development Training.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Two courses are open for enrolment right now at our Nashik institute. Everything else on the way is
            listed further down as Coming Soon.
          </p>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-6 transition-all delay-150 duration-700 lg:mt-12 lg:grid-cols-5 lg:items-stretch",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <PrimaryCourseCard />
          <SecondaryCourseCard />
        </div>
      </div>
    </section>
  );
}

function PrimaryCourseCard() {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary lg:col-span-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/8]">
        <Image
          src={DIGITAL_MARKETING.image}
          alt={DIGITAL_MARKETING.alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b3d50] via-[#0b3d50]/10 to-transparent" />
        <span className="absolute top-6 left-6 inline-flex items-center rounded-full bg-brand-sky px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">
          Signature Course
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-widest text-brand-sky uppercase">{DIGITAL_MARKETING.category}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{DIGITAL_MARKETING.title} Course in Nashik</h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80">{DIGITAL_MARKETING.description}</p>

        {dmTags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {dmTags.map((tag) => (
              <li key={tag} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                <Check className="size-3.5 shrink-0 text-brand-sky" aria-hidden="true" />
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href={DIGITAL_MARKETING.href}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 rounded-full bg-white px-7 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg active:translate-y-0"
            )}
          >
            Explore Digital Marketing
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="text-base font-medium text-white/90 underline underline-offset-4 hover:text-white">
            Enquire now
          </Link>
        </div>
      </div>
    </article>
  );
}

function SecondaryCourseCard() {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-primary/10 bg-card lg:col-span-2">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={GAME_DEVELOPMENT.image}
          alt={GAME_DEVELOPMENT.alt}
          fill
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">{GAME_DEVELOPMENT.category}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{GAME_DEVELOPMENT.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{GAME_DEVELOPMENT.description}</p>

        <div className="mt-auto pt-6">
          <Link
            href={GAME_DEVELOPMENT.href}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 w-full rounded-full border-primary/30 px-6 text-base text-foreground hover:bg-muted sm:w-auto"
            )}
          >
            Explore Game Development
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
