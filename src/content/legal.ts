import type { LegalPageId } from "@/lib/content/types";
import { routes } from "@/lib/routes";

/*
 * Legal documents: the single source for /bao-mat, /dieu-khoan, /chinh-sach-cookie and the
 * contact-form consent text (template 5p).
 *
 * No legal text has been supplied. Do NOT add generic or AI-written legal wording: add
 * `sections` / `text` only from text approved by LEANWARES (legal review), and set
 * `status` accordingly:
 *   "missing"  → development shows [NỘI DUNG PHÁP LÝ CẦN DUYỆT]; staging shows a neutral
 *                "pending approval" note; production build fails (launch gate).
 *   "draft"    → shown on staging only with LW_ALLOW_DRAFT=1, marked as a draft.
 *   "approved" → shown everywhere.
 */

export type LegalStatus = "missing" | "draft" | "approved";

export interface LegalDocument {
  title: string;
  href: string;
  status: LegalStatus;
  /** ISO date of the approved version. */
  updated: string | null;
  sections: Array<{ id: string; title: string; paragraphs: string[] }>;
}

export const legalDocuments: Record<LegalPageId, LegalDocument> = {
  privacy: { title: "Chính sách bảo mật", href: routes.privacy, status: "missing", updated: null, sections: [] },
  terms: { title: "Điều khoản sử dụng", href: routes.terms, status: "missing", updated: null, sections: [] },
  cookies: { title: "Chính sách cookie", href: routes.cookies, status: "missing", updated: null, sections: [] },
};

export const legalOrder: LegalPageId[] = ["privacy", "terms", "cookies"];

/** Consent statement for the contact form (legal wording; awaits approval). */
export const contactConsent: { status: LegalStatus; text: string | null } = { status: "missing", text: null };

export const legalLabels = {
  tabs: "Văn bản pháp lý",
  toc: "Mục lục",
  updatedPrefix: "Cập nhật lần cuối:",
  draftNotice: "Bản nháp — chưa phải văn bản chính thức.",
};
