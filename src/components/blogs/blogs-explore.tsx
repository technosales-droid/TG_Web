import Link from "next/link";
import { ArrowRight, Compass, GraduationCap, Info, LayoutGrid } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../learning/curriculum/section-header";

const CARDS: { title: string; text: string; href: string; Icon: LucideIcon }[] = [
  { title: "Programs", text: "See the current programme directions and what each one covers.", href: "/programs", Icon: LayoutGrid },
  { title: "Learning", text: "Understand how the learning experience is structured.", href: "/learning", Icon: GraduationCap },
  { title: "Careers & Placement", text: "Explore career directions and how to prepare for them.", href: "/careers-placement", Icon: Compass },
  { title: "About Techno Gurukul", text: "Understand the institute's approach and philosophy.", href: "/about", Icon: Info },
];

/** A self-service path while the Blogs content library is still empty. */
export function BlogsExplore() {
  return (
    <section aria-labelledby="bl-explore-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="bl-explore-heading"
          eyebrow="In the Meantime"
          title={
            <>
              Explore Techno Gurukul <span className={GRADIENT_TEXT}>While You Wait.</span>
            </>
          }
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {CARDS.map(({ title, text, href, Icon }) => (
            <li key={href} className="min-w-0">
              <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5">
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
  );
}
