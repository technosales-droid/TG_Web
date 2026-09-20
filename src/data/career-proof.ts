// Career Paths, Section 3: what to build and show. Content only, no numbers, employers or promises.
// Projects are "real-world style" and "designed around practical workflows". The sources do not
// promise real client work, so nothing here may say or imply that.

export type ProofArea = "digital-marketing" | "game-development";

export const PROOF_AREAS: { id: ProofArea; label: string }[] = [
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "game-development", label: "Game Development" },
];

/** What the workspace board shows for each area: example projects, then process, proof and portfolio. */
export const PROOF_BOARDS: Record<
  ProofArea,
  { examples: string[]; process: string[]; proof: string[]; portfolio: string }
> = {
  "digital-marketing": {
    examples: ["Campaign Project", "SEO Audit", "Content Strategy", "Social Media Campaign", "Performance Report"],
    process: ["Research", "Plan", "Create", "Measure"],
    proof: ["Project summary", "Screenshots", "Results", "Reflection"],
    portfolio: "Ready to Present",
  },
  "game-development": {
    examples: [
      "Playable Prototype",
      "Gameplay System",
      "Level Prototype",
      "Game Design Document",
      "3D Asset / Environment",
      "Animation / VFX Reel",
    ],
    process: ["Design", "Build", "Test", "Refine"],
    proof: ["Project summary", "Gameplay capture", "Design notes", "Reflection"],
    portfolio: "Ready to Present",
  },
};

export type ProofIcon = "folder" | "presentation" | "file-text" | "refresh";

export interface ProofPrinciple {
  slug: string;
  icon: ProofIcon;
  title: string;
  description: string;
  /** Shared examples, or examples that depend on the selected area. */
  examples: string[] | Record<ProofArea, string[]>;
}

export const PROOF_PRINCIPLES: ProofPrinciple[] = [
  {
    slug: "projects",
    icon: "folder",
    title: "Projects",
    description: "Show that you can take an idea from concept to something tangible.",
    examples: {
      "digital-marketing": ["Campaign project", "SEO project", "Content campaign", "Analytics report"],
      "game-development": ["Playable prototype", "Gameplay system", "Completed game project", "Level prototype"],
    },
  },
  {
    slug: "portfolio",
    icon: "presentation",
    title: "Portfolio",
    description: "Turn your strongest work into something that can be presented clearly.",
    examples: ["Selected projects", "Project summaries", "Screenshots and media", "Your role", "Tools used", "Process", "Outcome"],
  },
  {
    slug: "documentation",
    icon: "file-text",
    title: "Documentation",
    description: "Show how you think, not only what the final result looks like.",
    examples: {
      "digital-marketing": ["Campaign brief", "Marketing strategy", "Project notes", "Reporting"],
      "game-development": ["Game design document", "Project notes", "QA documentation", "Reporting"],
    },
  },
  {
    slug: "practical-experience",
    icon: "refresh",
    title: "Practical Experience",
    description: "Demonstrate that you can work through real-world style constraints.",
    examples: ["Briefs", "Deadlines", "Iteration", "Feedback", "Testing", "Reporting", "Refinement"],
  },
];
