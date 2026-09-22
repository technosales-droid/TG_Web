import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const PROGRESSION = [
  { title: "Early Stage", text: "More structure and guidance." },
  { title: "Developing Stage", text: "More practice and supported decisions." },
  { title: "Applied Stage", text: "More project ownership." },
  { title: "Growing Independence", text: "More responsibility for planning, execution and refinement." },
];

const ENVIRONMENT = ["Focused practice", "Collaboration", "Project work", "Feedback", "Access to relevant tools", "Discussion", "Review"];

/** Sections 11 and 12: how the approach supports progression, and the learning environment (briefly, linking to Facilities). */
export function ApproachProgression() {
  return (
    <>
      <section aria-labelledby="ap-progression-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ap-progression-heading"
            eyebrow="Progression"
            title={
              <>
                The Learning Experience Should Change <span className={GRADIENT_TEXT}>as the Learner Changes.</span>
              </>
            }
          >
            Learners do not all progress at the same pace. These stages describe a general direction, not a fixed timeline.
          </SectionHeader>

          <ol aria-label="Early stage, developing stage, applied stage, growing independence" className="relative mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <span aria-hidden="true" className="absolute top-[15px] right-[12.5%] left-[12.5%] hidden h-px bg-primary/20 xl:block" />
            {PROGRESSION.map((p, i) => (
              <li key={p.title}>
                <span
                  aria-hidden="true"
                  className={
                    "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold " +
                    (i === PROGRESSION.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
                  }
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ap-environment-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                  Learning Environment
                </div>
                <h2 id="ap-environment-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                  The Environment Should <span className={GRADIENT_TEXT}>Support the Learning.</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  A useful learning environment should make space for the activities below.
                </p>
                <Link
                  href="/about/facilities"
                  className="group mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Explore Facilities
                  <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>

              <ul className="grid grid-cols-2 gap-2.5">
                {ENVIRONMENT.map((e) => (
                  <li key={e} className="rounded-xl border border-primary/15 bg-card px-4 py-3 text-base font-medium text-foreground">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
