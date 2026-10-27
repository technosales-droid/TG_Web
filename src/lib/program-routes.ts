// Single source for the live programs' routes. A future slug change is a one-line edit here; every other
// file imports from this one instead of hardcoding "/programs/...". The DM/GD slugs migrated once already
// (Phase 3 of the SEO plan, tg-digital-marketing/tg-gameforge -> these keyword-bearing slugs) -- the old paths
// now only exist as permanent redirects in next.config.ts.
export const DM_PROGRAM_SLUG = "digital-marketing-course-nashik";
export const GD_PROGRAM_SLUG = "game-development-course-nashik";
export const AI_PROGRAM_SLUG = "ai-course-nashik";
export const DM_PROGRAM_HREF = `/programs/${DM_PROGRAM_SLUG}`;
export const GD_PROGRAM_HREF = `/programs/${GD_PROGRAM_SLUG}`;
export const AI_PROGRAM_HREF = `/programs/${AI_PROGRAM_SLUG}`;
