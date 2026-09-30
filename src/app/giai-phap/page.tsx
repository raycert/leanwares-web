import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { GhgFramework } from "@/components/sections/GhgFramework/GhgFramework";
import { PageHero } from "@/components/sections/PageHero/PageHero";
import { ProjectTeaser } from "@/components/sections/ProjectTeaser/ProjectTeaser";
import { CrossCuttingOverview } from "@/components/sections/solutions/CrossCuttingOverview/CrossCuttingOverview";
import { PillarOverview } from "@/components/sections/solutions/PillarOverview/PillarOverview";
import { ServicesByPillar } from "@/components/sections/solutions/ServicesByPillar/ServicesByPillar";
import { getSolutionsOverview } from "@/lib/content";
import { routes } from "@/lib/routes";
import { staticPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = staticPageMetadata(routes.solutions);

/*
 * /giai-phap: Solutions Overview (template 5t).
 * Hero · Three pillars · Cross-cutting capabilities · Services by pillar (placeholders) ·
 * GHG framework (5t variant) · Project teaser · CTA band.
 */
export default async function SolutionsPage() {
  const content = await getSolutionsOverview();

  return (
    <>
      <PageHero {...content.hero} />
      <PillarOverview {...content.pillars} />
      <CrossCuttingOverview {...content.crossCutting} />
      {content.services && <ServicesByPillar {...content.services} />}
      <GhgFramework {...content.ghgFramework} id="cach-trien-khai" loop="note" showSummary={false} />
      {content.project && <ProjectTeaser {...content.project} className={styles.project} />}
      <CtaBand {...content.cta} />
    </>
  );
}
