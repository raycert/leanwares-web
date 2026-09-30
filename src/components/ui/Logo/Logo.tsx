import Image from "next/image";
import { logo } from "@/lib/brand";
import { cx } from "@/lib/cx";
import styles from "./Logo.module.css";

export interface LogoProps {
  /** Height preset from FD v3: header (48 / 52), compact header (44), footer (56 / 72). */
  placement?: "header" | "compact" | "footer";
  className?: string;
}

/** Largest rendered height per placement (--logo-height-* tokens), used to size the request. */
const MAX_HEIGHT: Record<NonNullable<LogoProps["placement"]>, number> = { header: 52, compact: 44, footer: 72 };

/**
 * LEANWARES logo (src/lib/brand.ts). Height comes from the placement token; width follows
 * the file's intrinsic aspect ratio (never stretched or cropped). The approved JPG has a
 * white background, so it is placed only on white (header, mobile menu) or inside the
 * footer's white panel. The text fallback remains only for development resilience.
 */
export function Logo({ placement = "header", className }: LogoProps) {
  const classes = cx(styles.logo, styles[placement], className);

  if (logo.available && logo.width && logo.height) {
    // Request a display-sized image (next/image adds the 2× candidate), not the 1315px original.
    const height = MAX_HEIGHT[placement];
    const width = Math.round((height * logo.width) / logo.height);
    return (
      <Image
        src={logo.src}
        alt={logo.alt}
        width={width}
        height={height}
        quality={90}
        className={cx(classes, styles.image)}
        priority={placement !== "footer"}
      />
    );
  }

  return (
    <span className={cx(classes, styles.fallback)} data-placeholder="logo" title="Logo pending (src/lib/brand.ts)">
      {logo.alt}
    </span>
  );
}
