import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const LAYERS = [
  { name: "Resume", text: "Summarise your background." },
  { name: "Portfolio", text: "Show your work." },
  { name: "Interview", text: "Explain the thinking behind it." },
];

const JOURNEY = ["Learn", "Practise", "Build", "Document", "Present", "Explain"];

const LINK =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Sections 11, 12 and 13: resume to interview, the learning journey, and honest expectations. */
export function InterviewConnect() {
  return (
    <>
      <section aria-labelledby="ip-connect-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ip-connect-heading"
            eyebrow="Resume + Portfolio"
            title={
              <>
                Your Interview <span className={GRADIENT_TEXT}>Starts Before the Interview.</span>
              </>
            }
          >
            Your resume and portfolio create the context for the conversation. Make sure the work you present is accurate,
            understandable and supported by examples you can discuss.
          </SectionHeader>

          <ol aria-label="Resume, portfolio, interview" className="mt-10 flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch lg:gap-0">
            {LAYERS.map((l, i) => (
              <li key={l.name} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                <div
                  className={
                    "flex-1 rounded-2xl border p-6 " +
                    (i === LAYERS.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/15 bg-card")
                  }
                >
                  <span aria-hidden="true" className={"text-sm font-semibold tracking-widest " + (i === LAYERS.length - 1 ? "text-white/80" : "text-brand-green")}>
                    0{i + 1}
                  </span>
                  <h3 className={"mt-1 text-2xl font-semibold tracking-tight " + (i === LAYERS.length - 1 ? "text-white" : "text-foreground")}>{l.name}</h3>
                  <p className={"mt-1.5 text-base leading-relaxed " + (i === LAYERS.length - 1 ? "text-white/85" : "text-muted-foreground")}>{l.text}</p>
                </div>
                {i < LAYERS.length - 1 && <ChevronRight aria-hidden="true" className="mx-2 hidden size-6 shrink-0 text-primary/60 lg:block" />}
              </li>
            ))}
          </ol>

          <Link href="/careers-placement/portfolio-resume" className={LINK + " mt-6"}>
            Explore Portfolio &amp; Resume
            <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="ip-journey-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-14">
            <SectionHeader
              id="ip-journey-heading"
              eyebrow="Project to Conversation"
              title={
                <>
                  The Work You Build Becomes <span className={GRADIENT_TEXT}>the Stories You Can Tell.</span>
                </>
              }
            >
              The same practical path used across Techno Gurukul&rsquo;s learning ends with being able to explain what you
              made and why.
            </SectionHeader>

            <ol aria-label="From learning to explaining" className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
              {JOURNEY.map((step, i) => (
                <li key={step} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                  <span
                    className={
                      "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-3 py-3 text-center text-base font-semibold tracking-tight " +
                      (i === JOURNEY.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/20 bg-card text-foreground")
                    }
                  >
                    {step}
                  </span>
                  {i < JOURNEY.length - 1 && <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-primary/60 lg:block" />}
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-1">
              <Link href="/learning/how-we-teach" className={LINK}>
                Explore How We Teach
                <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/learning/projects" className={LINK}>
                Explore Projects
                <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ip-expectation-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="mx-auto max-w-3xl border-l-2 border-brand-green pl-5 sm:pl-8">
            <h2 id="ip-expectation-heading" className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">
              Preparation Improves Clarity. <span className={GRADIENT_TEXT}>It Does Not Guarantee an Outcome.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Interview preparation can help learners communicate their skills and experience more clearly, but interview
              outcomes depend on many factors, including the opportunity, the requirements of the role, the
              candidate&rsquo;s performance and the decisions of the organisation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
