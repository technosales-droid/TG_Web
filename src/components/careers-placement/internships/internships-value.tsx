import { ClipboardCheck, MessageSquare, RefreshCw, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const AREAS: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Apply Skills", text: "Use concepts and tools in practical situations.", Icon: Wrench },
  { title: "Work With Responsibility", text: "Learn to manage tasks, deadlines and expectations.", Icon: ClipboardCheck },
  { title: "Communicate", text: "Practise asking questions, sharing progress and explaining your work.", Icon: MessageSquare },
  { title: "Learn From Feedback", text: "Use reviews and feedback to improve your approach.", Icon: RefreshCw },
];

const EXPERIENCE = [
  { name: "Prepare", text: "Understand the role, expectations and skills required." },
  { name: "Join", text: "Adapt to the environment, people and working process." },
  { name: "Contribute", text: "Take responsibility for the tasks assigned to you." },
  { name: "Learn", text: "Ask questions, observe, practise and respond to feedback." },
  { name: "Reflect", text: "Identify what you learned and how the experience changed your skills." },
];

/** Sections 2 and 3: what an internship can do, then the experience as a stepper on a dark panel. */
export function InternshipsValue() {
  return (
    <>
      <section aria-labelledby="internships-value-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="internships-value-heading"
            eyebrow="Why Practical Experience Matters"
            title={
              <>
                Learning Changes When You Have <span className={GRADIENT_TEXT}>Something Real to Work On.</span>
              </>
            }
          >
            An internship can provide a different kind of learning by placing skills, communication and problem-solving
            into a practical working context.
          </SectionHeader>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {AREAS.map(({ title, text, Icon }) => (
              <li key={title} className="rounded-2xl border border-primary/15 bg-card p-6">
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="internships-experience-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              The Internship Experience
            </div>
            <h2 id="internships-experience-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
              From First Preparation to{" "}
              <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Reflection.</span>
            </h2>

            <ol className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-background/25 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
              {EXPERIENCE.map((s, i) => (
                <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                      (i === EXPERIENCE.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-background/60 bg-[#0d5674] text-background")
                    }
                  >
                    {i + 1}
                  </span>
                  <div className="xl:mt-4 xl:text-center">
                    <h3 className="text-xl font-semibold tracking-tight text-background">{s.name}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-background/75 xl:mx-auto xl:max-w-[16rem]">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
