import Link from "next/link";
import { ArrowRight, Briefcase, BookOpen, FolderOpen, GraduationCap, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const AREAS: { title: string; text: string; href?: string; linkText?: string; Icon: LucideIcon }[] = [
  { title: "Curriculum", text: "Learning should have structure and progression.", href: "/learning/curriculum", linkText: "Explore Curriculum", Icon: BookOpen },
  { title: "Practice", text: "Learners should have opportunities to apply concepts.", href: "/learning/how-we-teach", linkText: "Explore How We Teach", Icon: GraduationCap },
  { title: "Projects", text: "Learning should produce practical work.", href: "/learning/projects", linkText: "Explore Projects", Icon: FolderOpen },
  { title: "Feedback", text: "Improvement should be part of the process.", Icon: MessageSquare },
  { title: "Career Context", text: "Learners should understand where their skills can be applied.", Icon: Briefcase },
];

/** Section 4: the mission in practice, five areas that shape the actual learning experience. */
export function MissionPractice() {
  return (
    <section aria-labelledby="ms-practice-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="ms-practice-heading"
          eyebrow="Mission in Practice"
          title={
            <>
              A Mission Only Matters When It <span className={GRADIENT_TEXT}>Shapes the Learning Experience.</span>
            </>
          }
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5 xl:gap-5">
          {AREAS.map(({ title, text, href, linkText, Icon }) => (
            <li key={title} className="min-w-0">
              <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6">
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-2 mb-6 text-base leading-relaxed text-muted-foreground">{text}</p>
                {href && (
                  <Link
                    href={href}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {linkText}
                    <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                )}
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Career context is about understanding possible directions, not a promise of a particular job or outcome.
        </p>
        <Link
          href="/careers-placement"
          className="group mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Explore Careers &amp; Placement
          <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
