import type { BreadcrumbItem } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { AppLink } from "../AppLink/AppLink";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb (DS V3): links are inline links, the current page is navy and marked
 * aria-current="page". On mobile the first item ("Trang chủ") is dropped, as in the
 * templates' 390 boards.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Vị trí trang" className={cx(styles.breadcrumb, className)}>
      <ol role="list" className={styles.list}>
        {items.map((item, index) => (
          <li key={item.label} className={cx(styles.item, index === 0 && items.length > 2 && styles.first)}>
            {item.href ? (
              <AppLink href={item.href} className={styles.link}>
                {item.label}
              </AppLink>
            ) : (
              <span aria-current="page" className={styles.current}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
