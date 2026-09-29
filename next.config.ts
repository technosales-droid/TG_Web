import type { NextConfig } from "next";

// Security headers. The CSP allows what the site actually uses: its own scripts, styles (Next inlines both), images,
// video and self-hosted fonts, plus the single Google Maps embed in the footer and contact page, and YouTube (the
// hero's video card: a thumbnail image, and the player only once a visitor clicks play). It is applied to
// production builds only, because the dev server needs eval and websockets for hot reload.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com https://www.youtube-nocookie.com",
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

  // Files behind the access gate live in /private-content (not /public) and are read by the file route.
  outputFileTracingIncludes: { "/api/content/**": ["./private-content/**"] },

  // The hero's video card thumbnail, once a real YouTube video id is set (src/components/home/hero-video-card.tsx).
  images: { remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }] },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [
      // The Mission, Why and Approach pages are folded into /about.
      ...["mission", "why-technogurukul", "approach"].map((slug) => ({ source: `/about/${slug}`, destination: "/about", permanent: true })),
      // Faculty are shown on the Faculty & Facilities page; there are no per-member pages.
      { source: "/faculty", destination: "/about/facilities#faculty", permanent: true },
      { source: "/faculty/:slug", destination: "/about/facilities#faculty", permanent: true },
      // The Privacy Policy and Terms moved out of /legal.
      { source: "/legal/privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/legal/terms-conditions", destination: "/terms", permanent: true },
      // Career Paths was retired and replaced by Blogs.
      { source: "/career-paths", destination: "/blogs", permanent: true },
      { source: "/career-paths/:slug", destination: "/blogs", permanent: true },
    ];
  },
};

export default nextConfig;
