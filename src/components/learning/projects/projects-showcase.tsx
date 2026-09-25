"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "cn";
import { FileText, Image as ImageIcon, Layers, Presentation, Wrench } from "lucide-react";
import { ProjectCards } from "@/components/learning/gated/gated-cards";
import { PROJECTS, isProjectPublic } from "@/data/projects";
import { FilterRail, FilterSheet, type FilterGroup } from "./projects-filters";
import { ActiveFilters, BrowseBy, QuickModes, ResultsToolbar, SearchField } from "./projects-toolbar";
import {
  EMPTY_STATE,
  applyPatch,
  buildFacets,
  filterProjects,
  isFiltering,
  parseSearch,
  projectSearchText,
  sortProjects,
  toSearch,
  type LibraryState,
} from "./project-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// The filter options come from the data. The catalogue itself is empty until real work is added.
const FACETS = buildFacets(PROJECTS);

// Only real, published work with the creator's permission is listed (see isProjectPublic). Cards show the public preview;
// the full project opens through the access gate.
const PUBLIC = PROJECTS.filter(isProjectPublic);
const INDEX = PUBLIC.map((project) => ({ project, haystack: projectSearchText(project) }));

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

function focusGroup(prefix: string, group: FilterGroup) {
  const el = document.getElementById(`${prefix}-${group}`);
  if (!el) return;
  if (el instanceof HTMLDetailsElement) el.open = true;
  const target = el instanceof HTMLDetailsElement ? el.querySelector<HTMLElement>("summary") : el;
  target?.focus();
  el.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

const FORMATS = [
  { label: "Reports & documents", Icon: FileText },
  { label: "Prototypes", Icon: Layers },
  { label: "Visual work", Icon: ImageIcon },
  { label: "Technical builds", Icon: Wrench },
  { label: "Presentations", Icon: Presentation },
];

// A catalogue with nothing in it yet: the whole browse interface is in place, and the results area holds one
// "coming soon" panel. No record, name, file or count is invented.
export function ProjectsShowcase() {
  const search = useSyncExternalStore(subscribe, readSearch, readServerSearch);
  const state = useMemo(() => parseSearch(search, FACETS), [search]);

  const [sheetOpen, setSheetOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const filtering = isFiltering(state);
  const results = useMemo(() => sortProjects(filterProjects(INDEX, state), state.sort), [state]);

  const commit = (next: LibraryState) => writeSearch(toSearch(next));
  // Reads the URL at call time, so two changes in quick succession never overwrite each other.
  const update = (patch: Partial<LibraryState>) => commit(applyPatch(parseSearch(readSearch(), FACETS), patch, FACETS));
  const reset = () => commit(EMPTY_STATE);

  const restoreFocus = () => opener.current?.focus();

  const browse = (group: FilterGroup) => {
    if (window.matchMedia("(min-width: 1024px)").matches) return focusGroup("rail", group);
    opener.current = null;
    setSheetOpen(true);
    setTimeout(() => focusGroup("sheet", group), 100);
  };

  return (
    <section id="project-showcase" aria-label="Project catalogue" className="scroll-mt-28 pb-14 sm:pb-20">
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
              countText={PUBLIC.length === 0 ? "The catalogue opens soon." : `${results.length} ${results.length === 1 ? "project" : "projects"}`}
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

              {PUBLIC.length === 0 ? (
              <div className="flex min-h-[26rem] flex-col justify-between rounded-3xl border border-dashed border-primary/30 bg-card p-8 sm:p-12">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-sky" />
                    Coming soon
                  </span>
                  <h3 className="mt-6 max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                    {filtering ? "Nothing to show for these filters yet." : "Real work will appear here as it is added."}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Projects, reports, prototypes and documented outcomes from students and faculty will be added once they
                    are ready to be shared.
                  </p>
                  {filtering && (
                    <button
                      type="button"
                      onClick={reset}
                      className={cn("mt-6 h-11 rounded-lg border border-primary/30 px-6 text-base font-semibold text-foreground transition-colors hover:bg-muted", FOCUS)}
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                <ul aria-label="Kinds of work the catalogue will hold" className="mt-10 flex flex-wrap gap-3">
                  {FORMATS.map(({ label, Icon }) => (
                    <li key={label} className="flex items-center gap-2 rounded-full border border-primary/15 bg-muted/50 px-4 py-2 text-sm font-medium text-foreground">
                      <Icon className="size-4 text-primary" aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              ) : results.length > 0 ? (
                <ProjectCards projects={results} view={state.view} />
              ) : (
                <p role="status" className="rounded-3xl border border-dashed border-primary/30 bg-card p-8 text-center text-muted-foreground">
                  No projects match these filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        state={state}
        facets={FACETS}
        onApply={commit}
        onClose={() => {
          setSheetOpen(false);
          restoreFocus();
        }}
      />
    </section>
  );
}
