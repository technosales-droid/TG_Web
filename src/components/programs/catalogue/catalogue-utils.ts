import type { CatalogueCourse, CatalogueProgram, CatalogueStatus } from "@/data/catalogue";

export type SortKey = "featured" | "newest" | "az" | "za";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

export const STATUS_LABEL: Record<CatalogueStatus, string> = {
  active: "Active",
  "coming-soon": "Coming Soon",
  planned: "Planned",
};

export interface Filters {
  q: string;
  industry: string | null;
  program: string | null;
  level: string | null;
  format: string | null;
  status: string | null;
  tags: string[];
  sort: SortKey;
}

export const EMPTY_FILTERS: Filters = {
  q: "",
  industry: null,
  program: null,
  level: null,
  format: null,
  status: null,
  tags: [],
  sort: "featured",
};

export interface FacetOption {
  value: string;
  count: number;
  /** Programs only: the industry this program belongs to, so the list can follow the industry filter. */
  industry?: string;
  /** Future roadmap only. Such options are parsed from the URL but never listed as current filters. */
  future?: boolean;
}

export interface Facets {
  industries: FacetOption[];
  programs: FacetOption[];
  levels: FacetOption[];
  formats: FacetOption[];
  statuses: FacetOption[];
  tags: FacetOption[];
}

const LEVEL_ORDER = ["Beginner", "Intermediate", "Advanced"];
const STATUS_ORDER = Object.values(STATUS_LABEL);

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type Counted = { value: string; count: number; future: boolean; industry?: string };

/** Counts values (in first-seen order). An option is "future" when only future entries use it. */
function tally(items: { value: string | null; future: boolean; industry?: string }[]): Counted[] {
  const map = new Map<string, Counted>();
  for (const { value, future, industry } of items) {
    if (!value) continue;
    const o = map.get(value) ?? { value, count: 0, future: true, industry };
    o.count += 1;
    if (!future) o.future = false;
    map.set(value, o);
  }
  return [...map.values()];
}

export function buildFacets(courses: CatalogueCourse[], programs: CatalogueProgram[]): Facets {
  const alpha = (a: FacetOption, b: FacetOption) => a.value.localeCompare(b.value);
  const rank = (order: string[]) => (a: FacetOption, b: FacetOption) =>
    (order.indexOf(a.value) === -1 ? 99 : order.indexOf(a.value)) -
      (order.indexOf(b.value) === -1 ? 99 : order.indexOf(b.value)) || alpha(a, b);
  const isFuture = (industryStatus: CatalogueStatus) => industryStatus !== "active";
  const courseFuture = (c: CatalogueCourse) => isFuture(c.industryStatus);

  return {
    // Industries and programs keep data order. Counts are courses, so a program that is itself the
    // offering (Digital Marketing) shows 0.
    industries: tally(programs.map((p) => ({ value: p.industryName, future: isFuture(p.industryStatus) }))).map((o) => ({
      ...o,
      count: courses.filter((c) => c.industryName === o.value).length,
    })),
    programs: tally(
      programs.map((p) => ({ value: p.name, future: isFuture(p.industryStatus), industry: p.industryName }))
    ).map((o) => ({ ...o, count: courses.filter((c) => c.programName === o.value).length })),
    levels: tally(courses.map((c) => ({ value: c.level, future: courseFuture(c) }))).sort(rank(LEVEL_ORDER)),
    formats: tally([
      ...courses.map((c) => ({ value: c.format, future: courseFuture(c) })),
      ...programs.map((p) => ({ value: p.format, future: isFuture(p.industryStatus) })),
    ]).sort(alpha),
    statuses: tally([
      ...courses.map((c) => ({ value: STATUS_LABEL[c.status], future: courseFuture(c) })),
      ...programs.map((p) => ({ value: STATUS_LABEL[p.status], future: isFuture(p.industryStatus) })),
    ]).sort(rank(STATUS_ORDER)),
    // Topics describe courses. Topics of current courses come first.
    tags: tally(courses.flatMap((c) => c.tags.map((t) => ({ value: t, future: courseFuture(c) })))).sort(
      (a, b) => Number(a.future) - Number(b.future) || b.count - a.count || alpha(a, b)
    ),
  };
}

export const searchText = (c: CatalogueCourse): string =>
  [c.title, c.subtitle, c.programName, c.industryName, c.level, c.format, c.description, ...c.tags, ...(c.keywords ?? []), ...(c.tools ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

export const programSearchText = (p: CatalogueProgram): string =>
  [p.name, p.industryName, p.format, p.description, ...p.tags, ...p.keywords].filter(Boolean).join(" ").toLowerCase();

export function activeFilterCount(f: Filters): number {
  return [f.industry, f.program, f.level, f.format, f.status].filter(Boolean).length + f.tags.length;
}

function termMatchers(q: string) {
  // Each term must match at the start of a word, so "ai" finds AI but not "campaigns".
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
}

// With no search and no filters the catalogue lists current industries only; future industries are
// shown under "What's Coming Next" and appear here once you search or filter.
const currentOnly = (f: Filters, terms: RegExp[]) => terms.length === 0 && activeFilterCount(f) === 0;

export function filterCourses(index: { course: CatalogueCourse; haystack: string }[], f: Filters): CatalogueCourse[] {
  const terms = termMatchers(f.q);
  const scoped = currentOnly(f, terms);
  return index
    .filter(({ course: c, haystack }) => {
      if (scoped && c.industryStatus !== "active") return false;
      if (f.industry && c.industryName !== f.industry) return false;
      if (f.program && c.programName !== f.program) return false;
      if (f.level && c.level !== f.level) return false;
      if (f.format && c.format !== f.format) return false;
      if (f.status && STATUS_LABEL[c.status] !== f.status) return false;
      if (f.tags.length && !c.tags.some((t) => f.tags.includes(t))) return false;
      return terms.every((t) => t.test(haystack));
    })
    .map(({ course }) => course);
}

/** Programs matching the same search and filters, to be shown as context above the courses. */
export function filterPrograms(index: { program: CatalogueProgram; haystack: string }[], f: Filters): CatalogueProgram[] {
  const terms = termMatchers(f.q);
  const scoped = currentOnly(f, terms);
  return index
    .filter(({ program: p, haystack }) => {
      if (scoped && p.industryStatus !== "active") return false;
      if (f.industry && p.industryName !== f.industry) return false;
      if (f.program && p.name !== f.program) return false;
      if (f.level) return false; // programs carry no level
      if (f.format && p.format !== f.format) return false;
      if (f.status && STATUS_LABEL[p.status] !== f.status) return false;
      if (f.tags.length && !p.tags.some((t) => f.tags.includes(t))) return false;
      return terms.every((t) => t.test(haystack));
    })
    .map(({ program }) => program)
    .sort((a, b) => a.order - b.order);
}

const STATUS_RANK: Record<CatalogueStatus, number> = { active: 0, "coming-soon": 1, planned: 2 };
const statusRank = (c: CatalogueCourse) => STATUS_RANK[c.status];

export function sortCourses(list: CatalogueCourse[], sort: SortKey): CatalogueCourse[] {
  const out = [...list];
  switch (sort) {
    case "az":
      return out.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return out.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
      return out.sort((a, b) => statusRank(a) - statusRank(b) || b.order - a.order);
    default:
      return out.sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
  }
}

const find = (options: FacetOption[], slug: string | null) =>
  (slug && options.find((o) => slugify(o.value) === slug)?.value) || null;

export function parseFilters(params: URLSearchParams, facets: Facets): Filters {
  const sort = params.get("sort");
  const tagSlugs = (params.get("tags") ?? "").split(",").filter(Boolean);
  return {
    q: params.get("q") ?? "",
    industry: find(facets.industries, params.get("industry")),
    program: find(facets.programs, params.get("program")),
    level: find(facets.levels, params.get("level")),
    format: find(facets.formats, params.get("format")),
    status: find(facets.statuses, params.get("status")),
    tags: facets.tags.filter((t) => tagSlugs.includes(slugify(t.value))).map((t) => t.value),
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortKey) : "featured",
  };
}

export function serializeFilters(f: Filters): string {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.industry) p.set("industry", slugify(f.industry));
  if (f.program) p.set("program", slugify(f.program));
  if (f.level) p.set("level", slugify(f.level));
  if (f.format) p.set("format", slugify(f.format));
  if (f.status) p.set("status", slugify(f.status));
  if (f.tags.length) p.set("tags", f.tags.map(slugify).join(","));
  if (f.sort !== "featured") p.set("sort", f.sort);
  return p.toString();
}
