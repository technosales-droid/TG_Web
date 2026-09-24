import type { ReactNode } from "react";
import { Clock } from "lucide-react";

export interface LegalSectionData {
  id: string;
  title: string;
  body: ReactNode;
}

/** Inline marker for a value the business still needs to confirm. Keep these visible in the
 * rendered page (not just in code comments) so an editor reviewing the live site catches every
 * one before publication. */
export function Tbc({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-primary">[{children}]</strong>;
}

/** Callout for a standalone notice inside a section (e.g. "this whole area is pending business
 * input"), distinct from the inline Tbc marker used mid-sentence. */
export function LegalNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/20 bg-accent/70 px-4 py-3.5 text-[15px] leading-relaxed text-foreground/90 sm:px-5">
      {children}
    </div>
  );
}

export function LegalLayout({
  eyebrow = "Legal",
  heading,
  description,
  lastUpdated,
  sections,
}: {
  eyebrow?: string;
  heading: string;
  description: string;
  lastUpdated: string;
  sections: LegalSectionData[];
}) {
  return (
    <main>
      <section className="px-4 pt-10 pb-6 sm:px-6 sm:pt-14 sm:pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-accent px-3 py-1 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
            {eyebrow}
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {heading}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock className="size-4" aria-hidden="true" />
            Last updated: {lastUpdated}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="mx-auto flex max-w-[1180px] justify-center gap-16">
          <nav
            aria-label="On this page"
            className="sticky top-28 hidden h-fit w-56 shrink-0 lg:block"
          >
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">On this page</p>
            <ol className="mt-4 space-y-1 border-l border-border">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:border-primary focus-visible:text-foreground focus-visible:outline-none"
                  >
                    <span className="leading-snug">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 max-w-[820px] flex-1">
            <div className="space-y-10">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-border pt-10 first:border-t-0 first:pt-0">
                  <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
