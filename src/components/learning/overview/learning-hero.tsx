import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, FOCUS, GRADIENT, INNER } from "./overview-ui";

const GRID =
  "[background-image:linear-gradient(to_right,rgba(16,20,28,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,20,28,0.06)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_25%_20%,black,transparent_70%)]";

const STAGES = ["Learn", "Practice", "Build", "Show"];

export function LearningHero() {
  return (
    <section aria-labelledby="learning-hero-heading" className="relative overflow-hidden px-4 pt-12 pb-14 sm:px-6 sm:pt-16 sm:pb-20">
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", GRID)} />

      <div className={cn(INNER, "relative")}>
        <Reveal>
          <Eyebrow index="01">How we learn</Eyebrow>
          <h1
            id="learning-hero-heading"
            className="mt-6 max-w-5xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-foreground sm:text-6xl xl:text-7xl"
          >
            Learning Should Lead to <span className={GRADIENT}>Something You Can Build.</span>
          </h1>
        </Reveal>

        <Reveal delay={100} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg xl:text-xl">
            At Techno Gurukul, learning is designed to move beyond theory. Students build their understanding step by
            step, apply what they learn through practical work, and bring those skills together through projects they
            can develop, refine and show.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
            <Link
              href="/learning/how-we-teach"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group min-h-12 gap-2 rounded-full px-7 text-base font-semibold transition-colors duration-200 motion-reduce:transition-none",
                FOCUS
              )}
            >
              See How We Teach
              <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a
              href="#learning-process"
              className={cn("group inline-flex min-h-11 items-center gap-2 rounded border-b border-foreground/40 pb-1 text-sm font-semibold tracking-widest text-foreground uppercase transition-colors hover:border-primary hover:text-primary", FOCUS)}
            >
              Explore the learning process
              <ArrowDown className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-y-1" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-12 sm:mt-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-primary/10 bg-muted sm:aspect-[16/9] lg:aspect-[21/9]">
            {/* Temporary image — swap for a photo of students learning and building together. */}
            <Image
              src="/brand/programs-final-cta.png"
              alt="A bright, modern training room with rows of desks and projector screens"
              fill
              priority
              sizes="(min-width: 1800px) 1700px, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <ol aria-label="Learn, practice, build, show" className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-x-2 gap-y-2 sm:inset-x-8 sm:bottom-6">
              {STAGES.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-foreground uppercase backdrop-blur">
                    <span aria-hidden="true" className="text-foreground/45 tabular-nums">
                      0{i + 1}
                    </span>
                    {s}
                  </span>
                  {i < STAGES.length - 1 && <ArrowRight className="size-3.5 text-white/80" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
