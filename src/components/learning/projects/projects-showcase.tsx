"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import { SearchX } from "lucide-react";
import { cn } from "cn";
import { PROJECTS, PROJECT_PAGE_SIZE, type Project } from "@/data/projects";
import { GRADIENT_TEXT, SectionHeader } from "../curriculum/section-header";
import { FeaturedProject, ProjectCard } from "./project-card";
import { ProjectFilterBar } from "./project-filters";
import { ProjectPreviewDialog } from "./project-preview-dialog";
import {
  EMPTY_PROJECT_FILTERS,
  buildProjectFacets,
  filterProjects,
  isFiltering,
  projectSearchText,
  type ProjectFilters,
} from "./project-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Alternate student and faculty work so both appear on the first page. */
function interleave(list: Project[]): Project[] {
  const s = list.filter((p) => p.type === "student");
  const f = list.filter((p) => p.type === "faculty");
  const out: Project[] = [];
  for (let i = 0; i < Math.max(s.length, f.length); i++) {
    if (s[i]) out.push(s[i]);
    if (f[i]) out.push(f[i]);
  }
  return out;
}

export function ProjectsShowcase() {
  const [filters, setFilters] = useState<ProjectFilters>(EMPTY_PROJECT_FILTERS);
  const [visible, setVisible] = useState(PROJECT_PAGE_SIZE);
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const facets = useMemo(() => buildProjectFacets(PROJECTS), []);
  const index = useMemo(() => PROJECTS.map((project) => ({ project, haystack: projectSearchText(project) })), []);
  const deferredQ = useDeferredValue(filters.q);
  const results = useMemo(() => interleave(filterProjects(index, { ...filters, q: deferredQ })), [index, filters, deferredQ]);

  // The featured project leads the default view. Once you search or filter, only matches are listed.
  const filtering = isFiltering(filters);
  const featured = !filtering ? PROJECTS.find((p) => p.featured) : undefined;
  const list = featured ? results.filter((p) => p.slug !== featured.slug) : results;
  const shown = list.slice(0, visible);
  const shownCount = shown.length + (featured ? 1 : 0);

  const change = (patch: Partial<ProjectFilters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setVisible(PROJECT_PAGE_SIZE);
  };
  const clear = () => {
    setFilters(EMPTY_PROJECT_FILTERS);
    setVisible(PROJECT_PAGE_SIZE);
  };

  const view = (p: Project) => {
    opener.current = document.activeElement as HTMLElement | null;
    setSelected(p);
  };
  const close = () => {
    setSelected(null);
    opener.current?.focus();
  };

  const anySample = PROJECTS.some((p) => p.sample);

  return (
    <section id="project-showcase" aria-labelledby="project-showcase-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="project-showcase-heading"
          eyebrow="Student & Faculty Work"
          title={
            <>
              <span className="block">See What Learning Looks</span>
              <span className={cn("block", GRADIENT_TEXT)}>Like in Practice.</span>
            </>
          }
        >
          Explore projects created through practical learning, experimentation and guided work. See how students and
          faculty turn ideas into reports, prototypes, visual work, technical builds and documented outcomes.
        </SectionHeader>

        {anySample && (
          <p className="mt-6 max-w-3xl rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-foreground sm:text-base">
            The projects below are sample records that show how student and faculty work will be presented. Real work,
            names and files will replace them as they are added.
          </p>
        )}

        {featured && (
          <div className="mt-8 lg:mt-10">
            <FeaturedProject project={featured} onView={view} />
          </div>
        )}

        <div className="mt-8 lg:mt-10">
          <ProjectFilterBar filters={filters} facets={facets} onChange={change} onClear={clear} />
        </div>

        <p role="status" aria-live="polite" className="mt-5 text-sm font-medium text-muted-foreground sm:text-base">
          {results.length === 0
            ? "No projects found."
            : `Showing ${shownCount} of ${results.length} project${results.length === 1 ? "" : "s"}`}
        </p>

        {results.length > 0 ? (
          <>
            <ul className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
              {shown.map((p) => (
                <li key={p.slug} className="min-w-0">
                  <ProjectCard project={p} onView={view} />
                </li>
              ))}
            </ul>
            {list.length > visible && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((n) => n + PROJECT_PAGE_SIZE)}
                  className={cn(
                    "h-12 rounded-full border border-primary/25 bg-card px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted",
                    FOCUS
                  )}
                >
                  Load More
                  <span className="ml-2 font-normal text-muted-foreground">({list.length - visible} more)</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-4 flex flex-col items-center rounded-[2rem] border border-dashed border-primary/25 bg-card px-6 py-14 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <SearchX className="size-7" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">No projects found.</h3>
            <p className="mt-2 max-w-md text-base text-muted-foreground">Try another search or clear a filter.</p>
            <button
              type="button"
              onClick={clear}
              className={cn("mt-6 h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90", FOCUS)}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <ProjectPreviewDialog project={selected} onClose={close} />
    </section>
  );
}
