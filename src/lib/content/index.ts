import { aboutPage } from "@/content/about";
import { companyContactRows } from "@/content/company";
import { contactPage } from "@/content/contact";
import { emissionReduction } from "@/content/emission-reduction";
import { caseStudyFixture, filterFixtures } from "@/content/fixtures/case-study.fixture";
import { articleFixture, knowledgeFixtures, resourceFixture } from "@/content/fixtures/knowledge.fixture";
import { homepage } from "@/content/home";
import { industryRecords } from "@/content/industries";
import { knowledgeRecords } from "@/content/knowledge";
import { contactConsent, legalDocuments, legalLabels, legalOrder } from "@/content/legal";
import { siteChrome } from "@/content/navigation";
import { placeholderProject, projects, projectsPage } from "@/content/projects";
import { solutionsOverview } from "@/content/solutions";
import { getFormSubmission } from "../forms/config";
import { routes } from "../routes";
import { getPublicationPolicy } from "../site";
import { toIndustriesOverview, toIndustryDetail } from "./industries";
import { buildKnowledgeListing, isPublished as isPublishedKnowledge, toKnowledgeDetail } from "./knowledge";
import { assertRecord, buildListing, isPublished, toCaseStudy, toListItem } from "./projects";
import {
  CONSENT_PENDING,
  EMPTY_STATES,
  LEGAL_PENDING,
  LEGAL_TOKEN,
  isVisible,
  labelOnly,
  publicView,
} from "./publication";
import type {
  AboutPageContent,
  CaseStudyContent,
  ContactPageContent,
  EmissionReductionContent,
  GhgFrameworkContent,
  HomepageContent,
  IndustriesOverviewContent,
  IndustryDetailContent,
  KnowledgeDetailContent,
  KnowledgeListingContent,
  LegalPageContent,
  LegalPageId,
  ProjectFilterConfig,
  ProjectsListingContent,
  SiteChrome,
  SolutionsOverviewContent,
} from "./types";

/*
 * Content access layer. Routes call these getters and pass the result down as props.
 * V1 reads static modules from src/content; a CMS adapter can replace the bodies later
 * (same return types) without changing any presentation component.
 *
 * Every public getter applies the publication policy (lib/content/publication.ts):
 * placeholder-only sections are hidden outside development; image slots without an
 * approved photo become neutral; legal text awaiting approval becomes a neutral note.
 */

const PLACEHOLDER = /\[(NỘI DUNG|CASE DATA)[^\]]*\]/;

/** Concept diagram: keep the labels, drop the "[CASE DATA]" values and the value row. */
const stagedGhg = (framework: GhgFrameworkContent): GhgFrameworkContent => ({
  ...framework,
  baseline: labelOnly(framework.baseline),
  summary: null,
});

export async function getSiteChrome(): Promise<SiteChrome> {
  return siteChrome;
}

export async function getHomepage(): Promise<HomepageContent> {
  return publicView(homepage, (c) => ({
    ...c,
    ghgFramework: stagedGhg(c.ghgFramework),
    // No verified project; no published article (the teaser is built from placeholders).
    featuredProject: null,
    knowledge: null,
  }));
}

/** /giai-phap (template 5t). */
export async function getSolutionsOverview(): Promise<SolutionsOverviewContent> {
  return publicView(solutionsOverview, (c) => ({
    ...c,
    // Service catalogue awaits business verification (placeholders only).
    crossCutting: { ...c.crossCutting, items: c.crossCutting.items.map((item) => ({ ...item, pendingServices: undefined })) },
    services: null,
    ghgFramework: stagedGhg(c.ghgFramework),
    project: null,
  }));
}

/** /giai-phap/giam-phat-thai (GHG reduction landing). */
export async function getEmissionReduction(): Promise<EmissionReductionContent> {
  return publicView(emissionReduction, (c) => ({
    ...c,
    framework: stagedGhg(c.framework),
    groups: { ...c.groups, items: c.groups.items.map((group) => ({ ...group, detailPlaceholder: undefined })) },
    prioritisation: { ...c.prioritisation, note: labelOnly(c.prioritisation.note) },
    caseStudy: null,
  }));
}

/* ---- Projects (Phase 3B) ---- */

const { filters, ...listingPage } = projectsPage;

function publishedProjects() {
  projects.forEach(assertRecord);
  return projects.filter(isPublished);
}

/** /du-an: verified, published projects only; placeholders (dev) or an honest empty state. */
export async function getProjectsListing(): Promise<ProjectsListingContent> {
  return publicView(buildListing(listingPage, publishedProjects(), placeholderProject), (c) =>
    c.placeholder ? { ...c, featured: null, items: [], placeholderNote: "", emptyNote: EMPTY_STATES.projects } : c,
  );
}

export async function getProjectFilters(): Promise<ProjectFilterConfig> {
  return filters;
}

/** Slugs for /du-an/[slug] (static params). Empty until a project is verified. */
export async function getPublishedProjectSlugs(): Promise<string[]> {
  return publishedProjects().flatMap((p) => (p.slug && p.detail ? [p.slug] : []));
}

export async function getCaseStudy(slug: string): Promise<CaseStudyContent | null> {
  const record = publishedProjects().find((p) => p.slug === slug && p.detail);
  return record ? publicView(toCaseStudy(record)) : null;
}

/** INTERNAL: fixture detail + listing for /foundation previews. Never used by public routes. */
export async function getCaseStudyFixture(): Promise<CaseStudyContent> {
  return toCaseStudy(caseStudyFixture);
}

export async function getProjectsPreview(): Promise<ProjectsListingContent> {
  const base = buildListing(listingPage, [], placeholderProject);
  return { ...base, placeholder: false, items: filterFixtures().map((record, i) => toListItem(record, `fixture-${i}`)) };
}

/* ---- Industries (Phase 3C) ---- */

/** /nganh (template 5u). */
export async function getIndustriesOverview(): Promise<IndustriesOverviewContent> {
  return publicView(toIndustriesOverview(), (c) => ({
    ...c,
    explorer: {
      ...c.explorer,
      // Insight rows without supplied content are left out, not shown as [NỘI DUNG].
      items: c.explorer.items.map((item) => ({ ...item, insights: item.insights?.filter((row) => !PLACEHOLDER.test(row.value)) })),
    },
    project: null,
  }));
}

/** Slugs for /nganh/[slug] (static params): the six canonical industries. */
export async function getIndustrySlugs(): Promise<string[]> {
  return industryRecords.map((record) => record.slug);
}

/** /nganh/[slug] (template 5e). Related projects: verified and published only. */
export async function getIndustryDetail(slug: string): Promise<IndustryDetailContent | null> {
  const record = industryRecords.find((r) => r.slug === slug);
  return record ? publicView(toIndustryDetail(record, projects)) : null;
}

/* ---- Knowledge (Phase 3D) ---- */

/** /kien-thuc (template 5q): published, approved records only; placeholders (dev) or empty state. */
export async function getKnowledgeListing(): Promise<KnowledgeListingContent> {
  return publicView(buildKnowledgeListing(knowledgeRecords), (c) =>
    c.placeholder ? { ...c, items: [], placeholderNote: "", emptyNote: EMPTY_STATES.knowledge } : c,
  );
}

/** Slugs for /kien-thuc/[slug] (static params). Empty until a record is published. */
export async function getKnowledgeSlugs(): Promise<string[]> {
  return knowledgeRecords.filter(isPublishedKnowledge).flatMap((r) => (r.slug ? [r.slug] : []));
}

export async function getKnowledgeDetail(slug: string): Promise<KnowledgeDetailContent | null> {
  const record = knowledgeRecords.filter(isPublishedKnowledge).find((r) => r.slug === slug);
  return record ? publicView(toKnowledgeDetail(record, knowledgeRecords)) : null;
}

/** INTERNAL: fixtures for /foundation previews. Never used by public routes. */
export async function getKnowledgePreview(): Promise<KnowledgeListingContent> {
  return buildKnowledgeListing(knowledgeFixtures, { preview: true });
}

export async function getKnowledgeFixture(kind: "article" | "resource"): Promise<KnowledgeDetailContent> {
  return toKnowledgeDetail(kind === "article" ? articleFixture : resourceFixture, knowledgeFixtures, { preview: true });
}

/* ---- About, contact, legal (Phase 3D) ---- */

export async function getAboutPage(): Promise<AboutPageContent> {
  const strip = <T extends { description: string }>(item: T): T =>
    PLACEHOLDER.test(item.description) ? { ...item, description: "" } : item;
  return publicView(aboutPage, (c) => ({
    ...c,
    who: c.who && PLACEHOLDER.test(c.who.text) ? null : c.who,
    approach: { ...c.approach, items: c.approach.items.map(strip) },
    capabilities: { ...c.capabilities, items: c.capabilities.items.map(strip) },
  }));
}

export async function getContactPage(): Promise<ContactPageContent> {
  const policy = getPublicationPolicy();
  const consentShown = contactConsent.text && isVisible(contactConsent.status === "approved" ? "approved" : "draft");
  const consent = consentShown
    ? contactConsent.text!
    : policy.showPlaceholders
      ? `${LEGAL_TOKEN} Nội dung đồng ý xử lý dữ liệu cá nhân.`
      : CONSENT_PENDING;
  return publicView({
    ...contactPage,
    details: companyContactRows(),
    form: { ...contactPage.form, fields: { ...contactPage.form.fields, consent }, submission: getFormSubmission("contact") },
  });
}

export async function getLegalPage(id: LegalPageId): Promise<LegalPageContent> {
  const policy = getPublicationPolicy();
  const doc = legalDocuments[id];
  const shown = doc.status === "approved" || (doc.status === "draft" && policy.allowDraft);
  const date = doc.updated ? doc.updated.split("-").reverse().join("/") : null;
  return {
    id,
    breadcrumb: [{ label: "Trang chủ", href: routes.home }, { label: doc.title }],
    title: doc.title,
    updated:
      shown && date ? `${legalLabels.updatedPrefix} ${date}` : policy.showPlaceholders ? `${legalLabels.updatedPrefix} [NGÀY]` : null,
    draftNotice: shown && doc.status === "draft" ? legalLabels.draftNotice : undefined,
    tabs: legalOrder.map((key) => ({ label: legalDocuments[key].title, href: legalDocuments[key].href, current: key === id })),
    tabsLabel: legalLabels.tabs,
    tocLabel: legalLabels.toc,
    sections: shown ? doc.sections : [],
    placeholder: policy.showPlaceholders ? LEGAL_TOKEN : LEGAL_PENDING,
  };
}

export type * from "./types";
