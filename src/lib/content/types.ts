/*
 * Content schema. Presentation components depend only on these types, never on where
 * the data comes from. In V1 the data lives in src/content; a CMS adapter can later
 * return the same shapes from the getters in ./index.ts.
 *
 * Placeholder convention: unverified values stay as visible bracketed strings,
 * e.g. "[CASE DATA]", "[Tiêu đề bài viết]", "[ẢNH THẬT]". Never replace them with
 * plausible-looking sample values.
 */

/**
 * Aspect ratios approved in DS V3: 4:5, 3:2, 4:3, 6:5, 16:9, 1:1.
 * 21:9, 21:8 and 3:4 appear only in approved page templates (5d–5i, 5l) and are used as
 * component-specific treatments (e.g. FeaturedProject tablet media), not as general rules.
 */
export type ImageRatio = "4:5" | "3:2" | "4:3" | "6:5" | "16:9" | "1:1" | "21:9" | "21:8" | "3:4";

export interface ImageAsset {
  src: string;
  /** Describes the on-site content (DS V3: no stock photos, descriptive alt required). */
  alt: string;
}

/** An image position: the approved photo if supplied, otherwise a visible placeholder label. */
export interface ImageContent {
  image?: ImageAsset;
  placeholder: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

/* ---- Site chrome ----------------------------------------------------------- */

export interface NavItem extends LinkItem {
  /** `solutions` opens the mega menu; `contact` renders as the outlined item. */
  kind?: "solutions" | "contact";
}

export interface MenuColumn {
  /** "01"–"03" for the pillars. */
  number?: string;
  /** Small label above the title, e.g. "NĂNG LỰC XUYÊN SUỐT". */
  eyebrow?: string;
  title: string;
  href: string;
  items: LinkItem[];
}

export interface SiteChrome {
  skipLinkLabel: string;
  homeLabel: string;
  primaryNav: NavItem[];
  megaMenu: {
    columns: MenuColumn[];
    allLink: LinkItem;
  };
  mobileMenu: {
    openLabel: string;
    closeLabel: string;
    cta: LinkItem;
  };
  footer: {
    companyName: string;
    groups: MenuColumn[];
    legal: LinkItem[];
    legalLabel: string;
    copyright: string;
  };
}

/* ---- Homepage (Final Direction v3) ----------------------------------------- */

export interface HeroContent {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  image: ImageContent;
}

export interface MarketPressureContent {
  eyebrow: string;
  title: string;
  questions: string[];
}

export interface PillarContent {
  /** In-page anchor id. */
  id: string;
  title: string;
  /** Desktop lead. */
  lead: string;
  /** FD v3 tablet shortens some leads. Defaults to `lead`. */
  tabletLead?: string;
  /** FD v3 mobile folds the topics into one sentence. Defaults to `tabletLead ?? lead`. */
  mobileLead?: string;
  /** Scope topics (pillar scope, not the service catalogue; decision C3). Desktop only. */
  topics: string[];
}

export interface SolutionPillarsContent {
  eyebrow: string;
  title: string;
  factory: PillarContent & { image: ImageContent };
  product: PillarContent & {
    lifecycleLabel: string;
    lifecycle: string[];
  };
  supplyChain: PillarContent & {
    tiersLabel: string;
    tiers: Array<{ label: string; nodes: number }>;
    diagramNote: string;
  };
}

export interface CrossCuttingContent {
  eyebrow: string;
  title: string;
  items: Array<{ title: string; description: string; href: string; ctaLabel: string }>;
}

export interface GhgStep {
  title: string;
  description: string;
  phase: 1 | 2;
}

export interface GhgFrameworkContent {
  /** Optional link shown under the lead, e.g. to the GHG reduction landing page. */
  link?: LinkItem;
  eyebrow: string;
  title: string;
  lead: string;
  baseline: string;
  axisLabel: string;
  phases: Record<1 | 2, { label: string; title: string }>;
  steps: GhgStep[];
  feedbackLoop: string;
  /** null: value row hidden (no verified values). */
  summary: { baseline: string; target: string; delta: string } | null;
}

export interface SolutionGroupsContent {
  eyebrow: string;
  title: string;
  groups: LinkItem[];
}

export interface IndustryItem {
  name: string;
  href: string;
  image: ImageContent;
  /** /nganh overview only (template 5u). */
  number?: string;
  insights?: Array<{ label: string; value: string }>;
}

export interface IndustryExplorerContent {
  eyebrow: string;
  title: string;
  industries: IndustryItem[];
}

export interface FeaturedProjectContent {
  eyebrow: string;
  title: string;
  meta: string;
  image: ImageContent;
  measurementPoint: string;
  story: Array<{ label: string; text: string }>;
  table: {
    caption: string;
    columns: { indicator: string; baseline: string; after: string; delta: string };
    /** Mobile row labels. */
    mobileLabels: { baseline: string; after: string; delta: string };
    rows: Array<{ indicator: string; baseline: string; after: string; delta: string }>;
  };
  kpis: Array<{ value: string; label: string; emphasis: boolean }>;
}

export interface ArticleTeaser {
  type: string;
  title: string;
  href: string;
}

export interface KnowledgeTeaserContent {
  eyebrow: string;
  title: string;
  allLink: LinkItem;
  featured: ArticleTeaser & { image: ImageContent };
  articles: ArticleTeaser[];
  resource: {
    type: string;
    title: string;
    format: string;
    cta: LinkItem;
  };
}

export interface CtaBandContent {
  title: string;
  cta: LinkItem;
}

export interface HomepageContent {
  hero: HeroContent;
  marketPressure: MarketPressureContent;
  pillars: SolutionPillarsContent;
  crossCutting: CrossCuttingContent;
  ghgFramework: GhgFrameworkContent;
  solutionGroups: SolutionGroupsContent;
  industries: IndustryExplorerContent;
  /** null: hidden by the publication policy (placeholder content, lib/content/publication.ts). */
  featuredProject: FeaturedProjectContent | null;
  knowledge: KnowledgeTeaserContent | null;
  finalCta: CtaBandContent;
}

/* ---- Shared inner-page shapes (Phase 3A) ------------------------------------ */

/**
 * Marks copy drafted during implementation to fill an approved layout (not from the design
 * boards). It must be reviewed by LEANWARES before launch. Never used for quantitative claims.
 */
export type ReviewStatus = "draft";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page. */
  href?: string;
}

export interface PageHeroContent {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta?: LinkItem;
  secondaryCta?: LinkItem;
  /** With an image: 5a/5d layout (copy + 4:5 photo). Without: 5t layout (title + lead). */
  image?: ImageContent;
  reviewStatus?: ReviewStatus;
}

export interface SectionHeaderContent {
  eyebrow?: string;
  title: string;
  lead?: string;
}

export interface ProcessStep {
  label: string;
  title: string;
  description: string;
}

export interface ProcessContent extends SectionHeaderContent {
  steps: ProcessStep[];
  reviewStatus?: ReviewStatus;
}

export interface ProjectTeaserContent {
  eyebrow: string;
  title: string;
  summary: string;
  image: ImageContent;
  metrics: { baseline: string; after: string; delta: string };
  cta: LinkItem;
}

/* ---- /giai-phap (template 5t) -------------------------------------------------- */

export interface PillarOverviewItem {
  id: string;
  number: string;
  title: string;
  lead: string;
  /** Pillar scope (Final Direction v3). */
  scopeLabel: string;
  scope: string[];
  /** Capability areas (FD v3 navigation lists). Not individual services. */
  capabilitiesLabel: string;
  capabilities: string[];
  image: ImageContent;
}

export interface CrossCuttingOverviewItem {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Visible placeholder while the service catalogue awaits business verification. */
  pendingServices?: string;
}

export interface SolutionsOverviewContent {
  hero: PageHeroContent;
  pillars: { eyebrow: string; items: PillarOverviewItem[] };
  crossCutting: SectionHeaderContent & {
    id: string;
    supportLabel: string;
    pillarNames: string[];
    items: CrossCuttingOverviewItem[];
  };
  services: (SectionHeaderContent & {
    note: string;
    groups: Array<{ pillar: string; items: string[] }>;
  }) | null;
  ghgFramework: GhgFrameworkContent;
  project: ProjectTeaserContent | null;
  cta: CtaBandContent;
}

/* ---- /giai-phap/giam-phat-thai (dedicated landing archetype) -------------------- */

export interface ReductionGroup {
  id: string;
  number: string;
  title: string;
  summary: string;
  detailPlaceholder?: string;
  pillar: LinkItem;
}

export interface PriorityCriterion {
  name: string;
  term: string;
  question: string;
}

export interface EmissionReductionContent {
  hero: PageHeroContent;
  measurement: ProcessContent;
  framework: GhgFrameworkContent;
  groupsIndex: SolutionGroupsContent;
  groups: { pillarLabel: string; items: ReductionGroup[]; reviewStatus?: ReviewStatus };
  prioritisation: SectionHeaderContent & {
    columns: { criterion: string; question: string };
    criteria: PriorityCriterion[];
    note: string;
    reviewStatus?: ReviewStatus;
  };
  implementation: ProcessContent;
  caseStudy: FeaturedProjectContent | null;
  cta: CtaBandContent;
}

/* ---- Projects & case studies (Phase 3B) --------------------------------------- */

/**
 * Verification of a project record or a single metric.
 *  - unverified: nothing may be displayed as fact.
 *  - in-review: supplied by LEANWARES, awaiting sign-off (still not displayed as fact).
 *  - verified: approved for publication.
 * Only `verified` values are ever rendered; everything else renders as "[CASE DATA]".
 */
export type VerificationStatus = "unverified" | "in-review" | "verified";

/** Whether the client may be named. Anonymous cases never show a name or a logo slot. */
export type ClientVisibility = "public" | "anonymous";

/** Evidence metadata every quantitative result must carry before it can be published. */
export interface EvidenceMeta {
  /** Where the number comes from, e.g. meter log, invoice, audit report. */
  source: string | null;
  /** Measurement period, e.g. "01/2025–12/2025". */
  period: string | null;
  /** How the baseline was defined (boundary, year, normalisation). */
  baselineDefinition: string | null;
  /** What "after" is compared against (same period, per unit of output …). */
  comparisonBasis: string | null;
  verification: VerificationStatus;
}

/** A quantitative result: Baseline → After → Δ, with its unit and evidence. */
export interface ProjectMetric extends EvidenceMeta {
  name: string | null;
  unit: string | null;
  baseline: string | null;
  after: string | null;
  delta: string | null;
  /** Shown as a KPI block in the results section. */
  kpi?: boolean;
}

/** A verified input shown in the "Dữ liệu / đường cơ sở" section of a case study. */
export interface ProjectDataInput extends Omit<EvidenceMeta, "baselineDefinition" | "comparisonBasis"> {
  name: string | null;
  value: string | null;
  unit: string | null;
}

export interface CaseStudyNarrative {
  /** Hero context paragraph. */
  context: string | null;
  challengeImage?: ImageContent;
  dataInputs: ProjectDataInput[];
  analysisSteps: ProcessStep[];
  measures: Array<{ title: string | null; note: string | null }>;
  implementationSteps: ProcessStep[];
  /** Rendered only when present. */
  lessons?: string[];
  /** Annotated measurement point on the hero photo (desktop). */
  measurementPoint?: string | null;
}

/**
 * Canonical project record (content/projects.ts). Presentation components never receive
 * this directly; lib/content/projects.ts maps it to list / detail view models and applies
 * the evidence rules.
 */
export interface ProjectRecord {
  /** Stable record id (referenced by IndustryRecord.relatedProjectIds). */
  id: string;
  /** Approved URL slug. Null until LEANWARES approves one; never invented. */
  slug: string | null;
  /**
   * published: listed on /du-an and routable at /du-an/[slug] (requires verification = verified).
   * fixture: internal preview only (/foundation), never listed or routed publicly.
   */
  publication: "published" | "fixture";
  verification: VerificationStatus;
  clientVisibility: ClientVisibility;
  /** Public cases only. */
  clientName: string | null;
  /** Anonymous cases: approved wording such as a sector descriptor. Never generated. */
  clientDescriptor: string | null;
  title: string | null;
  /** Shared taxonomy ids (resolved to labels / links in lib/content/taxonomy.ts). */
  industryId: IndustryId | null;
  pillarId: CapabilityId | null;
  reductionGroupId: ReductionGroupId | null;
  location: string | null;
  year: string | null;
  /** Scope / standards shown in the case-study meta row. */
  scope: string | null;
  standards: string | null;
  /** Bối cảnh → Dữ liệu → Phân tích → Giải pháp → Kết quả */
  challenge: string | null;
  dataBasis: string | null;
  approach: string | null;
  solution: string | null;
  resultSummary: string | null;
  image: ImageContent;
  metrics: ProjectMetric[];
  /** Case-study detail availability. */
  detail: CaseStudyNarrative | null;
}

/* View models ---------------------------------------------------------------------- */

export interface ProjectListItem {
  key: string;
  eyebrow: string;
  title: string;
  challenge: string;
  /** Dữ liệu / Phân tích / Giải pháp / Kết quả rows. */
  facts: Array<{ label: string; value: string }>;
  image: ImageContent;
  /** Only when a published detail page exists. */
  href: string | null;
  /** Filter keys (empty for placeholders). */
  filters: { industry: IndustryId | null; group: CapabilityId | null; year: string | null };
}

export interface ProjectFilterConfig {
  industryLabel: string;
  groupLabel: string;
  yearLabel: string;
  allYears: string;
  clearLabel: string;
  openLabel: string;
  closeLabel: string;
  /** Result count, "{count}" is replaced (plain string so it can cross to the client). */
  resultTemplate: string;
  industries: Array<{ key: IndustryId; label: string }>;
  groups: Array<{ key: CapabilityId; label: string }>;
}

export interface ProjectsListingContent {
  hero: PageHeroContent;
  method: ProcessContent;
  featured: ProjectListItem | null;
  items: ProjectListItem[];
  /** True when items are layout placeholders (no verified projects yet). */
  placeholder: boolean;
  placeholderNote: string;
  /** Honest empty state shown when there is nothing publishable and placeholders are hidden. */
  emptyNote?: string;
  cta: CtaBandContent;
}

export interface CaseStudyContent {
  hero: {
    breadcrumb: BreadcrumbItem[];
    eyebrow: string;
    title: string;
    context: string;
    meta: Array<{ label: string; value: string }>;
    image: ImageContent;
    measurementPoint: string | null;
  };
  sections: {
    challenge: { title: string; text: string; image?: ImageContent };
    data: {
      title: string;
      intro: string;
      columns: { name: string; value: string; unit: string; evidence: string };
      rows: Array<{ name: string; value: string; unit: string; evidence: string }>;
    };
    analysis: { title: string; text: string; steps: ProcessStep[] };
    solution: { title: string; text: string; measures: Array<{ title: string; note: string }> };
    implementation: { title: string; steps: ProcessStep[] } | null;
    results: {
      title: string;
      kpis: Array<{ value: string; label: string; emphasis: boolean }>;
      table: FeaturedProjectContent["table"];
      evidenceNote: string;
      /** Verified numeric pairs only; drives the before/after bars. */
      bars: Array<{ label: string; baseline: number; after: number; unit: string }>;
    };
    lessons: { title: string; items: string[] } | null;
  };
  related: { title: string; items: Array<{ type: string; label: string; href: string }> };
  cta: CtaBandContent;
  /** Internal fixture banner (never set for published records). */
  fixtureNotice?: string;
}

/* ---- Shared taxonomy (Phase 3C) -------------------------------------------------- */

/** The six approved V1 industries. Do not add industries without approval. */
export type IndustryId =
  | "steelMetals"
  | "woodFurniture"
  | "paperPackaging"
  | "foodAgriculture"
  | "industrialManufacturing"
  | "industrialParks";

export type PillarId = "factory" | "product" | "supplyChain";
/** Three pillars + the two cross-cutting layers (Site Summary V3: 5 service groups). */
export type CapabilityId = PillarId | "esg" | "managementSystems";

/** The eight homepage solution groups (anchors on /giai-phap/giam-phat-thai). */
export type ReductionGroupId =
  | "energyEfficiency"
  | "processOptimisation"
  | "fuelSwitching"
  | "renewableEnergy"
  | "biomassBiochar"
  | "waterManagement"
  | "wasteCircularity"
  | "supplyChain";

export type ChallengeAreaId = "energy" | "fuel" | "materials" | "water" | "waste" | "emissions" | "supplyChain";

export type StandardsTopicId = "cbam" | "eudr" | "iso50001" | "ghgAccounting" | "esgSupplier";

/**
 * A standards / regulatory relationship. Only "approved" relationships are rendered;
 * "proposed" ones are kept for LEANWARES review and never shown.
 */
export interface IndustryStandardsLink {
  topic: StandardsTopicId;
  status: "approved" | "proposed";
  /** Where the relationship comes from (design source, or why it is proposed). */
  basis: string;
}

/** Canonical industry record (content/industries.ts). */
export interface IndustryRecord {
  id: IndustryId;
  slug: string;
  name: string;
  shortName: string;
  /** One line for the /nganh explorer. */
  summary: string;
  heroLead: string;
  /** Industry context paragraph (qualitative only; no statistics). */
  context: string;
  image: ImageContent;
  challengeAreas: ChallengeAreaId[];
  pillarIds: CapabilityId[];
  reductionGroupIds: ReductionGroupId[];
  standardsTopics: IndustryStandardsLink[];
  /** Explicit project links; projects tagged with this industryId are added by the getter. */
  relatedProjectIds: string[];
  reviewStatus: ReviewStatus | "approved";
}

export interface IndustriesOverviewContent {
  hero: PageHeroContent;
  /** `linkLabel` opens the selected industry (desktop) or the expanded one (mobile accordion). */
  explorer: { label: string; items: IndustryItem[]; linkLabel: string };
  problems: SectionHeaderContent & { items: string[] };
  project: ProjectTeaserContent | null;
  cta: CtaBandContent;
}

export interface IndustryDetailContent {
  hero: PageHeroContent;
  context: { title: string; text: string };
  challenges: { title: string; note: string; items: Array<{ title: string; description: string }> } | null;
  standards: { title: string; note: string; items: Array<{ code: string; label: string; description: string }> } | null;
  pillars: { title: string; items: Array<{ type: string; label: string; href: string }> };
  groups: { title: string; items: Array<{ number: string; title: string; description: string; href: string }> } | null;
  projects: { title: string; items: ProjectListItem[]; emptyText: string };
  others: { title: string; items: LinkItem[] };
  cta: CtaBandContent;
  /** Copy and taxonomy mappings drafted for V1, pending LEANWARES review. */
  reviewStatus?: ReviewStatus;
}

/* ---- Knowledge (Phase 3D) ---------------------------------------------------------- */

/** The five V1 content types (Site Summary V3 "Bài viết" + "Tài liệu"). */
export type KnowledgeTypeId = "analysis" | "guide" | "regulatory" | "technical" | "resource";

/** Topic vocabulary (5k topic filter). */
export type KnowledgeTopicId =
  | "carbonGhg"
  | "cbam"
  | "energy"
  | "esg"
  | "eudr"
  | "product"
  | "supplyChain"
  | "greenFactory";

/** Publication gate: only "published" + reviewStatus "approved" becomes a public route. */
export type PublicationStatus = "published" | "unpublished" | "fixture";

/** A real, downloadable file. Absent → no "Tải xuống", no file type, no size, no icon. */
export interface DownloadableAsset {
  href: string;
  /** e.g. "PDF", "PDF + XLSX". */
  format: string;
  /** e.g. "2,4 MB". */
  size: string;
}

export type KnowledgeBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; id: string; text: string }
  /** Technical callout: a definition or data note. Use sparingly. */
  | { kind: "callout"; label: string; text: string }
  /** Embeds another knowledge record (resource card) by id. */
  | { kind: "resource"; recordId: string }
  | { kind: "source"; text: string };

export interface ResourceDetail {
  audience: Array<{ title: string; description: string }>;
  contents: string[];
  steps: ProcessStep[];
}

/** Canonical knowledge record (content/knowledge.ts). */
export interface KnowledgeRecord {
  id: string;
  slug: string | null;
  type: KnowledgeTypeId;
  /** Resource sub-kind shown in the eyebrow (5k types: Checklist, Hướng dẫn, Biểu mẫu …). */
  resourceKind?: string;
  title: string | null;
  summary: string | null;
  /** ISO date (YYYY-MM-DD). Never invented: null until supplied. */
  publishedAt: string | null;
  author: string | null;
  topic: KnowledgeTopicId | null;
  industryIds: IndustryId[];
  pillarIds: CapabilityId[];
  reductionGroupIds: ReductionGroupId[];
  standardsTopics: StandardsTopicId[];
  featuredImage: ImageContent;
  access: "ungated" | "gated";
  downloadableAsset: DownloadableAsset | null;
  body: KnowledgeBlock[];
  resource?: ResourceDetail;
  relatedIds: string[];
  reviewStatus: ReviewStatus | "approved";
  publicationStatus: PublicationStatus;
}

export interface KnowledgeListItem {
  key: string;
  kind: "article" | "resource";
  type: KnowledgeTypeId;
  typeLabel: string;
  title: string;
  summary?: string;
  /** Date label, e.g. "12/10/2026"; omitted when unknown. */
  date?: string;
  /** Resource meta: only real format / size, never invented. */
  meta?: string;
  href: string | null;
  /** Shown instead of a link when there is no public detail page. */
  status?: string;
}

export interface KnowledgeListingContent {
  hero: PageHeroContent;
  tabs: { all: string; items: Array<{ key: KnowledgeTypeId; label: string }>; label: string };
  items: KnowledgeListItem[];
  placeholder: boolean;
  placeholderNote: string;
  emptyNote?: string;
  standards: {
    id: string;
    title: string;
    note: string;
    items: Array<{ code: string; label: string; description: string }>;
    reviewStatus?: ReviewStatus;
  };
  cta: CtaBandContent;
}

/** Gated / ungated download panel (LWGatedForm). */
export interface DownloadPanelContent {
  state: "ungated" | "gated" | "unavailable";
  asset: DownloadableAsset | null;
  industries: Array<{ value: string; label: string }>;
  unavailableText: string;
  contactLink: LinkItem;
  submission: FormSubmissionConfig;
}

export interface KnowledgeDetailContent {
  kind: "article" | "resource";
  hero: {
    breadcrumb: BreadcrumbItem[];
    eyebrow: string;
    title: string;
    lead: string;
    meta: Array<{ label: string; value: string }>;
    image: ImageContent;
  };
  body: KnowledgeBlock[];
  toc: Array<{ id: string; label: string }>;
  /** Resolved resource cards embedded in the body, by record id. */
  embeds: Record<string, KnowledgeListItem>;
  resource: (ResourceDetail & { download: DownloadPanelContent }) | null;
  standards: { title: string; note: string; items: Array<{ code: string; label: string; href: string }> } | null;
  related: { title: string; items: Array<{ type: string; label: string; href: string }> };
  relatedKnowledge: { title: string; items: KnowledgeListItem[] } | null;
  cta: CtaBandContent;
  fixtureNotice?: string;
}

/* ---- Forms (Phase 3D) ------------------------------------------------------------- */

/**
 * How a form is delivered. "unconfigured": no backend chosen yet → the form validates but
 * never reports success. "endpoint": POST JSON to an approved first-party endpoint (later).
 */
export type FormSubmissionConfig = { mode: "unconfigured"; notice: string } | { mode: "endpoint"; url: string };

export interface ContactFormContent {
  title: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    topic: string;
    message: string;
    consent: string;
  };
  placeholders: { industry: string; topic: string; message: string };
  optionalLabel: string;
  industries: Array<{ value: string; label: string }>;
  topics: Array<{ value: string; label: string }>;
  privacyLink: LinkItem;
  submitLabel: string;
  sendingLabel: string;
  errors: { required: string; email: string; phone: string; consent: string; summary: string };
  successText: string;
  failureText: string;
  submission: FormSubmissionConfig;
}

export interface ContactPageContent {
  hero: { eyebrow: string; title: string; lead: string; reviewStatus?: ReviewStatus };
  nextSteps: { title: string; steps: ProcessStep[] };
  /** Verified contact fields only; empty → the block is not rendered. */
  details: Array<{ label: string; value: string; href?: string }>;
  form: ContactFormContent;
}

/* ---- About (Phase 3D) ------------------------------------------------------------- */

export interface AboutPageContent {
  hero: PageHeroContent;
  who: null | { title: string; text: string; reviewStatus?: ReviewStatus };
  focus: { title: string; items: Array<{ number: string; title: string; description: string; href: string }> };
  approach: { title: string; items: Array<{ number: string; title: string; description: string }> };
  capabilities: { title: string; items: Array<{ number: string; title: string; description: string }> };
  /** Approved milestones only; null → not rendered. */
  timeline: { title: string; steps: ProcessStep[] } | null;
  /** Verified credentials only; null → not rendered. */
  credentials: { title: string; items: string[] } | null;
  cta: CtaBandContent;
}

/* ---- Legal (Phase 3D) ------------------------------------------------------------- */

export type LegalPageId = "privacy" | "terms" | "cookies";

export interface LegalPageContent {
  id: LegalPageId;
  breadcrumb: BreadcrumbItem[];
  title: string;
  /** "Cập nhật lần cuối: …"; null when there is no approved version date. */
  updated: string | null;
  /** Shown above draft (unapproved) text on staging. */
  draftNotice?: string;
  tabs: Array<{ label: string; href: string; current: boolean }>;
  tabsLabel: string;
  tocLabel: string;
  /** Approved legal sections only. Empty → the placeholder is shown. */
  sections: Array<{ id: string; title: string; paragraphs: string[] }>;
  placeholder: string;
}
