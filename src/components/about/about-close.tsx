import Link from "next/link";
import { ArrowRight, Building2, Lightbulb, Route, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../learning/curriculum/section-header";

const EMPHASIS = [
  { title: "Practical Application", text: "Learning should be connected to doing." },
  { title: "Visible Work", text: "Projects can become evidence of learning." },
  { title: "Iteration", text: "Feedback and refinement are part of the process." },
  { title: "Career Context", text: "Learners should understand how skills connect to professional expectations." },
];

const EXPLORE: { title: string; text: string; href: string; Icon: LucideIcon }[] = [
  { title: "Mission", text: "Understand the purpose and direction behind Techno Gurukul.", href: "/about/mission", Icon: Target },
  { title: "Why Techno Gurukul", text: "Explore the thinking behind the learning model.", href: "/about/why-technogurukul", Icon: Lightbulb },
  { title: "Our Approach", text: "Go deeper into how the learning experience is designed.", href: "/about/approach", Icon: Route },
  { title: "Facilities & Faculty", text: "Explore the learning environment and the people who support it.", href: "/about/facilities", Icon: Building2 },
];

/** Sections 9, 10 and 11: our emphasis, the About destination hub, and transparent positioning. */
export function AboutClose() {
  return (
    <>
      <section aria-labelledby="ab-emphasis-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Our Emphasis
              </div>
              <h2 id="ab-emphasis-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                A Different Emphasis: <span className={GRADIENT_TEXT}>Build While You Learn.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Our emphasis is on connecting what learners study with what they can make, show and improve.
              </p>
            </div>

            <dl>
              {EMPHASIS.map((e) => (
                <div key={e.title} className="grid gap-1 border-t border-primary/15 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6 last:border-b">
                  <dt className="text-xl font-semibold tracking-tight text-foreground">{e.title}</dt>
                  <dd className="text-base leading-relaxed text-muted-foreground">{e.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="ab-explore-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ab-explore-heading"
            eyebrow="Explore About"
            title={
              <>
                Explore More About <span className={GRADIENT_TEXT}>Techno Gurukul.</span>
              </>
            }
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {EXPLORE.map(({ title, text, href, Icon }) => (
              <li key={href} className="min-w-0">
                <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5">
                  <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-2 mb-6 text-base leading-relaxed text-muted-foreground">{text}</p>
                  <Link
                    href={href}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Explore {title}
                    <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ab-process-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-primary/15 bg-card px-6 py-8 sm:px-10 sm:py-10">
            <div aria-hidden="true" className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-brand-green" />
            <h2 id="ab-process-heading" className="mt-5 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
              Learning Is a Process, <span className={GRADIENT_TEXT}>Not a Promise.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Techno Gurukul is designed to give learners structure, practice, project experience and a clearer understanding
              of how skills can be applied. What a learner ultimately achieves depends on their effort, choices, performance
              and the opportunities available to them.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
