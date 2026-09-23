import { Building2, GraduationCap, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

const PARTS: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Faculty", text: "Guidance, explanation and feedback.", Icon: UserRound },
  { title: "Facilities", text: "Workspace, practice, collaboration and projects.", Icon: Building2 },
  { title: "Learner", text: "Participation, practice and creation.", Icon: GraduationCap },
];

/** A short, concrete strip connecting faculty and facilities to the learner — kept brief by design. */
export function FacilitiesTogether() {
  return (
    <section aria-labelledby="fc-together-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <h2 id="fc-together-heading" className="max-w-2xl text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
          People and Place <span className={GRADIENT_TEXT}>Shape the Learning Experience.</span>
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {PARTS.map(({ title, text, Icon }) => (
            <li key={title} className="flex items-start gap-4 rounded-2xl border border-primary/15 bg-card p-5">
              <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
