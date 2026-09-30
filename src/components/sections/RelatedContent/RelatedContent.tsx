import { AppLink } from "@/components/ui/AppLink/AppLink";
import { Container } from "@/components/ui/Container/Container";
import { cx } from "@/lib/cx";
import styles from "./RelatedContent.module.css";

export interface RelatedContentProps {
  title: string;
  items: Array<{ type: string; label: string; href: string }>;
  headingId?: string;
  /** `h4` (LWRelated, 36 / 32 / 30) or `h3` (44 / 36 / 30) when it sits among 4 / 8 main sections (5e). */
  titleSize?: "h3" | "h4";
  className?: string;
}

/** Related content (LWRelated anatomy, DS V3): typed rows linking to other site sections. */
export function RelatedContent({ title, items, headingId = "related-title", titleSize = "h4", className }: RelatedContentProps) {
  if (items.length === 0) return null;
  return (
    <section className={cx(styles.section, className)} aria-labelledby={headingId}>
      <Container className={styles.inner}>
        <h2 id={headingId} className={`t-${titleSize}`}>
          {title}
        </h2>
        <ul role="list" className={styles.list}>
          {items.map((item) => (
            <li key={`${item.type}-${item.href}`}>
              <AppLink href={item.href} className={styles.row}>
                <span className={cx("t-eyebrow", styles.type)}>{item.type}</span>
                <span className="t-title-s">{item.label}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </AppLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
