"use client";

import { useDeferredValue, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "cn";
import { PROJECTS, PROJECT_PAGE_SIZE, type Project } from "@/data/projects";
import { GRADIENT_TEXT, SectionHeader } from "../curriculum/section-header";
import { FeaturedProject } from "./project-card";
import { ProjectEmptyState } from "./project-empty-state";
import { ProjectPreview } from "./project-preview";
import { ProjectsGrid } from "./projects-grid";
import { FilterRail, FilterSheet, type FilterGroup } from "./projects-filters";
import { ActiveFilters, BrowseBy, QuickModes, ResultsToolbar, SearchField } from "./projects-toolbar";
import {
  EMPTY_STATE,
  applyPatch,
  buildFacets,
  filterProjects,
  isFiltering,
  parseSearch,
  pickSpotlight,
  projectSearchText,
  sortProjects,
  toSearch,
  type LibraryState,
  type SpotlightMode,
} from "./project-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// Everything the UI offers is derived from the data, once.
const FACETS = buildFacets(PROJECTS);
const INDEX = PROJECTS.map((project) => ({ project, haystack: projectSearchText(project) }));
const anySample = PROJECTS.some((p) => p.sample);

// The URL is the single source of truth for filters, search, sort and view, so a refresh restores them.
// The server snapshot is "" so the first render matches the server; the real query string follows on the client.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("popstate", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("popstate", cb);
  };
};
const readSearch = () => window.location.search;
const readServerSearch = () => "";
function writeSearch(qs: string) {
  const url = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
  try {
    window.history.replaceState(window.history.state, "", url);
  } catch {
    // Some browsers rate-limit history updates; the on-screen state still updates below.
  }
  listeners.forEach((l) => l());
}

const SPOTLIGHTS: { mode: SpotlightMode; label: string }[] = [
  { mode: "featured", label: "Featured" },
  { mode: "student", label: "Students" },
  { mode: "faculty", label: "Faculty" },
];

function focusGroup(prefix: string, group: FilterGroup) {
  const el = document.getElementById(`${prefix}-${group}`);
  if (!el) return;
  if (el instanceof HTMLDetailsElement) el.open = true;
  const target = el instanceof HTMLDetailsElement ? el.querySelector<HTMLElement>("summary") : el;
  target?.focus();
  el.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

export function ProjectsShowcase() {
  const search = useSyncExternalStore(subscribe, readSearch, readServerSearch);
  const state = useMemo(() => parseSearch(search, FACETS), [search]);

  const [visible, setVisible] = useState(PROJECT_PAGE_SIZE);
  const [selected, setSelected] = useState<Project | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [spotlightMode, setSpotlightMode] = useState<SpotlightMode>("featured");
  const opener = useRef<HTMLElement | null>(null);

  const deferredQ = useDeferredValue(state.q);
  const results = useMemo(
    () => sortProjects(filterProjects(INDEX, { ...state, q: deferredQ }), state.sort),
    [state, deferredQ]
  );

  // The spotlight leads the default view. Once you search or filter, only matches are listed.
  const filtering = isFiltering(state);
  const spotlight = !filtering ? pickSpotlight(PROJECTS, spotlightMode) : undefined;
  const list = spotlight ? results.filter((p) => p.slug !== spotlight.slug) : results;
  const shown = list.slice(0, visible);
  const shownCount = shown.length + (spotlight ? 1 : 0);
  const remaining = list.length - shown.length;
  const countText =
    results.length === 0 ? "No projects found." : `Showing ${shownCount} of ${results.length} project${results.length === 1 ? "" : "s"}`;

  const commit = (next: LibraryState, resetPage = true) => {
    writeSearch(toSearch(next));
    if (resetPage) setVisible(PROJECT_PAGE_SIZE);
  };
  // Reads the URL at call time, so two changes in quick succession never overwrite each other.
  const update = (patch: Partial<LibraryState>) =>
    commit(applyPatch(parseSearch(readSearch(), FACETS), patch, FACETS), !("view" in patch));
  const reset = () => commit(EMPTY_STATE);

  const view = (p: Project, el: HTMLElement) => {
    opener.current = el;
    setSelected(p);
  };
  const restoreFocus = () => opener.current?.focus();

  const browse = (group: FilterGroup) => {
    if (window.matchMedia("(min-width: 1024px)").matches) return focusGroup("rail", group);
    opener.current = null;
    setSheetOpen(true);
    setTimeout(() => focusGroup("sheet", group), 100);
  };

  return (
    <section id="project-showcase" aria-labelledby="project-showcase-heading" className="scroll-mt-28 pb-14 sm:pb-20">
      <div className="px-4 sm:px-6">
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
            <p className="mt-6 max-w-3xl border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              The projects below are sample records that show how student and faculty work will be presented. Real work,
              names and files will replace them as they are added.
            </p>
          )}

          {spotlight && (
            <div className="mt-8 lg:mt-10">
              <div role="group" aria-label="Featured project view" className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1">
                <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Spotlight</span>
                {SPOTLIGHTS.map((s) => (
                  <button
                    key={s.mode}
                    type="button"
                    aria-pressed={spotlightMode === s.mode}
                    onClick={() => setSpotlightMode(s.mode)}
                    className={cn(
                      "min-h-11 border-b-2 text-sm font-semibold transition-colors sm:text-base",
                      FOCUS,
                      spotlightMode === s.mode ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <FeaturedProject project={spotlight} onView={view} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 border-y border-primary/10 bg-muted/50 px-4 py-8 sm:mt-14 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex flex-wrap items-center justify-between gap-x-8 border-b border-primary/10">
            <QuickModes state={state} onChange={update} />
            <BrowseBy onBrowse={browse} />
          </div>

          <div className="mt-5">
            <SearchField value={state.q} onChange={(q) => update({ q })} />
          </div>

          <div className="mt-6">
            <ResultsToolbar
              state={state}
              countText={countText}
              onChange={update}
              onOpenFilters={(el) => {
                opener.current = el;
                setSheetOpen(true);
              }}
            />
          </div>

          <div className="mt-6 flex items-start gap-8">
            <FilterRail state={state} facets={FACETS} onChange={update} onReset={reset} />

            <div className="min-w-0 flex-1">
              {filtering && (
                <div className="mb-4">
                  <ActiveFilters state={state} onChange={update} onReset={reset} />
                </div>
              )}

              {results.length > 0 ? (
                <>
                  <ProjectsGrid projects={shown} view={state.view} onView={view} />
                  {remaining > 0 && (
                    <div className="mt-8 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setVisible((n) => n + PROJECT_PAGE_SIZE)}
                        className={cn(
                          "h-12 rounded-lg border border-primary/30 bg-card px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted",
                          FOCUS
                        )}
                      >
                        Load More
                        <span className="ml-2 font-normal text-muted-foreground">({Math.min(PROJECT_PAGE_SIZE, remaining)} more)</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <ProjectEmptyState onClear={reset} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-12 sm:px-6 sm:pt-16">
        <p className="mx-auto max-w-3xl border-t border-primary/20 pt-6 text-center text-xl leading-snug font-medium tracking-tight text-foreground sm:text-2xl">
          Good learning leaves something behind: a project, a document, a prototype, a portfolio piece or a new way of thinking.
        </p>
      </div>

      <FilterSheet
        open={sheetOpen}
        state={state}
        facets={FACETS}
        onApply={(s) => commit(s)}
        onClose={() => {
          setSheetOpen(false);
          restoreFocus();
        }}
      />
      <ProjectPreview
        project={selected}
        onClose={() => {
          setSelected(null);
          restoreFocus();
        }}
      />
    </section>
  );
}
