// The public origin, used for canonical URLs, Open Graph, the sitemap and structured data.
// NEXT_PUBLIC_SITE_URL, when actually injected at build time, overrides everything below -- but GoDaddy's Node.js
// Hosting Publish build has been observed not to carry a PUBLISH-variant secret through to the `next build` step
// (confirmed live: sitemap.xml still showed the localhost fallback after the secret was correctly set and
// re-published). So the fallback chain is: Vercel's own production domain if present; otherwise the real domain
// for any other production run (GoDaddy's `npm start`, or a local "simulate production" test with the same
// NODE_ENV); otherwise localhost, which only applies to `npm run dev` and keeps local day-to-day work unaffected.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined;
const fallback = process.env.NODE_ENV === "production" && !process.env.VERCEL ? "https://technogurukul.com" : "http://localhost:3000";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? fromVercel ?? fallback).replace(/\/$/, "");
export const SITE_NAME = "Techno Gurukul";
/** True only for the real production deployment: previews and local builds must not be indexed. */
export const IS_PRODUCTION_DEPLOY = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
