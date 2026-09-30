import { Container } from "@/components/ui/Container/Container";
import { Timeline } from "@/components/ui/Timeline/Timeline";
import type { ProcessContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import styles from "./ProcessTimeline.module.css";

export interface ProcessTimelineProps extends ProcessContent {
  headingId: string;
  id?: string;
  /** `subtle`: off-white band with its own vertical padding. */
  surface?: "default" | "subtle";
  className?: string;
}

/**
 * Process timeline (template 5d "Quy trình thực hiện", DS V3 Timeline):
 *  - ≥ 1024: one row of steps on a navy rule, each with a blue square marker.
 *  - < 1024: vertical timeline with a left rule and square markers.
 * Used for step sequences that are editorial, not data (the GHG framework has its own chart).
 */
export function ProcessTimeline({
  eyebrow,
  title,
  lead,
  steps,
  headingId,
  id,
  surface = "default",
  className,
}: ProcessTimelineProps) {
  return (
    <section
      id={id}
      className={cx(styles.section, surface === "subtle" && "surface-subtle", surface === "subtle" && styles.band, className)}
      aria-labelledby={headingId}
    >
      <Container className={styles.inner}>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} headingId={headingId} />
        <Timeline steps={steps} />
      </Container>
    </section>
  );
}
