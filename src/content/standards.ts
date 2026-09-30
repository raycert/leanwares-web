import type { StandardsTopicId } from "@/lib/content/types";

/*
 * Shared standards / regulatory topic vocabulary (Phase 3C, moved here in Phase 3D).
 * Referenced by ID from industries (approved relationships only) and knowledge records;
 * resolved in lib/content/taxonomy.ts. Descriptions are definitional drafts
 * (reviewStatus "draft"): they state what a topic is, not whether it applies to a company.
 */

/** Controlled vocabulary for standards / regulatory topics (draft, definitional). */
export const standardsTopics: Record<StandardsTopicId, { code: string; label: string; description: string }> = {
  cbam: {
    code: "CBAM",
    label: "Cơ chế điều chỉnh biên giới carbon của EU",
    description: "Yêu cầu dữ liệu phát thải gắn với hàng hóa xuất khẩu vào EU thuộc phạm vi quy định.",
  },
  eudr: {
    code: "EUDR",
    label: "Quy định của EU về sản phẩm không gây phá rừng",
    description: "Yêu cầu truy xuất nguồn gốc đối với các nhóm hàng hóa thuộc phạm vi quy định.",
  },
  iso50001: { code: "ISO 50001", label: "Hệ thống quản lý năng lượng", description: "Khung quản lý và cải tiến hiệu quả năng lượng." },
  ghgAccounting: {
    code: "GHG",
    label: "Kiểm kê khí nhà kính (GHG accounting)",
    description: "Đo lường và báo cáo phát thải theo phạm vi 1, 2 và 3.",
  },
  esgSupplier: {
    code: "ESG",
    label: "Yêu cầu ESG từ khách hàng và chuỗi cung ứng",
    description: "Dữ liệu và cam kết ESG do khách hàng yêu cầu từ nhà cung cấp.",
  },
};

/** /kien-thuc "Tiêu chuẩn & Framework" reference section (LWStandards resource variant). */
export const standardsReference = {
  title: "Tiêu chuẩn & Framework",
  note: "Tài liệu tham chiếu. Không phải danh mục dịch vụ và không khẳng định chứng nhận.",
  order: ["ghgAccounting", "cbam", "eudr", "iso50001", "esgSupplier"] as StandardsTopicId[],
  reviewStatus: "draft" as const,
};
