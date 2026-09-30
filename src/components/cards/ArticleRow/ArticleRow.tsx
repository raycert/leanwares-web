import { AppLink } from "@/components/ui/AppLink/AppLink";
import type { KnowledgeListItem } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./ArticleRow.module.css";

export interface ArticleRowProps {
  item: KnowledgeListItem;
  headingLevel?: "h2" | "h3";
}

/**
 * Article row (template 5q): date | type | title | →. The date shows only when the record
 * has one; rows without a public detail page are not links.
 */
export function ArticleRow({ item, headingLevel: Heading = "h3" }: ArticleRowProps) {
  const body = (
    <>
      <span className={cx("t-data", styles.date)}>{item.date ?? ""}</span>
      <span className={cx("t-eyebrow", styles.type)}>
        {item.typeLabel}
        {item.date && <span className={styles.mobileDate}> · {item.date}</span>}
      </span>
      <Heading className={cx("t-title-m", styles.title)}>{item.title}</Heading>
      {item.href ? (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      ) : (
        item.status && <span className={cx("t-data", styles.status)}>{item.status}</span>
      )}
    </>
  );
  return item.href ? (
    <AppLink href={item.href} className={cx(styles.row, styles.link)}>
      {body}
    </AppLink>
  ) : (
    <div className={styles.row}>{body}</div>
  );
}
