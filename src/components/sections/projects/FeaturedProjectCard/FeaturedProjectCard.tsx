import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { ProjectListItem } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./FeaturedProjectCard.module.css";

export interface FeaturedProjectCardProps {
  item: ProjectListItem;
  label: string;
  className?: string;
}

/**
 * Featured project block on /du-an (template 5v): off-white panel, 3:2 photo, orange marker
 * label, serif title, challenge and a mono result line. Links only to a published detail page.
 */
export function FeaturedProjectCard({ item, label, className }: FeaturedProjectCardProps) {
  const result = item.facts.find((fact) => fact.label === "Kết quả");
  return (
    <section className={cx(styles.section, className)} aria-labelledby="featured-project-title">
      <Container>
        <div className={cx("surface-subtle", styles.panel)}>
          <ImageSlot
            image={item.image.image}
            placeholder={item.image.placeholder}
            ratio="3:2"
            mobileRatio="4:3"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
          <div className={styles.copy}>
            <Eyebrow marker="orange">
              {label} · {item.eyebrow}
            </Eyebrow>
            <h2 id="featured-project-title" className="t-h4">
              {item.title}
            </h2>
            <p className="t-body-s">{item.challenge}</p>
            {result && (
              <p className="t-data">
                {result.label}: {result.value}
              </p>
            )}
            {item.href && (
              <TextLink href={item.href} arrow>
                Xem dự án
              </TextLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
