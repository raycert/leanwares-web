import type { ReviewStatus } from "@/lib/content/types";
import { routes } from "@/lib/routes";

/*
 * Route metadata (Vietnamese). Layered by lib/seo.ts:
 *   1. site default   → `siteSeo` (root layout)
 *   2. page override  → `pageSeo[route]` (static routes)
 *   3. detail pages   → derived from the record (industry / project / knowledge), no entry here
 * Unpublished project / knowledge records have no route, so no metadata and no sitemap entry.
 *
 * Descriptions reuse approved page copy where it exists; the rest are drafts
 * (reviewStatus "draft") that describe the page and claim nothing (no awards, rankings,
 * outcomes or counts).
 */

export const siteSeo = {
  siteName: "LEANWARES",
  locale: "vi_VN",
  /** Final Direction v3 homepage H1 (approved). */
  defaultTitle: "LEANWARES — Giải pháp chuyển đổi xanh cho sản xuất",
  titleTemplate: "%s · LEANWARES",
  /** Final Direction v3 homepage lead (approved). */
  defaultDescription:
    "LEANWARES đồng hành cùng doanh nghiệp từ đo lường carbon, tối ưu vận hành đến triển khai giải pháp giảm phát thải cho nhà máy, sản phẩm và chuỗi cung ứng.",
};

export type StaticRoute = (typeof routes)[keyof typeof routes];

export interface PageSeo {
  title: string;
  description: string;
  reviewStatus?: ReviewStatus;
}

export const pageSeo: Record<StaticRoute, PageSeo> = {
  [routes.home]: { title: siteSeo.defaultTitle, description: siteSeo.defaultDescription },
  [routes.solutions]: {
    title: "Giải pháp",
    // 5t hero lead (approved).
    description:
      "Từ nhà máy, sản phẩm đến chuỗi cung ứng, LEANWARES kết nối dữ liệu, cải tiến vận hành và giảm phát thải thành một lộ trình triển khai thống nhất.",
  },
  [routes.emissionReduction]: {
    title: "Giảm phát thải khí nhà kính",
    description:
      "Đo lường phát thải, xác định điểm nóng, xây dựng cơ hội giảm phát thải và triển khai hành động cải tiến có thể đo lường tại nhà máy.",
    reviewStatus: "draft",
  },
  [routes.industries]: {
    title: "Ngành",
    // 5u hero lead (approved).
    description: "Mỗi ngành có cấu trúc phát thải, yêu cầu thị trường và cơ hội cải tiến khác nhau.",
  },
  [routes.projects]: {
    title: "Dự án",
    // 5v hero lead (approved).
    description: "Các dự án được trình bày theo thách thức, cách tiếp cận, giải pháp và kết quả.",
  },
  [routes.knowledge]: {
    title: "Kiến thức",
    description:
      "Bài phân tích, hướng dẫn, cập nhật quy định, góc nhìn kỹ thuật và tài liệu về carbon, năng lượng và chuyển đổi xanh trong sản xuất.",
    reviewStatus: "draft",
  },
  [routes.about]: {
    title: "Về LEANWARES",
    description: "Giới thiệu LEANWARES: tư vấn và triển khai giải pháp chuyển đổi xanh cho doanh nghiệp sản xuất.",
    reviewStatus: "draft",
  },
  [routes.contact]: {
    title: "Liên hệ",
    description: "Đăng ký đánh giá sơ bộ: chia sẻ thông tin về nhà máy và mục tiêu giảm phát thải của bạn với LEANWARES.",
    reviewStatus: "draft",
  },
  [routes.privacy]: { title: "Chính sách bảo mật", description: "Chính sách bảo mật của website LEANWARES.", reviewStatus: "draft" },
  [routes.terms]: { title: "Điều khoản sử dụng", description: "Điều khoản sử dụng website LEANWARES.", reviewStatus: "draft" },
  [routes.cookies]: { title: "Chính sách cookie", description: "Chính sách cookie của website LEANWARES.", reviewStatus: "draft" },
};
