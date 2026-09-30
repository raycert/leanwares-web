import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { EmptyState } from "@/components/sections/EmptyState/EmptyState";
import { PageHero } from "@/components/sections/PageHero/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline/ProcessTimeline";
import { FeaturedProjectCard } from "@/components/sections/projects/FeaturedProjectCard/FeaturedProjectCard";
import { ProjectExplorer } from "@/components/sections/projects/ProjectExplorer/ProjectExplorer";
import { getProjectFilters, getProjectsListing } from "@/lib/content";
import { routes } from "@/lib/routes";
import { staticPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = staticPageMetadata(routes.projects);

/*
 * /du-an: Projects Listing (template 5v).
 * Hero · Case structure (Bối cảnh → Dữ liệu → Phân tích → Giải pháp → Kết quả) ·
 * Featured project · Filters + project rows · CTA band.
 * Until a project is verified: development shows marked [CASE DATA] placeholders (no links,
 * no filters); staging / production show an honest empty state instead.
 */
export default async function ProjectsPage() {
  const [content, filters] = await Promise.all([getProjectsListing(), getProjectFilters()]);

  return (
    <>
      <PageHero {...content.hero} titleSize="display-m" />
      <ProcessTimeline {...content.method} headingId="cach-trinh-bay-title" className={styles.method} />
      {content.featured && <FeaturedProjectCard item={content.featured} label="Nổi bật" className={styles.featured} />}
      {content.items.length > 0 ? (
        <ProjectExplorer
          items={content.items}
          filters={filters}
          showFilters={!content.placeholder}
          note={content.placeholder ? content.placeholderNote : undefined}
        />
      ) : (
        content.emptyNote && <EmptyState text={content.emptyNote} />
      )}
      <CtaBand {...content.cta} className={styles.cta} />
    </>
  );
}
