import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "../../learning/curriculum/section-header";

const STAGES = ["Understand", "Practise", "Apply", "Build", "Reflect"];
const CURRENT = 2; // "Apply"
const CONCEPTS = ["Knowledge", "Practice", "Projects", "Feedback", "Evidence"];

// Abstract "useful learning" workspace. Illustrative only: no statistics, dashboard, classroom or student data.
function UsefulLearning() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[2rem] border border-primary/10 bg-card p-4 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] sm:p-6">
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary/25" />
          <span className="size-2.5 rounded-full bg-brand-green/40" />
          <span className="ml-2 h-2.5 w-28 rounded-full bg-primary/15" />
        </div>

        <div className="mt-5 rounded-2xl border border-primary/15 bg-background p-4 sm:p-5">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">Useful Learning</p>
          <ol aria-label="Understand, practise, apply, build, reflect" className="mt-4 flex flex-wrap gap-2 sm:grid sm:grid-cols-5">
            {STAGES.map((step, i) => (
              <li
                key={step}
                aria-current={i === CURRENT ? "step" : undefined}
                className={cn(
                  "flex items-center justify-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold sm:px-1 sm:text-[13px]",
                  i === CURRENT
                    ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white"
                    : i < CURRENT
                      ? "border-brand-green/30 bg-brand-green/10 text-foreground"
                      : "border-dashed border-primary/25 text-muted-foreground"
                )}
              >
                {step}
              </li>
            ))}
          </ol>
          <div aria-hidden="true" className="mt-4 grid gap-2">
            <span className="block h-2 w-full rounded-full bg-primary/15" />
            <span className="block h-2 w-2/3 rounded-full bg-primary/10" />
          </div>
        </div>

        <ul aria-label="Knowledge, practice, projects, feedback, evidence" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CONCEPTS.map((c) => (
            <li key={c} className="flex items-center justify-center rounded-xl border border-primary/10 bg-muted/60 px-3 py-2.5">
              <span className="text-sm font-medium text-foreground">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WhyHero() {
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
                Why Techno Gurukul
              </div>
              <h1 className="mt-4 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-tight text-balance text-foreground min-[430px]:text-4xl sm:text-5xl xl:text-[3rem]">
                Because Knowing Is <span className={GRADIENT_TEXT}>Only the Beginning.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Techno Gurukul is built around the idea that useful learning happens when understanding is followed by
                practice, application, reflection and the opportunity to create.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/about/approach"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                  )}
                >
                  Explore Our Approach
                </Link>
                <Link
                  href="/learning"
                  className="group flex min-h-11 items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Explore Learning
                  <ChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              <Link
                href="/about"
                className="group mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <ArrowLeft className="size-4 transition-transform duration-200 motion-safe:group-hover:-translate-x-1" aria-hidden="true" />
                Back to About Techno Gurukul
              </Link>
            </div>

            <UsefulLearning />
          </div>
        </div>
      </div>
    </section>
  );
}
