import type { HomepageContent } from "@/lib/content/types";
import { anchor, industryPath, routes } from "@/lib/routes";
import { caseStudyPlaceholder } from "./case-study";
import { ghgFramework } from "./ghg-framework";
import { industryRecords } from "./industries";
import { crossCutting, pillars } from "./pillars";
import { solutionGroups } from "./solution-groups";

/*
 * Homepage content: Final Direction v3 (homepage content authority).
 *
 * Copy is taken verbatim from the approved board. Every bracketed value is a visible
 * placeholder and must stay one until verified LEANWARES content is supplied:
 * [CASE DATA], [ẢNH THẬT], [ẢNH DỰ ÁN], [Tiêu đề …]. Do not substitute sample values.
 *
 * Eyebrows are stored in sentence case and uppercased by CSS (.t-eyebrow).
 */

export const homepage: HomepageContent = {
  hero: {
    eyebrow: "Carbon · ESG · Dữ liệu · Cải tiến",
    title: "Giải pháp chuyển đổi xanh cho sản xuất",
    lead: "LEANWARES đồng hành cùng doanh nghiệp từ đo lường carbon, tối ưu vận hành đến triển khai giải pháp giảm phát thải cho nhà máy, sản phẩm và chuỗi cung ứng.",
    primaryCta: { label: "Khám phá giải pháp", href: routes.solutions },
    // Approved 2026-09-30: the reduction-opportunity CTA leads to the GHG reduction landing page.
    secondaryCta: { label: "Đánh giá cơ hội giảm phát thải", href: routes.emissionReduction },
    image: {
      placeholder: "[ẢNH THẬT] ảnh dọc, hiện trường nhà máy hoặc kỹ sư làm việc tại thiết bị",
    },
  },

  marketPressure: {
    eyebrow: "Thị trường đang thay đổi",
    title: "Thị trường không còn chỉ hỏi: “Bạn có chứng chỉ không?”",
    questions: [
      "Sản phẩm phát thải bao nhiêu?",
      "Nguyên liệu đến từ đâu?",
      "Nhà máy đang giảm năng lượng thế nào?",
      "Dữ liệu có thể kiểm chứng không?",
      "Nhà cung cấp có đáp ứng yêu cầu ESG không?",
    ],
  },

  pillars: {
    eyebrow: "Ba trụ cột giải pháp",
    title: "Nhà máy, sản phẩm và chuỗi cung ứng",
    factory: {
      ...pillars.factory,
      image: { placeholder: "[ẢNH THẬT] khung rộng, hệ thống thiết bị trong xưởng" },
    },
    product: {
      ...pillars.product,
      lifecycleLabel: "Các giai đoạn vòng đời sản phẩm",
      lifecycle: ["Nguyên liệu", "Sản xuất", "Vận chuyển", "Sử dụng", "Cuối vòng đời"],
    },
    supplyChain: {
      ...pillars.supplyChain,
      tiersLabel: "Sơ đồ nhà cung cấp theo cấp",
      tiers: [
        { label: "Nhà cung cấp cấp 1", nodes: 4 },
        { label: "Nhà cung cấp cấp 2", nodes: 6 },
        { label: "Nhà cung cấp cấp 3", nodes: 8 },
      ],
      diagramNote: "Sơ đồ khái niệm, không phải dữ liệu",
    },
  },

  crossCutting: {
    eyebrow: "Năng lực xuyên suốt",
    title: "Áp dụng cho cả ba trụ cột",
    items: [crossCutting.esg, crossCutting.managementSystems].map((item) => ({
      title: item.title,
      description: item.description,
      href: anchor(routes.solutions, item.id),
      ctaLabel: "Xem tất cả giải pháp",
    })),
  },

  ghgFramework,

  solutionGroups: {
    eyebrow: "Các nhóm giải pháp chính",
    title: "Tám nhóm giải pháp",
    groups: solutionGroups,
  },

  industries: {
    eyebrow: "Giải pháp theo ngành",
    title: "Chuyên môn theo từng ngành sản xuất",
    // Canonical industries (content/industries.ts) → /nganh/[slug] (Phase 3C).
    industries: industryRecords.map((industry) => ({
      name: industry.name,
      href: industryPath(industry.slug),
      image: { placeholder: `[ẢNH THẬT 4:3] ${industry.name}` },
    })),
  },

  featuredProject: caseStudyPlaceholder(),

  knowledge: {
    eyebrow: "Kiến thức",
    title: "Góc nhìn & Tài liệu",
    allLink: { label: "Tất cả kiến thức", href: routes.knowledge },
    featured: {
      type: "Bài phân tích",
      title: "[Tiêu đề bài phân tích nổi bật]",
      href: routes.knowledge,
      image: { placeholder: "[ẢNH 16:9] bài phân tích nổi bật" },
    },
    articles: [
      { type: "Hướng dẫn", title: "[Tiêu đề bài viết]", href: routes.knowledge },
      { type: "Cập nhật quy định", title: "[Tiêu đề bài viết]", href: routes.knowledge },
    ],
    // Example resource from the approved board. No downloadable file exists yet, so neither
    // the label nor the action implies a file: "view" link to /kien-thuc (approved 2026-09-30).
    resource: {
      type: "Tài liệu",
      title: "Checklist dữ liệu CBAM cho doanh nghiệp thép",
      // Neutral type label: no downloadable file exists yet (approved 2026-09-30).
      format: "Checklist / biểu mẫu",
      cta: { label: "Xem tài nguyên", href: routes.knowledge },
    },
  },

  finalCta: {
    title: "Nhà máy của bạn có thể giảm bao nhiêu phát thải?",
    cta: { label: "Đăng ký đánh giá sơ bộ", href: routes.contact },
  },
};
