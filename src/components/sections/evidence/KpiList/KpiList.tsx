import type { FeaturedProjectContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./KpiList.module.css";

export interface KpiListProps {
  kpis: FeaturedProjectContent["kpis"];
  /**
   * `compact`: FD v3 featured project (44 / 44 / 38 figures, first one orange).
   * `large`: template 5f results (64 / 52 / 40 figures with a square marker, 3 columns).
   */
  variant?: "compact" | "large";
  className?: string;
}

/** KPI blocks on navy. Values stay [CASE DATA] until verified (see lib/content/projects.ts). */
export function KpiList({ kpis, variant = "compact", className }: KpiListProps) {
  return (
    <ul role="list" className={cx(styles.kpis, styles[variant], className)}>
      {kpis.map((kpi) => (
        <li key={kpi.label} className={styles.kpi}>
          <p className={cx(variant === "large" ? "t-metric-l" : "t-metric", styles.value, kpi.emphasis && styles.emphasis)}>
            {variant === "large" && <span className={styles.marker} aria-hidden="true" />}
            {kpi.value}
          </p>
          <p className={styles.label}>{kpi.label}</p>
        </li>
      ))}
    </ul>
  );
}
