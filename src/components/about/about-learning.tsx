import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, FileCheck2, FolderOpen, GraduationCap, Library, TrendingUp, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../learning/curriculum/section-header";

const DESTINATIONS: { title: string; text: string; href: string; Icon: LucideIcon }[] = [
  { title: "Curriculum", text: "Follow structured learning that builds knowledge progressively.", href: "/learning/curriculum", Icon: BookOpen },
  { title: "How We Teach", text: "Understand the practical teaching model behind the learning experience.", href: "/learning/how-we-teach", Icon: GraduationCap },
  { title: "Projects", text: "Apply learning and create work that can be explored and presented.", href: "/learning/projects", Icon: FolderOpen },
  { title: "Certifications", text: "Keep a record of completed learning and supporting evidence.", href: "/learning/certifications", Icon: BadgeCheck },
  { title: "Resources", text: "Continue learning beyond the core classroom experience.", href: "/learning/resources", Icon: Library },
];

const DIMENSIONS: { title: string; text: string; Icon: LucideIcon; height: string }[] = [
  { title: "Skills", text: "Develop practical capability.", Icon: Wrench, height: "lg:min-h-[13rem]" },
  { title: "Projects", text: "Apply those skills in meaningful work.", Icon: FolderOpen, height: "lg:min-h-[16rem]" },
  { title: "Portfolio Evidence", text: "Make the work visible and understandable.", Icon: FileCheck2, height: "lg:min-h-[19rem]" },
  { title: "Confidence", text: "Become more comfortable explaining, improving and applying what you know.", Icon: TrendingUp, height: "lg:min-h-[22rem]" },
];

/** Sections 5 and 6: the learning experience destinations, and what learners are encouraged to build. */
export function AboutLearning() {
  return (
    <>
      <section aria-labelledby="ab-experience-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="ab-experience-heading"
            eyebrow="The Learning Experience"
            title={
              <>
                A Structured Path From <span className={GRADIENT_TEXT}>Learning to Evidence.</span>
              </>
            }
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 xl:gap-5">
            {DESTINATIONS.map(({ title, text, href, Icon }, i) => (
              <li key={href} className={"min-w-0 " + (i < 2 ? "lg:col-span-3" : "lg:col-span-2") + (i === 4 ? " sm:max-lg:col-span-2" : "")}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5 sm:p-7">
                  <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-2 mb-6 text-base leading-relaxed text-muted-foreground">{text}</p>
                  <Link
                    href={href}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Explore {title}
                    <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Certifications record completed learning at Techno Gurukul. They do not imply external accreditation or employer
            recognition.
          </p>
        </div>
      </section>

      <section aria-labelledby="ab-build-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-end lg:gap-14">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                What Learners Are Encouraged to Build
              </div>
              <h2 id="ab-build-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Build More Than <span className={GRADIENT_TEXT}>Knowledge.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Each layer supports the next. Confidence is an intended part of the learning experience, not a guaranteed
                result.
              </p>
            </div>

            <ol aria-label="Skills, projects, portfolio evidence, confidence" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
              {DIMENSIONS.map(({ title, text, Icon, height }, i) => {
                const last = i === DIMENSIONS.length - 1;
                return (
                  <li
                    key={title}
                    className={
                      "flex flex-col justify-end rounded-2xl border p-5 sm:p-6 " +
                      height +
                      (last ? " border-transparent bg-gradient-to-br from-primary to-brand-green text-white" : " border-primary/15 bg-card")
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={"mb-auto flex size-10 items-center justify-center rounded-xl " + (last ? "bg-white/20 text-white" : "bg-primary/10 text-primary")}
                    >
                      <Icon className="size-5" />
                    </span>
                    <h3 className={"mt-6 text-xl font-semibold tracking-tight " + (last ? "text-white" : "text-foreground")}>{title}</h3>
                    <p className={"mt-1.5 text-base leading-relaxed " + (last ? "text-white/90" : "text-muted-foreground")}>{text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
