import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/data/blogs";
import { COURSE_DETAILS } from "@/data/course-details";
import { SITE_URL } from "@/lib/site";

// Every indexable page, once, at its canonical path. Redirect-only routes (/faculty, /career-paths, the old About
// pages, /about/facilities) are deliberately absent.
const STATIC_PATHS = [
  "/",
  "/about",
  "/programs",
  "/learning",
  "/learning/projects",
  "/learning/resources",
  "/blogs",
  "/contact",
  "/privacy-policy",
  "/cookie-policy",
  "/terms",
  "/community-guidelines",
  "/privacy-requests",
  "/legal/refund-policy",
  "/legal/disclaimer",
];

// Bump this whenever a meaningful round of content changes lands across the static pages and program pages below
// (none of which carry their own per-page "last updated" date the way legal pages or blog posts do).
const SITE_CONTENT_DATE = "2026-10-08";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: SITE_CONTENT_DATE,
  }));

  const programEntries: MetadataRoute.Sitemap = COURSE_DETAILS.map((c) => ({
    url: `${SITE_URL}/programs/${c.slug}`,
    lastModified: SITE_CONTENT_DATE,
    ...(c.heroImage ? { images: [`${SITE_URL}${c.heroImage}`] } : {}),
  }));

  const blogEntries: MetadataRoute.Sitemap = getBlogPosts().map((p) => ({
    url: `${SITE_URL}/blogs/${p.slug}`,
    lastModified: p.publishedAt,
    ...(p.heroImage ? { images: [`${SITE_URL}${p.heroImage}`] } : {}),
  }));

  return [...staticEntries, ...programEntries, ...blogEntries];
}
