import type { FeaturedProjectContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./EvidenceTable.module.css";

export interface EvidenceTableProps {
  table: FeaturedProjectContent["table"];
  className?: string;
}

/**
 * Baseline → After → Δ evidence table (FD v3 featured project, template 5f results).
 * Technical treatment, used on navy only for verified data or [CASE DATA] placeholders.
 * ≥ 768: four-column table · < 768: one stacked card per indicator.
 */
export function EvidenceTable({ table, className }: EvidenceTableProps) {
  return (
    <div className={className}>
      <table className={styles.table}>
        <caption className="visually-hidden">{table.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{table.columns.indicator}</th>
            <th scope="col">{table.columns.baseline}</th>
            <th scope="col">{table.columns.after}</th>
            <th scope="col">{table.columns.delta}</th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.indicator}>
              <th scope="row">{row.indicator}</th>
              <td className={styles.muted}>{row.baseline}</td>
              <td className={styles.muted}>{row.after}</td>
              <td>
                <span className={styles.delta}>
                  <span className={styles.deltaMarker} aria-hidden="true" />
                  {row.delta}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul role="list" className={styles.cards} aria-label={table.caption}>
        {table.rows.map((row) => (
          <li key={row.indicator} className={styles.card}>
            <p className={styles.cardTitle}>{row.indicator}</p>
            <dl>
              <div className={styles.cardRow}>
                <dt>{table.mobileLabels.baseline}</dt>
                <dd className={styles.muted}>{row.baseline}</dd>
              </div>
              <div className={styles.cardRow}>
                <dt>{table.mobileLabels.after}</dt>
                <dd className={styles.muted}>{row.after}</dd>
              </div>
              <div className={cx(styles.cardRow, styles.cardDelta)}>
                <dt>
                  <span className={styles.deltaMarker} aria-hidden="true" />
                  {table.mobileLabels.delta}
                </dt>
                <dd>{row.delta}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
