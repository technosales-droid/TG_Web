import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const STAGES = [
  { name: "Understand", text: "Learn the concepts and fundamentals." },
  { name: "Practise", text: "Work through guided application." },
  { name: "Apply", text: "Use the concepts in practical situations." },
  { name: "Build", text: "Create projects and make decisions." },
  { name: "Refine", text: "Review feedback, improve the work and continue learning." },
];

const CYCLE = [
  { name: "Concept", text: "Understand the underlying idea." },
  { name: "Demonstration", text: "See how the concept can be applied." },
  { name: "Practice", text: "Try it with guidance." },
  { name: "Application", text: "Use it in a more open-ended situation." },
  { name: "Feedback", text: "Identify what works and what needs improvement." },
  { name: "Improvement", text: "Refine and repeat." },
];

/** Sections 2 and 3: the learning model at a glance (main visual anchor), and how a typical learning cycle is structured. */
export function ApproachModel() {
  return (
    <>
      <section aria-labelledby="ap-model-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ap-model-heading"
            eyebrow="The Learning Model"
            title={
              <>
                Guided at First. <span className={GRADIENT_TEXT}>More Independent Over Time.</span>
              </>
            }
          >
            Learners benefit from structure and guidance while they build familiarity. As their understanding grows, the
            learning experience can place more responsibility on them to practise, make decisions, build projects and
            improve their work.
          </SectionHeader>

          <ol aria-label="Understand, practise, apply, build, refine" className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-primary/20 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
            {STAGES.map((s, i) => (
              <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                <span
                  aria-hidden="true"
                  className={
                    "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                    (i === STAGES.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
                  }
                 />
                <div className="xl:mt-4 xl:text-center">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{s.name}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground xl:mx-auto xl:max-w-[14rem]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ap-cycle-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              How Learning Is Structured
            </div>
            <h2 id="ap-cycle-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
              Structure Gives Practice <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Somewhere to Go.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
              A typical learning cycle can include the stages below, though not every lesson follows this exact sequence
              rigidly.
            </p>

            <ol aria-label="Concept, demonstration, practice, application, feedback, improvement" className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-6 xl:gap-5">
              {CYCLE.map((s, i) => (
                <li key={s.name} className="rounded-2xl border border-background/20 bg-background/10 p-5">
                  <span
                    aria-hidden="true"
                    className={
                      "flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold " +
                      (i === CYCLE.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-background/60 text-background")
                    }
                   />
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-background">{s.name}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-background/75">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
