import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { GhgFrameworkContent, GhgStep } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./GhgFramework.module.css";

const stepNumber = (index: number) => String(index + 1).padStart(2, "0");
const stepVar = (index: number) => ({ "--step": index }) as CSSProperties;

/**
 * GHG reduction framework (FD v3): one of the few technical-treatment blocks.
 *  - ≥ 1280: phase bar + 7-column staircase (each step 30px lower) + feedback-loop arc.
 *  - 768–1279: phases stacked, 3 + 4 step grid, feedback loop as an outlined note.
 *  - < 768: vertical timeline with phase headers.
 * The step list is the text equivalent of the chart (DS V3 accessibility note).
 *
 * Variants (templates differ, so these are props rather than copies):
 *  - `loop="arc"` + summary row: Final Direction v3 (homepage, GHG landing page).
 *  - `loop="note"`, `showSummary={false}`: template 5t (/giai-phap).
 */
export interface GhgFrameworkProps extends GhgFrameworkContent {
  /** Section id / in-page anchor, e.g. "khung-ghg". */
  id?: string;
  /** Desktop feedback loop: FD v3 arc or 5t outlined note. */
  loop?: "arc" | "note";
  showSummary?: boolean;
}

export function GhgFramework({ id, loop = "arc", showSummary = true, ...content }: GhgFrameworkProps) {
  const { eyebrow, title, lead, link, baseline, axisLabel, phases, steps, feedbackLoop, summary } = content;
  const headingId = `${id ?? "ghg"}-title`;
  const phase1 = steps.filter((s) => s.phase === 1);
  const phase2 = steps.filter((s) => s.phase === 2);

  return (
    <section id={id} className={styles.section} aria-labelledby={headingId}>
      <Container className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headTitle}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={headingId} className="t-h2">
              {title}
            </h2>
          </div>
          <div className={styles.headAside}>
            <p className={cx("t-body", styles.lead)}>{lead}</p>
            {link && (
              <TextLink href={link.href} variant="quiet" arrow>
                {link.label}
              </TextLink>
            )}
          </div>
        </div>

        {/* ---------- Desktop chart ---------- */}
        <div className={styles.chart}>
          <div className={styles.chartTop}>
            <span className={styles.baseline}>
              <span className={styles.marker} aria-hidden="true" />
              {baseline}
            </span>
            <span className={styles.axis}>{axisLabel}</span>
          </div>
          <div className={styles.phaseBar}>
            {([1, 2] as const).map((p) => (
              <div key={p} className={cx(styles.phase, styles[`phase${p}`])}>
                <Eyebrow as="p" tone={p === 1 ? "accent" : "strong"}>
                  {phases[p].label}
                </Eyebrow>
                <p className={styles.phaseTitle}>{phases[p].title}</p>
              </div>
            ))}
          </div>
          <ol role="list" className={styles.staircase}>
            {steps.map((step, index) => (
              <li key={step.title} className={styles.stairStep} style={stepVar(index)}>
                <span className={cx(styles.bar, step.phase === 2 && styles.barPhase2)} aria-hidden="true" />
                <StepText step={step} index={index} />
              </li>
            ))}
          </ol>
          {loop === "arc" ? (
            <div className={styles.loop}>
              <span className={styles.loopArc} aria-hidden="true" />
              <span className={styles.loopArrow} aria-hidden="true">
                ▲
              </span>
              <p className={styles.loopText}>{feedbackLoop}</p>
            </div>
          ) : (
            <p className={cx(styles.loopNote, styles.chartNote)}>
              <span className={styles.loopIcon} aria-hidden="true">
                ↻
              </span>
              <span>{feedbackLoop}</span>
            </p>
          )}
          {showSummary && summary && (
            <div className={styles.summary}>
              <span>{summary.baseline}</span>
              <span>{summary.target}</span>
              <span className={styles.summaryDelta}>
                <span className={styles.marker} aria-hidden="true" />
                {summary.delta}
              </span>
            </div>
          )}
        </div>

        {/* ---------- Tablet / mobile ---------- */}
        <div className={styles.stacked}>
          <p className={styles.baseline}>
            <span className={styles.marker} aria-hidden="true" />
            {baseline}
          </p>
          {([1, 2] as const).map((p) => {
            const list = p === 1 ? phase1 : phase2;
            const offset = p === 1 ? 0 : phase1.length;
            return (
              <div key={p} className={cx(styles.phaseBlock, styles[`phase${p}`])}>
                <Eyebrow as="h3" tone={p === 1 ? "accent" : "strong"} className={styles.phaseLabel}>
                  {phases[p].label} · {phases[p].title}
                </Eyebrow>
                <ol role="list" className={cx(styles.phaseSteps, p === 1 ? styles.cols3 : styles.cols4)}>
                  {list.map((step, i) => (
                    <li
                      key={step.title}
                      className={cx(styles.stackStep, p === 1 && styles.offsetStep)}
                      style={stepVar(offset + i)}
                    >
                      <StepText step={step} index={offset + i} />
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
          <p className={styles.loopNote}>
            <span className={styles.loopIcon} aria-hidden="true">
              ↻
            </span>
            <span>{feedbackLoop}</span>
          </p>
          {showSummary && summary && (
            <div className={styles.stackedSummary}>
              <span className={styles.summaryBaseline}>{summary.baseline}</span>
              <span>{summary.target}</span>
              <span className={styles.summaryDelta}>
                <span className={styles.marker} aria-hidden="true" />
                {summary.delta}
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function StepText({ step, index }: { step: GhgStep; index: number }) {
  return (
    <>
      <span className={styles.stepNumber}>{stepNumber(index)}</span>
      <p className={cx("t-title-s", styles.stepTitle)}>{step.title}</p>
      <p className={cx("t-small", styles.stepText)}>{step.description}</p>
    </>
  );
}
