import type { NextConfig } from "next";

// Security headers. The CSP allows what the site actually uses: its own scripts, styles (Next inlines both), images,
// video and self-hosted fonts, plus the single Google Maps embed in the footer and contact page, YouTube (the
// hero's video card: a thumbnail image, and the player only once a visitor clicks play), and Google Analytics /
// Google Tag Manager (gtag.js, gtm.js and their collection endpoints) -- which themselves only ever load once a
// visitor allows analytics in their cookie preferences (src/components/analytics/). The GTM <noscript> fallback
// iframe (src/app/layout.tsx) is the one exception: it needs frame-src unconditionally, since it only matters to
// visitors with JS disabled, for whom that consent gate could never have run anyway. Applied to production builds
// only, because the dev server needs eval and websockets for hot reload.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src https://www.google.com https://www.youtube-nocookie.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Lets the dev server's HMR/fonts load when previewed through GoDaddy's Node hosting, which proxies the app
  // through a subdomain of its own rather than localhost. Harmless in production: this only affects next dev.
  allowedDevOrigins: ["*.preview.c40.airoapp.ai"],

  // Files behind the access gate live in /private-content (not /public) and are read by the file route.
  outputFileTracingIncludes: { "/api/content/**": ["./private-content/**"] },

  // The hero's video card thumbnail, once a real YouTube video id is set (src/components/home/hero-video-card.tsx).
  images: { remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }] },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [
      // The Mission, Why, Approach and Facilities & Faculty pages are folded into /about.
      ...["mission", "why-technogurukul", "approach", "facilities"].map((slug) => ({ source: `/about/${slug}`, destination: "/about", permanent: true })),
      // There is no dedicated faculty page or per-member pages.
      { source: "/faculty", destination: "/about", permanent: true },
      { source: "/faculty/:slug", destination: "/about", permanent: true },
      // The Privacy Policy and Terms moved out of /legal.
      { source: "/legal/privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/legal/terms-conditions", destination: "/terms", permanent: true },
      // Career Paths was retired and replaced by Blogs.
      { source: "/career-paths", destination: "/blogs", permanent: true },
      { source: "/career-paths/:slug", destination: "/blogs", permanent: true },
      // Program slugs migrated to keyword-bearing URLs (SEO Phase 3). Keep these forever -- old links,
      // bookmarks and any external site that linked the old slug must keep working.
      { source: "/programs/tg-digital-marketing", destination: "/programs/digital-marketing-course-nashik", permanent: true },
      { source: "/programs/tg-gameforge", destination: "/programs/game-development-course-nashik", permanent: true },
    ];
  },
};

export default nextConfig;
