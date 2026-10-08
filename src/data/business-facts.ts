// Single source for every real-world business fact used in structured data, program key-facts tables and FAQ
// content. "Known" fields are drawn from the codebase's own existing verified sources (footer-data.ts, the
// course catalogue). Unknown fields are left `null` on purpose -- fill one in here, once, and every consumer
// (JSON-LD, the program pages' key-facts table, the FAQ) picks up the new value automatically. Never invent a
// value for an unknown field anywhere else in the codebase; render nothing for it instead.
import { SITE_URL } from "@/lib/site";
import { DM_PROGRAM_SLUG, GD_PROGRAM_SLUG } from "@/lib/program-routes";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const BUSINESS = {
  name: "Techno Gurukul",
  alternateName: ["TechnoGurukul", "Techno Gurukul Nashik"],
  telephone: "+91 73871 52953",
  address: {
    streetAddress: "Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Police Staff Colony",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    postalCode: "422002",
    addressCountry: "IN",
  },
  // The team's own Google Maps share link; resolves to "XQXG+VJ2 Platinum Plaza, Tilak Wadi, Nashik" (see
  // footer-data.ts). Used as hasMap rather than a geo coordinate, since no lat/long has been confirmed yet.
  hasMap: "https://maps.app.goo.gl/HhqURkxhHpr5fCt29",
  areaServed: "Nashik",
  // Canonical profile URLs. The Facebook and Pinterest footer links are share/short links that redirect here;
  // resolved by following the actual HTTP redirect chain (see Phase 2 report), not guessed.
  sameAs: [
    "https://www.instagram.com/_technogurukul_/",
    "https://www.facebook.com/people/TechnoGurukul/61594398658521/",
    "https://www.linkedin.com/company/technogurukul",
    "https://www.youtube.com/@techno_gurukul",
    "https://wa.me/917387152953",
    "https://www.threads.com/@_technogurukul_",
    "https://www.pinterest.com/Techno_Gurukul/",
  ],

  /** The one real, already-used contact address. Every consumer (footer, legal pages, forms, Organization and
   * ContactPage schema) reads it from here now, instead of each holding its own copy. */
  email: "admission@technogurukul.com",

  // --- UNKNOWN. Fill in when available; every consumer already handles `null` by omitting the field/section. ---
  geo: null as { latitude: number; longitude: number } | null,
  openingHoursSpecification: null as { dayOfWeek: string[]; opens: string; closes: string }[] | null,
  foundingDate: null as string | null,
  founder: null as { name: string; url?: string } | null,
} as const;

export interface ProgramFacts {
  /** Human-readable, e.g. "3–3.5 months". Null when not yet confirmed (see Phase 1B: a prior "30 months" figure
   * for Game Development was removed as an unverified leftover, not replaced with a guess). */
  duration: string | null;
  /** ISO 8601 duration for Course.hasCourseInstance.courseWorkload, only set when `duration` is a single
   * confirmed figure a schema consumer can safely parse -- a range like "3-3.5 months" cannot become one ISO
   * value without picking a side, so this is set deliberately per program rather than derived automatically. */
  durationIso: string | null;
  mode: string;
  location: string;
  moduleCount: number;
  topicCount: number;
  /** The single canonical phrase for "what you'll build", lowercase/mid-sentence form (e.g. "5 projects", "up to
   * 4 live project tracks"). Every consumer -- the answer summary, the key-facts table, the FAQ answer and
   * llms.txt -- reads this same field, so the wording can't drift between them. Capitalise it yourself where a
   * sentence or table cell needs it capitalised; the stored value never is. */
  projectsLabel: string;
  learningSplit?: { practical: number; strategy: number; tools: number };
  learningTracks?: string[];
  // UNKNOWN for both programs -- fill in when available.
  fee: string | null;
  nextBatch: string | null;
  timings: string | null;
  eligibility: string | null;
  certificate: string | null;
  demoClassAvailable: boolean | null;
  emi: string | null;
}

export const PROGRAM_FACTS: Record<string, ProgramFacts> = {
  [DM_PROGRAM_SLUG]: {
    duration: "3–3.5 months",
    durationIso: "P3M",
    mode: "Offline / In-Person",
    location: "Nashik, Maharashtra",
    moduleCount: 18,
    topicCount: 205,
    // The curriculum's capstone/project selection is "as per the candidate and the situation" (see
    // course-sections.tsx's Live Projects & Capstone note) -- not a fixed guarantee of 4, hence "up to".
    projectsLabel: "up to 4 live project tracks",
    learningSplit: { practical: 60, strategy: 25, tools: 15 },
    fee: null,
    nextBatch: null,
    timings: null,
    eligibility: null,
    certificate: null,
    demoClassAvailable: null,
    emi: null,
  },
  [GD_PROGRAM_SLUG]: {
    duration: null,
    durationIso: null,
    mode: "Offline / In-Person",
    location: "Nashik, Maharashtra",
    moduleCount: 7,
    topicCount: 66,
    projectsLabel: "5 projects",
    learningTracks: ["Unity", "Unreal Engine"],
    fee: null,
    nextBatch: null,
    timings: null,
    eligibility: null,
    certificate: null,
    demoClassAvailable: null,
    emi: null,
  },
};
