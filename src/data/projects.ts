// Project showcase data for /learning/projects.
//
// EVERY record below is a SAMPLE. The repository holds no verified student or faculty project, name,
// date, file or link, so nothing here is real work: creators are neutral ("Student Showcase",
// "Faculty Showcase"), no dates or results are given, and no media file exists yet (`url` is null,
// so the UI shows "Preview coming soon" and never links to a file).
//
// To replace a sample with real work: set `sample: false`, add the real `creatorName`, and give each
// media item a real `url` (and optional `thumbnail`). Nothing else needs to change. Filters, search
// and counts are all derived from this list.

export type ProjectCreator = "student" | "faculty";
export type ProjectStatus = "completed" | "in-progress" | "showcased";
export type MediaType =
  | "image"
  | "video"
  | "pdf"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "external-link"
  | "gallery";

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
  /** Gallery only. */
  images?: { url: string; alt: string }[];
}

export interface Project {
  /** "student" or "faculty" (this is the creator role). */
  type: ProjectCreator;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  industry: string;
  program: string;
  /** null when the work is not tied to one course. */
  course: string | null;
  /** Broad category: Digital, Creative, Technical, Portfolio or Research. */
  projectType: string;
  /** The specific form of work, e.g. "SEO Audit", "Playable Prototype". */
  format: string;
  topics: string[];
  creatorName?: string;
  creatorBatch?: string;
  createdAt?: string;
  status: ProjectStatus;
  featured: boolean;
  /** true until real, verified work replaces the record. Sample records are labelled in the UI. */
  sample: boolean;
  media: ProjectMedia[];
}

export const PROJECT_PAGE_SIZE = 12;

export const MEDIA_LABEL: Record<MediaType, string> = {
  image: "Images",
  video: "Videos",
  pdf: "PDFs",
  document: "Documents",
  spreadsheet: "Spreadsheets",
  presentation: "Presentations",
  "external-link": "External Links",
  gallery: "Galleries",
};

const DM = { industry: "Digital Marketing", program: "Digital Marketing Professional Program", course: null } as const;
const GAME = { industry: "Game Development", program: "Game Development & Design", course: null } as const;

const student = (
  p: Omit<Project, "type" | "creatorName" | "status" | "sample" | "featured"> & { featured?: boolean }
): Project => ({
  type: "student",
  creatorName: "Student Showcase",
  status: "showcased",
  sample: true,
  featured: false,
  ...p,
});

const faculty = (
  p: Omit<Project, "type" | "creatorName" | "status" | "sample" | "featured"> & { featured?: boolean }
): Project => ({
  type: "faculty",
  creatorName: "Faculty Showcase",
  status: "showcased",
  sample: true,
  featured: false,
  ...p,
});

export const PROJECTS: Project[] = [
  // ------------------------------------------------------------------ Faculty
  faculty({
    slug: "sample-faculty-seo-methodology",
    title: "Technical SEO Methodology",
    shortDescription:
      "A documented walk-through of how a technical SEO review is structured, from crawling and indexing checks to prioritising fixes.",
    ...DM,
    projectType: "Research",
    format: "Documented Methodology",
    topics: ["SEO", "Methodology", "Technical Review"],
    featured: true,
    media: [
      { type: "pdf", label: "Methodology document (PDF)", url: null, mimeType: "application/pdf" },
      { type: "presentation", label: "Walk-through slides", url: null },
    ],
  }),
  faculty({
    slug: "sample-faculty-campaign-strategy",
    title: "Campaign Strategy Example",
    shortDescription:
      "A demonstration of how a campaign brief becomes a plan: audience, message, channels and how results would be reviewed.",
    ...DM,
    projectType: "Digital",
    format: "Strategy Case Study",
    topics: ["Campaigns", "Strategy", "Planning"],
    media: [{ type: "presentation", label: "Strategy deck", url: null }],
  }),
  faculty({
    slug: "sample-faculty-analytics-reporting",
    title: "Analytics Reporting Method",
    shortDescription:
      "A teaching example showing how marketing data is organised into a clear report that supports decisions.",
    ...DM,
    projectType: "Report",
    format: "Reporting Example",
    topics: ["Analytics", "Reporting", "Data"],
    media: [{ type: "spreadsheet", label: "Sample reporting workbook", url: null }],
  }),
  faculty({
    slug: "sample-faculty-gameplay-demo",
    title: "Gameplay Prototype Demonstration",
    shortDescription:
      "A guided demonstration of building a simple playable prototype, used to show how mechanics are tested and iterated.",
    ...GAME,
    projectType: "Technical",
    format: "Teaching Demonstration",
    topics: ["Gameplay", "Prototype", "Iteration"],
    media: [{ type: "video", label: "Demonstration video", url: null }],
  }),
  faculty({
    slug: "sample-faculty-level-design-study",
    title: "Level Design Study",
    shortDescription:
      "A design study on pacing, player guidance and layout, documented so learners can see the reasoning behind each choice.",
    ...GAME,
    projectType: "Research",
    format: "Design Study",
    topics: ["Level Design", "Pacing", "Documentation"],
    media: [{ type: "document", label: "Design study (DOCX)", url: null, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }],
  }),
  faculty({
    slug: "sample-faculty-vfx-experiment",
    title: "VFX Technical Experiment",
    shortDescription:
      "A short technical experiment showing how a visual effect is built up in layers and refined.",
    ...GAME,
    projectType: "Creative",
    format: "Technical Experiment",
    topics: ["VFX", "Experiment", "Process"],
    media: [{ type: "image", label: "Effect breakdown", url: null }],
  }),
  faculty({
    slug: "sample-faculty-visual-design-study",
    title: "Visual Design Study",
    shortDescription:
      "A set of visual studies exploring composition and colour, shared as an example of how a design idea develops.",
    ...GAME,
    projectType: "Creative",
    format: "Design Study",
    topics: ["Visual Design", "Composition", "Colour"],
    media: [{ type: "gallery", label: "Study sheets", url: null }],
  }),
  faculty({
    slug: "sample-faculty-interactive-system",
    title: "Interactive System Prototype",
    shortDescription:
      "A small interactive system prepared as a reference build, with a project page describing how it is structured.",
    ...GAME,
    projectType: "Technical",
    format: "Reference Build",
    topics: ["Interactive Systems", "Prototype", "Structure"],
    media: [{ type: "external-link", label: "Project page", url: null }],
  }),

  // ------------------------------------------------------------------ Students: Digital Marketing
  student({
    slug: "sample-student-seo-audit-report",
    title: "SEO Audit Report",
    shortDescription:
      "A practical SEO audit format covering technical observations, content opportunities and search visibility.",
    ...DM,
    projectType: "Digital",
    format: "SEO Audit",
    topics: ["SEO", "Report", "Audit"],
    media: [{ type: "pdf", label: "Audit report (PDF)", url: null, mimeType: "application/pdf" }],
  }),
  student({
    slug: "sample-student-campaign-project",
    title: "Campaign Project",
    shortDescription:
      "A campaign plan from idea to measurement: audience, message, content and how performance would be reviewed.",
    ...DM,
    projectType: "Digital",
    format: "Campaign Project",
    topics: ["Campaigns", "Planning", "Measurement"],
    media: [{ type: "presentation", label: "Campaign deck", url: null }],
  }),
  student({
    slug: "sample-student-content-strategy",
    title: "Content Strategy Plan",
    shortDescription:
      "A content strategy document showing themes, formats and a publishing approach for a chosen audience.",
    ...DM,
    projectType: "Digital",
    format: "Content Strategy",
    topics: ["Content", "Strategy", "Planning"],
    media: [{ type: "document", label: "Strategy document (DOCX)", url: null, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }],
  }),
  student({
    slug: "sample-student-social-media-campaign",
    title: "Social Media Campaign",
    shortDescription:
      "A social media campaign concept with post designs, a content calendar layout and notes on how it would be reviewed.",
    ...DM,
    projectType: "Digital",
    format: "Social Media Campaign",
    topics: ["Social Media", "Content", "Campaigns"],
    media: [{ type: "gallery", label: "Post designs", url: null }],
  }),
  student({
    slug: "sample-student-performance-report",
    title: "Performance Report",
    shortDescription:
      "A performance report that turns campaign data into a clear summary, with charts and written observations.",
    ...DM,
    projectType: "Report",
    format: "Performance Report",
    topics: ["Analytics", "Report", "Data"],
    media: [{ type: "spreadsheet", label: "Report workbook (XLSX)", url: null, mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }],
  }),
  student({
    slug: "sample-student-lead-generation",
    title: "Lead Generation Project",
    shortDescription:
      "A lead generation plan covering the offer, the capture flow and how leads would be followed up.",
    ...DM,
    projectType: "Digital",
    format: "Lead Generation Project",
    topics: ["Lead Generation", "Funnels", "Planning"],
    media: [{ type: "pdf", label: "Project plan (PDF)", url: null, mimeType: "application/pdf" }],
  }),

  // ------------------------------------------------------------------ Students: Game Development
  student({
    slug: "sample-student-playable-prototype",
    title: "Playable Prototype",
    shortDescription:
      "A small playable prototype built to test one core mechanic, with notes on what was tried and changed.",
    ...GAME,
    projectType: "Technical",
    format: "Playable Prototype",
    topics: ["Prototype", "Gameplay", "Testing"],
    media: [{ type: "video", label: "Gameplay capture", url: null }],
  }),
  student({
    slug: "sample-student-gameplay-system",
    title: "Gameplay System",
    shortDescription:
      "A self-contained gameplay system, such as movement or inventory, built and documented as a reusable piece.",
    ...GAME,
    projectType: "Technical",
    format: "Gameplay System",
    topics: ["Gameplay", "Systems", "Code"],
    media: [{ type: "external-link", label: "Code repository", url: null }],
  }),
  student({
    slug: "sample-student-game-design-document",
    title: "Game Design Document",
    shortDescription:
      "A game design document laying out the concept, mechanics, level flow and player experience for a small game.",
    ...GAME,
    projectType: "Portfolio",
    format: "Game Design Document",
    topics: ["Game Design", "Documentation", "Planning"],
    media: [{ type: "pdf", label: "Design document (PDF)", url: null, mimeType: "application/pdf" }],
  }),
  student({
    slug: "sample-student-environment-build",
    title: "Environment Build",
    shortDescription:
      "A 3D environment built from blockout to a lit, presentable scene, with process images along the way.",
    ...GAME,
    projectType: "Creative",
    format: "3D Environment",
    topics: ["3D", "Environment", "Lighting"],
    media: [{ type: "image", label: "Final scene render", url: null }],
  }),
  student({
    slug: "sample-student-animation-test",
    title: "Animation Test",
    shortDescription:
      "A short character animation test exploring timing and weight, shared with the process behind it.",
    ...GAME,
    projectType: "Creative",
    format: "Animation Test",
    topics: ["Animation", "Motion", "Process"],
    media: [{ type: "video", label: "Animation clip", url: null }],
  }),
  student({
    slug: "sample-student-ai-prototype",
    title: "Game AI Prototype",
    shortDescription:
      "A prototype in which a non-player character moves and reacts, used to explore simple decision-making.",
    ...GAME,
    projectType: "Technical",
    format: "AI Prototype",
    topics: ["Game AI", "Prototype", "Behaviour"],
    media: [{ type: "video", label: "Behaviour demo", url: null }],
  }),
  student({
    slug: "sample-student-case-study",
    title: "Project Case Study",
    shortDescription:
      "A case-study style write-up of a finished project: the goal, the process, the decisions and the outcome.",
    ...GAME,
    projectType: "Portfolio",
    format: "Case Study",
    topics: ["Case Study", "Process", "Outcome"],
    media: [
      { type: "presentation", label: "Case study slides", url: null },
      { type: "gallery", label: "Process images", url: null },
    ],
  }),
  student({
    slug: "sample-student-visual-concept",
    title: "Visual Concept Presentation",
    shortDescription:
      "A visual concept presented as a short deck: mood, references, key frames and how the idea would be developed.",
    ...GAME,
    projectType: "Creative",
    format: "Visual Concept",
    topics: ["Visual Concept", "Presentation", "Design"],
    media: [{ type: "presentation", label: "Concept deck", url: null }],
  }),
];

// Fails the build/dev server loudly if the project data is malformed.
function validateProjects(list: Project[]) {
  const fail = (msg: string): never => {
    throw new Error(`[projects] ${msg}`);
  };
  const slugs = new Set<string>();
  for (const p of list) {
    if (slugs.has(p.slug)) fail(`duplicate slug "${p.slug}"`);
    slugs.add(p.slug);
    if (!p.title.trim() || !p.shortDescription.trim()) fail(`"${p.slug}" needs a title and description`);
    if (p.media.length === 0) fail(`"${p.slug}" needs at least one media item`);
    if (p.sample && (p.createdAt || p.creatorBatch)) fail(`sample project "${p.slug}" must not carry invented dates or batches`);
    for (const m of p.media) {
      if (m.url !== null && !m.url.trim()) fail(`"${p.slug}" has an empty media url`);
    }
  }
  if (list.filter((p) => p.featured).length > 1) fail("only one project may be featured");
}

validateProjects(PROJECTS);
