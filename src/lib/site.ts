/*
 * Launch modes and environment configuration (docs/DEPLOYMENT_MODES.md).
 *
 *  development  local work: placeholders, draft copy and internal previews all visible.
 *  staging      public preview: real navigation; placeholder sections hidden; draft copy
 *               only with LW_ALLOW_DRAFT=1; always noindex, nofollow.
 *  production   approved, publishable content only; the build fails on any remaining
 *               placeholder or draft (lib/launch/gate.ts); indexing only with
 *               LW_ALLOW_INDEXING=1 (explicit approval).
 *
 * Environment variables (all optional in development; see .env.example):
 *  LW_SITE_MODE          development | staging | production
 *  LW_SITE_URL           absolute origin, e.g. https://www.example.vn (canonical, sitemap, OG)
 *  LW_ALLOW_DRAFT        "1": staging may show copy marked reviewStatus "draft"
 *  LW_ALLOW_INDEXING     "1": production may be indexed (explicit approval only)
 *  LW_INTERNAL_PREVIEW   "1": /foundation/* fixture previews in a non-production build
 *  LW_ALLOW_LOGO_FALLBACK "1": internal review build may use the text logo fallback (staging only)
 *  LW_CONTACT_FORM_ENDPOINT  first-party endpoint for the contact form (not set yet)
 */

export type SiteMode = "development" | "staging" | "production";

const MODES: SiteMode[] = ["development", "staging", "production"];

export function getSiteMode(): SiteMode {
  const value = process.env.LW_SITE_MODE as SiteMode | undefined;
  if (value && MODES.includes(value)) return value;
  // Unset: local dev server → development; any production build → staging (safe default:
  // noindex, placeholders hidden). Production must be chosen explicitly.
  return process.env.NODE_ENV === "production" ? "staging" : "development";
}

const LOCAL_URL = "http://localhost:3000";

/** Absolute site origin without a trailing slash. */
export function getSiteUrl(): string {
  return (process.env.LW_SITE_URL || LOCAL_URL).replace(/\/+$/, "");
}

export function hasConfiguredSiteUrl(): boolean {
  return Boolean(process.env.LW_SITE_URL);
}

/** Search indexing: production only, and only after explicit approval. */
export function isIndexable(): boolean {
  return getSiteMode() === "production" && process.env.LW_ALLOW_INDEXING === "1";
}

export interface PublicationPolicy {
  mode: SiteMode;
  /** Visible placeholder sections ([CASE DATA], [NỘI DUNG], image labels …). */
  showPlaceholders: boolean;
  /** Copy marked reviewStatus "draft". */
  allowDraft: boolean;
}

/** The single content-visibility rule for the whole site (applied in lib/content). */
export function getPublicationPolicy(): PublicationPolicy {
  const mode = getSiteMode();
  switch (mode) {
    case "development":
      return { mode, showPlaceholders: true, allowDraft: true };
    case "staging":
      return { mode, showPlaceholders: false, allowDraft: process.env.LW_ALLOW_DRAFT === "1" };
    case "production":
      return { mode, showPlaceholders: false, allowDraft: false };
  }
}

/** Internal fixture previews (/foundation/*): never in production mode. */
export function isInternalPreviewEnabled(): boolean {
  if (getSiteMode() === "production") return false;
  return process.env.NODE_ENV !== "production" || process.env.LW_INTERNAL_PREVIEW === "1";
}
