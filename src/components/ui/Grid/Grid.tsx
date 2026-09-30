import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Grid.module.css";

/** Two-column content splits used across the approved boards (in twelfths). */
export type GridSplit = "7-5" | "5-7" | "4-8" | "8-4" | "6-6" | "3-9";

/** Equal-column layouts. */
export type GridColumns = 2 | 3 | 4 | 6;

type GridElement = "div" | "section" | "ul" | "ol" | "dl";

interface GridBaseProps {
  as?: GridElement;
  /**
   * `content`: gap between content columns (96 / 48, stacked on mobile).
   * `gutter`: 32px grid gutter.
   * `none`: no column gap (row dividers carry the rhythm).
   */
  gap?: "content" | "gutter" | "none";
  align?: "start" | "center" | "end" | "stretch";
  /** Columns on mobile (< 768). Defaults to 1 (stacked). */
  mobileColumns?: 1 | 2;
  className?: string;
  children: ReactNode;
}

export type GridProps = GridBaseProps &
  ({ split: GridSplit; columns?: never } | { columns: GridColumns; split?: never });

const splitClass: Record<GridSplit, string | undefined> = {
  "7-5": styles.split75,
  "5-7": styles.split57,
  "4-8": styles.split48,
  "8-4": styles.split84,
  "6-6": styles.split66,
  "3-9": styles.split39,
};

const columnsClass: Record<GridColumns, string | undefined> = {
  2: styles.cols2,
  3: styles.cols3,
  4: styles.cols4,
  6: styles.cols6,
};

const gapClass = {
  content: styles.gapContent,
  gutter: styles.gapGutter,
  none: styles.gapNone,
} as const;

/**
 * Responsive grid helper. Splits reproduce the fr ratios used in the boards
 * (e.g. 7fr 5fr). All layouts stack below 768 unless `mobileColumns={2}`.
 */
export function Grid({
  as: Tag = "div",
  split,
  columns,
  gap,
  align = "stretch",
  mobileColumns = 1,
  className,
  children,
}: GridProps) {
  const resolvedGap = gap ?? (split ? "content" : "gutter");
  return (
    <Tag
      className={cx(
        styles.grid,
        split ? splitClass[split] : columns ? columnsClass[columns] : undefined,
        gapClass[resolvedGap],
        styles[`align-${align}`],
        mobileColumns === 2 && styles.mobileCols2,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
