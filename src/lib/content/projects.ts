import type {
  CaseStudyContent,
  ProjectListItem,
  ProjectMetric,
  ProjectRecord,
  ProjectsListingContent,
} from "./types";
import { projectPath, routes } from "../routes";
import { capabilityLink, industryLink, isPillar, reductionGroupLink } from "./taxonomy";

/*
 * Project view-model mapping + evidence rules. Components receive only the view models.
 *
 * Rules applied here (see content/projects.ts):
 *  1. A record is public only if publication = "published", verification = "verified" and
 *     it has an approved slug and title. assertRecord() fails the build otherwise.
 *  2. Text of an unverified record is never shown as fact → "[CASE DATA]".
 *  3. A metric value is shown only when the metric is verified AND carries name, unit,
 *     source, period, baseline definition and comparison basis → otherwise "[CASE DATA]".
 *  4. Anonymous cases show only an approved descriptor; no name, no logo slot.
 *  5. Before / after bars are drawn only from verified numeric pairs (never illustrative).
 */

export const CASE_DATA = "[CASE DATA]";

/* ---- Rules ------------------------------------------------------------------------- */

export function isPublished(record: ProjectRecord): boolean {
  return (
    record.publication === "published" &&
    record.verification === "verified" &&
    Boolean(record.slug) &&
    Boolean(record.title)
  );
}

/** Build-time guard: misconfigured published records fail the build instead of shipping. */
export function assertRecord(record: ProjectRecord): void {
  const where = `project "${record.slug ?? record.title ?? "(untitled)"}"`;
  if (record.publication === "published" && record.verification !== "verified") {
    throw new Error(`${where}: published records must be verified.`);
  }
  if (record.publication === "published" && !record.slug) {
    throw new Error(`${where}: published records need an approved slug.`);
  }
  if (record.clientVisibility === "anonymous" && record.clientName) {
    throw new Error(`${where}: anonymous cases must not carry a client name.`);
  }
  if (record.publication === "published" && record.clientVisibility === "public" && !record.clientName) {
    throw new Error(`${where}: public cases need an approved client name.`);
  }
  for (const metric of record.metrics) {
    const hasValue = metric.baseline || metric.after || metric.delta;
    if (hasValue && metric.verification === "verified" && !metricIsPublishable(metric)) {
      throw new Error(`${where}: verified metric "${metric.name}" is missing evidence metadata.`);
    }
  }
}

export function metricIsPublishable(metric: ProjectMetric): boolean {
  return (
    metric.verification === "verified" &&
    [metric.name, metric.unit, metric.source, metric.period, metric.baselineDefinition, metric.comparisonBasis].every(
      Boolean,
    )
  );
}

/** Text of a record: shown only when the record is verified. */
const text = (record: ProjectRecord, value: string | null, placeholder: string) =>
  record.verification === "verified" && value ? value : placeholder;

const metricValue = (metric: ProjectMetric, value: string | null) =>
  metricIsPublishable(metric) && value ? value : CASE_DATA;

/* ---- List item (5v / LWProjectItem) -------------------------------------------------- */

export function toListItem(record: ProjectRecord, key: string): ProjectListItem {
  const industry = record.verification === "verified" && record.industryId ? industryLink(record.industryId).label : null;
  const location = record.verification === "verified" ? record.location : null;
  const hasDetail = isPublished(record) && record.detail !== null && Boolean(record.slug);

  return {
    key,
    eyebrow: [industry ?? `${CASE_DATA} Ngành`, location].filter(Boolean).join(" · "),
    title: text(record, record.title, `${CASE_DATA} Tên dự án`),
    challenge: text(record, record.challenge, `${CASE_DATA} Bối cảnh và thách thức, 1–2 câu.`),
    facts: [
      { label: "Dữ liệu", value: text(record, record.dataBasis, CASE_DATA) },
      { label: "Phân tích", value: text(record, record.approach, CASE_DATA) },
      { label: "Giải pháp", value: text(record, record.solution, CASE_DATA) },
      { label: "Kết quả", value: text(record, record.resultSummary, CASE_DATA) },
    ],
    image: record.image,
    href: hasDetail && record.slug ? projectPath(record.slug) : null,
    filters: {
      industry: record.industryId,
      group: record.pillarId,
      year: record.year,
    },
  };
}

/* ---- Case study detail (5f) ---------------------------------------------------------- */

export function toCaseStudy(record: ProjectRecord): CaseStudyContent {
  const detail = record.detail;
  const verified = record.verification === "verified";
  const title = text(record, record.title, `${CASE_DATA} Tên dự án và kết quả chính`);
  const industryName = record.industryId ? industryLink(record.industryId).label : null;
  const industry = verified && industryName ? industryName : `${CASE_DATA} Ngành`;

  // Client line: public name, or approved anonymous descriptor. Never a blank slot.
  const client =
    verified && record.clientVisibility === "public" && record.clientName
      ? record.clientName
      : verified && record.clientVisibility === "anonymous" && record.clientDescriptor
        ? record.clientDescriptor
        : null;

  const meta = [
    ...(client ? [{ label: "Khách hàng", value: client }] : []),
    {
      label: "Ngành / địa điểm",
      value: verified && (industryName || record.location)
        ? [industryName, record.location].filter(Boolean).join(" · ")
        : CASE_DATA,
    },
    { label: "Thời gian", value: text(record, record.year, CASE_DATA) },
    { label: "Phạm vi", value: text(record, record.scope, CASE_DATA) },
    { label: "Chuẩn áp dụng", value: text(record, record.standards, CASE_DATA) },
  ];

  const kpiMetrics = record.metrics.filter((m) => m.kpi);
  const publishable = record.metrics.filter(metricIsPublishable);
  const bars = publishable.flatMap((m) => {
    const baseline = Number.parseFloat(m.baseline ?? "");
    const after = Number.parseFloat(m.after ?? "");
    return Number.isFinite(baseline) && Number.isFinite(after) && m.name && m.unit
      ? [{ label: m.name, baseline, after, unit: m.unit }]
      : [];
  });

  const pillar = record.pillarId ? capabilityLink(record.pillarId) : null;
  const group = record.reductionGroupId ? reductionGroupLink(record.reductionGroupId) : null;
  const related = [
    ...(pillar && record.pillarId
      ? [{ type: isPillar(record.pillarId) ? "Trụ cột" : "Năng lực xuyên suốt", label: pillar.label, href: pillar.href }]
      : []),
    ...(group ? [{ type: "Nhóm giải pháp", label: group.label, href: group.href }] : []),
    ...(group ? [{ type: "Giải pháp", label: "Giảm phát thải", href: routes.emissionReduction }] : []),
  ];

  return {
    hero: {
      breadcrumb: [
        { label: "Trang chủ", href: routes.home },
        { label: "Dự án", href: routes.projects },
        { label: title },
      ],
      eyebrow: `Dự án · ${industry}`,
      title,
      context: text(record, detail?.context ?? null, `${CASE_DATA} Bối cảnh dự án, 1–2 câu.`),
      meta,
      image: record.image,
      measurementPoint: detail ? `Điểm đo: ${text(record, detail.measurementPoint ?? null, CASE_DATA)}` : null,
    },
    sections: {
      challenge: {
        title: "Thách thức",
        text: text(record, record.challenge, `${CASE_DATA} Bối cảnh, yêu cầu của khách hàng và rào cản.`),
        image: detail?.challengeImage,
      },
      data: {
        title: "Dữ liệu & đường cơ sở",
        intro: "Chỉ dữ liệu đầu vào đã được kiểm chứng được hiển thị. Mỗi giá trị đi kèm nguồn và kỳ đo.",
        columns: { name: "Dữ liệu đầu vào", value: "Giá trị", unit: "Đơn vị", evidence: "Nguồn · kỳ đo" },
        rows: (detail?.dataInputs ?? []).map((input) => {
          const ok = input.verification === "verified" && input.source && input.period;
          return {
            name: ok && input.name ? input.name : `${CASE_DATA} Dữ liệu`,
            value: ok && input.value ? input.value : CASE_DATA,
            unit: ok && input.unit ? input.unit : CASE_DATA,
            evidence: ok ? `${input.source} · ${input.period}` : CASE_DATA,
          };
        }),
      },
      analysis: {
        title: "Phân tích",
        text: text(record, record.approach, `${CASE_DATA} Phương pháp, phạm vi đo, chuẩn áp dụng.`),
        steps: detail?.analysisSteps ?? [],
      },
      solution: {
        title: "Giải pháp",
        text: text(record, record.solution, `${CASE_DATA} Các biện pháp đã triển khai.`),
        measures: (detail?.measures ?? []).map((m) => ({
          title: text(record, m.title, `${CASE_DATA} Biện pháp đã triển khai`),
          note: text(record, m.note, CASE_DATA),
        })),
      },
      implementation: detail && detail.implementationSteps.length > 0
        ? { title: "Triển khai", steps: detail.implementationSteps }
        : null,
      results: {
        title: "Kết quả",
        kpis: (kpiMetrics.length ? kpiMetrics : [null, null]).map((m, i) => ({
          value: m ? metricValue(m, m.delta && m.unit ? `${m.delta} ${m.unit}` : null) : CASE_DATA,
          label: m && metricIsPublishable(m) && m.name ? m.name : i === 0 ? "Kết quả chính" : "Kết quả bổ sung",
          emphasis: i === 0,
        })),
        table: {
          caption: "Chỉ số dự án: đường cơ sở, sau dự án và mức thay đổi",
          columns: { indicator: "Chỉ số", baseline: "Đường cơ sở", after: "Sau dự án", delta: "Δ" },
          mobileLabels: { baseline: "Đường cơ sở", after: "Sau dự án", delta: "Mức thay đổi (Δ)" },
          rows: record.metrics.map((m, i) => ({
            indicator: metricIsPublishable(m) ? `${m.name} (${m.unit})` : `${CASE_DATA} Chỉ số ${i + 1}`,
            baseline: metricValue(m, m.baseline),
            after: metricValue(m, m.after),
            delta: metricValue(m, m.delta),
          })),
        },
        evidenceNote: publishable.length
          ? publishable
              .map((m) => `${m.name}: ${m.source}; kỳ đo ${m.period}; đường cơ sở: ${m.baselineDefinition}; so sánh: ${m.comparisonBasis}.`)
              .join(" ")
          : `Nguồn dữ liệu, kỳ đo, định nghĩa đường cơ sở và cơ sở so sánh: ${CASE_DATA}.`,
        bars,
      },
      lessons:
        verified && detail?.lessons && detail.lessons.length > 0
          ? { title: "Bài học & bước tiếp theo", items: detail.lessons }
          : null,
    },
    related: { title: "Giải pháp liên quan", items: related },
    cta: {
      title: "Nhà máy của bạn có thể giảm bao nhiêu phát thải?",
      cta: { label: "Đăng ký đánh giá sơ bộ", href: routes.contact },
    },
    fixtureNotice:
      record.publication === "fixture"
        ? "Bản xem trước nội bộ — dữ liệu mẫu (fixture), không phải dự án của LEANWARES. Không hiển thị trên website."
        : undefined,
  };
}

/* ---- Listing --------------------------------------------------------------------- */

export function buildListing(
  page: Omit<ProjectsListingContent, "featured" | "items" | "placeholder">,
  records: ProjectRecord[],
  placeholder: () => ProjectRecord,
): ProjectsListingContent {
  records.forEach(assertRecord);
  if (records.length === 0) {
    return {
      ...page,
      placeholder: true,
      featured: toListItem(placeholder(), "placeholder-featured"),
      items: [1, 2, 3].map((n) => toListItem(placeholder(), `placeholder-${n}`)),
    };
  }
  const [first, ...rest] = records.map((record, i) => toListItem(record, record.slug ?? `record-${i}`));
  return { ...page, placeholder: false, featured: first!, items: rest.length ? rest : [first!] };
}
