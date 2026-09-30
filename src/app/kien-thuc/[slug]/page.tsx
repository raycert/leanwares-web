import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeDetailView } from "@/components/sections/knowledge/KnowledgeDetailView/KnowledgeDetailView";
import { getKnowledgeDetail, getKnowledgeSlugs } from "@/lib/content";
import { knowledgePath } from "@/lib/routes";
import { detailMetadata } from "@/lib/seo";

/*
 * /kien-thuc/[slug]: Knowledge detail archetype (5r article / 5l resource).
 * Only published, approved records are generated; every other slug is a 404.
 * No record is published yet, so no detail page is built.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getKnowledgeSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const content = await getKnowledgeDetail(slug);
  return content ? detailMetadata(content.hero.title, content.hero.lead, knowledgePath(slug)) : {};
}

export default async function KnowledgeDetailPage({ params }: Params) {
  const { slug } = await params;
  const content = await getKnowledgeDetail(slug);
  if (!content) notFound();
  return <KnowledgeDetailView {...content} />;
}
