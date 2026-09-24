import { Check, ChevronDown } from "lucide-react";
import { cn } from "cn";
import type { CourseDetail } from "@/data/course-details";

// Dense, information-first blocks: a heading, then the content, separated by hairlines rather than big sections.
// A block with no data shows a plain "will be added" note instead of inventing content.
export function Block({ id, title, hint, children }: { id?: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className="scroll-mt-24 border-t border-primary/15 py-10 first:border-t-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id={id ? `${id}-h` : undefined} className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        {hint && <p className="text-sm font-medium text-muted-foreground">{hint}</p>}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-primary/25 bg-muted/40 px-5 py-6 text-base text-muted-foreground">{children}</p>;
}

const CHIP = "rounded-full border border-primary/20 bg-card px-3.5 py-1.5 text-sm font-medium text-foreground";

export function CourseBody({ course: c }: { course: CourseDetail }) {
  const lessonCount = c.curriculum.reduce((n, m) => n + m.lessons.length, 0);
  const curriculumHint = [
    c.curriculum.length ? `${c.curriculum.length} modules` : "",
    lessonCount ? `${lessonCount} lessons` : "",
  ].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto max-w-[1350px] px-4 sm:px-6 xl:px-14">
      <Block id="learn" title="What you'll learn">
        {c.learningOutcomes.length ? (
          <ul className="grid gap-x-10 gap-y-3 rounded-3xl border border-primary/15 bg-card p-6 sm:grid-cols-2 sm:p-8">
            {c.learningOutcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 text-base text-foreground">
                <Check className="mt-0.5 size-5 shrink-0 text-brand-green" aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>
        ) : (
          <Empty>What you will learn will be added here.</Empty>
        )}
      </Block>

      <Block id="skills" title="Skills you'll build">
        {c.skills.length ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {c.skills.map((g) => (
              <div key={g.group}>
                <h3 className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">{g.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className={CHIP}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <Empty>The skills this course builds will be added here.</Empty>
        )}
      </Block>

      <Block id="tools" title="Tools & software">
        {c.tools.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {c.tools.map((t) => (
              <li key={t.name} className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-card px-4 py-3.5">
                <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">{t.name.charAt(0)}</span>
                <span className="text-sm font-semibold text-foreground">{t.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>The tools and software covered will be added here.</Empty>
        )}
      </Block>

      <Block id="projects" title="Projects you'll build">
        {c.projects.length ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {c.projects.map((p, i) => (
              <li key={p.title} className="rounded-3xl border border-primary/15 bg-card p-6">
                <p className="text-sm font-semibold tracking-[0.2em] text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.description}</p>
                {p.skills?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.skills.map((s) => (
                      <li key={s} className={CHIP}>{s}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <Empty>The projects you will build will be added here.</Empty>
        )}
      </Block>

      <Block id="curriculum" title="Course curriculum" hint={curriculumHint || undefined}>
        {c.curriculum.length ? (
          <div className="overflow-hidden rounded-3xl border border-primary/15 bg-card">
            {c.curriculum.map((m, i) => (
              <details key={m.title} open={i === 0} className="group border-b border-primary/15 last:border-b-0">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-semibold text-foreground">
                    <span className="mr-2 text-primary tabular-nums">Module {String(i + 1).padStart(2, "0")}</span>
                    {m.title}
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
                    {m.duration && <span>{m.duration}</span>}
                    {m.lessons.length > 0 && <span>{m.lessons.length} lessons</span>}
                    <ChevronDown className="size-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                  </span>
                </summary>
                <div className="bg-muted/40 px-5 py-4 sm:px-6">
                  {m.lessons.length ? (
                    <ul className="grid gap-2.5">
                      {m.lessons.map((l) => (
                        <li key={l.title} className="flex items-start justify-between gap-4 text-base text-foreground">
                          <span>{l.title}{l.preview && <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">Preview</span>}</span>
                          {l.duration && <span className="shrink-0 text-sm text-muted-foreground">{l.duration}</span>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base leading-relaxed text-muted-foreground">{m.summary ?? "Lessons for this module will be added here."}</p>
                  )}
                </div>
              </details>
            ))}
          </div>
        ) : (
          <Empty>The curriculum will be added here.</Empty>
        )}
      </Block>

      <Block id="method" title="How you'll learn">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]">
          {c.learningMethod.map((s, i) => (
            <li key={s.title} className="border-t-2 border-primary/25 pt-4">
              <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">{s.title}</p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.text}</p>
              {i < c.learningMethod.length - 1 && <span className="sr-only">, then</span>}
            </li>
          ))}
        </ol>
      </Block>

      <Block id="requirements" title="Requirements">
        {c.requirements.length ? (
          <ul className="grid gap-2.5 text-base text-foreground">
            {c.requirements.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Requirements will be added here.</Empty>
        )}
      </Block>

      <Block id="audience" title="Who this course is for">
        {c.audience.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.audience.map((a) => (
              <li key={a.title} className="rounded-2xl border border-primary/15 bg-card p-5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{a.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{a.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Who this course is for will be added here.</Empty>
        )}
      </Block>

      <Block id="careers" title="Where can this take you?">
        {c.careerPaths.length ? (
          <>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.careerPaths.map((p) => (
                <li key={p.title} className="rounded-2xl border border-primary/15 bg-card p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{p.title}</h3>
                  {p.text && <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{p.text}</p>}
                </li>
              ))}
            </ul>
            {c.careerProgression.length > 0 && (
              <ol className="mt-6 flex flex-wrap items-center gap-2">
                {c.careerProgression.map((s, i) => (
                  <li key={s} className={cn("flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold", i === c.careerProgression.length - 1 ? "border-transparent bg-primary text-white" : "border-primary/20 text-foreground")}>{s}</li>
                ))}
              </ol>
            )}
          </>
        ) : (
          <Empty>Career directions for this course will be added here.</Empty>
        )}
      </Block>
    </div>
  );
}
