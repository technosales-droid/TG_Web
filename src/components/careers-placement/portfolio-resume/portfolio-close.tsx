import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const CERT_POINTS = [
  "Certificates can document learning or completion.",
  "Projects provide practical evidence.",
  "Documentation provides context.",
  "Portfolio presentation connects the pieces.",
];

const RESUME_CHECK = [
  "Clear contact information",
  "Relevant education",
  "Skills",
  "Selected projects",
  "Relevant experience",
  "Consistent formatting",
  "No unnecessary information",
];
const PORTFOLIO_CHECK = [
  "Clear introduction",
  "Selected projects",
  "Project context",
  "Your role",
  "Tools and process",
  "Final work",
  "Reflection and documentation",
  "Easy navigation",
];

function Checklist({ id, title, items }: { id: string; title: string; items: string[] }) {
  return (
    <article aria-labelledby={id} className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
      <h3 id={id} className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <ul className="mt-4 grid gap-1">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-3 border-t border-primary/10 py-3 text-base text-foreground first:border-t-0">
            <span aria-hidden="true" className="block size-5 shrink-0 rounded-md border-2 border-brand-green/60" />
            {it}
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Sections 12 and 13: certificate and project evidence, then the practical checklist. */
export function PortfolioClose() {
  return (
    <>
      <section aria-labelledby="pr-cert-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-8 rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-16 xl:px-14 xl:py-14">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Certification + Project Evidence
              </div>
              <h2 id="pr-cert-heading" className="mt-4 text-2xl font-semibold tracking-tight text-balance text-foreground min-[400px]:text-3xl sm:text-4xl">
                A Certificate Records Learning. <span className={GRADIENT_TEXT}>Your Work Shows What You Can Do.</span>
              </h2>
              <p className="mt-5 border-l-2 border-brand-green pl-4 text-base leading-relaxed text-foreground sm:text-lg">
                A certificate tells someone you completed a course. A portfolio shows them what you can do.
              </p>
            </div>
            <ul className="grid content-center gap-1">
              {CERT_POINTS.map((p) => (
                <li key={p} className="flex gap-3 border-t border-primary/15 py-4 text-base text-foreground first:border-t-0 sm:text-lg">
                  <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-brand-green" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="pr-checklist-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="pr-checklist-heading"
            eyebrow="Practical Checklist"
            title={
              <>
                Before You Share Them, <span className={GRADIENT_TEXT}>Check the Basics.</span>
              </>
            }
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Checklist id="pr-check-resume" title="Resume" items={RESUME_CHECK} />
            <Checklist id="pr-check-portfolio" title="Portfolio" items={PORTFOLIO_CHECK} />
          </div>
        </div>
      </section>
    </>
  );
}
