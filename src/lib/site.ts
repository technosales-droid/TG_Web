// The public origin, used for canonical URLs, Open Graph, the sitemap and structured data.
// Set NEXT_PUBLIC_SITE_URL to the real domain in production (e.g. https://www.example.com, no trailing slash).
// On Vercel it falls back to the project's production domain; locally to http://localhost:3000.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? fromVercel ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "Techno Gurukul";
/** True only for the real production deployment: previews and local builds must not be indexed. */
export const IS_PRODUCTION_DEPLOY = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
