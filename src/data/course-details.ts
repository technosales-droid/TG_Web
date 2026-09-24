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

export interface CourseLesson {
  title: string;
  duration?: string;
  preview?: boolean;
}
export interface CourseModule {
  title: string;
  /** Shown when the individual lessons are not written yet. */
  summary?: string;
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
  learningOutcomes: string[];
  topics: string[];
  includes: { label: string; icon: IncludeIcon }[];
  curriculum: CourseModule[];
  requirements: string[];
  /** Paragraphs of the long description. */
  longDescription: string[];
  /** Slugs. Unset uses other courses in the same category. */
  relatedCourses?: string[];
  reviews: CourseReview[];
}

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
    curriculum: DIGITAL_MARKETING_CURRICULUM.map((m) => ({ title: m.title, summary: m.description, lessons: [] })),
    includes: [
      { label: "Campaign projects that build portfolio-worthy work", icon: "portfolio" },
      { label: "Exposure to professional tools", icon: "tools" },
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
    includes: [{ label: "A capstone game project", icon: "projects" }],
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
    o.description,
    ...(curriculum.length ? [`The curriculum covers ${curriculum.map((m) => m.title).join(", ")}.`] : []),
    ...(tools.length ? [`Tools and software: ${tools.join(", ")}.`] : []),
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
