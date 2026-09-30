import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { EvidenceTable } from "../evidence/EvidenceTable/EvidenceTable";
import { KpiList } from "../evidence/KpiList/KpiList";
import type { FeaturedProjectContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./FeaturedProject.module.css";

/**
 * Featured project / case study (FD v3): navy block, technical treatment allowed.
 * Every value is [CASE DATA] until verified. The four steps are shown together
 * (no tabs / carousel, DS V3). Indicators: table from 768, stacked cards on mobile.
 */
export interface FeaturedProjectProps extends FeaturedProjectContent {
  /** Heading id (unique per page). */
  headingId?: string;
  className?: string;
}

export function FeaturedProject({ headingId = "project-title", className, ...content }: FeaturedProjectProps) {
  const { eyebrow, title, meta, image, measurementPoint, story, table, kpis } = content;

  return (
    <section className={cx("surface-inverse", styles.section, className)} aria-labelledby={headingId}>
      <Container className={styles.inner}>
        <div className={styles.head}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={headingId} className={cx("t-feature", styles.title)}>
            {title}
          </h2>
          <p className="t-data-l">{meta}</p>
        </div>

        <div className={styles.body}>
          <ImageSlot
            image={image.image}
            placeholder={image.placeholder}
            ratio="6:5"
            tabletRatio="21:9"
            mobileRatio="3:2"
            tone="dark"
            sizes="(min-width: 1280px) 40vw, 100vw"
          >
            <span className={styles.point}>
              <span className={styles.pointMarker} aria-hidden="true" />
              {measurementPoint}
            </span>
          </ImageSlot>

          <ol role="list" className={styles.story}>
            {story.map((step, index) => (
              <li key={step.label} className={styles.storyStep}>
                <span className={styles.storyLabel}>
                  {String(index + 1).padStart(2, "0")} → {step.label}
                </span>
                <p className={cx("t-body-s", styles.storyText)}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.data}>
          <EvidenceTable table={table} />
          <KpiList kpis={kpis} variant="compact" />
        </div>
      </Container>
    </section>
  );
}
