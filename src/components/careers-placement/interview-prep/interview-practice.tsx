import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const ASK = [
  { title: "Role", text: "What would the work involve?" },
  { title: "Expectations", text: "What would someone in the role be expected to learn or contribute?" },
  { title: "Team", text: "How is the work organised?" },
  { title: "Projects", text: "What kinds of problems or projects does the role involve?" },
  { title: "Learning", text: "What opportunities exist to develop skills?" },
  { title: "Process", text: "What would the next stage of the process involve?" },
];

const PRACTICE = [
  { title: "Explain It Aloud", text: "Practise describing your project without reading from notes." },
  { title: "Record Yourself", text: "Listen for unclear explanations, unnecessary detail and gaps." },
  { title: "Practise Follow-Ups", text: "Be ready for questions that go deeper than your first answer." },
  { title: "Refine", text: "Use feedback to improve the next version of your explanation." },
];

const CHECKLIST = [
  "I can explain my strongest projects.",
  "I can describe my own contribution clearly.",
  "I understand the tools I list.",
  "I can explain important decisions I made.",
  "I can discuss a challenge and what I learned from it.",
  "I can describe my current skills honestly.",
  "I can explain what I want to learn next.",
  "I can navigate my portfolio quickly.",
  "I can speak about my resume without contradicting it.",
  "I have a few thoughtful questions prepared.",
];

/** Sections 8, 9 and 10: questions to ask, practice, and the readiness checklist. */
export function InterviewPractice() {
  return (
    <>
      <section aria-labelledby="ip-ask-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Questions You Can Ask
              </div>
              <h2 id="ip-ask-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                An Interview Is Also Your Chance to <span className={GRADIENT_TEXT}>Understand the Opportunity.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Candidates can prepare questions about these areas. They are prompts to think about, not questions that are
                required or right for every situation.
              </p>
            </div>

            <dl className="grid gap-x-8 sm:grid-cols-2">
              {ASK.map((a) => (
                <div key={a.title} className="border-l-2 border-brand-green py-3 pl-5">
                  <dt className="text-lg font-semibold tracking-tight text-foreground">{a.title}</dt>
                  <dd className="mt-1 text-base leading-relaxed text-muted-foreground">{a.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="ip-practice-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <SectionHeader
              id="ip-practice-heading"
              eyebrow="Practice"
              title={
                <>
                  Practise the Conversation, <span className={GRADIENT_TEXT}>Not Just the Answer.</span>
                </>
              }
            >
              Good preparation is not about memorising a perfect script. It is about becoming comfortable discussing your
              work, thinking through unfamiliar questions and communicating clearly under pressure.
            </SectionHeader>

            <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
              {PRACTICE.map((p, i) => (
                <li key={p.title} className="flex gap-4 xl:block">
                  <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="xl:mt-4">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="ip-checklist-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ip-checklist-heading"
            eyebrow="Readiness Checklist"
            title={
              <>
                Before the Interview, <span className={GRADIENT_TEXT}>Check the Basics.</span>
              </>
            }
          />
          <ul className="mt-10 grid gap-x-10 rounded-[2rem] border border-primary/15 bg-card px-5 py-3 sm:px-8 md:grid-cols-2">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex items-start gap-3.5 border-t border-primary/10 py-4 text-base text-foreground first:border-t-0 md:[&:nth-child(2)]:border-t-0">
                <span aria-hidden="true" className="mt-0.5 block size-5 shrink-0 rounded-md border-2 border-brand-green/60" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
