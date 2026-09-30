"use client";

import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { ProjectRow } from "@/components/cards/ProjectRow/ProjectRow";
import { Container } from "@/components/ui/Container/Container";
import type { ProjectFilterConfig, ProjectListItem } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./ProjectExplorer.module.css";

export interface ProjectExplorerProps {
  items: ProjectListItem[];
  filters: ProjectFilterConfig;
  /** Filters render only when there are real records to filter (not for placeholders). */
  showFilters: boolean;
  /** Visible note above placeholder rows. */
  note?: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled])';

/**
 * /du-an listing (template 5v): filter bar (industry, solution group, optional year),
 * result count, project rows. Below 768 the filters open in a bottom sheet (modal dialog).
 */
export function ProjectExplorer({ items, filters, showFilters, note }: ProjectExplorerProps) {
  const [industries, setIndustries] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [year, setYear] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const years = useMemo(
    () => Array.from(new Set(items.flatMap((item) => (item.filters.year ? [item.filters.year] : [])))).sort(),
    [items],
  );

  const visible = items.filter(
    (item) =>
      (industries.length === 0 || (item.filters.industry !== null && industries.includes(item.filters.industry))) &&
      (groups.length === 0 || (item.filters.group !== null && groups.includes(item.filters.group))) &&
      (!year || item.filters.year === year),
  );

  const activeCount = industries.length + groups.length + (year ? 1 : 0);
  const toggle = (list: string[], set: (v: string[]) => void, key: string) =>
    set(list.includes(key) ? list.filter((k) => k !== key) : [...list, key]);
  const clear = () => {
    setIndustries([]);
    setGroups([]);
    setYear("");
  };
  const labelOf = (key: string) =>
    [...filters.industries, ...filters.groups].find((option) => option.key === key)?.label ?? key;
  const countText = filters.resultTemplate.replace("{count}", String(visible.length));

  const closeSheet = () => {
    setSheetOpen(false);
    requestAnimationFrame(() => openRef.current?.focus());
  };

  useEffect(() => {
    if (!sheetOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => {
      root.style.overflow = previous;
    };
  }, [sheetOpen]);

  function onSheetKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSheet();
      return;
    }
    if (event.key !== "Tab" || !sheetRef.current) return;
    const focusable = Array.from(sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const chips = (options: ReadonlyArray<{ key: string; label: string }>, selected: string[], set: (v: string[]) => void) => (
    <div className={styles.chips}>
      {options.map((option) => {
        const on = selected.includes(option.key);
        return (
          <button
            key={option.key}
            type="button"
            className={cx(styles.chip, on && styles.chipOn)}
            aria-pressed={on}
            onClick={() => toggle(selected, set, option.key)}
          >
            {option.label}
            {on && <span aria-hidden="true">×</span>}
          </button>
        );
      })}
    </div>
  );

  const checkboxes = (
    legend: string,
    options: ReadonlyArray<{ key: string; label: string }>,
    selected: string[],
    set: (v: string[]) => void,
  ) => (
    <fieldset className={styles.sheetGroup}>
      <legend className="t-eyebrow">{legend}</legend>
      {options.map((option) => (
        <label key={option.key} className={styles.check}>
          <input
            type="checkbox"
            checked={selected.includes(option.key)}
            onChange={() => toggle(selected, set, option.key)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );

  const yearSelect = (selectId: string) => (
    <select id={selectId} className={styles.select} value={year} onChange={(e) => setYear(e.target.value)}>
      <option value="">{filters.allYears}</option>
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  );

  return (
    <section className={styles.section} aria-label="Danh sách dự án">
      <Container>
        {showFilters && (
          <>
            {/* ≥ 768: filter bar */}
            <div className={styles.bar}>
              <div className={styles.barRow}>
                <span className="t-eyebrow">{filters.industryLabel}</span>
                {chips(filters.industries, industries, setIndustries)}
              </div>
              <div className={styles.barRow}>
                <span className="t-eyebrow">{filters.groupLabel}</span>
                {chips(filters.groups, groups, setGroups)}
              </div>
              {years.length > 0 && (
                <div className={cx(styles.barRow, styles.yearRow)}>
                  <label htmlFor={`${id}-year`} className="t-eyebrow">
                    {filters.yearLabel}
                  </label>
                  {yearSelect(`${id}-year`)}
                  <button type="button" className={styles.clear} onClick={clear} disabled={activeCount === 0}>
                    {filters.clearLabel}
                  </button>
                </div>
              )}
            </div>

            {/* < 768: filter button + active chips */}
            <div className={styles.mobileBar}>
              <button
                ref={openRef}
                type="button"
                className={styles.openButton}
                aria-haspopup="dialog"
                aria-expanded={sheetOpen}
                aria-controls={`${id}-sheet`}
                onClick={() => setSheetOpen(true)}
              >
                {filters.openLabel}
                {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
              </button>
              {activeCount > 0 && (
                <div className={styles.active}>
                  {[...industries, ...groups].map((key) => (
                    <button
                      key={key}
                      type="button"
                      className={styles.activeChip}
                      onClick={() =>
                        industries.includes(key)
                          ? toggle(industries, setIndustries, key)
                          : toggle(groups, setGroups, key)
                      }
                    >
                      {labelOf(key)} <span aria-hidden="true">×</span>
                      <span className="visually-hidden"> (bỏ lọc)</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className={cx("t-data-l", styles.count)} aria-live="polite">
              {countText}
            </p>
          </>
        )}

        {note && <p className={cx("t-data", styles.note)}>{note}</p>}

        <div className={styles.list}>
          {visible.map((item, index) => (
            <ProjectRow key={item.key} item={item} flip={index % 2 === 1} />
          ))}
          {visible.length === 0 && <p className={cx("t-body", styles.empty)}>Không có dự án phù hợp với bộ lọc.</p>}
        </div>
      </Container>

      {showFilters && (
        <div className={styles.scrim} hidden={!sheetOpen} onClick={closeSheet}>
          <div
            id={`${id}-sheet`}
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-sheet-title`}
            className={styles.sheet}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onSheetKeyDown}
          >
            <span className={styles.handle} aria-hidden="true" />
            <div className={styles.sheetHead}>
              <h2 id={`${id}-sheet-title`} className={styles.sheetTitle}>
                {filters.openLabel}
              </h2>
              <button type="button" className={styles.close} aria-label={filters.closeLabel} onClick={closeSheet}>
                <span aria-hidden="true" className={styles.cross} />
              </button>
            </div>
            <div className={styles.sheetBody}>
              {checkboxes(filters.industryLabel, filters.industries, industries, setIndustries)}
              {checkboxes(filters.groupLabel, filters.groups, groups, setGroups)}
              {years.length > 0 && (
                <div className={styles.sheetGroup}>
                  <label htmlFor={`${id}-year-m`} className="t-eyebrow">
                    {filters.yearLabel}
                  </label>
                  {yearSelect(`${id}-year-m`)}
                </div>
              )}
            </div>
            <div className={styles.sheetFoot}>
              <button type="button" className={styles.sheetClear} onClick={clear}>
                {filters.clearLabel}
              </button>
              <button type="button" className={styles.sheetApply} onClick={closeSheet}>
                {filters.resultTemplate.replace("{count}", String(visible.length)).replace(/^/, "Xem ")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
