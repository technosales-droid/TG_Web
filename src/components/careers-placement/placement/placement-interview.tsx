import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const AREAS = [
  { title: "Explain Your Work", text: "Describe the project, objective and your contribution." },
  { title: "Explain Your Thinking", text: "Discuss decisions, tools, process and trade-offs." },
  { title: "Explain What You Learned", text: "Talk about challenges, improvements and what you would do differently." },
];

const LINK =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Sections 7, 8 and 9: interview preparation, industry context, and the expectation-setting statement. */
export function PlacementInterview() {
  return (
    <>
      <section aria-labelledby="placement-interview-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="placement-interview-heading"
            eyebrow="Interview Preparation"
            title={
              <>
                Be Ready to <span className={GRADIENT_TEXT}>Explain What You Built.</span>
              </>
            }
          >
            Interview preparation is not only about memorising answers. It is about understanding your work well enough
            to explain your decisions, process, challenges and learning clearly.
          </SectionHeader>

          <ul className="mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-3">
            {AREAS.map((a, i) => (
              <li key={a.title} className="border-l-2 border-brand-green pl-5">
                <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{a.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{a.text}</p>
              </li>
            ))}
          </ul>

          <Link href="/careers-placement/interview-prep" className={LINK + " mt-8"}>
            Explore Interview Preparation
            <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="placement-industry-heading" className="px-4 py-6 sm:px-6 sm:py-10 xl:py-12">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid items-center gap-6 rounded-[2rem] border border-primary/10 bg-muted/50 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
            <div>
              <h2 id="placement-industry-heading" className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
                Understand the World You Are Preparing For.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Career preparation becomes more meaningful when learners understand how skills, projects, communication and
                professional expectations come together in real working environments.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link href="/careers-placement/industry-connections" className={LINK}>
                Explore Industry Connections
                <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="placement-expectation-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="mx-auto max-w-3xl border-l-2 border-brand-green pl-5 sm:pl-8">
            <h2 id="placement-expectation-heading" className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
              Preparation Improves Readiness. <span className={GRADIENT_TEXT}>It Does Not Guarantee an Outcome.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Techno Gurukul can help learners develop skills, project experience, portfolio evidence and preparation for
              professional opportunities. Actual career outcomes depend on the individual, their effort and performance,
              the roles they pursue, market conditions and the requirements of specific employers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
