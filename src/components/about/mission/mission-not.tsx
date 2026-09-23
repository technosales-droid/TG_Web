import Link from "next/link";
import { ArrowRight, Award, Gauge, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const NOT: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Guaranteed Outcomes", text: "Learning can create preparation, not guaranteed employment.", Icon: Award },
  { title: "Shortcuts", text: "Practical capability takes practice and iteration.", Icon: Zap },
  { title: "Certificates Alone", text: "Completion records do not replace actual work.", Icon: Gauge },
  { title: "One-Size-Fits-All Learning", text: "Different learners develop through different directions and experiences.", Icon: Users },
];

/** Section 7: what the mission does not promise, kept calm and transparent rather than defensive. */
export function MissionNot() {
  return (
    <section aria-labelledby="ms-not-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="ms-not-heading"
          eyebrow="Honest Positioning"
          title={
            <>
              What We <span className={GRADIENT_TEXT}>Do Not Promise.</span>
            </>
          }
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {NOT.map(({ title, text, Icon }) => (
            <li key={title} className="flex gap-4 rounded-2xl border-l-4 border-primary/30 bg-muted/50 px-5 py-5 sm:px-6">
              <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">Read more about how this plays out in Careers &amp; Placement.</p>
        <Link
          href="/careers-placement"
          className="group mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Explore Careers &amp; Placement
          <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
