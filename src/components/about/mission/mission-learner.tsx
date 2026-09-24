import { GRADIENT_TEXT } from "@/components/ui/section-header";

const DIMENSIONS = [
  { title: "Capability", text: "Develop useful skills." },
  { title: "Curiosity", text: "Stay interested in understanding how things work." },
  { title: "Creation", text: "Turn ideas into practical work." },
  { title: "Growth", text: "Reflect, improve and continue learning." },
];

/** The learner at the centre. */
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
              {DIMENSIONS.map((d) => (
                <li key={d.title} className="border-t-2 border-primary/25 py-5">
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{d.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
