import type { SolutionsOverviewContent } from "@/lib/content/types";
import { anchor, plannedAnchors, routes } from "@/lib/routes";
import { projectTeaserPlaceholder } from "./case-study";
import { ghgFramework } from "./ghg-framework";
import { crossCutting, pillarList } from "./pillars";

/*
 * /giai-phap: Solutions Overview (template 5t, Overview & Listing Templates).
 *
 * Three layers are kept apart:
 *  1. Pillar scope/topics: Final Direction v3 homepage copy.
 *  2. Capability areas: Final Direction v3 navigation lists (same as mega menu / footer).
 *  3. Specific services: 5t "Dịch vụ theo trụ cột" and the 5x/5y catalogue require LEANWARES
 *     business verification, so they are shown as visible placeholders only. Service counts
 *     ("06 dịch vụ") from 5t are omitted for the same reason.
 *
 * Copy for the hero and the cross-cutting intro is verbatim from template 5t.
 */

const pending = "[DỊCH VỤ] Chờ LEANWARES xác nhận";

export const solutionsOverview: SolutionsOverviewContent = {
  hero: {
    breadcrumb: [{ label: "Trang chủ", href: routes.home }, { label: "Giải pháp" }],
    eyebrow: "Giải pháp",
    title: "Giải pháp chuyển đổi xanh cho sản xuất",
    lead: "Từ nhà máy, sản phẩm đến chuỗi cung ứng, LEANWARES kết nối dữ liệu, cải tiến vận hành và giảm phát thải thành một lộ trình triển khai thống nhất.",
  },

  pillars: {
    eyebrow: "Ba trụ cột",
    items: pillarList.map((pillar) => ({
      id: pillar.id,
      number: pillar.number,
      title: pillar.title,
      lead: pillar.lead,
      scopeLabel: "Phạm vi",
      scope: pillar.topics,
      capabilitiesLabel: "Nhóm năng lực",
      capabilities: pillar.capabilities,
      image: { placeholder: `[ẢNH ${pillar.title.toUpperCase()} 4:3]` },
    })),
  },

  crossCutting: {
    id: plannedAnchors.solutions.crossCutting,
    eyebrow: "Năng lực xuyên suốt",
    title: "Năng lực hỗ trợ toàn bộ hành trình chuyển đổi xanh",
    lead: "Hai nhóm dịch vụ dùng chung, hỗ trợ cả ba trụ cột. Đây không phải trụ cột thứ tư.",
    supportLabel: "Hỗ trợ cả ba trụ cột",
    pillarNames: pillarList.map((pillar) => pillar.title),
    items: [crossCutting.esg, crossCutting.managementSystems].map((item) => ({
      ...item,
      pendingServices: "[NỘI DUNG] Danh mục dịch vụ — chờ LEANWARES xác nhận",
    })),
  },

  services: {
    eyebrow: "Các dịch vụ tiêu biểu",
    title: "Dịch vụ theo trụ cột",
    note: "Danh mục dịch vụ cụ thể đang chờ LEANWARES xác nhận trước khi công bố.",
    groups: pillarList.map((pillar) => ({ pillar: pillar.title, items: [pending, pending] })),
  },

  ghgFramework: {
    ...ghgFramework,
    eyebrow: "Cách LEANWARES triển khai",
    link: { label: "Xem khung GHG", href: anchor(routes.emissionReduction, "khung-ghg") },
  },

  project: projectTeaserPlaceholder(),

  cta: {
    title: "Bạn đang ở đâu trong hành trình chuyển đổi xanh?",
    cta: { label: "Trao đổi với chuyên gia", href: routes.contact },
  },
};
