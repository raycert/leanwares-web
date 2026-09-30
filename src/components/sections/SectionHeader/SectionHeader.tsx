import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { SectionHeaderContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./SectionHeader.module.css";

export interface SectionHeaderProps extends SectionHeaderContent {
  headingId: string;
  /** Title role: h2 (56 / 44 / 32), h2-s (48 / 40 / 32) or h4 (36 / 32 / 30). */
  size?: "h2" | "h2-s" | "h4";
  /**
   * `split`: title left, lead right from 1280 (6 / 6, aligned to the bottom; templates 5t,
   * GHG framework). `stacked`: eyebrow, title and lead in one column.
   */
  layout?: "split" | "stacked";
  className?: string;
}

/** Eyebrow + serif section title + optional lead, the repeated section opening in the templates. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  headingId,
  size = "h2",
  layout = "split",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx(styles.header, styles[layout], className)}>
      <div className={styles.titleBlock}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={headingId} className={`t-${size}`}>
          {title}
        </h2>
      </div>
      {lead && <p className={cx("t-body", styles.lead)}>{lead}</p>}
    </div>
  );
}
