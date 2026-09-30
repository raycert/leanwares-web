import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { ProjectTeaserContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./ProjectTeaser.module.css";

export interface ProjectTeaserProps extends ProjectTeaserContent {
  headingId?: string;
  className?: string;
}

/**
 * Compact featured-project teaser on navy (templates 5t, 5a–5c, 5d): 4:3 photo, title,
 * one-line summary and a Baseline / After / Δ line. The full evidence block is
 * FeaturedProject. All values stay [CASE DATA] until verified.
 */
export function ProjectTeaser({
  eyebrow,
  title,
  summary,
  image,
  metrics,
  cta,
  headingId = "project-teaser-title",
  className,
}: ProjectTeaserProps) {
  return (
    <section className={cx("surface-inverse", styles.section, className)} aria-labelledby={headingId}>
      <Container className={styles.inner}>
        <ImageSlot
          image={image.image}
          placeholder={image.placeholder}
          ratio="4:3"
          tone="dark"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
        <div className={styles.copy}>
          <Eyebrow tone="body">{eyebrow}</Eyebrow>
          <h2 id={headingId} className="t-h3">
            {title}
          </h2>
          <p className="t-body">{summary}</p>
          <p className={styles.metrics}>
            <span>{metrics.baseline}</span>
            <span>{metrics.after}</span>
            <span className={styles.delta}>
              <span className={styles.marker} aria-hidden="true" />
              {metrics.delta}
            </span>
          </p>
          <TextLink href={cta.href} arrow className={styles.link}>
            {cta.label}
          </TextLink>
          <Button href={cta.href} variant="secondary" fullWidth className={styles.button}>
            {cta.label} <span aria-hidden="true">→</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
