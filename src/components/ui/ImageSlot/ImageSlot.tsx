import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { ImageAsset, ImageRatio } from "@/lib/content/types";
import styles from "./ImageSlot.module.css";

export interface ImageSlotProps {
  /** Approved photo. When absent, a striped placeholder is rendered (no stock photos). */
  image?: ImageAsset;
  /** Visible placeholder label, e.g. "[ẢNH THẬT 4:5] hiện trường nhà máy". */
  placeholder: string;
  /** Aspect ratio from 1280 up (DS V3 ratio table). */
  ratio: ImageRatio;
  /** 768–1279. Defaults to `ratio`. */
  tabletRatio?: ImageRatio;
  /** Below 768. Defaults to `tabletRatio`. */
  mobileRatio?: ImageRatio;
  /** `dark` for navy surfaces. */
  tone?: "light" | "dark";
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Overlay content, e.g. an annotated measurement point. */
  children?: ReactNode;
}

const toCss = (r: ImageRatio) => r.replace(":", " / ");

/** Image with an enforced aspect ratio per breakpoint tier and a placeholder mode. */
export function ImageSlot({
  image,
  placeholder,
  ratio,
  tabletRatio,
  mobileRatio,
  tone = "light",
  sizes = "100vw",
  priority = false,
  className,
  children,
}: ImageSlotProps) {
  const tablet = tabletRatio ?? ratio;
  const mobile = mobileRatio ?? tablet;
  const style = {
    "--slot-ratio-lg": toCss(ratio),
    "--slot-ratio-md": toCss(tablet),
    "--slot-ratio-sm": toCss(mobile),
  } as CSSProperties;

  return (
    <div
      className={cx(styles.slot, styles[tone], className)}
      style={style}
    >
      {image ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={styles.image} />
      ) : (
        <span className={styles.placeholder} aria-hidden="true" data-placeholder="image">
          {placeholder}
        </span>
      )}
      {children}
    </div>
  );
}
