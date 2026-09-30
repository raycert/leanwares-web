"use client";

import { useState } from "react";
import { IndustryRow } from "@/components/cards/IndustryRow/IndustryRow";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import type { IndustryExplorerContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./IndustryExplorer.module.css";

/**
 * Industry explorer (FD v3, DS V3 interaction notes).
 * From 768: hovering or focusing an industry swaps the 4:3 image (200ms crossfade); the
 * selected row gets a 3px blue bar on white. The first industry is selected by default.
 * Enter / click opens the industry. Below 768: no image, rows are direct links.
 */
export function IndustryExplorer({ eyebrow, title, industries }: IndustryExplorerContent) {
  const [active, setActive] = useState(0);

  return (
    <section className={cx("surface-subtle", styles.section)} aria-labelledby="industries-title">
      <Container className={styles.inner}>
        <div className={styles.aside}>
          <div className={styles.head}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="industries-title" className="t-h2-s">
              {title}
            </h2>
          </div>
          <div className={styles.media}>
            {industries.map((industry, index) => (
              <div
                key={industry.href}
                className={cx(styles.frame, index === active && styles.frameActive)}
                aria-hidden={index !== active}
              >
                <ImageSlot
                  image={industry.image.image}
                  placeholder={industry.image.placeholder}
                  ratio="4:3"
                  sizes="(min-width: 768px) 40vw, 1px"
                />
              </div>
            ))}
          </div>
        </div>
        <ul role="list" className={styles.list}>
          {industries.map((industry, index) => (
            <li key={industry.href}>
              <IndustryRow
                variant="home"
                name={industry.name}
                href={industry.href}
                active={index === active}
                onActivate={() => setActive(index)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
