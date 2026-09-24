import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/data/blogs";
import { COURSE_DETAILS } from "@/data/course-details";
import { SITE_URL } from "@/lib/site";

// Every indexable page, once, at its canonical path. Redirect-only routes (/faculty, /career-paths, the old About
// pages) are deliberately absent.
const STATIC_PATHS = [
  "/",
  "/about",
  "/about/facilities",
  "/programs",
  "/learning",
  "/learning/projects",
  "/learning/resources",
  "/blogs",
  "/contact",
  "/legal/privacy-policy",
  "/legal/terms-conditions",
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
