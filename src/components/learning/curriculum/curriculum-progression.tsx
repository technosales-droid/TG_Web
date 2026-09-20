import { cn } from "cn";
import { PROGRESSION_STEPS } from "./curriculum-data";
import { GRADIENT_TEXT, SectionHeader } from "./section-header";

// A staircase: from large screens each step is taller than the one before it. Below that it is a
// simple list with a rail. Heights are decorative padding, not data.

export function CurriculumProgression() {
  return (
    <section id="curriculum-progression" aria-labelledby="curriculum-progression-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="curriculum-progression-heading"
          eyebrow="Learning Progression"
          title={
            <>
              Build One Skill <span className={cn("inline-block", GRADIENT_TEXT)}>on Top of Another.</span>
            </>
          }
        >
          Each step gives the next one something to stand on.
        </SectionHeader>

        <ol className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6 lg:items-end lg:gap-4 xl:gap-6">
          {PROGRESSION_STEPS.map((step, i) => {
            const last = i === PROGRESSION_STEPS.length - 1;
            return (
              <li key={step.title} className="group min-w-0">
                <div
                  className={cn(
                    "rounded-3xl border p-5 transition-all duration-300 group-hover:shadow-[0_18px_36px_-22px_rgba(16,20,28,0.35)] motion-safe:group-hover:-translate-y-1",
                    last
                      ? "border-transparent bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary text-background"
                      : "border-primary/10 bg-card"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full text-xs font-semibold",
                      last ? "bg-brand-green text-white" : "bg-primary text-primary-foreground"
                    )}
                  >
                    {i + 1}
                  </span>
                  {/* Rising spacer for the staircase (desktop only) */}
                  <div aria-hidden="true" className="hidden lg:block" style={{ height: `${i * 28}px` }} />
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className={cn("mt-2 text-base leading-relaxed", last ? "text-background/85" : "text-muted-foreground")}>
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
