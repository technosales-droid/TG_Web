import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "../../learning/curriculum/section-header";

// `outline-solid` matters: the shared button style sets `outline-none`, which would otherwise cancel the ring.
const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary";

// No real faculty or facility photography exists in the repository yet (confirmed by a full asset
// audit — see FacilitiesFaculty and FacilitiesGallery). This stays an abstract "people + place" card
// rather than a photo, so nothing here is mistaken for a real person or a real room.
function PeopleAndPlace() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[2rem] border border-primary/10 bg-card p-4 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] sm:p-6">
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary/25" />
          <span className="size-2.5 rounded-full bg-brand-green/40" />
          <span className="ml-2 h-2.5 w-28 rounded-full bg-primary/15" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-primary/15 bg-background p-4">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">Faculty</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">The People</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Guidance, demonstration and feedback.</p>
          </div>
          <div className="rounded-2xl border border-transparent bg-gradient-to-br from-primary to-brand-green p-4 text-white">
            <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">Facilities</p>
            <p className="mt-2 text-lg font-semibold tracking-tight">The Place</p>
            <p className="mt-1 text-sm leading-relaxed text-white/85">Practice, projects and collaboration.</p>
          </div>
        </div>

        <div aria-hidden="true" className="mt-3 grid gap-2 rounded-xl border border-primary/10 bg-muted/60 px-4 py-3">
          <span className="block h-2 w-full rounded-full bg-primary/15" />
          <span className="block h-2 w-2/3 rounded-full bg-primary/10" />
        </div>
      </div>
    </div>
  );
}

export function FacilitiesHero() {
  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:min-h-[600px] xl:px-16 xl:py-14">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[48%] xl:block">
            <div className="absolute inset-0 bg-brand-green/10 [clip-path:polygon(14%_0%,100%_0%,100%_100%,0%_100%)]" />
            <div className="absolute inset-0 bg-primary/8 [clip-path:polygon(0%_100%,55%_100%,100%_55%,100%_100%)]" />
          </div>

          <div className="relative grid items-center gap-10 xl:min-h-[480px] xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Facilities &amp; Faculty
              </div>
              <h1 className="mt-4 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-tight text-balance text-foreground min-[430px]:text-4xl sm:text-5xl xl:text-[3rem]">
                Meet the People. <span className={GRADIENT_TEXT}>Explore the Place.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Explore the people who support the learning experience and the environment where learners practise,
                collaborate and build.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="#faculty" className={cn(buttonVariants({ variant: "default" }), "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0", FOCUS)}>
                  Meet the Faculty
                </a>
                <a
                  href="#facilities"
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full text-base font-medium text-foreground transition-colors hover:text-primary",
                    FOCUS
                  )}
                >
                  Explore the Facilities
                </a>
              </div>
              <Link
                href="/about"
                className={cn(
                  "group mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                  FOCUS
                )}
              >
                <ArrowLeft className="size-4 transition-transform duration-200 motion-safe:group-hover:-translate-x-1" aria-hidden="true" />
                Back to About
              </Link>
            </div>

            <PeopleAndPlace />
          </div>
        </div>
      </div>
    </section>
  );
}
