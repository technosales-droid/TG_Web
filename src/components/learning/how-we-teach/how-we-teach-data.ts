// Content for /learning/how-we-teach. Program-agnostic: no program, course or tool names in the
// teaching content, no grading systems, scores, counts or client/placement claims.

export const HERO_STEPS = ["Understand", "Practise", "Apply", "Build", "Refine", "Present"];

export const TEACHING_MODEL: { number: string; title: string; description: string }[] = [
  { number: "01", title: "Understand", description: "Learn the concepts, principles and foundations behind the skill." },
  {
    number: "02",
    title: "Demonstrate",
    description: "See how the concept is applied through examples, explanation and guided instruction.",
  },
  {
    number: "03",
    title: "Practise",
    description: "Try the skill through exercises and increasingly practical tasks.",
  },
  {
    number: "04",
    title: "Build",
    description: "Combine what you have learned into a project or meaningful piece of work.",
  },
  {
    number: "05",
    title: "Refine",
    description: "Review the result, identify what can improve and apply feedback.",
  },
];

// `guided` is the share of the bar drawn as guidance; the rest is student-led. Visual only, never a
// label or a claim. Guidance never reaches zero: support stays available at every stage.
export const INDEPENDENCE_STAGES: { number: string; title: string; description: string; guided: number }[] = [
  {
    number: "01",
    title: "Guided Learning",
    description: "Instructor-led explanations, demonstrations and structured examples.",
    guided: 85,
  },
  {
    number: "02",
    title: "Supported Practice",
    description: "Students work through exercises while receiving direction and clarification.",
    guided: 60,
  },
  {
    number: "03",
    title: "Independent Application",
    description: "Students make more decisions about how to approach the task and solve problems.",
    guided: 35,
  },
  {
    number: "04",
    title: "Project Ownership",
    description: "Students plan, create, refine and present their own work.",
    guided: 15,
  },
];

export const FEEDBACK_LOOP = ["Build", "Review", "Feedback", "Improve", "Build Again"];

export const FEEDBACK_AREAS = [
  "Clarity",
  "Execution",
  "Technical decisions",
  "Creative decisions",
  "Problem solving",
  "Presentation",
];

export const PROJECT_LIFECYCLE = ["Idea", "Plan", "Create", "Test", "Refine", "Present"];

export const PROJECT_PRINCIPLES: { number: string; title: string; description: string }[] = [
  {
    number: "01",
    title: "Apply Multiple Skills",
    description: "Combine concepts rather than practising them in isolation.",
  },
  {
    number: "02",
    title: "Solve Problems",
    description: "Make decisions, test approaches and work through challenges.",
  },
  {
    number: "03",
    title: "Document the Work",
    description: "Keep evidence of the process, decisions and outcome.",
  },
  {
    number: "04",
    title: "Present the Result",
    description: "Turn completed work into something clear and understandable.",
  },
];

export const INSTRUCTOR_ROLES: { title: string; description: string }[] = [
  { title: "Explain", description: "Clarify the concepts and demonstrate the process." },
  { title: "Guide", description: "Help students understand how to approach a problem." },
  { title: "Review", description: "Provide feedback on work and identify areas for improvement." },
  { title: "Challenge", description: "Encourage students to think further and apply what they know." },
];

export const PASSIVE_STEPS = ["Watch", "Read", "Memorise", "Move on"];
export const PRACTICAL_STEPS = ["Understand", "Try", "Build", "Review", "Improve", "Present"];

// Program links only. The teaching model applies to each; their content stays on their own pages.
export const PROGRAM_LINKS: { title: string; description: string; href: string }[] = [
  {
    title: "Digital Marketing Professional Program",
    description:
      "Complete practical digital marketing learning program covering strategy, content, SEO, advertising, analytics and AI.",
    href: "/programs/tg-digital-marketing",
  },
  {
    title: "Game Development & Design",
    description:
      "A practical learning pathway covering game development, design, art, animation and emerging game technologies.",
    href: "/programs/tg-gameforge",
  },
];
