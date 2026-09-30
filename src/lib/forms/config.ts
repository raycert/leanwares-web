import type { FormSubmissionConfig } from "@/lib/content/types";

/*
 * Form delivery configuration. No production form backend has been selected, so every form
 * is "unconfigured": it validates, but never reports that a message was sent.
 *
 * To connect a backend later, set the first-party endpoint (a same-origin path such as a
 * future route handler) in the environment:
 *   LW_CONTACT_FORM_ENDPOINT=/api/…     contact form
 *   LW_DOWNLOAD_FORM_ENDPOINT=/api/…    gated download form
 * Only same-origin paths are accepted, so no third-party service can be wired in by
 * configuration alone.
 */

const UNCONFIGURED_NOTICE =
  "Biểu mẫu chưa được kết nối với hệ thống nhận thông tin. Thông tin của bạn chưa được gửi đi.";

export type FormId = "contact" | "download";

const ENV: Record<FormId, string | undefined> = {
  contact: process.env.LW_CONTACT_FORM_ENDPOINT,
  download: process.env.LW_DOWNLOAD_FORM_ENDPOINT,
};

export function getFormSubmission(form: FormId): FormSubmissionConfig {
  const url = ENV[form];
  if (url && url.startsWith("/") && !url.startsWith("//")) return { mode: "endpoint", url };
  return { mode: "unconfigured", notice: UNCONFIGURED_NOTICE };
}
