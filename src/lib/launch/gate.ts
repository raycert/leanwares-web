import { existsSync } from "node:fs";
import { join } from "node:path";
import { company } from "@/content/company";
import { contactConsent, legalDocuments } from "@/content/legal";
import { pageSeo } from "@/content/seo";
import { brandAssets, logo } from "../brand";
import {
  getAboutPage,
  getContactPage,
  getEmissionReduction,
  getHomepage,
  getIndustriesOverview,
  getIndustryDetail,
  getIndustrySlugs,
  getKnowledgeListing,
  getLegalPage,
  getProjectsListing,
  getSiteChrome,
  getSolutionsOverview,
} from "../content";
import { getFormSubmission } from "../forms/config";
import { industryPath, routes } from "../routes";
import { getPublicationPolicy, getSiteMode, hasConfiguredSiteUrl } from "../site";

/*
 * Launch gate (docs/LAUNCH_READINESS.md, docs/DEPLOYMENT_MODES.md).
 *
 * Runs at build time from the root layout:
 *   development  → not enforced.
 *   staging      → the build fails on staging blockers (visible placeholder text, draft
 *                  copy without LW_ALLOW_DRAFT=1, missing LW_SITE_URL, missing logo unless
 *                  LW_ALLOW_LOGO_FALLBACK=1 for an internal review build).
 *   production   → the build fails on ANY open item below.
 * The checks read the same view models the pages render, after the publication policy.
 */

export interface LaunchIssue {
  blocks: "staging" | "production";
  area: string;
  detail: string;
}

const TOKEN = /\[[^[\]\n"]{2,80}\]/g;

async function publicViews(): Promise<Array<[string, unknown]>> {
  const industries = await Promise.all(
    (await getIndustrySlugs()).map(async (slug) => [industryPath(slug), await getIndustryDetail(slug)] as [string, unknown]),
  );
  return [
    ["chrome", await getSiteChrome()],
    [routes.home, await getHomepage()],
    [routes.solutions, await getSolutionsOverview()],
    [routes.emissionReduction, await getEmissionReduction()],
    [routes.industries, await getIndustriesOverview()],
    ...industries,
    [routes.projects, await getProjectsListing()],
    [routes.knowledge, await getKnowledgeListing()],
    [routes.about, await getAboutPage()],
    [routes.contact, await getContactPage()],
    [routes.privacy, await getLegalPage("privacy")],
    [routes.terms, await getLegalPage("terms")],
    [routes.cookies, await getLegalPage("cookies")],
  ];
}

function countEmptyImages(value: unknown): number {
  if (Array.isArray(value)) return value.reduce((n: number, v) => n + countEmptyImages(v), 0);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record);
    if (keys.includes("placeholder") && keys.every((k) => k === "placeholder" || k === "image")) return record.image ? 0 : 1;
    return Object.values(record).reduce((n: number, v) => n + countEmptyImages(v), 0);
  }
  return 0;
}

export async function collectLaunchIssues(): Promise<LaunchIssue[]> {
  const policy = getPublicationPolicy();
  const issues: LaunchIssue[] = [];
  const add = (blocks: LaunchIssue["blocks"], area: string, detail: string) => issues.push({ blocks, area, detail });

  if (!hasConfiguredSiteUrl()) add("staging", "config", "LW_SITE_URL is not set (canonical URLs, sitemap, Open Graph).");

  let images = 0;
  for (const [route, view] of await publicViews()) {
    const json = JSON.stringify(view);
    const tokens = [...new Set(json.match(TOKEN) ?? [])];
    if (tokens.length) add("staging", route, `visible placeholder text: ${tokens.join(", ")}`);
    if (!policy.allowDraft && json.includes('"reviewStatus":"draft"')) add("staging", route, "draft copy (reviewStatus \"draft\") awaiting approval");
    if (policy.allowDraft && json.includes('"reviewStatus":"draft"')) add("production", route, "draft copy (reviewStatus \"draft\") awaiting approval");
    images += countEmptyImages(view);
  }
  for (const [route, entry] of Object.entries(pageSeo)) {
    if (entry.reviewStatus === "draft") add(policy.allowDraft ? "production" : "staging", route, "draft meta description");
  }

  if (images) add("production", "images", `${images} image slots without an approved photo (docs/IMAGE_REQUIREMENTS.md)`);
  const logoFile = logo.available && existsSync(join(process.cwd(), "public", logo.src));
  if (!logoFile || !logo.approved) {
    // Requires an APPROVED logo asset in any format (SVG, PNG or JPG), not specifically SVG.
    // LW_ALLOW_LOGO_FALLBACK=1 only relaxes staging for internal review builds; never production.
    add(
      process.env.LW_ALLOW_LOGO_FALLBACK === "1" ? "production" : "staging",
      "brand",
      !logoFile ? `approved logo asset missing (${logo.src}, src/lib/brand.ts)` : "logo asset not approved (src/lib/brand.ts)",
    );
  }
  if (!brandAssets.favicon) add("production", "brand", "favicon / app icon not supplied");
  if (!brandAssets.socialImage) add("production", "brand", "default social preview image not supplied");
  if (![company.address, company.email, company.phone].some(Boolean)) add("production", "contact", "no verified contact details");
  for (const [id, doc] of Object.entries(legalDocuments)) {
    if (doc.status !== "approved") add("production", "legal", `${doc.title} (${id}) not approved`);
  }
  if (contactConsent.status !== "approved") add("production", "legal", "contact-form consent text not approved");
  if (getFormSubmission("contact").mode === "unconfigured") add("production", "forms", "contact form backend not configured");

  return issues;
}

/** Throws (failing the build) when the current mode's blockers are open. */
export async function assertLaunchGate(): Promise<void> {
  const mode = getSiteMode();
  if (mode === "development") return;
  const issues = (await collectLaunchIssues()).filter((i) => mode === "production" || i.blocks === "staging");
  if (issues.length) {
    const list = issues.map((i) => `  - [${i.blocks}] ${i.area}: ${i.detail}`).join("\n");
    throw new Error(`Launch gate (${mode}): ${issues.length} open item(s)\n${list}\nSee docs/LAUNCH_READINESS.md.`);
  }
}
