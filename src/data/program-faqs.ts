// FAQ content per program: shown on the program page and in its FAQPage schema (so what the schema claims
// always matches what the page actually displays). Every fixed question below is answerable purely from facts
// already published elsewhere in this codebase (course-catalogue.ts, course-details.ts, business-facts.ts) --
// none of it is invented. The data-driven entries at the end of each list only appear once the matching field in
// business-facts.ts is filled in; until then they're simply absent, not shown with a placeholder answer.
import { PROGRAM_FACTS } from "./business-facts";
import { DM_PROGRAM_SLUG, GD_PROGRAM_SLUG } from "@/lib/program-routes";

export interface FaqItem {
  question: string;
  answer: string;
}

const dm = PROGRAM_FACTS[DM_PROGRAM_SLUG];
const gd = PROGRAM_FACTS[GD_PROGRAM_SLUG];

export const DM_FAQ: FaqItem[] = [
  {
    question: "Is the Digital Marketing course online or offline?",
    answer: "It's taught offline, in person, at Techno Gurukul's institute in Nashik, Maharashtra.",
  },
  {
    question: "How long is the Digital Marketing course?",
    answer: "The program runs for 3 to 3.5 months.",
  },
  {
    question: "Where is the course held?",
    answer: "At Techno Gurukul's Nashik institute, Office No. 305, Platinum Plaza, Tilak Wadi, Nashik, Maharashtra.",
  },
  {
    question: "What does the Digital Marketing curriculum cover?",
    answer:
      "18 modules covering 205 topics across strategy, content, SEO, social media, paid advertising (Meta Ads and Google Ads), analytics, AI-assisted marketing and an optional Agency Building module.",
  },
  {
    question: "What projects will I build?",
    answer:
      `You'll work through ${dm.projectsLabel}: a social media project (strategy through reporting), an SEO project (keyword research through Search Console), a paid ads project (Meta Ads and Google Ads through reporting), and a complete business project that combines a website, social media, SEO, paid ads and analytics into one campaign.`,
  },
  {
    question: "What roles can the Digital Marketing course prepare me for?",
    answer:
      "It's built around three readiness tracks: job-ready roles such as Digital Marketing Executive, Social Media Executive, SEO Executive or Performance Marketing Executive; freelance-ready skills to package and sell services like Meta Ads, Google Ads, SEO or content; and agency-ready skills covering niche selection, pricing, proposals, client onboarding and basic agency operations.",
  },
  {
    question: "What happens in the Agency Building module?",
    answer:
      "It's an optional module covering how to run a small digital marketing agency or freelance practice: the agency business model, choosing a niche, selecting and packaging services, pricing strategy, proposals and contracts, client onboarding, SOPs, managing a team or freelancers, client reporting, and scaling from freelancer to agency.",
  },
  ...(dm.fee ? [{ question: "What is the fee for the Digital Marketing course?", answer: dm.fee }] : []),
  ...(dm.emi ? [{ question: "Is EMI available for the Digital Marketing course?", answer: dm.emi }] : []),
  ...(dm.eligibility ? [{ question: "Who is eligible for the Digital Marketing course?", answer: dm.eligibility }] : []),
  ...(dm.certificate ? [{ question: "Do I get a certificate?", answer: dm.certificate }] : []),
  ...(dm.nextBatch ? [{ question: "When is the next batch?", answer: dm.nextBatch }] : []),
  ...(dm.timings ? [{ question: "What are the class timings?", answer: dm.timings }] : []),
  ...(dm.demoClassAvailable !== null
    ? [{ question: "Is a demo class available?", answer: dm.demoClassAvailable ? "Yes, a demo class is available -- contact us to arrange one." : "A demo class is not currently offered for this program." }]
    : []),
];

export const GD_FAQ: FaqItem[] = [
  {
    question: "Is the Game Development course online or offline?",
    answer: "It's taught offline, in person, at Techno Gurukul's institute in Nashik, Maharashtra.",
  },
  {
    question: "Unity or Unreal -- which path should I take?",
    answer:
      "The program covers both. There's a Unity path, suited to fast iteration, cross-platform builds and C# scripting, and an Unreal path, suited to cinematic-quality visuals and C++ systems. You work with both engines through the curriculum and can go deeper on whichever fits the kind of games you want to build.",
  },
  {
    question: "What tools will I learn?",
    answer:
      "Unity and Unreal Engine for development; C# and C++ for programming, plus Unity Visual Scripting and Unreal Blueprint; Maya, Blender, Mudbox and ZBrush for 3D art; Adobe Photoshop, Illustrator and Animate for 2D art; After Effects, DaVinci Resolve and PFTrack for post-production and VFX; and GitHub for version control and team collaboration.",
  },
  {
    question: "What projects will I build?",
    answer:
      `You'll work through ${gd.projectsLabel} across the program: a game concept and artwork project, a 2D game project, a 3D game project, a gameplay and programming project, and an advanced project covering scalable game structure, team workflow, optimisation and testing.`,
  },
  {
    question: "What career directions can the Game Development course support?",
    answer:
      "Potential directions include Game Designer, Game Developer, Unity Developer, Unreal Developer, Gameplay Programmer, Game Artist (2D or 3D), Game UI/UX Designer, Technical Artist, Game Animator, VFX Artist, Level Designer and Game QA/Testing. This reflects the portfolio and skills the program builds, not a placement or job guarantee.",
  },
  ...(gd.duration ? [{ question: "How long is the Game Development course?", answer: gd.duration }] : []),
  ...(gd.fee ? [{ question: "What is the fee for the Game Development course?", answer: gd.fee }] : []),
  ...(gd.emi ? [{ question: "Is EMI available for the Game Development course?", answer: gd.emi }] : []),
  ...(gd.eligibility ? [{ question: "Who is eligible for the Game Development course?", answer: gd.eligibility }] : []),
  ...(gd.certificate ? [{ question: "Do I get a certificate?", answer: gd.certificate }] : []),
  ...(gd.nextBatch ? [{ question: "When is the next batch?", answer: gd.nextBatch }] : []),
  ...(gd.timings ? [{ question: "What are the class timings?", answer: gd.timings }] : []),
  ...(gd.demoClassAvailable !== null
    ? [{ question: "Is a demo class available?", answer: gd.demoClassAvailable ? "Yes, a demo class is available -- contact us to arrange one." : "A demo class is not currently offered for this program." }]
    : []),
];

export const PROGRAM_FAQS: Record<string, FaqItem[]> = {
  [DM_PROGRAM_SLUG]: DM_FAQ,
  [GD_PROGRAM_SLUG]: GD_FAQ,
};
