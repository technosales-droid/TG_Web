import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const STAGES = [
  { name: "Understand", text: "Know the concept." },
  { name: "Practise", text: "Work with the concept." },
  { name: "Apply", text: "Use it in a practical situation." },
  { name: "Create", text: "Build something." },
  { name: "Reflect", text: "Improve through experience." },
];

const PRACTICAL = [
  { title: "Context", text: "Understand where a concept can be used." },
  { title: "Application", text: "Use the concept rather than only recalling it." },
  { title: "Evidence", text: "Create something that demonstrates application." },
  { title: "Improvement", text: "Use feedback and iteration to get better." },
];

/** Sections 2 and 3: the reasoning behind the model, and why practical learning specifically. */
export function WhyReasoning() {
  return (
    <>
      <section aria-labelledby="wt-reasoning-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="wt-reasoning-heading"
            eyebrow="The Reasoning"
            title={
              <>
                Knowing Something and Using It <span className={GRADIENT_TEXT}>Are Not the Same Thing.</span>
              </>
            }
          >
            Conceptual understanding creates a foundation. Practice creates familiarity. Projects create opportunities to
            apply what has been learned. Reflection helps learners understand what worked, what did not and what to
            improve.
          </SectionHeader>

          <ol aria-label="Understand, practise, apply, create, reflect" className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
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
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Theory is not the problem. Theory and practice work together &mdash; understanding becomes more useful once it
            has somewhere to go.
          </p>
        </div>
      </section>

      <section aria-labelledby="wt-practical-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Why Practical Learning
            </div>
            <h2 id="wt-practical-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
              Put the Learning <span className={GRADIENT_TEXT}>to Work.</span>
            </h2>

            <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
              {PRACTICAL.map((p) => (
                <li key={p.title} className="border-t-2 border-primary/25 pt-5 xl:border-t-0 xl:border-l-2 xl:pt-0 xl:pl-6">
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
