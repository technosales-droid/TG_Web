import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const CARDS = [
  { title: "Placement Preparation", text: "Build practical and professional readiness.", href: "/careers-placement/placement" },
  { title: "Internships", text: "Explore how practical experience can complement learning.", href: "/careers-placement/internships" },
  { title: "Portfolio & Resume", text: "Present your work and skills clearly.", href: "/careers-placement/portfolio-resume" },
  { title: "Interview Preparation", text: "Prepare to explain your work and thinking.", href: "/careers-placement/interview-prep" },
];

/** Sections 13 and 14: honest expectation setting, then related career-support cards. */
export function IndustryClose() {
  return (
    <>
      <section aria-labelledby="ic-expectation-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-primary/15 bg-card px-6 py-8 sm:px-10 sm:py-10">
            <div aria-hidden="true" className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-brand-green" />
            <h2 id="ic-expectation-heading" className="mt-5 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
              Industry Exposure Is Context, <span className={GRADIENT_TEXT}>Not a Promise.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Learning about professional environments can help learners make more informed decisions about their skills and
              direction. Actual opportunities, internships, employment and career outcomes depend on the learner, the
              specific opportunity, the organisation and many factors outside the learner&rsquo;s control.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="ic-related-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ic-related-heading"
            eyebrow="More Career Support"
            title={
              <>
                Keep Exploring <span className={GRADIENT_TEXT}>Career Support.</span>
              </>
            }
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {CARDS.map((c) => (
              <li key={c.href} className="min-w-0">
                <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{c.title}</h3>
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
      </section>
    </>
  );
}
