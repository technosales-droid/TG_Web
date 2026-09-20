import Link from "next/link";
import { Briefcase, ChevronRight, Code2, Laptop, Layers, Palette, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

// Conceptual directions only: no job titles, salaries or numbers.
const DIRECTIONS: { icon: LucideIcon; title: string; detail: string; tone: "accent" | "green" }[] = [
  { icon: Briefcase, title: "Professional Roles", detail: "Grow within a team", tone: "accent" },
  { icon: Laptop, title: "Freelance", detail: "Work independently", tone: "green" },
  { icon: Rocket, title: "Entrepreneurship", detail: "Build your own venture", tone: "accent" },
  { icon: Palette, title: "Creative Work", detail: "Design and make", tone: "green" },
  { icon: Code2, title: "Technical Work", detail: "Build and solve", tone: "accent" },
];

const LABELS = ["Practical Skills", "Real Projects", "Portfolio Evidence", "Career Direction"];

const TONE = {
  accent: "bg-accent text-primary",
  green: "bg-brand-green/15 text-brand-green",
} as const;

// Curve from the skills node (left, centre) to the middle of each direction card. The five cards sit
// in five equal rows, so their centres are at 10%, 30%, 50%, 70% and 90% of the height.
const CURVES = [10, 30, 50, 70, 90].map((y) => `M0 50 C 55 50, 45 ${y}, 100 ${y}`);

function CareerVisual() {
  return (
    <figure className="w-full">
      <figcaption className="sr-only">One set of practical skills can lead to several career directions.</figcaption>

      <ul aria-label="What builds career direction" className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:justify-start">
        {LABELS.map((label, i) => (
          <li
            key={label}
            style={{ animationDelay: `${i * 0.7}s` }}
            className="rounded-full border border-primary/10 bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-[0_8px_20px_-12px_rgba(16,20,28,0.3)] transition-all duration-300 hover:-translate-y-1 sm:text-sm motion-safe:animate-[gentle-float_6s_ease-in-out_infinite]"
          >
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col items-center sm:mt-6 sm:flex-row sm:items-stretch">
        {/* The single starting point */}
        <div className="flex shrink-0 items-center justify-center sm:w-32 lg:w-36">
          <div className="flex size-28 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_18px_36px_-16px_rgba(13,99,134,0.6)] ring-8 ring-primary/10 lg:size-32">
            <Layers className="size-6 lg:size-7" aria-hidden="true" />
            <span className="mt-1 text-base font-semibold lg:text-lg">Skills</span>
          </div>
        </div>

        {/* Connectors: a short rail on mobile, branching curves from tablet up */}
        <div aria-hidden="true" className="h-8 w-px bg-primary/25 sm:hidden" />
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="hidden w-10 shrink-0 self-stretch text-primary/35 sm:block lg:w-16"
        >
          {CURVES.map((d) => (
            <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        {/* Multiple directions */}
        <ul aria-label="Career directions" className="grid w-full min-w-0 grid-rows-5 sm:flex-1">
          {DIRECTIONS.map(({ icon: Icon, title, detail, tone }) => (
            <li key={title} className="min-w-0 py-1.5">
              <div className="group flex h-full items-center gap-3 rounded-2xl border border-primary/10 bg-card px-4 py-3 shadow-[0_12px_28px_-18px_rgba(16,20,28,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_rgba(16,20,28,0.35)]">
                <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", TONE[tone])}>
                  <Icon
                    className="size-4 transition-transform duration-300 motion-safe:group-hover:scale-110"
                    aria-hidden="true"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{title}</span>
                  <span className="block text-xs text-muted-foreground">{detail}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

export function CareerPathsHero() {
  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 lg:min-h-[650px] lg:px-12 lg:py-14 xl:px-16">
          {/* Restrained backdrop tint, desktop only */}
          <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
            <div className="absolute inset-0 bg-brand-green/10 [clip-path:polygon(18%_0%,100%_0%,100%_100%,0%_100%)]" />
          </div>

          <div className="relative grid items-center gap-10 lg:min-h-[520px] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 xl:gap-20">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Career Paths
              </div>

              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl xl:text-6xl">
                Build Skills That Open{" "}
                <span className="inline-block bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
                  More Than One Door.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Different students want different futures. Techno Gurukul focuses on practical skills, real project
                work and portfolio development so students can explore career directions that match what they enjoy
                and what they can build.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/programs"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                  )}
                >
                  Explore Programs
                </Link>
                <Link
                  href="/learning/projects"
                  className="group flex items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  View Projects
                  <ChevronRight
                    className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <CareerVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
