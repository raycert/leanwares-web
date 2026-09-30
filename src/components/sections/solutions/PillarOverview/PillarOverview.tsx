import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import type { SolutionsOverviewContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./PillarOverview.module.css";

/**
 * "Ba trụ cột" (template 5t): one row per pillar with photo, pillar scope and capability
 * areas. The middle pillar reverses the photo / capabilities columns, as in 5t.
 * Each row is an anchor target (/giai-phap#nha-may-xanh …) used by the mega menu and footer.
 * 5t's "Khám phá {pillar} →" links are omitted: pillar pages are not V1 routes.
 */
export function PillarOverview({ eyebrow, items }: SolutionsOverviewContent["pillars"]) {
  return (
    <section className={styles.section} aria-labelledby="pillars-overview-title">
      <Container>
        <Eyebrow as="h2" className={styles.eyebrow}>
          <span id="pillars-overview-title">{eyebrow}</span>
        </Eyebrow>
        <div className={styles.list}>
          {items.map((pillar, index) => (
            <article
              key={pillar.id}
              id={pillar.id}
              className={cx(styles.pillar, index % 2 === 1 && styles.reversed)}
              aria-labelledby={`${pillar.id}-title`}
            >
              <ImageSlot
                image={pillar.image.image}
                placeholder={pillar.image.placeholder}
                ratio="4:3"
                className={styles.photo}
                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
              />
              <div className={styles.text}>
                <span className={styles.number}>{pillar.number}</span>
                <h3 id={`${pillar.id}-title`} className="t-h3">
                  {pillar.title}
                </h3>
                <p className="t-body-s">{pillar.lead}</p>
                <div className={styles.scope}>
                  <Eyebrow as="p" tone="muted">
                    {pillar.scopeLabel}
                  </Eyebrow>
                  <ul role="list" className={styles.topics}>
                    {pillar.scope.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.capabilities}>
                <Eyebrow as="p" tone="muted" className={styles.capabilitiesLabel}>
                  {pillar.capabilitiesLabel}
                </Eyebrow>
                <ul role="list" className={styles.capabilityList}>
                  {pillar.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
