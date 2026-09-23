// The site's currently enrollable programs, with the real routes, imagery and copy also used
// in the homepage programs marquee and the Programs page hero. Single source of truth so both
// stay in sync — do not duplicate this list elsewhere.
//
// `video` is optional: the Programs page hero plays it (muted, looped, 16:9 source expected) in
// place of `image` when set. No real per-program video footage exists in the project yet, so it
// is left unset here rather than filled with an unrelated stock clip — add a real 16:9 .mp4 under
// public/brand/ and set the path here once one exists for a program.
export const ACTIVE_PROGRAMS = [
  {
    category: "Digital & Marketing",
    title: "Digital Marketing",
    description:
      "Build practical skills across digital marketing, content, campaigns, audience understanding and measurable digital work.",
    outcome: "Learn. Execute. Measure. Grow.",
    href: "/programs/tg-digital-marketing",
    image: "/brand/programs-digital-marketing.jpg",
    video: null as string | null,
    alt: "A laptop showing a digital marketing strategy breakdown beside matching handwritten notes",
  },
  {
    category: "Creative Technology",
    title: "Game Development & Design",
    description:
      "Learn the foundations of game creation through design, development, interactive systems and hands-on project work.",
    outcome: "Design. Build. Play.",
    href: "/programs/tg-gameforge",
    image: "/brand/programs-game-development.jpg",
    video: null as string | null,
    alt: "A person editing a game scene across multiple monitors in a production studio",
  },
] as const;
