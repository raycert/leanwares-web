import { AppLink } from "@/components/ui/AppLink/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { KnowledgeListItem } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./ResourceItem.module.css";

export interface ResourceItemProps {
  item: KnowledgeListItem;
  headingLevel?: "h2" | "h3" | "p";
  className?: string;
}

/**
 * Resource row (LWResourceItem): blue-square type, title, description, meta, action.
 * Meta (format · size) renders only for a real file; the action is "Xem tài liệu" to a
 * public detail page, or a plain status when there is none. Never "Tải xuống" here.
 */
export function ResourceItem({ item, headingLevel: Heading = "h3", className }: ResourceItemProps) {
  const body = (
    <>
      <Eyebrow marker="blue" className={styles.type}>
        {item.typeLabel}
      </Eyebrow>
      <div className={styles.text}>
        <Heading className={cx("t-title-m", styles.title)}>{item.title}</Heading>
        {item.summary && <p className={cx("t-body-s", styles.summary)}>{item.summary}</p>}
        {item.meta && <p className="t-data">{item.meta}</p>}
      </div>
      <span className={styles.action}>
        {item.href ? (
          <span className={styles.cta}>
            Xem tài liệu <span aria-hidden="true">→</span>
          </span>
        ) : (
          item.status && <span className="t-data">{item.status}</span>
        )}
      </span>
    </>
  );
  return item.href ? (
    <AppLink href={item.href} className={cx(styles.item, styles.link, className)}>
      {body}
    </AppLink>
  ) : (
    <div className={cx(styles.item, className)}>{body}</div>
  );
}
