import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "../curriculum/section-header";
import { INSTRUCTOR_ROLES } from "./how-we-teach-data";

// Four supportive roles as quadrants separated by thin lines. No claims about faculty qualifications.
export function InstructorRole() {
  return (
    <section id="instructor-role" aria-labelledby="instructor-role-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="instructor-role-heading"
          eyebrow="The Role of the Instructor"
          title={
            <>
              <span className="block">Guidance When You Need It.</span>
              <span className={cn("block", GRADIENT_TEXT)}>Space to Build When You Don&rsquo;t.</span>
            </>
          }
        />

        <ul className="mt-10 grid overflow-hidden rounded-[2rem] border border-primary/10 bg-card sm:grid-cols-2 lg:mt-12">
          {INSTRUCTOR_ROLES.map((r, i) => (
            <li
              key={r.title}
              className={cn(
                "group relative p-6 transition-colors duration-300 hover:bg-primary/5 sm:p-8 lg:p-10",
                i > 0 && "border-t border-primary/10",
                i === 1 && "sm:border-t-0 sm:border-l",
                i === 2 && "sm:border-l-0",
                i === 3 && "sm:border-l"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mb-5 block h-1 w-12 rounded-full transition-all duration-300 group-hover:w-20",
                  i % 2 === 0 ? "bg-primary" : "bg-brand-green"
                )}
              />
              <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{r.title}</h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{r.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
