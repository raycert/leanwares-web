import type { MetadataRoute } from "next";
import { getIndustrySlugs, getKnowledgeSlugs, getPublishedProjectSlugs } from "@/lib/content";
import { implementedRoutes, industryPath, knowledgePath, projectPath } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site";

/*
 * sitemap.xml: public routes only. Static V1 routes + the six industry pages + published
 * project and knowledge slugs (none yet). Excluded by construction: /foundation/*,
 * fixtures, unpublished records. No lastModified: no verified dates exist.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const paths = [
    ...implementedRoutes,
    ...(await getIndustrySlugs()).map(industryPath),
    ...(await getPublishedProjectSlugs()).map(projectPath),
    ...(await getKnowledgeSlugs()).map(knowledgePath),
  ];
  return paths.map((path) => ({ url: `${base}${path}` }));
}
