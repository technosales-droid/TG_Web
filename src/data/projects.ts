// Project library data for /learning/projects.
//
// EVERY record below is a SAMPLE. The repository holds no verified student or faculty project, name,
// date, file or link, so nothing here is real work: creators are neutral ("Student Showcase",
// "Faculty Showcase"), no dates or results are given, and no media file exists yet (`url` is null,
// so the UI shows "Preview coming soon" and never links to a file).
//
// To replace a sample with real work: set `sample: false`, add the real `creatorName`, then record who owns
// the work and that its creator agreed to it being shown (`ownership`, `creatorPermission`, `publicationStatus`;
// see `isProjectPublic`). Nothing is shown publicly until all of that is confirmed.
//
// This file is sent to every visitor's browser, so it holds only what may be seen without registering: title,
// short description, category and other browse details. Anything behind the access gate (long description, problem,
// solution, outcomes, files, videos, links) lives in src/server/gated-content.ts and is only sent to a visitor with
// an access session. Never put a real media URL in this file; the check at the bottom fails the build if you do.
//
// Industry, program and course names must match the catalogue (src/data/catalogue.ts). That is checked
// at the bottom of this file, so a typo fails the build instead of showing a wrong filter option.
//
// `order` is the stable order in which records were added to the library (higher = added later).
// It is NOT a date: "Newest"/"Oldest" sort by it, and no date is ever displayed.

import { COURSE_CATALOGUE, INDUSTRIES, PROGRAMS } from "./catalogue";

export const CREATOR_TYPES = ["student", "faculty", "institute", "other"] as const;
export const OWNERSHIPS = ["student", "faculty", "institute", "third-party"] as const;
export const PUBLICATION_STATUSES = ["draft", "pending-permission", "published", "withdrawn"] as const;
export const PERMISSION_STATUSES = ["not-requested", "requested", "granted", "declined"] as const;
export const PROJECT_STATUSES = ["completed", "in-progress", "showcased"] as const;
export const MEDIA_TYPES = [
  "image",
  "video",
  "pdf",
  "document",
  "spreadsheet",
  "presentation",
  "external-link",
  "gallery",
] as const;
export const PROJECT_TYPES = [
  "Audit",
  "Campaign",
  "Strategy",
  "Report",
  "Research",
  "Prototype",
  "Game Build",
  "Game Design",
  "Level Design",
  "3D Asset",
  "Animation",
  "VFX",
  "Technical Build",
  "Presentation",
  "Document",
  "Portfolio",
  "Case Study",
  "Experiment",
] as const;

export type ProjectCreator = (typeof CREATOR_TYPES)[number];
export type Ownership = (typeof OWNERSHIPS)[number];
export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];
export type PermissionStatus = (typeof PERMISSION_STATUSES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type MediaType = (typeof MEDIA_TYPES)[number];
export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface ProjectMedia {
  type: MediaType;
  /** Short name of the file or link, e.g. "Audit report (PDF)". */
  label: string;
  /** Real asset URL or path (e.g. "/projects/seo-audit.pdf"). null = not supplied yet. */
  url: string | null;
  /** Optional preview image for the card. */
  thumbnail?: string;
  /** e.g. "application/pdf". Used to pick the file badge when the URL has no extension. */
  mimeType?: string;
  description?: string;
  /** Picks the abstract preview for a link when it is a prototype or a code repository. */
  art?: "prototype" | "code";
  /** Gallery only. */
  images?: { url: string; alt: string }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  creatorType: ProjectCreator;
  /** "Student Showcase" / "Faculty Showcase" until a real, approved name is added. */
  creatorName?: string;
  creatorRole?: string;
  cohort?: string;
  createdAt?: string;
  /** Names from the catalogue. */
  industry: string;
  program: string;
  /** null when the work is not tied to one course. */
  course: string | null;
  projectType: ProjectType;
  topics: string[];
  tools: string[];
  status: ProjectStatus;
  featured: boolean;
  /** true until real, verified work replaces the record. Sample records are labelled in the UI. */
  sample: boolean;
  media: ProjectMedia[];
  externalLinks?: { label: string; url: string }[];
  order: number;

  // Rights and permission. A project is shown only when isProjectPublic() says so.
  /** Who owns the work. */
  ownership?: Ownership;
  /** Defaults to "draft". */
  publicationStatus?: PublicationStatus;
  /** The creator (or their guardian, for a minor) agreed to the work being shown. Required for student work. */
  creatorPermission?: PermissionStatus;
  /** Separate agreement to feature the work (homepage, promotion). */
  featuredPermission?: PermissionStatus;
  /** How the creator asked to be credited, if at all. */
  attribution?: string;
}

/**
 * Whether a project may appear on the site. Existing in this file is not enough: it must be real work (not a sample),
 * marked published, and, for student work, the creator's permission must be on record.
 */
export function isProjectPublic(p: Project): boolean {
  if (p.sample || p.publicationStatus !== "published") return false;
  if (p.creatorType === "student" || p.ownership === "student") return p.creatorPermission === "granted";
  return true;
}

export const PROJECT_PAGE_SIZE = 12;

export const MEDIA_LABEL: Record<MediaType, string> = {
  image: "Image",
  video: "Video",
  pdf: "PDF",
  document: "Document",
  spreadsheet: "Spreadsheet",
  presentation: "Presentation",
  "external-link": "External Link",
  gallery: "Gallery",
};

export const MEDIA_LABEL_PLURAL: Record<MediaType, string> = {
  image: "Images",
  video: "Videos",
  pdf: "PDFs",
  document: "Documents",
  spreadsheet: "Spreadsheets",
  presentation: "Presentations",
  "external-link": "External Links",
  gallery: "Galleries",
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  showcased: "Showcased",
};

const DM = { industry: "Digital Marketing", program: "Digital Marketing Professional Program", course: null } as const;
const GAME = { industry: "Game Development", program: "Game Development & Design" } as const;
const FORGE = { ...GAME, course: "Game Development Professional Program" } as const;
const UNITY = { ...GAME, course: "Unity Studio" } as const;
const ART = { ...GAME, course: "GameArt Studio" } as const;
const DESIGN = { ...GAME, course: "GameDesign Studio" } as const;
const ANIM = { ...GAME, course: "Game Animation & VFX" } as const;
const AI = { ...GAME, course: "AI for Games" } as const;

const PDF = "application/pdf";
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

type Seed = Omit<Project, "id" | "creatorType" | "creatorName" | "status" | "featured" | "sample" | "order" | "tools" | "course"> &
  Partial<Pick<Project, "status" | "featured" | "tools" | "course">>;

const s = (p: Seed): Omit<Project, "id" | "order"> => ({
  creatorType: "student",
  creatorName: "Student Showcase",
  status: "showcased",
  featured: false,
  sample: true,
  tools: [],
  course: null,
  ...p,
});
const f = (p: Seed): Omit<Project, "id" | "order"> => ({ ...s(p), creatorType: "faculty", creatorName: "Faculty Showcase" });

// Array position sets `order`, and students and faculty are interleaved so the first page shows both.
const SEEDS: Omit<Project, "id" | "order">[] = [
  s({
    slug: "sample-student-seo-audit",
    title: "SEO Audit",
    shortDescription:
      "A practical SEO audit covering technical observations, content opportunities and search visibility.",
    ...DM,
    projectType: "Audit",
    topics: ["SEO", "Analytics"],
    status: "completed",
    featured: true,
    media: [
      { type: "pdf", label: "Audit report (PDF)", url: null, mimeType: PDF },
      { type: "spreadsheet", label: "Findings tracker (XLSX)", url: null, mimeType: XLSX },
    ],
  }),
  f({
    slug: "sample-faculty-seo-methodology",
    title: "Technical SEO Methodology",
    shortDescription:
      "A documented walk-through of how a technical SEO review is structured, from crawling and indexing checks to prioritising fixes.",
    ...DM,
    projectType: "Research",
    topics: ["SEO", "Strategy"],
    featured: true,
    media: [
      { type: "pdf", label: "Methodology document (PDF)", url: null, mimeType: PDF },
      { type: "presentation", label: "Walk-through slides", url: null },
    ],
  }),
  s({
    slug: "sample-student-gameplay-prototype",
    title: "Gameplay Prototype",
    shortDescription:
      "A small playable prototype built to test one core mechanic, with notes on what was tried and changed.",
    ...FORGE,
    projectType: "Prototype",
    topics: ["Game Development", "Game Design", "Programming"],
    tools: ["Unity", "C#"],
    status: "in-progress",
    featured: true,
    media: [
      { type: "video", label: "Gameplay capture", url: null },
      { type: "external-link", label: "Prototype notes", url: null, art: "prototype" },
    ],
  }),
  f({
    slug: "sample-faculty-research-report",
    title: "Faculty Research Report",
    shortDescription:
      "A written research report on how marketing channels are compared, prepared as a reference for learners.",
    ...DM,
    projectType: "Report",
    topics: ["Marketing", "Strategy", "Analytics"],
    media: [{ type: "pdf", label: "Research report (PDF)", url: null, mimeType: PDF }],
  }),
  s({
    slug: "sample-student-campaign-project",
    title: "Campaign Project",
    shortDescription:
      "A campaign plan from idea to measurement: audience, message, content and how performance would be reviewed.",
    ...DM,
    projectType: "Campaign",
    topics: ["Marketing", "Strategy", "Performance Marketing"],
    tools: ["Google Ads"],
    media: [
      { type: "presentation", label: "Campaign deck", url: null },
      { type: "pdf", label: "Campaign brief (PDF)", url: null, mimeType: PDF },
    ],
  }),
  f({
    slug: "sample-faculty-teaching-demonstration",
    title: "Faculty Teaching Demonstration",
    shortDescription:
      "A guided demonstration of building a simple mechanic, used to show how ideas are tested and iterated in class.",
    ...FORGE,
    projectType: "Technical Build",
    topics: ["Game Development", "Programming"],
    tools: ["Unity", "C#"],
    media: [{ type: "video", label: "Demonstration video", url: null }],
  }),
  s({
    slug: "sample-student-3d-environment",
    title: "3D Environment",
    shortDescription:
      "A 3D environment built from blockout to a lit, presentable scene, with process images along the way.",
    ...ART,
    projectType: "3D Asset",
    topics: ["3D Art", "Game Development"],
    tools: ["Blender", "Photoshop"],
    status: "completed",
    media: [
      { type: "gallery", label: "Process images", url: null },
      { type: "image", label: "Final scene render", url: null },
    ],
  }),
  f({
    slug: "sample-faculty-design-study",
    title: "Faculty Design Study",
    shortDescription:
      "A design study on pacing, player guidance and layout, documented so learners can see the reasoning behind each choice.",
    ...DESIGN,
    projectType: "Level Design",
    topics: ["Level Design", "Game Design"],
    featured: true,
    media: [{ type: "document", label: "Design study (DOCX)", url: null, mimeType: DOCX }],
  }),
  s({
    slug: "sample-student-content-strategy",
    title: "Content Strategy",
    shortDescription:
      "A content strategy document showing themes, formats and a publishing approach for a chosen audience.",
    ...DM,
    projectType: "Strategy",
    topics: ["Content", "Strategy", "Branding"],
    media: [{ type: "document", label: "Strategy document (DOCX)", url: null, mimeType: DOCX }],
  }),
  f({
    slug: "sample-faculty-technical-experiment",
    title: "Faculty Technical Experiment",
    shortDescription:
      "A short technical experiment showing how a visual effect is built up in layers and refined.",
    ...ANIM,
    projectType: "Experiment",
    topics: ["VFX", "Animation"],
    tools: ["Unreal Engine", "Houdini"],
    media: [{ type: "image", label: "Effect breakdown", url: null }],
  }),
  s({
    slug: "sample-student-game-design-document",
    title: "Game Design Document",
    shortDescription:
      "A game design document laying out the concept, mechanics, level flow and player experience for a small game.",
    ...DESIGN,
    projectType: "Game Design",
    topics: ["Game Design", "Game Development"],
    status: "completed",
    media: [
      { type: "pdf", label: "Design document (PDF)", url: null, mimeType: PDF },
      { type: "document", label: "Mechanics notes (DOCX)", url: null, mimeType: DOCX },
    ],
  }),
  f({
    slug: "sample-faculty-curriculum-demonstration",
    title: "Faculty Curriculum Demonstration",
    shortDescription:
      "A slide deck showing how a marketing topic is broken into lessons, exercises and practical outputs.",
    ...DM,
    projectType: "Presentation",
    topics: ["Marketing", "Strategy"],
    media: [{ type: "presentation", label: "Curriculum walk-through", url: null }],
  }),
  s({
    slug: "sample-student-social-media-campaign",
    title: "Social Media Campaign",
    shortDescription:
      "A social media campaign concept with post designs, a content calendar layout and notes on how it would be reviewed.",
    ...DM,
    projectType: "Campaign",
    topics: ["Social Media", "Content", "Meta Ads"],
    tools: ["Meta Ads"],
    media: [
      { type: "gallery", label: "Post designs", url: null },
      { type: "document", label: "Content calendar (DOCX)", url: null, mimeType: DOCX },
    ],
  }),
  s({
    slug: "sample-student-level-prototype",
    title: "Level Prototype",
    shortDescription:
      "A blockout level built to test layout and player flow, with a walkthrough and notes on changes made.",
    ...DESIGN,
    projectType: "Level Design",
    topics: ["Level Design", "Game Design", "Unreal Engine"],
    tools: ["Unreal Engine"],
    media: [
      { type: "video", label: "Level walkthrough", url: null },
      { type: "gallery", label: "Layout sketches", url: null },
    ],
  }),
  f({
    slug: "sample-faculty-analytics-reporting",
    title: "Analytics Reporting Method",
    shortDescription:
      "A teaching example showing how marketing data is organised into a clear report that supports decisions.",
    ...DM,
    projectType: "Report",
    topics: ["Analytics", "Performance Marketing"],
    media: [{ type: "spreadsheet", label: "Sample reporting workbook", url: null }],
  }),
  s({
    slug: "sample-student-performance-report",
    title: "Performance Report",
    shortDescription:
      "A performance report that turns campaign data into a clear summary, with charts and written observations.",
    ...DM,
    projectType: "Report",
    topics: ["Analytics", "Performance Marketing"],
    tools: ["Google Ads", "Spreadsheets"],
    status: "completed",
    media: [
      { type: "spreadsheet", label: "Report workbook (XLSX)", url: null, mimeType: XLSX },
      { type: "pdf", label: "Summary (PDF)", url: null, mimeType: PDF },
    ],
  }),
  s({
    slug: "sample-student-character-asset",
    title: "Character Asset",
    shortDescription:
      "A game-ready character model shown as turnarounds and close-ups, with a short note on how it was built.",
    ...ART,
    projectType: "3D Asset",
    topics: ["3D Art", "Game Development"],
    tools: ["Blender", "Photoshop"],
    media: [
      { type: "image", label: "Character render", url: null },
      { type: "gallery", label: "Turnarounds", url: null },
    ],
  }),
  s({
    slug: "sample-student-analytics-dashboard",
    title: "Analytics Dashboard",
    shortDescription:
      "A dashboard layout that brings key marketing measures together, with a short guide to reading it.",
    ...DM,
    projectType: "Report",
    topics: ["Analytics", "Data Analytics"],
    tools: ["Spreadsheets"],
    media: [
      { type: "external-link", label: "Dashboard link", url: null },
      { type: "image", label: "Dashboard layout", url: null },
    ],
  }),
  s({
    slug: "sample-student-animation-study",
    title: "Animation Study",
    shortDescription:
      "A short character animation study exploring timing and weight, shared with the process behind it.",
    ...ANIM,
    projectType: "Animation",
    topics: ["Animation", "3D Art"],
    tools: ["Blender"],
    media: [{ type: "video", label: "Animation clip", url: null }],
  }),
  f({
    slug: "sample-faculty-interactive-system",
    title: "Interactive System Prototype",
    shortDescription:
      "A small interactive system prepared as a reference build, with a project page describing how it is structured.",
    ...UNITY,
    projectType: "Prototype",
    topics: ["Game Development", "Programming"],
    tools: ["Unity", "C#"],
    media: [{ type: "external-link", label: "Project page", url: null, art: "prototype" }],
  }),
  s({
    slug: "sample-student-lead-generation",
    title: "Lead Generation Project",
    shortDescription:
      "A lead generation plan covering the offer, the capture flow and how leads would be followed up.",
    ...DM,
    projectType: "Campaign",
    topics: ["Lead Generation", "Marketing"],
    media: [{ type: "pdf", label: "Project plan (PDF)", url: null, mimeType: PDF }],
  }),
  s({
    slug: "sample-student-vfx-experiment",
    title: "VFX Experiment",
    shortDescription:
      "A visual effect built and refined in stages, shared as a short clip with a still that shows the breakdown.",
    ...ANIM,
    projectType: "VFX",
    topics: ["VFX", "Animation"],
    tools: ["Unreal Engine", "Houdini"],
    media: [
      { type: "video", label: "Effect clip", url: null },
      { type: "image", label: "Breakdown still", url: null },
    ],
  }),
  s({
    slug: "sample-student-marketing-plan",
    title: "Marketing Plan",
    shortDescription:
      "A marketing plan covering goals, audience, channels, budget approach and how progress would be tracked.",
    ...DM,
    projectType: "Strategy",
    topics: ["Marketing", "Strategy"],
    media: [
      { type: "presentation", label: "Plan deck", url: null },
      { type: "document", label: "Plan document (DOCX)", url: null, mimeType: DOCX },
    ],
  }),
  s({
    slug: "sample-student-gameplay-system",
    title: "Gameplay System",
    shortDescription:
      "A self-contained gameplay system, such as movement or inventory, built and documented as a reusable piece.",
    ...UNITY,
    projectType: "Technical Build",
    topics: ["Programming", "Unity", "Game Development"],
    tools: ["Unity", "C#", "Git / GitHub"],
    media: [{ type: "external-link", label: "Code repository", url: null, art: "code" }],
  }),
  s({
    slug: "sample-student-game-ai-prototype",
    title: "Game AI Prototype",
    shortDescription:
      "A prototype in which a non-player character moves and reacts, used to explore simple decision-making.",
    ...AI,
    projectType: "Prototype",
    topics: ["Game AI", "Programming"],
    tools: ["Unity", "C#"],
    media: [
      { type: "video", label: "Behaviour demo", url: null },
      { type: "external-link", label: "Code repository", url: null, art: "code" },
    ],
  }),
  s({
    slug: "sample-student-ad-creative-set",
    title: "Ad Creative Set",
    shortDescription:
      "A set of ad creatives for one offer, shown as variations with notes on the thinking behind each.",
    ...DM,
    projectType: "Portfolio",
    topics: ["Meta Ads", "Branding", "Content"],
    tools: ["Meta Ads", "Figma"],
    media: [{ type: "gallery", label: "Creative variations", url: null }],
  }),
  s({
    slug: "sample-student-case-study",
    title: "Project Case Study",
    shortDescription:
      "A case-study style write-up of a finished project: the goal, the process, the decisions and the outcome.",
    ...FORGE,
    projectType: "Case Study",
    topics: ["Game Development", "Game Design"],
    media: [
      { type: "presentation", label: "Case study slides", url: null },
      { type: "gallery", label: "Process images", url: null },
    ],
  }),
  s({
    slug: "sample-student-small-game-build",
    title: "Small Game Build",
    shortDescription:
      "A small game taken from idea to a playable build, with a capture of it running and a link for the build page.",
    ...FORGE,
    projectType: "Game Build",
    topics: ["Game Development", "Programming", "Game Design"],
    tools: ["Unity", "C#", "Git / GitHub"],
    status: "completed",
    media: [
      { type: "video", label: "Gameplay capture", url: null },
      { type: "external-link", label: "Build page", url: null, art: "prototype" },
    ],
  }),
  s({
    slug: "sample-student-marketing-portfolio",
    title: "Marketing Portfolio",
    shortDescription:
      "A portfolio page that collects a learner's marketing work in one place, with short notes on each piece.",
    ...DM,
    projectType: "Portfolio",
    topics: ["Marketing", "Branding", "Freelancing"],
    media: [
      { type: "external-link", label: "Portfolio page", url: null },
      { type: "gallery", label: "Selected work", url: null },
    ],
  }),
  s({
    slug: "sample-student-visual-concept",
    title: "Visual Concept Presentation",
    shortDescription:
      "A visual concept presented as a short deck: mood, references, key frames and how the idea would be developed.",
    ...ART,
    projectType: "Presentation",
    topics: ["2D Art", "Game Development"],
    tools: ["Photoshop", "Figma"],
    media: [{ type: "presentation", label: "Concept deck", url: null }],
  }),
];

// TEST ENTRY: checks the access gate end to end. It holds no real work. Delete it (and its content in
// src/server/gated-content.ts) before launch.
SEEDS.push({
  slug: "access-test-project",
  title: "Access Gate Test Project",
  shortDescription: "A test entry that checks the access gate. It holds no real student or faculty work and will be replaced by real projects.",
  creatorType: "institute",
  creatorName: "Techno Gurukul",
  ...DM,
  projectType: "Case Study",
  topics: ["Testing"],
  tools: [],
  status: "showcased",
  featured: true,
  sample: false,
  media: [{ type: "document", label: "Test document", url: null }],
  ownership: "institute",
  publicationStatus: "published",
  attribution: "Techno Gurukul",
});

export const PROJECTS: Project[] = SEEDS.map((p, i) => ({ ...p, id: `prj-${String(i + 1).padStart(3, "0")}`, order: i + 1 }));

// Fails the build/dev server loudly if the project data is malformed.
function validateProjects(list: Project[]) {
  const fail = (msg: string): never => {
    throw new Error(`[projects] ${msg}`);
  };
  const seen = new Set<string>();
  const unique = (kind: string, v: string) => {
    if (seen.has(`${kind}:${v}`)) fail(`duplicate ${kind} "${v}"`);
    seen.add(`${kind}:${v}`);
  };
  const isUrl = (u: string) => /^(https?:\/\/|\/)[^\s]+$/.test(u);

  for (const p of list) {
    unique("slug", p.slug);
    unique("id", p.id);
    unique("order", String(p.order));
    if (!p.title.trim()) fail(`"${p.slug}" needs a title`);
    if (!p.shortDescription.trim()) fail(`"${p.slug}" needs a description`);
    if (!CREATOR_TYPES.includes(p.creatorType)) fail(`"${p.slug}" has an invalid creator type`);
    if (!PROJECT_TYPES.includes(p.projectType)) fail(`"${p.slug}" has an invalid project type "${p.projectType}"`);
    if (!PROJECT_STATUSES.includes(p.status)) fail(`"${p.slug}" has an invalid status`);
    if (p.media.length === 0) fail(`"${p.slug}" needs at least one media item`);
    if (p.sample && (p.createdAt || p.cohort)) fail(`sample project "${p.slug}" must not carry invented dates or cohorts`);

    const industry = INDUSTRIES.find((i) => i.name === p.industry);
    const program = PROGRAMS.find((g) => g.name === p.program);
    if (!industry) fail(`"${p.slug}" references an unknown industry "${p.industry}"`);
    if (!program || program.industrySlug !== industry?.slug) fail(`"${p.slug}" program "${p.program}" is not in "${p.industry}"`);
    if (p.course && !COURSE_CATALOGUE.some((c) => c.title === p.course && c.programName === p.program))
      fail(`"${p.slug}" course "${p.course}" is not in "${p.program}"`);

    if (!p.sample && p.longDescription) fail(`"${p.slug}": the long description belongs in src/server/gated-content.ts, not in this public file`);
    if (p.publicationStatus === "published" && p.sample) fail(`sample project "${p.slug}" cannot be published`);
    if (p.publicationStatus === "published" && (p.creatorType === "student" || p.ownership === "student") && p.creatorPermission !== "granted")
      fail(`"${p.slug}" is student work and cannot be published without the creator's permission`);
    for (const m of p.media) {
      if (!p.sample && m.url) fail(`"${p.slug}": real media URLs belong in src/server/gated-content.ts, not in this public file`);
      if (!MEDIA_TYPES.includes(m.type)) fail(`"${p.slug}" has an unknown media type "${m.type}"`);
      // Media URLs are optional (null = "Preview coming soon"), but a URL that is given must be usable.
      if (m.url !== null && !isUrl(m.url)) fail(`"${p.slug}" has an invalid media url "${m.url}"`);
    }
    for (const l of p.externalLinks ?? []) {
      if (!p.sample) fail(`"${p.slug}": external links belong in src/server/gated-content.ts, not in this public file`);
      if (!/^https?:\/\/[^\s]+$/.test(l.url)) fail(`"${p.slug}" has an external link without a valid URL`);
    }
  }
}

validateProjects(PROJECTS);
