import Link from "next/link";
import { ArrowRight, ChevronRight, Compass, Eye, MessageSquare, RefreshCw, ShieldCheck, ListChecks } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const FLOW = ["Project", "Portfolio", "Application", "Interview", "Experience"];

const HABITS: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Reliability", text: "Follow through on responsibilities.", Icon: ShieldCheck },
  { title: "Communication", text: "Keep people informed and ask when something is unclear.", Icon: MessageSquare },
  { title: "Organisation", text: "Track tasks, priorities and deadlines.", Icon: ListChecks },
  { title: "Curiosity", text: "Ask questions and understand why things are done.", Icon: Compass },
  { title: "Feedback", text: "Treat feedback as part of learning.", Icon: Eye },
  { title: "Ownership", text: "Take responsibility for your work and improvement.", Icon: RefreshCw },
];

const LINK =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Sections 6 and 7: from projects to experience (a chain), then professional habits (compact list). */
export function InternshipsProjects() {
  return (
    <>
      <section aria-labelledby="internships-flow-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="internships-flow-heading"
            eyebrow="From Projects to Experience"
            title={
              <>
                Projects Can Help You <span className={GRADIENT_TEXT}>Start the Conversation.</span>
              </>
            }
          >
            Before an internship, your projects can give you practical examples to discuss. During an internship, new
            experiences can add to that body of work and help you understand what professional practice looks like.
          </SectionHeader>

          <ol aria-label="From project to experience" className="mt-10 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
            {FLOW.map((step, i) => (
              <li key={step} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                <span className="flex min-h-14 flex-1 items-center justify-center rounded-2xl border border-primary/20 bg-card px-4 py-3 text-center text-lg font-semibold tracking-tight text-foreground">
                  <span aria-hidden="true" className="mr-2 text-sm font-semibold text-brand-green">
                    0{i + 1}
                  </span>
                  {step}
                </span>
                {i < FLOW.length - 1 && (
                  <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-primary/60 lg:block" />
                )}
              </li>
            ))}
          </ol>

          <Link href="/learning/projects" className={LINK + " mt-6"}>
            Explore Project Work
            <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="internships-habits-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="internships-habits-heading"
            eyebrow="Professional Habits"
            title={
              <>
                Technical Skills Matter. <span className={GRADIENT_TEXT}>So Does How You Work.</span>
              </>
            }
          />

          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
            {HABITS.map(({ title, text, Icon }) => (
              <li key={title} className="flex gap-4">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
