import { Container } from "@/components/ui/Container/Container";
import type { SolutionsOverviewContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { SectionHeader } from "../../SectionHeader/SectionHeader";
import styles from "./ServicesByPillar.module.css";

/**
 * "Dịch vụ theo trụ cột" (template 5t). Specific services require LEANWARES business
 * verification, so the rows are non-interactive placeholders that keep the approved
 * structure visible without exposing unverified offers.
 */
export function ServicesByPillar({ eyebrow, title, note, groups }: NonNullable<SolutionsOverviewContent["services"]>) {
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <Container className={styles.inner}>
        <SectionHeader eyebrow={eyebrow} title={title} lead={note} headingId="services-title" />
        <div className={styles.list}>
          {groups.map((group) => (
            <div key={group.pillar} className={styles.group}>
              <h3 className={cx("t-title-m", styles.pillar)}>{group.pillar}</h3>
              <ol role="list" className={styles.items}>
                {group.items.map((item, index) => (
                  <li key={index} className={styles.item}>
                    <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.placeholder} data-placeholder="service">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
