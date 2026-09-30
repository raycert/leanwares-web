import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/sections/case/CaseStudyView/CaseStudyView";
import { getCaseStudyFixture } from "@/lib/content";
import { isInternalPreviewEnabled } from "@/lib/preview";

// Internal route: no metadata at all unless internal preview is enabled (the 404 carries none).
export async function generateMetadata(): Promise<Metadata> {
  return isInternalPreviewEnabled() ? { title: "Case study archetype (internal fixture)" } : {};
}

/*
 * INTERNAL: Case Study Detail archetype rendered from a fixture record.
 * Available in development, or in production builds made with LW_INTERNAL_PREVIEW=1.
 */
export default async function CaseStudyFixturePage() {
  if (!isInternalPreviewEnabled()) notFound();
  const content = await getCaseStudyFixture();
  return <CaseStudyView {...content} />;
}
