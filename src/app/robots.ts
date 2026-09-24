import type { MetadataRoute } from "next";
import { IS_PRODUCTION_DEPLOY, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview and local deployments are never indexed.
  if (!IS_PRODUCTION_DEPLOY) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
