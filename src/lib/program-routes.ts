// Single source for the two live programs' routes. A future slug change is a one-line edit here; every other
// file imports from this one instead of hardcoding "/programs/...". The slug migrated once already (Phase 3 of
// the SEO plan, tg-digital-marketing/tg-gameforge -> these keyword-bearing slugs) -- the old paths now only
// exist as permanent redirects in next.config.ts.
export const DM_PROGRAM_SLUG = "digital-marketing-course-nashik";
export const GD_PROGRAM_SLUG = "game-development-course-nashik";
export const DM_PROGRAM_HREF = `/programs/${DM_PROGRAM_SLUG}`;
export const GD_PROGRAM_HREF = `/programs/${GD_PROGRAM_SLUG}`;
