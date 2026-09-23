import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

const LOOP = ["Create", "Review", "Feedback", "Revise", "Create Again"];

const HELPS = [
  "Identify gaps",
  "Notice unclear decisions",
  "Improve quality",
  "Understand alternative approaches",
  "Refine execution",
  "Develop self-review habits",
];

/** Section 7: feedback and refinement, as a loop connected to /learning/how-we-teach. */
export function ApproachFeedback() {
  return (
    <section aria-labelledby="ap-feedback-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Feedback and Refinement
              </div>
              <h2 id="ap-feedback-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Good Work <span className={GRADIENT_TEXT}>Gets Reviewed.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">Feedback can help learners:</p>
            </div>

            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {HELPS.map((h) => (
                <li key={h} className="flex gap-2.5 border-t border-primary/10 pt-3 text-base text-foreground first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                  <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-brand-green" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <ol aria-label="Create, review, feedback, revise, create again" className="mt-10 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
            {LOOP.map((step, i) => (
              <li key={step} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                <span
                  className={cn(
                    "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-3 py-3 text-center text-base font-semibold tracking-tight",
                    i === LOOP.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/20 bg-card text-foreground"
                  )}
                >
                  {step}
                </span>
                {i < LOOP.length - 1 && <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-primary/60 lg:block" />}
              </li>
            ))}
          </ol>

          <Link href="/learning/how-we-teach" className="group mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary">
            Explore How We Teach
            <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
