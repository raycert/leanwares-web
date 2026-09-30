"use client";

import Link from "next/link";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Logo } from "@/components/ui/Logo/Logo";
import { breakpoints } from "@/lib/breakpoints";
import type { SiteChrome } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./MobileMenu.module.css";

export interface MobileMenuProps {
  chrome: Pick<SiteChrome, "homeLabel" | "primaryNav" | "megaMenu" | "mobileMenu">;
  isCurrent: (href: string) => boolean;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen mobile menu (DS V3, template M), below 1024.
 * Opened from a 48×48 button; the close button sits in the same position. Level-1 rows
 * are 56px, level-2 rows 48px. "Giải pháp" is an accordion with one group open at a time.
 * Focus is trapped while open; Esc or × closes and returns focus to the open button.
 */
export function MobileMenu({ chrome, isCurrent }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const dialogId = `${baseId}-menu`;
  const solutionsId = `${baseId}-solutions`;

  const { primaryNav, megaMenu, mobileMenu, homeLabel } = chrome;
  const home = primaryNav.find((item) => item.href === "/");
  const solutions = primaryNav.find((item) => item.kind === "solutions");
  const rest = primaryNav.filter((item) => item !== home && item !== solutions);

  function close(returnFocus = true) {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => openButtonRef.current?.focus());
  }

  // While open: lock page scroll, focus the close button, close if the viewport grows
  // into the desktop header range.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const desktop = window.matchMedia(`(min-width: ${breakpoints.tabletRef}px)`);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => {
      root.style.overflow = previous;
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
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

  const navigate = () => close(false);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label={mobileMenu.openLabel}
        onClick={() => setOpen(true)}
      >
        <span className={styles.burger} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        id={dialogId}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={styles.dialog}
        hidden={!open}
        onKeyDown={handleKeyDown}
      >
        <Container className={styles.bar}>
          <Link href="/" aria-label={homeLabel} onClick={navigate}>
            <Logo placement="header" />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.toggle}
            aria-label={mobileMenu.closeLabel}
            onClick={() => close()}
          >
            <span className={styles.cross} aria-hidden="true" />
          </button>
        </Container>

        <Container as="nav" className={styles.body}>
          <ul role="list">
            {home && (
              <li className={styles.row}>
                <Link
                  href={home.href}
                  className={styles.level1}
                  aria-current={isCurrent(home.href) ? "page" : undefined}
                  onClick={navigate}
                >
                  {home.label}
                </Link>
              </li>
            )}

            {solutions && (
              <li className={styles.row}>
                <button
                  type="button"
                  className={cx(styles.level1, solutionsOpen && styles.expanded)}
                  aria-expanded={solutionsOpen}
                  aria-controls={solutionsId}
                  onClick={() => setSolutionsOpen((v) => !v)}
                >
                  <span>{solutions.label}</span>
                  <span aria-hidden="true">{solutionsOpen ? "−" : "+"}</span>
                </button>
                <div id={solutionsId} className={styles.solutions} hidden={!solutionsOpen}>
                  {megaMenu.columns.map((column, index) => {
                    const groupOpen = openGroup === index;
                    const groupId = `${solutionsId}-${index}`;
                    return (
                      <div key={column.title} className={styles.group}>
                        <button
                          type="button"
                          className={styles.level2Head}
                          aria-expanded={groupOpen}
                          aria-controls={groupId}
                          onClick={() => setOpenGroup(groupOpen ? null : index)}
                        >
                          <span>{column.title}</span>
                          <span aria-hidden="true" className={styles.sign}>
                            {groupOpen ? "−" : "+"}
                          </span>
                        </button>
                        <ul role="list" id={groupId} hidden={!groupOpen}>
                          {column.items.map((item) => (
                            <li key={item.label}>
                              <Link href={item.href} className={styles.level2} onClick={navigate}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  <Link href={megaMenu.allLink.href} className={styles.allLink} onClick={navigate}>
                    {megaMenu.allLink.label} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </li>
            )}

            {rest.map((item) => (
              <li key={item.href} className={styles.row}>
                <Link
                  href={item.href}
                  className={styles.level1}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={navigate}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className={styles.arrow}>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Button href={mobileMenu.cta.href} fullWidth className={styles.cta} onClick={navigate}>
            {mobileMenu.cta.label}
          </Button>
        </Container>
      </div>
    </>
  );
}
