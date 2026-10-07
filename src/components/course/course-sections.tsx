import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Layers, Star } from "lucide-react";
import { Media } from "./media";
import { COURSE_DETAILS, relatedOf, type CourseDetail } from "@/data/course-details";
import { FACULTY } from "@/data/institute";
import { CurriculumAccordion, ExpandableText } from "./course-client";
import { INCLUDE_ICON } from "./include-icon";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// Dense, platform-style blocks: a bold heading and the content, with no large marketing padding.
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 py-7">
      <h2 id={`${id}-h`} className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="border border-dashed border-primary/25 bg-muted/40 px-4 py-5 text-base text-muted-foreground">{children}</p>;
}

function CourseThumb({ course, className }: { course: CourseDetail; className: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden bg-gradient-to-br from-[#0d5674] to-primary ${className}`}>
      {course.heroImage ? (
        <Image src={course.heroImage} alt="" fill sizes="160px" className="object-cover" />
      ) : (
        <Layers aria-hidden="true" className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-white/40" />
      )}
    </div>
  );
}

const instructorOf = (c: CourseDetail) => (c.instructor ? FACULTY.find((f) => f.slug === c.instructor?.facultySlug) : undefined);

export function CourseMain({ course: c }: { course: CourseDetail }) {
  const related = relatedOf(c);
  const shown = new Set([c.slug, ...related.map((r) => r.slug)]);
  const more = COURSE_DETAILS.filter((x) => !shown.has(x.slug));
  const instructor = instructorOf(c);

  return (
    <div className="divide-y divide-primary/15">
      {/* What you'll learn (or, for a program whose own source document names it that, Career Outcomes) */}
      <Section id="learn" title={c.outcomesHeading ?? "What you'll learn"}>
        {c.learningOutcomes.length ? (
          <ul className="grid gap-x-8 gap-y-3 border border-primary/20 p-5 sm:grid-cols-2 sm:p-6">
            {c.learningOutcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 text-base text-foreground">
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>
        ) : (
          <Empty>What you will learn will be added here.</Empty>
        )}
      </Section>

      {/* Explore related topics */}
      <Section id="topics" title="Explore related topics">
        {c.topics.length ? (
          <ul className="flex flex-wrap gap-2">
            {c.topics.map((t) => (
              <li key={t} className="border border-primary/40 px-3.5 py-2 text-sm font-semibold text-foreground">{t}</li>
            ))}
          </ul>
        ) : (
          <Empty>Related topics will be added here.</Empty>
        )}
      </Section>

      {/* This course includes */}
      <Section id="includes" title="This course includes:">
        {c.includes.length ? (
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {c.includes.map(({ label, icon }) => {
              const Icon = INCLUDE_ICON[icon];
              return (
                <li key={label} className="flex items-start gap-3 text-base text-foreground">
                  <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  {label}
                </li>
              );
            })}
          </ul>
        ) : (
          <Empty>What the course includes will be added here.</Empty>
        )}
      </Section>

      {/* Course content */}
      <Section id="content" title="Course content">
        {c.curriculum.length ? <CurriculumAccordion modules={c.curriculum} unitLabel={c.curriculumUnitLabel} /> : <Empty>The course content will be added here.</Empty>}
      </Section>

      {/* Practical learning: the site's own learning-journey stages, restated with this program's detail. */}
      {c.practicalLearningStages && c.practicalLearningStages.length > 0 && (
        <Section id="practical-learning" title="Practical Learning">
          <ol className="grid gap-4 sm:grid-cols-5">
            {c.practicalLearningStages.map((s) => (
              <li key={s.title} className="border border-primary/20 p-4">
                <p className="text-base font-semibold text-primary">{s.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Specialization paths, e.g. a choice of game engine, for programs where students choose one. */}
      {c.specializationPaths && c.specializationPaths.length > 0 && (
        <Section id="specialization" title="Choose Your Path">
          <div className="grid gap-4 sm:grid-cols-2">
            {c.specializationPaths.map((p) => (
              <div key={p.name} className="border border-primary/20 p-5">
                <p className="text-lg font-semibold text-foreground">{p.name}</p>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{p.tagline}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-full border border-primary/30 px-3 py-1 text-sm font-medium text-foreground">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Project-based learning: named project categories, each a short list of what students work with. */}
      {c.projectTracks && c.projectTracks.length > 0 && (
        <Section id="projects" title="Project-Based Learning">
          <ul className="grid gap-4 sm:grid-cols-2">
            {c.projectTracks.map((p) => (
              <li key={p.title} className="border border-primary/20 p-4">
                <p className="text-base font-semibold text-foreground">{p.title}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Tools & technologies, grouped by category. */}
      {c.toolsByCategory && c.toolsByCategory.length > 0 && (
        <Section id="tools" title="Tools & Technologies">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.toolsByCategory.map((g) => (
              <div key={g.category}>
                <p className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">{g.category}</p>
                <ul className="mt-2 grid gap-1">
                  {g.items.map((item) => (
                    <li key={item} className="text-base text-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Career directions: potential roles, never a placement or salary guarantee. */}
      {c.careerDirections && c.careerDirections.length > 0 && (
        <Section id="career" title="Career Directions">
          <p className="text-sm text-muted-foreground">Potential directions a portfolio from this program can support. Not a placement or job guarantee.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.careerDirections.map((role) => (
              <li key={role} className="border border-primary/40 px-3.5 py-2 text-sm font-semibold text-foreground">{role}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Salary expectations: only ever a hedged market range with its own caveat, never a promise. */}
      {c.salaryNote && (
        <Section id="salary" title="Salary Expectations">
          <p className="max-w-3xl text-base leading-relaxed text-foreground">{c.salaryNote}</p>
        </Section>
      )}

      {/* Portfolio: what a graduate can show for it. */}
      {c.portfolioNote && (
        <Section id="portfolio" title="Portfolio">
          <p className="max-w-3xl text-base leading-relaxed text-foreground">{c.portfolioNote}</p>
        </Section>
      )}

      {/* Practical Learning Model: only set for programs whose own source document defines one. */}
      {c.practicalLearningModel && (
        <Section id="practical-learning" title="Practical Learning Model">
          <div className="grid gap-4 sm:grid-cols-3">
            {c.practicalLearningModel.split.map((s) => (
              <div key={s.label} className="border border-primary/20 p-5">
                <p className="text-3xl font-semibold text-primary">{s.percent}%</p>
                <p className="mt-1 text-base text-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <ul className="mt-5 grid gap-2 text-base text-foreground">
            {c.practicalLearningModel.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                {p}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Live Projects & Capstone: only set for programs whose own source document names project tracks. */}
      {c.liveProjects && c.liveProjects.length > 0 && (
        <Section id="live-projects" title="Live Projects & Capstone">
          <p className="text-sm text-muted-foreground">(As per the candidate and the situation)</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {c.liveProjects.map((p) => (
              <li key={p.title} className="border border-primary/20 p-4">
                <p className="text-base font-semibold text-foreground">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.sequence}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Requirements */}
      <Section id="requirements" title="Requirements">
        {c.requirements.length ? (
          <ul className="grid gap-2 text-base text-foreground">
            {c.requirements.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                {r}
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Requirements will be added here.</Empty>
        )}
      </Section>

      {/* Description */}
      <Section id="description" title="Description">
        <ExpandableText paragraphs={c.longDescription} />
      </Section>

      {/* Explore related programs */}
      {related.length > 0 && (
        <Section id="related" title="Explore related programs">
          <ul className="border border-primary/20">
            {related.map((r) => (
              <li key={r.slug} className="border-b border-primary/20 last:border-b-0">
                <Link href={`/programs/${r.slug}`} className={`group flex items-center gap-4 p-4 hover:bg-muted/50 ${FOCUS}`}>
                  <CourseThumb course={r} className="size-16 sm:h-16 sm:w-28" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-foreground group-hover:text-primary">{r.title}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {[instructorOf(r)?.name, r.level, r.duration, r.projectsCount !== undefined ? `${r.projectsCount} projects` : ""].filter(Boolean).join(" · ") || r.category}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Instructor */}
      <Section id="instructor" title="Instructor">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-full">
            <Media item={instructor?.media ?? { kind: "image", src: null, label: "Instructor" }} compact sizes="112px" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-primary">{instructor?.name ?? "Instructor to be announced"}</h3>
            <p className="text-base text-muted-foreground">{instructor?.designation ?? "Instructor details will be added here."}</p>
            {instructor && (
              <dl className="mt-3 grid gap-1.5 text-sm text-foreground">
                {instructor.expertise && <div><dt className="inline font-semibold">Expertise: </dt><dd className="inline">{instructor.expertise}</dd></div>}
                {instructor.experience && <div><dt className="inline font-semibold">Experience: </dt><dd className="inline">{instructor.experience}</dd></div>}
                {instructor.projects?.length ? <div><dt className="inline font-semibold">Projects: </dt><dd className="inline">{instructor.projects.join(", ")}</dd></div> : null}
                {instructor.certifications?.length ? <div><dt className="inline font-semibold">Certifications: </dt><dd className="inline">{instructor.certifications.join(", ")}</dd></div> : null}
              </dl>
            )}
            {instructor?.bio && <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground">{instructor.bio}</p>}
            {instructor?.links?.length ? (
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {instructor.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold text-primary underline ${FOCUS}`}>
                      {l.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Learner feedback */}
      <Section id="reviews" title="Learner feedback">
        {c.reviews.length ? (
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {c.reviews.map((r) => (
              <li key={`${r.name}-${r.date ?? r.text}`} className="border-t border-primary/15 pt-4">
                <p className="font-semibold text-foreground">{r.name}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span aria-label={`${r.rating} out of 5`} className="flex">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`size-3.5 ${n <= r.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/40"}`} aria-hidden="true" />
                    ))}
                  </span>
                  {r.date}
                </p>
                <p className="mt-2 text-base leading-relaxed text-foreground">{r.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Learner reviews will appear here once real feedback has been collected. Nothing on this page is a rating or a review.</Empty>
        )}
      </Section>

      {/* More programs */}
      {more.length > 0 && (
        <Section id="more" title="More programs at Techno Gurukul">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/programs/${m.slug}`} className={`group block h-full border border-primary/20 hover:border-primary/50 ${FOCUS}`}>
                  <CourseThumb course={m} className="aspect-video w-full" />
                  <span className="block p-4">
                    <span className="block text-base font-semibold text-foreground group-hover:text-primary">{m.title}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{[m.category, m.duration].filter(Boolean).join(" · ")}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
