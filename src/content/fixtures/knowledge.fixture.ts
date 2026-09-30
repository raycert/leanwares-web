import type { KnowledgeRecord } from "@/lib/content/types";

/*
 * INTERNAL FIXTURES, NOT LEANWARES CONTENT.
 *
 * Exercise the Knowledge listing (tabs), the Article (5r) and Resource (5l) archetypes on
 * internal preview routes only (/foundation/knowledge, /foundation/article,
 * /foundation/resource). Never listed on /kien-thuc; no public slug.
 *
 * Every visible value is a bracketed placeholder. The resource fixture carries a fixture
 * asset only so the gated-form state can be previewed; its href is not a file, and with no
 * form backend configured the form never reaches the download state.
 */

const base = {
  slug: null,
  publishedAt: null,
  author: null,
  featuredImage: { placeholder: "[ẢNH 21:9] ảnh đầu bài" },
  access: "ungated" as const,
  downloadableAsset: null,
  relatedIds: [],
  reviewStatus: "draft" as const,
  publicationStatus: "fixture" as const,
};

export const articleFixture: KnowledgeRecord = {
  ...base,
  id: "fixture-article",
  type: "analysis",
  title: "[Tiêu đề bài viết, tối đa hai dòng]",
  summary: "[Đoạn dẫn 1–2 câu]",
  topic: "cbam",
  industryIds: ["steelMetals"],
  pillarIds: ["product"],
  reductionGroupIds: ["energyEfficiency"],
  standardsTopics: ["cbam", "ghgAccounting"],
  body: [
    { kind: "paragraph", text: "[Đoạn mở đầu, 60–80 từ]" },
    { kind: "heading", id: "muc-1", text: "[Tiêu đề mục 1]" },
    { kind: "paragraph", text: "[Đoạn nội dung, 60–80 từ]" },
    { kind: "callout", label: "[Ghi chú kỹ thuật]", text: "[Định nghĩa hoặc lưu ý dữ liệu, 1–2 câu]" },
    { kind: "resource", recordId: "fixture-resource" },
    { kind: "heading", id: "muc-2", text: "[Tiêu đề mục 2]" },
    { kind: "paragraph", text: "[Đoạn nội dung, 60–80 từ]" },
    { kind: "source", text: "Nguồn: [NGUỒN DỮ LIỆU]" },
  ],
  relatedIds: ["fixture-guide", "fixture-resource"],
};

export const resourceFixture: KnowledgeRecord = {
  ...base,
  id: "fixture-resource",
  type: "resource",
  resourceKind: "[LOẠI TÀI LIỆU]",
  title: "[Tiêu đề tài liệu]",
  summary: "[Mô tả ngắn 1–2 câu]",
  topic: "carbonGhg",
  industryIds: [],
  pillarIds: ["factory"],
  reductionGroupIds: [],
  standardsTopics: ["ghgAccounting"],
  featuredImage: { placeholder: "[TRANG BÌA TÀI LIỆU]" },
  access: "gated",
  downloadableAsset: { href: "#fixture-asset", format: "[ĐỊNH DẠNG]", size: "[DUNG LƯỢNG]" },
  body: [],
  resource: {
    audience: [1, 2, 3].map((n) => ({ title: `[Vai trò ${n}]`, description: "[Mô tả vai trò sử dụng 1 câu]" })),
    contents: ["[Mục 1]", "[Mục 2]", "[Mục 3]", "[Mục 4]"],
    steps: [1, 2, 3].map((n) => ({ label: `Bước ${n}`, title: "[Tên bước]", description: "[NỘI DUNG 1–2 câu]" })),
  },
  relatedIds: ["fixture-article"],
};

export const guideFixture: KnowledgeRecord = {
  ...base,
  id: "fixture-guide",
  type: "guide",
  title: "[Tiêu đề hướng dẫn]",
  summary: "[Đoạn dẫn 1–2 câu]",
  topic: "energy",
  industryIds: [],
  pillarIds: [],
  reductionGroupIds: [],
  standardsTopics: [],
  body: [],
};

export const knowledgeFixtures: KnowledgeRecord[] = [
  articleFixture,
  resourceFixture,
  guideFixture,
  { ...guideFixture, id: "fixture-regulatory", type: "regulatory", title: "[Tiêu đề cập nhật quy định]" },
  { ...guideFixture, id: "fixture-technical", type: "technical", title: "[Tiêu đề góc nhìn kỹ thuật]" },
];
