# LEANWARES design export — manifest

This folder holds the design artifacts exported from Claude Design. They are **reference
material for implementation**, not production code.

- **Keep this folder flat.** Do not move, rename, reformat or delete any `.dc.html` file.
  The boards load `./support.js` and `assets/leanwares-logo.jpg` by relative path and
  resolve `<dc-import name="…">` by name, so moving files breaks them.
- **Neither referenced file is in this export:** `support.js` (the Claude Design runtime) and
  `assets/leanwares-logo.jpg`. The boards cannot be previewed as designed until both are
  supplied. Implementation does not depend on them.
- The implementation rules derived from these files live in
  [`../docs/DESIGN_HANDOFF.md`](../docs/DESIGN_HANDOFF.md).

Audit date: 2026-09-30. 22 design files, all `.dc.html`, content in Vietnamese.

---

## 1. Source-of-truth hierarchy

Precedence depends on the domain; there is no single linear order.

| # | Source | Authoritative for |
|---|---|---|
| 1 | `LEANWARES Final Direction v3.dc.html` | Visual direction, homepage layout, homepage content hierarchy, homepage responsive composition |
| 2 | `LEANWARES Design System Board V3 Final.dc.html` | Design tokens, typography system, spacing/grid, component behaviour and states, accessibility, motion, global header / menu / footer behaviour |
| 3 | `LEANWARES Site Summary Board V3.dc.html` | Sitemap, information architecture, page archetypes, data/content model |
| 4 | Latest template for each template ID (table §3) | Page composition of inner pages |
| 5 | Individual `LW*.dc.html` files | Component **anatomy only** |

Tie-break rules:

- A component file that conflicts with Design System V3 → **Design System V3 wins**.
- Homepage conflict → **Final Direction v3 wins**.
- Global component conflict (header, menus, footer, links) → **Design System V3 wins**.
- Anything else → log it in `docs/DESIGN_HANDOFF.md` §H before implementing.

---

## 2. Artifact inventory

### Boards

| File | Category | Status | Canonical | Notes |
|---|---|---|---|---|
| LEANWARES Final Direction v3.dc.html | Approved baseline | **Approved** | Yes (domain 1) | Self-contained (no `dc-import`); desktop 1440, tablet 1024, mobile 390 homepage |
| LEANWARES Design System Board V3 Final.dc.html | Design system | **Approved** | Yes (domain 2) | Merges DS V1, V2 Growth and Standards Architecture. Embeds `LWFooter`, which is stale (see C2). |
| LEANWARES Site Summary Board V3.dc.html | Site architecture | **Approved** | Yes (domain 3) | "Public website V1 — Frozen". This is the "Site Summary Board Final" that DS V3 §8e refers to. |
| LEANWARES Standards Architecture Templates.dc.html | Page templates | Supporting | Yes (by ID) | IDs: M, 5x, 5y, 5z, 5aa |
| LEANWARES Growth Templates.dc.html | Page templates | Supporting | Yes (by ID) | IDs: 5k, 5l, 5m, 5n, 5o, 5p, 5q, 5r, 5s |
| LEANWARES Overview & Listing Templates.dc.html | Page templates | Supporting | Yes (by ID) | IDs: 5t, 5u, 5v, 5w |
| LEANWARES Inner Page Templates.dc.html | Page templates | Supporting (partly superseded) | Yes, except 5g/5h | IDs: 5a, 5b, 5c, 5d, 5e, 5f, 5i, 5j. **5g → superseded by 5q; 5h → superseded by 5r.** |
| LEANWARES Design System Board V2 Growth.dc.html | Superseded | **Archive / historical only** | No | Content is reproduced exactly in DS V3 §8b. Kept, never used for decisions. |

### Component references (anatomy only)

| File | Future component | Status | Notes |
|---|---|---|---|
| LWHeader.dc.html | `layout/SiteHeader` | Supporting | No tablet variant, mega menu, skip link or sticky state. Behaviour comes from DS V3 and template M. |
| LWFooter.dc.html | `layout/SiteFooter` | **Stale** | Group 4 "Carbon & ESG" and legal row "Điều khoản · Bảo mật" are superseded (C2). |
| LWCtaBand.dc.html | `sections/CtaBand` (`default`) | Supporting | The homepage uses the larger `home` variant from Final Direction v3 (C10). |
| LWCredentials.dc.html | `sections/Credentials` | **Deferred** | Needs verified metrics, logos and permissions. Mobile view is missing the standards group (C17). |
| LWEventItem.dc.html | `cards/EventRow` | Supporting | Canonical event date treatment (C12) |
| LWGatedForm.dc.html | `forms/GatedDownloadForm` | Supporting | 3 states: ungated / form / success |
| LWIndustryItem.dc.html | `cards/IndustryRow` (`overview`) | **Needs alignment** | Uses 600/26px; DS V3 Title L is 500 28/24/18 (C11) |
| LWPhoto.dc.html | `ui/ResponsiveImage` | Supporting | A ratio placeholder only; not a visual |
| LWProjectItem.dc.html | `cards/ProjectRow` | Supporting | All fields `[CASE DATA]` |
| LWRelated.dc.html | `sections/RelatedContent` | Supporting | 6 types |
| LWResourceItem.dc.html | `cards/ResourceRow` | Supporting | default / hover / focus |
| LWSearchBar.dc.html | `forms/SearchInput` | **Deferred (V1 header)** | Kept for Knowledge / Resource search later |
| LWStandards.dc.html | `sections/StandardsBlock` | Supporting | 4 variants: service / industry / project / resource |
| LWSubscribe.dc.html | `forms/SubscribeForm` | Supporting | none |

### Referenced but not in this export

| Item | Referenced by | Status |
|---|---|---|
| `assets/leanwares-logo.jpg` | FD v3, DS V3, Standards M, LWHeader, LWFooter | **Missing.** The production target is `public/brand/leanwares-logo.svg`. |
| `support.js` | Every file | Missing (preview runtime only) |
| Design System V1 | DS V2, Inner Templates, Summary V3 | Missing; absorbed into DS V3 |
| LEANWARES Site Summary Board (non-V3) | Original brief | Missing; would be archive-only if supplied |

---

## 3. Template ID index

| ID | Page | Canonical file |
|---|---|---|
| Home | Homepage | Final Direction v3 |
| M | Mega menu + mobile menu | Standards Architecture Templates |
| 5a / 5b / 5c | Pillar: Nhà máy xanh / Sản phẩm xanh / Chuỗi cung ứng xanh | Inner Page Templates |
| 5d | Service detail | Inner Page Templates |
| 5e | Industry detail | Inner Page Templates |
| 5f | Project / case study detail | Inner Page Templates |
| ~~5g~~ | Insights listing | **Superseded by 5q** |
| ~~5h~~ | Article detail | **Superseded by 5r** |
| 5i | About | Inner Page Templates |
| 5j | Contact / assessment | Inner Page Templates |
| 5k | Resource library | Growth Templates |
| 5l | Resource detail | Growth Templates |
| 5m | Event detail | Growth Templates |
| 5n | Search | Growth Templates (add a "Tiêu chuẩn" tab per DS V3, C15) |
| 5o | Thank-you | Growth Templates |
| 5p | Legal | Growth Templates (use the canonical footer, not the one-off mini footer) |
| 5q | Knowledge: insights + resources | Growth Templates |
| 5r | Article detail | Growth Templates |
| 5s | 404 | Growth Templates |
| 5t | Solutions overview | Overview & Listing Templates |
| 5u | Industries overview | Overview & Listing Templates |
| 5v | Projects listing | Overview & Listing Templates |
| 5w | Events listing | Overview & Listing Templates |
| 5x | ESG & Phát triển bền vững | Standards Architecture Templates |
| 5y | Hệ thống quản lý & Tiêu chuẩn | Standards Architecture Templates |
| 5z | Standards & Framework library | Standards Architecture Templates |
| 5aa | Standard / Framework detail | Standards Architecture Templates |

---

## 4. Conflict notes (with decisions)

Full rationale is in `docs/DESIGN_HANDOFF.md` §H.

| ID | Summary | Decision |
|---|---|---|
| C1 | DS V3 claims to be the sole source of truth; the brief made FD v3 primary | **Resolved:** domain-scoped hierarchy (§1) |
| C2 | Footer group 4 and legal row differ across FD v3, DS V3, LWFooter and 5p | **Resolved:** FD v3 visual + DS V3 behaviour; group 4 "ESG & Hệ thống quản lý"; legal "Bảo mật · Điều khoản · Chính sách cookie" |
| C3 | Pillar item lists differ | **Resolved:** pillar scope/topics → FD v3; navigation/service catalogue → DS V3 mega menu. The two lists may differ. Service claims are flagged for business verification. |
| C4 | Footer group 4 items vs mega-menu column 4 | Open: link targets for "Carbon" / "Dữ liệu" |
| C5 | Link styling in FD v3 vs DS V3 | **Resolved by rule:** DS V3 (underline, hover navy) |
| C6 | Mobile menu CTA text | **Resolved:** "Đăng ký đánh giá sơ bộ" |
| C7 | Hamburger 44px vs 48px | **Resolved by rule:** DS V3, 48×48 |
| C8 | Tablet nav: full (FD) vs "condensed" (DS, not drawn) | Open: FD v3's full 7-item nav is used until a condensed nav is drawn |
| C9 | Sticky header 80 → 64px (DS V3 only) | **Resolved by rule:** DS V3. Mobile sticky is still open. |
| C10 | CTA band sizes differ (FD home vs LWCtaBand) | **Resolved:** one `CtaBand` with `home` and `default` variants |
| C11 | Three industry-row variants | **Resolved:** one `IndustryRow` with `home` (image swap) and `overview` (listing / accordion); DS V3 tokens |
| C12 | Event date block variants | LWEventItem canonical (used by frozen 5w) |
| C13 | DS V3 Case Study Card unused | Parked |
| C14 | Summary V3 homepage omits cross-cutting capabilities | **Resolved by rule:** FD v3 homepage (11 sections) |
| C15 | Search tabs are missing "Tiêu chuẩn" | **Resolved by rule:** DS V3. Search is deferred for V1. |
| C16 | Destination of the 8 homepage solution groups | **Resolved:** anchors on `/giai-phap/giam-phat-thai` |
| C17 | LWCredentials mobile is incomplete | Credentials **deferred** |
| C18 | Undocumented dark orange `#B8620A` (5t) | **Resolved by rule:** not tokenized; the ↻ glyph uses the orange marker |
| C19 | Rule colour on navy `#8C87C2` vs `#8B88C0` | **Resolved by rule:** one token, DS V3 value `#8B88C0` |
| C20 | Scope of IBM Plex Mono | **Resolved by rule:** DS V3 / templates (data, standards codes, metadata, index numbers) |
| C21 | Tagline "Make Difference – Make Value" (5i) | Open: business confirmation |
| C22 | Legal labels language | **Resolved:** Vietnamese only |
