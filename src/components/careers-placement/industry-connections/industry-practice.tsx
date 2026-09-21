import { Check } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const QUESTIONS = [
  { label: "About the Work", text: "What kinds of problems do people in this field solve?" },
  { label: "About Skills", text: "Which skills are used most often?" },
  { label: "About Tools", text: "Which tools and workflows are common?" },
  { label: "About Collaboration", text: "How do different roles work together?" },
  { label: "About Growth", text: "How do people continue learning as the field changes?" },
  { label: "About Quality", text: "What makes work useful, reliable or effective?" },
];

const CONTROL = [
  { title: "Skills", text: "Keep building relevant capability." },
  { title: "Projects", text: "Create work that demonstrates application." },
  { title: "Curiosity", text: "Keep learning beyond the required material." },
  { title: "Communication", text: "Practise explaining ideas clearly." },
  { title: "Research", text: "Understand the direction of the field you want to enter." },
  { title: "Adaptability", text: "Stay open to changing tools and workflows." },
  { title: "Professional Habits", text: "Develop consistency and responsibility." },
  { title: "Reflection", text: "Use feedback and experience to improve." },
];

const DIRECTIONS = [
  {
    id: "ic-dir-digital",
    title: "Digital & Marketing",
    chips: ["Campaigns", "Audiences", "Content", "Analytics", "Strategy", "Communication"],
  },
  {
    id: "ic-dir-game",
    title: "Game Development & Design",
    chips: ["Production pipelines", "Game systems", "Design", "Art", "Iteration", "Technical workflows"],
  },
  {
    id: "ic-dir-cross",
    title: "Cross-Functional Work",
    chips: ["Collaboration", "Briefs", "Communication", "Documentation", "Feedback", "Project coordination"],
  },
];

/** Sections 7, 8 and 9: questions to ask, what learners can control, and context across kinds of work. */
export function IndustryPractice() {
  return (
    <>
      <section aria-labelledby="ic-questions-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ic-questions-heading"
            eyebrow="Questions Learners Can Ask"
            title={
              <>
                Curiosity Is Part of <span className={GRADIENT_TEXT}>Career Preparation.</span>
              </>
            }
          >
            Prompts for exploring an industry or professional environment. They are starting points, not universal rules
            about how every field works.
          </SectionHeader>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
            {QUESTIONS.map((q) => (
              <li key={q.label} className="rounded-2xl border-l-4 border-brand-green bg-muted/50 px-6 py-5">
                <p className="text-sm font-semibold tracking-widest text-primary uppercase">{q.label}</p>
                <p className="mt-2 text-xl leading-snug font-medium tracking-tight text-foreground">{q.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ic-control-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 xl:grid-cols-2 xl:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Your Preparation
              </div>
              <h2 id="ic-control-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                You Cannot Control the Industry.{" "}
                <span className={GRADIENT_TEXT}>You Can Control How You Prepare.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                These are habits that support learning and direction. They are not guarantees of any outcome.
              </p>
            </div>

            <ul className="grid gap-x-8 rounded-[2rem] border border-primary/15 bg-card px-5 py-3 sm:grid-cols-2 sm:px-8">
              {CONTROL.map((c, i) => (
                <li key={c.title} className={"flex items-start gap-3.5 border-t border-primary/10 py-4 first:border-t-0" + (i === 1 ? " sm:border-t-0" : "")}>
                  <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-brand-green/15 text-brand-green">
                    <Check className="size-3.5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{c.title}</h3>
                    <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="ic-directions-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ic-directions-heading"
            eyebrow="Different Directions"
            title={
              <>
                Industry Context Looks Different Across <span className={GRADIENT_TEXT}>Different Kinds of Work.</span>
              </>
            }
          >
            Illustrative examples only. They do not represent every role in these fields, and they do not describe any
            particular employer.
          </SectionHeader>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {DIRECTIONS.map((d) => (
              <article key={d.id} aria-labelledby={d.id} className="overflow-hidden rounded-[2rem] border border-primary/15 bg-card">
                <div aria-hidden="true" className="h-2 bg-gradient-to-r from-primary to-brand-green" />
                <div className="p-6 sm:p-8">
                  <h3 id={d.id} className="text-2xl font-semibold tracking-tight text-foreground">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">Possible context</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {d.chips.map((c) => (
                      <li key={c} className="rounded-full border border-primary/20 bg-muted/60 px-3.5 py-1.5 text-sm font-medium text-foreground">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
