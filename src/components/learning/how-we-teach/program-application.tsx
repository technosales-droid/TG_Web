import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";
import { PROGRAM_LINKS } from "./how-we-teach-data";

// Brief on purpose: two program links. Their curriculum and content stay on their own pages.
export function ProgramApplication() {
  return (
    <section id="program-application" aria-labelledby="program-application-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="program-application-heading"
          eyebrow="Applied Across Programs"
          title={
            <>
              <span className="block">The Method Stays Consistent.</span>
              <span className={cn("block", GRADIENT_TEXT)}>The Skills Change.</span>
            </>
          }
        >
          The teaching approach remains practical across Techno Gurukul programs while the subjects, tools and projects
          change with the discipline.
        </SectionHeader>

        <ul className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-6">
          {PROGRAM_LINKS.map((p, i) => (
            <li key={p.href} className="min-w-0">
              <Link
                href={p.href}
                className="group flex h-full items-start gap-5 rounded-[2rem] border border-primary/10 bg-card p-6 shadow-[0_12px_28px_-22px_rgba(16,20,28,0.3)] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-safe:hover:-translate-y-1 sm:p-8"
              >
                <span aria-hidden="true" className={cn("mt-1.5 h-12 w-1.5 shrink-0 rounded-full", i === 0 ? "bg-primary" : "bg-brand-green")} />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase">Program</span>
                  <span className="mt-1 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{p.title}</h3>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-primary transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-2 block text-base leading-relaxed text-muted-foreground">{p.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
