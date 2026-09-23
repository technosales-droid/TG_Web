import { GRADIENT_TEXT } from "@/components/ui/section-header";

const INSTRUCTOR = [
  "Explain concepts",
  "Demonstrate processes",
  "Provide structure",
  "Ask questions",
  "Guide practice",
  "Review work",
  "Give feedback",
  "Help learners identify gaps",
];

const LEARNER = ["Ask questions", "Practise", "Make decisions", "Build", "Document", "Review their work", "Respond to feedback", "Try again"];

/** Section 4: an editorial split between what an instructor can do and what a learner is encouraged to do. */
export function ApproachRoles() {
  return (
    <section aria-labelledby="ap-roles-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Active Teaching, Active Learning
          </div>
          <h2 id="ap-roles-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
            Teaching Is Not Just <span className={GRADIENT_TEXT}>Delivering Information.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Instructor Role</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">The instructor can:</p>
            <ul className="mt-4 grid gap-2.5">
              {INSTRUCTOR.map((item) => (
                <li key={item} className="flex gap-2.5 border-t border-primary/10 pt-2.5 text-base text-foreground first:border-t-0 first:pt-0">
                  <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Learner Role</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">Learners are encouraged to:</p>
            <ul className="mt-4 grid gap-2.5">
              {LEARNER.map((item) => (
                <li key={item} className="flex gap-2.5 border-t border-primary/10 pt-2.5 text-base text-foreground first:border-t-0 first:pt-0">
                  <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
