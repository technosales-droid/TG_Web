// ARCHIVE - NOT RENDERED. Nothing imports this file.
// Earlier granular course ideas (40 Digital Marketing + 60 game). Classified against the source
// documents (Web copy, Game Development Programs):
//   - CURRICULUM ITEMS: topics inside a source module/course, e.g. "Technical SEO" (module 06 SEO),
//     "Unity Physics & Interaction" (TG Unity Studio curriculum). Not separate offerings.
//   - PROPOSED / FUTURE: not stated in the sources (e.g. "Conversion Rate Optimization",
//     "Game Economy Design"). They may become courses only if approved.
// They are kept for reference and reuse, and are deliberately not in the public catalogue.
import type { Course, CatalogueStatus, ProgramIcon, ProgramTone } from "./catalogue";

// Groups only decide the program and the fallback visual tone.
type GroupKey = "dm" | "forge" | "unity" | "unreal" | "art" | "design" | "anim" | "ai";

const GROUPS: Record<GroupKey, { industrySlug: string; programSlug: string; tone: ProgramTone }> = {
  dm: { industrySlug: "digital-marketing", programSlug: "digital-marketing", tone: "blue" },
  forge: { industrySlug: "game-development", programSlug: "game-development-and-design", tone: "green" },
  unity: { industrySlug: "game-development", programSlug: "game-development-and-design", tone: "navy" },
  unreal: { industrySlug: "game-development", programSlug: "game-development-and-design", tone: "blue" },
  art: { industrySlug: "game-development", programSlug: "game-development-and-design", tone: "green" },
  design: { industrySlug: "game-development", programSlug: "game-development-and-design", tone: "navy" },
  anim: { industrySlug: "game-development", programSlug: "game-development-and-design", tone: "blue" },
  ai: { industrySlug: "game-development", programSlug: "game-development-and-design", tone: "green" },
};

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

let order = 2;

type Row = [
  title: string,
  description: string,
  tags: string[],
  keywords: string[],
  icons: ProgramIcon[],
  opts?: { slug?: string; featured?: boolean; order?: number; status?: CatalogueStatus; href?: string },
];

function group(key: GroupKey, rows: Row[]): Course[] {
  const g = GROUPS[key];
  return rows.map(([title, description, tags, keywords, icons, opts]) => ({
    slug: opts?.slug ?? toSlug(title),
    title,
    industrySlug: g.industrySlug,
    programSlug: g.programSlug,
    status: opts?.status ?? "coming-soon",
    href: opts?.href ?? null,
    level: null,
    format: null,
    description,
    tags,
    keywords,
    image: null,
    visual: { tone: g.tone, icons },
    featured: opts?.featured ?? false,
    order: opts?.order ?? ++order,
  }));
}

// ------------------------------------------------------------------ Digital Marketing (40)
const DIGITAL_MARKETING: Course[] = [
  // Strategy & fundamentals (5)
  ...group("dm", [
    ["Digital Marketing Fundamentals", "Understand how digital channels work together and how campaigns move from idea to audience.", ["Marketing", "Strategy"], ["basics", "introduction", "channels"], ["megaphone", "globe", "target"], { featured: true }],
    ["Digital Marketing Strategy", "Plan goals, audiences, channels and measurement into a clear, practical marketing strategy.", ["Marketing", "Strategy"], ["planning", "goals", "channel mix"], ["target", "layers", "trending-up"]],
    ["Customer Journey & Funnels", "Map how people discover, consider and choose a brand, and design marketing for each stage.", ["Marketing", "Strategy", "Analytics"], ["funnel", "awareness", "conversion", "customer journey"], ["users", "workflow", "target"]],
    ["Consumer Psychology for Marketers", "Explore how attention, motivation and trust shape the way people respond to marketing.", ["Marketing", "Strategy"], ["behaviour", "persuasion", "buyer psychology"], ["brain", "users", "lightbulb"]],
    ["Marketing Research & Audience Analysis", "Learn to research audiences, competitors and markets to guide marketing decisions.", ["Marketing", "Strategy", "Analytics"], ["market research", "competitor analysis", "personas"], ["search", "users", "bar-chart"]],
  ]),
  // Branding & content (6)
  ...group("dm", [
    ["Brand Strategy Fundamentals", "Define what a brand stands for and how it shows up consistently across digital touchpoints.", ["Branding", "Strategy"], ["brand identity", "voice", "values"], ["sparkles", "layers", "target"]],
    ["Brand Positioning", "Work out where a brand fits in its market and how to communicate a clear point of difference.", ["Branding", "Strategy"], ["differentiation", "messaging", "market position"], ["target", "megaphone", "layers"]],
    ["Content Marketing Fundamentals", "Understand how useful content attracts, informs and builds relationships with an audience.", ["Content", "Marketing"], ["blog", "storytelling", "editorial"], ["file-text", "pen-tool", "megaphone"], { featured: true }],
    ["Copywriting for Digital Marketing", "Practise writing clear, engaging copy for websites, social posts, emails and ads.", ["Content", "Marketing"], ["writing", "headlines", "email", "ad copy"], ["pen-tool", "file-text", "message"]],
    ["Conversion Copywriting", "Write persuasive copy focused on getting a visitor to take one clear next step.", ["Content", "Marketing"], ["cta", "landing page copy", "persuasion"], ["pen-tool", "target", "trending-up"]],
    ["Content Strategy", "Plan what to publish, where and why, so content supports business and audience goals.", ["Content", "Strategy"], ["content calendar", "editorial planning", "distribution"], ["layers", "file-text", "target"]],
  ]),
  // SEO (7)
  ...group("dm", [
    ["SEO Fundamentals", "Learn how search engines work and the core practices behind visibility in organic search.", ["SEO", "Marketing"], ["search engine optimization", "organic", "rankings", "search"], ["search", "globe", "trending-up"], { featured: true }],
    ["Technical SEO Fundamentals", "Understand crawling, indexing, site speed and structure so search engines can access a site well.", ["SEO"], ["crawling", "indexing", "site speed", "sitemap", "schema"], ["code", "search", "workflow"]],
    ["On-Page SEO", "Optimise titles, headings, content and internal links so each page is clear to search engines and readers.", ["SEO", "Content"], ["meta tags", "headings", "internal linking"], ["file-text", "search", "layers"]],
    ["Off-Page SEO & Link Building", "Explore how authority and links from other sites influence search visibility.", ["SEO"], ["backlinks", "authority", "outreach"], ["link", "globe", "search"]],
    ["Local SEO", "Help local businesses appear in map results and nearby searches.", ["SEO", "Marketing"], ["google business profile", "maps", "local search", "citations"], ["map-pin", "search", "globe"]],
    ["Keyword Research", "Find and evaluate the search terms an audience uses, and match them to content.", ["SEO", "Content"], ["search intent", "keywords", "search volume"], ["search", "bar-chart", "file-text"]],
    ["AEO & GEO Fundamentals", "Understand answer engines and generative search, and how content is surfaced in AI-driven results.", ["AEO", "GEO", "SEO", "AI"], ["answer engine optimization", "generative engine optimization", "ai search"], ["sparkles", "search", "bot"]],
  ]),
  // Google Ads (6)
  ...group("dm", [
    ["Google Ads Fundamentals", "Learn how Google Ads works, from accounts and budgets to bidding and ad formats.", ["Google Ads", "Performance Marketing"], ["ppc", "paid search", "ad account"], ["search", "megaphone", "bar-chart"]],
    ["Google Search Ads", "Build search campaigns that match ads to what people are looking for.", ["Google Ads", "Performance Marketing"], ["search campaigns", "ad groups", "ad copy", "responsive search ads"], ["search", "megaphone", "target"], { featured: true }],
    ["Keyword & Match-Type Strategy", "Choose keywords and match types to control who sees your ads and what they cost.", ["Google Ads", "Strategy"], ["match types", "negative keywords", "search terms"], ["search", "layers", "target"]],
    ["Google Ads Conversion Tracking", "Set up tracking so you can see which ads lead to enquiries, sign-ups and sales.", ["Google Ads", "Analytics"], ["conversions", "tag manager", "tracking", "measurement"], ["bar-chart", "code", "target"]],
    ["Google Ads Optimization", "Review campaign data and make steady improvements to performance and spend.", ["Google Ads", "Performance Marketing"], ["bid strategy", "quality score", "testing"], ["trending-up", "bar-chart", "workflow"]],
    ["Google Ads for Lead Generation", "Apply search advertising to generate enquiries for service-based businesses.", ["Google Ads", "Marketing"], ["leads", "enquiries", "lead forms", "service businesses"], ["users", "search", "megaphone"]],
  ]),
  // Meta & social (7)
  ...group("dm", [
    ["Meta Ads Fundamentals", "Understand Meta's advertising platform, campaign objectives and how ads are delivered.", ["Meta Ads", "Social Media"], ["facebook ads", "instagram ads", "ads manager", "objectives"], ["megaphone", "users", "bar-chart"]],
    ["Facebook & Instagram Campaigns", "Plan and set up campaigns across Facebook and Instagram placements.", ["Meta Ads", "Social Media"], ["placements", "reels", "stories", "feed"], ["megaphone", "smartphone", "target"]],
    ["Meta Audience Targeting", "Define and refine audiences using interests, behaviours, custom and lookalike audiences.", ["Meta Ads", "Strategy"], ["custom audiences", "lookalike", "retargeting", "pixel"], ["users", "target", "search"]],
    ["Meta Ads Creative Strategy", "Develop ad concepts, visuals and messages that suit each audience and placement.", ["Meta Ads", "Content"], ["ad creative", "video ads", "testing creatives"], ["pen-tool", "sparkles", "megaphone"]],
    ["Meta Ads Optimization", "Read campaign results and adjust budgets, audiences and creatives to improve outcomes.", ["Meta Ads", "Performance Marketing"], ["ab testing", "budget", "frequency", "results"], ["trending-up", "bar-chart", "workflow"]],
    ["Social Media Marketing Fundamentals", "Learn how to plan, publish and grow a brand's presence across social platforms.", ["Social Media", "Marketing"], ["instagram", "linkedin", "community", "organic social"], ["smartphone", "users", "message"], { featured: true }],
    ["WhatsApp & Lead Generation", "Use messaging and simple lead capture flows to turn interest into conversations.", ["Marketing", "Social Media"], ["whatsapp business", "lead capture", "follow-up", "leads"], ["message", "users", "target"]],
  ]),
  // Performance marketing (4)
  ...group("dm", [
    ["Performance Marketing Fundamentals", "Understand how measurable, results-focused campaigns are planned, run and improved.", ["Performance Marketing", "Marketing"], ["paid media", "kpis", "growth"], ["trending-up", "target", "bar-chart"], { featured: true }],
    ["Paid Media Strategy", "Plan how budget and channels work together across search, social and display.", ["Performance Marketing", "Strategy"], ["media planning", "budget allocation", "channel mix"], ["layers", "megaphone", "target"]],
    ["ROAS & CAC Fundamentals", "Learn the key return and cost metrics used to judge paid marketing.", ["Performance Marketing", "Analytics"], ["return on ad spend", "customer acquisition cost", "unit economics", "cpa"], ["bar-chart", "trending-up", "target"]],
    ["Marketing Attribution", "Explore models for understanding which touchpoints contribute to conversions.", ["Performance Marketing", "Analytics"], ["attribution models", "multi-touch", "last click", "measurement"], ["workflow", "bar-chart", "link"]],
  ]),
  // Analytics, CRO & AI (5)
  ...group("dm", [
    ["Marketing Analytics Fundamentals", "Learn to collect, read and communicate marketing data to guide decisions.", ["Analytics", "Marketing"], ["reporting", "dashboards", "metrics", "data"], ["bar-chart", "trending-up", "layers"]],
    ["GA4 for Marketers", "Get started with Google Analytics 4: events, reports and audiences for marketing use.", ["Analytics"], ["google analytics", "ga4", "events", "reports"], ["bar-chart", "search", "code"]],
    ["Conversion Rate Optimization", "Use research and testing to help more visitors take the action a page is designed for.", ["Analytics", "Marketing"], ["cro", "ab testing", "landing pages", "user behaviour"], ["target", "trending-up", "layout"]],
    ["AI for Digital Marketers", "Explore where AI tools fit into everyday marketing work, and where human judgement still matters.", ["AI", "Marketing"], ["chatgpt", "ai tools", "automation", "prompting"], ["bot", "sparkles", "megaphone"], { featured: true }],
    ["AI-Assisted Content & Campaign Workflows", "Build repeatable workflows that use AI to support content and campaign production.", ["AI", "Content"], ["generative ai", "workflow", "content production", "prompts"], ["sparkles", "workflow", "file-text"]],
  ]),
];

// ------------------------------------------------------------------ Game development & creative technology (60)
const GAME_COURSES: Course[] = [
  // TG GameForge: general game development (10)
  ...group("forge", [
    ["Game Development Foundations", "Get an overview of how games are made, from idea and prototype to a playable build.", ["Game Development"], ["basics", "introduction", "game pipeline"], ["gamepad", "code", "layers"], { featured: true }],
    ["Game Production Fundamentals", "Learn how game projects are planned, scoped and organised across a team.", ["Game Development"], ["production", "planning", "scrum", "milestones"], ["workflow", "layers", "target"]],
    ["Game Programming Fundamentals", "Learn core programming ideas for games: logic, data, loops and events.", ["Game Development", "Programming"], ["coding", "logic", "game loop", "scripting"], ["code", "gamepad", "cpu"]],
    ["Game Mechanics Implementation", "Turn design ideas into working mechanics such as movement, interaction and scoring.", ["Game Development", "Programming"], ["gameplay", "movement", "interaction", "implementation"], ["gamepad", "code", "zap"]],
    ["Game Systems Architecture", "Structure game code so systems stay organised, reusable and easy to extend.", ["Game Development", "Programming"], ["architecture", "design patterns", "modular", "code structure"], ["layers", "code", "workflow"]],
    ["Game Prototyping", "Build quick, testable prototypes to explore whether an idea is fun before investing in it.", ["Game Development", "Game Design"], ["prototype", "iteration", "playtesting", "jam"], ["rocket", "gamepad", "lightbulb"]],
    ["Game Testing & QA", "Learn to find, report and track issues so a game is stable and enjoyable to play.", ["Game Development"], ["quality assurance", "bug reports", "test plans", "playtesting"], ["bug", "target", "gamepad"]],
    ["Game Optimization", "Understand performance basics and how to make games run smoothly on their target devices.", ["Game Development", "Programming"], ["performance", "profiling", "frame rate", "memory"], ["zap", "cpu", "bar-chart"]],
    ["Game Publishing", "Explore how finished games are prepared, released and presented on stores and platforms.", ["Game Development"], ["release", "store page", "launch", "distribution"], ["package", "rocket", "globe"]],
    ["Game Production & Portfolio", "Bring project work together into a finished game and a clear portfolio presentation.", ["Game Development"], ["capstone", "portfolio", "showcase", "project"], ["layers", "rocket", "sparkles"]],
  ]),
  // TG Unity Studio (10)
  ...group("unity", [
    ["Unity Fundamentals", "Learn the Unity editor, scenes, objects and components, and build a first playable project.", ["Unity", "Game Development"], ["game engine", "editor", "scenes", "basics"], ["gamepad", "cube", "layers"], { featured: true }],
    ["C# for Unity", "Learn the C# used in Unity scripts, from variables and functions to classes and components.", ["Unity", "Programming"], ["c#", "csharp", "scripting", "monobehaviour"], ["code", "cpu", "gamepad"], { slug: "csharp-for-unity" }],
    ["Unity Gameplay Programming", "Program player control, game rules and feedback to make gameplay respond well.", ["Unity", "Programming", "Game Development"], ["c#", "player controller", "gameplay", "scripting"], ["gamepad", "code", "zap"]],
    ["Unity Physics & Interaction", "Use Unity's physics system to build movement, collisions and interactive objects.", ["Unity", "Game Development"], ["rigidbody", "colliders", "raycast", "physics"], ["cube", "zap", "gamepad"]],
    ["Unity UI Development", "Build menus, HUDs and in-game interfaces that are clear and responsive.", ["Unity", "Game Development"], ["ui", "canvas", "hud", "menus", "user interface"], ["layout", "smartphone", "pen-tool"]],
    ["Unity Animation Systems", "Set up animation controllers, blending and transitions for characters and objects.", ["Unity", "Animation"], ["animator", "state machine", "timeline", "blend trees"], ["clapperboard", "workflow", "cube"]],
    ["Unity AI & NPC Systems", "Create characters that move, decide and react using Unity's navigation and AI tools.", ["Unity", "Game AI"], ["navmesh", "npc", "pathfinding", "behaviour"], ["bot", "cpu", "gamepad"]],
    ["Unity Optimization", "Profile and improve the performance of Unity projects.", ["Unity", "Programming"], ["profiler", "performance", "memory", "draw calls"], ["zap", "bar-chart", "cpu"]],
    ["Unity Mobile Game Development", "Adapt Unity projects for touch input, mobile screens and device limits.", ["Unity", "Game Development"], ["android", "ios", "touch controls", "mobile games"], ["smartphone", "gamepad", "code"]],
    ["Unity Game Production & Deployment", "Prepare a Unity project for building, testing and releasing on target platforms.", ["Unity", "Game Development"], ["build", "deployment", "release", "platforms"], ["package", "rocket", "gamepad"]],
  ]),
  // TG Unreal Studio (10)
  ...group("unreal", [
    ["Unreal Engine Fundamentals", "Learn the Unreal Engine editor, levels and actors, and set up a first project.", ["Unreal Engine", "Game Development"], ["game engine", "editor", "levels", "basics", "3d"], ["cube", "gamepad", "layers"], { featured: true }],
    ["Blueprint Development", "Build gameplay and interaction visually using Unreal's Blueprint system.", ["Unreal Engine", "Programming"], ["blueprints", "visual scripting", "gameplay"], ["workflow", "cube", "code"], { slug: "unreal-blueprints" }],
    ["C++ for Unreal", "Learn the C++ foundations used to extend and customise Unreal Engine projects.", ["Unreal Engine", "Programming"], ["c++", "cpp", "unreal c++", "classes"], ["code", "cpu", "cube"], { slug: "cpp-for-unreal" }],
    ["Unreal Gameplay Programming", "Program player control, rules and game flow using Unreal's gameplay framework.", ["Unreal Engine", "Programming", "Game Development"], ["gameplay framework", "blueprints", "c++", "player controller"], ["gamepad", "code", "zap"]],
    ["Unreal Materials & Lighting", "Create materials and light scenes to give Unreal environments mood and clarity.", ["Unreal Engine", "3D Art"], ["materials", "lighting", "lumen", "shaders"], ["sun", "palette", "cube"]],
    ["Unreal Animation Systems", "Work with animation blueprints, montages and state machines for characters.", ["Unreal Engine", "Animation"], ["animation blueprint", "montages", "state machine", "skeletal mesh"], ["clapperboard", "workflow", "cube"]],
    ["Niagara VFX", "Create particle and visual effects with Unreal's Niagara system.", ["Unreal Engine", "VFX"], ["niagara", "particles", "effects", "vfx"], ["flame", "sparkles", "cube"]],
    ["Unreal AI Systems", "Build characters that perceive, decide and act using Unreal's AI framework.", ["Unreal Engine", "Game AI"], ["behaviour trees", "blackboard", "npc", "navigation"], ["bot", "cpu", "cube"]],
    ["Unreal Optimization", "Profile and improve the performance of Unreal Engine projects.", ["Unreal Engine", "Programming"], ["profiling", "performance", "frame rate", "stats"], ["zap", "bar-chart", "cpu"]],
    ["Unreal Production & Deployment", "Prepare an Unreal project for packaging, testing and release.", ["Unreal Engine", "Game Development"], ["packaging", "build", "release", "platforms"], ["package", "rocket", "cube"]],
  ]),
  // TG GameArt Studio (10)
  ...group("art", [
    ["Visual Design for Games", "Learn the visual principles of shape, colour and composition that make game art read clearly.", ["2D Art", "Game Development"], ["art fundamentals", "colour", "composition", "art direction"], ["palette", "pen-tool", "sparkles"], { featured: true }],
    ["2D Game Art Fundamentals", "Create sprites, backgrounds and interface art built for use in games.", ["2D Art"], ["sprites", "pixel art", "backgrounds", "game art"], ["pen-tool", "palette", "layers"]],
    ["Digital Illustration for Games", "Develop digital painting and illustration skills for concept and production art.", ["2D Art"], ["digital painting", "concept art", "illustration", "photoshop"], ["palette", "pen-tool", "sparkles"]],
    ["Character Design for Games", "Design characters with clear silhouettes, personality and a strong fit for their game.", ["2D Art", "Game Design"], ["character design", "silhouette", "concept", "characters"], ["pen-tool", "users", "palette"]],
    ["Environment Art", "Build environments and scenes that support the mood and gameplay of a level.", ["2D Art", "3D Art"], ["environments", "scenes", "world building", "props"], ["globe", "palette", "cube"]],
    ["Prop Design", "Design and produce props and objects that fit a game's visual style.", ["2D Art", "3D Art"], ["props", "objects", "assets", "stylised"], ["boxes", "pen-tool", "cube"]],
    ["Blender for Game Art", "Learn Blender's tools for modelling, unwrapping and preparing assets for games.", ["3D Art"], ["blender", "modelling", "uv unwrapping", "3d software"], ["cube", "boxes", "palette"]],
    ["3D Character Modelling", "Model game-ready characters, from blockout through to a clean, usable mesh.", ["3D Art"], ["blender", "sculpting", "topology", "character", "zbrush"], ["cube", "users", "palette"], { featured: true }],
    ["3D Environment Modelling", "Model buildings, terrain and set pieces for game environments.", ["3D Art"], ["blender", "modular kits", "level art", "environment"], ["globe", "cube", "boxes"]],
    ["Game-Ready Asset Production", "Take assets through texturing, optimisation and export so they work inside a game engine.", ["3D Art", "Game Development"], ["texturing", "pbr", "export", "substance", "optimisation"], ["package", "cube", "palette"]],
  ]),
  // TG GameDesign Studio (8)
  ...group("design", [
    ["Game Design Fundamentals", "Learn what makes games engaging, and the core concepts designers use to shape play.", ["Game Design"], ["basics", "player experience", "design thinking"], ["lightbulb", "gamepad", "layers"], { featured: true }],
    ["Game Mechanics Design", "Design rules, actions and systems that give a game its core play.", ["Game Design"], ["mechanics", "rules", "core loop", "systems"], ["gamepad", "zap", "workflow"]],
    ["Game Loops & Progression", "Design the loops and progression that keep players moving through a game.", ["Game Design"], ["core loop", "progression", "rewards", "retention"], ["workflow", "trending-up", "gamepad"]],
    ["Game Balancing", "Tune difficulty, rewards and systems so a game feels fair and consistent.", ["Game Design"], ["balance", "difficulty", "tuning", "spreadsheets"], ["sliders", "bar-chart", "gamepad"]],
    ["Level Design Fundamentals", "Plan and build levels that guide players, teach mechanics and pace the experience.", ["Level Design", "Game Design"], ["level layout", "pacing", "blockout", "flow"], ["map-pin", "layers", "gamepad"], { featured: true }],
    ["Quest & Narrative Design", "Shape story, quests and dialogue so they support gameplay and player choice.", ["Game Design"], ["story", "quests", "dialogue", "narrative"], ["book-open", "users", "pen-tool"]],
    ["Game Economy Design", "Design in-game resources, rewards and exchanges so they stay meaningful over time.", ["Game Design"], ["economy", "resources", "currency", "monetisation"], ["coins", "sliders", "bar-chart"]],
    ["Game Design Documents & Prototyping", "Communicate designs clearly through documents and quick prototypes.", ["Game Design", "Game Development"], ["gdd", "documentation", "prototype", "pitch"], ["file-text", "rocket", "lightbulb"]],
  ]),
  // TG Game Animation & VFX (6)
  ...group("anim", [
    ["Animation Fundamentals for Games", "Learn the principles of motion and timing that make game characters feel alive.", ["Animation"], ["principles of animation", "timing", "spacing", "keyframes"], ["clapperboard", "workflow", "sparkles"], { featured: true }],
    ["Character Animation", "Animate characters for movement, actions and expression in interactive projects.", ["Animation", "3D Art"], ["locomotion", "walk cycle", "actions", "3d animation"], ["clapperboard", "users", "cube"]],
    ["Rigging & Skinning", "Build skeletons and skin meshes so characters can be posed and animated.", ["Animation", "3D Art"], ["rigging", "skinning", "bones", "weights"], ["workflow", "cube", "users"]],
    ["Game VFX & Particle Systems", "Create particle-based visual effects that add impact and feedback to gameplay.", ["VFX"], ["particles", "effects", "shaders", "houdini"], ["flame", "sparkles", "zap"]],
    ["Lighting & Cinematics", "Light scenes and frame shots to create mood and tell stories on screen.", ["Cinematics", "VFX"], ["lighting", "camera", "cinematography", "rendering"], ["sun", "clapperboard", "sparkles"]],
    ["Game Cutscenes & Sequencing", "Assemble animation, cameras and audio into in-engine cutscenes.", ["Cinematics", "Animation"], ["cutscenes", "sequencer", "timeline", "storytelling"], ["clapperboard", "layers", "gamepad"]],
  ]),
  // TG AI for Games (6)
  ...group("ai", [
    ["AI for Games Fundamentals", "Understand the role AI plays in games, from enemy behaviour to procedural content.", ["AI", "Game AI"], ["basics", "introduction", "artificial intelligence"], ["cpu", "gamepad", "bot"], { featured: true }],
    ["Game AI Systems", "Learn the common approaches used to structure how in-game AI perceives and acts.", ["Game AI", "Programming"], ["behaviour trees", "pathfinding", "ai architecture", "steering"], ["bot", "workflow", "code"]],
    ["NPC Behaviour", "Design non-player characters that move, react and make believable choices.", ["Game AI", "Game Design"], ["npc", "non-player characters", "behaviour", "enemies"], ["users", "bot", "gamepad"]],
    ["State Machines & Decision Systems", "Use state machines and decision structures to organise character logic.", ["Game AI", "Programming"], ["fsm", "finite state machine", "utility ai", "decision making"], ["workflow", "cpu", "code"]],
    ["Generative AI for Game Development", "Explore how generative AI can support ideas, assets and content in game projects.", ["AI", "Game Development"], ["generative ai", "image generation", "content creation", "prompting"], ["sparkles", "bot", "palette"]],
    ["AI-Assisted Game Development Workflows", "Build practical workflows that use AI tools alongside traditional game-development work.", ["AI", "Game Development"], ["workflow", "ai tools", "automation", "productivity"], ["workflow", "sparkles", "gamepad"]],
  ]),
];

export const PROPOSED_COURSES: Course[] = [...DIGITAL_MARKETING, ...GAME_COURSES];
