import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Eyebrow.module.css";

export interface EyebrowProps {
  as?: "p" | "span" | "div" | "h2" | "h3";
  /**
   * `accent`: default. Blue-700 on light surfaces, orange on navy (FD v3), white on blue.
   * `muted`: secondary label, e.g. "NĂNG LỰC XUYÊN SUỐT" in the mega menu.
   * `body`: body colour, e.g. the project-teaser label on navy (5t).
   * `strong`: navy / white, e.g. the "PHA 2" phase label.
   */
  tone?: "accent" | "body" | "muted" | "strong";
  /** Square marker before the label (orange marker or blue resource-type square). */
  marker?: "orange" | "blue";
  className?: string;
  children: ReactNode;
}

/** Uppercase label above headings: Public Sans 600, 12 / 12 / 11px, tracking .12em. */
export function Eyebrow({ as: Tag = "p", tone = "accent", marker, className, children }: EyebrowProps) {
  return (
    <Tag className={cx("t-eyebrow", styles.eyebrow, styles[tone], className)}>
      {marker && <span aria-hidden="true" className={cx(styles.marker, styles[`marker-${marker}`])} />}
      {children}
    </Tag>
  );
}
