import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

// The stages a project moves through. The visual marks how far along the imaginary project is.
const STAGES = ["Idea", "Plan", "Create", "Test", "Refine", "Present"];
const CURRENT = 2; // "Create"

// Abstract project workspace: a project being developed, not a screenshot of any real software or work.
// Every shape is decorative; the stage list is real text so the workflow is available to screen readers.
function ProjectWorkspaceVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[2rem] border border-primary/10 bg-card p-4 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] sm:p-6">
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary/25" />
          <span className="size-2.5 rounded-full bg-brand-green/40" />
          <span className="ml-2 h-2.5 w-28 rounded-full bg-primary/15" />
        </div>

        {/* Stage track */}
        <ol aria-label="Project stages" className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {STAGES.map((stage, i) => {
            const done = i < CURRENT;
            const active = i === CURRENT;
            return (
              <li
                key={stage}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex items-center justify-center gap-1 rounded-full border px-2 py-1.5 text-xs font-semibold transition-colors duration-300 sm:text-[13px]",
                  active
                    ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white"
                    : done
                      ? "border-brand-green/30 bg-brand-green/10 text-foreground"
                      : "border-primary/15 text-muted-foreground"
                )}
              >
                {done && <Check className="size-3 text-brand-green" aria-hidden="true" />}
                {stage}
              </li>
            );
          })}
        </ol>

        {/* The work itself: media, a document and a checklist (abstract) */}
        <div aria-hidden="true" className="mt-5 grid gap-3 sm:grid-cols-5">
          <div className="relative min-h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 via-primary/15 to-brand-green/35 sm:col-span-2 sm:min-h-full">
            <span className="absolute top-3 left-3 size-8 rounded-full bg-background/40" />
            <span className="absolute right-3 bottom-3 left-3 h-10 rounded-xl bg-background/30" />
          </div>

          <div className="grid gap-3 sm:col-span-3">
            <div className="rounded-2xl border border-primary/10 bg-muted/60 p-4">
              <span className="block h-2.5 w-1/3 rounded-full bg-primary/30" />
              <span className="mt-3 block h-2 w-full rounded-full bg-primary/15" />
              <span className="mt-2 block h-2 w-5/6 rounded-full bg-primary/15" />
              <span className="mt-2 block h-2 w-2/3 rounded-full bg-primary/10" />
            </div>

            <div className="grid gap-2 rounded-2xl border border-primary/10 p-4">
              {[true, true, false].map((checked, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-md border",
                      checked ? "border-brand-green bg-brand-green text-white" : "border-primary/25"
                    )}
                  >
                    {checked && <Check className="size-3.5" />}
                  </span>
                  <span className={cn("h-2 rounded-full", checked ? "w-3/5 bg-primary/20" : "w-2/5 bg-primary/10")} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Where the finished work is heading (abstract portfolio strip) */}
        <div aria-hidden="true" className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-brand-green/40 bg-brand-green/5 p-3">
          <span className="flex -space-x-2">
            <span className="size-8 rounded-lg bg-primary/25 ring-2 ring-card" />
            <span className="size-8 rounded-lg bg-brand-green/35 ring-2 ring-card" />
            <span className="size-8 rounded-lg bg-primary/15 ring-2 ring-card" />
          </span>
          <span className="h-2 flex-1 rounded-full bg-brand-green/25" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsHero() {
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
                Projects
              </div>
              <h1 className="mt-4 max-w-3xl text-[2rem] leading-[1.12] font-semibold tracking-tight text-balance text-foreground min-[400px]:text-4xl sm:text-5xl xl:text-[2.5rem] min-[1400px]:text-[2.75rem]">
                <span className="block">Don&rsquo;t Just Finish Lessons.</span>
                <span className={cn("block", GRADIENT_TEXT)}>Build Something You Can Show.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Projects bring learning together. Students combine concepts, tools and practical skills to create work
                they can test, refine, document and present.
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
                  href="/learning"
                  className="group flex min-h-11 items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  How We Learn
                  <ChevronRight
                    className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <ProjectWorkspaceVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
