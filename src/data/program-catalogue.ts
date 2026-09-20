// Single source of truth for the /programs catalogue.
// The catalogue holds two kinds of record, told apart by `type`:
//   "Program" = a parent learning path (this file), "Course" = a skill-based course inside one
//   (course-catalogue.ts). A course names its parent through `parentProgram` / `parentProgramSlug`.
// Adding an entry = adding one object. No component changes are needed.
// Only put approved, verified values here. Use `null` for anything that is not known, and the UI
// will simply leave it out (and hide any filter that has fewer than two real values).
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
export type ProgramStatus = "active" | "coming-soon";

export interface CatalogueProgram {
  /** Unique id; also the future route segment (e.g. /courses/seo-fundamentals). */
  slug: string;
  /** Live detail page. Required when status is "active"; null otherwise (nothing is linked). */
  href: string | null;
  status: ProgramStatus;
  title: string;
  /** Official name, e.g. "TG Unity Studio". Search-only. */
  identity: string;
  /** Parent learning path of a course, e.g. "TG Unity Studio". null for programs. */
  parentProgram: string | null;
  parentProgramSlug: string | null;
  /** Badge + category filter, e.g. "Digital & Marketing". */
  category: string;
  /** "Program" or "Course". */
  type: "Program" | "Course";
  /** "Beginner" | "Intermediate" | "Advanced", or null when not stated. */
  level: string | null;
  /** e.g. "Offline / In-Person", "Online", "Hybrid", or null when not stated. */
  format: string | null;
  description: string;
  /** Shown on the card (max 4 are displayed) and used by the topic filter. Must be in TOPIC_VOCABULARY. */
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

const PROGRAMS: CatalogueProgram[] = [
  {
    slug: "tg-digital-marketing",
    href: "/programs/tg-digital-marketing",
    status: "active",
    identity: "TG Digital Marketing",
    title: "Digital Marketing",
    parentProgram: null,
    parentProgramSlug: null,
    category: "Digital & Marketing",
    type: "Program",
    level: null,
    format: "Offline / In-Person",
    description: "Learn how brands grow in the digital world through practical, hands-on work.",
    tags: ["Marketing", "SEO", "Social Media", "Performance Marketing"],
    keywords: ["digital marketing", "strategy", "content", "advertising", "analytics", "campaigns", "search"],
    image: null,
    visual: { tone: "blue", icons: ["megaphone", "bar-chart", "search"] },
    featured: true,
    order: 1,
  },
  {
    slug: "tg-gameforge",
    href: "/programs/tg-gameforge",
    status: "active",
    identity: "TG GameForge",
    title: "Game Development & Design",
    parentProgram: null,
    parentProgramSlug: null,
    category: "Creative Technology",
    type: "Program",
    level: null,
    format: null,
    description: "Learn to turn ideas into interactive experiences through practical project work.",
    tags: ["Game Development", "Game Design", "Programming", "Animation"],
    keywords: ["interactive", "digital art", "design", "projects"],
    image: null,
    visual: { tone: "green", icons: ["code", "pen-tool", "boxes"] },
    featured: true,
    order: 2,
  },
];

// Specialised programs: not open yet. Placed after all courses in the default order.
const upcoming = (
  slug: string,
  identity: string,
  title: string,
  description: string,
  tags: string[],
  keywords: string[],
  tone: ProgramTone,
  icons: ProgramIcon[],
  order: number
): CatalogueProgram => ({
  slug,
  href: null,
  status: "coming-soon",
  identity,
  title,
  parentProgram: null,
  parentProgramSlug: null,
  category: "Creative Technology",
  type: "Program",
  level: null,
  format: null,
  description,
  tags,
  keywords,
  image: null,
  visual: { tone, icons },
  featured: false,
  order,
});

const SPECIALISED_PROGRAMS: CatalogueProgram[] = [
  upcoming("tg-unity-studio", "TG Unity Studio", "Unity Game Development", "Build games with Unity and C#, from gameplay systems and interaction to optimization and deployment.", ["Unity", "Game Development", "Programming"], ["c#", "gameplay", "interactive"], "navy", ["gamepad", "code", "cube"], 103),
  upcoming("tg-unreal-studio", "TG Unreal Studio", "Unreal Engine Development", "Build interactive experiences with Unreal Engine, Blueprints and C++.", ["Unreal Engine", "Game Development", "Programming"], ["blueprints", "c++", "3d"], "blue", ["cube", "code", "gamepad"], 104),
  upcoming("tg-gameart-studio", "TG GameArt Studio", "2D & 3D Game Art", "Create characters, environments, props and game-ready visual assets through practical 2D and 3D workflows.", ["2D Art", "3D Art"], ["game art", "blender", "character design", "environments", "props"], "green", ["palette", "pen-tool", "cube"], 105),
  upcoming("tg-gamedesign-studio", "TG GameDesign Studio", "Game & Level Design", "Design game mechanics, levels, progression and player experiences through practical game-design work.", ["Game Design", "Level Design"], ["game mechanics", "prototyping", "interactive", "player experience"], "navy", ["layers", "boxes", "pen-tool"], 106),
  upcoming("tg-game-animation-vfx", "TG Game Animation & VFX", "Game Animation, VFX & Cinematics", "Bring interactive experiences to life through animation, visual effects, lighting and cinematic workflows.", ["Animation", "VFX", "Cinematics"], ["3d", "lighting", "game development"], "blue", ["clapperboard", "sparkles", "cube"], 107),
  upcoming("tg-ai-for-games", "TG AI for Games", "AI & Generative AI for Game Development", "Explore game AI, intelligent NPC systems and practical AI-assisted game-development workflows.", ["AI", "Game AI", "Game Development"], ["generative ai", "npc systems", "artificial intelligence"], "green", ["cpu", "sparkles", "gamepad"], 108),
];

export const PROGRAM_CATALOGUE: CatalogueProgram[] = [...PROGRAMS, ...COURSES, ...SPECIALISED_PROGRAMS];

// Fails the build/dev server loudly if the catalogue data is malformed.
function validateCatalogue(list: CatalogueProgram[]) {
  const fail = (msg: string): never => {
    throw new Error(`[program-catalogue] ${msg}`);
  };
  const slugs = new Set<string>();
  const titles = new Set<string>();
  const parents = new Set(list.filter((p) => p.type === "Program").map((p) => p.slug));
  for (const p of list) {
    if (slugs.has(p.slug)) fail(`duplicate slug "${p.slug}"`);
    slugs.add(p.slug);
    const key = `${p.type}:${p.title.toLowerCase()}`;
    if (titles.has(key)) fail(`duplicate ${p.type.toLowerCase()} title "${p.title}"`);
    titles.add(key);
    if (!p.title.trim() || !p.description.trim()) fail(`"${p.slug}" needs a title and description`);
    if (p.status !== "active" && p.status !== "coming-soon") fail(`"${p.slug}" has invalid status`);
    if (p.status === "active" && !p.href) fail(`active entry "${p.slug}" needs an href`);
    if (p.status === "coming-soon" && p.href) fail(`coming-soon entry "${p.slug}" must not have an href`);
    if (p.type === "Course" && !(p.parentProgram && p.parentProgramSlug && parents.has(p.parentProgramSlug)))
      fail(`course "${p.slug}" needs a valid parent program`);
    for (const t of p.tags)
      if (!(TOPIC_VOCABULARY as readonly string[]).includes(t)) fail(`"${p.slug}" uses unknown topic "${t}"`);
  }
  const courses = list.filter((p) => p.type === "Course");
  const marketing = courses.filter((p) => p.category === "Digital & Marketing").length;
  const games = courses.length - marketing;
  if (marketing !== 40 || games !== 60 || courses.length !== 100)
    fail(`expected 40 + 60 = 100 courses, got ${marketing} + ${games} = ${courses.length}`);
}

validateCatalogue(PROGRAM_CATALOGUE);
