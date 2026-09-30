import { ArticleRow } from "@/components/cards/ArticleRow/ArticleRow";
import { ResourceItem } from "@/components/cards/ResourceItem/ResourceItem";
import { GatedDownloadForm } from "@/components/forms/GatedDownloadForm/GatedDownloadForm";
import { AppLink } from "@/components/ui/AppLink/AppLink";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { Timeline } from "@/components/ui/Timeline/Timeline";
import type { KnowledgeDetailContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { CtaBand } from "../../CtaBand/CtaBand";
import { IndexList } from "../../industries/IndexList/IndexList";
import { RelatedContent } from "../../RelatedContent/RelatedContent";
import { SplitSection } from "../../SplitSection/SplitSection";
import styles from "./KnowledgeDetailView.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Knowledge detail archetype. One component, two layouts:
 *  - `article` (5r): 4 / 8 hero (meta | H1 + lead), 21:9 image, TOC + body (paragraphs,
 *    section headings, selective technical callouts, embedded resources, source line).
 *  - `resource` (5l): 7 / 5 hero (H1, lead, meta | download panel), then audience,
 *    contents and usage steps when supplied.
 * Both: related standards / topics, related solutions and industries, related content, CTA.
 * Sections without content are omitted.
 */
export function KnowledgeDetailView(content: KnowledgeDetailContent) {
  const { kind, hero, resource, standards, related, relatedKnowledge, cta, fixtureNotice } = content;

  return (
    <>
      {fixtureNotice && (
        <Container>
          <p role="note" className={cx("t-data", styles.notice)}>
            {fixtureNotice}
          </p>
        </Container>
      )}

      {kind === "article" ? <ArticleHero {...hero} /> : <ResourceHero hero={hero} resource={resource} />}

      {kind === "article" && <ArticleBody {...content} />}

      {resource && resource.audience.length > 0 && (
        <SplitSection id="doi-tuong" title="Tài liệu này dành cho ai">
          <IndexList
            items={resource.audience.map((a, i) => ({ marker: pad(i + 1), title: a.title, description: a.description }))}
          />
        </SplitSection>
      )}
      {resource && resource.contents.length > 0 && (
        <SplitSection id="noi-dung-tai-lieu" title="Nội dung tài liệu">
          <IndexList items={resource.contents.map((c, i) => ({ marker: `${pad(i + 1)}.`, title: c }))} />
        </SplitSection>
      )}
      {resource && resource.steps.length > 0 && (
        <SplitSection id="cach-su-dung" title="Cách sử dụng">
          <Timeline steps={resource.steps} />
        </SplitSection>
      )}

      {standards && (
        <SplitSection id="tieu-chuan-lien-quan" title={standards.title} note={standards.note}>
          <ul role="list" className={styles.codes}>
            {standards.items.map((item) => (
              <li key={item.code}>
                <AppLink href={item.href} className={styles.code}>
                  {item.code}
                  <span className="visually-hidden">: {item.label}</span>
                </AppLink>
              </li>
            ))}
          </ul>
        </SplitSection>
      )}

      <RelatedContent
        title={related.title}
        items={related.items}
        headingId="lien-quan-title"
        titleSize="h3"
        className={styles.related}
      />

      {relatedKnowledge && (
        <SplitSection id="noi-dung-lien-quan" title={relatedKnowledge.title}>
          <ul role="list" className={styles.relatedList}>
            {relatedKnowledge.items.map((item) => (
              <li key={item.key} className={cx(item.kind === "resource" && "surface-subtle")}>
                {item.kind === "resource" ? <ResourceItem item={item} /> : <ArticleRow item={item} />}
              </li>
            ))}
          </ul>
        </SplitSection>
      )}

      <CtaBand {...cta} className={styles.cta} />
    </>
  );
}

function Meta({ items }: { items: KnowledgeDetailContent["hero"]["meta"] }) {
  if (!items.length) return null;
  return (
    <dl className={styles.meta}>
      {items.map((m) => (
        <div key={m.label} className={styles.metaRow}>
          <dt>{m.label}</dt>
          <dd>{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ArticleHero({ breadcrumb, eyebrow, title, lead, meta, image }: KnowledgeDetailContent["hero"]) {
  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <Container>
        <Breadcrumb items={breadcrumb} className={styles.breadcrumb} />
        <div className={styles.articleHead}>
          <div className={styles.articleMeta}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Meta items={meta} />
          </div>
          <div className={styles.articleTitle}>
            <h1 id="page-title" className="t-display-m">
              {title}
            </h1>
            <p className={cx("t-lead", styles.lead)}>{lead}</p>
          </div>
        </div>
        <ImageSlot
          image={image.image}
          placeholder={image.placeholder}
          ratio="21:9"
          mobileRatio="16:9"
          priority
          sizes="(min-width: 1440px) 1248px, 100vw"
        />
      </Container>
    </section>
  );
}

function ResourceHero({
  hero,
  resource,
}: {
  hero: KnowledgeDetailContent["hero"];
  resource: KnowledgeDetailContent["resource"];
}) {
  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <Container>
        <Breadcrumb items={hero.breadcrumb} className={styles.breadcrumb} />
        <div className={styles.resourceHead}>
          <div className={styles.resourceCopy}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 id="page-title" className="t-display-m">
              {hero.title}
            </h1>
            <p className={cx("t-lead", styles.lead)}>{hero.lead}</p>
            <Meta items={hero.meta} />
          </div>
          {resource && <GatedDownloadForm {...resource.download} />}
        </div>
      </Container>
    </section>
  );
}

function ArticleBody({ body, toc, embeds }: KnowledgeDetailContent) {
  if (!body.length) return null;
  return (
    <div className={styles.bodySection}>
      <Container className={styles.bodyGrid}>
        {toc.length > 0 ? (
          <nav className={styles.toc} aria-labelledby="toc-title">
            <p id="toc-title" className={cx("t-eyebrow", styles.tocTitle)}>
              Nội dung bài viết
            </p>
            <ol role="list">
              {toc.map((entry) => (
                <li key={entry.id}>
                  <a href={`#${entry.id}`} className={styles.tocLink}>
                    {entry.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : (
          <div />
        )}
        <div className={styles.prose}>
          {body.map((block, i) => {
            switch (block.kind) {
              case "paragraph":
                return <p key={i}>{block.text}</p>;
              case "heading":
                return (
                  <h2 key={i} id={block.id} className={cx("t-title-l", styles.heading)}>
                    {block.text}
                  </h2>
                );
              case "callout":
                return (
                  <aside key={i} className={styles.callout} aria-label={block.label}>
                    <p className="t-eyebrow">{block.label}</p>
                    <p>{block.text}</p>
                  </aside>
                );
              case "resource": {
                const item = embeds[block.recordId];
                return item ? (
                  <div key={i} className={cx("surface-subtle", styles.embed)}>
                    <ResourceItem item={item} headingLevel="p" />
                  </div>
                ) : null;
              }
              case "source":
                return (
                  <p key={i} className={cx("t-data", styles.source)}>
                    {block.text}
                  </p>
                );
            }
          })}
        </div>
      </Container>
    </div>
  );
}
