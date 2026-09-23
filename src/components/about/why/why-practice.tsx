import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const STAGES = [
  { name: "Learn", text: "Understand the concept." },
  { name: "Repeat", text: "Use it more than once." },
  { name: "Apply", text: "Use it in different situations." },
  { name: "Refine", text: "Improve through feedback." },
];

const LOOP = ["Build", "Review", "Feedback", "Improve", "Build Again"];

/** Sections 5 and 6: why practice matters, and why feedback matters (a loop diagram). */
export function WhyPractice() {
  return (
    <>
      <section aria-labelledby="wt-practice-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="wt-practice-heading"
            eyebrow="Why Practice Matters"
            title={
              <>
                Skills Grow <span className={GRADIENT_TEXT}>Through Use.</span>
              </>
            }
          />

          <ol aria-label="Learn, repeat, apply, refine" className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {STAGES.map((s, i) => (
              <li
                key={s.name}
                className="relative xl:after:absolute xl:after:top-6 xl:after:-right-6 xl:after:left-16 xl:after:h-px xl:after:border-t xl:after:border-dashed xl:after:border-primary/30 xl:last:after:hidden"
              >
                <span aria-hidden="true" className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-lg font-bold text-primary">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{s.name}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-l-2 border-brand-green pl-5 text-lg font-medium tracking-tight text-foreground sm:text-xl">
            Practice turns understanding into familiarity.
          </p>
        </div>
      </section>

      <section aria-labelledby="wt-feedback-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Why Feedback Matters
            </div>
            <h2 id="wt-feedback-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
              Improvement Needs <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Feedback.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
              Learners can improve by reviewing their work, identifying gaps, receiving guidance, comparing alternative
              approaches, revising and trying again.
            </p>

            <ol aria-label="Build, review, feedback, improve, build again" className="mt-10 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
              {LOOP.map((step, i) => (
                <li key={step + i} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                  <span
                    className={cn(
                      "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-3 py-3 text-center text-base font-semibold tracking-tight",
                      i === LOOP.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-background/25 bg-background/10 text-background"
                    )}
                  >
                    {step}
                  </span>
                  {i < LOOP.length - 1 && <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-background/60 lg:block" />}
                </li>
              ))}
            </ol>

            <Link
              href="/learning/how-we-teach"
              className="group mt-8 inline-flex min-h-11 items-center gap-1.5 rounded-full text-base font-semibold text-background focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-background"
            >
              See How We Teach
              <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
