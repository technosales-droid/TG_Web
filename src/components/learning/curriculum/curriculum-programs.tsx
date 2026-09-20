import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { PROGRAM_LINKS } from "./curriculum-data";
import { GRADIENT_TEXT, SectionHeader } from "./section-header";

// Bridge to program pages. Program links only: no curriculum modules, courses or invented detail.
export function CurriculumPrograms() {
  return (
    <section id="curriculum-programs" aria-labelledby="curriculum-programs-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="curriculum-programs-heading"
          eyebrow="Explore by Program"
          title={
            <>
              Go Deeper Into <span className={cn("inline-block", GRADIENT_TEXT)}>a Specific Program.</span>
            </>
          }
        >
          Every program applies the same practical learning philosophy to its own subject area, with curriculum
          details tailored to the skills, tools and projects involved.
        </SectionHeader>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:gap-6">
          {PROGRAM_LINKS.map((p, i) => (
            <li key={p.href} className="min-w-0">
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-[2rem] border border-primary/10 bg-card p-6 shadow-[0_12px_28px_-22px_rgba(16,20,28,0.3)] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-safe:hover:-translate-y-1 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className={cn("h-1.5 w-16 rounded-full", i === 0 ? "bg-primary" : "bg-brand-green")}
                />
                <span className="mt-5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Program</span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{p.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 pt-2 text-base font-semibold text-primary lg:mt-auto">
                  {p.cta}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
