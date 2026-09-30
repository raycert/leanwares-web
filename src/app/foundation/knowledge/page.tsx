import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeExplorer } from "@/components/sections/knowledge/KnowledgeExplorer/KnowledgeExplorer";
import { Container } from "@/components/ui/Container/Container";
import { getKnowledgePreview } from "@/lib/content";
import { isInternalPreviewEnabled } from "@/lib/preview";
import styles from "../projects/page.module.css";

// Internal route: no metadata at all unless internal preview is enabled (the 404 carries none).
export async function generateMetadata(): Promise<Metadata> {
  return isInternalPreviewEnabled() ? { title: "Knowledge list (internal fixture)" } : {};
}

/*
 * INTERNAL: /kien-thuc type tabs exercised with fixture records (all values are placeholders).
 * Available in development, or in production builds made with LW_INTERNAL_PREVIEW=1.
 */
export default async function KnowledgeFixturePage() {
  if (!isInternalPreviewEnabled()) notFound();
  const content = await getKnowledgePreview();
  return (
    <>
      <Container>
        <h1 className="t-h2">Kiến thức — bản xem trước nội bộ</h1>
        <p role="note" className={`t-data ${styles.notice}`}>
          Dữ liệu mẫu (fixture), không phải nội dung của LEANWARES. Không hiển thị trên website.
        </p>
      </Container>
      <KnowledgeExplorer {...content} />
    </>
  );
}
