/*
 * Brand asset registry.
 *
 * LOGO: the approved LEANWARES logo is public/brand/leanwares-logo.jpg (1315 × 729, white
 * background; lockup includes the ® mark and the "MAKE DIFFERENCE - MAKE VALUE" line).
 *  - Do NOT generate, redraw, trace, crop or recolour it.
 *  - Any approved format is acceptable (SVG, PNG, JPG). A later SVG only needs `src`,
 *    `width`, `height` and `format` updated here: layout is height-driven, width follows the
 *    intrinsic aspect ratio, so nothing else changes.
 *  - White-background raster → only on white or on an approved white container (header,
 *    mobile menu, footer panel). Set `background: "transparent"` only for a transparent file.
 *
 * Usage rules (Final Direction v3): original, unmodified; minimum height 44px. Rendered
 * heights: src/styles/tokens/layout.css (--logo-height-*). The text fallback in <Logo> exists
 * only for development resilience when `available` is false.
 */

export interface LogoAsset {
  available: boolean;
  /** Explicitly approved by LEANWARES (the production gate requires it; format-agnostic). */
  approved: boolean;
  src: string;
  format: "svg" | "png" | "jpg";
  /** "white": raster with a white background, placed only on white / white panels. */
  background: "white" | "transparent";
  alt: string;
  /** Intrinsic size of the file (drives the aspect ratio). */
  width: number | null;
  height: number | null;
}

export const logo: LogoAsset = {
  available: true,
  approved: true,
  src: "/brand/leanwares-logo.jpg",
  format: "jpg",
  background: "white",
  alt: "LEANWARES",
  width: 1315,
  height: 729,
};

/**
 * Other brand assets. null = not supplied; nothing is generated in their place.
 *  - favicon / appleIcon: place files in src/app (icon.png / apple-icon.png) or set paths here.
 *  - socialImage: default Open Graph image (1200 × 630), e.g. /brand/og-default.jpg.
 * Each missing asset is listed as a production blocker in docs/LAUNCH_READINESS.md.
 */
export interface BrandAssets {
  favicon: string | null;
  appleIcon: string | null;
  socialImage: { src: string; width: number; height: number; alt: string } | null;
}

export const brandAssets: BrandAssets = {
  favicon: null,
  appleIcon: null,
  socialImage: null,
};

export { company } from "@/content/company";
