import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import type { CtaBandContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./CtaBand.module.css";

export interface CtaBandProps extends CtaBandContent {
  /**
   * `home`: Final Direction v3 homepage band (72 / 52 / 38px title).
   * `default`: inner-page band (LWCtaBand anatomy, 60 / 34px title).
   */
  variant?: "home" | "default";
  headingLevel?: "h2" | "h3";
  className?: string;
}

/** Blue CTA band with a white button on an orange base line (decision C10). */
export function CtaBand({ title, cta, variant = "default", headingLevel: Heading = "h2", className }: CtaBandProps) {
  return (
    <section className={cx("surface-accent", styles.band, styles[variant], className)}>
      <Container className={styles.inner}>
        <Heading className={cx(variant === "home" ? "t-cta" : "t-cta-s", styles.title)}>{title}</Heading>
        <Button href={cta.href} variant="inverse" size="lg" fullWidth="mobile" className={styles.button}>
          {cta.label}
        </Button>
      </Container>
    </section>
  );
}
