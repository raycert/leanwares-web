import { challengeAreas, industriesPage, industryRecords } from "@/content/industries";
import { standardsTopics } from "@/content/standards";
import { projectTeaserPlaceholder } from "@/content/case-study";
import { reductionGroupOrder } from "@/content/solution-groups";
import { industryPath, routes } from "../routes";
import { assertRecord, isPublished, toListItem } from "./projects";
import { capabilityLink, industryLink, isPillar, reductionGroupLink, reductionGroupSummary } from "./taxonomy";
import type {
  CtaBandContent,
  IndustriesOverviewContent,
  IndustryDetailContent,
  IndustryRecord,
  ProjectRecord,
} from "./types";

/*
 * Industry view-model mapping (Phase 3C). Components receive only these view models.
 *
 * Rules:
 *  - Only "approved" standards relationships are rendered; "proposed" ones stay in the
 *    content file for LEANWARES review. No approved relationship → the subsection is omitted.
 *  - Challenge areas, pillars and reduction groups come only from the record's ID mappings.
 *  - Related projects: verified + published only (explicit relatedProjectIds, plus projects
 *    tagged with the industry). None → a truthful empty state, never a placeholder card.
 */

const PLACEHOLDER = "[NỘI DUNG]";

const defaultCta: CtaBandContent = {
  title: "Nhà máy của bạn có thể giảm bao nhiêu phát thải?",
  cta: { label: "Đăng ký đánh giá sơ bộ", href: routes.contact },
};

const pad = (n: number) => String(n).padStart(2, "0");

const approvedStandards = (record: IndustryRecord) =>
  record.standardsTopics.filter((link) => link.status === "approved").map((link) => standardsTopics[link.topic]);

/** Build-time guard: explicit project links must point at existing project records. */
function relatedProjects(record: IndustryRecord, projects: ProjectRecord[]): ProjectRecord[] {
  const ids = new Set(projects.map((p) => p.id));
  for (const id of record.relatedProjectIds) {
    if (!ids.has(id)) throw new Error(`industry "${record.slug}": unknown related project id "${id}".`);
  }
  projects.forEach(assertRecord);
  return projects.filter(
    (p) => isPublished(p) && (record.relatedProjectIds.includes(p.id) || p.industryId === record.id),
  );
}

/* ---- /nganh (5u) ---------------------------------------------------------------------- */

export function toIndustriesOverview(): IndustriesOverviewContent {
  const { hero, explorerLabel, insightLabels, problems } = industriesPage;
  return {
    hero: {
      breadcrumb: [{ label: "Trang chủ", href: routes.home }, { label: "Ngành" }],
      ...hero,
    },
    explorer: {
      label: explorerLabel,
      linkLabel: "Xem giải pháp theo ngành",
      items: industryRecords.map((record, index) => {
        const market = approvedStandards(record).map((topic) => topic.code);
        return {
          number: pad(index + 1),
          name: record.name,
          href: industryPath(record.slug),
          image: { ...record.image, placeholder: `[ẢNH NGÀNH 4:3] ${record.name}` },
          insights: [
            // Emission hotspots are plant data: stays a placeholder until LEANWARES supplies it.
            { label: insightLabels.hotspots, value: PLACEHOLDER },
            { label: insightLabels.market, value: market.length ? market.join(" · ") : PLACEHOLDER },
            {
              label: insightLabels.groups,
              value: record.reductionGroupIds.length
                ? record.reductionGroupIds.map((id) => reductionGroupLink(id).label).join(" · ")
                : PLACEHOLDER,
            },
          ],
        };
      }),
    },
    problems,
    project: projectTeaserPlaceholder(),
    cta: defaultCta,
  };
}

/* ---- /nganh/[slug] (5e) --------------------------------------------------------------- */

export function toIndustryDetail(record: IndustryRecord, projects: ProjectRecord[]): IndustryDetailContent {
  const standards = approvedStandards(record);
  const related = relatedProjects(record, projects);

  return {
    hero: {
      breadcrumb: [
        { label: "Trang chủ", href: routes.home },
        { label: "Ngành", href: routes.industries },
        { label: record.name },
      ],
      eyebrow: "Giải pháp theo ngành",
      title: record.name,
      lead: record.heroLead,
      image: record.image,
    },
    context: { title: "Bối cảnh ngành", text: record.context },
    challenges: record.challengeAreas.length
      ? {
          title: "Lĩnh vực thách thức thường gặp",
          note: "Mô tả định tính. Mức độ và điểm nóng cụ thể được xác định qua dữ liệu của từng nhà máy.",
          items: record.challengeAreas.map((id) => ({
            title: challengeAreas[id].label,
            description: challengeAreas[id].description,
          })),
        }
      : null,
    standards: standards.length
      ? {
          title: "Yêu cầu thị trường và quy định",
          note: "Tham chiếu theo ngành. Không phải danh mục dịch vụ.",
          items: standards.map((topic) => ({ code: topic.code, label: topic.label, description: topic.description })),
        }
      : null,
    pillars: {
      title: "Trụ cột & năng lực liên quan",
      items: record.pillarIds.map((id) => ({
        type: isPillar(id) ? "Trụ cột" : "Năng lực xuyên suốt",
        ...capabilityLink(id),
      })),
    },
    groups: record.reductionGroupIds.length
      ? {
          title: "Giải pháp ưu tiên cho ngành",
          items: record.reductionGroupIds.map((id) => ({
            number: pad(reductionGroupOrder.indexOf(id) + 1),
            title: reductionGroupLink(id).label,
            description: reductionGroupSummary(id),
            href: reductionGroupLink(id).href,
          })),
        }
      : null,
    projects: {
      title: "Dự án liên quan",
      items: related.map((p, i) => toListItem(p, p.slug ?? `record-${i}`)),
      emptyText:
        "Chưa có dự án đã được xác minh để công bố trong ngành này. Dự án sẽ được bổ sung khi dữ liệu được LEANWARES xác minh.",
    },
    others: {
      title: "Các ngành khác",
      items: industryRecords.filter((r) => r.id !== record.id).map((r) => industryLink(r.id)),
    },
    cta: defaultCta,
    reviewStatus: record.reviewStatus === "draft" ? "draft" : undefined,
  };
}
