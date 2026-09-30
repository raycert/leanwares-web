import type { EmissionReductionContent } from "@/lib/content/types";
import { routes } from "@/lib/routes";
import { caseStudyPlaceholder } from "./case-study";
import { ghgFramework } from "./ghg-framework";
import { reductionGroups, solutionGroups } from "./solution-groups";

/*
 * /giai-phap/giam-phat-thai: dedicated GHG reduction landing archetype (Phase 3A).
 *
 * Sources:
 *  - Framework, eight group names, CTA title: Final Direction v3 (approved).
 *  - Hero proposition and section structure: approved brief (2026-09-30).
 *  - Sections marked reviewStatus "draft": copy written for V1 to fill the approved
 *    structure. It is conservative and definitional (no numbers, technologies, savings,
 *    payback periods, rankings or results) and must be reviewed by LEANWARES before launch.
 *  - Case study: [CASE DATA] placeholders only.
 */

export const emissionReduction: EmissionReductionContent = {
  hero: {
    breadcrumb: [
      { label: "Trang chủ", href: routes.home },
      { label: "Giải pháp", href: routes.solutions },
      { label: "Giảm phát thải" },
    ],
    eyebrow: "Giải pháp · Giảm phát thải",
    title: "Từ dữ liệu carbon đến giải pháp giảm phát thải",
    lead: "LEANWARES đồng hành cùng doanh nghiệp sản xuất đo lường phát thải, xác định điểm nóng, xây dựng cơ hội giảm phát thải và triển khai các hành động cải tiến có thể đo lường được.",
    primaryCta: { label: "Đăng ký đánh giá sơ bộ", href: routes.contact },
    secondaryCta: { label: "Xem khung GHG", href: "#khung-ghg" },
    image: { placeholder: "[ẢNH THẬT 4:5] kỹ sư đo đạc tại hiện trường nhà máy" },
    reviewStatus: "draft",
  },

  measurement: {
    eyebrow: "Vì sao bắt đầu từ đo lường",
    title: "Giảm phát thải bắt đầu từ việc hiểu đúng nguồn phát thải",
    lead: "Kiểm kê khí nhà kính (GHG inventory) là điểm xuất phát, không phải kết quả cuối cùng. Số liệu kiểm kê chỉ tạo ra giá trị khi được dùng để xác định điểm nóng và lựa chọn hành động giảm phát thải phù hợp.",
    steps: [
      {
        label: "01",
        title: "Kiểm kê",
        description: "Thu thập dữ liệu năng lượng, nhiên liệu và vật liệu, quy đổi thành phát thải.",
      },
      {
        label: "02",
        title: "Hiểu nguồn phát thải",
        description: "Phân bổ phát thải theo nguồn, công đoạn và phạm vi (Scope 1, 2, 3).",
      },
      {
        label: "03",
        title: "Xác định điểm nóng",
        description: "Chỉ ra các nguồn và công đoạn phát thải lớn cần ưu tiên.",
      },
      {
        label: "04",
        title: "Hành động",
        description: "Chuyển điểm nóng thành các biện pháp giảm phát thải cụ thể, có thể đo lường.",
      },
    ],
    reviewStatus: "draft",
  },

  framework: ghgFramework,

  // Same eight groups as the homepage; on this page they are in-page anchors (native #links).
  groupsIndex: {
    eyebrow: "Các nhóm giải pháp giảm phát thải",
    title: "Tám nhóm giải pháp",
    groups: solutionGroups.map((group) => ({ ...group, href: `#${group.href.split("#")[1]}` })),
  },

  groups: {
    pillarLabel: "Trụ cột",
    items: reductionGroups,
    reviewStatus: "draft",
  },

  prioritisation: {
    eyebrow: "Ưu tiên đầu tư",
    title: "Cách ưu tiên cơ hội giảm phát thải",
    lead: "Trước khi quyết định đầu tư, các biện pháp giảm phát thải có thể được so sánh theo cùng một bộ tiêu chí.",
    columns: { criterion: "Tiêu chí", question: "Câu hỏi đánh giá" },
    criteria: [
      {
        name: "Tiềm năng giảm phát thải",
        term: "emission reduction potential",
        question: "Biện pháp có thể giảm bao nhiêu phát thải so với đường cơ sở?",
      },
      {
        name: "Chi phí đầu tư",
        term: "investment requirement",
        question: "Cần mức đầu tư ban đầu nào để triển khai?",
      },
      {
        name: "Tác động vận hành",
        term: "operating impact",
        question: "Biện pháp ảnh hưởng thế nào đến chi phí vận hành, chất lượng và năng suất?",
      },
      {
        name: "Độ phức tạp triển khai",
        term: "implementation complexity",
        question: "Cần thay đổi kỹ thuật, tổ chức hoặc nhà cung cấp ở mức nào?",
      },
      {
        name: "Thời gian triển khai",
        term: "implementation timeframe",
        question: "Mất bao lâu từ khi quyết định đến khi có kết quả đo được?",
      },
      {
        name: "Độ tin cậy dữ liệu",
        term: "data confidence",
        question: "Dữ liệu dùng để ước tính có đủ và kiểm chứng được không?",
      },
    ],
    note: "Khung phương pháp. Trọng số, điểm số và thứ tự ưu tiên chỉ được xác lập từ dữ liệu thực tế của từng nhà máy: [CASE DATA].",
    reviewStatus: "draft",
  },

  implementation: {
    eyebrow: "Triển khai",
    title: "Từ đề xuất đến triển khai",
    lead: "Giảm phát thải được đánh giá bằng kết quả đo được tại nhà máy, không chỉ bằng báo cáo. Mỗi biện pháp được kiểm tra trước khi mở rộng.",
    steps: [
      {
        label: "Bước 1",
        title: "Đề xuất",
        description: "Xây dựng danh mục biện pháp giảm phát thải từ các điểm nóng đã xác định.",
      },
      {
        label: "Bước 2",
        title: "Đánh giá khả thi",
        description: "Kiểm tra điều kiện kỹ thuật, chi phí và tác động vận hành của từng biện pháp.",
      },
      {
        label: "Bước 3",
        title: "Thử nghiệm (pilot)",
        description: "Thử nghiệm ở quy mô nhỏ khi cần để kiểm chứng giả định trước khi mở rộng.",
      },
      {
        label: "Bước 4",
        title: "Triển khai",
        description: "Triển khai các biện pháp đã được lựa chọn tại nhà máy.",
      },
      {
        label: "Bước 5",
        title: "Đo lường kết quả",
        description: "So sánh kết quả sau triển khai với đường cơ sở và cập nhật dữ liệu cho chu kỳ tiếp theo.",
      },
    ],
    reviewStatus: "draft",
  },

  caseStudy: caseStudyPlaceholder("Dự án giảm phát thải"),

  cta: {
    title: "Nhà máy của bạn có thể giảm bao nhiêu phát thải?",
    cta: { label: "Đăng ký đánh giá sơ bộ", href: routes.contact },
  },
};
