import { Container } from "@/components/ui/Container/Container";
import { cx } from "@/lib/cx";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  text: string;
  className?: string;
}

/** Honest empty state for a listing with nothing publishable yet (no placeholder cards). */
export function EmptyState({ text, className }: EmptyStateProps) {
  return (
    <Container className={cx(styles.wrap, className)}>
      <p role="status" className={cx("t-body", styles.text)}>
        {text}
      </p>
    </Container>
  );
}
