import type { IndustryId, PillarId, ProjectRecord } from "@/lib/content/types";
import { industryRecords } from "../industries";

/*
 * INTERNAL FIXTURE, NOT A LEANWARES PROJECT.
 *
 * Exercises the Case Study Detail archetype and the project filters on internal preview
 * routes only (/foundation/case-study, /foundation/projects). It is never listed on /du-an
 * and has no public slug.
 *
 * Every factual field is null → rendered as "[CASE DATA]". Structural taxonomy IDs (pillar,
 * reduction group) resolve to real site sections only to exercise the "related" block; they
 * do not assert that such a project exists.
 */

const empty = { source: null, period: null, baselineDefinition: null, comparisonBasis: null } as const;

export const caseStudyFixture: ProjectRecord = {
  id: "fixture-case-study",
  slug: null,
  publication: "fixture",
  verification: "unverified",
  clientVisibility: "anonymous",
  clientName: null,
  clientDescriptor: null,
  title: null,
  industryId: null,
  pillarId: "factory",
  reductionGroupId: "energyEfficiency",
  location: null,
  year: null,
  scope: null,
  standards: null,
  challenge: null,
  dataBasis: null,
  approach: null,
  solution: null,
  resultSummary: null,
  image: { placeholder: "[ẢNH DỰ ÁN]" },
  metrics: [1, 2, 3].map((n) => ({
    name: null,
    unit: null,
    baseline: null,
    after: null,
    delta: null,
    kpi: n <= 2,
    ...empty,
    verification: "unverified" as const,
  })),
  detail: {
    context: null,
    challengeImage: { placeholder: "[ẢNH 3:2]" },
    dataInputs: [1, 2, 3].map(() => ({
      name: null,
      value: null,
      unit: null,
      source: null,
      period: null,
      verification: "unverified" as const,
    })),
    analysisSteps: [1, 2, 3, 4].map((n) => ({
      label: `Bước ${n}`,
      title: "[Công đoạn]",
      description: "[CASE DATA]",
    })),
    measures: [1, 2, 3].map(() => ({ title: null, note: null })),
    implementationSteps: [
      { label: "Bước 1", title: "Thử nghiệm (pilot)", description: "[CASE DATA]" },
      { label: "Bước 2", title: "Triển khai", description: "[CASE DATA]" },
      { label: "Bước 3", title: "Đo lường kết quả", description: "[CASE DATA]" },
    ],
    // No lessons in the fixture: the section must stay hidden when there is no content.
    measurementPoint: null,
  },
};

/**
 * Internal fixtures for the filter preview. They carry filter keys only (industry, pillar,
 * placeholder year) so the filter UI can be exercised; they stay unverified, so no fact renders.
 */
export function filterFixtures(): ProjectRecord[] {
  const groups: PillarId[] = ["factory", "product", "supplyChain"];
  const industryIds: IndustryId[] = industryRecords.slice(0, groups.length).map((industry) => industry.id);
  return groups.map((pillarId, i) => ({
    ...caseStudyFixture,
    id: `fixture-filter-${i + 1}`,
    pillarId,
    industryId: industryIds[i]!,
    year: `[NĂM ${(i % 2) + 1}]`,
  }));
}
