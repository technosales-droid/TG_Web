// Single source of truth for the /programs catalogue.
//
// Three levels:  INDUSTRY  ->  PROGRAM  ->  COURSE
//   Industry = the broad field         (e.g. "Game Development")
//   Program  = the umbrella inside it  (e.g. "Game Development & Design")
//   Course   = the enrolment offering  (e.g. "TG Unreal Development") - what a student chooses
//
// A course stores only its `programSlug`; the program stores only its `industrySlug`. Everything
// else (industry name, program name, ...) is derived in COURSE_CATALOGUE, so parent data is never
// repeated. The slug of each entity is its id.
//
// Adding a course = adding one row in course-catalogue.ts. Adding a program or industry = adding one
// object below. No component changes are needed.
import { COURSES } from "./course-catalogue";

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
  | "bot";

export type ProgramTone = "blue" | "green" | "navy";

/** "coming-soon" entries are listed and searchable but have no detail page to link to yet. */
export type CatalogueStatus = "active" | "coming-soon";

export interface Industry {
  slug: string;
  name: string;
  description: string;
  status: CatalogueStatus;
  order: number;
}

export interface Program {
  slug: string;
  name: string;
  industrySlug: string;
  description: string;
  status: CatalogueStatus;
  /** Existing program-level overview page, if there is one. Not a course page. */
  href: string | null;
  order: number;
}

export interface Course {
  /** Unique; also the future route segment: /courses/[slug]. */
  slug: string;
  title: string;
  programSlug: string;
  description: string;
  status: CatalogueStatus;
  /**
   * Detail page. Required when active, must be null when coming-soon (nothing is linked).
   * Until /courses/[slug] pages exist, TG GameForge points at its existing page.
   */
  href: string | null;
  /** "Beginner" | "Intermediate" | "Advanced", or null when not stated. */
  level: string | null;
  /** e.g. "Offline / In-Person", or null when not stated. */
  format: string | null;
  /** Reserved for the future course page; leave unset until the value is approved. */
  duration?: string;
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

/** A course with its program and industry resolved. This is what the catalogue UI renders. */
export interface CatalogueCourse extends Course {
  programName: string;
  programHref: string | null;
  industrySlug: string;
  industryName: string;
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
] as const;

export const INDUSTRIES: Industry[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    description: "Learning in digital marketing.",
    status: "active",
    order: 1,
  },
  {
    slug: "game-development",
    name: "Game Development",
    description: "Learning in game development.",
    status: "active",
    order: 2,
  },
];

export const PROGRAMS: Program[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    industrySlug: "digital-marketing",
    description: "Learn how brands grow in the digital world through practical, hands-on work.",
    status: "active",
    href: "/programs/tg-digital-marketing",
    order: 1,
  },
  {
    slug: "game-development-and-design",
    name: "Game Development & Design",
    industrySlug: "game-development",
    description: "Learn to turn ideas into interactive experiences through practical project work.",
    status: "active",
    href: null,
    order: 2,
  },
];

const industryBySlug = new Map(INDUSTRIES.map((i) => [i.slug, i]));
const programBySlug = new Map(PROGRAMS.map((p) => [p.slug, p]));

function resolve(course: Course): CatalogueCourse {
  const program = programBySlug.get(course.programSlug);
  const industry = program && industryBySlug.get(program.industrySlug);
  if (!program || !industry) throw new Error(`[catalogue] course "${course.slug}" has no valid program/industry`);
  return {
    ...course,
    programName: program.name,
    programHref: program.href,
    industrySlug: industry.slug,
    industryName: industry.name,
  };
}

export const COURSE_CATALOGUE: CatalogueCourse[] = COURSES.map(resolve);

// Fails the build/dev server loudly if the catalogue hierarchy or data is malformed.
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
  unique("industry slug", INDUSTRIES.map((i) => i.slug));
  unique("program slug", PROGRAMS.map((p) => p.slug));
  unique("course slug", COURSES.map((c) => c.slug));
  unique("course title", COURSES.map((c) => c.title.toLowerCase()));

  for (const p of PROGRAMS) {
    if (!industryBySlug.has(p.industrySlug)) fail(`program "${p.slug}" has an invalid industry`);
    if (!COURSES.some((c) => c.programSlug === p.slug)) fail(`program "${p.slug}" has no courses`);
  }
  for (const i of INDUSTRIES) if (!PROGRAMS.some((p) => p.industrySlug === i.slug)) fail(`industry "${i.slug}" has no programs`);

  for (const c of COURSES) {
    if (!programBySlug.has(c.programSlug)) fail(`course "${c.slug}" is an orphan (unknown program)`);
    if (!c.title.trim() || !c.description.trim()) fail(`course "${c.slug}" needs a title and description`);
    if (c.status !== "active" && c.status !== "coming-soon") fail(`course "${c.slug}" has an invalid status`);
    if (c.status === "active" && !c.href) fail(`active course "${c.slug}" needs an href`);
    if (c.status === "coming-soon" && c.href) fail(`coming-soon course "${c.slug}" must not have an href`);
    for (const t of c.tags)
      if (!(TOPIC_VOCABULARY as readonly string[]).includes(t)) fail(`course "${c.slug}" uses unknown topic "${t}"`);
  }
}

validateCatalogue();
