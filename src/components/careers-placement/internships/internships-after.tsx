import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { GRADIENT_TEXT } from "../../learning/curriculum/section-header";

const GAINS = [
  "A stronger understanding of professional workflows",
  "Examples of practical work",
  "Improved communication",
  "A clearer career direction",
  "Lessons from feedback",
  "Evidence you can discuss in future applications and interviews",
];

const BRIDGE = ["Internship Experience", "Projects & Evidence", "Portfolio", "Interview Stories", "Career Readiness"];

const LINK =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Sections 8, 9 and the transparency statement. */
export function InternshipsAfter() {
  return (
    <>
      <section aria-labelledby="internships-most-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Making the Most of It
              </div>
              <h2 id="internships-most-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl">
                Do More Than <span className={GRADIENT_TEXT}>Complete the Internship.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A practical experience is worth more when you take something from it. Learners can aim to leave with:
              </p>
            </div>
            <ul className="grid content-start">
              {GAINS.map((g) => (
                <li key={g} className="flex gap-3 border-t border-primary/15 py-4 text-base text-foreground sm:text-lg">
                  <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-brand-green" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="internships-bridge-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-14">
            <h2 id="internships-bridge-heading" className="max-w-3xl text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
              From Internship Experience <span className={GRADIENT_TEXT}>to Career Readiness.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Practical experience becomes more valuable when you reflect on what you did, what you learned and how you
              can explain that experience clearly.
            </p>

            <ol aria-label="How experience leads toward readiness" className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
              {BRIDGE.map((b, i) => (
                <li key={b} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                  <span
                    className={
                      "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-3 py-3 text-center text-base font-semibold tracking-tight " +
                      (i === BRIDGE.length - 1
                        ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white"
                        : "border-primary/20 bg-card text-foreground")
                    }
                  >
                    {b}
                  </span>
                  {i < BRIDGE.length - 1 && <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-primary/60 lg:block" />}
                </li>
              ))}
            </ol>

            <Link href="/careers-placement/placement" className={LINK + " mt-6"}>
              Explore Placement Preparation
              <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="internships-expectation-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="mx-auto max-w-3xl border-l-2 border-brand-green pl-5 sm:pl-8">
            <h2 id="internships-expectation-heading" className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
              An Internship Is Experience, <span className={GRADIENT_TEXT}>Not a Guarantee.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Internships can provide valuable practical exposure, but the experience and outcome depend on the role,
              organisation, responsibilities, learner performance and the specific opportunity.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
