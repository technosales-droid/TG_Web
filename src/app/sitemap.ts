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

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...COURSE_DETAILS.map((c) => `/programs/${c.slug}`),
    ...getBlogPosts().map((p) => `/blogs/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}` }));
}
