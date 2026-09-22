import { Check } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const ASKS = [
  { title: "Participate", text: "Learning requires active involvement." },
  { title: "Practise", text: "Skills need repeated use." },
  { title: "Build", text: "Create rather than only consume." },
  { title: "Reflect", text: "Understand what you learned." },
  { title: "Communicate", text: "Be able to explain your work." },
  { title: "Keep Improving", text: "Treat feedback as part of the process." },
];

/** Sections 12 and 13: what the approach asks from the learner, and honest positioning. */
export function WhyLearner() {
  return (
    <>
      <section aria-labelledby="wt-asks-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="wt-asks-heading"
            eyebrow="What This Means for the Learner"
            title={
              <>
                What This Approach <span className={GRADIENT_TEXT}>Asks From You.</span>
              </>
            }
          >
            The learning model is designed to encourage these habits. It does not guarantee any particular result.
          </SectionHeader>

          <ul className="mt-10 grid gap-x-8 rounded-[2rem] border border-primary/15 bg-card px-5 py-3 sm:grid-cols-2 sm:px-8">
            {ASKS.map((a, i) => (
              <li key={a.title} className={"flex items-start gap-3.5 border-t border-primary/10 py-4 first:border-t-0" + (i === 1 ? " sm:border-t-0" : "")}>
                <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-brand-green/15 text-brand-green">
                  <Check className="size-3.5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{a.title}</h3>
                  <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="wt-honest-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-primary/15 bg-card px-6 py-8 sm:px-10 sm:py-10">
            <div aria-hidden="true" className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-brand-green" />
            <h2 id="wt-honest-heading" className="mt-5 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
              An Approach Is a Framework, <span className={GRADIENT_TEXT}>Not a Guarantee.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              A practical learning model can provide structure, opportunities to practise and ways to apply skills. What a
              learner ultimately achieves still depends on their effort, choices, performance, opportunities and
              circumstances.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
