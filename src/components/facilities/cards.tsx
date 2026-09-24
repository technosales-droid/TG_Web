import { Reveal } from "@/components/ui/reveal";
import { GRADIENT_TEXT } from "@/components/ui/section-header";
import { FACULTY, type FacultyPlaceholder } from "@/data/institute";
import { Media } from "./media";

export function FacultyCard({ member }: { member: FacultyPlaceholder }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-card">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Media item={member.media} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold tracking-wide text-primary uppercase">{member.role}</p>
        <p className="mt-1.5 text-base text-muted-foreground">{member.designation}</p>
      </div>
    </article>
  );
}

function Header({ id, eyebrow, children, lead }: { id: string; eyebrow: string; children: React.ReactNode; lead: string }) {
  return (
    <Reveal className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-primary uppercase">
        <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 id={id} className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl">
        {children}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>
    </Reveal>
  );
}

export function FacultySection() {
  return (
    <section id="faculty" aria-labelledby="fc-faculty-heading" className="scroll-mt-24 border-t border-primary/10 bg-muted/50 px-4 py-14 sm:px-6 sm:py-20 xl:py-24">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <Header
          id="fc-faculty-heading"
          eyebrow="Our faculty"
          lead="Good learning needs more than content. It needs people who can explain, challenge, guide and support learners along the way."
        >
          Learn With People Who <span className={GRADIENT_TEXT}>Guide the Journey.</span>
        </Header>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {FACULTY.map((m, i) => (
            <li key={m.slug}>
              <Reveal delay={i * 90} className="h-full">
                <FacultyCard member={m} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
