import { plannedAnchors } from "@/lib/routes";

/*
 * The three solution pillars: single source for the homepage, /giai-phap, the mega menu
 * and the footer.
 *
 *  - `lead`, `topics`: pillar SCOPE (Final Direction v3 homepage copy).
 *  - `capabilities`: capability AREAS as listed in the FD v3 footer / navigation.
 *    These are not individual service offerings.
 *
 * Specific services (5t "Dịch vụ theo trụ cột", DS V3 mega-menu extras such as
 * "Thiết lập nhà máy xanh (Green Factory Setup)") await LEANWARES business verification
 * and are intentionally NOT listed here (see docs/IMPLEMENTATION_PLAN.md §6).
 */

const a = plannedAnchors.solutions;

export interface Pillar {
  id: string;
  number: string;
  title: string;
  lead: string;
  tabletLead?: string;
  mobileLead?: string;
  topics: string[];
  capabilities: string[];
}

export const pillars = {
  factory: {
    id: a.greenFactory,
    number: "01",
    title: "Nhà máy xanh",
    lead: "Tối ưu năng lượng, nước, nguyên liệu, chất thải và phát thải tại nơi sản xuất.",
    topics: ["Năng lượng", "Nước", "Nguyên liệu", "Chất thải", "Phát thải"],
    capabilities: ["Hiệu quả năng lượng", "Tối ưu quá trình", "Nước", "Chất thải", "Phát thải"],
  },
  product: {
    id: a.greenProduct,
    number: "02",
    title: "Sản phẩm xanh",
    lead: "Định lượng và giảm carbon theo vòng đời sản phẩm để đáp ứng khách hàng và quy định xuất khẩu.",
    tabletLead: "Định lượng và giảm carbon theo vòng đời sản phẩm.",
    mobileLead:
      "Dấu chân carbon (carbon footprint), đánh giá vòng đời (LCA), CBAM, thiết kế sinh thái (eco-design) và dữ liệu sản phẩm (product data) theo vòng đời sản phẩm.",
    topics: [
      "Dấu chân carbon (carbon footprint)",
      "Đánh giá vòng đời (LCA)",
      "CBAM",
      "Thiết kế sinh thái (eco-design)",
      "Dữ liệu sản phẩm (product data)",
    ],
    capabilities: ["Dấu chân carbon sản phẩm", "Đánh giá vòng đời (LCA)", "CBAM", "Thiết kế sinh thái", "Dữ liệu sản phẩm"],
  },
  supplyChain: {
    id: a.greenSupplyChain,
    number: "03",
    title: "Chuỗi cung ứng xanh",
    lead: "Làm việc với nhà cung cấp để có dữ liệu, giảm phát thải và đáp ứng yêu cầu truy xuất.",
    mobileLead:
      "Đánh giá ESG nhà cung cấp (supplier ESG), phạm vi 3 (Scope 3), truy xuất nguồn gốc, EUDR và tìm nguồn bền vững (sustainable sourcing).",
    topics: [
      "Đánh giá ESG nhà cung cấp (supplier ESG)",
      "Phạm vi 3 (Scope 3)",
      "Truy xuất nguồn gốc",
      "EUDR",
      "Tìm nguồn bền vững (sustainable sourcing)",
    ],
    capabilities: ["ESG nhà cung cấp", "Phạm vi 3 (Scope 3)", "Truy xuất nguồn gốc", "EUDR", "Nguồn cung bền vững"],
  },
} satisfies Record<string, Pillar>;

export const pillarList: Pillar[] = [pillars.factory, pillars.product, pillars.supplyChain];

/** The two cross-cutting capability layers (FD v3 homepage copy). Not a fourth pillar. */
export const crossCutting = {
  esg: {
    id: a.esg,
    number: "04",
    title: "ESG & Phát triển bền vững",
    description: "Chiến lược, dữ liệu, quản trị và báo cáo ESG.",
  },
  managementSystems: {
    id: a.managementSystems,
    number: "05",
    title: "Hệ thống quản lý & Tiêu chuẩn",
    description: "Tư vấn xây dựng và triển khai các hệ thống quản lý theo tiêu chuẩn liên quan.",
  },
} as const;
