import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Container.module.css";

type ContainerElement = "div" | "section" | "header" | "footer" | "main" | "nav" | "article" | "aside";

export interface ContainerProps {
  as?: ContainerElement;
  className?: string;
  id?: string;
  children: ReactNode;
}

/**
 * Centres content at the 1248px content width with the responsive page margin
 * (96 / 56 / 20). Full-bleed backgrounds belong on the parent section; Container
 * only constrains the content inside it.
 */
export function Container({ as: Tag = "div", className, id, children }: ContainerProps) {
  return (
    <Tag id={id} className={cx(styles.container, className)}>
      {children}
    </Tag>
  );
}
