import { getPublicationPolicy, type PublicationPolicy } from "../site";

/*
 * Content publication rule (Phase 4). The ONLY place where visibility of unfinished content
 * is decided; components never branch on the site mode.
 *
 *   approved     → shown in every mode.
 *   draft        → development; staging only with LW_ALLOW_DRAFT=1; never production
 *                  (the launch gate fails the build instead of shipping it).
 *   placeholder  → development only. In staging / production the getter either hides the
 *                  section (returns null) or, when hiding would break the page structure,
 *                  replaces it with a neutral state (image slots without labels, honest
 *                  empty-state copy, legal "pending approval" note).
 *   fixture      → internal preview routes only (/foundation/*, lib/site.ts).
 *
 * Getters in lib/content/index.ts call publicView() with a page-specific "hide" function.
 */

export type ContentState = "approved" | "draft" | "placeholder" | "fixture";

export function isVisible(state: ContentState, policy: PublicationPolicy = getPublicationPolicy()): boolean {
  switch (state) {
    case "approved":
      return true;
    case "draft":
      return policy.allowDraft;
    case "placeholder":
      return policy.showPlaceholders;
    case "fixture":
      return false;
  }
}

/** Neutral staging copy for legal text that awaits approval (never presented as policy). */
export const LEGAL_PENDING = "Văn bản đang chờ LEANWARES phê duyệt.";
export const CONSENT_PENDING = "Nội dung đồng ý xử lý dữ liệu đang chờ LEANWARES phê duyệt.";

/** Legal placeholder token used in development. */
export const LEGAL_TOKEN = "[NỘI DUNG PHÁP LÝ CẦN DUYỆT]";

/** Honest empty states (neutral, claim nothing). */
export const EMPTY_STATES = {
  projects: "Chưa có dự án được công bố. Dự án sẽ được công bố khi dữ liệu được LEANWARES xác minh.",
  knowledge: "Chưa có bài viết hoặc tài liệu được phát hành.",
} as const;

/**
 * Image placeholders: in staging / production an image slot without an approved photo is
 * rendered as a neutral slot (no bracketed label). An ImageContent is an object whose only
 * keys are `placeholder` and optionally `image`.
 */
function neutralizeImages<T>(value: T): T {
  if (Array.isArray(value)) return value.map(neutralizeImages) as T;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const keys = entries.map(([k]) => k);
    const isImage = keys.includes("placeholder") && keys.every((k) => k === "placeholder" || k === "image");
    if (isImage) {
      const image = value as unknown as { placeholder: unknown; image?: unknown };
      return (typeof image.placeholder === "string" && !image.image ? { ...image, placeholder: "" } : value) as T;
    }
    return Object.fromEntries(entries.map(([k, v]) => [k, neutralizeImages(v)])) as T;
  }
  return value;
}

/**
 * Apply the policy to a page view model. `hide` removes or replaces placeholder-only
 * sections; it runs only when placeholders are not shown.
 */
export function publicView<T>(content: T, hide: (content: T) => T = (c) => c): T {
  const policy = getPublicationPolicy();
  if (policy.showPlaceholders) return content;
  return neutralizeImages(hide(content));
}

/** Drop a trailing ": [CASE DATA]" value from a label (concept diagrams keep the label). */
export const labelOnly = (text: string) => text.replace(/:\s*\[CASE DATA\](\.?)$/, "$1");
