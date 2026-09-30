import { ContactForm } from "@/components/forms/ContactForm/ContactForm";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { ContactPageContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./ContactView.module.css";

/**
 * /lien-he (template 5j): 5 / 7. Left: eyebrow, H1, lead, "Sau khi bạn gửi" steps, verified
 * contact details (block omitted when none). Right: enquiry form. Below 768 the form
 * follows the hero and the steps / details move to a subtle block (5j 390).
 */
export function ContactView({ hero, nextSteps, details, form }: ContactPageContent) {
  return (
    <section className={styles.section} aria-labelledby="page-title">
      <Container className={styles.grid}>
        <div className={styles.intro}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="page-title" className="t-display-m">
            {hero.title}
          </h1>
          <p className="t-lead">{hero.lead}</p>
        </div>

        <div className={styles.form}>
          <ContactForm {...form} />
        </div>

        <div className={cx("surface-subtle", styles.aside)}>
          <div className={styles.steps}>
            <h2 className={cx("t-eyebrow", styles.stepsTitle)}>{nextSteps.title}</h2>
            <ol role="list" className={styles.stepList}>
              {nextSteps.steps.map((step) => (
                <li key={step.label} className={styles.step}>
                  <span className={styles.marker} aria-hidden="true" />
                  <span className={styles.stepLabel}>{step.label}</span>
                  <p className="t-title-s">{step.title}</p>
                  <p className="t-body-s">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
          {details.length > 0 && (
            <dl className={styles.details}>
              {details.map((d) => (
                <div key={d.label} className={styles.detail}>
                  <dt>{d.label}</dt>
                  <dd>{d.href ? <a href={d.href}>{d.value}</a> : d.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Container>
    </section>
  );
}
