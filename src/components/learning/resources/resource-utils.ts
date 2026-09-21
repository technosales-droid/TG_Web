import {
  CATEGORY_OF,
  DIFFICULTIES,
  DIFFICULTY_LABEL,
  RESOURCE_FORMATS,
  RESOURCE_TYPES,
  STATUS_LABEL,
  type Difficulty,
  type Resource,
  type ResourceFormat,
  type ResourceStatus,
  type ResourceType,
} from "@/data/resources";
import { SORT_OPTIONS, type SortKey, type ViewMode } from "../projects/project-utils";

export { SORT_OPTIONS };
export type { SortKey, ViewMode };

/** Industry filter value for resources that are not tied to an industry. */
export const GENERAL = "General";

/** Everything the library remembers, and everything that lives in the URL. */
export interface ResourceState {
  q: string;
  types: ResourceType[];
  industry: string;
  program: string;
  course: string;
  topics: string[];
  difficulty: "" | Difficulty;
  formats: ResourceFormat[];
  status: "" | ResourceStatus;
  sort: SortKey;
  view: ViewMode;
}

export const EMPTY_STATE: ResourceState = {
  q: "",
  types: [],
  industry: "",
  program: "",
  course: "",
  topics: [],
  difficulty: "",
  formats: [],
  status: "",
  sort: "featured",
  view: "grid",
};

/** Quick browse: each mode is just a set of resource types, so it drives the same filter as the rail. */
export const QUICK_MODES: { id: string; label: string; types: ResourceType[] }[] = [
  { id: "all", label: "All Resources", types: [] },
  { id: "guides", label: "Guides", types: ["Guide"] },
  { id: "templates", label: "Templates", types: ["Template"] },
  { id: "practice", label: "Practice", types: ["Practice Material", "Worksheet", "Checklist"] },
  { id: "references", label: "References", types: ["Reference"] },
  { id: "projects", label: "Project Resources", types: ["Project Resource"] },
  { id: "media", label: "Media", types: ["Video", "Presentation"] },
];

export const activeQuickMode = (s: ResourceState) =>
  QUICK_MODES.find((m) => m.types.length === s.types.length && m.types.every((t) => s.types.includes(t)))?.id ?? null;

export const industryOf = (r: Resource) => r.industry ?? GENERAL;

// ------------------------------------------------------------------ facets (all derived from data)

const uniq = <T,>(values: T[]) => [...new Set(values)];
const alpha = (a: string, b: string) => a.localeCompare(b);

export type Facets = ReturnType<typeof buildFacets>;

export function buildFacets(resources: Resource[]) {
  const pairs = (pick: (r: Resource) => [string, string] | null) => {
    const seen = new Map<string, string>();
    for (const r of resources) {
      const pair = pick(r);
      if (pair) seen.set(pair[0], pair[1]);
    }
    return [...seen].map(([name, parent]) => ({ name, parent }));
  };
  const has = <T,>(all: readonly T[], used: T[]) => all.filter((v) => used.includes(v));
  const industries = uniq(resources.map(industryOf));
  return {
    // "General" always sits last.
    industries: [...industries.filter((i) => i !== GENERAL), ...industries.filter((i) => i === GENERAL)],
    programs: pairs((r) => (r.program && r.industry ? [r.program, r.industry] : null)),
    courses: pairs((r) => (r.course && r.program ? [r.course, r.program] : null)),
    types: has(RESOURCE_TYPES, resources.map((r) => r.resourceType)).map((value) => ({ value, label: value })),
    formats: has(RESOURCE_FORMATS, resources.map((r) => r.format)).map((value) => ({ value, label: value })),
    // The difficulty filter only appears when resources actually have difficulty values.
    difficulties: has(DIFFICULTIES, resources.flatMap((r) => (r.difficulty ? [r.difficulty] : []))),
    statuses: (["available", "coming-soon"] as const).filter((s) => resources.some((r) => r.status === s)),
    topics: uniq(resources.flatMap((r) => r.topics)).sort(alpha),
  };
}

export const programsFor = (facets: Facets, industry: string) =>
  industry === GENERAL ? [] : facets.programs.filter((p) => !industry || p.parent === industry).map((p) => p.name);

export const coursesFor = (facets: Facets, industry: string, program: string) =>
  industry === GENERAL
    ? []
    : facets.courses
        .filter((c) => (program ? c.parent === program : !industry || facets.programs.find((p) => p.name === c.parent)?.parent === industry))
        .map((c) => c.name);

/**
 * Applies a change and keeps Industry -> Program -> Course consistent: an invalid downstream choice is cleared,
 * and choosing a program or course first also fills in the industry / program it belongs to.
 */
export function applyPatch(state: ResourceState, patch: Partial<ResourceState>, facets: Facets): ResourceState {
  const next = { ...state, ...patch };
  if ("course" in patch && next.course) {
    const parent = facets.courses.find((c) => c.name === next.course)?.parent;
    if (parent) next.program = parent;
  }
  if (("program" in patch || "course" in patch) && next.program) {
    const parent = facets.programs.find((p) => p.name === next.program)?.parent;
    if (parent) next.industry = parent;
  }
  if (next.program && !programsFor(facets, next.industry).includes(next.program)) next.program = "";
  if (next.course && !coursesFor(facets, next.industry, next.program).includes(next.course)) next.course = "";
  return next;
}

// ------------------------------------------------------------------ filtering, sorting

export function resourceSearchText(r: Resource): string {
  return [
    r.title,
    r.shortDescription,
    r.longDescription,
    r.resourceType,
    CATEGORY_OF[r.resourceType],
    r.sample ? "sample" : "",
    industryOf(r),
    r.program,
    r.course,
    ...r.topics,
    r.difficulty ? DIFFICULTY_LABEL[r.difficulty] : "",
    r.format,
    STATUS_LABEL[r.status],
    r.source,
    r.author,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export type SearchIndex = { resource: Resource; haystack: string }[];

export function filterResources(index: SearchIndex, s: ResourceState): Resource[] {
  // Each search word must match at the start of a word, so "seo checklist" needs both.
  const terms = s.q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  // AND between groups; OR inside a multi-select group.
  const anyOf = <T,>(picked: T[], has: (v: T) => boolean) => picked.length === 0 || picked.some(has);
  return index
    .filter(({ resource: r, haystack }) => {
      if (!anyOf(s.types, (t) => r.resourceType === t)) return false;
      if (s.industry && industryOf(r) !== s.industry) return false;
      if (s.program && r.program !== s.program) return false;
      if (s.course && r.course !== s.course) return false;
      if (!anyOf(s.topics, (t) => r.topics.includes(t))) return false;
      if (s.difficulty && r.difficulty !== s.difficulty) return false;
      if (!anyOf(s.formats, (f) => r.format === f)) return false;
      if (s.status && r.status !== s.status) return false;
      return terms.every((t) => t.test(haystack));
    })
    .map(({ resource }) => resource);
}

const SORTERS: Record<SortKey, (a: Resource, b: Resource) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order,
  newest: (a, b) => b.order - a.order,
  oldest: (a, b) => a.order - b.order,
  az: (a, b) => a.title.localeCompare(b.title),
  za: (a, b) => b.title.localeCompare(a.title),
};
export const sortResources = (list: Resource[], sort: SortKey) => [...list].sort(SORTERS[sort]);

// ------------------------------------------------------------------ active filters

export const activeFilterCount = (s: ResourceState) =>
  s.types.length +
  (s.industry ? 1 : 0) +
  (s.program ? 1 : 0) +
  (s.course ? 1 : 0) +
  s.topics.length +
  (s.difficulty ? 1 : 0) +
  s.formats.length +
  (s.status ? 1 : 0);

export const isFiltering = (s: ResourceState) => s.q.trim() !== "" || activeFilterCount(s) > 0;

export interface Chip {
  key: string;
  label: string;
  remove: Partial<ResourceState>;
}

export function activeChips(s: ResourceState): Chip[] {
  const chips: Chip[] = [];
  const q = s.q.trim();
  if (q) chips.push({ key: "q", label: `Search: ${q}`, remove: { q: "" } });
  for (const t of s.types) chips.push({ key: `type:${t}`, label: t, remove: { types: s.types.filter((x) => x !== t) } });
  if (s.industry) chips.push({ key: "industry", label: s.industry, remove: { industry: "" } });
  if (s.program) chips.push({ key: "program", label: s.program, remove: { program: "" } });
  if (s.course) chips.push({ key: "course", label: s.course, remove: { course: "" } });
  for (const t of s.topics) chips.push({ key: `topic:${t}`, label: t, remove: { topics: s.topics.filter((x) => x !== t) } });
  if (s.difficulty) chips.push({ key: "difficulty", label: DIFFICULTY_LABEL[s.difficulty], remove: { difficulty: "" } });
  for (const f of s.formats) chips.push({ key: `format:${f}`, label: f, remove: { formats: s.formats.filter((x) => x !== f) } });
  if (s.status) chips.push({ key: "status", label: STATUS_LABEL[s.status], remove: { status: "" } });
  return chips;
}

// ------------------------------------------------------------------ URL state

const slug = (v: string) =>
  v
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Turns URL slugs back into real option values; anything not in the data is dropped. */
const pickFrom = <T extends string>(raw: string | null, options: readonly T[]): T[] =>
  (raw ?? "")
    .split(",")
    .map((v) => options.find((o) => slug(o) === v))
    .filter((o): o is T => Boolean(o));

export function parseSearch(search: string, facets: Facets): ResourceState {
  const params = new URLSearchParams(search);
  const one = (key: string, options: readonly string[]) => pickFrom(params.get(key), options)[0] ?? "";
  const sort = params.get("sort");
  const state: ResourceState = {
    ...EMPTY_STATE,
    q: params.get("q") ?? "",
    types: pickFrom(params.get("type"), facets.types.map((t) => t.value)),
    industry: one("industry", facets.industries),
    program: one("program", facets.programs.map((p) => p.name)),
    course: one("course", facets.courses.map((c) => c.name)),
    topics: pickFrom(params.get("topics"), facets.topics),
    difficulty: one("difficulty", facets.difficulties) as ResourceState["difficulty"],
    formats: pickFrom(params.get("format"), facets.formats.map((f) => f.value)),
    status: one("status", facets.statuses) as ResourceState["status"],
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortKey) : "featured",
    view: params.get("view") === "list" ? "list" : "grid",
  };
  // A hand-edited URL can name a program outside its industry; the same clean-up as a filter change applies.
  return applyPatch(EMPTY_STATE, state, facets);
}

export function toSearch(s: ResourceState): string {
  const params = new URLSearchParams();
  if (s.q.trim()) params.set("q", s.q);
  const list = (key: string, values: string[]) => values.length && params.set(key, values.map(slug).join(","));
  list("type", s.types);
  if (s.industry) params.set("industry", slug(s.industry));
  if (s.program) params.set("program", slug(s.program));
  if (s.course) params.set("course", slug(s.course));
  list("topics", s.topics);
  if (s.difficulty) params.set("difficulty", s.difficulty);
  list("format", s.formats);
  if (s.status) params.set("status", s.status);
  if (s.sort !== "featured") params.set("sort", s.sort);
  if (s.view !== "grid") params.set("view", s.view);
  // Keep commas readable: "type=guide,template" instead of "type=guide%2Ctemplate".
  return params.toString().replace(/%2C/g, ",");
}

/** The address a resource opens at, or null while there is nothing real to open. */
export const openUrl = (r: Resource) => r.externalUrl ?? r.media?.url ?? null;
