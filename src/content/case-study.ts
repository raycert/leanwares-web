import type { FeaturedProjectContent, ProjectTeaserContent } from "@/lib/content/types";
import { routes } from "@/lib/routes";

/*
 * Case-study placeholders. No LEANWARES project has been verified for publication yet, so
 * every value is [CASE DATA]. Do not replace with example numbers, names or dates.
 */

/** Full evidence block (FD v3 featured project): story, Baseline / After / Δ table, KPIs. */
export function caseStudyPlaceholder(eyebrow = "Dự án tiêu biểu"): FeaturedProjectContent {
  return {
    eyebrow,
    title: "[CASE DATA] Tên dự án và kết quả chính",
    meta: "Ngành / địa điểm: [CASE DATA]",
    image: { placeholder: "[ẢNH DỰ ÁN]" },
    measurementPoint: "Điểm đo: [CASE DATA]",
    story: [
      { label: "Thách thức", text: "[CASE DATA] Nội dung thách thức của dự án." },
      { label: "Cách tiếp cận", text: "[CASE DATA] Nội dung cách tiếp cận của dự án." },
      { label: "Giải pháp", text: "[CASE DATA] Nội dung giải pháp của dự án." },
      { label: "Kết quả", text: "[CASE DATA] Nội dung kết quả của dự án." },
    ],
    table: {
      caption: "Chỉ số dự án: đường cơ sở, sau dự án và mức thay đổi",
      columns: { indicator: "Chỉ số", baseline: "Đường cơ sở", after: "Sau dự án", delta: "Δ" },
      mobileLabels: { baseline: "Đường cơ sở", after: "Sau dự án", delta: "Mức thay đổi (Δ)" },
      rows: [1, 2, 3].map((n) => ({
        indicator: `[CASE DATA] Chỉ số ${n}`,
        baseline: "[CASE DATA]",
        after: "[CASE DATA]",
        delta: "[CASE DATA]",
      })),
    },
    kpis: [
      { value: "[CASE DATA]", label: "Kết quả chính", emphasis: true },
      { value: "[CASE DATA]", label: "Kết quả bổ sung", emphasis: false },
    ],
  };
}

/** Compact navy teaser (templates 5t / 5a–5c / 5d). */
export function projectTeaserPlaceholder(): ProjectTeaserContent {
  return {
    eyebrow: "Dự án tiêu biểu · [CASE DATA] Ngành",
    title: "[CASE DATA] Tên dự án",
    summary: "[CASE DATA] Thách thức và cách tiếp cận, 1–2 câu.",
    image: { placeholder: "[ẢNH DỰ ÁN TIÊU BIỂU 4:3]" },
    metrics: {
      baseline: "Đường cơ sở: [CASE DATA]",
      after: "Sau: [CASE DATA]",
      delta: "Δ: [CASE DATA]",
    },
    cta: { label: "Xem dự án", href: routes.projects },
  };
}
