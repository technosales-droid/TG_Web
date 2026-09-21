import {
  MEDIA_LABEL,
  MEDIA_TYPES,
  PROJECT_STATUSES,
  MEDIA_LABEL_PLURAL,
  STATUS_LABEL,
  type MediaType,
  type Project,
  type ProjectCreator,
  type ProjectMedia,
  type ProjectStatus,
} from "@/data/projects";

export type SortKey = "featured" | "newest" | "oldest" | "az" | "za";
export type ViewMode = "grid" | "list";

/** Everything the library remembers, and everything that lives in the URL. */
export interface LibraryState {
  q: string;
  creator: "all" | ProjectCreator;
  featuredOnly: boolean;
  industry: string;
  program: string;
  course: string;
  projectTypes: string[];
  media: MediaType[];
  status: ProjectStatus[];
  topics: string[];
  tools: string[];
  sort: SortKey;
  view: ViewMode;
}

export const EMPTY_STATE: LibraryState = {
  q: "",
  creator: "all",
  featuredOnly: false,
  industry: "",
  program: "",
  course: "",
  projectTypes: [],
  media: [],
  status: [],
  topics: [],
  tools: [],
  sort: "featured",
  view: "grid",
};

// "Newest" and "Oldest" follow the order records were added to the library. No dates are shown or implied.
export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest added" },
  { value: "oldest", label: "Oldest added" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

export const CREATOR_LABEL = { student: "Student Work", faculty: "Faculty Work" } as const;

/** "Sample Student Project" while the record is a sample, otherwise the creator name. */
export const sampleLabel = (p: Project) =>
  p.sample ? `Sample ${p.creatorType === "student" ? "Student" : "Faculty"} Project` : (p.creatorName ?? CREATOR_LABEL[p.creatorType]);

// ------------------------------------------------------------------ facets (all derived from data)

const uniq = <T,>(values: T[]) => [...new Set(values)];
const alpha = (a: string, b: string) => a.localeCompare(b);

export type Facets = ReturnType<typeof buildFacets>;

export function buildFacets(projects: Project[]) {
  const pairs = (pick: (p: Project) => [string, string] | null) => {
    const seen = new Map<string, string>();
    for (const p of projects) {
      const pair = pick(p);
      if (pair) seen.set(pair[0], pair[1]);
    }
    return [...seen].map(([name, parent]) => ({ name, parent }));
  };
  // Options are limited to what the data uses, in a fixed, sensible order.
  const usedMedia = new Set(projects.flatMap((p) => p.media.map((m) => m.type)));
  const usedStatus = new Set(projects.map((p) => p.status));
  const mediaTypes = MEDIA_TYPES.filter((t) => usedMedia.has(t));
  return {
    industries: uniq(projects.map((p) => p.industry)),
    programs: pairs((p) => [p.program, p.industry]),
    courses: pairs((p) => (p.course ? [p.course, p.program] : null)),
    projectTypes: uniq(projects.map((p) => p.projectType)).sort(alpha) as string[],
    mediaTypes: mediaTypes.map((value) => ({ value, label: MEDIA_LABEL[value] })),
    statuses: PROJECT_STATUSES.filter((s) => usedStatus.has(s)).map((value) => ({ value, label: STATUS_LABEL[value] })),
    topics: uniq(projects.flatMap((p) => p.topics)).sort(alpha),
    tools: uniq(projects.flatMap((p) => p.tools)).sort(alpha),
  };
}

export const programsFor = (facets: Facets, industry: string) =>
  facets.programs.filter((p) => !industry || p.parent === industry).map((p) => p.name);

export const coursesFor = (facets: Facets, industry: string, program: string) =>
  facets.courses
    .filter((c) => (program ? c.parent === program : !industry || facets.programs.find((p) => p.name === c.parent)?.parent === industry))
    .map((c) => c.name);

/**
 * Applies a change and keeps Industry → Program → Course consistent: an invalid downstream choice is cleared,
 * and choosing a program or course first also fills in the industry / program it belongs to.
 */
export function applyPatch(state: LibraryState, patch: Partial<LibraryState>, facets: Facets): LibraryState {
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

export function projectSearchText(p: Project): string {
  return [
    p.title,
    p.shortDescription,
    p.longDescription,
    p.creatorType,
    p.creatorType === "student" ? "students student work" : "faculty work",
    p.creatorName,
    p.sample ? "sample" : "",
    p.industry,
    p.program,
    p.course,
    p.projectType,
    STATUS_LABEL[p.status],
    ...p.topics,
    ...p.tools,
    ...p.media.map((m) => `${m.type} ${MEDIA_LABEL_PLURAL[m.type]} ${m.label}`),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export type SearchIndex = { project: Project; haystack: string }[];

export function filterProjects(index: SearchIndex, s: LibraryState): Project[] {
  // Each search word must match at the start of a word, so "seo report" needs both.
  const terms = s.q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  // AND between groups; OR inside a multi-select group.
  const anyOf = <T,>(picked: T[], has: (v: T) => boolean) => picked.length === 0 || picked.some(has);
  return index
    .filter(({ project: p, haystack }) => {
      if (s.creator !== "all" && p.creatorType !== s.creator) return false;
      if (s.featuredOnly && !p.featured) return false;
      if (s.industry && p.industry !== s.industry) return false;
      if (s.program && p.program !== s.program) return false;
      if (s.course && p.course !== s.course) return false;
      if (!anyOf(s.projectTypes, (t) => p.projectType === t)) return false;
      if (!anyOf(s.media, (t) => p.media.some((m) => m.type === t))) return false;
      if (!anyOf(s.status, (t) => p.status === t)) return false;
      if (!anyOf(s.topics, (t) => p.topics.includes(t))) return false;
      if (!anyOf(s.tools, (t) => p.tools.includes(t))) return false;
      return terms.every((t) => t.test(haystack));
    })
    .map(({ project }) => project);
}

const SORTERS: Record<SortKey, (a: Project, b: Project) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order,
  newest: (a, b) => b.order - a.order,
  oldest: (a, b) => a.order - b.order,
  az: (a, b) => a.title.localeCompare(b.title),
  za: (a, b) => b.title.localeCompare(a.title),
};
export const sortProjects = (list: Project[], sort: SortKey) => [...list].sort(SORTERS[sort]);

export type SpotlightMode = "featured" | "student" | "faculty";

/**
 * The spotlight: the first featured project, or the first featured student / faculty project. The Students and
 * Faculty views prefer a different project from the Featured view, so switching always shows something new.
 */
export function pickSpotlight(projects: Project[], mode: SpotlightMode): Project | undefined {
  const byOrder = [...projects].sort((a, b) => a.order - b.order);
  const featured = byOrder.find((p) => p.featured) ?? byOrder[0];
  if (mode === "featured") return featured;
  const ofType = byOrder.filter((p) => p.creatorType === mode);
  return ofType.find((p) => p.featured && p !== featured) ?? ofType.find((p) => p.featured) ?? ofType[0];
}

// ------------------------------------------------------------------ active filters

export const activeFilterCount = (s: LibraryState) =>
  (s.creator !== "all" ? 1 : 0) +
  (s.featuredOnly ? 1 : 0) +
  (s.industry ? 1 : 0) +
  (s.program ? 1 : 0) +
  (s.course ? 1 : 0) +
  s.projectTypes.length +
  s.media.length +
  s.status.length +
  s.topics.length +
  s.tools.length;

export const isFiltering = (s: LibraryState) => s.q.trim() !== "" || activeFilterCount(s) > 0;

export interface Chip {
  key: string;
  label: string;
  remove: Partial<LibraryState>;
}

export function activeChips(s: LibraryState): Chip[] {
  const chips: Chip[] = [];
  const q = s.q.trim();
  if (q) chips.push({ key: "q", label: `Search: ${q}`, remove: { q: "" } });
  if (s.creator !== "all") chips.push({ key: "creator", label: CREATOR_LABEL[s.creator], remove: { creator: "all" } });
  if (s.featuredOnly) chips.push({ key: "featured", label: "Featured", remove: { featuredOnly: false } });
  if (s.industry) chips.push({ key: "industry", label: s.industry, remove: { industry: "" } });
  if (s.program) chips.push({ key: "program", label: s.program, remove: { program: "" } });
  if (s.course) chips.push({ key: "course", label: s.course, remove: { course: "" } });
  for (const t of s.projectTypes) chips.push({ key: `type:${t}`, label: t, remove: { projectTypes: s.projectTypes.filter((x) => x !== t) } });
  for (const t of s.media) chips.push({ key: `media:${t}`, label: MEDIA_LABEL[t], remove: { media: s.media.filter((x) => x !== t) } });
  for (const t of s.status) chips.push({ key: `status:${t}`, label: STATUS_LABEL[t], remove: { status: s.status.filter((x) => x !== t) } });
  for (const t of s.topics) chips.push({ key: `topic:${t}`, label: t, remove: { topics: s.topics.filter((x) => x !== t) } });
  for (const t of s.tools) chips.push({ key: `tool:${t}`, label: t, remove: { tools: s.tools.filter((x) => x !== t) } });
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

export function parseSearch(search: string, facets: Facets): LibraryState {
  const params = new URLSearchParams(search);
  const one = (key: string, options: readonly string[]) => pickFrom(params.get(key), options)[0] ?? "";
  const creator = params.get("creator");
  const sort = params.get("sort");
  const state: LibraryState = {
    ...EMPTY_STATE,
    q: params.get("q") ?? "",
    creator: creator === "student" || creator === "faculty" ? creator : "all",
    featuredOnly: params.get("featured") === "1",
    industry: one("industry", facets.industries),
    program: one("program", facets.programs.map((p) => p.name)),
    course: one("course", facets.courses.map((c) => c.name)),
    projectTypes: pickFrom(params.get("type"), facets.projectTypes),
    media: pickFrom(params.get("media"), facets.mediaTypes.map((m) => m.value)),
    status: pickFrom(params.get("status"), facets.statuses.map((x) => x.value)),
    topics: pickFrom(params.get("topics"), facets.topics),
    tools: pickFrom(params.get("tools"), facets.tools),
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortKey) : "featured",
    view: params.get("view") === "list" ? "list" : "grid",
  };
  // A hand-edited URL can name a program outside its industry; the same clean-up as a filter change applies.
  return applyPatch(EMPTY_STATE, state, facets);
}

export function toSearch(s: LibraryState): string {
  const params = new URLSearchParams();
  if (s.q.trim()) params.set("q", s.q);
  if (s.creator !== "all") params.set("creator", s.creator);
  if (s.featuredOnly) params.set("featured", "1");
  if (s.industry) params.set("industry", slug(s.industry));
  if (s.program) params.set("program", slug(s.program));
  if (s.course) params.set("course", slug(s.course));
  const list = (key: string, values: string[]) => values.length && params.set(key, values.map(slug).join(","));
  list("type", s.projectTypes);
  list("media", s.media);
  list("status", s.status);
  list("topics", s.topics);
  list("tools", s.tools);
  if (s.sort !== "featured") params.set("sort", s.sort);
  if (s.view !== "grid") params.set("view", s.view);
  // Keep commas readable: "media=video,pdf" instead of "media=video%2Cpdf".
  return params.toString().replace(/%2C/g, ",");
}

// ------------------------------------------------------------------ media helpers

/** "4 files" or "3 images · 1 PDF": enough to show richness without listing filenames. */
export function mediaCount(p: Project): string {
  const counts = new Map<MediaType, number>();
  for (const m of p.media) counts.set(m.type, (counts.get(m.type) ?? 0) + 1);
  if (counts.size > 3 || p.media.length > 4) return `${p.media.length} files`;
  return [...counts].map(([t, n]) => `${n} ${n === 1 ? MEDIA_LABEL[t].toLowerCase() : MEDIA_LABEL_PLURAL[t].toLowerCase()}`).join(" · ").replace(/\bpdf(s?)\b/g, "PDF$1");
}

/** Short badge for a media item: the file format when known, otherwise the media type. */
export function mediaBadge(m: ProjectMedia): string {
  const ext = (m.url ?? "").split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  const mime = m.mimeType ?? "";
  if (m.type === "pdf" || ext === "pdf" || mime === "application/pdf") return "PDF";
  if (m.type === "document") {
    if (ext === "docx" || mime.includes("wordprocessingml")) return "DOCX";
    if (ext === "txt" || mime === "text/plain") return "TXT";
    return "DOC";
  }
  if (m.type === "spreadsheet") {
    if (ext === "csv" || mime === "text/csv") return "CSV";
    if (ext === "xlsx" || mime.includes("spreadsheetml")) return "XLSX";
    return "XLS";
  }
  if (m.type === "presentation") return ext === "pptx" || mime.includes("presentationml") ? "PPTX" : "PPT";
  if (m.type === "video") return "VIDEO";
  if (m.type === "image") return "IMAGE";
  if (m.type === "gallery") return "GALLERY";
  return "LINK";
}

/** What opening the media does, for the button label and screen readers. */
export const mediaAction: Record<MediaType, string> = {
  image: "View image",
  video: "Watch video",
  pdf: "Open PDF",
  document: "Open document",
  spreadsheet: "Open spreadsheet",
  presentation: "Open presentation",
  "external-link": "Open link",
  gallery: "View gallery",
};
