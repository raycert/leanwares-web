import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectExplorer } from "@/components/sections/projects/ProjectExplorer/ProjectExplorer";
import { Container } from "@/components/ui/Container/Container";
import { getProjectFilters, getProjectsPreview } from "@/lib/content";
import { isInternalPreviewEnabled } from "@/lib/preview";
import styles from "./page.module.css";

// Internal route: no metadata at all unless internal preview is enabled (the 404 carries none).
export async function generateMetadata(): Promise<Metadata> {
  return isInternalPreviewEnabled() ? { title: "Project filters (internal fixture)" } : {};
}

/*
 * INTERNAL: /du-an filters exercised with fixture records (filter keys only; all facts are
 * [CASE DATA]). Available in development, or in production builds made with LW_INTERNAL_PREVIEW=1.
 */
export default async function ProjectsFixturePage() {
  if (!isInternalPreviewEnabled()) notFound();
  const [content, filters] = await Promise.all([getProjectsPreview(), getProjectFilters()]);
  return (
    <>
      <Container>
        <h1 className="t-h2">Bộ lọc dự án — bản xem trước nội bộ</h1>
        <p role="note" className={`t-data ${styles.notice}`}>
          Dữ liệu mẫu (fixture), không phải dự án của LEANWARES. Không hiển thị trên website.
        </p>
      </Container>
      <ProjectExplorer items={content.items} filters={filters} showFilters />
    </>
  );
}
