import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Field.module.css";

export interface FieldProps {
  id: string;
  label: ReactNode;
  /** Visible "(không bắt buộc)" marker for optional fields. */
  optionalLabel?: string;
  error?: string;
  hint?: string;
  className?: string;
  /** Receives the aria attributes the control must carry. */
  children: (control: { id: string; "aria-invalid": boolean; "aria-describedby": string | undefined; className: string }) => ReactNode;
}

/**
 * Form field (DS V3): label always above the control (never a placeholder in its place),
 * controls ≥ 48px, errors as text with an orange left bar (not colour alone).
 */
export function Field({ id, label, optionalLabel, error, hint, className, children }: FieldProps) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optionalLabel && <span className={styles.optional}> ({optionalLabel})</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy, className: cx(styles.control) })}
      {hint && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  error?: string;
  children: ReactNode;
}

/** 24px checkbox with its label (LWGatedForm / 5j consent). */
export function CheckboxField({ id, checked, onChange, onBlur, error, children }: CheckboxFieldProps) {
  return (
    <div className={cx(styles.checkField, error && styles.invalid)}>
      <div className={styles.checkRow}>
        <input
          id={id}
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className={styles.checkLabel}>
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

/** Status message under a form (role=status so it is announced). */
export function FormNotice({ tone, children }: { tone: "info" | "error" | "success"; children: ReactNode }) {
  return (
    <p role="status" className={cx(styles.notice, styles[`notice-${tone}`])}>
      {children}
    </p>
  );
}
