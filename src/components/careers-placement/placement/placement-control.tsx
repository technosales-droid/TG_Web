import { Check } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const ITEMS = [
  { title: "Practical Skills", text: "Strengthen the skills relevant to your chosen field." },
  { title: "Project Quality", text: "Create clearer, more complete and better-documented work." },
  { title: "Portfolio", text: "Present your strongest work in an organised format." },
  { title: "Resume", text: "Describe your skills, projects and experience clearly." },
  { title: "Communication", text: "Practise explaining your approach and decisions." },
  { title: "Interview Practice", text: "Prepare to discuss projects, tools, problem-solving and learning." },
  { title: "Professional Habits", text: "Develop consistency, preparation and responsibility." },
  { title: "Career Direction", text: "Understand which roles and opportunities align with your skills." },
];

export function PlacementControl() {
  return (
    <section aria-labelledby="placement-control-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="placement-control-heading"
          eyebrow="Work on What You Can Control"
          title={
            <>
              Build the Parts of Your Profile <span className={GRADIENT_TEXT}>That You Can Improve.</span>
            </>
          }
        />

        <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
          {ITEMS.map((it) => (
            <li key={it.title} className="flex gap-3.5">
              <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-green text-white">
                <Check className="size-4" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{it.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">{it.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
