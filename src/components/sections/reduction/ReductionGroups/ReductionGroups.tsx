import { Container } from "@/components/ui/Container/Container";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { EmissionReductionContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./ReductionGroups.module.css";

/**
 * The eight solution groups as anchored sections (#hieu-qua-nang-luong …), the targets of
 * the homepage list and of the in-page index above (SolutionGroups). Each group shows only
 * a one-line scope and a visible placeholder for detail content; no technologies, savings,
 * payback periods or results.
 */
export function ReductionGroups({ pillarLabel, items }: EmissionReductionContent["groups"]) {
  return (
    <div className={styles.section}>
      <Container>
        <div className={styles.list}>
          {items.map((group) => (
            <article key={group.id} id={group.id} className={styles.group} aria-labelledby={`${group.id}-title`}>
              <div className={styles.head}>
                <span className={styles.number}>{group.number}</span>
                <h3 id={`${group.id}-title`} className="t-h4">
                  {group.title}
                </h3>
              </div>
              <div className={styles.body}>
                <p className="t-body">{group.summary}</p>
                {group.detailPlaceholder && <p className={cx("t-data", styles.placeholder)}>{group.detailPlaceholder}</p>}
                <TextLink href={group.pillar.href} size="sm" arrow>
                  {pillarLabel}: {group.pillar.label}
                </TextLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
