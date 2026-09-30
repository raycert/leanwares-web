import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { AppLink } from "../AppLink/AppLink";
import styles from "./TextLink.module.css";

export interface TextLinkProps extends Omit<ComponentPropsWithoutRef<typeof AppLink>, "className" | "children"> {
  /**
   * `accent`: default standalone link (DS V3 "Text link"): strong text with a 2px orange
   *   underline; hover turns text and underline blue-700.
   * `quiet`: 1px strong underline, e.g. "Tất cả kiến thức →" (FD v3).
   * `inline`: link inside running text: blue-700, underlined, hover navy.
   */
  variant?: "accent" | "quiet" | "inline";
  /** `lg`: 16px from 1280, 15px below (FD v3 hero). `md`: 15px. `sm`: 14px. */
  size?: "lg" | "md" | "sm";
  /** Appends a decorative → that nudges 4px on hover. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function TextLink({
  variant = "accent",
  size = "md",
  arrow = false,
  className,
  children,
  ...linkProps
}: TextLinkProps) {
  return (
    <AppLink {...linkProps} className={cx(styles.link, styles[variant], styles[size], className)}>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span aria-hidden="true" className={styles.arrow}>
          →
        </span>
      )}
    </AppLink>
  );
}
