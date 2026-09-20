import { Suspense } from "react";
import { CATALOGUE_PAGE_SIZE, COURSE_CATALOGUE } from "@/data/catalogue";
import { sortCourses } from "./catalogue-utils";
import { ProgramCard } from "./program-card";
import { ProgramCatalogue } from "./program-catalogue";

// Server shell: static header + the interactive catalogue. The Suspense fallback renders the
// unfiltered first page of cards, so the catalogue is present in the HTML before hydration.
export function CatalogueSection() {
  return (
    <section id="programs-listing" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Explore Our Programs
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Choose a Skill.
            <br />
            Build Your Path.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Browse courses by industry and program. Search by skill, tool or topic to find where to start.
          </p>
        </div>

        <div className="mt-8 lg:mt-10">
          <Suspense
            fallback={
              <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {sortCourses(COURSE_CATALOGUE, "featured").slice(0, CATALOGUE_PAGE_SIZE).map((p) => (
                  <li key={p.slug} className="min-w-0">
                    <ProgramCard course={p} />
                  </li>
                ))}
              </ul>
            }
          >
            <ProgramCatalogue courses={COURSE_CATALOGUE} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
