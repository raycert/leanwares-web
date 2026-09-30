import Link from "next/link";
import { Container } from "@/components/ui/Container/Container";
import { Logo } from "@/components/ui/Logo/Logo";
import type { SiteChrome } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./SiteFooter.module.css";

export interface SiteFooterProps {
  footer: SiteChrome["footer"];
  homeLabel: string;
}

/**
 * Global footer: Final Direction v3 visual treatment, DS V3 responsive rules.
 *  - ≥ 1280: brand + 4 groups with items (4fr + 4 × 2fr)
 *  - 768–1279: brand + 4 group titles (3fr + 4 × 2fr)
 *  - < 768: 2-column group titles, legal links stacked (≥ 48px rows)
 */
export function SiteFooter({ footer, homeLabel }: SiteFooterProps) {
  return (
    <footer className={cx("surface-inverse", styles.footer)}>
      <Container className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoPanel} aria-label={homeLabel}>
              <Logo placement="footer" />
            </Link>
            <p className={styles.company}>{footer.companyName}</p>
          </div>

          {footer.groups.map((group) => (
            <nav key={group.title} className={styles.group} aria-label={group.title}>
              <Link href={group.href} className={styles.groupTitle}>
                {group.title}
              </Link>
              <ul role="list" className={styles.items}>
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.item}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {footer.copyright}
            <span className={styles.copyrightCompany}> · {footer.companyName}</span>
          </p>
          <nav aria-label={footer.legalLabel}>
            <ul role="list" className={styles.legal}>
              {footer.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.legalLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
