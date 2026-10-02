// Resource library data for /learning/resources.
//
// Resources are things learners USE to learn, practise, reference or build. (Projects are things
// students and faculty CREATE: see projects.ts.)
//
// EVERY record below is a SAMPLE RESOURCE RECORD. The repository holds no published Techno Gurukul
// learning material, so nothing here is a real file: `url` is null everywhere, the UI shows
// "Resource Preview Coming Soon", and nothing is downloadable. There are no authors, no dates and no
// invented sources.
//
// To publish a real resource: set `sample: false` and `status: "available"`, and put the file or link in
// src/server/gated-content.ts. This file is sent to every visitor's browser, so it holds only the public preview
// (title, description, type, thumbnail). The file itself is only sent to a visitor with an access session, so a real
// URL must never be written here; the check at the bottom fails the build if it is.
//
// Industry, program and course names must match the catalogue (src/data/catalogue.ts); a resource that is
// not tied to one keeps them null ("General"). That is checked at the bottom of this file.
//
// `order` is the stable order in which records were added (higher = added later). It is not a date.

import { COURSE_CATALOGUE, INDUSTRIES, PROGRAMS } from "./catalogue";

export const RESOURCE_TYPES = [
  "Guide",
  "Checklist",
  "Template",
  "Reference",
  "Practice Material",
  "Project Resource",
  "Report",
  "Video",
  "Presentation",
  "Document",
  "Worksheet",
  "External Resource",
] as const;
export const RESOURCE_FORMATS = ["PDF", "DOC", "DOCX", "PPT", "PPTX", "XLS", "XLSX", "CSV", "IMAGE", "VIDEO", "EXTERNAL LINK"] as const;
export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export const RESOURCE_STATUSES = ["available", "coming-soon"] as const;
export const RESOURCE_SOURCES = ["Techno Gurukul", "Faculty Resource", "External Resource"] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];
export type ResourceFormat = (typeof RESOURCE_FORMATS)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
export type ResourceStatus = (typeof RESOURCE_STATUSES)[number];

export const DIFFICULTY_LABEL: Record<Difficulty, string> = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };
export const STATUS_LABEL: Record<ResourceStatus, string> = { available: "Available", "coming-soon": "Coming soon" };

/** Broad conceptual groupings. They are derived from the type, never stored on a record. */
export type ResourceCategory = "Learn" | "Practise" | "Build" | "Explore";
export const CATEGORY_OF: Record<ResourceType, ResourceCategory> = {
  Guide: "Learn",
  Reference: "Learn",
  Checklist: "Practise",
  Worksheet: "Practise",
  "Practice Material": "Practise",
  Template: "Build",
  "Project Resource": "Build",
  Report: "Explore",
  Presentation: "Explore",
  Video: "Explore",
  Document: "Explore",
  "External Resource": "Explore",
};

export interface Resource {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  resourceType: ResourceType;
  /** Names from the catalogue, or null when the resource is General. */
  industry: string | null;
  program: string | null;
  course: string | null;
  topics: string[];
  difficulty?: Difficulty;
  format: ResourceFormat;
  status: ResourceStatus;
  featured: boolean;
  /** true until a real, published resource replaces the record. Sample records are labelled in the UI. */
  sample: boolean;
  order: number;
  /** Only when true and appropriate: "Techno Gurukul", "Faculty Resource" or "External Resource". */
  source?: (typeof RESOURCE_SOURCES)[number];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  duration?: string;
  estimatedTime?: string;
  thumbnail?: string;
  /** The file or video. url null = not supplied yet. */
  media?: { url: string | null; mimeType?: string };
  externalUrl?: string;
}

export const RESOURCE_PAGE_SIZE = 12;

const DM = { industry: "Digital Marketing", program: "Digital Marketing Professional Program", course: null } as const;
const GAME = { industry: "Game Development", program: "Game Development & Design" } as const;
const FORGE = { ...GAME, course: "Game Development Professional Program" } as const;
const GENERAL = { industry: null, program: null, course: null } as const;

type Seed = Omit<Resource, "id" | "order" | "status" | "featured" | "sample">;
const SEEDS: (Seed & { featured?: boolean })[] = [
  // ------------------------------------------------------------------ interleaved so page 1 mixes areas
  {
    slug: "sample-seo-guide",
    title: "Sample SEO Guide",
    shortDescription: "A practical introduction to how search visibility works and how a page is made easier to find.",
    ...DM,
    resourceType: "Guide",
    topics: ["SEO", "Content"],
    difficulty: "beginner",
    format: "PDF",
    featured: true,
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-game-design-guide",
    title: "Sample Game Design Guide",
    shortDescription: "An overview of how a game idea becomes mechanics, goals and a loop a player can understand.",
    ...FORGE,
    resourceType: "Guide",
    topics: ["Game Design", "Game Development"],
    difficulty: "beginner",
    format: "PDF",
    featured: true,
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-project-planning-template",
    title: "Sample Project Planning Template",
    shortDescription: "A blank structure for planning a project: goal, steps, materials, checkpoints and how it will be reviewed.",
    ...GENERAL,
    resourceType: "Template",
    topics: ["Planning", "Documentation"],
    format: "DOCX",
    featured: true,
    media: { url: null },
  },
  {
    slug: "sample-seo-checklist",
    title: "Sample SEO Checklist",
    shortDescription: "A step-by-step checklist for reviewing a page's basics before it is published.",
    ...DM,
    resourceType: "Checklist",
    topics: ["SEO", "Content"],
    difficulty: "beginner",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-level-design-checklist",
    title: "Sample Level Design Checklist",
    shortDescription: "Points to check when reviewing a level's flow, pacing, player guidance and readability.",
    ...FORGE,
    resourceType: "Checklist",
    topics: ["Level Design", "Game Design"],
    difficulty: "intermediate",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-portfolio-checklist",
    title: "Sample Portfolio Checklist",
    shortDescription: "A checklist for organising finished work into a clear, presentable portfolio.",
    ...GENERAL,
    resourceType: "Checklist",
    topics: ["Portfolio", "Documentation"],
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-content-planning-template",
    title: "Sample Content Planning Template",
    shortDescription: "A planning sheet for themes, formats and a publishing rhythm for a chosen audience.",
    ...DM,
    resourceType: "Template",
    topics: ["Content", "Strategy"],
    difficulty: "beginner",
    format: "XLSX",
    media: { url: null },
  },
  {
    slug: "sample-game-mechanics-reference",
    title: "Sample Game Mechanics Reference",
    shortDescription: "A quick reference to common mechanics, what each one asks of the player and how they combine.",
    ...FORGE,
    resourceType: "Reference",
    topics: ["Game Design", "Game Development"],
    difficulty: "intermediate",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-learning-planner",
    title: "Sample Learning Planner",
    shortDescription: "A simple planner for setting a learning goal, splitting it into steps and tracking what has been practised.",
    ...GENERAL,
    resourceType: "Template",
    topics: ["Planning"],
    format: "XLSX",
    media: { url: null },
  },
  {
    slug: "sample-social-media-planning-template",
    title: "Sample Social Media Planning Template",
    shortDescription: "A calendar-style layout for planning posts, formats and how each post would be reviewed.",
    ...DM,
    resourceType: "Template",
    topics: ["Social Media", "Content"],
    difficulty: "beginner",
    format: "XLSX",
    media: { url: null },
  },
  {
    slug: "sample-unity-planning-worksheet",
    title: "Sample Unity Planning Worksheet",
    shortDescription: "A worksheet for planning a small Unity build: scope, scenes, scripts and what to test first.",
    ...FORGE,
    resourceType: "Worksheet",
    topics: ["Unity", "C#", "Planning"],
    difficulty: "beginner",
    format: "DOCX",
    media: { url: null },
  },
  {
    slug: "sample-analytics-reference",
    title: "Sample Analytics Reference",
    shortDescription: "A short reference to common marketing measures and what each one can and cannot tell you.",
    ...DM,
    resourceType: "Reference",
    topics: ["Analytics", "Performance Marketing"],
    difficulty: "intermediate",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-unreal-development-reference",
    title: "Sample Unreal Development Reference",
    shortDescription: "A reference to project structure and common building blocks when working in Unreal Engine.",
    ...FORGE,
    resourceType: "Reference",
    topics: ["Unreal Engine", "Game Development"],
    difficulty: "intermediate",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-campaign-planning-guide",
    title: "Sample Campaign Planning Guide",
    shortDescription: "A guide to moving from a brief to a campaign plan: audience, message, channels and measurement.",
    ...DM,
    resourceType: "Guide",
    topics: ["Strategy", "Marketing", "Performance Marketing"],
    difficulty: "intermediate",
    format: "PDF",
    featured: true,
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-game-art-checklist",
    title: "Sample Game Art Checklist",
    shortDescription: "Points to check before an art asset is handed over: scale, naming, textures and presentation.",
    ...FORGE,
    resourceType: "Checklist",
    topics: ["3D Art", "Blender"],
    difficulty: "beginner",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-documentation-template",
    title: "Sample Documentation Template",
    shortDescription: "A structure for documenting a piece of work: purpose, process, decisions and outcome.",
    ...GENERAL,
    resourceType: "Template",
    topics: ["Documentation", "Portfolio"],
    format: "DOCX",
    media: { url: null },
  },
  {
    slug: "sample-performance-marketing-guide",
    title: "Sample Performance Marketing Guide",
    shortDescription: "A guide to how paid campaigns are set up, measured and adjusted, explained step by step.",
    ...DM,
    resourceType: "Guide",
    topics: ["Performance Marketing", "Google Ads", "Meta Ads"],
    difficulty: "advanced",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-character-art-reference",
    title: "Sample Character Art Reference",
    shortDescription: "A reference for proportions, silhouettes and turnaround sheets used when building a character in Blender.",
    ...FORGE,
    resourceType: "Reference",
    topics: ["3D Art", "Blender", "Animation"],
    difficulty: "intermediate",
    format: "IMAGE",
    media: { url: null },
  },
  {
    slug: "sample-presentation-guide",
    title: "Sample Presentation Guide",
    shortDescription: "A guide to structuring a short presentation of finished work so the story is easy to follow.",
    ...GENERAL,
    resourceType: "Guide",
    topics: ["Presentation", "Portfolio"],
    difficulty: "beginner",
    format: "PPTX",
    media: { url: null },
  },
  {
    slug: "sample-game-ai-guide",
    title: "Sample Game AI Guide",
    shortDescription: "A guide to simple decision-making for non-player characters, from states to basic pathfinding ideas.",
    ...FORGE,
    resourceType: "Guide",
    topics: ["Game AI", "Programming", "Unity"],
    difficulty: "advanced",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-marketing-brief-template",
    title: "Sample Marketing Brief Template",
    shortDescription: "A one-page brief layout: goal, audience, message, channels and how success would be judged.",
    ...DM,
    resourceType: "Template",
    topics: ["Marketing", "Strategy", "Planning"],
    difficulty: "beginner",
    format: "DOCX",
    media: { url: null },
  },
  {
    slug: "sample-reflection-worksheet",
    title: "Sample Reflection Worksheet",
    shortDescription: "Prompts for looking back on a piece of work: what worked, what changed and what to try next.",
    ...GENERAL,
    resourceType: "Worksheet",
    topics: ["Reflection", "Documentation"],
    format: "DOCX",
    media: { url: null },
  },
  {
    slug: "sample-keyword-research-worksheet",
    title: "Sample Keyword Research Worksheet",
    shortDescription: "A worksheet for grouping search terms by intent and matching them to pages.",
    ...DM,
    resourceType: "Practice Material",
    topics: ["SEO", "Content"],
    difficulty: "intermediate",
    format: "XLSX",
    media: { url: null },
  },
  {
    slug: "sample-animation-basics-video",
    title: "Sample Animation Basics Video",
    shortDescription: "A short walkthrough of timing, spacing and weight, shown with a simple bouncing-ball exercise.",
    ...FORGE,
    resourceType: "Video",
    topics: ["Animation", "Blender"],
    difficulty: "beginner",
    format: "VIDEO",
    duration: "Short walkthrough",
    media: { url: null },
  },
  {
    slug: "sample-level-blockout-template",
    title: "Sample Level Blockout Template",
    shortDescription: "A layout sheet for sketching a level blockout before building it in an engine.",
    ...FORGE,
    resourceType: "Template",
    topics: ["Level Design", "Planning"],
    difficulty: "beginner",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-content-calendar-practice",
    title: "Sample Content Calendar Practice Material",
    shortDescription: "A practice exercise: build a four-week content calendar from a short, made-up brief.",
    ...DM,
    resourceType: "Practice Material",
    topics: ["Content", "Social Media"],
    difficulty: "beginner",
    format: "DOCX",
    media: { url: null },
  },
  {
    slug: "sample-project-resource-pack",
    title: "Sample Project Resource Pack",
    shortDescription: "A set of starter materials for a small project: a brief, a checklist and a reference sheet.",
    ...GENERAL,
    resourceType: "Project Resource",
    topics: ["Planning", "Documentation"],
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-vfx-reference",
    title: "Sample VFX Reference",
    shortDescription: "A reference to the building blocks of a visual effect: shape, colour, timing and layering.",
    ...FORGE,
    resourceType: "Reference",
    topics: ["VFX", "Animation"],
    difficulty: "intermediate",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-ai-tools-overview",
    title: "Sample AI Tools Overview",
    shortDescription: "A slide overview of where AI tools can support research, drafting and analysis, and where judgement stays human.",
    ...DM,
    resourceType: "Presentation",
    topics: ["AI", "Marketing"],
    difficulty: "beginner",
    format: "PPTX",
    media: { url: null },
  },
  {
    slug: "sample-playtest-report",
    title: "Sample Playtest Report",
    shortDescription: "An example layout for reporting what testers did, what confused them and what would change.",
    ...FORGE,
    resourceType: "Report",
    topics: ["Game Design", "Documentation"],
    difficulty: "intermediate",
    format: "PDF",
    media: { url: null, mimeType: "application/pdf" },
  },
  {
    slug: "sample-resource-roundup",
    title: "Sample External Resource Roundup",
    shortDescription: "A page that would collect useful outside reading on one topic, with a line about why each item helps.",
    ...GENERAL,
    resourceType: "External Resource",
    topics: ["Reading"],
    format: "EXTERNAL LINK",
    source: "External Resource",
  },
];

const SEEDED: Resource[] = SEEDS.map((s, i) => ({
  featured: false,
  status: "coming-soon" as const,
  sample: true,
  ...s,
  id: `res-${String(i + 1).padStart(3, "0")}`,
  order: i + 1,
}));

// TEST ENTRY: checks the access gate end to end. It is not real learning material. Delete it (and its content in
// src/server/gated-content.ts, and private-content/access-test-resource.pdf) before launch.
const TEST_RESOURCE: Resource = {
  id: "res-test-001",
  order: SEEDED.length + 1,
  slug: "access-test-resource",
  title: "Access Gate Test Resource",
  shortDescription: "A test file that checks the access gate. It is not real learning material and will be replaced.",
  ...GENERAL,
  resourceType: "Guide",
  topics: ["Testing"],
  difficulty: "beginner",
  format: "PDF",
  featured: true,
  status: "available",
  sample: false,
  source: "Techno Gurukul",
};

export const RESOURCES: Resource[] = [...SEEDED, TEST_RESOURCE];

// Fails the build/dev server loudly if the resource data is malformed.
function validateResources(list: Resource[]) {
  const fail = (msg: string): never => {
    throw new Error(`[resources] ${msg}`);
  };
  const seen = new Set<string>();
  const unique = (kind: string, v: string) => {
    if (seen.has(`${kind}:${v}`)) fail(`duplicate ${kind} "${v}"`);
    seen.add(`${kind}:${v}`);
  };
  const isUrl = (u: string) => /^(https?:\/\/|\/)[^\s]+$/.test(u);

  for (const r of list) {
    unique("slug", r.slug);
    unique("id", r.id);
    unique("order", String(r.order));
    if (!r.title.trim()) fail(`"${r.slug}" needs a title`);
    if (!r.shortDescription.trim()) fail(`"${r.slug}" needs a description`);
    if (!RESOURCE_TYPES.includes(r.resourceType)) fail(`"${r.slug}" has an invalid resource type "${r.resourceType}"`);
    if (!RESOURCE_FORMATS.includes(r.format)) fail(`"${r.slug}" has an invalid format "${r.format}"`);
    if (!RESOURCE_STATUSES.includes(r.status)) fail(`"${r.slug}" has an invalid status "${r.status}"`);
    if (r.difficulty && !DIFFICULTIES.includes(r.difficulty)) fail(`"${r.slug}" has an invalid difficulty`);
    if (r.source && !RESOURCE_SOURCES.includes(r.source)) fail(`"${r.slug}" has an invalid source`);
    if (r.sample && (r.createdAt || r.updatedAt || r.author)) fail(`sample resource "${r.slug}" must not carry invented dates or authors`);

    // Relationships: Industry -> Program -> Course must exist in the catalogue, or all be null (General).
    if (r.program && !r.industry) fail(`"${r.slug}" has a program but no industry`);
    if (r.course && !r.program) fail(`"${r.slug}" has a course but no program`);
    if (r.industry) {
      const industry = INDUSTRIES.find((i) => i.name === r.industry);
      if (!industry) fail(`"${r.slug}" references an unknown industry "${r.industry}"`);
      if (r.program) {
        const program = PROGRAMS.find((p) => p.name === r.program);
        if (!program || program.industrySlug !== industry?.slug) fail(`"${r.slug}" program "${r.program}" is not in "${r.industry}"`);
      }
      if (r.course && !COURSE_CATALOGUE.some((c) => c.title === r.course && c.programName === r.program))
        fail(`"${r.slug}" course "${r.course}" is not in "${r.program}"`);
    }

    // URLs are optional for sample resources, but any URL given must be usable, and "available" needs a real asset.
    if (!r.sample && (r.media?.url || r.externalUrl)) fail(`"${r.slug}": the file or link belongs in src/server/gated-content.ts, not in this public file`);
    const urls = [r.media?.url, r.externalUrl, r.thumbnail].filter((u): u is string => typeof u === "string");
    for (const u of urls) if (!isUrl(u)) fail(`"${r.slug}" has an invalid url "${u}"`);
    if (r.externalUrl && !/^https?:\/\//.test(r.externalUrl)) fail(`"${r.slug}" externalUrl must be an absolute http(s) URL`);
  }
  if (list.filter((r) => r.featured).length > 5) fail("at most five resources may be featured");
}

validateResources(RESOURCES);

/** Whether a resource may appear on the site: real (not a sample) and marked available. */
export const isResourcePublic = (r: Resource) => !r.sample && r.status === "available";
