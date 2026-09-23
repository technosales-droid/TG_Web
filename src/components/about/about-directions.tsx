import Link from "next/link";
import { ArrowRight, BarChart3, ChevronRight, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const DIRECTIONS: { id: string; title: string; Icon: LucideIcon; themes: string[]; cta: string; href: string }[] = [
  {
    id: "ab-dir-dm",
    title: "Digital Marketing",
    Icon: BarChart3,
    themes: ["Strategy", "Content", "Campaigns", "Analytics", "Communication"],
    cta: "Explore Digital Marketing",
    href: "/programs/tg-digital-marketing",
  },
  {
    id: "ab-dir-game",
    title: "Game Development & Design",
    Icon: Gamepad2,
    themes: ["Game development", "Design", "Art", "Animation", "Technical workflows"],
    cta: "Explore Game Development",
    href: "/programs/tg-gameforge",
  },
];

const READINESS = ["Learn", "Practise", "Build", "Portfolio", "Career Preparation"];

const LINKS = [
  { title: "Careers & Placement", text: "Explore possible directions and prepare your work, communication and professional readiness.", href: "/careers-placement" },
];

/** Sections 7 and 8: programs as directions, and the flow from learning to career readiness. */
export function AboutDirections() {
  return (
    <>
      <section aria-labelledby="ab-directions-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ab-directions-heading"
            eyebrow="Programs as Directions"
            title={
              <>
                Choose a Direction. <span className={GRADIENT_TEXT}>Then Build Within It.</span>
              </>
            }
          >
            Different learners are drawn to different kinds of work. Techno Gurukul currently provides learning paths across
            areas such as Digital Marketing and Game Development &amp; Design, with the wider catalogue designed to grow over
            time.
          </SectionHeader>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {DIRECTIONS.map(({ id, title, Icon, themes, cta, href }) => (
              <article key={id} aria-labelledby={id} className="flex flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-card">
                <div aria-hidden="true" className="relative flex h-28 items-center bg-gradient-to-br from-primary/15 via-brand-green/10 to-transparent px-6 sm:h-32 sm:px-8">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand-green text-white shadow-lg">
                    <Icon className="size-7" />
                  </span>
                  <span className="absolute top-5 right-6 flex gap-1.5">
                    <span className="size-2 rounded-full bg-primary/30" />
                    <span className="size-2 rounded-full bg-brand-green/50" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 id={id} className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm font-semibold tracking-widest text-muted-foreground uppercase">Broad themes</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
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
                    {cta}
                    <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Link
            href="/programs"
            className="group mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            See All Programs
            <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="ab-readiness-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <SectionHeader
              id="ab-readiness-heading"
              eyebrow="Learning to Career Readiness"
              title={
                <>
                  Learning Should Prepare You to <span className={GRADIENT_TEXT}>Show What You Can Do.</span>
                </>
              }
            >
              Practical learning becomes more useful when learners can turn their work into evidence, organise that evidence
              and prepare to communicate it clearly.
            </SectionHeader>

            <ol aria-label="Learn, practise, build, portfolio, career preparation" className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
              {READINESS.map((step, i) => (
                <li key={step} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                  <span
                    className={
                      "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-3 py-3 text-center text-base font-semibold tracking-tight " +
                      (i === READINESS.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/20 bg-card text-foreground")
                    }
                  >
                    {step}
                  </span>
                  {i < READINESS.length - 1 && <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-primary/60 lg:block" />}
                </li>
              ))}
            </ol>

            <ul className="mt-8 grid max-w-xl gap-4">
              {LINKS.map((l) => (
                <li key={l.href} className="min-w-0">
                  <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{l.title}</h3>
                    <p className="mt-2 mb-5 text-base leading-relaxed text-muted-foreground">{l.text}</p>
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
        </div>
      </section>
    </>
  );
}
