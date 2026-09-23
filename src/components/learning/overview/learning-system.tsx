import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, FOCUS, H2, INNER, LEAD, SECTION } from "./overview-ui";

const LINKS = [
  { n: "01", title: "How We Teach", text: "Understand the principles behind the Techno Gurukul teaching approach.", cta: "See How We Teach", href: "/learning/how-we-teach" },
  { n: "02", title: "Projects", text: "Explore how practical work fits into the learning experience.", cta: "Explore Projects", href: "/learning/projects" },
  { n: "03", title: "Resources", text: "Explore supporting material that helps students continue learning.", cta: "Explore Resources", href: "/learning/resources" },
];

export function LearningSystem() {
  return (
    <section aria-labelledby="learning-system-heading" className={SECTION}>
      <div className={cn(INNER, "grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20")}>
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow index="06">Explore the learning system</Eyebrow>
          <h2 id="learning-system-heading" className={cn(H2, "mt-5")}>
            Everything You Need to Keep Learning.
          </h2>
          <p className={cn(LEAD, "mt-5 max-w-md")}>Explore the different parts of the Techno Gurukul learning experience.</p>
        </Reveal>

        <ul className="border-t border-primary/20">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <Reveal delay={i * 70}>
                <Link
                  href={l.href}
                  className={cn(
                    "group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 border-b border-primary/20 px-2 py-7 transition-colors duration-300 hover:bg-muted/70 motion-reduce:transition-none sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-x-8 sm:px-4 sm:py-9",
                    FOCUS
                  )}
                >
                  <span aria-hidden="true" className="row-span-2 self-start pt-1.5 text-sm font-semibold text-primary tabular-nums sm:row-span-1 sm:self-center sm:pt-0">
                    {l.n}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{l.title}</span>
                    <span className="mt-1.5 block max-w-xl text-base leading-relaxed text-muted-foreground">{l.text}</span>
                  </span>
                  <span className="col-start-2 mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary sm:col-start-auto sm:mt-0 sm:text-base">
                    <span className="hidden sm:inline">{l.cta}</span>
                    <span className="sm:hidden">{l.cta}</span>
                    <ArrowRight className="size-5 transition-transform duration-300 motion-safe:group-hover:translate-x-1.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
