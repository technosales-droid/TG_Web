import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const RESUME_CAN = ["Skills", "Education", "Projects", "Relevant experience", "Tools and technologies", "Contact information"];
const PORTFOLIO_CAN = [
  "Projects",
  "Screenshots or media, where appropriate",
  "Process",
  "Documentation",
  "Outcomes, where genuinely measurable",
  "Reflections",
  "Supporting evidence",
];

const PRINCIPLES = [
  { title: "Clear", text: "Use straightforward language." },
  { title: "Relevant", text: "Prioritise information connected to the opportunity." },
  { title: "Specific", text: "Describe projects, responsibilities and skills concretely." },
  { title: "Structured", text: "Use consistent headings and formatting." },
  { title: "Evidence-Based", text: "Support claims with actual projects, experience or learning." },
  { title: "Current", text: "Keep skills, projects and experience updated." },
];

const STRUCTURE = [
  { name: "Header", text: "Name and appropriate contact details." },
  { name: "Education", text: "Relevant academic or learning background." },
  { name: "Skills", text: "Tools, technologies and capabilities relevant to the direction." },
  { name: "Projects", text: "Selected practical work." },
  { name: "Experience", text: "Relevant internship, work or responsibility where applicable." },
  { name: "Additional Information", text: "Only useful details that strengthen understanding of the candidate." },
];

/** Sections 2, 3 and 4: resume vs portfolio, what makes a resume clear, and a resume structure. */
export function PortfolioBasics() {
  return (
    <>
      <section aria-labelledby="pr-compare-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="pr-compare-heading"
            eyebrow="Two Different Jobs"
            title={
              <>
                Your Resume and Portfolio <span className={GRADIENT_TEXT}>Work Together.</span>
              </>
            }
          >
            Your resume tells people where to look. Your portfolio gives them something to see.
          </SectionHeader>

          <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-primary/15 lg:grid-cols-2">
            <article aria-labelledby="pr-resume-title" className="bg-card p-6 sm:p-8">
              <p className="text-sm font-semibold tracking-widest text-primary uppercase">Resume</p>
              <h3 id="pr-resume-title" className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                Help someone understand your background quickly.
              </h3>
              <p className="mt-4 text-sm font-semibold tracking-widest text-muted-foreground uppercase">Can include</p>
              <ul className="mt-2 grid gap-2">
                {RESUME_CAN.map((r) => (
                  <li key={r} className="flex gap-2.5 text-base text-foreground">
                    <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {r}
                  </li>
                ))}
              </ul>
            </article>

            <article aria-labelledby="pr-portfolio-title" className="border-t border-primary/15 bg-muted/60 p-6 sm:p-8 lg:border-t-0 lg:border-l">
              <p className="text-sm font-semibold tracking-widest text-brand-green uppercase">Portfolio</p>
              <h3 id="pr-portfolio-title" className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                Give someone enough evidence to understand the quality and context of your work.
              </h3>
              <p className="mt-4 text-sm font-semibold tracking-widest text-muted-foreground uppercase">Can include</p>
              <ul className="mt-2 grid gap-2">
                {PORTFOLIO_CAN.map((p) => (
                  <li key={p} className="flex gap-2.5 text-base text-foreground">
                    <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-brand-green" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="pr-clear-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="pr-clear-heading"
            eyebrow="Resume"
            title={
              <>
                Make the Important Information <span className={GRADIENT_TEXT}>Easy to Find.</span>
              </>
            }
          />
          <ul className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="border-t-2 border-primary/25 pt-4">
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pr-structure-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Resume Structure
              </div>
              <h2 id="pr-structure-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl">
                A Simple Order <span className={GRADIENT_TEXT}>Readers Can Follow.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                A common way to lay out a resume. Not every learner needs professional experience to use it.
              </p>
            </div>

            {/* A resume-like page: sections as ruled rows down a document */}
            <ol className="rounded-[2rem] border border-primary/15 bg-card p-5 sm:p-8">
              {STRUCTURE.map((s) => (
                <li key={s.name} className="grid gap-x-4 border-t border-primary/10 py-4 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr]">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{s.name}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground sm:mt-0">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
