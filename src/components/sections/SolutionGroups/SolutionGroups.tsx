import { AppLink } from "@/components/ui/AppLink/AppLink";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Grid } from "@/components/ui/Grid/Grid";
import type { SolutionGroupsContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./SolutionGroups.module.css";

export interface SolutionGroupsProps extends SolutionGroupsContent {
  headingId?: string;
  className?: string;
}

/**
 * The eight solution groups; each links to its anchor on /giai-phap/giam-phat-thai (C16).
 * On that page the same list is the in-page index (hrefs are "#…" anchors).
 */
export function SolutionGroups({ eyebrow, title, groups, headingId = "groups-title", className }: SolutionGroupsProps) {
  return (
    <section className={cx(styles.section, className)} aria-labelledby={headingId}>
      <Container>
        <Grid split="4-8" className={styles.grid}>
          <div className={styles.head}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={headingId} className="t-h2-s">
              {title}
            </h2>
          </div>
          <ol role="list" className={styles.list}>
            {groups.map((group, index) => (
              <li key={group.href}>
                <AppLink href={group.href} className={styles.row}>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="t-title-s">{group.label}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </AppLink>
              </li>
            ))}
          </ol>
        </Grid>
      </Container>
    </section>
  );
}
