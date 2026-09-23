import { BookOpen, FolderOpen, Hammer, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const CARDS: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Practical Skills", text: "Build skills through structured learning and hands-on practice.", Icon: BookOpen },
  { title: "Project Experience", text: "Apply concepts by working on practical projects.", Icon: Hammer },
  { title: "Portfolio Evidence", text: "Turn completed work into evidence of what you can actually do.", Icon: FolderOpen },
  {
    title: "Professional Preparation",
    text: "Learn how to present your skills through resumes, portfolios and interview preparation.",
    Icon: MessageSquare,
  },
];

export function CareerReadiness() {
  return (
    <section aria-labelledby="career-readiness-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="career-readiness-heading"
          eyebrow="Career Readiness"
          title={
            <>
              From Learning to <span className={cn(GRADIENT_TEXT)}>Career Readiness</span>
            </>
          }
        >
          Career preparation is more than completing a course. It is about building useful skills, applying them through
          projects and learning how to present your work with confidence.
        </SectionHeader>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {CARDS.map(({ title, text, Icon }, i) => (
            <li key={title} className="relative flex flex-col rounded-2xl border border-primary/15 bg-card p-6 xl:p-7">
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-semibold tracking-widest text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{text}</p>
              <span aria-hidden="true" className="mt-5 block h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-brand-green" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
