import { ArrowDown, ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "cn";
import { FEEDBACK_AREAS, FEEDBACK_LOOP } from "./how-we-teach-data";

// A loop, not a line: five steps with a return path from the last back to the first. Feedback areas are
// things reviewed, not marks: no grades, scores or percentages.
export function FeedbackLoop() {
  return (
    <section id="feedback" aria-labelledby="feedback-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-5 py-10 text-background sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-16">
          <span aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-32 size-[26rem] rounded-full border border-background/10" />

          <div className="relative">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm font-medium text-background/80">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Feedback That Moves the Work Forward
              </div>
              <h2 id="feedback-heading" className="mt-4 text-3xl font-semibold tracking-tight text-background sm:text-4xl lg:text-5xl">
                <span className="block">Build.</span>
                <span className="block">Review.</span>
                <span className="block">Improve.</span>
                <span className="block bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Repeat.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-background/80 sm:text-lg">
                Practical work becomes stronger when students can understand what is working, what needs improvement
                and what they can try next.
              </p>
            </div>

            {/* The loop */}
            <div className="mt-10 lg:mt-14">
              <ol aria-label="The feedback loop" className="grid gap-3 lg:grid-cols-5 lg:items-center lg:gap-0">
                {FEEDBACK_LOOP.map((step, i) => {
                  const last = i === FEEDBACK_LOOP.length - 1;
                  return (
                    <li key={step} className="group flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-0">
                      <span
                        className={cn(
                          "rounded-2xl border px-4 py-3.5 text-center text-lg font-semibold transition-transform duration-300 motion-safe:group-hover:-translate-y-1 lg:flex-1",
                          last ? "border-brand-green bg-brand-green/25" : "border-background/25 bg-background/10"
                        )}
                      >
                        <span aria-hidden="true" className="mr-2 text-xs tracking-widest text-background/60">
                          0{i + 1}
                        </span>
                        {step}
                      </span>
                      {!last && (
                        <span aria-hidden="true" className="flex justify-center text-background/50 lg:px-2">
                          <ArrowDown className="size-5 lg:hidden" />
                          <ArrowRight className="hidden size-5 lg:block" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>

              {/* Return path: back to the start (decorative) */}
              <div aria-hidden="true" className="mt-3 hidden items-center justify-center lg:flex">
                <div className="relative mx-[10%] h-10 flex-1 rounded-b-3xl border-x-2 border-b-2 border-dashed border-background/35">
                  <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#0d5674] px-3 py-1 text-xs font-semibold tracking-widest text-background/80 uppercase">
                    <RefreshCw className="size-3.5" />
                    Repeat
                  </span>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold tracking-widest text-background/70 uppercase lg:hidden">
                <RefreshCw className="size-4" aria-hidden="true" />
                Then repeat
              </p>
            </div>

            {/* Areas feedback can cover */}
            <div className="mt-10 border-t border-background/15 pt-8 lg:mt-14">
              <p className="text-xs font-semibold tracking-widest text-background/70 uppercase">Feedback can cover</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {FEEDBACK_AREAS.map((a) => (
                  <li key={a} className="rounded-full border border-background/25 bg-background/10 px-4 py-2 text-sm font-medium sm:text-base">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
