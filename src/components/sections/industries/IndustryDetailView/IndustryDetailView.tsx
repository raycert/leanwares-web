import { ProjectRow } from "@/components/cards/ProjectRow/ProjectRow";
import { Container } from "@/components/ui/Container/Container";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { IndustryDetailContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { CtaBand } from "../../CtaBand/CtaBand";
import { PageHero } from "../../PageHero/PageHero";
import { RelatedContent } from "../../RelatedContent/RelatedContent";
import { SplitSection } from "../../SplitSection/SplitSection";
import { IndexList } from "../IndexList/IndexList";
import styles from "./IndustryDetailView.module.css";

/**
 * Industry Detail archetype (template 5e + Phase 3C IA). One component for all six industries:
 * Hero (21:9) · Industry context · Typical challenge areas · Market & regulatory topics
 * (approved relationships only) · Related pillars & capabilities · Priority solution groups
 * (→ /giai-phap/giam-phat-thai anchors) · Related projects (verified only) · Other industries ·
 * CTA. A section without supported content is omitted, never filled with invented items.
 */
export function IndustryDetailView({
  hero,
  context,
  challenges,
  standards,
  pillars,
  groups,
  projects,
  others,
  cta,
}: IndustryDetailContent) {
  return (
    <>
      <PageHero {...hero} imageLayout="wide" />

      <SplitSection id="boi-canh" title={context.title}>
        <p className={cx("t-body", styles.prose)}>{context.text}</p>
      </SplitSection>

      {challenges && (
        <SplitSection id="thach-thuc" title={challenges.title} note={challenges.note}>
          <IndexList
            items={challenges.items.map((item, index) => ({
              marker: String(index + 1).padStart(2, "0"),
              title: item.title,
              description: item.description,
            }))}
          />
        </SplitSection>
      )}

      {standards && (
        <SplitSection
          id="yeu-cau-thi-truong"
          title={standards.title}
          note={standards.note}
          className={cx("surface-subtle", styles.subtle)}
        >
          <IndexList
            variant="codes"
            items={standards.items.map((item) => ({ marker: item.code, title: item.label, description: item.description }))}
          />
        </SplitSection>
      )}

      <RelatedContent
        title={pillars.title}
        items={pillars.items}
        headingId="tru-cot-title"
        titleSize="h3"
        className={styles.related}
      />

      {groups && (
        <SplitSection id="giai-phap-uu-tien" title={groups.title}>
          <IndexList
            items={groups.items.map((item) => ({
              marker: item.number,
              title: item.title,
              description: item.description,
              href: item.href,
            }))}
          />
        </SplitSection>
      )}

      <SplitSection id="du-an-lien-quan" title={projects.title}>
        {projects.items.length > 0 ? (
          <div className={styles.projects}>
            {projects.items.map((item, index) => (
              <ProjectRow key={item.key} item={item} flip={index % 2 === 1} headingLevel="h3" />
            ))}
          </div>
        ) : (
          <p className={cx("t-body", styles.empty)}>{projects.emptyText}</p>
        )}
      </SplitSection>

      <section className={styles.others} aria-labelledby="nganh-khac-title">
        <Container className={styles.othersInner}>
          <h2 id="nganh-khac-title" className="t-h4">
            {others.title}
          </h2>
          <ul role="list" className={styles.othersList}>
            {others.items.map((item) => (
              <li key={item.href}>
                <TextLink href={item.href} arrow>
                  {item.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand {...cta} />
    </>
  );
}
