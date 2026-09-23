import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const CARDS = [
  { title: "Internships", text: "Explore how practical experience can complement structured learning.", href: "/careers-placement/internships" },
  { title: "Portfolio & Resume", text: "Learn how to present your work and skills clearly.", href: "/careers-placement/portfolio-resume" },
  { title: "Interview Preparation", text: "Prepare to discuss your skills, projects and experience.", href: "/careers-placement/interview-prep" },
  { title: "Industry Connections", text: "Understand industry context and professional exposure.", href: "/careers-placement/industry-connections" },
];

export function PlacementRelated() {
  return (
    <section aria-labelledby="placement-related-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="placement-related-heading"
          eyebrow="More Career Support"
          title={
            <>
              Keep Exploring <span className={GRADIENT_TEXT}>Career Support.</span>
            </>
          }
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {CARDS.map((c) => (
            <li key={c.href} className="min-w-0">
              <article className="group relative flex h-full flex-col rounded-2xl border border-primary/15 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{c.title}</h3>
                <p className="mt-2 mb-6 text-base leading-relaxed text-muted-foreground">{c.text}</p>
                <Link
                  href={c.href}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Explore {c.title}
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
