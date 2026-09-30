import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { CrossCuttingCapabilities } from "@/components/sections/home/CrossCuttingCapabilities/CrossCuttingCapabilities";
import { FeaturedProject } from "@/components/sections/FeaturedProject/FeaturedProject";
import { GhgFramework } from "@/components/sections/GhgFramework/GhgFramework";
import { Hero } from "@/components/sections/home/Hero/Hero";
import { IndustryExplorer } from "@/components/sections/home/IndustryExplorer/IndustryExplorer";
import { KnowledgeTeaser } from "@/components/sections/home/KnowledgeTeaser/KnowledgeTeaser";
import { MarketPressure } from "@/components/sections/home/MarketPressure/MarketPressure";
import { SolutionGroups } from "@/components/sections/SolutionGroups/SolutionGroups";
import { SolutionPillars } from "@/components/sections/home/SolutionPillars/SolutionPillars";
import { getHomepage } from "@/lib/content";
import { routes } from "@/lib/routes";
import { staticPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = staticPageMetadata(routes.home);

/*
 * Homepage: Final Direction v3, approved section order (header and footer come from
 * the root layout):
 *  1 Header · 2 Hero · 3 Market pressure · 4 Three pillars · 5 Cross-cutting capabilities ·
 *  6 GHG framework · 7 Eight solution groups · 8 Industry explorer · 9 Featured project ·
 *  10 Knowledge / resources · 11 Final CTA · 12 Footer
 */
export default async function HomePage() {
  const content = await getHomepage();

  return (
    <>
      <Hero {...content.hero} />
      <MarketPressure {...content.marketPressure} />
      <SolutionPillars {...content.pillars} />
      <CrossCuttingCapabilities {...content.crossCutting} />
      <GhgFramework {...content.ghgFramework} />
      <SolutionGroups {...content.solutionGroups} />
      <IndustryExplorer {...content.industries} />
      {content.featuredProject && <FeaturedProject {...content.featuredProject} />}
      {content.knowledge && <KnowledgeTeaser {...content.knowledge} />}
      <CtaBand {...content.finalCta} variant="home" className={styles.finalCta} />
    </>
  );
}
