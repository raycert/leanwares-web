import { IBM_Plex_Mono, Newsreader, Public_Sans } from "next/font/google";

/*
 * Fonts per Design System V3 Final. All three load the `vietnamese` subset; glyph coverage
 * was verified against the full Vietnamese alphabet (docs/IMPLEMENTATION_PLAN.md §7).
 * Files are self-hosted by next/font at build time; no runtime request to Google.
 *
 * Performance note (Phase 4): the three families load 12 woff2 files (≈ 336 KB) per page.
 * Removing latin-ext from `subsets` does not help: next/font still declares every subset in
 * CSS, and common Vietnamese letters (ă đ ơ ư) fall in both the latin-ext and vietnamese
 * unicode ranges, so the files are fetched anyway (later, without preload). Options are
 * listed in docs/LAUNCH_READINESS.md §Performance.
 */

/** Headlines and large numbers ≥ 28px. Variable: wght + opsz (6–72), as in the design export. */
export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext", "vietnamese"],
  style: ["normal"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-newsreader",
});

/** UI, body text and small titles. Variable wght. */
export const publicSans = Public_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  style: ["normal"],
  display: "swap",
  variable: "--font-public-sans",
});

/** Data annotations, standards codes, metadata values, index numbers. */
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

/** Class names that expose the font CSS variables; apply to <html>. */
export const fontVariables = [newsreader.variable, publicSans.variable, ibmPlexMono.variable].join(" ");
