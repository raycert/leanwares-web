"use client";

import { useState } from "react";
import { ArticleRow } from "@/components/cards/ArticleRow/ArticleRow";
import { ResourceItem } from "@/components/cards/ResourceItem/ResourceItem";
import { Container } from "@/components/ui/Container/Container";
import type { KnowledgeListingContent, KnowledgeTypeId } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./KnowledgeExplorer.module.css";

export type KnowledgeExplorerProps = Pick<KnowledgeListingContent, "tabs" | "items" | "placeholder" | "placeholderNote">;

/**
 * 5q mixed list: article rows and resource rows (subtle surface) in one list under type
 * tabs. Tabs appear only when real (or internal fixture) items exist; while the list holds
 * layout placeholders, a note says so and nothing links.
 */
export function KnowledgeExplorer({ tabs, items, placeholder, placeholderNote }: KnowledgeExplorerProps) {
  const [type, setType] = useState<KnowledgeTypeId | "all">("all");
  const visible = type === "all" ? items : items.filter((item) => item.type === type);
  const available = new Set(items.map((item) => item.type));

  return (
    <section className={styles.section} aria-labelledby="kien-thuc-list-title">
      <h2 id="kien-thuc-list-title" className="visually-hidden">
        Bài viết và tài liệu
      </h2>
      {!placeholder && (
        <div className={styles.tabsBar}>
          <Container>
            <div role="group" aria-label={tabs.label} className={styles.tabs}>
              {[{ key: "all" as const, label: tabs.all }, ...tabs.items.filter((t) => available.has(t.key))].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={cx(styles.tab, type === tab.key && styles.tabActive)}
                  aria-pressed={type === tab.key}
                  onClick={() => setType(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Container>
        </div>
      )}
      <Container>
        {placeholder && <p className={cx("t-data", styles.note)}>{placeholderNote}</p>}
        <p className="visually-hidden" aria-live="polite">
          {visible.length} mục
        </p>
        <ul role="list" className={styles.list}>
          {visible.map((item) => (
            <li key={item.key} className={cx(item.kind === "resource" && cx("surface-subtle", styles.resource))}>
              {item.kind === "resource" ? <ResourceItem item={item} /> : <ArticleRow item={item} />}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
