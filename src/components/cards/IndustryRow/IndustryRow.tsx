"use client";

import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./IndustryRow.module.css";

export interface IndustryRowProps {
  name: string;
  href: string;
  /**
   * `home`: homepage explorer row; hover / focus selects it (image swap), selected row has a
   *   3px blue bar on white (DS V3).
   * `overview`: numbered /nganh explorer row (5u, LWIndustryItem desktop): hover / focus
   *   selects it, the selected row turns blue. Used from 768; below 768 /nganh uses an accordion.
   */
  variant?: "home" | "overview";
  /** Index number ("01"), `overview` only. */
  number?: string;
  active?: boolean;
  onActivate?: () => void;
}

/** One industry row (decision C11). Title uses DS V3 Title L (28 / 24 / 18). */
export function IndustryRow({ name, href, variant = "home", number, active = false, onActivate }: IndustryRowProps) {
  return (
    <Link
      href={href}
      className={cx(styles.row, styles[variant], active && styles.active)}
      onPointerEnter={onActivate}
      onFocus={onActivate}
    >
      {number && (
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
      )}
      <span className={cx("t-title-l", styles.name)}>{name}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}
