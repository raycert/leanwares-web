import { AppLink } from "@/components/ui/AppLink/AppLink";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Container } from "@/components/ui/Container/Container";
import type { LegalPageContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./LegalView.module.css";

/**
 * Legal archetype (template 5p, with the canonical footer): breadcrumb, H1, last-updated
 * line, tabs between the three legal pages, then TOC (3) + content (9). Only approved
 * sections render; with none, the page shows the legal-review placeholder and no TOC.
 */
export function LegalView({ breadcrumb, title, updated, draftNotice, tabs, tabsLabel, tocLabel, sections, placeholder }: LegalPageContent) {
  return (
    <>
      <section className={styles.head} aria-labelledby="page-title">
        <Container>
          <Breadcrumb items={breadcrumb} className={styles.breadcrumb} />
          <h1 id="page-title" className="t-h2">
            {title}
          </h1>
          {updated && <p className={cx("t-data", styles.updated)}>{updated}</p>}
          <nav aria-label={tabsLabel} className={styles.tabs}>
            <ul role="list">
              {tabs.map((tab) => (
                <li key={tab.href}>
                  <AppLink
                    href={tab.href}
                    className={cx(styles.tab, tab.current && styles.tabActive)}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <Container className={cx(styles.body, sections.length > 0 && styles.withToc)}>
        {sections.length > 0 ? (
          <>
            <nav className={styles.toc} aria-labelledby="legal-toc-title">
              <p id="legal-toc-title" className={cx("t-eyebrow", styles.tocTitle)}>
                {tocLabel}
              </p>
              <ol role="list">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className={styles.tocLink}>
                      {i + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className={styles.prose}>
              {draftNotice && <p className={styles.placeholder}>{draftNotice}</p>}
              {sections.map((section, i) => (
                <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                  <h2 id={`${section.id}-title`} className="t-title-l">
                    {i + 1}. {section.title}
                  </h2>
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </section>
              ))}
            </div>
          </>
        ) : (
          <p className={styles.placeholder}>{placeholder}</p>
        )}
      </Container>
    </>
  );
}
