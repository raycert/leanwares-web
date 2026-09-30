"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FocusEvent, type PointerEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container/Container";
import { Logo } from "@/components/ui/Logo/Logo";
import type { SiteChrome } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { motion } from "@/lib/motion";
import { MegaMenu } from "../MegaMenu/MegaMenu";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import styles from "./SiteHeader.module.css";

export interface SiteHeaderProps {
  chrome: Pick<SiteChrome, "homeLabel" | "primaryNav" | "megaMenu" | "mobileMenu">;
}

/** Scroll distance after which the desktop header compacts from 80 to 64px. */
const COMPACT_AFTER = 24;

/**
 * Global header (LWHeader anatomy, DS V3 behaviour).
 *  - ≥ 1024: 7-item nav, sticky, compacts to 64px on scroll; "Giải pháp" opens the mega menu.
 *  - < 1024: logo + 48×48 menu button; not sticky in V1.
 * No search in the V1 header.
 */
export function SiteHeader({ chrome }: SiteHeaderProps) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFirstItem = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-mega`;

  const isCurrent = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)),
    [pathname],
  );

  // Compact state on scroll (only styled from 1024 up).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > COMPACT_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const schedule = (next: boolean) => {
    clearTimer();
    timer.current = setTimeout(() => setMegaOpen(next), next ? motion.menuOpenDelay : motion.menuCloseDelay);
  };
  const closeMega = (returnFocus = false) => {
    clearTimer();
    setMegaOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  // While open: Esc closes and returns focus; a pointer press outside the header closes.
  useEffect(() => {
    if (!megaOpen) return;
    if (focusFirstItem.current) {
      focusFirstItem.current = false;
      panelRef.current?.querySelector<HTMLElement>("[data-mega-col]")?.focus();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearTimer();
        setMegaOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e: globalThis.PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [megaOpen]);

  useEffect(() => clearTimer, []);

  const onHoverEnter = (e: PointerEvent) => {
    if (e.pointerType === "mouse") schedule(true);
  };
  const onHoverLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") schedule(false);
  };
  // Focus leaving the trigger + panel (same list item) closes the menu.
  const onBlurWithin = (e: FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (next && (triggerRef.current?.contains(next) || panelRef.current?.contains(next))) return;
    if (next) closeMega();
  };

  return (
    <header ref={headerRef} className={styles.header} data-compact={compact || undefined}>
      <Container className={styles.bar}>
        <Link href="/" className={styles.logoLink} aria-label={chrome.homeLabel}>
          <Logo placement="header" className={styles.logo} />
        </Link>

        <nav className={styles.nav} aria-label="Điều hướng chính">
          <ul role="list" className={styles.navList}>
            {chrome.primaryNav.map((item) => {
              const current = isCurrent(item.href);
              if (item.kind === "solutions") {
                return (
                  <li key={item.href} onPointerEnter={onHoverEnter} onPointerLeave={onHoverLeave} onBlur={onBlurWithin}>
                    <button
                      ref={triggerRef}
                      id={triggerId}
                      type="button"
                      className={cx(styles.navLink, (current || megaOpen) && styles.active)}
                      aria-expanded={megaOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        clearTimer();
                        setMegaOpen((v) => !v);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          clearTimer();
                          focusFirstItem.current = true;
                          if (megaOpen) panelRef.current?.querySelector<HTMLElement>("[data-mega-col]")?.focus();
                          else setMegaOpen(true);
                        }
                      }}
                    >
                      {item.label}
                    </button>
                    {/* In DOM order right after the trigger so Tab moves into the open panel.
                        Positioned against the header (full width), not the list item. */}
                    <MegaMenu
                      id={panelId}
                      labelledBy={triggerId}
                      open={megaOpen}
                      menu={chrome.megaMenu}
                      panelRef={panelRef}
                      onNavigate={() => closeMega()}
                    />
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cx(
                      item.kind === "contact" ? styles.contact : styles.navLink,
                      current && item.kind !== "contact" && styles.active,
                    )}
                    aria-current={current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <MobileMenu chrome={chrome} isCurrent={isCurrent} />
      </Container>

    </header>
  );
}
