import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { PageHero } from "@/components/sections/PageHero/PageHero";
import { ProjectTeaser } from "@/components/sections/ProjectTeaser/ProjectTeaser";
import { CommonProblems } from "@/components/sections/industries/CommonProblems/CommonProblems";
import { IndustriesExplorer } from "@/components/sections/industries/IndustriesExplorer/IndustriesExplorer";
import { getIndustriesOverview } from "@/lib/content";
import { routes } from "@/lib/routes";
import { staticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = staticPageMetadata(routes.industries);

/*
 * /nganh: Industries Overview (template 5u).
 * Hero · Six-industry explorer · Common problems (cross-industry) · Project teaser · CTA band.
 * Industries come from the canonical source (content/industries.ts).
 */
export default async function IndustriesPage() {
  const content = await getIndustriesOverview();

  return (
    <>
      <PageHero {...content.hero} titleSize="display-m" />
      <IndustriesExplorer {...content.explorer} />
      <CommonProblems {...content.problems} />
      {content.project && <ProjectTeaser {...content.project} />}
      <CtaBand {...content.cta} />
    </>
  );
}
