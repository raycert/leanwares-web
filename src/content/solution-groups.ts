import type { LinkItem, ReductionGroup, ReductionGroupId } from "@/lib/content/types";
import { anchor, routes, solutionGroupAnchors } from "@/lib/routes";
import { pillars } from "./pillars";

/*
 * The eight solution groups (Final Direction v3), anchored on /giai-phap/giam-phat-thai
 * (decision C16). Keyed by the shared ReductionGroupId used by industries and projects.
 *
 * `summary` is a one-line, definitional scope description drafted for V1 (reviewStatus
 * "draft"). It deliberately names no technology, saving, payback period or result.
 * Detail content stays a visible placeholder until LEANWARES supplies it.
 */

const target = routes.emissionReduction;

export const reductionGroupOrder: ReductionGroupId[] = [
  "energyEfficiency",
  "processOptimisation",
  "fuelSwitching",
  "renewableEnergy",
  "biomassBiochar",
  "waterManagement",
  "wasteCircularity",
  "supplyChain",
];

export const reductionGroupData: Record<
  ReductionGroupId,
  { title: string; summary: string; pillar: { title: string; id: string } }
> = {
  energyEfficiency: {
    title: "Hiệu quả năng lượng",
    summary: "Giảm năng lượng tiêu thụ trên mỗi đơn vị sản phẩm tại các hệ thống và thiết bị sử dụng năng lượng chính.",
    pillar: pillars.factory,
  },
  processOptimisation: {
    title: "Tối ưu quá trình",
    summary: "Cải thiện thông số vận hành và luồng sản xuất để giảm tổn thất năng lượng, nguyên liệu và phát thải.",
    pillar: pillars.factory,
  },
  fuelSwitching: {
    title: "Chuyển đổi nhiên liệu",
    summary: "Thay thế nhiên liệu có hệ số phát thải cao bằng nguồn năng lượng có phát thải thấp hơn.",
    pillar: pillars.factory,
  },
  renewableEnergy: {
    title: "Năng lượng tái tạo",
    summary: "Sử dụng điện và nhiệt từ nguồn tái tạo để giảm phát thải từ năng lượng sử dụng tại nhà máy.",
    pillar: pillars.factory,
  },
  biomassBiochar: {
    title: "Sinh khối & than sinh học",
    summary: "Xem xét sinh khối làm nhiên liệu và than sinh học (biochar) theo điều kiện nguyên liệu sẵn có.",
    pillar: pillars.factory,
  },
  waterManagement: {
    title: "Quản lý nước",
    summary: "Giảm lượng nước sử dụng và năng lượng gắn với bơm, xử lý và gia nhiệt nước.",
    pillar: pillars.factory,
  },
  wasteCircularity: {
    title: "Chất thải & tuần hoàn",
    summary: "Giảm chất thải phát sinh và tăng tái sử dụng, tái chế nguyên liệu trong sản xuất.",
    pillar: pillars.factory,
  },
  supplyChain: {
    title: "Chuỗi cung ứng",
    summary: "Làm việc với nhà cung cấp để có dữ liệu phát thải và giảm phát thải phạm vi 3 (Scope 3).",
    pillar: pillars.supplyChain,
  },
};

export const reductionGroupHref = (id: ReductionGroupId) => anchor(target, solutionGroupAnchors[id]);

/** Links for the homepage list and the landing-page index. */
export const solutionGroups: LinkItem[] = reductionGroupOrder.map((id) => ({
  label: reductionGroupData[id].title,
  href: reductionGroupHref(id),
}));

/** Anchored detail sections on /giai-phap/giam-phat-thai. */
export const reductionGroups: ReductionGroup[] = reductionGroupOrder.map((id, index) => {
  const group = reductionGroupData[id];
  return {
    id: solutionGroupAnchors[id],
    number: String(index + 1).padStart(2, "0"),
    title: group.title,
    summary: group.summary,
    detailPlaceholder: "[NỘI DUNG] Phạm vi đánh giá và biện pháp điển hình — chờ LEANWARES cung cấp.",
    pillar: { label: group.pillar.title, href: anchor(routes.solutions, group.pillar.id) },
  };
});
