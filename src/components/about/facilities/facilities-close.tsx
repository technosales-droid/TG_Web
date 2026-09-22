import Link from "next/link";
import { ArrowRight, Info, Lightbulb, Route, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const EXPLORE: { title: string; text: string; href: string; Icon: LucideIcon }[] = [
  { title: "Our Mission", text: "Understand the purpose behind the learning model.", href: "/about/mission", Icon: Target },
  { title: "Why Techno Gurukul", text: "Explore the reasoning behind the practical learning philosophy.", href: "/about/why-technogurukul", Icon: Lightbulb },
  { title: "Our Approach", text: "See how the philosophy becomes an actual teaching and learning experience.", href: "/about/approach", Icon: Route },
  { title: "About Techno Gurukul", text: "Return to the broader institutional overview.", href: "/about", Icon: Info },
];

/** Sections 5 and 6: honest positioning, then related About pages. */
export function FacilitiesClose() {
  return (
    <>
      <section aria-labelledby="fc-honest-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-primary/15 bg-card px-6 py-8 sm:px-10 sm:py-10">
            <div aria-hidden="true" className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-brand-green" />
            <h2 id="fc-honest-heading" className="mt-5 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
              A Space and a Team Support Learning. <span className={GRADIENT_TEXT}>They Do Not Replace It.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              A well-designed space and supportive guidance can make practice easier and feedback more available. What a
              learner builds and understands still depends on their own effort, curiosity and practice.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="fc-related-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="fc-related-heading"
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
