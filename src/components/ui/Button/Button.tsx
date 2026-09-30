import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { AppLink } from "../AppLink/AppLink";
import styles from "./Button.module.css";

interface ButtonOwnProps {
  /**
   * `primary`: blue fill, hover blue-700 (main action).
   * `secondary`: 1px outline, hover fills with the outline colour. Surface-aware:
   *   navy on light surfaces, white on navy/blue.
   * `inverse`: white fill with a 3px orange bottom border, for use on blue/navy
   *   (e.g. "Đăng ký đánh giá sơ bộ" in the CTA band).
   */
  variant?: "primary" | "secondary" | "inverse";
  /** `md`: 15px / 52px (templates). `lg`: 16px / 56px from 1280 (FD v3 hero, CTA band), md below. */
  size?: "md" | "lg";
  /** Stretch to the container width: always (`true`) or below 768 only (`"mobile"`). */
  fullWidth?: boolean | "mobile";
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    /** Disables the button and marks it busy while a form submits. */
    loading?: boolean;
  };

type ButtonAsLink = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<typeof AppLink>, "className" | "children"> & {
    href: ComponentPropsWithoutRef<typeof AppLink>["href"];
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button per DS V3 (default / hover / focus-visible / disabled / loading).
 * Renders a link (AppLink: next/link, or a native anchor for #hash) when `href` is given, otherwise a <button>.
 * Links cannot be disabled; use a button for actions that can be unavailable.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, fullWidth, className, children, ...linkProps } = props;
    return (
      <AppLink {...linkProps} className={buttonClasses({ variant, size, fullWidth, className })}>
        {children}
      </AppLink>
    );
  }

  const { variant, size, fullWidth, className, children, loading = false, disabled, type = "button", ...buttonProps } =
    props;

  return (
    <button
      {...buttonProps}
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {children}
    </button>
  );
}

function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: Pick<ButtonOwnProps, "variant" | "size" | "fullWidth" | "className">) {
  return cx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth === true && styles.fullWidth,
    fullWidth === "mobile" && styles.fullWidthMobile,
    className,
  );
}
