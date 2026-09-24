import { ChevronRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const READINESS = ["Learn", "Practise", "Build", "Portfolio", "Career Preparation"];

/** The flow from learning to career readiness. */
export function AboutDirections() {
  return (
    <>
      <section aria-labelledby="ab-readiness-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <SectionHeader
              id="ab-readiness-heading"
              eyebrow="Learning to Career Readiness"
              title={
                <>
                  Learning Should Prepare You to <span className={GRADIENT_TEXT}>Show What You Can Do.</span>
                </>
              }
            >
              Practical learning becomes more useful when learners can turn their work into evidence, organise that evidence
              and prepare to communicate it clearly.
            </SectionHeader>

            <ol aria-label="Learn, practise, build, portfolio, career preparation" className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
              {READINESS.map((step, i) => (
                <li key={step} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                  <span
                    className={
                      "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-3 py-3 text-center text-base font-semibold tracking-tight " +
                      (i === READINESS.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/20 bg-card text-foreground")
                    }
                  >
                    {step}
                  </span>
                  {i < READINESS.length - 1 && <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-primary/60 lg:block" />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
