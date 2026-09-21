import { Check } from "lucide-react";
import { GRADIENT_TEXT } from "../../learning/curriculum/section-header";

const BEFORE = [
  { title: "Skills", text: "Know the tools and concepts relevant to the roles you are considering." },
  { title: "Projects", text: "Have practical work that demonstrates what you can do." },
  { title: "Portfolio", text: "Organise selected work so it can be understood quickly." },
  { title: "Resume", text: "Present your relevant skills, education, projects and experience clearly." },
  { title: "Communication", text: "Be prepared to explain your work and ask useful questions." },
  { title: "Direction", text: "Understand what type of experience you are looking for." },
];

const LOOK_FOR = [
  { title: "Meaningful Work", q: "Will you actually contribute to tasks or projects?" },
  { title: "Learning Opportunity", q: "Will you encounter tools, processes or problems you can learn from?" },
  { title: "Guidance", q: "Is there someone who can explain expectations and provide feedback?" },
  { title: "Responsibility", q: "Will you progressively take ownership of appropriate work?" },
  { title: "Relevance", q: "Does the experience connect with the direction you want to explore?" },
  { title: "Environment", q: "Can you learn how teams communicate, organise work and solve problems?" },
];

/** Sections 4 and 5: what to build before applying (split checklist) and what to look for (questions). */
export function InternshipsPrepare() {
  return (
    <>
      <section aria-labelledby="internships-before-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Before You Apply
              </div>
              <h2 id="internships-before-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                Your Internship Preparation Starts <span className={GRADIENT_TEXT}>With Your Own Work.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                The same evidence you build for placement preparation also supports internship applications.
              </p>
            </div>

            <ul className="grid gap-x-8 sm:grid-cols-2">
              {BEFORE.map((b) => (
                <li key={b.title} className="flex gap-3.5 border-t border-primary/15 py-5">
                  <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-green text-white">
                    <Check className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{b.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-muted-foreground">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="internships-lookfor-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Evaluating Opportunities
            </div>
            <h2 id="internships-lookfor-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl">
              Look for Experience That <span className={GRADIENT_TEXT}>Gives You Something to Learn.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              General guidance for judging any opportunity you come across. These are questions to ask, not conditions
              that any particular organisation is claimed to meet.
            </p>

            <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
              {LOOK_FOR.map((l) => (
                <div key={l.title} className="border-l-2 border-brand-green pl-5">
                  <dt className="text-xl font-semibold tracking-tight text-foreground">{l.title}</dt>
                  <dd className="mt-1.5 text-base leading-relaxed text-muted-foreground">{l.q}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
