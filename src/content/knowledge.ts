import type { KnowledgeRecord, KnowledgeTopicId, KnowledgeTypeId } from "@/lib/content/types";
import { routes } from "@/lib/routes";

/*
 * Canonical knowledge source (/kien-thuc, /kien-thuc/[slug]).
 *
 * RULES (enforced in lib/content/knowledge.ts):
 *  - Never invent articles, publication dates, authors, sources, statistics or files.
 *  - A record becomes a public detail route only when publicationStatus = "published" AND
 *    reviewStatus = "approved" AND it has a slug, title, summary and publication date.
 *  - Download UI ("Tải tài liệu", file type, size) renders only from a real
 *    `downloadableAsset`. Without one, resources show no download action.
 *  - Taxonomy is referenced by ID (industry, pillar / capability, reduction group,
 *    standards topic) and resolved in lib/content/taxonomy.ts.
 *
 * No article has been supplied yet. The only record is the CBAM checklist named on the
 * approved Final Direction v3 board; it has no file, date or approved slug, so it is not
 * published and has no detail page.
 */

/** Content types (Site Summary V3). `tab` is the short 5q tab label. */
export const knowledgeTypes: Record<KnowledgeTypeId, { label: string; tab: string }> = {
  analysis: { label: "Bài phân tích", tab: "Phân tích" },
  guide: { label: "Hướng dẫn", tab: "Hướng dẫn" },
  regulatory: { label: "Cập nhật quy định", tab: "Cập nhật quy định" },
  technical: { label: "Góc nhìn kỹ thuật", tab: "Kỹ thuật" },
  resource: { label: "Tài liệu / biểu mẫu", tab: "Tài liệu" },
};

export const knowledgeTypeOrder: KnowledgeTypeId[] = ["analysis", "guide", "regulatory", "technical", "resource"];

/** Topic vocabulary (5k topic filter labels). */
export const knowledgeTopics: Record<KnowledgeTopicId, string> = {
  carbonGhg: "Carbon / GHG",
  cbam: "CBAM",
  energy: "Năng lượng",
  esg: "ESG",
  eudr: "EUDR",
  product: "Sản phẩm",
  supplyChain: "Chuỗi cung ứng",
  greenFactory: "Nhà máy xanh",
};

export const knowledgeRecords: KnowledgeRecord[] = [
  {
    id: "cbam-checklist-thep",
    // No approved slug yet: the record cannot be routed.
    slug: null,
    type: "resource",
    resourceKind: "Checklist",
    // Title and summary: Final Direction v3 / template 5q (approved board copy).
    title: "Checklist dữ liệu CBAM cho doanh nghiệp thép",
    summary:
      "Bộ checklist giúp doanh nghiệp xác định các nhóm dữ liệu cần chuẩn bị cho quá trình tính toán và báo cáo CBAM.",
    publishedAt: null,
    author: null,
    topic: "cbam",
    industryIds: ["steelMetals"],
    pillarIds: ["product"],
    reductionGroupIds: [],
    standardsTopics: ["cbam"],
    featuredImage: { placeholder: "[ẢNH / TRANG BÌA TÀI LIỆU]" },
    // Template 5l shows this resource behind the gated form; confirm with LEANWARES.
    access: "gated",
    // No file exists yet (decision H2): no download action, format or size anywhere.
    downloadableAsset: null,
    body: [],
    relatedIds: [],
    reviewStatus: "draft",
    publicationStatus: "unpublished",
  },
];

/** /kien-thuc copy (template 5q). */
export const knowledgePage = {
  hero: {
    breadcrumb: [{ label: "Trang chủ", href: routes.home }, { label: "Kiến thức" }],
    eyebrow: "Kiến thức",
    title: "Góc nhìn chuyên gia & Tài liệu",
    // Draft (5q shows "[MÔ TẢ CHUYÊN MỤC 1–2 câu]"): describes the section, claims nothing.
    lead: "Bài phân tích, hướng dẫn, cập nhật quy định, góc nhìn kỹ thuật và tài liệu về carbon, năng lượng và chuyển đổi xanh trong sản xuất.",
    reviewStatus: "draft" as const,
  },
  tabsLabel: "Lọc theo loại nội dung",
  allTab: "Tất cả",
  placeholderNote:
    "[NỘI DUNG] Bài viết và tài liệu sẽ hiển thị khi được LEANWARES duyệt và phát hành. Các mục dưới đây là khung trình bày.",
  unpublishedStatus: "Chưa phát hành",
  cta: {
    title: "Nhà máy của bạn có thể giảm bao nhiêu phát thải?",
    cta: { label: "Đăng ký đánh giá sơ bộ", href: routes.contact },
  },
};

/** Layout placeholders for the 5q mixed list (no links, no dates, no files). */
export const knowledgePlaceholders: Array<{ type: KnowledgeTypeId; recordId?: string; resourceKind?: string }> = [
  { type: "analysis" },
  { type: "resource", recordId: "cbam-checklist-thep" },
  { type: "guide" },
  { type: "regulatory" },
  { type: "resource", resourceKind: "Tự đánh giá" },
  { type: "technical" },
];
