// Single source of truth for the /programs catalogue.
//
// Three levels:  INDUSTRY  ->  PROGRAM  ->  COURSE
//   Industry = the broad field         (e.g. "Game Development")
//   Program  = the umbrella inside it  (e.g. "Game Development & Design")
//   Course   = the enrolment offering  (e.g. "TG Unreal Studio") - what a student chooses
//
// A Program contains `courses` (records in course-catalogue.ts / future-catalogue.ts that name it via
// `programSlug`) and/or a `curriculum` of modules. Curriculum modules are NOT courses: they are the
// syllabus of a program (e.g. the 18 modules of the Digital Marketing Professional Program), are never
// counted as courses and never appear as catalogue cards. Programs and courses are different entities:
// the catalogue lists COURSES only (COURSE_CATALOGUE) and shows programs separately, as context
// (PROGRAM_CATALOGUE). A program with no courses (Digital Marketing) is itself the offering.
//
// A course names its `programSlug` and `industrySlug`; the program names its `industrySlug`. The
// validation at the bottom checks the two agree. The slug of each entity is its id.
//
// Source of truth for current offerings: Techno Gurukul Web copy (Digital Marketing) and
// Techno-Gurukul-Game-Development-Programs. Do not add offerings the sources do not support.
//
// Adding a course = adding one row in course-catalogue.ts. Adding a program or industry = adding one
// object below. No component changes are needed.
import { COURSES as CURRENT_COURSES, DIGITAL_MARKETING_CURRICULUM } from "./course-catalogue";
import { FUTURE_COURSES, FUTURE_INDUSTRIES, FUTURE_PROGRAMS } from "./future-catalogue";

export type ProgramIcon =
  | "megaphone"
  | "bar-chart"
  | "search"
  | "code"
  | "pen-tool"
  | "boxes"
  | "layers"
  | "sparkles"
  | "gamepad"
  | "cube"
  | "palette"
  | "clapperboard"
  | "cpu"
  | "target"
  | "trending-up"
  | "users"
  | "file-text"
  | "globe"
  | "message"
  | "bug"
  | "rocket"
  | "smartphone"
  | "brain"
  | "workflow"
  | "link"
  | "map-pin"
  | "zap"
  | "lightbulb"
  | "layout"
  | "sliders"
  | "coins"
  | "book-open"
  | "package"
  | "flame"
  | "sun"
  | "bot"
  | "shield"
  | "lock"
  | "terminal"
  | "database"
  | "cloud"
  | "network"
  | "blocks"
  | "server";

export type ProgramTone = "blue" | "sky" | "navy";

/**
 * "active"       = live, has a detail page.
 * "coming-soon"  = a committed future offering, listed and searchable but not linked.
 * "planned"      = an earlier-stage proposal, listed and searchable but not linked.
 * Only current, source-backed records may be "active".
 */
export type CatalogueStatus = "active" | "coming-soon" | "planned";

/** "source" = named in the source documents. "proposed" = a strategic proposal, not from the source. */
export type CatalogueOrigin = "source" | "proposed";

export interface Industry {
  slug: string;
  name: string;
  description: string;
  status: CatalogueStatus;
  origin: CatalogueOrigin;
  order: number;
}

/** One unit of a program's syllabus. Not a course: not enrolled in separately, not listed, not counted. */
export interface CurriculumModule {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  keywords?: string[];
}

/** Extra facts for showing a program as an overview. */
export interface ProgramListing {
  format: string | null;
  /** Extra topic tags; the tags of its curriculum modules are added automatically. */
  tags: string[];
  keywords?: string[];
}

export interface Program {
  slug: string;
  name: string;
  industrySlug: string;
  description: string;
  status: CatalogueStatus;
  /** The program's detail page, if it has one. Used when the program itself is the listed offering. */
  href: string | null;
  origin: CatalogueOrigin;
  /** Syllabus modules. Optional; never counted as courses. */
  curriculum?: CurriculumModule[];
  listing?: ProgramListing;
  order: number;
}

export interface Course {
  /** Unique; also the future route segment: /courses/[slug]. */
  slug: string;
  title: string;
  /** Source display line under the title, e.g. "Unity Game Development". */
  subtitle?: string;
  industrySlug: string;
  programSlug: string;
  description: string;
  status: CatalogueStatus;
  origin: CatalogueOrigin;
  /**
   * Detail page. Required when active, must be null otherwise (nothing is linked).
   * Until /courses/[slug] pages exist, TG GameForge points at its existing page.
   */
  href: string | null;
  /** "Beginner" | "Intermediate" | "Advanced", or null when not stated. */
  level: string | null;
  /** e.g. "Offline / In-Person", or null when not stated. */
  format: string | null;
  /** Only where the source states it for this specific course. Not shown on cards. */
  duration?: string;
  /** Software the source names for this course. Searchable; not shown on cards. */
  tools?: string[];
  /** Not in the sources yet: leave unset until approved. */
  fee?: string;
  faculty?: string[];
  /** Shown on the card (max 4) and used by the topic filter. Must be in TOPIC_VOCABULARY. */
  tags: string[];
  /** Search-only terms (tools, technical words); never displayed and never filters. */
  keywords?: string[];
  /** Path under /public (e.g. "/courses/seo-fundamentals.webp"), or null to use the generated visual. */
  image: string | null;
  visual: { tone: ProgramTone; icons: ProgramIcon[] };
  featured: boolean;
  /** Catalogue order. Higher numbers are newer; "Newest" sorts by this descending. */
  order: number;
}

/** A course with its program and industry resolved. The course grid renders only these. */
export interface CatalogueCourse extends Course {
  programName: string;
  programHref: string | null;
  industryName: string;
  /** Status of the industry: only courses of active industries are in the default view. */
  industryStatus: CatalogueStatus;
}

/** A program resolved for display as context above the courses. Never a course. */
export interface CatalogueProgram {
  slug: string;
  name: string;
  industrySlug: string;
  industryName: string;
  industryStatus: CatalogueStatus;
  description: string;
  status: CatalogueStatus;
  origin: CatalogueOrigin;
  href: string | null;
  format: string | null;
  tags: string[];
  /** Search-only: includes curriculum module titles. */
  keywords: string[];
  courseCount: number;
  /** Course counts by status, e.g. { active: 1, "coming-soon": 6 }. */
  statusCounts: Partial<Record<CatalogueStatus, number>>;
  curriculumCount: number;
  order: number;
}

export const CATALOGUE_PAGE_SIZE = 12;

/** The browsable topic filters. Keep this short; detailed terms belong in `keywords`. */
export const TOPIC_VOCABULARY = [
  "Marketing",
  "Strategy",
  "Branding",
  "Content",
  "Social Media",
  "SEO",
  "AEO",
  "GEO",
  "Google Ads",
  "Meta Ads",
  "Performance Marketing",
  "Analytics",
  "AI",
  "Game Development",
  "Game Design",
  "Level Design",
  "Unity",
  "Unreal Engine",
  "Programming",
  "2D Art",
  "3D Art",
  "Animation",
  "VFX",
  "Cinematics",
  "Game AI",
  "Website",
  "Lead Generation",
  "E-commerce",
  "Freelancing",
  "Data Analytics",
  "Data Science",
  "Machine Learning",
  "Python",
  "SQL",
  "Cybersecurity",
  "Ethical Hacking",
  "Cloud",
  "DevOps",
  "Blockchain",
  "Web3",
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
] as const;

const CURRENT_INDUSTRIES: Industry[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    description: "Learning in digital marketing.",
    status: "active",
    origin: "source",
    order: 1,
  },
  {
    slug: "game-development",
    name: "Game Development",
    description: "Learning in game development.",
    status: "active",
    origin: "source",
    order: 2,
  },
];

const CURRENT_PROGRAMS: Program[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing Professional Program",
    industrySlug: "digital-marketing",
    description:
      "Complete practical digital marketing learning program covering strategy, content, SEO, advertising, analytics and AI.",
    status: "active",
    href: "/programs/tg-digital-marketing",
    origin: "source",
    curriculum: DIGITAL_MARKETING_CURRICULUM,
    listing: {
      format: "Offline / In-Person",
      tags: ["Marketing", "SEO", "Social Media", "Performance Marketing"],
      keywords: ["digital marketing", "practical", "campaigns", "advertising", "career"],
    },
    order: 1,
  },
  {
    slug: "game-development-and-design",
    name: "Game Development & Design",
    industrySlug: "game-development",
    description:
      "A practical learning pathway covering game development, design, art, animation and emerging game technologies.",
    status: "active",
    href: null,
    origin: "source",
    order: 2,
  },
];

// Current offerings first, then the future roadmap (future-catalogue.ts: coming-soon / planned only).
export const INDUSTRIES: Industry[] = [...CURRENT_INDUSTRIES, ...FUTURE_INDUSTRIES];
export const PROGRAMS: Program[] = [...CURRENT_PROGRAMS, ...FUTURE_PROGRAMS];
const COURSES: Course[] = [...CURRENT_COURSES, ...FUTURE_COURSES];

const industryBySlug = new Map(INDUSTRIES.map((i) => [i.slug, i]));
const programBySlug = new Map(PROGRAMS.map((p) => [p.slug, p]));

function resolveCourse(course: Course): CatalogueCourse {
  const program = programBySlug.get(course.programSlug);
  const industry = industryBySlug.get(course.industrySlug);
  if (!program || !industry || program.industrySlug !== industry.slug)
    throw new Error(`[catalogue] course "${course.slug}" has no valid program/industry`);
  return {
    ...course,
    programName: program.name,
    programHref: program.href,
    industrySlug: industry.slug,
    industryName: industry.name,
    industryStatus: industry.status,
  };
}

function resolveProgram(program: Program): CatalogueProgram {
  const industry = industryBySlug.get(program.industrySlug);
  if (!industry) throw new Error(`[catalogue] program "${program.slug}" has no valid industry`);
  const courses = COURSES.filter((c) => c.programSlug === program.slug);
  const modules = program.curriculum ?? [];
  const statusCounts: CatalogueProgram["statusCounts"] = {};
  for (const c of courses) statusCounts[c.status] = (statusCounts[c.status] ?? 0) + 1;
  return {
    slug: program.slug,
    name: program.name,
    industrySlug: industry.slug,
    industryName: industry.name,
    industryStatus: industry.status,
    description: program.description,
    status: program.status,
    origin: program.origin,
    href: program.href,
    format: program.listing?.format ?? null,
    // Modules make the program searchable and filterable by their topics, without becoming courses.
    tags: [...new Set([...(program.listing?.tags ?? []), ...modules.flatMap((m) => m.tags)])],
    keywords: [...(program.listing?.keywords ?? []), ...modules.flatMap((m) => [m.title, ...(m.keywords ?? [])])],
    courseCount: courses.length,
    statusCounts,
    curriculumCount: modules.length,
    order: program.order,
  };
}

const hasCourses = (p: Program) => COURSES.some((c) => c.programSlug === p.slug);

/** Courses only. Programs and curriculum modules never appear here. */
export const COURSE_CATALOGUE: CatalogueCourse[] = COURSES.map(resolveCourse);
/** Programs, shown separately as context. */
export const PROGRAM_CATALOGUE: CatalogueProgram[] = PROGRAMS.map(resolveProgram);

// Fails the build/dev server loudly if the catalogue hierarchy or data is malformed.
const STATUSES: CatalogueStatus[] = ["active", "coming-soon", "planned"];

function validateCatalogue() {
  const fail = (msg: string): never => {
    throw new Error(`[catalogue] ${msg}`);
  };
  const unique = (kind: string, values: string[]) => {
    const seen = new Set<string>();
    for (const v of values) {
      if (seen.has(v)) fail(`duplicate ${kind} "${v}"`);
      seen.add(v);
    }
  };
  for (const x of [...INDUSTRIES, ...PROGRAMS]) {
    if (!STATUSES.includes(x.status)) fail(`"${x.slug}" has an invalid status`);
    if (x.status === "active" && x.origin !== "source") fail(`"${x.slug}" cannot be active: it is not source-backed`);
  }
  unique("industry slug", INDUSTRIES.map((i) => i.slug));
  unique("program slug", PROGRAMS.map((p) => p.slug));
  unique("course slug", COURSES.map((c) => c.slug));
  unique("course title within a program", COURSES.map((c) => `${c.programSlug}:${c.title.toLowerCase()}`));

  const isTopic = (t: string) => (TOPIC_VOCABULARY as readonly string[]).includes(t);
  for (const p of PROGRAMS) {
    if (!industryBySlug.has(p.industrySlug)) fail(`program "${p.slug}" has an invalid industry`);
    const modules = p.curriculum ?? [];
    if (!hasCourses(p) && modules.length === 0) fail(`program "${p.slug}" has neither courses nor curriculum`);
    if (p.status === "active" && !hasCourses(p) && !p.href?.startsWith("/")) fail(`active program "${p.slug}" needs a valid route`);
    if (p.status !== "active" && p.href) fail(`${p.status} program "${p.slug}" must not have an href`);
    unique(`curriculum module slug in "${p.slug}"`, modules.map((m) => m.slug));
    for (const m of modules) {
      if (!m.title.trim() || !m.description.trim()) fail(`module "${m.slug}" needs a title and description`);
      for (const t of m.tags) if (!isTopic(t)) fail(`module "${m.slug}" uses unknown topic "${t}"`);
    }
    for (const t of p.listing?.tags ?? []) if (!isTopic(t)) fail(`program "${p.slug}" listing uses unknown topic "${t}"`);
  }
  // Curriculum modules must never be counted or listed as courses.
  if (COURSE_CATALOGUE.length !== COURSES.length) fail("course count does not match the course records");
  if (PROGRAM_CATALOGUE.length !== PROGRAMS.length) fail("program count does not match the program records");
  // The default (current) catalogue may only contain active industries.
  for (const i of INDUSTRIES)
    if (i.status !== "active" && COURSE_CATALOGUE.some((c) => c.industrySlug === i.slug && c.industryStatus === "active"))
      fail(`future industry "${i.slug}" leaks into the current catalogue`);
  const moduleSlugs = new Set(PROGRAMS.flatMap((p) => (p.curriculum ?? []).map((m) => `${p.slug}:${m.slug}`)));
  if (COURSES.some((c) => moduleSlugs.has(`${c.programSlug}:${c.slug}`))) fail("a curriculum module is also recorded as a course");

  for (const i of INDUSTRIES) if (!PROGRAMS.some((p) => p.industrySlug === i.slug)) fail(`industry "${i.slug}" has no programs`);

  for (const c of COURSES) {
    const program = programBySlug.get(c.programSlug);
    if (!program) fail(`course "${c.slug}" is an orphan (unknown program)`);
    if (program?.industrySlug !== c.industrySlug) fail(`course "${c.slug}" industry does not match its program's industry`);
    if (!c.title.trim() || !c.description.trim()) fail(`course "${c.slug}" needs a title and description`);
    if (!STATUSES.includes(c.status)) fail(`course "${c.slug}" has an invalid status`);
    if (c.status === "active" && !c.href?.startsWith("/")) fail(`active course "${c.slug}" needs a valid route`);
    if (c.status !== "active" && c.href) fail(`${c.status} course "${c.slug}" must not have an href`);
    if (c.status === "active" && (c.origin !== "source" || program?.status !== "active"))
      fail(`course "${c.slug}" cannot be active: only source-backed courses of an active program can`);
    for (const t of c.tags)
      if (!(TOPIC_VOCABULARY as readonly string[]).includes(t)) fail(`course "${c.slug}" uses unknown topic "${t}"`);
  }
}

validateCatalogue();
