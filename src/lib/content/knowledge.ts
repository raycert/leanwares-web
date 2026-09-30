import { industryRecords } from "@/content/industries";
import { knowledgePage, knowledgePlaceholders, knowledgeTopics, knowledgeTypeOrder, knowledgeTypes } from "@/content/knowledge";
import { standardsReference } from "@/content/standards";
import { getFormSubmission } from "../forms/config";
import { knowledgePath, plannedAnchors, routes } from "../routes";
import {
  capabilityLink,
  industryLink,
  isPillar,
  reductionGroupLink,
  standardsTopicLink,
} from "./taxonomy";
import type {
  CtaBandContent,
  KnowledgeDetailContent,
  KnowledgeListingContent,
  KnowledgeListItem,
  KnowledgeRecord,
} from "./types";

/*
 * Knowledge view-model mapping + publication rules (Phase 3D).
 *
 *  1. Public detail routes: publicationStatus "published" AND reviewStatus "approved" AND
 *     slug, title, summary and publishedAt present. assertRecord() fails the build when a
 *     record is marked published without them.
 *  2. Dates, authors, formats and sizes are shown only when the record carries them.
 *  3. Download UI only from a real downloadableAsset; otherwise the "unavailable" state
 *     (no "Tải tài liệu", no file type, no size, no icon).
 *  4. Related knowledge on public pages: published records only.
 */

const PLACEHOLDER_TITLE = { article: "[Tiêu đề bài viết]", resource: "[Tiêu đề tài liệu]" };

export function isPublished(record: KnowledgeRecord): boolean {
  return (
    record.publicationStatus === "published" &&
    record.reviewStatus === "approved" &&
    Boolean(record.slug && record.title && record.summary && record.publishedAt)
  );
}

export function assertRecord(record: KnowledgeRecord, all: KnowledgeRecord[]): void {
  const where = `knowledge "${record.id}"`;
  if (record.publicationStatus === "published" && !isPublished(record)) {
    throw new Error(`${where}: published records need reviewStatus "approved", a slug, title, summary and date.`);
  }
  const asset = record.downloadableAsset;
  if (asset && record.publicationStatus === "published" && (!asset.href || !asset.format || !asset.size)) {
    throw new Error(`${where}: a downloadable asset needs href, format and size.`);
  }
  const ids = new Set(all.map((r) => r.id));
  for (const id of [...record.relatedIds, ...record.body.flatMap((b) => (b.kind === "resource" ? [b.recordId] : []))]) {
    if (!ids.has(id)) throw new Error(`${where}: unknown related record "${id}".`);
  }
}

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const typeLabel = (record: Pick<KnowledgeRecord, "type" | "resourceKind">) =>
  record.type === "resource" && record.resourceKind ? record.resourceKind : knowledgeTypes[record.type].label;

/* ---- List item ------------------------------------------------------------------------ */

/** `routable`: whether detail links may be emitted (published records, or internal previews). */
export function toListItem(record: KnowledgeRecord, routable: boolean): KnowledgeListItem {
  const kind = record.type === "resource" ? "resource" : "article";
  const linked = routable && Boolean(record.slug || record.publicationStatus === "fixture");
  const asset = record.downloadableAsset;
  return {
    key: record.id,
    kind,
    type: record.type,
    typeLabel: typeLabel(record),
    title: record.title ?? PLACEHOLDER_TITLE[kind],
    summary: kind === "resource" ? (record.summary ?? undefined) : undefined,
    date: record.publishedAt ? formatDate(record.publishedAt) : undefined,
    meta: asset ? `${asset.format} · ${asset.size}` : undefined,
    href: linked && record.slug ? knowledgePath(record.slug) : null,
    status: linked ? undefined : record.publicationStatus === "fixture" ? undefined : knowledgePage.unpublishedStatus,
  };
}

/* ---- /kien-thuc (5q) -------------------------------------------------------------------- */

const defaultCta: CtaBandContent = knowledgePage.cta;

export function buildKnowledgeListing(
  records: KnowledgeRecord[],
  options: { preview?: boolean } = {},
): KnowledgeListingContent {
  records.forEach((r) => assertRecord(r, records));
  const published = records.filter(isPublished);
  const byId = new Map(records.map((r) => [r.id, r]));

  let items: KnowledgeListItem[];
  let placeholder = false;
  if (options.preview) {
    // Fixture rows exercise the tabs only; they never link.
    items = records.map((r) => toListItem(r, false));
  } else if (published.length) {
    items = published
      .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
      .map((r) => toListItem(r, true));
  } else {
    placeholder = true;
    items = knowledgePlaceholders.map((p, i) => {
      const record = p.recordId ? byId.get(p.recordId) : undefined;
      if (record) return toListItem(record, false);
      const kind = p.type === "resource" ? "resource" : "article";
      return {
        key: `placeholder-${i}`,
        kind,
        type: p.type,
        typeLabel: p.resourceKind ?? knowledgeTypes[p.type].label,
        title: PLACEHOLDER_TITLE[kind],
        summary: kind === "resource" ? "[Mô tả ngắn 1–2 câu]" : undefined,
        date: kind === "article" ? "[Ngày]" : undefined,
        href: null,
      };
    });
  }

  return {
    hero: knowledgePage.hero,
    tabs: {
      label: knowledgePage.tabsLabel,
      all: knowledgePage.allTab,
      items: knowledgeTypeOrder.map((key) => ({ key, label: knowledgeTypes[key].tab })),
    },
    items,
    placeholder,
    placeholderNote: knowledgePage.placeholderNote,
    standards: {
      id: plannedAnchors.knowledge.standards,
      title: standardsReference.title,
      note: standardsReference.note,
      items: standardsReference.order.map((id) => {
        const topic = standardsTopicLink(id);
        return { code: topic.code, label: topic.label, description: topic.description };
      }),
      reviewStatus: standardsReference.reviewStatus,
    },
    cta: defaultCta,
  };
}

/* ---- Detail (5r article / 5l resource) --------------------------------------------------- */

export function toKnowledgeDetail(
  record: KnowledgeRecord,
  all: KnowledgeRecord[],
  options: { preview?: boolean } = {},
): KnowledgeDetailContent {
  const byId = new Map(all.map((r) => [r.id, r]));
  const visible = (r: KnowledgeRecord) => options.preview || isPublished(r);
  const kind = record.type === "resource" ? "resource" : "article";
  const title = record.title ?? PLACEHOLDER_TITLE[kind];
  const topic = record.topic ? knowledgeTopics[record.topic] : null;

  const meta = [
    ...(record.publishedAt ? [{ label: kind === "resource" ? "Cập nhật" : "Ngày", value: formatDate(record.publishedAt) }] : []),
    ...(record.author ? [{ label: "Tác giả", value: record.author }] : []),
    ...(kind === "resource" && record.downloadableAsset
      ? [{ label: "Định dạng", value: record.downloadableAsset.format }]
      : []),
    ...(topic ? [{ label: "Chủ đề", value: topic }] : []),
  ];
  // Internal previews show where the missing metadata goes, as placeholders.
  if (options.preview && !record.publishedAt) meta.unshift({ label: "Ngày", value: "[NGÀY]" });
  if (options.preview && !record.author && kind === "article") meta.push({ label: "Tác giả", value: "[TÁC GIẢ]" });

  const embeds: KnowledgeDetailContent["embeds"] = {};
  for (const block of record.body) {
    if (block.kind !== "resource") continue;
    const target = byId.get(block.recordId);
    if (target) embeds[target.id] = toListItem(target, isPublished(target));
  }

  const asset = record.downloadableAsset;
  const related = [
    ...record.pillarIds.map((id) => ({ type: isPillar(id) ? "Trụ cột" : "Năng lực xuyên suốt", ...capabilityLink(id) })),
    ...record.reductionGroupIds.map((id) => ({ type: "Nhóm giải pháp", ...reductionGroupLink(id) })),
    ...record.industryIds.map((id) => ({ type: "Ngành", ...industryLink(id) })),
  ];
  const relatedKnowledge = record.relatedIds
    .map((id) => byId.get(id))
    .filter((r): r is KnowledgeRecord => Boolean(r && visible(r)))
    .map((r) => toListItem(r, isPublished(r)));

  return {
    kind,
    hero: {
      breadcrumb: [
        { label: "Trang chủ", href: routes.home },
        { label: "Kiến thức", href: routes.knowledge },
        { label: title },
      ],
      eyebrow: [typeLabel(record), topic].filter(Boolean).join(" · "),
      title,
      lead: record.summary ?? "[Đoạn dẫn 1–2 câu]",
      meta,
      image: record.featuredImage,
    },
    body: record.body,
    toc: record.body.flatMap((b) => (b.kind === "heading" ? [{ id: b.id, label: b.text }] : [])),
    embeds,
    resource:
      kind === "resource"
        ? {
            audience: record.resource?.audience ?? [],
            contents: record.resource?.contents ?? [],
            steps: record.resource?.steps ?? [],
            download: {
              state: asset ? (record.access === "gated" ? "gated" : "ungated") : "unavailable",
              asset,
              industries: [
                ...industryRecords.map((industry) => ({ value: industry.id, label: industry.name })),
                { value: "other", label: "Khác" },
              ],
              unavailableText: "Tài liệu chưa sẵn sàng để tải xuống.",
              contactLink: { label: "Liên hệ LEANWARES", href: routes.contact },
              submission: getFormSubmission("download"),
            },
          }
        : null,
    standards: record.standardsTopics.length
      ? {
          title: "Tiêu chuẩn / Framework liên quan",
          note: "Tham chiếu. Không phải danh mục dịch vụ.",
          items: record.standardsTopics.map((id) => {
            const topicLink = standardsTopicLink(id);
            return { code: topicLink.code, label: topicLink.label, href: topicLink.href };
          }),
        }
      : null,
    related: { title: "Giải pháp và ngành liên quan", items: related },
    relatedKnowledge: relatedKnowledge.length ? { title: "Nội dung liên quan", items: relatedKnowledge } : null,
    cta: defaultCta,
    fixtureNotice:
      record.publicationStatus === "fixture"
        ? "Bản xem trước nội bộ — dữ liệu mẫu (fixture), không phải nội dung của LEANWARES. Không hiển thị trên website."
        : undefined,
  };
}
