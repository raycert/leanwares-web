import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { IndustriesOverviewContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { IndexList } from "../IndexList/IndexList";
import styles from "./CommonProblems.module.css";

export type CommonProblemsProps = IndustriesOverviewContent["problems"] & { headingId?: string };

/** 5u "Vấn đề thường gặp": 4 / 8 on the subtle surface, numbered items in two columns. */
export function CommonProblems({ eyebrow, title, items, headingId = "van-de-thuong-gap-title" }: CommonProblemsProps) {
  return (
    <section className={cx("surface-subtle", styles.section)} aria-labelledby={headingId}>
      <Container className={styles.inner}>
        <div className={styles.head}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 id={headingId} className="t-h3">
            {title}
          </h2>
        </div>
        <IndexList
          variant="columns"
          items={items.map((item, index) => ({ marker: String(index + 1).padStart(2, "0"), title: item }))}
        />
      </Container>
    </section>
  );
}
