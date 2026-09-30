"use client";

import { type FormEvent, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { DownloadPanelContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import { resultStatus, submitDownloadRequest } from "@/lib/forms/submit";
import { isEmail } from "@/lib/forms/validation";
import { CheckboxField, Field, FormNotice } from "../Field/Field";
import styles from "./GatedDownloadForm.module.css";

type Key = "name" | "email" | "company" | "industry" | "consent";
const ORDER: Key[] = ["name", "email", "company", "industry", "consent"];

/**
 * Download panel (LWGatedForm, DS V3 states):
 *  - `unavailable`: no real file → no download action, file type, size or icon.
 *  - `ungated`: "Tải tài liệu" + real format / size.
 *  - `gated`: four fields + consent (no phone). The download link appears only after a
 *    configured backend confirms the submission; with no backend the form says so.
 */
export function GatedDownloadForm({ state, asset, industries, unavailableText, contactLink, submission }: DownloadPanelContent) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState({ name: "", email: "", company: "", industry: "", consent: false });
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "invalid" | "sending" | "sent" | "unconfigured" | "error">("idle");

  if (state === "unavailable" || !asset) {
    return (
      <aside className={cx(styles.panel, styles.unavailable)} aria-label="Tài liệu">
        <Eyebrow>Tài liệu</Eyebrow>
        <p className="t-body">{unavailableText}</p>
        <TextLink href={contactLink.href} arrow>
          {contactLink.label}
        </TextLink>
      </aside>
    );
  }

  const fileMeta = `${asset.format} · ${asset.size}`;

  if (state === "ungated") {
    return (
      <aside className={styles.panel} aria-labelledby={`${uid}-title`}>
        <Eyebrow>Tải tài liệu</Eyebrow>
        <h2 id={`${uid}-title`} className="t-feature">
          Tài liệu mở, không cần đăng ký
        </h2>
        <Button href={asset.href} download fullWidth>
          Tải tài liệu
        </Button>
        <p className="t-data">{fileMeta}</p>
      </aside>
    );
  }

  const errors: Partial<Record<Key, string>> = {
    ...(!values.name.trim() && { name: "Vui lòng nhập thông tin này." }),
    ...(!values.email.trim()
      ? { email: "Vui lòng nhập thông tin này." }
      : !isEmail(values.email) && { email: "Email chưa đúng định dạng, ví dụ ten@congty.vn." }),
    ...(!values.company.trim() && { company: "Vui lòng nhập thông tin này." }),
    ...(!values.industry && { industry: "Vui lòng chọn ngành." }),
    ...(!values.consent && { consent: "Vui lòng xác nhận đồng ý để nhận tài liệu." }),
  };
  const shown = (key: Key) => (touched[key] ? errors[key] : undefined);
  const id = (key: Key) => `${uid}-${key}`;
  const blur = (key: Key) => setTouched((prev) => ({ ...prev, [key]: true }));
  const set = (key: Key, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (status !== "sending") setStatus("idle");
  };

  if (status === "sent") {
    return (
      <aside className={styles.panel} aria-labelledby={`${uid}-done`}>
        <Eyebrow marker="orange">Hoàn tất</Eyebrow>
        <h2 id={`${uid}-done`} className="t-h4" tabIndex={-1}>
          Cảm ơn bạn
        </h2>
        <p className="t-body">Tài liệu đã sẵn sàng.</p>
        <Button href={asset.href} download>
          Tải xuống
        </Button>
        <p className="t-data">{fileMeta}</p>
      </aside>
    );
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched(Object.fromEntries(ORDER.map((key) => [key, true])));
    const first = ORDER.find((key) => errors[key]);
    if (first) {
      setStatus("invalid");
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
      return;
    }
    setStatus("sending");
    setStatus(resultStatus(await submitDownloadRequest(values, submission)));
  }

  const text = (key: "name" | "email" | "company", label: string, type: string, autoComplete: string) => (
    <Field id={id(key)} label={label} error={shown(key)}>
      {(control) => (
        <input
          {...control}
          type={type}
          autoComplete={autoComplete}
          required
          value={values[key]}
          onChange={(event) => set(key, event.target.value)}
          onBlur={() => blur(key)}
        />
      )}
    </Field>
  );

  return (
    <form ref={formRef} className={styles.panel} noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-title`}>
      <h2 id={`${uid}-title`} className="t-feature">
        Tải tài liệu miễn phí
      </h2>
      {text("name", "Họ và tên", "text", "name")}
      {text("email", "Email công ty", "email", "email")}
      {text("company", "Công ty", "text", "organization")}
      <Field id={id("industry")} label="Ngành" error={shown("industry")}>
        {(control) => (
          <select
            {...control}
            required
            value={values.industry}
            onChange={(event) => set("industry", event.target.value)}
            onBlur={() => blur("industry")}
          >
            <option value="">Chọn ngành</option>
            {industries.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>
      <CheckboxField
        id={id("consent")}
        checked={values.consent}
        onChange={(checked) => set("consent", checked)}
        onBlur={() => blur("consent")}
        error={shown("consent")}
      >
        Tôi đồng ý để LEANWARES sử dụng thông tin này để gửi tài liệu và nội dung chuyên môn liên quan.
      </CheckboxField>
      <Button type="submit" loading={status === "sending"} fullWidth>
        Nhận tài liệu
      </Button>
      <p className={styles.note}>Không yêu cầu số điện thoại. {fileMeta}</p>
      <div aria-live="polite" className={styles.status}>
        {status === "invalid" && <FormNotice tone="error">Vui lòng kiểm tra các trường được đánh dấu.</FormNotice>}
        {status === "unconfigured" && submission.mode === "unconfigured" && (
          <FormNotice tone="info">{submission.notice}</FormNotice>
        )}
        {status === "error" && <FormNotice tone="error">Chưa gửi được thông tin. Vui lòng thử lại sau.</FormNotice>}
      </div>
    </form>
  );
}
