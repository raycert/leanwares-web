import type { MenuColumn, SiteChrome } from "@/lib/content/types";
import { anchor, plannedAnchors, routes } from "@/lib/routes";
import { company } from "./company";
import { pillarList } from "./pillars";

/*
 * Global navigation, mega menu and footer.
 *
 * Sources:
 *  - Primary nav: Final Direction v3 / DS V3 (7 items).
 *  - Pillar columns: capability areas from ./pillars (Final Direction v3 footer lists). These are the approved homepage
 *    content. DS V3 mega-menu entries that are unverified capability claims
 *    ("Thiết lập nhà máy xanh (Green Factory Setup)", ISO 14001 / 45001 / 50001 / 9001
 *    systems, "Tuân thủ trách nhiệm xã hội", "Tiêu chuẩn quản trị") are intentionally
 *    NOT shown until business verification.
 *  - Column 4: approved group 4 items (2026-09-30).
 *
 * Item links point to planned anchors (src/lib/routes.ts); these need review before Phase 3.
 */

const solutions = routes.solutions;
const a = plannedAnchors.solutions;

const pillarColumns: MenuColumn[] = pillarList.map((pillar) => ({
  number: pillar.number,
  title: pillar.title,
  href: anchor(solutions, pillar.id),
  items: pillar.capabilities.map((label) => ({ label, href: anchor(solutions, pillar.id) })),
}));

const crossCuttingColumn: MenuColumn = {
  eyebrow: "Năng lực xuyên suốt",
  title: "ESG & Hệ thống quản lý",
  href: anchor(solutions, a.crossCutting),
  items: [
    { label: "ESG & Phát triển bền vững", href: anchor(solutions, a.esg) },
    { label: "Hệ thống quản lý", href: anchor(solutions, a.managementSystems) },
    { label: "Tiêu chuẩn & Framework", href: anchor(routes.knowledge, plannedAnchors.knowledge.standards) },
  ],
};

export const siteChrome: SiteChrome = {
  skipLinkLabel: "Bỏ qua tới nội dung",
  homeLabel: "LEANWARES — Trang chủ",
  primaryNav: [
    { label: "Trang chủ", href: routes.home },
    { label: "Giải pháp", href: routes.solutions, kind: "solutions" },
    { label: "Ngành", href: routes.industries },
    { label: "Dự án", href: routes.projects },
    { label: "Kiến thức", href: routes.knowledge },
    { label: "Về LEANWARES", href: routes.about },
    { label: "Liên hệ", href: routes.contact, kind: "contact" },
  ],
  megaMenu: {
    columns: [...pillarColumns, crossCuttingColumn],
    // Approved Phase 4: mega menu = direct navigation; /giai-phap = solution overview page.
    allLink: { label: "Tổng quan giải pháp", href: routes.solutions },
  },
  mobileMenu: {
    openLabel: "Mở menu",
    closeLabel: "Đóng menu",
    // Decision C6.
    cta: { label: "Đăng ký đánh giá sơ bộ", href: routes.contact },
  },
  footer: {
    companyName: company.legalName,
    groups: [...pillarColumns, crossCuttingColumn],
    // Decisions C2 / C22: Vietnamese legal labels.
    legal: [
      { label: "Bảo mật", href: routes.privacy },
      { label: "Điều khoản", href: routes.terms },
      { label: "Chính sách cookie", href: routes.cookies },
    ],
    legalLabel: "Pháp lý",
    copyright: "© LEANWARES",
  },
};
