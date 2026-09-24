import { ClipboardList, Clock, FileText, ListChecks, MessageSquare, Repeat, Send, Users, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const AREAS: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Tools", text: "Understand how software, technologies and workflows are used in practice.", Icon: Wrench },
  { title: "Teams", text: "Learn how people with different responsibilities work together.", Icon: Users },
  { title: "Communication", text: "Understand how ideas, decisions and progress are communicated.", Icon: MessageSquare },
  {
    title: "Expectations",
    text: "Recognise the importance of quality, deadlines, responsibility and continuous learning.",
    Icon: ListChecks,
  },
];

const EXPOSURE = [
  { name: "Problem", text: "Understand what needs to be solved or created." },
  { name: "Process", text: "See how work moves from an idea toward implementation." },
  { name: "Team", text: "Understand how responsibilities are distributed." },
  { name: "Constraints", text: "Recognise that time, resources, requirements and priorities shape decisions." },
  { name: "Outcome", text: "See how finished work is evaluated against its purpose." },
];

const REAL_WORK: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Briefs", text: "Understand what needs to be done and why.", Icon: FileText },
  { title: "Requirements", text: "Clarify goals, constraints and expectations.", Icon: ClipboardList },
  { title: "Collaboration", text: "Work with other people and responsibilities.", Icon: Users },
  { title: "Feedback", text: "Review work, receive input and refine it.", Icon: Repeat },
  { title: "Deadlines", text: "Balance quality, priorities and available time.", Icon: Clock },
  { title: "Handoffs", text: "Present work clearly so someone else can understand or continue it.", Icon: Send },
];

/** Sections 2, 3 and 4: why context matters, what exposure teaches, and what professional work can look like. */
export function IndustryContext() {
  return (
    <>
      <section aria-labelledby="ic-context-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Professional Context
              </div>
              <h2 id="ic-context-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Learning Makes More Sense When You <span className={GRADIENT_TEXT}>Understand Where It Is Used.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Knowing a tool or concept is one part of learning. Understanding how that skill fits into projects, teams,
                communication and professional expectations gives the learning more context.
              </p>
              <p className="mt-5 border-l-2 border-brand-green pl-4 text-base leading-relaxed text-foreground sm:text-lg">
                Not every workplace follows the same model. These are areas worth understanding, not a single template.
              </p>
            </div>

            <ul className="grid gap-x-8 sm:grid-cols-2">
              {AREAS.map(({ title, text, Icon }) => (
                <li key={title} className="border-t-2 border-primary/25 py-5">
                  <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="ic-exposure-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <SectionHeader
              id="ic-exposure-heading"
              eyebrow="What Exposure Can Teach"
              title={
                <>
                  See More Than <span className={GRADIENT_TEXT}>the Final Result.</span>
                </>
              }
            >
              Professional work is more than simply producing an output. Looking at the path behind a result helps you
              understand why decisions were made.
            </SectionHeader>

            <ol aria-label="Problem, process, team, constraints, outcome" className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-primary/20 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
              {EXPOSURE.map((s, i) => (
                <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                      (i === EXPOSURE.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
                    }
                   />
                  <div className="xl:mt-4 xl:text-center">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{s.name}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground xl:mx-auto xl:max-w-[14rem]">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="ic-work-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ic-work-heading"
            eyebrow="Professional Work"
            title={
              <>
                Real Work Is More Than <span className={GRADIENT_TEXT}>the Task on the Screen.</span>
              </>
            }
          >
            General examples of what professional work can involve. They are not requirements in every organisation.
          </SectionHeader>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
            {REAL_WORK.map(({ title, text, Icon }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-primary/15 bg-card p-5 sm:p-6">
                <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
