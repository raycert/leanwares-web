"use client";

import { useId, useState } from "react";
import { IndustryRow } from "@/components/cards/IndustryRow/IndustryRow";
import { Container } from "@/components/ui/Container/Container";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { IndustryItem } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./IndustriesExplorer.module.css";

export interface IndustriesExplorerProps {
  label: string;
  items: IndustryItem[];
  linkLabel: string;
}

function Insights({ items }: { items: IndustryItem["insights"] }) {
  if (!items?.length) return null;
  return (
    <dl className={styles.insights}>
      {items.map((row) => (
        <div key={row.label} className={styles.insight}>
          <dt className={styles.insightLabel}>{row.label}</dt>
          <dd className={styles.insightValue}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * /nganh industry explorer (template 5u).
 *  - From 768: 7 / 5. Hover or focus on a numbered row selects it (photo + insights swap);
 *    Enter / click opens the industry page. The link under the list opens the selected one.
 *  - Below 768: accordion. A row toggles its panel (photo, insights, link to the industry).
 */
export function IndustriesExplorer({ label, items, linkLabel }: IndustriesExplorerProps) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();
  const current = items[active];

  return (
    <section className={styles.section} aria-labelledby={`${uid}-label`}>
      <Container>
        <div className={styles.inner}>
          {/* Tablet / desktop */}
          <div className={styles.aside}>
            <div className={styles.media}>
              {items.map((item, index) => (
                <div
                  key={item.href}
                  className={cx(styles.frame, index === active && styles.frameActive)}
                  aria-hidden={index !== active}
                >
                  <ImageSlot
                    image={item.image.image}
                    placeholder={item.image.placeholder}
                    ratio="4:3"
                    sizes="(min-width: 768px) 55vw, 1px"
                  />
                </div>
              ))}
            </div>
            <Insights items={current?.insights} />
          </div>

          <div className={styles.listColumn}>
            <h2 id={`${uid}-label`} className={cx("t-eyebrow", styles.label)}>
              {label}
            </h2>

            <ul role="list" className={styles.list}>
              {items.map((item, index) => (
                <li key={item.href}>
                  <IndustryRow
                    variant="overview"
                    number={item.number}
                    name={item.name}
                    href={item.href}
                    active={index === active}
                    onActivate={() => setActive(index)}
                  />
                </li>
              ))}
            </ul>
            {current && (
              <div className={styles.link}>
                <TextLink href={current.href} arrow>
                  {linkLabel}
                  <span className="visually-hidden">: {current.name}</span>
                </TextLink>
              </div>
            )}

            {/* Mobile accordion */}
            <ul role="list" className={styles.accordion}>
              {items.map((item, index) => {
                const expanded = open === index;
                const panelId = `${uid}-panel-${index}`;
                return (
                  <li key={item.href} className={styles.accordionItem}>
                    <h3 className={styles.accordionHeading}>
                      <button
                        type="button"
                        className={cx(styles.trigger, expanded && styles.triggerOpen)}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => setOpen(expanded ? null : index)}
                      >
                        <span className={styles.triggerNumber} aria-hidden="true">
                          {item.number}
                        </span>
                        <span className={cx("t-title-l", styles.triggerName)}>{item.name}</span>
                        <span className={styles.sign} aria-hidden="true">
                          {expanded ? "−" : "+"}
                        </span>
                      </button>
                    </h3>
                    <div id={panelId} className={styles.panel} hidden={!expanded}>
                      <ImageSlot
                        image={item.image.image}
                        placeholder={item.image.placeholder}
                        ratio="4:3"
                        sizes="(max-width: 767px) 100vw, 1px"
                      />
                      <Insights items={item.insights} />
                      <TextLink href={item.href} arrow>
                        {linkLabel}
                        <span className="visually-hidden">: {item.name}</span>
                      </TextLink>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
