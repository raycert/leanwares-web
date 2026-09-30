import type { CaseStudyContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./CaseDataTable.module.css";

/**
 * Verified inputs / baseline (Phase 3B IA, 5f data language): each input with value, unit and
 * evidence (source · period). Unverified inputs render as [CASE DATA] (lib/content/projects.ts).
 */
export function CaseDataTable({ intro, columns, rows }: Omit<CaseStudyContent["sections"]["data"], "title">) {
  return (
    <>
      <p className="t-body">{intro}</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{columns.name}</th>
            <th scope="col">{columns.value}</th>
            <th scope="col">{columns.unit}</th>
            <th scope="col">{columns.evidence}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.name}-${index}`}>
              <th scope="row" className={styles.name}>
                {row.name}
              </th>
              <td data-label={columns.value}>{row.value}</td>
              <td data-label={columns.unit}>{row.unit}</td>
              <td data-label={columns.evidence} className={cx(styles.evidence)}>
                {row.evidence}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
