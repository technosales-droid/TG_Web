import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const QUESTION_TYPES = [
  { title: "About You", text: "Questions that help someone understand your background and direction." },
  { title: "About Your Skills", text: "Questions that explore what you know and how you use it." },
  { title: "About Your Projects", text: "Questions about your work, decisions, contribution and results." },
  { title: "About Problems", text: "Questions about challenges, mistakes and how you respond." },
  { title: "About Your Thinking", text: "Questions that explore how you approach unfamiliar situations." },
  { title: "About Your Learning", text: "Questions about feedback, improvement and what you learned." },
];

const ANSWER = [
  { name: "Situation", text: "Give enough context." },
  { name: "Approach", text: "Explain how you thought about the problem." },
  { name: "Action", text: "Describe what you actually did." },
  { name: "Result", text: "Explain what happened or what you produced." },
  { name: "Learning", text: "Share what you learned or would improve." },
];

const WORK = [
  {
    id: "ip-work-tech",
    title: "Technical Work",
    points: ["Architecture or implementation choices", "Tools", "Logic", "Debugging", "Trade-offs", "Technical challenges"],
  },
  {
    id: "ip-work-creative",
    title: "Creative Work",
    points: ["Concept", "Creative decisions", "Process", "Tools", "Iterations", "Final execution"],
  },
  {
    id: "ip-work-digital",
    title: "Digital / Marketing Work",
    points: ["Objective", "Audience", "Strategy", "Execution", "Tools", "Analysis or learning"],
  },
];

/** Sections 5, 6 and 7: question types, answer structure (dark panel), and different kinds of work. */
export function InterviewQuestions() {
  return (
    <>
      <section aria-labelledby="ip-types-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ip-types-heading"
            eyebrow="Question Types"
            title={
              <>
                Prepare for the Questions <span className={GRADIENT_TEXT}>Behind the Question.</span>
              </>
            }
          >
            Rather than a list of scripted questions, these are the kinds of things people tend to explore. They are not a
            universal set for every employer.
          </SectionHeader>

          <ul className="mt-10 grid gap-x-10 gap-y-2 md:grid-cols-2 xl:grid-cols-3">
            {QUESTION_TYPES.map((q) => (
              <li key={q.title} className="border-t border-primary/15 py-6">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{q.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{q.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ip-answer-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Answering With Structure
            </div>
            <h2 id="ip-answer-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
              Structure Your Answers{" "}
              <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Without Sounding Scripted.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
              This structure is a guide, not a script. It helps you keep an answer clear while you speak in your own words.
            </p>

            <ol className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-background/25 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
              {ANSWER.map((s, i) => (
                <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                      (i === ANSWER.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-background/60 bg-[#0d5674] text-background")
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

            <p className="mt-10 rounded-2xl border border-background/20 bg-background/10 px-5 py-4 text-lg font-medium tracking-tight text-background">
              Use real examples. Be specific about your contribution.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="ip-work-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ip-work-heading"
            eyebrow="Kinds of Work"
            title={
              <>
                Different Work Requires <span className={GRADIENT_TEXT}>Different Conversations.</span>
              </>
            }
          >
            Broad examples of what learners can be ready to explain. They are not exhaustive interview requirements.
          </SectionHeader>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {WORK.map((w) => (
              <article key={w.id} aria-labelledby={w.id} className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
                <h3 id={w.id} className="text-2xl font-semibold tracking-tight text-foreground">
                  {w.title}
                </h3>
                <p className="mt-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">Be prepared to explain</p>
                <ul className="mt-3 grid gap-2">
                  {w.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-base text-foreground">
                      <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-brand-green" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
