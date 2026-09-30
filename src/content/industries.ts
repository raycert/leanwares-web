import type { IndustryRecord } from "@/lib/content/types";

/*
 * Canonical industry taxonomy (V1): the six approved industries. Single source for the
 * homepage explorer, /nganh, /nganh/[slug], the project filters and project records
 * (by `id`). Do not add industries without approval.
 *
 * Content status:
 *  - Names and slugs: approved (Final Direction v3 / Site Summary V3; slugs approved Phase 3C).
 *  - summary / heroLead / context, challengeAreas, pillarIds, reductionGroupIds: drafted for
 *    V1 (reviewStatus "draft"). Qualitative and definitional only: no statistics, benchmarks,
 *    percentages or performance claims.
 *  - standardsTopics: only "approved" links are rendered. CBAM ↔ Thép & kim loại comes from
 *    the approved designs (FD v3 "Checklist dữ liệu CBAM cho doanh nghiệp thép"; template 5e).
 *    Every "proposed" link awaits LEANWARES confirmation of regulatory applicability.
 *  - relatedProjectIds: empty (no verified project yet).
 */

export const industryRecords: IndustryRecord[] = [
  {
    id: "steelMetals",
    slug: "thep-kim-loai",
    name: "Thép & kim loại",
    shortName: "Thép",
    summary: "Năng lượng, nhiên liệu và dữ liệu phát thải theo từng công đoạn.",
    heroLead:
      "Nhà máy thép và kim loại sử dụng nhiều năng lượng và nhiên liệu cho các công đoạn nung, nấu và gia công. Dữ liệu phát thải theo công đoạn là nền tảng cho cả cải tiến vận hành và yêu cầu từ khách hàng.",
    context:
      "Phát thải của nhà máy thép và kim loại thường gắn với nhiên liệu cho lò, điện năng cho thiết bị công suất lớn và nguyên liệu đầu vào. Tách dữ liệu theo công đoạn giúp xác định điểm nóng và so sánh các phương án giảm phát thải trên cùng một đường cơ sở.",
    image: { placeholder: "[ẢNH THẬT] khu vực sản xuất — Thép & kim loại" },
    challengeAreas: ["energy", "fuel", "materials", "emissions", "waste"],
    pillarIds: ["factory", "product"],
    reductionGroupIds: ["energyEfficiency", "processOptimisation", "fuelSwitching", "renewableEnergy", "wasteCircularity"],
    standardsTopics: [
      {
        topic: "cbam",
        status: "approved",
        basis: "Final Direction v3 (tài nguyên “Checklist dữ liệu CBAM cho doanh nghiệp thép”); template 5e / LWStandards (industry).",
      },
      { topic: "iso50001", status: "proposed", basis: "Ví dụ trong LWStandards (industry); cần LEANWARES xác nhận." },
      { topic: "ghgAccounting", status: "proposed", basis: "Ví dụ trong LWStandards (industry: ISO 14064-1); cần LEANWARES xác nhận." },
    ],
    relatedProjectIds: [],
    reviewStatus: "draft",
  },
  {
    id: "woodFurniture",
    slug: "go-noi-that",
    name: "Gỗ & nội thất",
    shortName: "Gỗ",
    summary: "Nguồn gốc nguyên liệu gỗ, năng lượng cho sấy và phụ phẩm sản xuất.",
    heroLead:
      "Doanh nghiệp gỗ và nội thất cần quản lý nguồn gốc nguyên liệu, năng lượng cho sấy và gia công, cùng phụ phẩm phát sinh trong sản xuất.",
    context:
      "Chuỗi giá trị gỗ và nội thất đi từ nguồn nguyên liệu qua các công đoạn sấy, gia công, hoàn thiện và đóng gói. Dữ liệu về nguồn gốc nguyên liệu, năng lượng sử dụng và phụ phẩm là cơ sở cho các quyết định cải tiến.",
    image: { placeholder: "[ẢNH THẬT] khu vực sản xuất — Gỗ & nội thất" },
    challengeAreas: ["materials", "energy", "waste", "supplyChain"],
    pillarIds: ["factory", "product", "supplyChain"],
    reductionGroupIds: ["energyEfficiency", "biomassBiochar", "wasteCircularity", "supplyChain"],
    standardsTopics: [
      { topic: "eudr", status: "proposed", basis: "Gỗ là nhóm hàng hóa trong phạm vi EUDR; phạm vi áp dụng cần LEANWARES xác nhận." },
    ],
    relatedProjectIds: [],
    reviewStatus: "draft",
  },
  {
    id: "paperPackaging",
    slug: "giay-bao-bi",
    name: "Giấy & bao bì",
    shortName: "Giấy",
    summary: "Nhiệt, điện, nước và tuần hoàn vật liệu trong sản xuất.",
    heroLead:
      "Sản xuất giấy và bao bì gắn với nhu cầu nhiệt, điện và nước trong các công đoạn sản xuất, cùng khả năng tuần hoàn vật liệu.",
    context:
      "Các công đoạn nghiền, xeo, sấy và hoàn thiện sử dụng nhiệt, điện và nước. Dữ liệu theo công đoạn giúp xác định điểm nóng về năng lượng, nước và vật liệu, từ đó ưu tiên các biện pháp phù hợp.",
    image: { placeholder: "[ẢNH THẬT] khu vực sản xuất — Giấy & bao bì" },
    challengeAreas: ["energy", "water", "materials", "waste"],
    pillarIds: ["factory", "product", "supplyChain"],
    reductionGroupIds: ["energyEfficiency", "processOptimisation", "waterManagement", "wasteCircularity", "biomassBiochar"],
    standardsTopics: [
      { topic: "eudr", status: "proposed", basis: "Một số sản phẩm giấy và bột giấy thuộc phạm vi EUDR; cần LEANWARES xác nhận." },
    ],
    relatedProjectIds: [],
    reviewStatus: "draft",
  },
  {
    id: "foodAgriculture",
    slug: "thuc-pham-nong-nghiep",
    name: "Thực phẩm & nông nghiệp",
    shortName: "Thực phẩm",
    summary: "Nhiệt, lạnh, nước và phụ phẩm hữu cơ trong chế biến.",
    heroLead:
      "Chế biến thực phẩm và nông sản sử dụng nhiệt, lạnh và nước, đồng thời tạo ra phụ phẩm hữu cơ có thể được quản lý và tận dụng.",
    context:
      "Nhiều công đoạn chế biến cần gia nhiệt, làm lạnh và vệ sinh bằng nước. Phụ phẩm và nước thải hữu cơ, cùng nguồn gốc nguyên liệu từ vùng trồng, là những lĩnh vực thường cần xem xét khi xây dựng lộ trình giảm phát thải.",
    image: { placeholder: "[ẢNH THẬT] khu vực sản xuất — Thực phẩm & nông nghiệp" },
    challengeAreas: ["energy", "water", "waste", "supplyChain"],
    pillarIds: ["factory", "supplyChain"],
    reductionGroupIds: ["energyEfficiency", "waterManagement", "wasteCircularity", "biomassBiochar", "supplyChain"],
    standardsTopics: [
      { topic: "eudr", status: "proposed", basis: "Chỉ một số nông sản thuộc phạm vi EUDR; cần LEANWARES xác nhận theo sản phẩm." },
      { topic: "esgSupplier", status: "proposed", basis: "Yêu cầu từ khách hàng; cần LEANWARES xác nhận." },
    ],
    relatedProjectIds: [],
    reviewStatus: "draft",
  },
  {
    id: "industrialManufacturing",
    slug: "san-xuat-cong-nghiep",
    name: "Sản xuất công nghiệp",
    shortName: "Sản xuất",
    summary: "Hiệu quả năng lượng, tối ưu quá trình và dữ liệu carbon sản phẩm.",
    heroLead:
      "Doanh nghiệp sản xuất công nghiệp thường bắt đầu từ hiệu quả năng lượng và tối ưu quá trình, sau đó mở rộng sang dữ liệu carbon của sản phẩm.",
    context:
      "Phát thải của nhà máy sản xuất công nghiệp thường gắn với điện năng, nhiên liệu và vật liệu đầu vào. Khi khách hàng yêu cầu dữ liệu carbon theo sản phẩm, dữ liệu vận hành của nhà máy trở thành đầu vào cho tính toán dấu chân carbon sản phẩm.",
    image: { placeholder: "[ẢNH THẬT] khu vực sản xuất — Sản xuất công nghiệp" },
    challengeAreas: ["energy", "fuel", "materials", "emissions"],
    pillarIds: ["factory", "product"],
    reductionGroupIds: ["energyEfficiency", "processOptimisation", "fuelSwitching", "renewableEnergy"],
    standardsTopics: [
      { topic: "iso50001", status: "proposed", basis: "Cần LEANWARES xác nhận." },
      { topic: "ghgAccounting", status: "proposed", basis: "Cần LEANWARES xác nhận." },
    ],
    relatedProjectIds: [],
    reviewStatus: "draft",
  },
  {
    id: "industrialParks",
    slug: "khu-cong-nghiep",
    name: "Khu công nghiệp",
    shortName: "KCN",
    summary: "Hạ tầng dùng chung: năng lượng, nước, chất thải và doanh nghiệp thành viên.",
    heroLead:
      "Khu công nghiệp có thể giảm phát thải ở cấp hạ tầng dùng chung và hỗ trợ doanh nghiệp thành viên đáp ứng yêu cầu về dữ liệu và ESG.",
    context:
      "Ở cấp khu công nghiệp, năng lượng, cấp nước, xử lý nước thải và thu gom chất thải là hạ tầng dùng chung. Dữ liệu từ hạ tầng và từ doanh nghiệp thành viên giúp xác định cơ hội giảm phát thải ở cả hai cấp.",
    image: { placeholder: "[ẢNH THẬT] hạ tầng — Khu công nghiệp" },
    challengeAreas: ["energy", "water", "waste", "supplyChain"],
    pillarIds: ["factory", "supplyChain", "esg"],
    reductionGroupIds: ["renewableEnergy", "waterManagement", "wasteCircularity", "supplyChain"],
    standardsTopics: [{ topic: "esgSupplier", status: "proposed", basis: "Cần LEANWARES xác nhận." }],
    relatedProjectIds: [],
    reviewStatus: "draft",
  },
];

/** Controlled vocabulary for challenge areas (draft, definitional). */
export const challengeAreas = {
  energy: { label: "Năng lượng", description: "Điện và nhiệt sử dụng cho thiết bị và công đoạn sản xuất." },
  fuel: { label: "Nhiên liệu", description: "Nhiên liệu đốt cho lò, lò hơi và thiết bị nhiệt." },
  materials: { label: "Nguyên liệu", description: "Nguyên liệu đầu vào và hiệu suất sử dụng vật liệu." },
  water: { label: "Nước", description: "Nước sử dụng, xử lý và năng lượng gắn với nước." },
  waste: { label: "Chất thải", description: "Chất thải, phụ phẩm và khả năng tái sử dụng, tái chế." },
  emissions: { label: "Phát thải", description: "Phát thải trực tiếp từ quá trình và từ đốt nhiên liệu." },
  supplyChain: { label: "Chuỗi cung ứng", description: "Dữ liệu và yêu cầu từ nhà cung cấp và khách hàng, phạm vi 3 (Scope 3)." },
} as const;

/** /nganh overview copy (template 5u, verbatim). */
export const industriesPage = {
  hero: {
    eyebrow: "Ngành",
    title: "Chuyển đổi xanh cần bắt đầu từ đặc thù từng ngành",
    lead: "Mỗi ngành có cấu trúc phát thải, yêu cầu thị trường và cơ hội cải tiến khác nhau.",
  },
  explorerLabel: "6 ngành",
  insightLabels: { hotspots: "Điểm nóng phát thải", market: "Áp lực thị trường", groups: "Nhóm giải pháp liên quan" },
  problems: {
    eyebrow: "Vấn đề thường gặp",
    title: "Những vấn đề LEANWARES thường gặp tại nhà máy",
    items: [
      "Năng lượng tiêu thụ cao",
      "Dữ liệu phân tán",
      "Thiếu dữ liệu tiền chất",
      "Khó xác định điểm nóng",
      "Scope 3 thiếu dữ liệu",
      "Yêu cầu CBAM / EUDR / ESG",
    ],
  },
};
