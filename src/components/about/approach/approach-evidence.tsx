import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const CHAIN = ["Practice", "Project", "Documentation", "Portfolio", "Reflection"];

const SPLIT = [
  { title: "Practical Evidence", text: "Projects, work samples and supporting documentation.", href: "/learning/projects" },
  { title: "Learning Record", text: "Certificates and other supporting records of completed learning.", href: "/learning/certifications" },
];

/** Section 10: learning evidence, the chain from practice to reflection, and the split practical/record link cards. */
export function ApproachEvidence() {
  return (
    <section aria-labelledby="ap-evidence-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="ap-evidence-heading"
          eyebrow="Learning Evidence"
          title={
            <>
              The Work Becomes Part of <span className={GRADIENT_TEXT}>the Learning Record.</span>
            </>
          }
        />

        <ol aria-label="Practice, project, documentation, portfolio, reflection" className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
          {CHAIN.map((step, i) => (
            <li key={step} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
              <span
                className={
                  "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-3 py-3 text-center text-base font-semibold tracking-tight " +
                  (i === CHAIN.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/20 bg-card text-foreground")
                }
              >
                {step}
              </span>
              {i < CHAIN.length - 1 && <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-primary/60 lg:block" />}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SPLIT.map((s) => (
            <div key={s.href} className="min-w-0">
              <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 mb-6 text-base leading-relaxed text-muted-foreground">{s.text}</p>
                <Link
                  href={s.href}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Explore {s.title}
                  <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          A certificate records learning. Your work shows what you can do. Certificates at Techno Gurukul do not imply
          external accreditation.
        </p>
      </div>
    </section>
  );
}
