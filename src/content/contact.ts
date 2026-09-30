import type { ContactPageContent } from "@/lib/content/types";
import { routes } from "@/lib/routes";
import { industryRecords } from "./industries";

/*
 * /lien-he (template 5j).
 *
 *  - Contact details come from content/company.ts (verified fields only). None has been
 *    supplied, so the block is not rendered.
 *  - Enquiry topics are enquiry categories only, not site taxonomy.
 *  - The consent text is legal wording (content/legal.ts `contactConsent`); until approved it
 *    is a placeholder (development) or a neutral "pending approval" note (staging).
 *  - Delivery (`submission`) is attached by the getter from lib/forms/config.ts.
 */

export const contactPage: Omit<ContactPageContent, "form"> & { form: Omit<ContactPageContent["form"], "submission"> } = {
  hero: {
    eyebrow: "Liên hệ",
    // Decision C6 / template 5j.
    title: "Đăng ký đánh giá sơ bộ",
    // Draft (5j: "[MÔ TẢ 1–2 câu: bạn nhận được gì sau khi gửi thông tin]"). No timing promise.
    lead: "Chia sẻ thông tin về nhà máy và mục tiêu của bạn. Chuyên gia LEANWARES sẽ xem xét và liên hệ để trao đổi bước tiếp theo.",
    reviewStatus: "draft",
  },
  nextSteps: {
    title: "Sau khi bạn gửi",
    // Step titles: template 5o. Descriptions: draft. No response times (5j "[THỜI GIAN]").
    steps: [
      { label: "01", title: "Kiểm tra thông tin", description: "LEANWARES xem xét thông tin bạn gửi." },
      { label: "02", title: "Chuyên gia liên hệ", description: "Chuyên gia liên hệ theo thông tin liên lạc bạn cung cấp." },
      { label: "03", title: "Trao đổi bước tiếp theo", description: "Hai bên thống nhất phạm vi và bước tiếp theo." },
    ],
  },
  // Derived by the getter from content/company.ts (verified fields only).
  details: [],
  form: {
    title: "Thông tin của bạn",
    fields: {
      name: "Họ và tên",
      email: "Email công ty",
      phone: "Số điện thoại",
      company: "Tên công ty",
      industry: "Ngành sản xuất",
      topic: "Nhu cầu trao đổi",
      message: "Nội dung trao đổi",
      // Set by the getter from content/legal.ts (contactConsent), per publication mode.
      consent: "",
    },
    placeholders: {
      industry: "Chọn ngành",
      topic: "Chọn nhu cầu",
      message: "Mô tả ngắn về nhà máy và mục tiêu của bạn",
    },
    optionalLabel: "không bắt buộc",
    industries: [
      ...industryRecords.map((industry) => ({ value: industry.id, label: industry.name })),
      { value: "other", label: "Khác" },
    ],
    topics: [
      { value: "ghg", label: "Giảm phát thải GHG" },
      { value: "cbam", label: "CBAM / Carbon" },
      { value: "energy", label: "Năng lượng" },
      { value: "esg", label: "ESG" },
      { value: "management", label: "Hệ thống quản lý" },
      { value: "other", label: "Khác" },
    ],
    privacyLink: { label: "Chính sách bảo mật", href: routes.privacy },
    submitLabel: "Gửi thông tin",
    sendingLabel: "Đang gửi…",
    errors: {
      required: "Vui lòng nhập thông tin này.",
      email: "Email chưa đúng định dạng, ví dụ ten@congty.vn.",
      phone: "Số điện thoại chưa đủ chữ số.",
      consent: "Vui lòng xác nhận đồng ý để gửi thông tin.",
      summary: "Vui lòng kiểm tra các trường được đánh dấu.",
    },
    // Template 5o "Liên hệ" variant. Shown only after a real endpoint confirms delivery.
    successText: "LEANWARES đã nhận được thông tin của bạn.",
    failureText: "Chưa gửi được thông tin. Vui lòng thử lại sau.",
  },
};
