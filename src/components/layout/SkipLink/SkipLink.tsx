import styles from "./SkipLink.module.css";

export interface SkipLinkProps {
  targetId: string;
  label: string;
}

/** DS V3: skip link at the top of every page, visible on keyboard focus. */
export function SkipLink({ targetId, label }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      {label}
    </a>
  );
}
