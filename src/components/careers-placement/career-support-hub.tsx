import Link from "next/link";
import { ArrowRight, Building2, Briefcase, ClipboardList, FolderOpen, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

// Every card links to its child route, whether or not that page is finished yet.
const CARDS: { title: string; text: string; cta: string; href: string; Icon: LucideIcon; span: string }[] = [
  {
    title: "Placement Preparation",
    text: "Explore the preparation process, guidance and practical steps involved in moving from learning toward professional opportunities.",
    cta: "Explore Placement",
    href: "/careers-placement/placement",
    Icon: ClipboardList,
    span: "lg:col-span-2",
  },
  {
    title: "Internships",
    text: "Learn how internships can help you apply skills in practical environments and gain experience working on real responsibilities.",
    cta: "Explore Internships",
    href: "/careers-placement/internships",
    Icon: Briefcase,
    span: "lg:col-span-2",
  },
  {
    title: "Portfolio & Resume",
    text: "Learn how to organise your projects, communicate your skills and present your work clearly through a portfolio and resume.",
    cta: "Build Your Portfolio",
    href: "/careers-placement/portfolio-resume",
    Icon: FolderOpen,
    span: "lg:col-span-2",
  },
  {
    title: "Interview Preparation",
    text: "Prepare to explain your skills, projects and experience clearly through structured interview practice.",
    cta: "Prepare for Interviews",
    href: "/careers-placement/interview-prep",
    Icon: MessageSquare,
    span: "lg:col-span-3",
  },
  {
    title: "Industry Connections",
    text: "Understand how industry exposure, professional interactions and practical context can help you better understand the world of work.",
    cta: "Explore Industry Connections",
    href: "/careers-placement/industry-connections",
    Icon: Building2,
    span: "lg:col-span-3",
  },
];

export function CareerSupportHub() {
  return (
    <section aria-labelledby="career-hub-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="career-hub-heading"
          eyebrow="Explore Career Support"
          title={
            <>
              Everything You Need to <span className={GRADIENT_TEXT}>Prepare for the Next Step.</span>
            </>
          }
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {CARDS.map(({ title, text, cta, href, Icon, span }) => (
            <li key={href} className={cn("min-w-0", span)}>
              {/* One link per card: the call to action's link stretches over the whole card. */}
              <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5 xl:p-7">
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-2 mb-6 text-base leading-relaxed text-muted-foreground">{text}</p>
                <Link
                  href={href}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {cta}
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
