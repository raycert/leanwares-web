import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container/Container";
import { cx } from "@/lib/cx";
import styles from "./SplitSection.module.css";

export interface SplitSectionProps {
  id: string;
  title: string;
  /** "01" … numbered in render order (5f "01 → Thách thức"). Omit for unnumbered (5e). */
  number?: string;
  /** Short mono note under the title (5e "Tham chiếu theo ngành…"). */
  note?: string;
  children: ReactNode;
  className?: string;
}

/**
 * 4 / 8 content section with a serif title (templates 5f case study, 5e industry).
 * Stacked below 768.
 */
export function SplitSection({ id, title, number, note, children, className }: SplitSectionProps) {
  return (
    <section id={id} className={cx(styles.section, className)} aria-labelledby={`${id}-title`}>
      <Container className={styles.inner}>
        <div className={styles.head}>
          {number && (
            <span className={styles.number} aria-hidden="true">
              {number} →
            </span>
          )}
          <h2 id={`${id}-title`} className="t-h3">
            {title}
          </h2>
          {note && <p className={styles.note}>{note}</p>}
        </div>
        <div className={styles.body}>{children}</div>
      </Container>
    </section>
  );
}
