/*
 * Motion timings for JavaScript-driven behaviour. They mirror src/styles/tokens/motion.css,
 * because timers cannot read CSS custom properties.
 */
export const motion = {
  /** Mega menu opens after hovering the trigger or panel (DS V3). */
  menuOpenDelay: 150,
  /** Mega menu closes after the pointer leaves both (DS V3). */
  menuCloseDelay: 250,
} as const;
