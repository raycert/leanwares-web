import type { CSSProperties } from "react";
import type { ProcessStep } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./Timeline.module.css";

export interface TimelineProps {
  steps: ProcessStep[];
  /**
   * `md`: template 5d "Quy trình thực hiện" (20px step titles, body text).
   * `sm`: template 5f inline process (16px titles, mono value line).
   */
  size?: "md" | "sm";
  className?: string;
}

/**
 * Step timeline (DS V3 Timeline; templates 5d / 5f):
 *  - ≥ 1024: one row on a navy rule, blue square markers.
 *  - < 1024: vertical, left rule, square markers.
 */
export function Timeline({ steps, size = "md", className }: TimelineProps) {
  return (
    <ol
      role="list"
      className={cx(styles.steps, styles[size], className)}
      style={{ "--steps": steps.length } as CSSProperties}
    >
      {steps.map((step, index) => (
        <li key={`${step.label}-${index}`} className={styles.step}>
          <span className={styles.marker} aria-hidden="true" />
          <span className={styles.label}>{step.label}</span>
          <p className={cx(size === "md" ? "t-title-s" : styles.titleSm, styles.title)}>{step.title}</p>
          <p className={size === "md" ? "t-body-s" : styles.descriptionSm}>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
