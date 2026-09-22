import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const DIMENSIONS = [
  { title: "Capability", text: "Develop useful skills." },
  { title: "Curiosity", text: "Stay interested in understanding how things work." },
  { title: "Creation", text: "Turn ideas into practical work." },
  { title: "Growth", text: "Reflect, improve and continue learning." },
];

const FLOW = ["Learn", "Practise", "Build", "Document", "Show"];

const DESTINATIONS = [
  { title: "Projects", text: "Build work through practical projects.", href: "/learning/projects" },
  { title: "Certifications", text: "Keep a record of completed learning and supporting evidence.", href: "/learning/certifications" },
  { title: "Resources", text: "Continue learning and practising beyond the core learning path.", href: "/learning/resources" },
];

/** Sections 5 and 6: the learner at the centre, and learning that produces evidence (dark panel). */
export function MissionLearner() {
  return (
    <>
      <section aria-labelledby="ms-learner-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                The Learner at the Centre
              </div>
              <h2 id="ms-learner-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                The Mission Is About What Learners{" "}
                <span className={GRADIENT_TEXT}>Can Do With What They Learn.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                The learning experience is designed to encourage these dimensions to grow together, rather than treating any
                one of them in isolation.
              </p>
            </div>

            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {DIMENSIONS.map((d, i) => (
                <li key={d.title} className="border-t-2 border-primary/25 py-5">
                  <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-brand-green">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{d.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="ms-evidence-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <SectionHeader
              id="ms-evidence-heading"
              eyebrow="Learning That Produces Evidence"
              title={
                <>
                  Make Learning <span className={GRADIENT_TEXT}>Visible.</span>
                </>
              }
            >
              When learners build projects, document their process and organise their work, learning becomes easier to
              demonstrate and discuss.
            </SectionHeader>

            <ol aria-label="Learn, practise, build, document, show" className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
              {FLOW.map((step, i) => (
                <li key={step} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                  <span
                    className={cn(
                      "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-3 py-3 text-center text-base font-semibold tracking-tight",
                      i === FLOW.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/20 bg-card text-foreground"
                    )}
                  >
                    {step}
                  </span>
                  {i < FLOW.length - 1 && <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-primary/60 lg:block" />}
                </li>
              ))}
            </ol>

            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {DESTINATIONS.map((d) => (
                <li key={d.href} className="min-w-0">
                  <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{d.title}</h3>
                    <p className="mt-1.5 mb-5 text-base leading-relaxed text-muted-foreground">{d.text}</p>
                    <Link
                      href={d.href}
                      className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Explore {d.title}
                      <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Certifications record completed learning at Techno Gurukul. They do not imply external accreditation or
              employer recognition.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
