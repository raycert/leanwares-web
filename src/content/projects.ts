import type { ProjectFilterConfig, ProjectRecord } from "@/lib/content/types";
import { routes } from "@/lib/routes";
import { industryRecords } from "./industries";
import { crossCutting, pillars } from "./pillars";

/*
 * Canonical project source (/du-an, /du-an/[slug]).
 *
 * EVIDENCE RULES (enforced in lib/content/projects.ts):
 *  - Never invent client names, factory names, locations, dates, savings, reductions,
 *    payback periods, investment values, productivity gains, certifications or
 *    before / after values.
 *  - A record is listed and routed only when publication = "published" AND
 *    verification = "verified" AND it has an approved slug.
 *  - A metric value is displayed only when that metric is "verified" and carries source,
 *    period, unit, baseline definition and comparison basis. Otherwise "[CASE DATA]".
 *  - Anonymous cases use an approved `clientDescriptor`; nothing is generated.
 *
 * No project has been verified for publication yet, so this list is empty and /du-an
 * renders clearly marked layout placeholders. Add records here (or replace the getter with
 * a CMS) when LEANWARES supplies verified cases.
 */
export const projects: ProjectRecord[] = [];

/** Listing-page copy (template 5v) and filter taxonomy (approved IA only). */
export const projectsPage = {
  hero: {
    breadcrumb: [{ label: "Trang chủ", href: routes.home }, { label: "Dự án" }],
    eyebrow: "Dự án",
    title: "Kinh nghiệm triển khai từ dữ liệu đến hiện trường",
    lead: "Các dự án được trình bày theo thách thức, cách tiếp cận, giải pháp và kết quả.",
  },
  // Draft copy (Phase 3B): how every case is structured. Definitional only.
  method: {
    eyebrow: "Cách trình bày dự án",
    title: "Mỗi dự án đi từ bối cảnh đến kết quả đo được",
    steps: [
      { label: "01", title: "Bối cảnh", description: "Nhà máy, yêu cầu thị trường và vấn đề cần giải quyết." },
      { label: "02", title: "Dữ liệu", description: "Dữ liệu đầu vào đã được kiểm chứng và đường cơ sở." },
      { label: "03", title: "Phân tích", description: "Cách xác định nguồn và công đoạn phát thải lớn." },
      { label: "04", title: "Giải pháp", description: "Các biện pháp đã được lựa chọn và triển khai." },
      { label: "05", title: "Kết quả", description: "Đường cơ sở, sau dự án và mức thay đổi, kèm nguồn dữ liệu." },
    ],
    reviewStatus: "draft" as const,
  },
  placeholderNote:
    "[CASE DATA] Danh sách dự án sẽ hiển thị khi dữ liệu dự án được LEANWARES xác minh. Các mục dưới đây là khung trình bày.",
  cta: {
    title: "Nhà máy của bạn có thể giảm bao nhiêu phát thải?",
    cta: { label: "Đăng ký đánh giá sơ bộ", href: routes.contact },
  },
  filters: {
    industryLabel: "Ngành",
    groupLabel: "Nhóm giải pháp",
    yearLabel: "Năm (tùy chọn)",
    allYears: "Tất cả các năm",
    clearLabel: "Xóa bộ lọc",
    openLabel: "Bộ lọc",
    closeLabel: "Đóng bộ lọc",
    resultTemplate: "{count} dự án",
    // Six industries (approved IA).
    industries: industryRecords.map((industry) => ({ key: industry.id, label: industry.name })),
    // Five service groups (Site Summary V3): three pillars + two cross-cutting layers.
    // Replaces the stale 5v "Carbon & ESG" chip (decision C16).
    groups: [
      { key: "factory", label: pillars.factory.title },
      { key: "product", label: pillars.product.title },
      { key: "supplyChain", label: pillars.supplyChain.title },
      { key: "esg", label: crossCutting.esg.title },
      { key: "managementSystems", label: crossCutting.managementSystems.title },
    ],
  } satisfies ProjectFilterConfig,
};

/**
 * A layout placeholder: every field null, so every visible value renders "[CASE DATA]".
 * Placeholders carry no industry, pillar or year, so they never imply that a project
 * exists in a particular sector, and they never link to a detail page.
 */
export function placeholderProject(): ProjectRecord {
  return {
    id: "placeholder",
    slug: null,
    publication: "fixture",
    verification: "unverified",
    clientVisibility: "anonymous",
    clientName: null,
    clientDescriptor: null,
    title: null,
    industryId: null,
    pillarId: null,
    reductionGroupId: null,
    location: null,
    year: null,
    scope: null,
    standards: null,
    challenge: null,
    dataBasis: null,
    approach: null,
    solution: null,
    resultSummary: null,
    image: { placeholder: "[ẢNH DỰ ÁN 4:3]" },
    metrics: [],
    detail: null,
  };
}
