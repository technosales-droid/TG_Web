// Course detail content for /programs/[slug]. ONE template renders every course from a record here.
//
// Adding a course = adding it to the catalogue (course-catalogue.ts / programs.ts) and, when there is more to say,
// an entry in OVERRIDES below. No component or page changes.
//
// Where the base facts come from: every course starts from its catalogue offering (title, description, duration,
// mode, tools, topics, image), so the two never disagree. OVERRIDES only adds what the repository's source documents
// actually state (Digital Marketing "What You Take Away", audiences, career directions and its 18 curriculum modules;
// each game course's description restated as outcomes). Anything the sources do not state is left EMPTY, and the page
// shows a plain "will be added" placeholder for it. Nothing here is a rating, price, salary, placement figure, review,
// partner, certificate or claim about students.
import { DIGITAL_MARKETING_CURRICULUM } from "./course-catalogue";
import { ALL_OFFERINGS } from "./programs";

export interface CourseLesson {
  title: string;
  duration?: string;
  description?: string;
  preview?: boolean;
}
export interface CourseModule {
  title: string;
  /** Shown under the title. Used when the individual lessons are not written yet. */
  summary?: string;
  duration?: string;
  lessons: CourseLesson[];
}
export interface CourseDetail {
  slug: string;
  title: string;
  category: string;
  subtitle?: string;
  description: string;
  /** Preview image path, or null for a gradient placeholder. */
  heroImage: string | null;
  heroAlt: string;
  previewVideo?: string;
  credibility: string;
  /** Facts for the hero and snapshot. Any left undefined is simply not shown. */
  level?: string;
  duration?: string;
  projectCount?: number;
  certificate?: boolean;
  learningMode?: string;
  location?: string;
  /** A short line under the hero buttons, only when the source states it (e.g. batch size). */
  note?: string;
  learningOutcomes: string[];
  skills: { group: string; items: string[] }[];
  tools: { name: string; category?: string }[];
  projects: { title: string; description: string; skills?: string[]; category?: string; image?: string }[];
  curriculum: CourseModule[];
  learningMethod: { title: string; text: string }[];
  requirements: string[];
  audience: { title: string; text: string }[];
  careerPaths: { title: string; text?: string }[];
  /** Ordered stages of a progression, e.g. Learner -> Junior -> Specialist. Empty until it is known. */
  careerProgression: string[];
  /** Slug of a record in FACULTY (data/institute.ts). Unset shows an "instructor to be announced" card. */
  instructor?: { facultySlug: string };
  studentProjects: { title: string; image?: string; caption?: string }[];
  faqs: { question: string; answer: string }[];
}

// The institute's general method: how every course is taught, not a claim about one course.
const DEFAULT_METHOD = [
  { title: "Learn", text: "Understand the concepts and the reasons behind them." },
  { title: "Practise", text: "Strengthen skills through guided exercises." },
  { title: "Build", text: "Apply what you know in practical work." },
  { title: "Review", text: "Look at the result and get feedback on it." },
  { title: "Improve", text: "Refine the work and carry the lessons forward." },
];

type Override = Partial<Omit<CourseDetail, "slug" | "title" | "category" | "description">>;

const OVERRIDES: Record<string, Override> = {
  "tg-digital-marketing": {
    note: "Batch size is limited.",
    learningOutcomes: [
      "Practical campaign experience",
      "Portfolio-worthy projects",
      "Industry-relevant digital marketing skills",
      "Exposure to professional tools",
      "A better understanding of client requirements",
      "Career and freelancing knowledge",
    ],
    projects: [
      { title: "Campaign Projects", description: "Practical campaign projects that build portfolio-worthy work.", category: "Marketing" },
    ],
    curriculum: DIGITAL_MARKETING_CURRICULUM.map((m) => ({ title: m.title, summary: m.description, lessons: [] })),
    learningMethod: [
      { title: "Learn", text: "The concepts, strategy and tools marketers use every day." },
      { title: "Apply", text: "Use the tools, build campaigns, analyse outcomes and solve problems." },
      { title: "Create", text: "Produce content, campaign work and projects that demonstrate your skills." },
      { title: "Refine", text: "Learn from what happens next, then get better at it." },
    ],
    audience: [
      { title: "Students & Graduates", text: "Move beyond classroom knowledge to practical campaign experience and portfolio-worthy projects." },
      { title: "Working Professionals", text: "Add industry-relevant digital marketing skills through practical, hands-on work." },
      { title: "Career Switchers", text: "Build the skill first, then decide where you want to take it." },
      { title: "Aspiring Freelancers", text: "Learn how to find clients, understand requirements, pitch services, execute campaigns and report results." },
      { title: "Business Owners", text: "Use digital marketing to build awareness, generate leads, acquire customers and measure performance." },
    ],
    careerPaths: [
      { title: "Get Hired", text: "Build the skills and portfolio needed to enter the digital marketing industry." },
      { title: "Go Freelance", text: "Learn how to find clients, understand their requirements and deliver marketing services." },
      { title: "Build Your Business", text: "Use digital marketing to attract customers, build your brand and grow your business." },
    ],
  },
  "tg-gameforge": {
    learningOutcomes: [
      "Conceive and design a game",
      "Program game systems",
      "Illustrate and animate game content",
      "Test and publish a game",
      "Work up from small exercises to a capstone game project",
    ],
    projects: [{ title: "Capstone game project", description: "A capstone game project that brings the whole course together." }],
  },
  "tg-unity-studio": {
    learningOutcomes: ["Build games with Unity and C#", "Program gameplay and physics", "Create game UI and animation", "Add game AI", "Optimise and deploy a game"],
  },
  "tg-unreal-studio": {
    learningOutcomes: ["Build high-quality interactive experiences with Unreal Engine", "Combine Blueprints and C++"],
  },
  "tg-gameart-studio": {
    learningOutcomes: ["Create characters, environments, props and interfaces for games", "Work through 2D and 3D game-art workflows"],
  },
  "tg-gamedesign-studio": {
    learningOutcomes: ["Design game mechanics", "Design levels", "Plan progression, challenges and rewards", "Turn ideas into structured game experiences"],
  },
  "tg-game-animation-vfx": {
    learningOutcomes: ["Animate characters and game content", "Create VFX and particles", "Work with shaders and lighting", "Produce cinematics"],
  },
  "tg-ai-for-games": {
    learningOutcomes: ["Program game AI such as NPC behaviour, state machines and pathfinding", "Use AI-assisted development workflows"],
  },
};

function buildFaqs(d: { duration?: string; learningMode?: string; location?: string; tools: { name: string }[] }) {
  const faqs: { question: string; answer: string }[] = [];
  if (d.duration) faqs.push({ question: "How long is the course?", answer: d.duration });
  if (d.learningMode) faqs.push({ question: "How is it taught?", answer: [d.learningMode, d.location].filter(Boolean).join(", ") });
  if (d.tools.length) faqs.push({ question: "What software does it cover?", answer: d.tools.map((t) => t.name).join(", ") });
  faqs.push({ question: "How can I find out more?", answer: "Use the Enquire Now button to contact Techno Gurukul and ask about this course." });
  return faqs;
}

export const COURSE_DETAILS: CourseDetail[] = ALL_OFFERINGS.map((o) => {
  const ov = OVERRIDES[o.slug] ?? {};
  const tools = (o.tools ?? []).map((name) => ({ name }));
  const base = {
    duration: o.duration,
    learningMode: o.mode,
    location: o.location,
  };
  return {
    slug: o.slug,
    title: o.title,
    category: o.category,
    subtitle: o.subtitle,
    description: o.description,
    heroImage: o.image.src,
    heroAlt: o.image.alt,
    credibility: "Practical learning · Guided projects",
    ...base,
    learningOutcomes: [],
    skills: o.tags.length ? [{ group: "Topics", items: o.tags }] : [],
    tools,
    projects: [],
    curriculum: [],
    learningMethod: DEFAULT_METHOD,
    requirements: [],
    audience: [],
    careerPaths: [],
    careerProgression: [],
    studentProjects: [],
    faqs: buildFaqs({ ...base, tools }),
    ...ov,
  };
});

export const getCourseDetail = (slug: string) => COURSE_DETAILS.find((c) => c.slug === slug);
