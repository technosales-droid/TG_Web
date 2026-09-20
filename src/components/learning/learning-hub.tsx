import Link from "next/link";
import { ArrowUpRight, Award, Compass, FolderOpen, LayoutList, Library } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";

// Navigation destinations only. Detail lives on the dedicated pages, so keep descriptions short and
// make no claims about accreditation, recognition or approval.
const DESTINATIONS: {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  featured?: boolean;
  /** Placement in the desktop bento grid (12 columns). */
  span: string;
}[] = [
  {
    title: "Curriculum",
    description:
      "Explore what students learn, how topics are organised and how learning progresses across a program.",
    href: "/learning/curriculum",
    cta: "Explore Curriculum",
    icon: LayoutList,
    featured: true,
    span: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  },
  {
    title: "How We Teach",
    description:
      "Understand the teaching approach behind practical learning, hands-on work and project-based development.",
    href: "/learning/how-we-teach",
    cta: "See How We Teach",
    icon: Compass,
    span: "lg:col-span-5",
  },
  {
    title: "Projects",
    description: "Explore the kinds of projects students can build as they turn knowledge into practical work.",
    href: "/learning/projects",
    cta: "Explore Projects",
    icon: FolderOpen,
    span: "lg:col-span-5",
  },
  {
    title: "Certifications",
    description:
      "Learn about the certificates and completion recognition associated with Techno Gurukul learning.",
    href: "/learning/certifications",
    cta: "Explore Certifications",
    icon: Award,
    span: "lg:col-span-6",
  },
  {
    title: "Resources",
    description:
      "Access useful guides, learning material and supporting resources that help students continue learning beyond the classroom.",
    href: "/learning/resources",
    cta: "Explore Resources",
    icon: Library,
    span: "lg:col-span-6",
  },
];

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

// Abstract outline of a structured program (decorative).
function CurriculumSketch() {
  return (
    <div aria-hidden="true" className="mt-8 grid gap-2.5 lg:mt-auto lg:pt-8">
      {[
        ["w-3/4", "bg-background/35"],
        ["w-2/3", "bg-background/25"],
        ["w-4/5", "bg-background/30"],
        ["w-1/2", "bg-brand-green/60"],
      ].map(([w, tone], i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="size-2.5 shrink-0 rounded-full bg-background/50" />
          <span className={cn("h-2.5 rounded-full", w, tone)} />
        </div>
      ))}
    </div>
  );
}

export function LearningHub() {
  return (
    <section id="learning-hub" aria-labelledby="learning-hub-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Explore the Learning System
          </div>
          <h2
            id="learning-hub-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            Everything You Need to Keep Learning.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore the curriculum, practical projects, teaching approach, certifications and learning resources that
            support the Techno Gurukul experience.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-12 lg:gap-6">
          {DESTINATIONS.map((d, i) => {
            const Icon = d.icon;
            return (
              <li key={d.href} className={cn("min-w-0", d.span)}>
                <Link
                  href={d.href}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 motion-safe:hover:-translate-y-1 sm:p-8",
                    FOCUS,
                    d.featured
                      ? "border-transparent bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary text-background shadow-[0_28px_56px_-32px_rgba(11,61,80,0.7)] hover:shadow-[0_32px_64px_-30px_rgba(11,61,80,0.8)] lg:p-10"
                      : "border-primary/10 bg-card shadow-[0_12px_28px_-22px_rgba(16,20,28,0.3)] hover:border-primary/40 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)]"
                  )}
                >
                  {d.featured && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full border border-background/10"
                    />
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={cn(
                        "flex size-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110",
                        d.featured ? "bg-background/15 text-background" : "bg-accent text-primary"
                      )}
                    >
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-sm font-semibold tracking-widest",
                        d.featured ? "text-background/60" : "text-muted-foreground"
                      )}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "mt-6 font-semibold tracking-tight",
                      d.featured ? "text-3xl sm:text-4xl" : "text-2xl"
                    )}
                  >
                    {d.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-w-xl text-base leading-relaxed",
                      d.featured ? "text-background/80 sm:text-lg" : "text-muted-foreground"
                    )}
                  >
                    {d.description}
                  </p>

                  {d.featured && <CurriculumSketch />}

                  <span
                    className={cn(
                      "mt-6 inline-flex items-center gap-1.5 text-base font-semibold",
                      d.featured ? "text-background lg:mt-8" : "text-primary lg:mt-auto lg:pt-6"
                    )}
                  >
                    {d.cta}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
