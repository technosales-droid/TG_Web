// Course detail content for /programs/[slug]. ONE template renders every course from a record here.
//
// Adding a course = adding it to the catalogue (course-catalogue.ts / programs.ts) and, when there is more to say,
// an entry in OVERRIDES below. No component or page changes.
//
// Every course starts from its catalogue offering (title, description, duration, mode, tools, topics, image), so the two
// never disagree. OVERRIDES adds only what the repository's source documents state (Digital Marketing "What You Take
// Away", its 18 curriculum modules, and each game course's description restated as outcomes). Anything the sources do not
// state is left empty and the page shows a plain placeholder. Nothing here is a rating, review, price, salary,
// placement figure, learner count, certificate claim or partner.
import { DIGITAL_MARKETING_CURRICULUM } from "./course-catalogue";
import { ALL_OFFERINGS } from "./programs";
import { DM_PROGRAM_SLUG, GD_PROGRAM_SLUG } from "@/lib/program-routes";
import { PROGRAM_FACTS } from "./business-facts";

export interface CourseLesson {
  title: string;
  duration?: string;
  preview?: boolean;
}
export interface CourseModule {
  title: string;
  /** Shown when the individual lessons are not written yet. */
  summary?: string;
  /** A short caveat about the module (e.g. project selection depending on the candidate), shown under its topics. */
  note?: string;
  duration?: string;
  lessons: CourseLesson[];
}
export type IncludeIcon = "clock" | "mode" | "place" | "tools" | "projects" | "portfolio" | "practice";
export interface CourseReview {
  name: string;
  /** 1-5 */
  rating: number;
  date?: string;
  text: string;
}
export interface CourseDetail {
  slug: string;
  title: string;
  category: string;
  subtitle?: string;
  /** The source document's own positioning line, e.g. "2026 Curriculum | Job • Freelance • Agency Ready", shown
   * as a small badge under the hero title. Unset shows nothing. */
  programTagline?: string;
  /** Keyword-first H1 for search/AI (e.g. "Digital Marketing Course in Nashik"). Unset falls back to `title`.
   * When set, an extra "Professional Program" eyebrow badge renders above the H1 so the original program name
   * (still `title` everywhere else -- cards, breadcrumbs, JSON-LD) stays visible on the page too. */
  seoH1?: string;
  /** A 40-60 word, answer-first paragraph built only from published facts, written to be quoted verbatim by an
   * AI answer engine. Renders directly under the H1. Unset shows nothing (not every course needs one). */
  answerSummary?: string;
  description: string;
  heroImage: string | null;
  heroAlt: string;
  previewVideo?: string;
  /** Slug of a record in FACULTY (data/institute.ts). Unset shows "Instructor to be announced". */
  instructor?: { facultySlug: string };
  /** Only set when real ratings exist. */
  rating?: { value: number; count: number };
  /** Only set when a verified number exists. */
  students?: number;
  level?: string;
  duration?: string;
  learningMode?: string;
  location?: string;
  projectsCount?: number;
  certificate?: boolean;
  /** A short line, only when the source states it (e.g. batch size). */
  note?: string;
  /** Overrides the "What you'll learn" section's title, e.g. to "Career Outcomes" for a program whose source
   * document names it that instead. Unset keeps the default. */
  outcomesHeading?: string;
  learningOutcomes: string[];
  topics: string[];
  includes: { label: string; icon: IncludeIcon }[];
  curriculum: CourseModule[];
  /** Overrides the curriculum accordion's unit label, e.g. "Semester" instead of the default "Module". */
  curriculumUnitLabel?: string;
  requirements: string[];
  /** The source document's own opening philosophy/approach paragraph, if it has one. Prepended to the long description. */
  programPhilosophy?: string;
  /** Paragraphs of the long description. */
  longDescription: string[];
  /** The source document's own closing "what a graduate can do" paragraph, if it has one. Appended to the long description. */
  finalReadiness?: string;
  /** The source document's practical-learning breakdown (e.g. "60% Practical Execution") and the points under it. */
  practicalLearningModel?: { split: { label: string; percent: number }[]; points: string[] };
  /** Named capstone/live-project tracks, each with its own step sequence, e.g. "Strategy → Content → ... → Report". */
  liveProjects?: { title: string; sequence: string }[];
  /** Named project categories, each a short list of what students work with (rather than a single step sequence). */
  projectTracks?: { title: string; points: string[] }[];
  /** Specialization tracks a student can go deeper on, e.g. an engine choice. */
  specializationPaths?: { name: string; tagline: string; stack: string[] }[];
  /** Tools and technologies grouped by category, for a program with enough of them to need grouping. */
  toolsByCategory?: { category: string; items: string[] }[];
  /** Potential career directions/roles: always framed as possibilities, never guarantees. */
  careerDirections?: string[];
  /** A hedged, source-provided market salary range, e.g. "₹3–8 LPA". Only ever an indicative range with its
   * own caveat text, never a promise; omitted entirely for a course with no such source. */
  salaryNote?: string;
  /** What a graduate can show for it, e.g. the portfolio a program builds towards. */
  portfolioNote?: string;
  /** The site's own learning-journey stages (see AboutStages), restated with this program's own detail under each. */
  practicalLearningStages?: { title: string; text: string }[];
  /** Slugs. Unset uses other courses in the same category. */
  relatedCourses?: string[];
  reviews: CourseReview[];
}

type Override = Partial<Omit<CourseDetail, "slug" | "title" | "category" | "description">>;

// Digital Marketing Professional Program, 2026 Curriculum: every string below is that source document's own
// wording, word-for-word (Program Philosophy, Career Outcomes, Practical Learning Model, Live Projects &
// Capstone, Final Student Readiness). Do not paraphrase, shorten or rewrite when editing.
const DM_PROGRAM_PHILOSOPHY =
  "The curriculum is not designed as a collection of disconnected tools or traditional 2018-style subjects. Students learn the complete digital marketing ecosystem through the journey: Understand → Plan → Create → Launch → Measure → Optimize → Sell → Scale.";

const DM_FINAL_READINESS =
  "By the end of the program, a student should be able to understand a business, identify its audience, create a basic digital strategy, manage social media, create content and creatives, build/manage a basic website or landing page, execute entry-level SEO and paid campaigns, generate and nurture leads, track results, prepare reports, communicate with clients and present a portfolio.";

// Game Development Professional Program: a 7-semester curriculum, adapted for Techno Gurukul from a reference
// program's structure and depth (subject meaning and progression kept; wording cleaned up for grammar and to
// remove that program's own branding, claims, fees and duration, none of which are used here).
const gdSemester = (title: string, topics: string[], skillDevelopment: string): CourseModule => ({
  title,
  lessons: topics.map((t) => ({ title: t })),
  summary: skillDevelopment,
});

// The six specialized Game Development studios' curricula: adapted from Techno Gurukul's own
// "Techno-Gurukul-Game-Development-Programs" reference document (its Curriculum sections list a module title
// followed by a comma-separated list of topics; split here into individual topic bullets, wording unchanged).
const gdModule = (title: string, topics: string[]): CourseModule => ({
  title,
  lessons: topics.map((t) => ({ title: t })),
});

const GD_CURRICULUM: CourseModule[] = [
  gdSemester(
    "Working with Artworks",
    [
      "Working on the idea for the game",
      "Assembling the idea into a game concept",
      "Assembling different artwork references",
      "Understanding the artwork style",
      "Designing rough assets for the game",
      "Understanding the importance of storyboarding",
      "2D content development",
      "Designing characters for the game",
      "Environment & background study for games",
      "Designing rough levels",
    ],
    "Students should understand the importance of artwork for game development, animation, VFX and the broader graphics industry. The module establishes the foundation for understanding how a game idea becomes visual content and a project concept."
  ),
  gdSemester(
    "Exploring Graphics & User Interface",
    [
      "Understanding colour theory",
      "2D asset creation pipeline",
      "Creating assets in 2D software",
      "Working with Adobe Photoshop",
      "Understanding project flow in Photoshop",
      "Understanding graphic art style",
      "Working on 2D game background/UI assignments",
      "Working with Adobe Illustrator",
      "Designing complete 2D game art with Photoshop, Illustrator & Animate",
      "Learning UI/UX concepts in detail",
      "Group live project",
    ],
    "Students should develop strong graphic visualisation skills and understand how to create complete graphical assets and interfaces for game projects, with a focus on practical visual production rather than purely theoretical design."
  ),
  gdSemester(
    "Mastering 2D Game Assets with Animation",
    [
      "Learning to match and compose 2D art & graphics in a scene",
      "Working with industry-standard applications",
      "Working with Adobe Animate/Spriter for game animations",
      "Learning to render game assets & animation for a game engine",
      "Understanding character sprite sheets for games & animation",
      "Working with sprite sheets & creating animations for games",
      "Scene and cinematic compositing",
      "Working on 2D games with Unity & Unreal Engine",
    ],
    "Students should learn how game assets are used for games and animations and how those assets move through the development process into actual game projects, including live/project-based application."
  ),
  gdSemester(
    "Mastering 3D Game Assets with Animatics",
    [
      "Learning to create, match & compose 3D assets & art",
      "Working with industry-standard applications",
      "Working with Maya/Blender & Mudbox/ZBrush",
      "Creating assets for 3D games",
      "Working on game textures & game background art",
      "Creating cinematics for 3D games",
      "Creating animation for 3D games",
      "Learning to make prefabs",
      "Assembling assets as a group",
      "Scene and cinematic compositing",
      "Working on 3D games with Unity & Unreal Engine",
    ],
    "Students should learn how to apply 2D and 3D skills to games and multimedia projects and create 3D assets for game development."
  ),
  gdSemester(
    "Editing, Game Shaders & Generative AI",
    [
      "Post-production techniques for games",
      "Learning to edit & compose scenes",
      "Learning After Effects and DaVinci Resolve",
      "PFTrack for camera tracking, rotoscopy & 3D tracking",
      "Applying effects in game engines like Unity and Unreal Engine",
      "Understanding generative AI for asset creation with AI chatbots",
      "Working with shaders & particles",
      "Learning to create complex shaders & particles for games",
      "Live group project",
    ],
    "VFX skills should be developed as an important supporting skill for games and multimedia projects. The module connects post-production, effects, shaders, particles and modern AI-assisted asset workflows."
  ),
  gdSemester(
    "Visual Scripting to Programming Games",
    [
      "Understanding visual scripting & game programming languages",
      "Learning Unity Visual Scripting with C#",
      "Learning Unreal Blueprint with C++",
      "Coding advanced C++ & C# logic for high-end games",
      "Learning to integrate 2D & 3D games using C# in Unity",
      "Learning to integrate 2D & 3D games using C++ in Unreal Engine",
      "Understanding game logic, physics, AI movement & networking",
      "Understanding the pipeline to link cinematics & games",
    ],
    "The programming module covers the programming and scripting side of game development. Students develop the ability to work with C#, C++, Unity, Unreal Engine, visual scripting, game logic, physics, AI and networking concepts."
  ),
  gdSemester(
    "Creating Scalable Games & Apps",
    [
      "Assembling created assets in the game engine",
      "Learning to use GitHub and work in a team",
      "Learning cross-platform basics",
      "Developing playable games across genres such as platform, puzzle, shooter, racing, match-3, AI-based, social and others",
      "Applying AI to enemy behaviour",
      "Game level development & linking",
      "Learning the basics of networking and a scalable project pipeline",
      "Game performance optimisation",
      "Game testing and debugging",
    ],
    "Students should develop the skills required to create playable games across different genres and understand the practical processes involved in problem solving, applying AI, networking concepts, optimisation, testing, debugging and collaborative development."
  ),
];

const OVERRIDES: Record<string, Override> = {
  [DM_PROGRAM_SLUG]: {
    note: "Batch size is limited.",
    programTagline: "2026 Curriculum | Job • Freelance • Agency Ready",
    seoH1: "Digital Marketing Course in Nashik",
    answerSummary:
      `Techno Gurukul's Digital Marketing Course in Nashik is a 3–3.5 month, offline, project-based program covering SEO, social media, Google Ads, Meta Ads, content and analytics across 18 modules and 205 topics. Students work through ${PROGRAM_FACTS[DM_PROGRAM_SLUG].projectsLabel}, building real campaigns rather than studying theory alone, at its institute in Tilak Wadi, Nashik.`,
    outcomesHeading: "Career Outcomes",
    learningOutcomes: [
      "Job Ready: Digital Marketing Executive, Social Media Executive, SEO Executive, Performance Marketing Executive, Digital Marketing Associate and related entry-level roles.",
      "Freelance Ready: Ability to package and sell services such as social media, Meta Ads, Google Ads, SEO, content, websites/landing pages and lead generation.",
      "Agency Ready: Ability to understand niche selection, service packaging, pricing, proposals, client on boarding, execution, reporting and basic agency operations.",
    ],
    curriculum: DIGITAL_MARKETING_CURRICULUM.map((m) => ({
      title: m.title,
      lessons: m.topics.map((t) => ({ title: t })),
      ...(m.description !== m.title ? { note: m.description } : {}),
    })),
    includes: [
      { label: "Campaign projects that build portfolio-worthy work", icon: "portfolio" },
      { label: "Exposure to professional tools", icon: "tools" },
    ],
    programPhilosophy: DM_PROGRAM_PHILOSOPHY,
    finalReadiness: DM_FINAL_READINESS,
    liveProjects: [
      { title: "Project 1: Social Media", sequence: "Strategy → Content → Creatives → Reels → Reporting" },
      { title: "Project 2: SEO", sequence: "Keyword Research → Website Audit → Content → On-page Optimization → Search Console" },
      { title: "Project 3: Paid Ads", sequence: "Strategy → Meta Ads → Google Ads → Tracking → Optimization → Report" },
      {
        title: "Project 4: Complete Business Project",
        sequence: "Research → Strategy → Website/Landing Page → Social Media → Content → SEO → Meta Ads → Google Ads → WhatsApp/CRM → Analytics → Report",
      },
    ],
  },
  [GD_PROGRAM_SLUG]: {
    programTagline: "Build Games. Learn the Technology. Create Your Portfolio.",
    seoH1: "Game Development Course in Nashik",
    answerSummary:
      `Techno Gurukul's Game Development Course in Nashik is an offline, project-based program covering game design, 2D and 3D art, animation, programming, and both Unity and Unreal Engine, across 7 modules and 66 topics. Students build ${PROGRAM_FACTS[GD_PROGRAM_SLUG].projectsLabel}, from concept art through a full gameplay and programming project, at its institute in Tilak Wadi, Nashik.`,
    programPhilosophy:
      "The program moves students through the full game development journey: from idea and artwork, through 2D and 3D assets and animation, into game engines, programming and game systems, and finally into optimisation, testing and a complete, presentable project.",
    learningOutcomes: [
      "Game Design",
      "Game Art (2D & 3D)",
      "Game Assets & Animation",
      "UI/UX for Games",
      "Game Engines (Unity & Unreal Engine)",
      "Programming & Visual Scripting",
      "Game Physics & AI",
      "Multiplayer & Networking Foundations",
      "Game Optimisation, Testing & Publishing",
      "Team Projects & Portfolio Development",
    ],
    curriculum: GD_CURRICULUM,
    curriculumUnitLabel: "Semester",
    includes: [
      { label: "A capstone game project", icon: "projects" },
      { label: "Exposure to industry-standard game development tools", icon: "tools" },
    ],
    practicalLearningStages: [
      { title: "Understand", text: "Learn the concepts behind game design, art, engines and programming before building with them." },
      { title: "Practise", text: "Work through guided exercises in art, animation, engines and code to turn concepts into skills." },
      { title: "Build", text: "Apply those skills across individual assignments, group projects and full game builds." },
      { title: "Show", text: "Bring assets, animation, engine work and code together into playable, presentable projects." },
      { title: "Prepare", text: "Build the practical confidence and portfolio needed for the next step, whether that's further learning or a career." },
    ],
    specializationPaths: [
      {
        name: "Unreal Path",
        tagline: "Go deeper on cinematic-quality visuals and high-performance C++ systems.",
        stack: ["Unreal Engine", "Blueprint", "C++"],
      },
      {
        name: "Unity Path",
        tagline: "Go deeper on fast iteration, cross-platform builds and approachable C# scripting.",
        stack: ["Unity Engine", "Visual Scripting", "C#"],
      },
    ],
    toolsByCategory: [
      { category: "Game Engines", items: ["Unity", "Unreal Engine"] },
      { category: "Programming", items: ["C#", "C++"] },
      { category: "Visual Scripting", items: ["Unity Visual Scripting", "Unreal Blueprint"] },
      { category: "3D & Art", items: ["Maya", "Blender", "Mudbox", "ZBrush"] },
      { category: "2D & Creative", items: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Animate"] },
      { category: "Post-Production & VFX", items: ["After Effects", "DaVinci Resolve", "PFTrack"] },
      { category: "Collaboration", items: ["GitHub"] },
      { category: "AI", items: ["Generative AI", "AI-assisted asset creation", "AI-assisted game workflows"] },
    ],
    projectTracks: [
      {
        title: "Project 1: Game Concept & Artwork",
        points: ["Game idea", "Concept", "Artwork direction", "Rough assets", "Characters", "Environments", "Rough levels"],
      },
      {
        title: "Project 2: 2D Game Project",
        points: ["2D assets", "UI", "Backgrounds", "Animation", "Game scenes", "Unity / Unreal"],
      },
      {
        title: "Project 3: 3D Game Project",
        points: ["3D assets", "Textures", "Environments", "Animation", "Cinematic elements", "Prefabs", "Unity / Unreal"],
      },
      {
        title: "Project 4: Gameplay & Programming Project",
        points: ["Game logic", "Programming", "Visual scripting", "Physics", "AI", "Gameplay systems"],
      },
      {
        title: "Project 5: Advanced Game Project",
        points: ["Scalable game structure", "GitHub / team workflow", "Cross-platform concepts", "Optimisation", "Testing", "Debugging", "Networking foundations"],
      },
    ],
    careerDirections: [
      "Game Designer",
      "Game Developer",
      "Unity Developer",
      "Unreal Developer",
      "Gameplay Programmer",
      "Game Artist",
      "2D Game Artist",
      "3D Game Artist",
      "Game UI/UX Designer",
      "Technical Artist",
      "Game Animator",
      "VFX Artist for Games",
      "Level Designer",
      "Junior Game Programmer",
      "Game QA / Testing",
    ],
    portfolioNote:
      "By the end of the program, a student can put together a portfolio spanning game concepts and artwork, 2D and 3D assets and animation, engine-built playable levels, programmed gameplay systems and a larger, team-built project: real, presentable evidence of what they can build, not just what they have studied.",
  },
  "tg-unity-studio": {
    programPhilosophy:
      "Unity is particularly valuable because it provides a practical route into mobile, PC, web and interactive applications. Current Indian listings demonstrate demand for Unity developers across mobile, PC and multiplayer projects, and several listings specifically request C#, Unity, Git and completed or published game projects.",
    learningOutcomes: [
      "Unity environment & C# fundamentals",
      "Gameplay programming",
      "Physics",
      "UI",
      "Animation",
      "Audio",
      "AI",
      "Optimization",
      "Multiplayer fundamentals",
      "Deployment",
    ],
    curriculum: [
      gdModule("Unity Fundamentals", ["The Unity Editor", "Projects", "Scenes", "GameObjects", "Components", "Prefabs", "Assets", "Materials", "Lighting", "Basic game architecture"]),
      gdModule("C# for Unity", ["Programming fundamentals", "Object-oriented programming", "Functions", "Classes", "Collections", "Events", "Debugging"]),
      gdModule("Gameplay Programming", ["Player movement", "Cameras", "Input", "Interaction", "Combat", "Weapons", "Health", "Inventory", "Scoring", "Game-state systems"]),
      gdModule("Unity Systems", ["UI", "Menus", "Physics", "Animation", "Audio", "Particle effects", "AI", "Enemy behaviour", "NPC systems"]),
      gdModule("Advanced Unity", ["Optimization", "Profiling", "Shaders", "Lighting", "Asset management", "Mobile performance", "Debugging", "Build management"]),
      gdModule("Production & Release", ["Git", "Team collaboration", "Testing", "Publishing", "Development of a complete Unity game"]),
    ],
    includes: [{ label: "A complete Unity game, built end to end", icon: "projects" }],
    careerDirections: [
      "Unity Developer",
      "Game Developer",
      "Gameplay Programmer",
      "Unity 2D/3D Developer",
      "Mobile Game Developer",
      "XR / Interactive Developer",
      "Junior Technical Designer",
      "Game Tools Developer",
      "Technical Game Developer",
      "Gameplay Engineer",
    ],
    salaryNote:
      "Current listings range from approximately ₹3–5 LPA for some Unity developer roles to ₹3–8 LPA for junior game-development roles, with an indicative early-career target of ₹3–8 LPA. This is a market indication, not a guarantee — actual compensation depends on demonstrable skill, portfolio and experience.",
  },
  "tg-unreal-studio": {
    programPhilosophy:
      "Unreal gives students exposure to one of the major professional game engines and develops skills that can extend beyond conventional games into interactive 3D, simulation, visualization, virtual production and immersive experiences.",
    learningOutcomes: ["Unreal Engine environment", "Blueprints & C++", "Gameplay systems", "Materials & lighting", "Animation", "AI", "VFX & cinematics", "Environments", "Optimization"],
    curriculum: [
      gdModule("Unreal Engine Foundations", ["The Editor", "Projects", "Levels", "Actors", "Components", "Assets", "Materials", "Lighting"]),
      gdModule("Blueprint Development", ["Variables", "Functions", "Events", "Communication", "Gameplay logic", "Reusable systems"]),
      gdModule("C++ for Unreal", ["Character systems", "Player controllers", "Input", "Gameplay mechanics", "Physics", "Interaction"]),
      gdModule("Visual Development", ["Materials", "Landscapes", "Lighting", "Niagara VFX", "Animation systems", "Cinematic sequencing"]),
      gdModule("Advanced Development", ["AI", "Optimization", "Performance profiling", "Multiplayer fundamentals", "Production workflows"]),
      gdModule("Final Production Project", ["A complete Unreal Engine game or interactive experience"]),
    ],
    includes: [{ label: "A complete Unreal Engine game or interactive experience", icon: "projects" }],
    careerDirections: [
      "Unreal Developer",
      "Unreal Engine Developer",
      "Gameplay Programmer",
      "C++ Game Programmer",
      "Technical Game Developer",
      "Technical Designer",
      "Simulation Developer",
      "Virtual Production Developer",
      "XR Developer",
      "Game Systems Programmer",
    ],
    salaryNote:
      "An indicative early-career range would be approximately ₹3–8 LPA, with specialist C++/Unreal/gameplay positions potentially moving beyond that range as experience develops. These are market indications, not guaranteed fresher salaries.",
  },
  "tg-gameart-studio": {
    programPhilosophy:
      "This course provides an entry into the visual-production side of the gaming industry while also creating transferable skills for animation, VFX, 3D visualization, interactive media and digital content production.",
    learningOutcomes: [
      "Drawing & visual fundamentals",
      "Digital illustration & concept art",
      "Character & environment design",
      "Game UI",
      "3D modelling, topology & UVs",
      "Materials & texturing",
      "Game-ready assets",
    ],
    curriculum: [
      gdModule("Visual & Design Foundations", ["Composition", "Colour", "Shape", "Perspective", "Lighting", "Visual storytelling"]),
      gdModule("2D Game Art", ["Concept development", "Characters", "Environments", "Props", "Icons", "Backgrounds", "Game interfaces"]),
      gdModule("3D Game Art", ["Modelling", "Topology", "Low-poly and high-poly workflows", "UV mapping", "Materials", "Texturing", "Characters", "Environments", "Props"]),
      gdModule("Game-Ready Production", ["Assets are optimized, exported and integrated into Unity or Unreal"]),
      gdModule("Portfolio", ["A complete portfolio consisting of characters, environments, props, UI and a full game-art presentation"]),
    ],
    includes: [{ label: "A full game-art portfolio", icon: "portfolio" }],
    careerDirections: [
      "3D Game Artist",
      "2D Game Artist",
      "Character Artist",
      "Environment Artist",
      "Prop Artist",
      "Concept Artist",
      "3D Modeller",
      "Texture Artist",
      "Game UI Artist",
      "Technical Artist",
      "Asset Artist",
      "Junior VFX Artist",
      "Game Art Intern",
    ],
    salaryNote:
      "A conservative early-career range would be around ₹2.5–6 LPA, depending heavily on portfolio quality, specialization and software proficiency; senior and specialized artists can progress well beyond entry-level pay. Portfolio quality matters more than any headline number here, since game-art hiring is particularly portfolio-driven.",
  },
  "tg-gamedesign-studio": {
    programPhilosophy:
      "Game design develops a combination of creative thinking, systems thinking, storytelling, problem solving and communication. It is also one of the strongest courses for students who have excellent game ideas but do not necessarily want programming to be their primary discipline.",
    learningOutcomes: ["Analysing existing games", "Designing game systems", "Building playable prototypes", "Player, rules & progression design", "Difficulty, feedback & engagement"],
    curriculum: [
      gdModule("Core Design Subjects", ["Game Design Fundamentals", "Game Mechanics", "Game Loops", "Player Progression", "Game Balancing", "Difficulty Design", "Reward Systems", "Game Economy"]),
      gdModule("Narrative & World", ["Narrative Design", "Character Design", "World Building", "Quest Design"]),
      gdModule("Level & Experience Design", ["Level Design", "Multiplayer Design", "UI/UX", "Prototyping", "Playtesting"]),
      gdModule("Professional Practice", [
        "Creating professional Game Design Documents",
        "Communicating ideas to programmers and artists",
        "Evaluating prototypes",
        "Refining a game based on playtesting",
      ]),
      gdModule("Final Project", ["A complete Game Design Document accompanied by a playable prototype"]),
    ],
    includes: [{ label: "A Game Design Document with a playable prototype", icon: "projects" }],
    careerDirections: [
      "Game Designer",
      "Level Designer",
      "Systems Designer",
      "Narrative Designer",
      "Quest Designer",
      "Technical Designer",
      "Game Economy Designer",
      "UX Designer",
      "Game Producer",
      "Game Design Associate",
    ],
    salaryNote:
      "A reasonable early-career range would be approximately ₹2.5–6 LPA, with progression depending strongly on experience, shipped projects and specialization. A strong portfolio demonstrating real game systems and playable prototypes matters more than any single figure.",
  },
  "tg-game-animation-vfx": {
    programPhilosophy: "The skills can extend beyond games into animation, VFX, interactive media, virtual production, AR/VR and digital content creation.",
    learningOutcomes: ["Animation principles", "Character & environment animation", "Game-specific animation systems", "VFX & particles", "Shaders & lighting", "Cameras & cinematics"],
    curriculum: [
      gdModule("Animation Core", ["Animation Fundamentals", "Character Animation", "Walk and Run Cycles", "Combat Animation", "Rigging", "Skinning"]),
      gdModule("Game Animation", ["Applying animation inside interactive game systems"]),
      gdModule("VFX", ["Particle Systems", "VFX", "Environmental Effects", "Shaders"]),
      gdModule("Cinematics", ["Lighting", "Camera Systems", "Cutscenes", "Cinematics", "Sequencing"]),
      gdModule("Final Project", ["A polished game-animation and VFX sequence"]),
    ],
    includes: [{ label: "A polished game-animation and VFX sequence", icon: "projects" }],
    careerDirections: [
      "Game Animator",
      "3D Animator",
      "Character Animator",
      "VFX Artist",
      "Game VFX Artist",
      "Technical Artist",
      "Cinematic Artist",
      "Lighting Artist",
      "Junior Technical Animator",
      "Motion / Interactive Artist",
    ],
    salaryNote:
      "An indicative early-career range would be approximately ₹2.5–6 LPA, with specialized technical-art and experienced animation/VFX roles potentially moving higher.",
  },
  "tg-ai-for-games": {
    programPhilosophy:
      "This is not positioned as a course where AI automatically creates an entire game. Students learn how AI can assist developers, designers and artists, alongside real game-AI systems such as NPC behaviour, decision-making and pathfinding. It works best as an advanced specialization layered on top of game development knowledge.",
    learningOutcomes: [
      "Game AI fundamentals",
      "NPC behaviour & state machines",
      "Pathfinding & decision-making",
      "Procedural systems",
      "Generative AI for ideation & coding assistance",
      "AI-assisted asset & development workflows",
    ],
    curriculum: [
      gdModule("Game AI Systems", ["Game AI Fundamentals", "NPC Behaviour", "Enemy AI", "State Machines", "Pathfinding", "Decision Systems", "Procedural Content"]),
      gdModule("Generative AI", ["Generative AI Fundamentals", "AI-Assisted Programming", "AI-Assisted Game Design", "AI Dialogue", "AI-Assisted Asset Workflows"]),
      gdModule("Applied & Responsible AI", ["AI-powered Gameplay", "Responsible AI Workflows"]),
      gdModule("Final Project", ["An AI-driven gameplay system, such as intelligent NPCs, adaptive enemies or an AI-assisted game feature"]),
    ],
    includes: [{ label: "An AI-driven gameplay system", icon: "projects" }],
    careerDirections: [
      "Game AI Developer",
      "AI Gameplay Programmer",
      "Technical Game Developer",
      "Technical Designer",
      "Tools Developer",
      "Procedural Content Developer",
      "AI-Assisted Game Developer",
      "Junior Game Programmer",
    ],
    salaryNote:
      "Because these are specialized roles, compensation varies considerably and there isn't enough reliable course-level data to quote a specific range. Compensation can exceed general entry-level game-development roles as experience and technical depth increase.",
  },
};

export const COURSE_DETAILS: CourseDetail[] = ALL_OFFERINGS.map((o) => {
  const ov = OVERRIDES[o.slug] ?? {};
  const tools = o.tools ?? [];
  const curriculum = ov.curriculum ?? [];
  const includes: CourseDetail["includes"] = [
    ...(o.duration ? [{ label: `${o.duration} of learning`, icon: "clock" as const }] : []),
    ...(o.mode ? [{ label: o.mode, icon: "mode" as const }] : []),
    ...(o.location ? [{ label: o.location, icon: "place" as const }] : []),
    ...(ov.includes ?? []),
  ];
  const longDescription = [
    ...(ov.programPhilosophy ? [ov.programPhilosophy] : []),
    o.description,
    ...(curriculum.length ? [`The curriculum covers ${curriculum.map((m) => m.title).join(", ")}.`] : []),
    ...(tools.length ? [`Tools and software: ${tools.join(", ")}.`] : []),
    ...(ov.finalReadiness ? [ov.finalReadiness] : []),
  ];
  return {
    slug: o.slug,
    title: o.title,
    category: o.category,
    subtitle: o.subtitle,
    description: o.description,
    heroImage: o.image.src,
    heroAlt: o.image.alt,
    duration: o.duration,
    learningMode: o.mode,
    location: o.location,
    learningOutcomes: [],
    topics: o.tags,
    curriculum,
    requirements: [],
    reviews: [],
    longDescription,
    ...ov,
    includes,
  };
});

export const getCourseDetail = (slug: string) => COURSE_DETAILS.find((c) => c.slug === slug);

/** Related programs: the ones named on the course, else the others in the same category. */
export function relatedOf(course: CourseDetail): CourseDetail[] {
  const named = course.relatedCourses?.map((s) => getCourseDetail(s)).filter((c): c is CourseDetail => Boolean(c));
  if (named?.length) return named;
  return COURSE_DETAILS.filter((c) => c.slug !== course.slug && c.category === course.category).slice(0, 3);
}
