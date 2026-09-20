// Source-backed catalogue content.
//   COURSES (enrolment-level offerings): the seven named offerings in
//     "Techno-Gurukul-Game-Development-Programs" (the source calls them a flagship program plus six
//     specialized programs; on the website they are courses under Game Development & Design).
//   DIGITAL_MARKETING_CURRICULUM: the 18 curriculum modules in "Techno Gurukul Web copy". The source
//     presents them as the curriculum of ONE program, not as separately enrolled courses, so they are
//     curriculum modules of the Digital Marketing Professional Program and are NOT courses.
// A course may itself contain a curriculum; curriculum headings are NOT separate courses.
// Descriptions use the source wording. Duration, tools and format are only set where the source states
// them for that specific course. Fees and faculty are not in the sources: left unset.
// Earlier granular ideas the sources do not support live in proposed-courses.ts (not rendered).
//
// When a course is approved for launch: set `status: "active"` and `href` (e.g. "/courses/tg-unity-studio").
import type { Course, CurriculumModule, ProgramTone } from "./catalogue";

const GAME = { industrySlug: "game-development", programSlug: "game-development-and-design" } as const;

let order = 2;
const next = () => ++order;

// Digital Marketing Professional Program: Web copy, Curriculum "Module 01" to "Module 18", in order.
const dm = (slug: string, title: string, description: string, tags: string[], keywords: string[]): CurriculumModule => ({
  slug,
  title,
  description,
  tags,
  keywords,
});

export const DIGITAL_MARKETING_CURRICULUM: CurriculumModule[] = [
  dm("digital-marketing-fundamentals", "Digital Marketing Fundamentals", "Learn how digital marketing works, why consumers behave the way they do, and how brands acquire customers.", ["Marketing"], ["basics", "introduction", "customers"]),
  dm("marketing-strategy-and-consumer-psychology", "Marketing Strategy & Consumer Psychology", "Understand the role of digital in the marketing mix, and how audiences, behaviour, motivations and purchase decisions shape strategy.", ["Marketing", "Strategy"], ["consumer behaviour", "audiences", "motivation", "purchase decisions", "marketing mix"]),
  dm("branding-and-positioning", "Branding & Positioning", "Learn how brands create positioning, identity and meaningful connections.", ["Branding", "Strategy"], ["brand building", "brand identity", "positioning"]),
  dm("content-marketing-and-copywriting", "Content Marketing & Copywriting", "Create content that attracts attention and drives action.", ["Content", "Marketing"], ["copywriting", "content", "writing"]),
  dm("social-media-marketing", "Social Media Marketing", "Plan, create, manage and evaluate social media campaigns.", ["Social Media", "Marketing"], ["social media", "campaigns", "community"]),
  dm("seo", "SEO", "Learn how websites earn visibility through organic search.", ["SEO"], ["search engine optimisation", "search engine optimization", "organic search", "search visibility"]),
  dm("aeo-and-geo", "AEO & GEO", "Understand how content is structured for answer engines and generative search.", ["AEO", "GEO", "SEO"], ["answer engine optimisation", "generative engine optimisation", "generative search", "ai search"]),
  dm("website-and-landing-page-fundamentals", "Website & Landing Page Fundamentals", "Learn the principles behind conversion-focused digital experiences.", ["Website", "Marketing"], ["landing pages", "website", "conversion", "user experience"]),
  dm("google-ads", "Google Ads", "Learn search advertising, campaign structure, targeting and optimisation.", ["Google Ads", "Performance Marketing"], ["search advertising", "ppc", "campaign structure", "targeting", "paid search"]),
  dm("meta-advertising", "Meta Advertising", "Understand audience targeting, campaign creation and performance optimisation on Meta.", ["Meta Ads", "Social Media"], ["meta ads", "facebook ads", "instagram ads", "audience targeting"]),
  dm("performance-marketing", "Performance Marketing", "Learn how marketers use data to measure and improve campaign performance.", ["Performance Marketing", "Analytics"], ["data", "measurement", "campaign performance", "paid media"]),
  dm("analytics-and-tracking", "Analytics & Tracking", "Understand marketing data and turn numbers into decisions.", ["Analytics"], ["marketing data", "tracking", "reporting", "measurement"]),
  dm("lead-generation-and-whatsapp-marketing", "Lead Generation & WhatsApp Marketing", "Learn how businesses can generate, nurture and convert leads.", ["Lead Generation", "Marketing"], ["whatsapp", "leads", "nurture", "conversion"]),
  dm("ecommerce-marketing", "E-commerce Marketing", "Understand how digital channels support online commerce.", ["E-commerce", "Marketing"], ["ecommerce", "online store", "online commerce", "online selling"]),
  dm("ai-tools-for-marketers", "AI Tools for Marketers", "Use emerging AI tools to research, create, analyse and improve marketing work.", ["AI", "Marketing"], ["ai for marketing", "ai-native marketing", "generative ai", "automation"]),
  dm("freelancing-and-client-acquisition", "Freelancing & Client Acquisition", "Learn the fundamentals of finding clients and delivering marketing services.", ["Freelancing", "Marketing"], ["freelance", "clients", "pitching", "services"]),
  dm("campaign-projects", "Campaign Projects", "Apply what you learn through practical campaign projects that build portfolio-worthy work.", ["Marketing"], ["projects", "portfolio", "practical campaigns", "hands-on"]),
  dm("career-preparation", "Career Preparation", "Prepare to take your digital marketing skills into a job, freelancing or your own business.", [], ["career", "jobs", "freelancing", "entrepreneur", "portfolio"]),
];

// Game Development: Game Development Programs, "Program Structure" and "Programs at a Glance".
const game = (
  slug: string,
  title: string,
  subtitle: string,
  description: string,
  duration: string,
  tools: string[],
  tags: string[],
  keywords: string[],
  icons: Course["visual"]["icons"],
  tone: ProgramTone,
  extra: Partial<Course> = {}
): Course => ({
  slug,
  title,
  subtitle,
  ...GAME,
  description,
  status: "coming-soon",
  origin: "source",
  href: null,
  level: null,
  format: null,
  duration,
  tools,
  tags,
  keywords,
  image: null,
  visual: { tone, icons },
  featured: false,
  order: next(),
  ...extra,
});

const GAME_COURSES: Course[] = [
  game(
    "tg-gameforge",
    "TG GameForge",
    "Professional Game Development & Design",
    "Learn how games are conceived, designed, programmed, illustrated, animated, tested and published, from small exercises to a capstone game project.",
    "30 months",
    ["Unity", "Unreal Engine", "C#", "C++", "Blender", "Houdini", "Nuke", "Photoshop", "Figma", "Git / GitHub"],
    ["Game Development", "Game Design", "Programming", "2D Art", "3D Art", "Animation"],
    ["flagship", "vfx", "unity", "unreal", "ai", "multiplayer", "production", "publishing", "capstone", "game production", "ui/ux"],
    ["code", "pen-tool", "boxes"],
    "green",
    { status: "active", href: "/programs/tg-gameforge", featured: true, order: 2 }
  ),
  game(
    "tg-unity-studio",
    "TG Unity Studio",
    "Unity Game Development",
    "Focus on building games with Unity and C#: gameplay programming, physics, UI, animation, AI, optimization and deployment.",
    "12 months",
    ["Unity", "C#", "Git / GitHub", "Blender", "Photoshop / Figma"],
    ["Unity", "Game Development", "Programming", "Animation", "Game AI"],
    ["c#", "gameplay", "physics", "ui", "optimization", "deployment", "mobile", "unity studio"],
    ["gamepad", "code", "cube"],
    "navy"
  ),
  game(
    "tg-unreal-studio",
    "TG Unreal Studio",
    "Unreal Engine Development",
    "Build high-quality interactive experiences with Unreal Engine, combining Blueprints and C++.",
    "12 months",
    ["Unreal Engine", "Blueprints", "C++", "Blender", "Houdini", "Nuke", "Photoshop / Figma", "Git / GitHub"],
    ["Unreal Engine", "Game Development", "Programming", "VFX", "Cinematics"],
    ["blueprints", "c++", "gameplay", "materials", "lighting", "animation", "ai", "optimization", "unreal studio"],
    ["cube", "code", "gamepad"],
    "blue"
  ),
  game(
    "tg-gameart-studio",
    "TG GameArt Studio",
    "2D & 3D Game Art",
    "Learn how characters, environments, props and interfaces are created for games, through 2D and 3D game-art workflows.",
    "12–18 months",
    ["Blender", "Houdini", "Nuke", "Photoshop", "Figma", "Unity / Unreal for asset integration"],
    ["2D Art", "3D Art"],
    ["character design", "environment art", "props", "blender", "game assets", "game ui", "digital illustration", "gameart studio"],
    ["palette", "pen-tool", "cube"],
    "green"
  ),
  game(
    "tg-gamedesign-studio",
    "TG GameDesign Studio",
    "Game & Level Design",
    "Turn ideas into structured game experiences by designing mechanics, levels, progression, challenges and rewards.",
    "6–12 months",
    ["Unity", "Unreal Engine", "Figma", "Game-design documentation and prototyping tools", "Git / GitHub"],
    ["Game Design", "Level Design"],
    ["game mechanics", "game loops", "progression", "balancing", "narrative", "world building", "quest design", "prototyping", "gamedesign studio"],
    ["layers", "boxes", "pen-tool"],
    "navy"
  ),
  game(
    "tg-game-animation-vfx",
    "TG Game Animation & VFX",
    "Animation, VFX & Cinematics",
    "Bring games to life through character and game animation, VFX, particles, shaders, lighting and cinematics.",
    "6–12 months",
    ["Blender", "Houdini", "Nuke", "Unity", "Unreal Engine", "Photoshop / Figma"],
    ["Animation", "VFX", "Cinematics"],
    ["rigging", "particles", "shaders", "lighting", "sequencing", "cutscenes"],
    ["clapperboard", "sparkles", "cube"],
    "blue"
  ),
  game(
    "tg-ai-for-games",
    "TG AI for Games",
    "AI & Generative AI for Game Development",
    "Learn game AI such as NPC behaviour, state machines and pathfinding, alongside AI-assisted development workflows.",
    "4–6 months",
    ["Unity", "Unreal Engine", "C#", "Python fundamentals", "Git / GitHub", "Selected generative-AI development tools"],
    ["Game AI", "AI"],
    ["npc behaviour", "state machines", "pathfinding", "procedural systems", "generative ai", "ai-assisted development", "enemy decision-making"],
    ["cpu", "sparkles", "gamepad"],
    "green"
  ),
];

export const COURSES: Course[] = GAME_COURSES;
