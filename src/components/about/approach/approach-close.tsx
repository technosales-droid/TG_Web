import { Check } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const RESPONSIBILITIES = [
  { title: "Show Up", text: "Be present and engaged." },
  { title: "Practise", text: "Use the skills repeatedly." },
  { title: "Ask", text: "Raise questions when something is unclear." },
  { title: "Build", text: "Apply knowledge rather than only consume it." },
  { title: "Reflect", text: "Notice what worked and what did not." },
  { title: "Improve", text: "Respond to feedback and keep refining." },
];

/** What the approach asks of learners, and honest positioning. */
export function ApproachClose() {
  return (
    <>
      <section aria-labelledby="ap-asks-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ap-asks-heading"
            eyebrow="What This Asks of Learners"
            title={
              <>
                The Approach Works Best <span className={GRADIENT_TEXT}>When Learners Participate.</span>
              </>
            }
          >
            The model is designed to encourage these habits. It does not guarantee any particular result.
          </SectionHeader>

          <ul className="mt-10 grid gap-x-8 rounded-[2rem] border border-primary/15 bg-card px-5 py-3 sm:grid-cols-2 xl:grid-cols-3 sm:px-8">
            {RESPONSIBILITIES.map((r, i) => (
              <li
                key={r.title}
                className={
                  "flex items-start gap-3.5 border-t border-primary/10 py-4 first:border-t-0" +
                  (i === 1 ? " sm:border-t-0" : "") +
                  (i === 2 ? " xl:border-t-0" : "")
                }
              >
                <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-brand-green/15 text-brand-green">
                  <Check className="size-3.5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{r.title}</h3>
                  <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ap-honest-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-primary/15 bg-card px-6 py-8 sm:px-10 sm:py-10">
            <div aria-hidden="true" className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-brand-green" />
            <h2 id="ap-honest-heading" className="mt-5 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
              An Approach Creates Structure. <span className={GRADIENT_TEXT}>The Learner Creates the Outcome.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              A structured learning model can provide guidance, practice and opportunities to apply skills. What a learner
              ultimately achieves depends on their participation, effort, performance, choices and circumstances.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
