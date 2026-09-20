// Single source of truth for the /programs catalogue.
// Adding a program = adding one object to PROGRAM_CATALOGUE. No component changes are needed.
// Only put approved, verified values here. Use `null` for anything that is not known, and the UI
// will simply leave it out (and hide any filter that has fewer than two real values).

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
  | "cpu";

export type ProgramTone = "blue" | "green" | "navy";

/** "coming-soon" programs are listed and searchable but have no detail page to link to yet. */
export type ProgramStatus = "active" | "coming-soon";

export interface CatalogueProgram {
  slug: string;
  /** Live detail page. Only used when status is "active". */
  href: string;
  status: ProgramStatus;
  title: string;
  /** Official program name, e.g. "TG Unity Studio". Search-only. */
  identity: string;

  /** Badge + category filter, e.g. "Digital & Marketing". */
  category: string;
  /** e.g. "Program", "Short Course", "Workshop", "Certification". */
  type: string;
  /** "Beginner" | "Intermediate" | "Advanced", or null when not stated. */
  level: string | null;
  /** e.g. "Offline / In-Person", "Online", "Hybrid", or null when not stated. */
  format: string | null;
  description: string;
  /** Shown on the card (max 4 are displayed) and used by the tag filter. */
  tags: string[];
  /** Search-only terms; never displayed. */
  keywords?: string[];
  /** Path under /public, or null to use the generated visual. */
  image: string | null;
  visual: { tone: ProgramTone; icons: ProgramIcon[] };
  featured: boolean;
  /** Catalogue order. Higher numbers are newer; "Newest" sorts by this descending. */
  order: number;
}

export const CATALOGUE_PAGE_SIZE = 12;

export const PROGRAM_CATALOGUE: CatalogueProgram[] = [
  {
    slug: "tg-digital-marketing",
    href: "/programs/tg-digital-marketing",
    status: "active",
    identity: "TG Digital Marketing",
    title: "Digital Marketing",
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
    category: "Creative Technology",
    type: "Program",
    level: null,
    format: null,
    description: "Learn to turn ideas into interactive experiences through practical project work.",
    tags: ["Game Development", "Game Design", "Interactive", "Animation"],
    keywords: ["programming", "digital art", "design", "projects"],
    image: null,
    visual: { tone: "green", icons: ["code", "pen-tool", "boxes"] },
    featured: true,
    order: 2,
  },
  {
    slug: "tg-unity-studio",
    href: "",
    status: "coming-soon",
    identity: "TG Unity Studio",
    title: "Unity Game Development",
    category: "Creative Technology",
    type: "Program",
    level: null,
    format: null,
    description: "Build games with Unity and C#, from gameplay systems and interaction to optimization and deployment.",
    tags: ["Unity", "Game Development", "C#", "Interactive"],
    keywords: ["gameplay", "unity studio"],
    image: null,
    visual: { tone: "navy", icons: ["gamepad", "code", "cube"] },
    featured: false,
    order: 3,
  },
  {
    slug: "tg-unreal-studio",
    href: "",
    status: "coming-soon",
    identity: "TG Unreal Studio",
    title: "Unreal Engine Development",
    category: "Creative Technology",
    type: "Program",
    level: null,
    format: null,
    description: "Build interactive experiences with Unreal Engine, Blueprints and C++.",
    tags: ["Unreal Engine", "Game Development", "C++", "3D"],
    keywords: ["blueprints", "unreal studio"],
    image: null,
    visual: { tone: "blue", icons: ["cube", "code", "gamepad"] },
    featured: false,
    order: 4,
  },
  {
    slug: "tg-gameart-studio",
    href: "",
    status: "coming-soon",
    identity: "TG GameArt Studio",
    title: "2D & 3D Game Art",
    category: "Creative Technology",
    type: "Program",
    level: null,
    format: null,
    description: "Create characters, environments, props and game-ready visual assets through practical 2D and 3D workflows.",
    tags: ["Game Art", "2D Art", "3D Art", "Blender"],
    keywords: ["characters", "environments", "props", "character design", "gameart studio"],
    image: null,
    visual: { tone: "green", icons: ["palette", "pen-tool", "cube"] },
    featured: false,
    order: 5,
  },
  {
    slug: "tg-gamedesign-studio",
    href: "",
    status: "coming-soon",
    identity: "TG GameDesign Studio",
    title: "Game & Level Design",
    category: "Creative Technology",
    type: "Program",
    level: null,
    format: null,
    description: "Design game mechanics, levels, progression and player experiences through practical game-design work.",
    tags: ["Game Design", "Level Design", "Prototyping", "Interactive"],
    keywords: ["game mechanics", "gamedesign studio", "player experience"],
    image: null,
    visual: { tone: "navy", icons: ["layers", "boxes", "pen-tool"] },
    featured: false,
    order: 6,
  },
  {
    slug: "tg-game-animation-vfx",
    href: "",
    status: "coming-soon",
    identity: "TG Game Animation & VFX",
    title: "Game Animation, VFX & Cinematics",
    category: "Creative Technology",
    type: "Program",
    level: null,
    format: null,
    description: "Bring interactive experiences to life through animation, visual effects, lighting and cinematic workflows.",
    tags: ["Animation", "VFX", "Cinematics", "3D"],
    keywords: ["lighting", "game development"],
    image: null,
    visual: { tone: "blue", icons: ["clapperboard", "sparkles", "cube"] },
    featured: false,
    order: 7,
  },
  {
    slug: "tg-ai-for-games",
    href: "",
    status: "coming-soon",
    identity: "TG AI for Games",
    title: "AI & Generative AI for Game Development",
    category: "Creative Technology",
    type: "Program",
    level: null,
    format: null,
    description: "Explore game AI, intelligent NPC systems and practical AI-assisted game-development workflows.",
    tags: ["AI", "Generative AI", "Game AI", "NPC Systems"],
    keywords: ["game development", "artificial intelligence"],
    image: null,
    visual: { tone: "green", icons: ["cpu", "sparkles", "gamepad"] },
    featured: false,
    order: 8,
  },
];
