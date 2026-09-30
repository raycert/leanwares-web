import { Container } from "@/components/ui/Container/Container";
import type { SolutionsOverviewContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { SectionHeader } from "../../SectionHeader/SectionHeader";
import styles from "./CrossCuttingOverview.module.css";

/**
 * "Năng lực xuyên suốt" (template 5t): the two cross-cutting layers under a bar showing that
 * they support all three pillars (not a fourth pillar). 5t's service lists with counts and
 * the "Khám phá …" links are replaced by a visible placeholder until the catalogue is
 * verified and the 5x / 5y pages exist.
 */
export function CrossCuttingOverview({
  id,
  eyebrow,
  title,
  lead,
  supportLabel,
  pillarNames,
  items,
}: SolutionsOverviewContent["crossCutting"]) {
  return (
    <section id={id} className={cx("surface-subtle", styles.section)} aria-labelledby={`${id}-title`}>
      <Container className={styles.inner}>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} headingId={`${id}-title`} />

        <div className={styles.support} aria-hidden="true">
          <div className={styles.pillars}>
            {pillarNames.map((name) => (
              <span key={name} className={styles.pillarName}>
                {name}
              </span>
            ))}
          </div>
          <p className={cx("surface-accent", "t-eyebrow", styles.bar)}>{supportLabel}</p>
        </div>

        <div className={styles.columns}>
          {items.map((item) => (
            <article key={item.id} id={item.id} className={styles.column} aria-labelledby={`${item.id}-title`}>
              <div className={styles.columnHead}>
                <span className={styles.number}>{item.number}</span>
                <h3 id={`${item.id}-title`} className="t-h4">
                  {item.title}
                </h3>
                <p className="t-body-s">{item.description}</p>
              </div>
              {item.pendingServices && <p className={cx("t-data", styles.pending)}>{item.pendingServices}</p>}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
