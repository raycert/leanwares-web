import { AppLink } from "@/components/ui/AppLink/AppLink";
import { cx } from "@/lib/cx";
import styles from "./IndexList.module.css";

export interface IndexListItem {
  /** Mono marker: index number ("01") or standards code ("CBAM"). */
  marker: string;
  title: string;
  description?: string;
  href?: string;
}

export interface IndexListProps {
  items: IndexListItem[];
  /**
   * `rows`: 5e rows (marker | title | description | →), stacked below 768.
   * `columns`: 5u "Vấn đề thường gặp" (two columns of marker | title).
   * `codes`: like `rows`, with a wider mono marker column for standards codes.
   */
  variant?: "rows" | "columns" | "codes";
  className?: string;
}

/** Numbered / coded row list (templates 5e, 5u). Rows with `href` are links. */
export function IndexList({ items, variant = "rows", className }: IndexListProps) {
  return (
    <ul role="list" className={cx(styles.list, styles[variant], className)}>
      {items.map((item) => {
        const content = (
          <>
            <span className={styles.marker}>{item.marker}</span>
            <span className={cx(variant === "columns" ? "t-title-m" : "t-title-s", styles.title)}>{item.title}</span>
            {item.description && <span className={cx("t-body-s", styles.description)}>{item.description}</span>}
            {item.href && (
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            )}
          </>
        );
        return (
          <li key={`${item.marker}-${item.title}`} className={styles.item}>
            {item.href ? (
              <AppLink href={item.href} className={cx(styles.row, styles.link)}>
                {content}
              </AppLink>
            ) : (
              <div className={styles.row}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
