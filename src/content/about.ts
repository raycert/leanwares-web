import type { AboutPageContent } from "@/lib/content/types";
import { anchor, routes } from "@/lib/routes";
import { crossCutting, pillarList } from "./pillars";

/*
 * /ve-leanwares (template 5i).
 *
 * Only approved copy or visible placeholders. NOT included (no approved / verified content):
 * founding date, staff / customer / project counts, certifications, geographic coverage,
 * partners, team members, milestones ("Hành trình") and credentials. The 5i tagline
 * "Make Difference – Make Value" is not used (not approved for V1).
 */

export const aboutPage: AboutPageContent = {
  hero: {
    breadcrumb: [{ label: "Trang chủ", href: routes.home }, { label: "Về LEANWARES" }],
    eyebrow: "Về LEANWARES",
    // Template 5i (verbatim).
    title: "Tư vấn và triển khai giải pháp chuyển đổi xanh cho doanh nghiệp sản xuất",
    // Final Direction v3 homepage lead (approved copy), in place of the unapproved tagline.
    lead: "LEANWARES đồng hành cùng doanh nghiệp từ đo lường carbon, tối ưu vận hành đến triển khai giải pháp giảm phát thải cho nhà máy, sản phẩm và chuỗi cung ứng.",
    image: { placeholder: "[ẢNH THẬT 21:9] đội ngũ tại nhà máy" },
  },
  who: {
    title: "LEANWARES là ai",
    text: "[NỘI DUNG] Giới thiệu Công ty Cổ phần LEANWARES: lịch sử, đội ngũ và định hướng. Chờ LEANWARES cung cấp.",
  },
  // Three pillars + two cross-cutting layers: approved scope copy (Final Direction v3).
  focus: {
    title: "Lĩnh vực tập trung",
    items: [
      ...pillarList.map((pillar) => ({
        number: pillar.number,
        title: pillar.title,
        description: pillar.lead,
        href: anchor(routes.solutions, pillar.id),
      })),
      ...[crossCutting.esg, crossCutting.managementSystems].map((item) => ({
        number: item.number,
        title: item.title,
        description: item.description,
        href: anchor(routes.solutions, item.id),
      })),
    ],
  },
  // Titles: template 5i "Ba cách nhìn trong một đội ngũ". Descriptions await LEANWARES.
  approach: {
    title: "Ba cách nhìn trong một đội ngũ",
    items: ["Tư vấn chiến lược", "Kỹ thuật công nghiệp", "Phát triển bền vững"].map((title, i) => ({
      number: `0${i + 1}`,
      title,
      description: "[NỘI DUNG] Mô tả 2–3 câu.",
    })),
  },
  // Titles: template 5i "Năng lực nền". Descriptions await LEANWARES.
  capabilities: {
    title: "Năng lực nền",
    items: ["Carbon", "ESG", "Dữ liệu", "Tiêu chuẩn"].map((title, i) => ({
      number: `0${i + 1}`,
      title,
      description: "[NỘI DUNG] Mô tả 1–2 câu.",
    })),
  },
  timeline: null,
  credentials: null,
  cta: {
    title: "Trao đổi với chuyên gia LEANWARES về nhà máy của bạn",
    cta: { label: "Liên hệ", href: routes.contact },
  },
};
