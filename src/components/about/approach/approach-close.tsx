import Link from "next/link";
import { ArrowRight, Building2, Info, Lightbulb, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const RESPONSIBILITIES = [
  { title: "Show Up", text: "Be present and engaged." },
  { title: "Practise", text: "Use the skills repeatedly." },
  { title: "Ask", text: "Raise questions when something is unclear." },
  { title: "Build", text: "Apply knowledge rather than only consume it." },
  { title: "Reflect", text: "Notice what worked and what did not." },
  { title: "Improve", text: "Respond to feedback and keep refining." },
];

const EXPLORE: { title: string; text: string; href: string; Icon: LucideIcon }[] = [
  { title: "Our Mission", text: "Understand the purpose behind the learning model.", href: "/about/mission", Icon: Target },
  { title: "Why Techno Gurukul", text: "Explore the reasoning behind the practical learning philosophy.", href: "/about/why-technogurukul", Icon: Lightbulb },
  { title: "Facilities & Faculty", text: "Explore the learning environment and the people who support it.", href: "/about/facilities", Icon: Building2 },
  { title: "About Techno Gurukul", text: "Return to the broader institutional overview.", href: "/about", Icon: Info },
];

/** Sections 13, 14 and 15: what the approach asks of learners, honest positioning, and related About pages. */
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

      <section aria-labelledby="ap-related-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ap-related-heading"
            eyebrow="Related About Pages"
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
    </>
  );
}
