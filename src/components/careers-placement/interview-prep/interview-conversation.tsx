import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const AREAS = [
  { title: "Skills", text: "Be able to explain the tools, concepts and capabilities you have listed." },
  { title: "Projects", text: "Know what you built, why you built it and what your contribution was." },
  { title: "Decisions", text: "Be ready to explain important choices in your process." },
  { title: "Learning", text: "Understand what changed, what challenged you and what you would improve." },
];

const STORY = [
  { name: "Context", text: "What was the project or situation?" },
  { name: "Goal", text: "What were you trying to achieve?" },
  { name: "Action", text: "What did you actually do?" },
  { name: "Result", text: "What happened or what did you produce?" },
  { name: "Reflection", text: "What did you learn and what would you change?" },
];

const PROJECT_PREP = [
  { title: "The Problem", text: "What were you trying to solve or create?" },
  { title: "Your Role", text: "What part did you personally handle?" },
  { title: "Your Process", text: "How did you approach the work?" },
  { title: "Your Tools", text: "Which tools, technologies or methods did you use?" },
  { title: "Your Challenges", text: "What was difficult?" },
  { title: "Your Decisions", text: "Why did you choose your approach?" },
  { title: "Your Result", text: "What did you produce?" },
  { title: "Your Learning", text: "What would you improve next time?" },
];

const LINK =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Sections 2, 3 and 4: the conversation, the story framework, and project preparation. */
export function InterviewConversation() {
  return (
    <>
      <section aria-labelledby="ip-conversation-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                The Conversation
              </div>
              <h2 id="ip-conversation-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Good Preparation Starts With <span className={GRADIENT_TEXT}>Understanding Your Own Work.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                An interview is a conversation about what you know, what you have done and how you approach problems.
                Preparation becomes stronger when you understand the work behind the claims on your resume and portfolio.
              </p>
              <p className="mt-5 border-l-2 border-brand-green pl-4 text-lg font-medium tracking-tight text-foreground">
                Don&rsquo;t memorise your story. Understand your work well enough to explain it.
              </p>
            </div>

            <ol className="grid gap-x-8 sm:grid-cols-2">
              {AREAS.map((a, i) => (
                <li key={a.title} className="border-t-2 border-primary/25 py-5">
                  <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-brand-green">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{a.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{a.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="ip-story-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <SectionHeader
              id="ip-story-heading"
              eyebrow="Readiness Framework"
              title={
                <>
                  Prepare the Story <span className={GRADIENT_TEXT}>Behind Your Work.</span>
                </>
              }
            >
              A result does not have to be a number. For educational projects, creative work or technical prototypes it can be
              the finished work, demonstrated functionality, an outcome, an observation or what you learned. Never invent
              metrics.
            </SectionHeader>

            <ol className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-primary/20 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
              {STORY.map((s, i) => (
                <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                      (i === STORY.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
                    }
                  >
                    {i + 1}
                  </span>
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

      <section aria-labelledby="ip-projects-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ip-projects-heading"
            eyebrow="Project Preparation"
            title={
              <>
                Know Every Project <span className={GRADIENT_TEXT}>You Put Forward.</span>
              </>
            }
          />

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
            {PROJECT_PREP.map((p) => (
              <li key={p.title} className="flex flex-col rounded-2xl border border-primary/15 bg-card p-5">
                <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-base font-bold text-primary">
                  ?
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{p.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">{p.text}</p>
              </li>
            ))}
          </ul>

          <Link href="/learning/projects" className={LINK + " mt-6"}>
            Explore Project Work
            <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
