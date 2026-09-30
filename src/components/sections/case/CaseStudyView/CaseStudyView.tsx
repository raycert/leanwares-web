import { Container } from "@/components/ui/Container/Container";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { Timeline } from "@/components/ui/Timeline/Timeline";
import type { CaseStudyContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { CtaBand } from "../../CtaBand/CtaBand";
import { RelatedContent } from "../../RelatedContent/RelatedContent";
import { CaseDataTable } from "../CaseDataTable/CaseDataTable";
import { CaseHero } from "../CaseHero/CaseHero";
import { CaseMeasures } from "../CaseMeasures/CaseMeasures";
import { CaseResults } from "../CaseResults/CaseResults";
import { SplitSection } from "../../SplitSection/SplitSection";
import styles from "./CaseStudyView.module.css";

/**
 * Case Study Detail archetype (template 5f + Phase 3B IA). One component for every case:
 * 1 Hero · 2 Challenge · 3 Data & baseline · 4 Analysis · 5 Solution · 6 Implementation ·
 * 7 Results · 8 Lessons (only with content) · 9 Related solutions · 10 CTA.
 * Section numbers follow what is actually rendered.
 */
export function CaseStudyView({ hero, sections, related, cta, fixtureNotice }: CaseStudyContent) {
  const { challenge, data, analysis, solution, implementation, results, lessons } = sections;
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  return (
    <>
      {fixtureNotice && (
        <Container>
          <p role="note" className={cx("t-data", styles.notice)}>
            {fixtureNotice}
          </p>
        </Container>
      )}

      <CaseHero {...hero} />

      <SplitSection id="thach-thuc" number={next()} title={challenge.title}>
        <div className={styles.challenge}>
          <p className="t-body">{challenge.text}</p>
          {challenge.image && (
            <ImageSlot
              image={challenge.image.image}
              placeholder={challenge.image.placeholder}
              ratio="3:2"
              className={styles.challengeImage}
              sizes="(min-width: 1280px) 30vw, 50vw"
            />
          )}
        </div>
      </SplitSection>

      <SplitSection id="du-lieu" number={next()} title={data.title}>
        <CaseDataTable intro={data.intro} columns={data.columns} rows={data.rows} />
      </SplitSection>

      <SplitSection id="phan-tich" number={next()} title={analysis.title}>
        <p className="t-body">{analysis.text}</p>
        {analysis.steps.length > 0 && <Timeline steps={analysis.steps} size="sm" />}
      </SplitSection>

      <SplitSection id="giai-phap" number={next()} title={solution.title}>
        <p className="t-body">{solution.text}</p>
        <CaseMeasures measures={solution.measures} />
      </SplitSection>

      {implementation && (
        <SplitSection id="trien-khai" number={next()} title={implementation.title}>
          <Timeline steps={implementation.steps} size="sm" />
        </SplitSection>
      )}

      <CaseResults id="ket-qua" number={next()} {...results} />

      {lessons && (
        <SplitSection id="bai-hoc" number={next()} title={lessons.title}>
          <ul role="list" className={styles.lessons}>
            {lessons.items.map((item) => (
              <li key={item} className="t-body">
                {item}
              </li>
            ))}
          </ul>
        </SplitSection>
      )}

      <RelatedContent title={related.title} items={related.items} headingId="lien-quan-title" />

      <CtaBand {...cta} />
    </>
  );
}
