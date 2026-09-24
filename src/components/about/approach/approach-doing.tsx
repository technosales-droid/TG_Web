import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const PRINCIPLES = [
  { title: "Try", text: "Actually use the skill." },
  { title: "Make", text: "Produce something tangible." },
  { title: "Explain", text: "Be able to describe your decisions." },
  { title: "Improve", text: "Use the experience to do the next version better." },
];

/** Section 8: learning by doing, reinforcing the Why Techno Gurukul philosophy without copying it. */
export function ApproachDoing() {
  return (
    <section aria-labelledby="ap-doing-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="ap-doing-heading"
          eyebrow="Learning by Doing"
          title={
            <>
              Practice Should Feel Closer to Doing <span className={GRADIENT_TEXT}>Than Memorising.</span>
            </>
          }
        />

        <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="border-t-2 border-primary/25 pt-5 xl:border-t-0 xl:border-l-2 xl:pt-0 xl:pl-6">
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
