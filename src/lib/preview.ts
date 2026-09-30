/**
 * Internal preview routes (/foundation/*) render fixture records that must never be
 * mistaken for published LEANWARES content. Rule lives in lib/site.ts: development, or a
 * non-production-mode build made with LW_INTERNAL_PREVIEW=1; never in production mode.
 */
export { isInternalPreviewEnabled } from "./site";
