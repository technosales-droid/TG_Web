import {
  BookOpen,
  FileText,
  FolderKanban,
  Layers,
  Presentation,
  RefreshCw,
  Target,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Generic curriculum content for /learning/curriculum. Program-agnostic on purpose: no program, course
// or tool names, and no counts of classes, hours, projects or certificates. Program-specific
// curriculum lives on the individual program pages.

export const STRUCTURE_STAGES: { number: string; icon: LucideIcon; title: string; description: string }[] = [
  {
    number: "01",
    icon: BookOpen,
    title: "Fundamentals",
    description: "Build the concepts, terminology and core understanding needed for a discipline.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Practice",
    description: "Apply concepts through guided exercises and practical activities.",
  },
  {
    number: "03",
    icon: FolderKanban,
    title: "Projects",
    description: "Combine skills to create larger pieces of practical work.",
  },
  {
    number: "04",
    icon: Presentation,
    title: "Portfolio",
    description: "Refine completed work into something that can be documented, presented and improved.",
  },
];

export const LEARNING_AREAS: { number: string; icon: LucideIcon; title: string; description: string }[] = [
  {
    number: "01",
    icon: BookOpen,
    title: "Concepts & Foundations",
    description: "Understanding the principles and terminology behind a subject.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Tools & Techniques",
    description: "Learning how commonly used tools and workflows support practical work.",
  },
  {
    number: "03",
    icon: Target,
    title: "Applied Practice",
    description: "Using concepts and techniques through guided exercises.",
  },
  {
    number: "04",
    icon: Layers,
    title: "Project Work",
    description: "Combining multiple skills into practical projects.",
  },
  {
    number: "05",
    icon: RefreshCw,
    title: "Review & Refinement",
    description: "Testing, reviewing and improving completed work.",
  },
  {
    number: "06",
    icon: FileText,
    title: "Documentation & Presentation",
    description: "Organising work so the learning process and final result can be shown clearly.",
  },
];

// Four layers of a curriculum map; the items are the things a curriculum can contain.
export const CONTENT_LAYERS: { title: string; items: string[] }[] = [
  { title: "Understand", items: ["Concepts"] },
  { title: "Practise", items: ["Practical exercises", "Guided tasks"] },
  { title: "Create", items: ["Project briefs", "Experimentation"] },
  { title: "Improve & Present", items: ["Review", "Documentation", "Portfolio work"] },
];

export const PROGRESSION_STEPS: { title: string; description: string }[] = [
  { title: "Understand", description: "Learn the core ideas before moving on." },
  { title: "Practice", description: "Try the ideas in small, guided exercises." },
  { title: "Apply", description: "Use what you know on a specific task." },
  { title: "Build", description: "Combine skills into a larger piece of work." },
  { title: "Refine", description: "Review your work and improve it." },
  { title: "Present", description: "Document and share what you created." },
];

// Bridges to the program pages. These are PROGRAM links, not courses or curriculum modules.
export const PROGRAM_LINKS: { title: string; description: string; href: string; cta: string }[] = [
  {
    title: "Digital Marketing Professional Program",
    description:
      "Complete practical digital marketing learning program covering strategy, content, SEO, advertising, analytics and AI.",
    href: "/programs/tg-digital-marketing",
    cta: "Explore the Program",
  },
  {
    title: "Game Development & Design",
    description:
      "A practical learning pathway covering game development, design, art, animation and emerging game technologies.",
    href: "/programs/tg-gameforge",
    cta: "Explore the Program",
  },
];
