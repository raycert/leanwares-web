import { industryRecords } from "@/content/industries";
import { crossCutting, pillars } from "@/content/pillars";
import { reductionGroupData, reductionGroupHref } from "@/content/solution-groups";
import { standardsTopics } from "@/content/standards";
import { anchor, industryPath, plannedAnchors, routes } from "../routes";
import type { CapabilityId, IndustryId, IndustryRecord, LinkItem, ReductionGroupId, StandardsTopicId } from "./types";

/*
 * Shared taxonomy resolver. Content modules store normalized IDs only (IndustryId,
 * CapabilityId, ReductionGroupId); names, slugs and hrefs are resolved here, so no
 * content module imports another's records and no name / slug is duplicated.
 */

const industryById = new Map(industryRecords.map((record) => [record.id, record]));

// Build-time guard: IDs and slugs must be unique.
if (industryById.size !== industryRecords.length || new Set(industryRecords.map((r) => r.slug)).size !== industryRecords.length) {
  throw new Error("content/industries.ts: duplicate industry id or slug.");
}

export function getIndustryRecord(id: IndustryId): IndustryRecord {
  const record = industryById.get(id);
  if (!record) throw new Error(`Unknown industry id "${id}".`);
  return record;
}

export function industryLink(id: IndustryId): LinkItem {
  const record = getIndustryRecord(id);
  return { label: record.name, href: industryPath(record.slug) };
}

/** The three pillars + two cross-cutting layers, in approved order. */
export const capabilityOrder: CapabilityId[] = ["factory", "product", "supplyChain", "esg", "managementSystems"];

export function capabilityLink(id: CapabilityId): LinkItem {
  const item = id === "esg" || id === "managementSystems" ? crossCutting[id] : pillars[id];
  return { label: item.title, href: anchor(routes.solutions, item.id) };
}

export const isPillar = (id: CapabilityId) => id === "factory" || id === "product" || id === "supplyChain";

export function reductionGroupLink(id: ReductionGroupId): LinkItem {
  return { label: reductionGroupData[id].title, href: reductionGroupHref(id) };
}

export function reductionGroupSummary(id: ReductionGroupId): string {
  return reductionGroupData[id].summary;
}

/** Standards topic: code + label; links to the reference section on /kien-thuc. */
export function standardsTopicLink(id: StandardsTopicId): LinkItem & { code: string; description: string } {
  const topic = standardsTopics[id];
  return {
    code: topic.code,
    label: topic.label,
    description: topic.description,
    href: anchor(routes.knowledge, plannedAnchors.knowledge.standards),
  };
}
