import { GRADIENT_TEXT } from "../../learning/curriculum/section-header";

const STAGES = [
  { name: "Learn", text: "Understand the foundation." },
  { name: "Practise", text: "Strengthen the skill." },
  { name: "Build", text: "Apply it through projects." },
  { name: "Show", text: "Make the work visible." },
  { name: "Prepare", text: "Develop the ability to communicate and use what you learned." },
];

const CONTINUOUS = [
  { title: "Curiosity", text: "Keep asking questions." },
  { title: "Exploration", text: "Try new ideas and tools." },
  { title: "Evaluation", text: "Understand whether something is actually useful." },
  { title: "Adaptation", text: "Update your skills as your direction develops." },
];

/** Sections 10 and 11: the connected learning system (page's central framework), and continuous learning. */
export function WhySystem() {
  return (
    <>
      <section aria-labelledby="wt-system-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Why the Learning System Is Connected
            </div>
            <h2 id="wt-system-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
              The Pieces Work <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Better Together.</span>
            </h2>

            <ol aria-label="Learn, practise, build, show, prepare" className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-background/25 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
              {STAGES.map((s, i) => (
                <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                      (i === STAGES.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-background/60 bg-[#0d5674] text-background")
                    }
                  >
                    {i + 1}
                  </span>
                  <div className="xl:mt-4 xl:text-center">
                    <h3 className="text-xl font-semibold tracking-tight text-background">{s.name}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-background/75 xl:mx-auto xl:max-w-[14rem]">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="wt-continuous-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Why Continuous Learning Matters
            </div>
            <h2 id="wt-continuous-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
              The Goal Is Not to Stop Learning <span className={GRADIENT_TEXT}>at the End of a Course.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tools, workflows and expectations change. A useful learning experience should leave learners with the habit
              of exploring, practising, reflecting and adapting.
            </p>
          </div>

          <ol aria-label="Curiosity, exploration, evaluation, adaptation" className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {CONTINUOUS.map((c, i) => (
              <li
                key={c.title}
                className="relative xl:after:absolute xl:after:top-6 xl:after:-right-6 xl:after:left-16 xl:after:h-px xl:after:border-t xl:after:border-dashed xl:after:border-primary/30 xl:last:after:hidden"
              >
                <span aria-hidden="true" className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-lg font-bold text-primary">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{c.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
