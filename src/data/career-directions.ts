// Career Paths, Section 2: career areas -> directions -> roles / skills / proof.
// Only CURRENT learning areas belong here (Digital Marketing, Game Development & Design). Future
// industries live in the programs roadmap and must not be added here.
//
// Source: Digital Marketing directions come from the Techno Gurukul Web copy (Career Paths page).
// Game Development directions come from the Game Development & Design programs document (career
// role directions across programming, design, art, technical art, animation and production).
// Roles are "roles to explore", never promised outcomes. No salaries, placement numbers or employers.

export type CareerIcon =
  | "briefcase"
  | "laptop"
  | "rocket"
  | "code"
  | "lightbulb"
  | "cube"
  | "clapperboard"
  | "cpu"
  | "clipboard-check";

export interface CareerDirection {
  slug: string;
  icon: CareerIcon;
  title: string;
  description?: string;
  /** An extra source-backed list, e.g. how freelance work progresses. */
  highlight?: { label: string; items: string[]; ordered?: boolean };
  /** Roles to explore. Omitted when the source names none. */
  roles?: string[];
  skills: string[];
  /** Proof / portfolio examples that help show the skills. */
  proof: string[];
}

export interface CareerArea {
  slug: string;
  /** Matches the learning area name used elsewhere on the site. */
  name: string;
  eyebrow: string;
  description: string;
  tone: "blue" | "green";
  directions: CareerDirection[];
}

export const CAREER_AREAS: CareerArea[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    eyebrow: "Area 01",
    description:
      "Digital marketing is not a single job. It is a collection of skills that can lead to multiple career paths.",
    tone: "blue",
    directions: [
      {
        slug: "digital-marketing-professional",
        icon: "briefcase",
        title: "Digital Marketing Professional",
        description: "Work with brands and businesses across digital marketing functions.",
        roles: [
          "Digital Marketing Executive",
          "Digital Marketing Specialist",
          "Social Media Executive",
          "SEO Executive",
          "Performance Marketing Executive",
          "Content Marketer",
        ],
        skills: [
          "Digital strategy",
          "Consumer understanding",
          "Content",
          "Social media",
          "SEO",
          "Paid advertising",
          "Performance marketing",
          "Analytics",
        ],
        proof: [
          "Campaign work",
          "Content projects",
          "SEO projects",
          "Paid advertising exercises",
          "Analytics and reporting work",
          "Brand or marketing projects",
        ],
      },
      {
        slug: "freelancer",
        icon: "laptop",
        title: "Freelancer",
        description: "Turn your skills into independent services.",
        highlight: {
          label: "How the work progresses",
          ordered: true,
          items: [
            "Find potential clients",
            "Understand requirements",
            "Pitch services",
            "Execute campaigns",
            "Report results",
            "Build long-term relationships",
          ],
        },
        skills: [
          "Client communication",
          "Brief understanding",
          "Campaign execution",
          "Reporting",
          "Digital marketing execution",
          "Client acquisition",
        ],
        proof: [
          "Campaign portfolio",
          "Sample client brief",
          "Marketing proposal",
          "Reporting example",
          "Case-study style project",
        ],
      },
      {
        slug: "entrepreneur",
        icon: "rocket",
        title: "Entrepreneur",
        description: "If you own a business, digital marketing becomes a growth engine.",
        highlight: {
          label: "What it helps you do",
          items: [
            "Build awareness",
            "Generate leads",
            "Acquire customers",
            "Build communities",
            "Measure marketing performance",
          ],
        },
        skills: [
          "Marketing strategy",
          "Lead generation",
          "Content",
          "Advertising",
          "Analytics",
          "Customer acquisition",
        ],
        proof: [
          "Brand growth project",
          "Lead-generation campaign",
          "Marketing plan",
          "Campaign dashboard",
          "E-commerce or digital business project",
        ],
      },
    ],
  },
  {
    slug: "game-development-and-design",
    name: "Game Development & Design",
    eyebrow: "Area 02",
    description:
      "Game development can lead in many directions across programming, game design, art, technical art, animation and production.",
    tone: "green",
    directions: [
      {
        slug: "programming-and-development",
        icon: "code",
        title: "Programming & Development",
        roles: ["Game Developer", "Unity Developer", "Unreal Developer", "Gameplay Programmer", "Game Programmer"],
        skills: ["C#", "C++", "Unity", "Unreal Engine", "Gameplay systems", "Programming fundamentals"],
        proof: [
          "Playable prototypes",
          "Gameplay systems",
          "Completed game projects",
          "Engine-based projects",
          "Git / GitHub work",
        ],
      },
      {
        slug: "game-design",
        icon: "lightbulb",
        title: "Game Design",
        roles: ["Game Designer", "Level Designer", "Technical Designer"],
        skills: ["Game mechanics", "Level design", "Game systems", "Player experience", "Prototyping"],
        proof: [
          "Game design document",
          "Level prototype",
          "Gameplay prototype",
          "Mechanics prototype",
          "Playable level",
        ],
      },
      {
        slug: "art-and-3d",
        icon: "cube",
        title: "Art & 3D",
        roles: ["3D Game Artist", "Environment Artist", "Character Artist"],
        skills: [
          "2D / 3D fundamentals",
          "Blender",
          "Modelling",
          "Texturing",
          "Environment creation",
          "Character development",
        ],
        proof: ["Character models", "Environment assets", "Props", "Game-ready assets", "Art portfolio"],
      },
      {
        slug: "animation-and-vfx",
        icon: "clapperboard",
        title: "Animation & VFX",
        roles: ["Game Animator", "VFX Artist"],
        skills: ["Animation", "Rigging", "VFX", "Particles", "Lighting", "Cinematics"],
        proof: [
          "Animation reel",
          "VFX experiments",
          "Character animation",
          "Cinematic sequence",
          "Effects portfolio",
        ],
      },
      {
        slug: "technical-art",
        icon: "cpu",
        title: "Technical Art",
        roles: ["Technical Artist", "Technical Designer"],
        skills: [
          "Art and technology",
          "Shaders",
          "Materials",
          "Lighting",
          "Technical workflows",
          "Engine integration",
        ],
        proof: [
          "Shader work",
          "Technical art experiments",
          "Engine-ready assets",
          "Materials",
          "Technical prototypes",
        ],
      },
      {
        slug: "qa-and-production",
        icon: "clipboard-check",
        title: "QA & Production",
        roles: ["Game Tester", "QA Tester", "Junior Game Producer"],
        skills: [
          "Testing",
          "Debugging",
          "Profiling",
          "Version control",
          "Team workflows",
          "Production processes",
        ],
        proof: [
          "QA documentation",
          "Bug reports",
          "Testing workflows",
          "Production documentation",
          "Team project contribution",
        ],
      },
    ],
  },
];
