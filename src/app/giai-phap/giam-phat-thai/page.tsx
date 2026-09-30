import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { FeaturedProject } from "@/components/sections/FeaturedProject/FeaturedProject";
import { GhgFramework } from "@/components/sections/GhgFramework/GhgFramework";
import { PageHero } from "@/components/sections/PageHero/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline/ProcessTimeline";
import { PriorityCriteria } from "@/components/sections/reduction/PriorityCriteria/PriorityCriteria";
import { ReductionGroups } from "@/components/sections/reduction/ReductionGroups/ReductionGroups";
import { SolutionGroups } from "@/components/sections/SolutionGroups/SolutionGroups";
import { getEmissionReduction } from "@/lib/content";
import { routes } from "@/lib/routes";
import { staticPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = staticPageMetadata(routes.emissionReduction);

/*
 * /giai-phap/giam-phat-thai: dedicated GHG reduction landing archetype (Phase 3A).
 *  1 Hero · 2 Measurement → action · 3 GHG framework (#khung-ghg) ·
 *  4 Eight solution groups (index + anchored sections) · 5 Prioritisation method ·
 *  6 Proposal → implementation · 7 Case study ([CASE DATA]) · 8 CTA
 */
export default async function EmissionReductionPage() {
  const content = await getEmissionReduction();

  return (
    <>
      <PageHero {...content.hero} />
      <ProcessTimeline {...content.measurement} headingId="do-luong-title" surface="subtle" />
      <GhgFramework {...content.framework} id="khung-ghg" />
      <SolutionGroups {...content.groupsIndex} headingId="nhom-giai-phap-title" />
      <ReductionGroups {...content.groups} />
      <PriorityCriteria {...content.prioritisation} id="uu-tien" className={styles.spaced} />
      <ProcessTimeline {...content.implementation} headingId="trien-khai-title" id="trien-khai" />
      {content.caseStudy && <FeaturedProject {...content.caseStudy} headingId="du-an-title" className={styles.spaced} />}
      <CtaBand {...content.cta} className={styles.spaced} />
    </>
  );
}
