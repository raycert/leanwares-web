import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/site";

/*
 * robots.txt by mode (lib/site.ts): everything is disallowed unless production indexing is
 * explicitly approved (LW_SITE_MODE=production + LW_ALLOW_INDEXING=1). Internal preview
 * routes are always disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/foundation/" },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
