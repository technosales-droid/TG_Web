import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GRADIENT_TEXT } from "../../learning/curriculum/section-header";

const LAYERS = [
  { name: "Work", text: "The thing you created." },
  { name: "Documentation", text: "The context and thinking behind it." },
  { name: "Portfolio", text: "The organised presentation of the work." },
];

const CAREER = [
  { title: "Careers & Placement", text: "Explore possible directions and practical preparation for professional opportunities.", href: "/careers-placement" },
];

/** Sections 7 and 8: why visible work matters, and why career context matters. */
export function WhyEvidence() {
  return (
    <>
      <section aria-labelledby="wt-evidence-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Why Visible Work Matters
              </div>
              <h2 id="wt-evidence-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                What You Build Can Become <span className={GRADIENT_TEXT}>Evidence of What You Learned.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Projects, documentation and portfolio pieces can make learning easier to demonstrate, discuss and reflect
                on.
              </p>
              <Link
                href="/careers-placement/portfolio-resume"
                className="group mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Explore Portfolio &amp; Resume
                <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            <ol aria-label="Work, documentation, portfolio" className="relative rounded-[2rem] border border-primary/15 bg-card px-5 py-6 sm:px-8 sm:py-8">
              <span aria-hidden="true" className="absolute top-10 bottom-10 left-[34px] w-px bg-primary/20 sm:left-[50px]" />
              {LAYERS.map((l, i) => (
                <li key={l.name} className="relative flex gap-4 py-3 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold " +
                      (i === LAYERS.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
                    }
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{l.name}</h3>
                    <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">{l.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            A portfolio helps a learner present their work clearly. It does not guarantee an interview or an outcome.
          </p>
        </div>
      </section>

      <section aria-labelledby="wt-career-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Why Career Context Matters
              </div>
              <h2 id="wt-career-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Learning Is Stronger <span className={GRADIENT_TEXT}>When You Understand Where It Leads.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Skills become easier to place in context when learners understand possible career directions, professional
                expectations and how work is discussed in real environments.
              </p>
            </div>

            <ul className="mt-10 grid max-w-xl gap-4">
              {CAREER.map((c) => (
                <li key={c.href} className="min-w-0">
                  <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5 sm:p-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">{c.title}</h3>
                    <p className="mt-2 mb-6 text-base leading-relaxed text-muted-foreground">{c.text}</p>
                    <Link
                      href={c.href}
                      className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Explore {c.title}
                      <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
