import Link from "next/link";
import { ArrowRight, BarChart3, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const PROGRAMS: { title: string; Icon: LucideIcon; themes: string[]; href: string }[] = [
  { title: "Digital Marketing", Icon: BarChart3, themes: ["Strategy", "Content", "Campaigns", "Analytics", "Communication"], href: "/programs/tg-digital-marketing" },
  { title: "Game Development & Design", Icon: Gamepad2, themes: ["Development", "Design", "Art", "Animation", "Technical workflows"], href: "/programs/tg-gameforge" },
];

/** Section 9: why different learners need different paths, using the current active programme areas. */
export function WhyDirections() {
  return (
    <section aria-labelledby="wt-directions-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="wt-directions-heading"
          eyebrow="Different Directions"
          title={
            <>
              There Is More Than <span className={GRADIENT_TEXT}>One Useful Direction.</span>
            </>
          }
        >
          Learners can develop toward different kinds of work. The two current programme areas below are broad examples,
          not the limit of where practical learning can apply.
        </SectionHeader>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {PROGRAMS.map(({ title, Icon, themes, href }) => (
            <article key={href} className="flex flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-card">
              <div aria-hidden="true" className="relative flex h-24 items-center bg-gradient-to-br from-primary/15 via-brand-green/10 to-transparent px-6 sm:h-28 sm:px-8">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand-green text-white shadow-lg">
                  <Icon className="size-6" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {themes.map((t) => (
                    <li key={t} className="rounded-full border border-primary/20 bg-muted/60 px-3.5 py-1.5 text-sm font-medium text-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className="group mt-8 inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Explore {title}
                  <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
