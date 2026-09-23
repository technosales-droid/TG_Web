import Link from "next/link";
import { BookOpen, CalendarDays, ChevronRight, FolderOpen, MonitorPlay, Search, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

// `outline-solid` matters: the shared button style sets `outline-none`, which would otherwise cancel the ring.
const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-background focus-visible:ring-0";

const SOURCES: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Projects", text: "Build realistic or practical work.", Icon: FolderOpen },
  { title: "Case Studies", text: "Analyse how real-world problems and solutions are approached.", Icon: BookOpen },
  { title: "Demonstrations", text: "Observe how tools or workflows are used.", Icon: MonitorPlay },
  {
    title: "Practitioner Perspectives",
    text: "Learn from people with relevant experience when such opportunities are available.",
    Icon: UserRound,
  },
  { title: "Events & Sessions", text: "Engage with talks, workshops or professional discussions where appropriate.", Icon: CalendarDays },
  { title: "Research & Exploration", text: "Follow credible industry developments and emerging practices.", Icon: Search },
];

const PROGRESSION = [
  { name: "Learn", text: "Understand the concepts." },
  { name: "Practise", text: "Strengthen them through repetition." },
  { name: "Build", text: "Apply them in projects." },
  { name: "Observe", text: "See how professional work is approached." },
  { name: "Understand", text: "Identify patterns, expectations and trade-offs." },
  { name: "Adapt", text: "Use what you learn to improve your own work." },
];

/** Sections 5 and 6: where exposure can come from, and the learn-to-adapt progression (dark panel). */
export function IndustryExposure() {
  return (
    <>
      <section aria-labelledby="ic-sources-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 xl:grid-cols-2 xl:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Learning Beyond the Classroom
              </div>
              <h2 id="ic-sources-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Exposure Can Come From <span className={GRADIENT_TEXT}>More Than One Place.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Learners can build an understanding of industry in several ways. These can include the routes below. Not
                every route is available in every programme, and many can also be explored independently.
              </p>
            </div>

            <ul className="grid gap-x-10 sm:grid-cols-2">
              {SOURCES.map(({ title, text, Icon }) => (
                <li key={title} className="flex gap-4 border-t border-primary/15 py-6">
                  <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="ic-progression-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              From Learning to Professional Context
            </div>
            <h2 id="ic-progression-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
              Connect What You Learn With{" "}
              <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">How Work Happens.</span>
            </h2>

            <ol aria-label="Learn, practise, build, observe, understand, adapt" className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-6 xl:gap-5">
              {PROGRESSION.map((s, i) => (
                <li key={s.name} className="relative rounded-2xl border border-background/20 bg-background/10 p-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold",
                      i === PROGRESSION.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-background/60 text-background"
                    )}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-background">{s.name}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-background/75">{s.text}</p>
                  {i < PROGRESSION.length - 1 && (
                    <ChevronRight aria-hidden="true" className="absolute top-1/2 -right-[18px] z-10 hidden size-4 -translate-y-1/2 text-background/70 xl:block" />
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/learning/how-we-teach"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-12 w-full rounded-full bg-background px-6 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto",
                  FOCUS
                )}
              >
                Explore How We Teach
              </Link>
              <Link
                href="/learning/projects"
                className={cn(
                  "group inline-flex h-12 w-full items-center justify-center gap-1 rounded-full border-2 border-background/60 px-6 text-base font-medium text-background transition-all duration-200 hover:-translate-y-0.5 hover:border-background hover:bg-background/10 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto",
                  FOCUS
                )}
              >
                Explore Project Work
                <ChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
