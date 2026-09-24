import { UserRound } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

// The only record in content/faculty/ is `sample-faculty.json` — name "Sample Faculty", bio
// "Lorem ipsum...". It is an explicit placeholder, not a verified person, so it is never rendered
// here. One empty state stands in (no invented names, roles or specialisations) until real, verified
// faculty profiles and photos are added to the repository.

/** Section: Faculty (#faculty). Honest empty state — no sample or fabricated faculty are shown. */
export function FacilitiesFaculty() {
  return (
    <section id="faculty" aria-labelledby="fc-faculty-heading" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="fc-faculty-heading"
          eyebrow="Faculty"
          title={
            <>
              Meet the Faculty <span className={GRADIENT_TEXT}>as Profiles Are Added.</span>
            </>
          }
        >
          Faculty profiles will be published as verified information and media become available.
        </SectionHeader>

        <div className="mt-10 flex flex-col items-center rounded-[2rem] border border-dashed border-primary/25 bg-muted/40 px-6 py-12 text-center">
          <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserRound className="size-7" />
          </span>
          <p className="mt-4 text-base font-semibold tracking-tight text-foreground">Faculty profiles coming soon</p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
            The people who guide learning, demonstrate practical work and support learners through projects and feedback.
          </p>
        </div>
      </div>
    </section>
  );
}
