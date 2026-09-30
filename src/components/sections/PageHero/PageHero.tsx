import { Button } from "@/components/ui/Button/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { PageHeroContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./PageHero.module.css";

export interface PageHeroProps extends PageHeroContent {
  headingId?: string;
  /** `display-s` 76 / 60 / 44 (5a, 5t) · `display-m` 68 / 54 / 40 (5v, 5f, 5d, 5u). */
  titleSize?: "display-s" | "display-m";
  /**
   * `side` (default): 4:5 photo beside the copy (5a / 5d).
   * `wide`: text-only hero followed by a full-width 21:9 photo, 4:3 below 768 (5e industry).
   */
  imageLayout?: "side" | "wide";
}

/**
 * Inner-page hero (templates 5a–5d, 5t): breadcrumb, eyebrow, 76 / 60 / 44 title, lead.
 *  - With `image`: copy + 4:5 photo, 7 / 5 (5a pillar / 5d service layout).
 *  - Without: title left, lead right, 7 / 5 aligned to the bottom (5t overview layout).
 *  - With `imageLayout="wide"`: the text-only layout, then a 21:9 photo (5e industry layout).
 * The homepage keeps its own Final Direction v3 hero.
 */
export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  image,
  headingId = "page-title",
  titleSize = "display-s",
  imageLayout = "side",
}: PageHeroProps) {
  const side = Boolean(image) && imageLayout === "side";
  const heading = (
    <div className={styles.titleBlock}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 id={headingId} className={`t-${titleSize}`}>
        {title}
      </h1>
    </div>
  );

  const actions = (primaryCta || secondaryCta) && (
    <div className={styles.actions}>
      {primaryCta && (
        <Button href={primaryCta.href} fullWidth="mobile">
          {primaryCta.label}
        </Button>
      )}
      {secondaryCta && (
        <TextLink href={secondaryCta.href} arrow>
          {secondaryCta.label}
        </TextLink>
      )}
    </div>
  );

  return (
    <section className={cx(styles.hero, side ? styles.withImage : styles.textOnly, image && !side && styles.wide)} aria-labelledby={headingId}>
      <Container>
        <Breadcrumb items={breadcrumb} className={styles.breadcrumb} />
        <div className={styles.grid}>
          {side && image ? (
            <>
              <div className={styles.copy}>
                {heading}
                <p className={cx("t-lead", styles.lead)}>{lead}</p>
                {actions}
              </div>
              <ImageSlot
                image={image.image}
                placeholder={image.placeholder}
                ratio="4:5"
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </>
          ) : (
            <>
              {heading}
              <div className={styles.copy}>
                <p className="t-lead">{lead}</p>
                {actions}
              </div>
            </>
          )}
        </div>
        {image && !side && (
          <ImageSlot
            image={image.image}
            placeholder={image.placeholder}
            ratio="21:9"
            mobileRatio="4:3"
            priority
            sizes="(min-width: 1440px) 1248px, 100vw"
          />
        )}
      </Container>
    </section>
  );
}
