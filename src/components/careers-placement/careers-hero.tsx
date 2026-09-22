import Link from "next/link";
import { Building2, ChevronRight, FileText, FolderOpen, Layers, MessageSquare, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "../learning/curriculum/section-header";

const STAGES = ["Learn", "Practise", "Build", "Prepare", "Explore"];

// The six things that surround a learner's work. Labels only: no numbers, companies, offers or salaries.
const AREAS: { label: string; Icon: LucideIcon }[] = [
  { label: "Skills", Icon: Wrench },
  { label: "Projects", Icon: Layers },
  { label: "Portfolio", Icon: FolderOpen },
  { label: "Resume", Icon: FileText },
  { label: "Interviews", Icon: MessageSquare },
  { label: "Industry", Icon: Building2 },
];

// Abstract career-readiness workspace: one central piece of work with the things that support it around it.
// Every shape is decorative; the stage list and area labels are real text.
function ReadinessVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[2rem] border border-primary/10 bg-card p-4 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] sm:p-6">
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary/25" />
          <span className="size-2.5 rounded-full bg-brand-green/40" />
          <span className="ml-2 h-2.5 w-28 rounded-full bg-primary/15" />
        </div>

        <ol aria-label="From learning to career opportunities" className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {STAGES.map((stage, i) => (
            <li
              key={stage}
              className={cn(
                "flex items-center justify-center rounded-full border px-2 py-1.5 text-xs font-semibold sm:text-[13px]",
                i < 3 ? "border-brand-green/30 bg-brand-green/10 text-foreground" : "border-dashed border-primary/25 text-muted-foreground"
              )}
            >
              {stage}
            </li>
          ))}
        </ol>

        {/* The central piece of work */}
        <div aria-hidden="true" className="mt-5 rounded-2xl border border-primary/15 bg-background p-4">
          <div className="flex items-center gap-3">
            <span className="size-10 shrink-0 rounded-xl bg-gradient-to-br from-primary/40 to-brand-green/50" />
            <div className="grid flex-1 gap-2">
              <span className="block h-2.5 w-2/5 rounded-full bg-primary/35" />
              <span className="block h-2 w-3/5 rounded-full bg-primary/15" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <span className="h-14 rounded-lg bg-primary/15 sm:h-16" />
            <span className="h-14 rounded-lg bg-brand-green/25 sm:h-16" />
            <span className="h-14 rounded-lg bg-primary/10 sm:h-16" />
          </div>
        </div>

        {/* What supports it */}
        <ul aria-label="What supports career readiness" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {AREAS.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-2.5 rounded-xl border border-primary/10 bg-muted/60 px-3 py-2.5">
              <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CareersHero() {
  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:min-h-[600px] xl:px-16 xl:py-14">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[48%] xl:block">
            <div className="absolute inset-0 bg-brand-green/10 [clip-path:polygon(14%_0%,100%_0%,100%_100%,0%_100%)]" />
            <div className="absolute inset-0 bg-primary/8 [clip-path:polygon(0%_100%,55%_100%,100%_55%,100%_100%)]" />
          </div>

          <div className="relative grid items-center gap-10 xl:min-h-[480px] xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Careers &amp; Placement
              </div>
              <h1 className="mt-4 max-w-3xl text-[2rem] leading-[1.12] font-semibold tracking-tight text-balance text-foreground min-[400px]:text-4xl sm:text-5xl xl:text-[2.75rem]">
                <span className="block">Build Skills.</span>
                <span className={cn("block", GRADIENT_TEXT)}>Prepare for What Comes Next.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Learning becomes more valuable when you know how to turn it into practical work, a stronger portfolio and
                greater career readiness.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/learning"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                  )}
                >
                  Explore Learning
                </Link>
                <Link
                  href="/programs"
                  className="group flex min-h-11 items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Explore Programs
                  <ChevronRight
                    className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <ReadinessVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
