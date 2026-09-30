import type { FormSubmissionConfig } from "@/lib/content/types";

/*
 * Form adapter: the single place where a form submission leaves the browser.
 *
 *   submitContactForm(payload, config)   → { ok: true } | { ok: false, reason }
 *   submitDownloadRequest(payload, config)
 *
 * "unconfigured" makes no network request and is never a success. With an endpoint, only
 * a 2xx response is a success. Components show a success state only for { ok: true }.
 */

export type SubmissionResult = { ok: true } | { ok: false; reason: "unconfigured" | "error" };

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  topic: string;
  message: string;
  consent: boolean;
}

export interface DownloadPayload {
  name: string;
  email: string;
  company: string;
  industry: string;
  consent: boolean;
}

async function post(config: FormSubmissionConfig, body: Record<string, unknown>): Promise<SubmissionResult> {
  if (config.mode === "unconfigured") return { ok: false, reason: "unconfigured" };
  try {
    const res = await fetch(config.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "error" };
  } catch {
    return { ok: false, reason: "error" };
  }
}

export function submitContactForm(payload: ContactPayload, config: FormSubmissionConfig): Promise<SubmissionResult> {
  return post(config, { form: "contact", ...payload });
}

export function submitDownloadRequest(payload: DownloadPayload, config: FormSubmissionConfig): Promise<SubmissionResult> {
  return post(config, { form: "download", ...payload });
}

/** UI status for a result. */
export const resultStatus = (result: SubmissionResult) => (result.ok ? "sent" : result.reason);
