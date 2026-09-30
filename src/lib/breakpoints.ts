/*
 * Breakpoints mirror src/styles/tokens/layout.css. CSS media queries cannot read custom
 * properties, so these literals are the single reference for TS code (e.g. matchMedia,
 * next/image `sizes`).
 */
export const breakpoints = {
  /** Mobile reference artboard. */
  mobileRef: 390,
  /** Layout switch: columns stack below this width (provisional, decision D4). */
  md: 768,
  /** Tablet reference artboard. */
  tabletRef: 1024,
  /** Desktop tier: line-height step, DS V3 H1 check. */
  lg: 1280,
  /** Desktop reference artboard. */
  desktopRef: 1440,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const mediaUp = (bp: Breakpoint) => `(min-width: ${breakpoints[bp]}px)`;
