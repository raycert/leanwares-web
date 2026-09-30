import { Container } from "@/components/ui/Container/Container";
import type { EmissionReductionContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { SectionHeader } from "../../SectionHeader/SectionHeader";
import styles from "./PriorityCriteria.module.css";

export interface PriorityCriteriaProps extends Omit<EmissionReductionContent["prioritisation"], "reviewStatus"> {
  id?: string;
  className?: string;
}

/**
 * Methodology framework for prioritising reduction measures: the criteria and the question
 * each answers. It contains no scores, weights or rankings; those come only from a plant's
 * own data (the note keeps that explicit as [CASE DATA]).
 */
export function PriorityCriteria({ eyebrow, title, lead, columns, criteria, note, id, className }: PriorityCriteriaProps) {
  const headingId = `${id ?? "priority"}-title`;
  return (
    <section id={id} className={cx("surface-subtle", styles.section, className)} aria-labelledby={headingId}>
      <Container className={styles.inner}>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} headingId={headingId} />
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.num}>
                <span className="visually-hidden">#</span>
              </th>
              <th scope="col">{columns.criterion}</th>
              <th scope="col">{columns.question}</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((criterion, index) => (
              <tr key={criterion.name}>
                <td className={styles.num}>{String(index + 1).padStart(2, "0")}</td>
                <th scope="row" className={styles.criterion}>
                  <span className="t-title-s">{criterion.name}</span>
                  <span className={styles.term} lang="en">
                    {criterion.term}
                  </span>
                </th>
                <td className="t-body-s">{criterion.question}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={cx("t-data", styles.note)}>
          <span className={styles.marker} aria-hidden="true" />
          {note}
        </p>
      </Container>
    </section>
  );
}
