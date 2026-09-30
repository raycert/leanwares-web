import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { EmptyState } from "@/components/sections/EmptyState/EmptyState";
import { KnowledgeExplorer } from "@/components/sections/knowledge/KnowledgeExplorer/KnowledgeExplorer";
import { StandardsReference } from "@/components/sections/knowledge/StandardsReference/StandardsReference";
import { PageHero } from "@/components/sections/PageHero/PageHero";
import { getKnowledgeListing } from "@/lib/content";
import { routes } from "@/lib/routes";
import { staticPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = staticPageMetadata(routes.knowledge);

/*
 * /kien-thuc: Knowledge (template 5q).
 * Hero · Type tabs + mixed article / resource list · Tiêu chuẩn & Framework reference · CTA.
 * Only published, approved records are listed and linked; placeholders otherwise.
 */
export default async function KnowledgePage() {
  const content = await getKnowledgeListing();
  return (
    <>
      <PageHero {...content.hero} titleSize="display-m" />
      {content.items.length > 0 ? (
        <KnowledgeExplorer {...content} />
      ) : (
        content.emptyNote && <EmptyState text={content.emptyNote} />
      )}
      <StandardsReference {...content.standards} className={styles.standards} />
      <CtaBand {...content.cta} className={styles.cta} />
    </>
  );
}
