import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import type { CaseStudyContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./CaseHero.module.css";

/**
 * Case-study hero (template 5f): breadcrumb, eyebrow, 68 / 54 / 40 title, context, a meta
 * row (client line only when approved, industry / location, period, scope, standards) and
 * a 21:9 project photo (4:3 on mobile) with an annotated measurement point on desktop.
 */
export function CaseHero({ breadcrumb, eyebrow, title, context, meta, image, measurementPoint }: CaseStudyContent["hero"]) {
  return (
    <section className={styles.hero} aria-labelledby="case-title">
      <Container>
        <Breadcrumb items={breadcrumb} />
        <div className={styles.head}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="case-title" className={cx("t-display-m", styles.title)}>
            {title}
          </h1>
          <p className={cx("t-lead", styles.context)}>{context}</p>
          <dl className={styles.meta}>
            {meta.map((item) => (
              <div key={item.label} className={styles.metaItem}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ImageSlot
          image={image.image}
          placeholder={image.placeholder}
          ratio="21:9"
          mobileRatio="4:3"
          priority
          sizes="100vw"
        >
          {measurementPoint && (
            <span className={styles.point}>
              <span className={styles.pointMarker} aria-hidden="true" />
              {measurementPoint}
            </span>
          )}
        </ImageSlot>
      </Container>
    </section>
  );
}
