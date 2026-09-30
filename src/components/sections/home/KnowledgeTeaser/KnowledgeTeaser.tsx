import Link from "next/link";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { KnowledgeTeaserContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./KnowledgeTeaser.module.css";

/**
 * "Góc nhìn & Tài liệu" (FD v3). Featured analysis with a 16:9 image + two article rows +
 * one resource. Mobile: the featured analysis becomes a plain row (no image) and only the
 * first article row is kept; "Tất cả kiến thức" is shown on desktop only.
 */
export function KnowledgeTeaser({ eyebrow, title, allLink, featured, articles, resource }: KnowledgeTeaserContent) {
  return (
    <section className={styles.section} aria-labelledby="knowledge-title">
      <Container className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headTitle}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="knowledge-title" className="t-h2-s">
              {title}
            </h2>
          </div>
          <TextLink href={allLink.href} variant="quiet" arrow className={styles.allLink}>
            {allLink.label}
          </TextLink>
        </div>

        <div className={styles.body}>
          <Link href={featured.href} className={styles.featured}>
            <ImageSlot
              image={featured.image.image}
              placeholder={featured.image.placeholder}
              ratio="16:9"
              className={styles.featuredImage}
              sizes="(min-width: 768px) 55vw, 1px"
            />
            <span className="t-eyebrow">{featured.type}</span>
            <span className={styles.featuredTitle}>{featured.title}</span>
          </Link>

          <div className={styles.side}>
            <ul role="list">
              {articles.map((article, index) => (
                <li key={article.type} className={cx(index > 0 && styles.hideMobile)}>
                  <Link href={article.href} className={styles.article}>
                    <span className="t-eyebrow">{article.type}</span>
                    <span className="t-title-s">{article.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className={cx("surface-subtle", styles.resource)}>
              <Eyebrow marker="orange">{resource.type}</Eyebrow>
              <p className="t-title-s">{resource.title}</p>
              <p className="t-data">{resource.format}</p>
              <TextLink href={resource.cta.href} size="sm" arrow className={styles.resourceLink}>
                {resource.cta.label}
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
