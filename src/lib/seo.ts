import type { Metadata } from "next";
import { SITE_NAME } from "./site";

// Single source for how a page's <title>, meta description, canonical, Open Graph and Twitter card are built, so
// twitter:* can never silently fall back to a different page's values the way it did before this existed (every
// page used to write its own partial metadata object; one page's og:image/twitter:image choice had no effect on
// any other page, and a page that set openGraph without twitter inherited the ROOT layout's generic twitter block
// instead of its own openGraph values -- Next.js metadata merges per top-level key, it does not fall back from
// openGraph to twitter within the same page).
const DEFAULT_IMAGE = { url: "/brand/link-preview.jpg", width: 1200, height: 630, alt: SITE_NAME };

export interface SeoImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface BuildMetadataInput {
  /** Full <title>, already including the "| Techno Gurukul" suffix where wanted. */
  title: string;
  /** Meta description, target 140-160 characters. */
  description: string;
  /** Site-relative path with a leading slash, e.g. "/about", or "/" for the homepage. */
  path: string;
  /** Defaults to the sitewide link-preview image. */
  image?: SeoImage;
  type?: "website" | "article";
  /** Only for type: "article" (blog posts). */
  article?: { publishedTime: string; authors: string[]; section?: string };
}

export function buildMetadata({ title, description, path, image, type = "website", article }: BuildMetadataInput): Metadata {
  const img = image ?? DEFAULT_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      locale: "en_IN",
      images: [{ url: img.url, width: img.width, height: img.height, alt: img.alt }],
      ...(article
        ? { publishedTime: article.publishedTime, authors: article.authors, ...(article.section ? { section: article.section } : {}) }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img.url],
    },
  };
}
