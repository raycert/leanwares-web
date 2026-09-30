import type { GhgFrameworkContent } from "@/lib/content/types";

/*
 * GHG reduction framework: Final Direction v3 (two phases, seven steps, feedback loop).
 * Shared by the homepage, /giai-phap (5t) and /giai-phap/giam-phat-thai.
 * All values are [CASE DATA] until verified.
 */
export const ghgFramework: GhgFrameworkContent = {
  eyebrow: "Khung giảm phát thải GHG",
  title: "Từ dữ liệu phát thải đến hành động giảm phát thải",
  lead: "Hai pha, bảy bước. Pha 1 xác lập đường cơ sở và điểm nóng. Pha 2 biến điểm nóng thành hành động và theo dõi kết quả.",
  baseline: "Đường cơ sở (tCO2e): [CASE DATA]",
  axisLabel: "Trục dọc: phát thải",
  phases: {
    1: { label: "Pha 1", title: "Phân tích carbon" },
    2: { label: "Pha 2", title: "Hành động giảm phát thải" },
  },
  steps: [
    { phase: 1, title: "Đo lường", description: "Thu thập dữ liệu năng lượng, nhiên liệu và vật liệu." },
    { phase: 1, title: "Phân tích", description: "Quy đổi và kiểm tra dữ liệu phát thải." },
    { phase: 1, title: "Xác định điểm nóng", description: "Chỉ ra nguồn và công đoạn phát thải lớn." },
    { phase: 2, title: "Xây dựng giải pháp", description: "Đề xuất biện pháp giảm phát thải." },
    { phase: 2, title: "Ưu tiên đầu tư", description: "Sắp xếp biện pháp theo hiệu quả và chi phí." },
    { phase: 2, title: "Triển khai", description: "Thực hiện biện pháp tại nhà máy." },
    { phase: 2, title: "Theo dõi", description: "Đo lường, kiểm chứng và báo cáo kết quả." },
  ],
  feedbackLoop:
    "Vòng phản hồi: kết quả bước Theo dõi trở thành đường cơ sở (baseline) mới cho chu kỳ tiếp theo.",
  summary: {
    baseline: "Đường cơ sở: [CASE DATA]",
    target: "Mục tiêu (tCO2e): [CASE DATA]",
    delta: "Δ: [CASE DATA]",
  },
};
