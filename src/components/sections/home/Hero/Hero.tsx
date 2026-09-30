import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Grid } from "@/components/ui/Grid/Grid";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { HeroContent } from "@/lib/content/types";
import styles from "./Hero.module.css";

/**
 * Homepage hero (FD v3). 7 / 5 split from 768; image 4:5 (1:1 on mobile).
 * Secondary CTA: text link with arrow from 768, outlined full-width button on mobile.
 */
export function Hero({ eyebrow, title, lead, primaryCta, secondaryCta, image }: HeroContent) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container>
        <Grid split="7-5" className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="hero-title" className="t-display">
              {title}
            </h1>
            <p className={`t-lead ${styles.lead}`}>{lead}</p>
            <div className={styles.actions}>
              <Button href={primaryCta.href} size="lg" fullWidth="mobile">
                {primaryCta.label}
              </Button>
              <TextLink href={secondaryCta.href} size="lg" arrow className={styles.secondaryLink}>
                {secondaryCta.label}
              </TextLink>
              <Button href={secondaryCta.href} variant="secondary" fullWidth className={styles.secondaryButton}>
                {secondaryCta.label}
              </Button>
            </div>
          </div>
          <ImageSlot
            image={image.image}
            placeholder={image.placeholder}
            ratio="4:5"
            mobileRatio="1:1"
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </Grid>
      </Container>
    </section>
  );
}
