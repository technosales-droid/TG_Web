import Link from "next/link";
import { ArrowRight, BarChart3, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const CAREER_LINKS = [
  { title: "Careers & Placement", text: "Explore possible directions and prepare your work, communication and professional readiness.", href: "/careers-placement" },
];

const PROGRAMS: { title: string; Icon: LucideIcon; themes: string[]; href: string }[] = [
  { title: "Digital Marketing", Icon: BarChart3, themes: ["Strategy", "Content", "Campaigns", "Analytics", "Communication"], href: "/programs/tg-digital-marketing" },
  { title: "Game Development & Design", Icon: Gamepad2, themes: ["Game development", "Design", "Art", "Animation", "Technical workflows"], href: "/programs/tg-gameforge" },
];

/** Sections 8 and 9: mission to career context, then the program areas that support the mission. */
export function MissionDirections() {
  return (
    <>
      <section aria-labelledby="ms-career-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ms-career-heading"
            eyebrow="From Mission to Career Context"
            title={
              <>
                A Practical Mission Needs <span className={GRADIENT_TEXT}>a Practical Next Step.</span>
              </>
            }
          >
            As learners build skills and projects, they also need to understand how those skills connect to possible career
            directions and professional expectations.
          </SectionHeader>

          <ul className="mt-10 grid max-w-xl gap-4">
            {CAREER_LINKS.map((l) => (
              <li key={l.href} className="min-w-0">
                <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5 sm:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">{l.title}</h3>
                  <p className="mt-2 mb-6 text-base leading-relaxed text-muted-foreground">{l.text}</p>
                  <Link
                    href={l.href}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Explore {l.title}
                    <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ms-programs-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ms-programs-heading"
            eyebrow="Programs That Support the Mission"
            title={
              <>
                Choose a Direction. <span className={GRADIENT_TEXT}>Then Build Within It.</span>
              </>
            }
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {PROGRAMS.map(({ title, Icon, themes, href }) => (
              <article key={href} className="flex flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-card">
                <div aria-hidden="true" className="relative flex h-24 items-center bg-gradient-to-br from-primary/15 via-brand-green/10 to-transparent px-6 sm:h-28 sm:px-8">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand-green text-white shadow-lg">
                    <Icon className="size-6" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {themes.map((t) => (
                      <li key={t} className="rounded-full border border-primary/20 bg-muted/60 px-3.5 py-1.5 text-sm font-medium text-foreground">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    className="group mt-8 inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Explore {title}
                    <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
