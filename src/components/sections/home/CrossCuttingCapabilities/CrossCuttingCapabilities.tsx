import Link from "next/link";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Grid } from "@/components/ui/Grid/Grid";
import type { CrossCuttingContent } from "@/lib/content/types";
import styles from "./CrossCuttingCapabilities.module.css";

/** ESG and management systems: service layers across all three pillars, not a 4th pillar. */
export function CrossCuttingCapabilities({ eyebrow, title, items }: CrossCuttingContent) {
  return (
    <section className={styles.section} aria-labelledby="cross-title">
      <Container>
        <Grid split="4-8" className={styles.grid}>
          <div className={styles.head}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="cross-title" className="t-h4">
              {title}
            </h2>
          </div>
          <ul role="list" className={styles.list}>
            {items.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className={styles.row}>
                  <span className="t-title-m">{item.title}</span>
                  <span className="t-body-s">{item.description}</span>
                  <span className={styles.cta}>
                    {item.ctaLabel} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
      </Container>
    </section>
  );
}
