/*
 * Canonical company and contact data: the single source for the footer, the contact page
 * and metadata.
 *
 * VERIFIED ONLY. Every field below is null until LEANWARES supplies and confirms it.
 * Do not invent an address, email, phone number, website, social profile or Zalo account.
 * Consumers render a field only when it is non-null; with no verified contact field the
 * contact-details block on /lien-he stays hidden (production blocker, LAUNCH_READINESS.md).
 */

export interface CompanyInfo {
  /** Brand name (approved). */
  name: string;
  /** Legal entity name (approved: Final Direction v3 footer). */
  legalName: string;
  address: string | null;
  email: string | null;
  /** Display format, e.g. "+84 …"; the tel: link is derived from it. */
  phone: string | null;
  website: string | null;
  linkedin: string | null;
  /** Only if LEANWARES approves Zalo as a public channel. */
  zalo: string | null;
}

export const company: CompanyInfo = {
  name: "LEANWARES",
  legalName: "Công ty Cổ phần LEANWARES",
  address: null,
  email: null,
  phone: null,
  website: null,
  linkedin: null,
  zalo: null,
};

/** Verified contact fields as display rows (label, value, optional link). */
export function companyContactRows(info: CompanyInfo = company): Array<{ label: string; value: string; href?: string }> {
  const rows: Array<{ label: string; value: string; href?: string }> = [];
  if (info.address) rows.push({ label: "Địa chỉ", value: info.address });
  if (info.phone) rows.push({ label: "Điện thoại", value: info.phone, href: `tel:${info.phone.replace(/[^\d+]/g, "")}` });
  if (info.email) rows.push({ label: "Email", value: info.email, href: `mailto:${info.email}` });
  if (info.website) rows.push({ label: "Website", value: info.website.replace(/^https?:\/\//, ""), href: info.website });
  if (info.linkedin) rows.push({ label: "LinkedIn", value: "LinkedIn", href: info.linkedin });
  if (info.zalo) rows.push({ label: "Zalo", value: info.zalo });
  return rows;
}
