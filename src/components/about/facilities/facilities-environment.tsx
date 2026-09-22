import Link from "next/link";
import { ArrowUpRight, MapPin, MonitorSmartphone, RefreshCw, Target, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { footerLocation } from "../../layout/footer-data";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const SPACE: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Practice Space", text: "Room to work through exercises and repeat a skill until it feels familiar.", Icon: Target },
  { title: "Project Space", text: "Room to build, test and revise work over time.", Icon: MonitorSmartphone },
  { title: "Collaboration Space", text: "Room for learners and instructors to work through problems together.", Icon: Users },
  { title: "Review Space", text: "Room to look back at work, discuss it and improve it.", Icon: RefreshCw },
];

/** Section 2: the learning space, its purpose, and a factual, verified location note. */
export function FacilitiesEnvironment() {
  return (
    <section aria-labelledby="fc-space-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="fc-space-heading"
          eyebrow="The Learning Space"
          title={
            <>
              The Space Should Make <span className={GRADIENT_TEXT}>Good Work Possible.</span>
            </>
          }
        >
          A useful learning space creates room for focused practice, project work, collaboration and review. These are
          the activities Techno Gurukul&rsquo;s learning space is designed around.
        </SectionHeader>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {SPACE.map(({ title, text, Icon }) => (
            <li key={title} className="flex flex-col rounded-2xl border border-primary/15 bg-card p-6">
              <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-primary/15 bg-muted/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-start gap-3.5">
            <span aria-hidden="true" className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Where We&rsquo;re Based</p>
              <p className="mt-1 text-lg font-medium tracking-tight text-foreground">{footerLocation.shortAddress}</p>
              <p className="text-base text-muted-foreground">{footerLocation.locality}</p>
            </div>
          </div>
          {footerLocation.mapUrl && (
            <Link
              href={footerLocation.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary sm:self-center"
            >
              View on Google Maps
              <ArrowUpRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
