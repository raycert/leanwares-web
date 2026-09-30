import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/sections/case/CaseStudyView/CaseStudyView";
import { getCaseStudy, getPublishedProjectSlugs } from "@/lib/content";
import { projectPath } from "@/lib/routes";
import { detailMetadata } from "@/lib/seo";

/*
 * /du-an/[slug]: Case Study Detail archetype (template 5f).
 * Only slugs of verified, published projects are generated; every other slug is a 404.
 * No project is verified yet, so no detail page is built.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const content = await getCaseStudy(slug);
  return content ? detailMetadata(content.hero.title, content.hero.context, projectPath(slug)) : {};
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const content = await getCaseStudy(slug);
  if (!content) notFound();
  return <CaseStudyView {...content} />;
}
