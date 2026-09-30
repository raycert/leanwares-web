import { Container } from "@/components/ui/Container/Container";
import { cx } from "@/lib/cx";
import styles from "./ApproachColumns.module.css";

export interface ApproachColumnsProps {
  id: string;
  title: string;
  items: Array<{ number: string; title: string; description: string }>;
}

/** 5i "Ba cách nhìn trong một đội ngũ": subtle surface, title then three ruled columns. */
export function ApproachColumns({ id, title, items }: ApproachColumnsProps) {
  return (
    <section id={id} className={cx("surface-subtle", styles.section)} aria-labelledby={`${id}-title`}>
      <Container className={styles.inner}>
        <h2 id={`${id}-title`} className={cx("t-h3", styles.title)}>
          {title}
        </h2>
        <ul role="list" className={styles.list}>
          {items.map((item) => (
            <li key={item.number} className={styles.item}>
              <span className={styles.number}>{item.number}</span>
              <h3 className="t-title-l">{item.title}</h3>
              {item.description && <p className="t-body-s">{item.description}</p>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
