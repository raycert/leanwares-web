import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { MarketPressureContent } from "@/lib/content/types";
import styles from "./MarketPressure.module.css";

/** "Thị trường đang thay đổi": 5 / 7 on desktop, stacked on tablet and mobile (FD v3). */
export function MarketPressure({ eyebrow, title, questions }: MarketPressureContent) {
  return (
    <section className={`surface-subtle ${styles.section}`} aria-labelledby="market-title">
      <Container className={styles.inner}>
        <div className={styles.head}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="market-title" className="t-h2">
            {title}
          </h2>
        </div>
        <ol role="list" className={styles.list}>
          {questions.map((question, index) => (
            <li key={question} className={styles.item}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <span className="t-quote">{question}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
