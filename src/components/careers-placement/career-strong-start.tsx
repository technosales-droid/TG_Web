import { Check } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT } from "../learning/curriculum/section-header";

const AREAS = [
  { title: "Skills", text: "Know what you can actually do." },
  { title: "Projects", text: "Have work you can demonstrate." },
  { title: "Portfolio", text: "Present your work clearly." },
  { title: "Communication", text: "Be able to explain your thinking and process." },
];

/** Sections 5 and 6: what a learner controls, then the careful statement about outcomes. */
export function CareerStrongStart() {
  return (
    <section aria-labelledby="career-strong-start-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
          <div className="flex items-center gap-2 text-sm font-medium text-background">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            What Makes a Strong Start
          </div>
          <h2 id="career-strong-start-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
            A Strong Career Start Is{" "}
            <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Built, Not Just Claimed.</span>
          </h2>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {AREAS.map((a) => (
              <li key={a.title} className="rounded-2xl border border-background/15 bg-background/10 p-6">
                <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-brand-green text-white">
                  <Check className="size-4" />
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-background">{a.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-background/75">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Career support without guarantees */}
        <div className="mx-auto mt-14 max-w-3xl border-l-2 border-brand-green pl-5 sm:mt-20 sm:pl-8">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
            Preparation Creates Possibility. <span className={cn(GRADIENT_TEXT)}>Your Work Makes It Visible.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Techno Gurukul can help learners build the skills, projects, portfolio evidence and preparation needed to
            approach professional opportunities with greater clarity. Career outcomes depend on the individual, their
            effort, performance, opportunities available and the requirements of specific employers.
          </p>
        </div>
      </div>
    </section>
  );
}
