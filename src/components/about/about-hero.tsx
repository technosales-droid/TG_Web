import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

const STAGES = [
  { step: "Learn", label: "Concepts", indent: "" },
  { step: "Practise", label: "Practice", indent: "sm:ml-6" },
  { step: "Build", label: "Projects", indent: "sm:ml-12" },
  { step: "Show", label: "Portfolio", indent: "sm:ml-[4.5rem]" },
  { step: "Prepare", label: "Career Readiness", indent: "sm:ml-24" },
];

// Abstract learning-system staircase. Illustrative only: no statistics, dashboard, campus or student data.
function LearningSystem() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[2rem] border border-primary/10 bg-card p-4 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] sm:p-6">
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary/25" />
          <span className="size-2.5 rounded-full bg-brand-green/40" />
          <span className="ml-2 h-2.5 w-28 rounded-full bg-primary/15" />
        </div>

        <p className="mt-5 text-sm font-semibold tracking-widest text-primary uppercase">The Learning System</p>
        <ol aria-label="Learn, practise, build, show, prepare" className="mt-4 grid gap-2.5">
          {STAGES.map((s, i) => {
            const last = i === STAGES.length - 1;
            return (
              <li
                key={s.step}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-xl border px-4 py-3",
                  s.indent,
                  last ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/15 bg-background"
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      last ? "bg-white/25 text-white" : "bg-primary/10 text-primary"
                    )}
                   />
                  <span className={cn("text-lg font-semibold tracking-tight", last ? "text-white" : "text-foreground")}>{s.step}</span>
                </span>
                <span className={cn("text-sm font-medium", last ? "text-white/85" : "text-muted-foreground")}>{s.label}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function AboutHero() {
  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:min-h-[600px] xl:px-16 xl:py-14">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[48%] xl:block">
            <div className="absolute inset-0 bg-brand-green/10 [clip-path:polygon(14%_0%,100%_0%,100%_100%,0%_100%)]" />
            <div className="absolute inset-0 bg-primary/8 [clip-path:polygon(0%_100%,55%_100%,100%_55%,100%_100%)]" />
          </div>

          <div className="relative grid items-center gap-10 xl:min-h-[480px] xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                About Techno Gurukul
              </div>
              <h1 className="mt-4 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-tight text-balance text-foreground min-[430px]:text-4xl sm:text-5xl xl:text-[3rem]">
                Learning Should Lead to <span className={GRADIENT_TEXT}>Something You Can Build.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Techno Gurukul is built around practical learning &mdash; helping learners understand concepts, practise
                skills, build projects and develop the confidence to apply what they know.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/learning"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                  )}
                >
                  Explore Learning
                </Link>
                <Link
                  href="/programs"
                  className="group flex min-h-11 items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Explore Programs
                  <ChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <LearningSystem />
          </div>
        </div>
      </div>
    </section>
  );
}
