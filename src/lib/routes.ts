/*
 * Approved V1 routes (2026-09-30). Links anywhere in the site must be built from this
 * registry, so no link can point at an unapproved path. Do not add routes here without
 * approval.
 *
 * Status: all eleven V1 routes are implemented (Phases 2–3D). Detail routes:
 *  - `/du-an/[slug]`: verified, published projects only;
 *  - `/nganh/[slug]`: the six canonical industries (content/industries.ts);
 *  - `/kien-thuc/[slug]`: published, approved knowledge records only.
 */
export const routes = {
  home: "/",
  solutions: "/giai-phap",
  emissionReduction: "/giai-phap/giam-phat-thai",
  industries: "/nganh",
  projects: "/du-an",
  knowledge: "/kien-thuc",
  about: "/ve-leanwares",
  contact: "/lien-he",
  privacy: "/bao-mat",
  terms: "/dieu-khoan",
  cookies: "/chinh-sach-cookie",
} as const;

export type RouteKey = keyof typeof routes;
export type RoutePath = (typeof routes)[RouteKey];

/** Routes that exist in the current build. */
export const implementedRoutes: ReadonlySet<RoutePath> = new Set<RoutePath>([
  routes.home,
  routes.solutions,
  routes.emissionReduction,
  routes.industries,
  routes.projects,
  routes.knowledge,
  routes.about,
  routes.contact,
  routes.privacy,
  routes.terms,
  routes.cookies,
]);

/** Industry detail pages: /nganh/[slug]. Slugs come only from content/industries.ts. */
export function industryPath(slug: string): string {
  return `${routes.industries}/${slug}`;
}

/**
 * Case-study detail pages: /du-an/[slug]. Slugs come only from verified, published project
 * records (content/projects.ts); none are invented.
 */
export function projectPath(slug: string): string {
  return `${routes.projects}/${slug}`;
}

/** Knowledge detail pages: /kien-thuc/[slug]. Slugs come only from published, approved records. */
export function knowledgePath(slug: string): string {
  return `${routes.knowledge}/${slug}`;
}

/** Link to an in-page anchor on an approved route. */
export function anchor(route: RoutePath, id: string): `${RoutePath}#${string}` {
  return `${route}#${id}`;
}

/**
 * Approved anchors for the eight homepage solution groups (decision C16).
 * Each anchor is a section on `/giai-phap/giam-phat-thai` (implemented in Phase 3A).
 */
export const solutionGroupAnchors = {
  energyEfficiency: "hieu-qua-nang-luong",
  processOptimisation: "toi-uu-qua-trinh",
  fuelSwitching: "chuyen-doi-nhien-lieu",
  renewableEnergy: "nang-luong-tai-tao",
  biomassBiochar: "sinh-khoi-than-sinh-hoc",
  waterManagement: "quan-ly-nuoc",
  wasteCircularity: "chat-thai-tuan-hoan",
  supplyChain: "chuoi-cung-ung",
} as const;

/**
 * Section anchors inside V1 pages. The `solutions` anchors exist on /giai-phap since
 * Phase 3A; `knowledge.standards` is the "Tiêu chuẩn & Framework" section on /kien-thuc
 * (Phase 3D). Industry pages use industryPath() (Phase 3C), not anchors.
 */
export const plannedAnchors = {
  solutions: {
    greenFactory: "nha-may-xanh",
    greenProduct: "san-pham-xanh",
    greenSupplyChain: "chuoi-cung-ung-xanh",
    crossCutting: "nang-luc-xuyen-suot",
    esg: "esg-phat-trien-ben-vung",
    managementSystems: "he-thong-quan-ly",
  },
  knowledge: {
    standards: "tieu-chuan-framework",
  },
} as const;
