"use client";

import Link from "next/link";
import type { KeyboardEvent, PointerEventHandler, Ref } from "react";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { SiteChrome } from "@/lib/content/types";
import styles from "./MegaMenu.module.css";

export interface MegaMenuProps {
  id: string;
  labelledBy: string;
  open: boolean;
  menu: SiteChrome["megaMenu"];
  panelRef?: Ref<HTMLDivElement>;
  onNavigate: () => void;
  onPointerEnter?: PointerEventHandler<HTMLDivElement>;
  onPointerLeave?: PointerEventHandler<HTMLDivElement>;
}

/**
 * Desktop mega menu for "Giải pháp" (DS V3, template M): three pillar columns, a vertical
 * rule, then column 4 "ESG & Hệ thống quản lý". Full width under the header.
 * Keyboard: ↑/↓ within a column, ←/→ between columns. Esc is handled by SiteHeader.
 */
export function MegaMenu({
  id,
  labelledBy,
  open,
  menu,
  panelRef,
  onNavigate,
  onPointerEnter,
  onPointerLeave,
}: MegaMenuProps) {
  const pillarColumns = menu.columns.slice(0, 3);
  const crossColumn = menu.columns[3];

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    const current = event.target as HTMLElement;
    const col = Number(current.dataset.megaCol);
    const row = Number(current.dataset.megaRow);
    if (Number.isNaN(col) || Number.isNaN(row)) return;

    const items = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("[data-mega-col]"));
    const inColumn = (c: number) => items.filter((el) => Number(el.dataset.megaCol) === c);
    const columnCount = menu.columns.length;
    let target: HTMLAnchorElement | undefined;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const list = inColumn(col);
      const next = event.key === "ArrowDown" ? row + 1 : row - 1;
      target = list[(next + list.length) % list.length];
    } else {
      const nextCol = (col + (event.key === "ArrowRight" ? 1 : -1) + columnCount) % columnCount;
      const list = inColumn(nextCol);
      target = list[Math.min(row, list.length - 1)];
    }

    if (target) {
      event.preventDefault();
      target.focus();
    }
  }

  const renderItems = (columnIndex: number) => (
    <ul role="list" className={styles.items}>
      {menu.columns[columnIndex]?.items.map((item, rowIndex) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className={styles.item}
            data-mega-col={columnIndex}
            data-mega-row={rowIndex}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      id={id}
      ref={panelRef}
      role="region"
      aria-labelledby={labelledBy}
      className={styles.panel}
      hidden={!open}
      onKeyDown={handleKeyDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <Container className={styles.grid}>
        {pillarColumns.map((column, index) => (
          <div key={column.title} className={styles.column}>
            <p className={styles.head}>
              {column.number && <span className={styles.number}>{column.number}</span>}
              <span className={styles.title}>{column.title}</span>
            </p>
            {renderItems(index)}
          </div>
        ))}
        <span className={styles.divider} aria-hidden="true" />
        {crossColumn && (
          <div className={styles.column}>
            <div className={styles.headStacked}>
              {crossColumn.eyebrow && (
                <Eyebrow as="span" tone="muted">
                  {crossColumn.eyebrow}
                </Eyebrow>
              )}
              <span className={styles.title}>{crossColumn.title}</span>
            </div>
            {renderItems(3)}
          </div>
        )}
      </Container>
      <div className={styles.allBar}>
        <Container>
          <TextLink href={menu.allLink.href} arrow onClick={onNavigate}>
            {menu.allLink.label}
          </TextLink>
        </Container>
      </div>
    </div>
  );
}
