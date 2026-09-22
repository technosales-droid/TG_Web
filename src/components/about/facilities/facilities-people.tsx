import { GRADIENT_TEXT } from "../../learning/curriculum/section-header";

const ROLE = [
  { title: "Guide", text: "Help learners understand a concept or approach." },
  { title: "Demonstrate", text: "Show how an idea or tool can be used." },
  { title: "Review", text: "Look at a learner's work and respond to it." },
  { title: "Encourage", text: "Support learners through practice and setbacks." },
];

/** Section 3: the people who support learning. No names, photos, bios, credentials or staffing ratios. */
export function FacilitiesPeople() {
  return (
    <section aria-labelledby="fc-people-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              The People
            </div>
            <h2 id="fc-people-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
              Learning Is Supported by <span className={GRADIENT_TEXT}>People, Not Just Material.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Instructors and mentors can guide practice, demonstrate approaches, answer questions and give feedback.
              Their role is to support the learning process, not to do the learning for you.
            </p>
          </div>

          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {ROLE.map((r, i) => (
              <li key={r.title} className="border-t-2 border-primary/25 py-5">
                <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-brand-green">
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{r.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
