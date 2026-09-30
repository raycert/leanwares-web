import { Button } from "@/components/ui/Button/Button";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { ProjectListItem } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./ProjectRow.module.css";

export interface ProjectRowProps {
  item: ProjectListItem;
  /** Photo on the right (alternating rows, as in 5v). */
  flip?: boolean;
  headingLevel?: "h2" | "h3";
}

/**
 * Project row (LWProjectItem anatomy, template 5v). The fact rows carry the case narrative
 * Dữ liệu → Phân tích → Giải pháp → Kết quả (the challenge paragraph is the Bối cảnh).
 * "Xem dự án" renders only when a published detail page exists.
 */
export function ProjectRow({ item, flip = false, headingLevel: Heading = "h2" }: ProjectRowProps) {
  const titleId = `${item.key}-title`;
  return (
    <article className={cx(styles.row, flip && styles.flip)} aria-labelledby={titleId}>
      <ImageSlot
        image={item.image.image}
        placeholder={item.image.placeholder}
        ratio="4:3"
        className={styles.photo}
        sizes="(min-width: 768px) 40vw, 100vw"
      />
      <div className={styles.text}>
        <Eyebrow>{item.eyebrow}</Eyebrow>
        <Heading id={titleId} className="t-h4">
          {item.title}
        </Heading>
        <p className={cx("t-body-s", styles.challenge)}>{item.challenge}</p>
        <dl className={styles.facts}>
          {item.facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        {item.href && (
          <>
            <TextLink href={item.href} arrow className={styles.link}>
              Xem dự án
            </TextLink>
            <Button href={item.href} variant="secondary" fullWidth className={styles.button}>
              Xem dự án <span aria-hidden="true">→</span>
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
