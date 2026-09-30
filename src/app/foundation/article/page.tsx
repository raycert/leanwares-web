import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeDetailView } from "@/components/sections/knowledge/KnowledgeDetailView/KnowledgeDetailView";
import { getKnowledgeFixture } from "@/lib/content";
import { isInternalPreviewEnabled } from "@/lib/preview";

// Internal route: no metadata at all unless internal preview is enabled (the 404 carries none).
export async function generateMetadata(): Promise<Metadata> {
  return isInternalPreviewEnabled() ? { title: "Article archetype (internal fixture)" } : {};
}

/*
 * INTERNAL: Knowledge detail archetype (article) rendered from a fixture record.
 * Available in development, or in production builds made with LW_INTERNAL_PREVIEW=1.
 */
export default async function ArticleFixturePage() {
  if (!isInternalPreviewEnabled()) notFound();
  const content = await getKnowledgeFixture("article");
  return <KnowledgeDetailView {...content} />;
}
