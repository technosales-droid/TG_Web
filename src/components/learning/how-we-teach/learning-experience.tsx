import { ArrowDown, Check } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";
import { PASSIVE_STEPS, PRACTICAL_STEPS } from "./how-we-teach-data";

// Two paths side by side: a short one and a longer one that ends in a finished piece of work. The point is
// not that explanation is bad; it is that understanding and application belong together.
export function LearningExperience() {
  return (
    <section id="learning-experience" aria-labelledby="learning-experience-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="learning-experience-heading"
          eyebrow="The Learning Experience"
          title={
            <>
              <span className="block">More Than Watching.</span>
              <span className={cn("block", GRADIENT_TEXT)}>More Than Listening.</span>
            </>
          }
        >
          Explanation and reading still matter. Techno Gurukul combines understanding with application.
        </SectionHeader>

        <div className="mt-10 grid items-start gap-5 lg:mt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-6">
          {/* Passive */}
          <div className="rounded-[2rem] border border-primary/10 bg-muted/60 p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight text-muted-foreground sm:text-2xl">Passive learning</h3>
            <ol aria-label="Passive learning steps" className="mt-5 grid gap-2.5">
              {PASSIVE_STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-base text-muted-foreground">
                  <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/20 text-xs font-semibold">
                    {i + 1}
                  </span>
                  {s}
                  {i < PASSIVE_STEPS.length - 1 && <ArrowDown className="ml-auto size-4 text-primary/30" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>

          {/* Practical */}
          <div className="rounded-[2rem] border border-primary/20 bg-card p-6 shadow-[0_24px_48px_-32px_rgba(13,99,134,0.5)] sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">Practical learning</h3>
            <ol aria-label="Practical learning steps" className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {PRACTICAL_STEPS.map((s, i) => {
                const last = i === PRACTICAL_STEPS.length - 1;
                return (
                  <li
                    key={s}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl border px-4 py-3 text-base font-semibold transition-all duration-300 motion-safe:hover:-translate-y-0.5",
                      last ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/10 bg-primary/5 text-foreground"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn("flex size-7 shrink-0 items-center justify-center rounded-full text-xs", last ? "bg-white/25" : "bg-primary text-primary-foreground")}
                    >
                      {last ? <Check className="size-4" /> : i + 1}
                    </span>
                    {s}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
