"use client";

import { type FormEvent, useId, useRef, useState } from "react";
import { AppLink } from "@/components/ui/AppLink/AppLink";
import { Button } from "@/components/ui/Button/Button";
import type { ContactFormContent } from "@/lib/content/types";
import { resultStatus, submitContactForm } from "@/lib/forms/submit";
import { isEmail, isPhone } from "@/lib/forms/validation";
import { CheckboxField, Field, FormNotice } from "../Field/Field";
import styles from "./ContactForm.module.css";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  topic: string;
  message: string;
  consent: boolean;
};
type Key = keyof Values;

const ORDER: Key[] = ["name", "email", "phone", "company", "industry", "topic", "message", "consent"];
const EMPTY: Values = { name: "", email: "", phone: "", company: "", industry: "", topic: "", message: "", consent: false };

/**
 * Enquiry form (template 5j, DS V3 form rules): validate on blur; on submit, errors move
 * focus to the first invalid field; the button is disabled while sending. Delivery goes
 * through `submission`: with no backend configured the form says so explicitly and never
 * reports success.
 */
export function ContactForm(props: ContactFormContent) {
  const { fields, placeholders, errors: msg, submission } = props;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "invalid" | "sending" | "sent" | "unconfigured" | "error">("idle");

  const validate = (v: Values): Partial<Record<Key, string>> => ({
    ...(!v.name.trim() && { name: msg.required }),
    ...(!v.email.trim() ? { email: msg.required } : !isEmail(v.email) && { email: msg.email }),
    ...(v.phone.trim() && !isPhone(v.phone) && { phone: msg.phone }),
    ...(!v.company.trim() && { company: msg.required }),
    ...(!v.message.trim() && { message: msg.required }),
    ...(!v.consent && { consent: msg.consent }),
  });

  const errors = validate(values);
  const shown = (key: Key) => (touched[key] ? errors[key] : undefined);
  const id = (key: Key) => `${uid}-${key}`;
  const set = <K extends Key>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (status !== "sending") setStatus("idle");
  };
  const blur = (key: Key) => setTouched((prev) => ({ ...prev, [key]: true }));

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
    const result = await submitContactForm(values, submission);
    setStatus(resultStatus(result));
    if (result.ok) {
      setValues(EMPTY);
      setTouched({});
    }
  }

  const text = (key: "name" | "email" | "phone" | "company", type: string, autoComplete: string, optional = false) => (
    <Field id={id(key)} label={fields[key]} optionalLabel={optional ? props.optionalLabel : undefined} error={shown(key)}>
      {(control) => (
        <input
          {...control}
          type={type}
          name={key}
          autoComplete={autoComplete}
          required={!optional}
          value={values[key]}
          onChange={(event) => set(key, event.target.value)}
          onBlur={() => blur(key)}
        />
      )}
    </Field>
  );

  return (
    <form ref={formRef} className={styles.form} noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-title`}>
      <h2 id={`${uid}-title`} className="t-title-m">
        {props.title}
      </h2>
      <div className={styles.grid}>
        {text("name", "text", "name")}
        {text("email", "email", "email")}
        {text("phone", "tel", "tel", true)}
        {text("company", "text", "organization")}
        <Field id={id("industry")} label={fields.industry} optionalLabel={props.optionalLabel}>
          {(control) => (
            <select {...control} name="industry" value={values.industry} onChange={(event) => set("industry", event.target.value)}>
              <option value="">{placeholders.industry}</option>
              {props.industries.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id={id("topic")} label={fields.topic} optionalLabel={props.optionalLabel}>
          {(control) => (
            <select {...control} name="topic" value={values.topic} onChange={(event) => set("topic", event.target.value)}>
              <option value="">{placeholders.topic}</option>
              {props.topics.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>
      <Field id={id("message")} label={fields.message} error={shown("message")}>
        {(control) => (
          <textarea
            {...control}
            name="message"
            required
            rows={5}
            placeholder={placeholders.message}
            value={values.message}
            onChange={(event) => set("message", event.target.value)}
            onBlur={() => blur("message")}
          />
        )}
      </Field>
      <CheckboxField
        id={id("consent")}
        checked={values.consent}
        onChange={(checked) => set("consent", checked)}
        onBlur={() => blur("consent")}
        error={shown("consent")}
      >
        {fields.consent}{" "}
        <AppLink href={props.privacyLink.href} className={styles.inlineLink}>
          {props.privacyLink.label}
        </AppLink>
      </CheckboxField>

      <div className={styles.actions}>
        <Button type="submit" loading={status === "sending"} fullWidth="mobile">
          {status === "sending" ? props.sendingLabel : props.submitLabel}
        </Button>
      </div>

      <div aria-live="polite" className={styles.status}>
        {status === "invalid" && <FormNotice tone="error">{msg.summary}</FormNotice>}
        {status === "unconfigured" && submission.mode === "unconfigured" && (
          <FormNotice tone="info">{submission.notice}</FormNotice>
        )}
        {status === "error" && <FormNotice tone="error">{props.failureText}</FormNotice>}
        {status === "sent" && <FormNotice tone="success">{props.successText}</FormNotice>}
      </div>
    </form>
  );
}
