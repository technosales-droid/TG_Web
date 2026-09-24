import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { CtaSection } from "@/components/facilities/cta-section";
import { Media } from "@/components/facilities/media";
import type { CourseDetail } from "@/data/course-details";
import { FACULTY } from "@/data/institute";
import { Block, Empty } from "./course-content";

const FACULTY_HREF = "/about/facilities#faculty";

export function CourseExtras({ course: c }: { course: CourseDetail }) {
  const member = c.instructor ? FACULTY.find((f) => f.slug === c.instructor?.facultySlug) : undefined;

  return (
    <div className="mx-auto max-w-[1350px] px-4 sm:px-6 xl:px-14">
      <Block id="instructor" title="Your instructor">
        <div className="flex flex-col gap-6 rounded-3xl border border-primary/15 bg-card p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl sm:size-32">
            <Media item={member?.media ?? { kind: "image", src: null, label: "Instructor" }} compact sizes="128px" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">{member?.role ?? "Faculty"}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{member?.name ?? "Instructor to be announced"}</h3>
            <p className="mt-1 text-base text-muted-foreground">{member?.designation ?? "Instructor details will be added here."}</p>
            <Link href={FACULTY_HREF} className="group mt-4 inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {member ? "View Faculty Profile" : "Meet our faculty"}
              <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Block>

      <Block id="student-work" title="Student projects & outcomes">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {(c.studentProjects.length ? c.studentProjects : [1, 2, 3, 4].map((n) => ({ title: `Project preview ${n}`, image: undefined, caption: "Coming soon" }))).map((p) => (
            <li key={p.title}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                {p.image ? <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" /> : <Media item={{ kind: "image", src: null, label: p.title }} compact />}
              </div>
              {p.caption && <p className="mt-2 text-sm text-muted-foreground">{p.caption}</p>}
            </li>
          ))}
        </ul>
      </Block>

      <Block id="faq" title="Frequently asked questions">
        {c.faqs.length ? (
          <div className="overflow-hidden rounded-3xl border border-primary/15 bg-card">
            {c.faqs.map((f) => (
              <details key={f.question} className="group border-b border-primary/15 last:border-b-0">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary sm:px-6 [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="bg-muted/40 px-5 py-4 text-base leading-relaxed text-muted-foreground sm:px-6">{f.answer}</p>
              </details>
            ))}
          </div>
        ) : (
          <Empty>Frequently asked questions will be added here.</Empty>
        )}
      </Block>

      <div className="pt-10">
        <CtaSection
          eyebrow="Start learning"
          heading={["Ready to Start ", "Building Your Skills?"]}
          text="Learn practical skills. Build real projects. Prepare for what's next."
          primary={{ label: "Apply Now", href: "/contact" }}
          secondary={{ label: "Talk to an Advisor", href: "/contact" }}
        />
      </div>
    </div>
  );
}
