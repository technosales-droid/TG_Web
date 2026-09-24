// DEMO CONTENT: no verified student testimonials have been supplied yet.
// Every name, quote and rating below is made up purely to preview the carousel and must be
// replaced with real, approved testimonials (quote, name, role, program, rating, avatar) before
// this goes live in production. The rendering component reads this data as-is, so swapping in
// real entries, or wiring this up to an admin panel later, needs no component changes.
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  program: string;
  /** 1–5. Rendered as stars. */
  rating: number;
  /** Path to a real photo, once supplied. `null` falls back to initials. */
  avatar: string | null;
}

const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: "demo-1",
    quote: "The hands-on sessions made every topic click. I stopped memorising and started actually building campaigns.",
    name: "Aarav Sharma",
    role: "Program Student",
    program: "Digital Marketing",
    rating: 5,
    avatar: null,
  },
  {
    id: "demo-2",
    quote: "Working on real game projects from the first month made the difference. Mentors were always ready to help.",
    name: "Priya Deshmukh",
    role: "Program Student",
    program: "Game Development",
    rating: 5,
    avatar: null,
  },
  {
    id: "demo-3",
    quote: "I learned how to think about player experience, not just mechanics. It changed how I design levels.",
    name: "Rohan Patil",
    role: "Program Student",
    program: "Game Design",
    rating: 5,
    avatar: null,
  },
  {
    id: "demo-4",
    quote: "Clear structure, practical assignments and friendly faculty. I finished with a portfolio I'm proud to share.",
    name: "Sneha Kulkarni",
    role: "Program Student",
    program: "Digital Marketing",
    rating: 5,
    avatar: null,
  },
  {
    id: "demo-5",
    quote: "Learning Unity alongside classmates who were building their own games kept me motivated every single week.",
    name: "Kabir Joshi",
    role: "Program Student",
    program: "Game Development",
    rating: 4,
    avatar: null,
  },
];

// Made-up quotes and ratings are shown in development only, so they can never appear on the live site.
export const TESTIMONIALS: Testimonial[] = process.env.NODE_ENV === "production" ? [] : DEMO_TESTIMONIALS;
