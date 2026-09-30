import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container/Container";
import type { CaseStudyContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { EvidenceTable } from "../../evidence/EvidenceTable/EvidenceTable";
import { KpiList } from "../../evidence/KpiList/KpiList";
import styles from "./CaseResults.module.css";

export type CaseResultsProps = CaseStudyContent["sections"]["results"] & {
  id: string;
  number: string;
};

/**
 * Results (template 5f "Kết quả", navy): KPI blocks, Baseline → After → Δ table and the
 * evidence note (source, period, baseline definition, comparison basis).
 * Before / after bars render ONLY from verified numeric pairs; 5f's illustrative bars
 * (arbitrary heights) are not reproduced, so no reduction is implied without data.
 */
export function CaseResults({ id, number, title, kpis, table, evidenceNote, bars }: CaseResultsProps) {
  return (
    <section id={id} className={cx("surface-inverse", styles.section)} aria-labelledby={`${id}-title`}>
      <Container className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.number} aria-hidden="true">
            {number} →
          </span>
          <h2 id={`${id}-title`} className="t-feature">
            {title}
          </h2>
        </div>

        <KpiList kpis={kpis} variant="large" />

        <div className={cx(styles.data, bars.length > 0 && styles.withBars)}>
          <div className={styles.tableBlock}>
            <EvidenceTable table={table} />
            <p className={cx("t-data", styles.evidence)}>{evidenceNote}</p>
          </div>
          {bars.length > 0 && (
            <div className={styles.bars}>
              {bars.map((bar) => {
                const max = Math.max(bar.baseline, bar.after) || 1;
                return (
                  <figure key={bar.label} className={styles.barGroup}>
                    <figcaption className="t-data">
                      {bar.label} · {bar.unit}
                    </figcaption>
                    <div className={styles.barPair} aria-hidden="true">
                      <span className={styles.barBefore} style={{ "--h": bar.baseline / max } as CSSProperties} />
                      <span className={styles.barAfter} style={{ "--h": bar.after / max } as CSSProperties} />
                    </div>
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
