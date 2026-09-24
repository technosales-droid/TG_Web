import Link from "next/link";
import { ArrowRight, FolderOpen, Library } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const DESTINATIONS: { title: string; text: string; href: string; Icon: LucideIcon }[] = [
  { title: "Projects", text: "Apply learning and create work that can be explored and presented.", href: "/learning/projects", Icon: FolderOpen },
  { title: "Resources", text: "Continue learning beyond the core classroom experience.", href: "/learning/resources", Icon: Library },
];

/** The learning experience: where to go next. */
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

          <ul className="mt-10 grid gap-4 sm:grid-cols-3 xl:gap-5">
            {DESTINATIONS.map(({ title, text, href, Icon }) => (
              <li key={href} className="min-w-0">
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
        </div>
      </section>
    </>
  );
}
