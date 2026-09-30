import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryDetailView } from "@/components/sections/industries/IndustryDetailView/IndustryDetailView";
import { getIndustryDetail, getIndustrySlugs } from "@/lib/content";
import { industryPath } from "@/lib/routes";
import { detailMetadata } from "@/lib/seo";

/*
 * /nganh/[slug]: Industry Detail archetype (template 5e).
 * Only the six canonical slugs (content/industries.ts) are generated; any other slug is a 404.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getIndustrySlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const content = await getIndustryDetail(slug);
  return content ? detailMetadata(content.hero.title, content.hero.lead, industryPath(slug)) : {};
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const content = await getIndustryDetail(slug);
  if (!content) notFound();
  return <IndustryDetailView {...content} />;
}
