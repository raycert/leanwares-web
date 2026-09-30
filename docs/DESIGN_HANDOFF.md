# LEANWARES Website — Design Handoff

Status: **approved** (decisions of 2026-09-30).
Design files: [`design/`](../design/) (see [`design/README.md`](../design/README.md) for the
full inventory). Implementation plan: [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md).

---

## A. Design status

- **Stage:** Public Website V1. The design is frozen: Site Summary Board V3 "PUBLIC WEBSITE
  DESIGN V1 — FROZEN", and Design System V3 "READY TO FREEZE".
- **Frozen:** visual direction, design tokens, public sitemap, page archetypes (Home, M,
  5a–5aa), shared and growth components, responsive rules, accessibility states, and the
  Service ↔ Standard separation.
- **May still change:**
  - All `[CASE DATA]`, `[NỘI DUNG]` and `[ẢNH THẬT]` content.
  - Photography and the logo asset.
  - The open items in §H.
  - Anything development finds technically unworkable. Log it in §H *before* changing it.
- No new pages or components after the freeze unless development hits a technical issue.

---

## B. Source of truth

Precedence depends on the domain.

| # | Source | Authoritative for |
|---|---|---|
| 1 | **LEANWARES Final Direction v3** | Visual direction · homepage layout · homepage content hierarchy · homepage responsive composition |
| 2 | **LEANWARES Design System Board V3 Final** | Design tokens · typography system · spacing/grid · component behaviour and states · accessibility · motion · global header/menu/footer behaviour |
| 3 | **LEANWARES Site Summary Board V3** | Sitemap · information architecture · archetypes · data/content model |
| 4 | **Latest template for each template ID** | Inner-page composition (index in `design/README.md` §3) |
| 5 | **Individual `LW*.dc.html` files** | Component anatomy only |

Rules:

1. A component file that conflicts with Design System V3 → **DS V3 wins**.
2. Homepage conflict → **Final Direction v3 wins**.
3. Global component conflict (header, mega menu, mobile menu, footer, links) → **DS V3 wins**.
4. Superseded material is never used for decisions: DS V2 Growth, Inner templates 5g/5h,
   DS V1, and older summary boards.
5. Anything not covered above → record it in §H and get approval before implementing.

---

## C. Visual system

**Direction: "Premium Consulting with Industrial Evidence".** About 75% editorial (light
backgrounds, serif headlines, hairlines, real photography) and 25% technical evidence.

### C1. Colour

Colour share on screen is about **70 light / 20 navy / 8 blue / 2 orange**.

Raw hex values appear **only** in `src/styles/tokens/color.css` (the palette layer).
Components use semantic tokens.

**Core palette (DS V3)**

| Palette token | Hex | Semantic use |
|---|---|---|
| `--palette-blue-500` | #1078BF | `--color-accent`: primary buttons, rules, markers, CTA band |
| `--palette-blue-700` | #0C5F98 | `--color-text-accent`, `--color-text-link`, `--color-accent-hover` |
| `--palette-navy-900` | #282058 | `--color-text-strong`, `--color-surface-inverse`, `--color-border-strong` |
| `--palette-orange-500` | #F89018 | `--color-marker`: one marker or rule per screen; link underline |
| `--palette-stone-50` | #F6F5F2 | `--color-surface-subtle`: alternating sections |
| `--palette-stone-300` | #D9D6CF | `--color-border`, `--color-surface-disabled` |
| `--palette-ink-700` | #4A4766 | `--color-text`: body |
| `--palette-ink-600` | #5A5872 | `--color-text-muted`: captions, secondary labels |

**Extended palette.** These colours appear in the designs but were not named in DS V3. They
are named here.

| Palette token | Hex | Semantic token(s) | Where used |
|---|---|---|---|
| `--palette-white` | #FFFFFF | `--color-surface`, `--color-text-on-accent`, `--color-text-inverse-strong`, `--color-focus-inverse` | Page background, text on blue/navy |
| `--palette-stone-100` | #ECEAE4 | `--color-surface-placeholder` | Image placeholders (dev only) |
| `--palette-stone-200` | #E6E3DC | `--color-border-soft` | Hairlines inside menus, filters and lists |
| `--palette-ink-500` | #6E6C86 | `--color-text-subtle`, `--color-text-disabled` | Placeholder text, disabled text |
| `--palette-ink-400` | #8B88A6 | `--color-border-input` | Input and chip borders |
| `--palette-navy-100` | #E7E5F5 | `--color-text-inverse-high` | Emphasised body text on navy |
| `--palette-navy-200` | #D2D0E6 | `--color-text-inverse` | Body text on navy, footer text |
| `--palette-navy-300` | #B9B5DC | `--color-text-inverse-muted`, `--color-border-disabled` | Data and captions on navy; disabled secondary border |
| `--palette-navy-400` | #8B88C0 | `--color-border-inverse-strong` | Strong rule on navy (merges #8C87C2, C19) |
| `--palette-navy-700` | #4A4380 | `--color-border-inverse` | Hairline on navy |
| `--palette-navy-800` | #30286A | `--color-surface-placeholder-inverse` | Dark image placeholder (dev only) |
| `--palette-navy-750` | #3B3378 | `--color-placeholder-stripe-inverse` | Dark placeholder stripe (dev only) |

Not tokenized:

- `#DEDDD9`: design-canvas background only, not UI.
- `#DAD7CF`: placeholder stripe, merged into stone-300.
- `#EEECE6`: DS board decoration.
- `#B8620A` and `#A85A00`: undocumented dark oranges (C18).

**Colour rules**

- Light backgrounds dominate. Navy blocks appear **only** in pillar 2 (Sản phẩm xanh), case
  study / featured project, and the footer.
- Blue is the primary active/accent colour. Blue *text* always uses blue-700 (6.8:1 on
  white; brand blue is only 4.3:1 on off-white).
- Orange is a marker, rule or underline, or a large number on navy. **Never small text on a
  light background.**
- Measured contrast: navy/white 14.6:1 · body/white 8.8:1 · white/blue 4.7:1 ·
  navy/orange 6.3:1.

### C2. Typography

| Family | Weights | Use |
|---|---|---|
| Newsreader | 400, 500 (600 loaded) | Headlines and large numbers **≥ 28px only** |
| Public Sans | 400, 500, 600, 700 | Everything else. Small titles use 600. |
| IBM Plex Mono | 400, 500 | Data annotations, standards codes, metadata values, index numbers |

Type scale in px / line-height at the 1440 · 1024 · 390 reference widths:

| Role | Token | Font | 1440 | 1024 | 390 |
|---|---|---|---|---|---|
| Display / H1 | `--text-display-*` | Newsreader 500, −.02em, `text-wrap: balance` | 82/1.02 | 60/1.03 | 46/1.03 |
| H2 | `--text-h2-*` | Newsreader 500, −.015em | 56/1.08 | 44/1.1 | 32/1.12 |
| H3 | `--text-h3-*` | Newsreader 500 | 44/1.1 | 36/1.1 | 30/1.1 |
| Quote | `--text-quote-*` | Newsreader 400 | 30/1.25 | 27/1.25 | 21/1.3 |
| Title L | `--text-title-l-*` | Public Sans 500, −.01em | 28/1.15 | 24/1.2 | 18/1.3 |
| Title S | `--text-title-s-*` | Public Sans 600 | 20/1.3 | 18/1.3 | 17/1.35 |
| Lead | `--text-lead-*` | Public Sans 400 | 20/1.65 | 18/1.65 | 16/1.65 |
| Body | `--text-body-*` | Public Sans 400 | 17/1.65 | 16/1.65 | 15/1.65 |
| Small | `--text-small-*` | Public Sans 400 | 14/1.55 | 14/1.55 | 14/1.55 |
| Eyebrow | `--text-eyebrow-*` | Public Sans 600, uppercase, .12em | 12 | 12 | 11 |
| Data | `--text-data-*` | IBM Plex Mono 400 | 12/1.5 | 12/1.5 | 12/1.5 |

Sizes are **exact at the reference widths** and interpolate linearly between them. This is an
implementation choice; the designs define only the three widths. The DS V3 1280 check
(H1 = 74px) falls on that interpolation line.

**Vietnamese glyph support is required.** All three families load with the `vietnamese`
subset (verified; see `IMPLEMENTATION_PLAN.md` §7).

### C3. Spacing, grid, layout

- **Spacing scale (base 8):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 144
  (`--space-4` … `--space-144`).
- **Grid:** 12 columns.
- **Page margin:** 96 / 56 / 20 (`--page-margin`).
- **Gap between two content columns:** 96 / 48 / 0 (`--column-gap`). Columns stack on mobile.
- **Grid gutter:** 32 (`--grid-gutter`).
- **Section spacing:** 128 / 96 / 64 (`--section-space`) and 144 / 104 / 72
  (`--section-space-lg`, before GHG and industries).
- **Content width at 1440:** 1248px (`--content-max`). *Provisional:* above 1440 the content
  stays at 1248px, centred, and the margins grow (open question Q-L1).
- **Split layouts used in the designs:** 7/5 · 5/7 · 4/8 · 8/4 · 6/6 · 3/9.
- **Corners are square everywhere** (`--radius-none`). The only exception is the top edge of
  mobile bottom sheets (2px).

### C4. Borders

| Token | Value | Use |
|---|---|---|
| `--border-hairline` | 1px `--color-border` | Row dividers, frames |
| `--border-hairline-soft` | 1px `--color-border-soft` | Menu and filter rows |
| `--border-rule` | 2px `--color-border-strong` | Top rule of list blocks and section heads |
| `--border-rule-thin` | 1px `--color-border-strong` | Table heads, sub-rules |
| `--border-active` | 3px `--color-accent` | Active tab, selected industry, phase 1 |
| `--border-marker` | 2px `--color-marker` | Text-link underline |
| `--border-marker-heavy` | 3px `--color-marker` | White CTA button on blue |

### C5. Controls, focus and states

- **Primary button:** blue; hover blue-700.
- **Secondary button:** 1px navy outline; hover navy fill with white text.
- **On-dark button:** white with a 3px orange bottom border.
- **Disabled:** `--color-surface-disabled` background and `--color-text-disabled` text,
  `cursor: not-allowed`, `disabled` / `aria-disabled`. **Never use opacity.**
- **Loading:** disabled while submitting (label e.g. "Đang gửi…").
- **Text link (standalone):** navy text with a 2px orange underline; hover blue-700 text
  and underline. The arrow → moves 4px right on hover.
- **Inline link (in prose):** blue-700, underlined, 3px offset; hover navy.
- **Focus-visible:** 2px `--color-focus` ring with a 3px offset. Use the white ring on navy
  or blue. Never `outline: none` without a replacement.
- **Touch targets:** at least 48×48 on mobile, with at least 8px between targets.
- **Inputs:** at least 48px tall (52px on mobile). The label always sits above the field.
  Errors show as text plus a 4px orange left bar.

### C6. Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Colour transitions on buttons and links |
| `--duration-image` | 200ms | Industry image crossfade |
| `--delay-menu-open` | 150ms | Mega menu hover-open delay |
| `--delay-menu-close` | 250ms | Mega menu leave-close delay |
| `--ease-standard` | ease-out | All transitions |
| `--motion-arrow-shift` | 4px | Arrow nudge on hover |

- No parallax.
- `prefers-reduced-motion: reduce` disables image transitions and sliding. Durations
  collapse to near zero.

### C7. Editorial vs technical treatment

- **Technical treatment**: Baseline / After / Δ tables, technical charts, data annotations
  with square markers. Use it **only** for:
  - the GHG reduction framework,
  - case studies and the featured project,
  - verified data blocks.
- **Monospace is also allowed** (C20) for: standards codes (blue-700, never as badges),
  metadata values (format, date, reading time), and index numbers ("01").
- **Everything else is editorial:** serif headlines, hairlines, photography.
  - No FIG / SOL / P-xx style technical labels.
  - No ISO codes used as decoration.

### C8. Imagery

- Real on-site photography only. **No stock images.**
- WebP/JPEG at 1x and 2x; at least 1600px on the long edge for wide images.
- Descriptive `alt` text is required.
- **Ratios (DS V3):**
  - 4:5 hero
  - 3:2 pillar / article thumbnail
  - 4:3 industry (all six the same ratio)
  - 6:5 featured project
  - 16:9 featured article
  - 1:1 expert portrait
- **Also used by templates:** 21:9 and 21:8 wide banners, 3:4 document preview.

### C9. Logo

- **The final asset has not been supplied.** Do not invent, redraw or approximate the logo.
- Preferred production asset: **`public/brand/leanwares-logo.svg`**.
- The design export references `assets/leanwares-logo.jpg`: a white-background JPG, used as is.
- **Placement rules (FD v3):**
  - Place it only on white, or on a white panel on navy (footer).
  - Minimum height is 44px.
  - Header heights: 52px desktop, 48px mobile; footer: 72px desktop, 56px mobile.
- Until the asset arrives, layouts reserve the space and fall back to the accessible text
  "LEANWARES". See `src/lib/brand.ts`.

### C10. Responsive reference sizes

| Name | Width | Source |
|---|---|---|
| Mobile reference | 390 | FD v3, DS V3, all templates |
| Layout switch (provisional) | 768 | Not in the designs; columns stack below this width (Q-L2) |
| Tablet reference | 1024 | FD v3 (homepage only) |
| Desktop check | 1280 | DS V3 (H1 line-break check) |
| Desktop reference | 1440 | All boards |

---

## D. Homepage information architecture (Final Direction v3)

Header, then:

1. **Hero:** eyebrow "CARBON · ESG · DỮ LIỆU · CẢI TIẾN". CTAs "Khám phá giải pháp" and
   "Đánh giá cơ hội giảm phát thải".
2. **Market / customer pressure:** "Thị trường đang thay đổi", 5 questions.
3. **Three solution pillars:** Nhà máy xanh (Green Factory) · Sản phẩm xanh (Green Product,
   navy block) · Chuỗi cung ứng xanh (Green Supply Chain).
4. **Cross-cutting capabilities:** ESG & Phát triển bền vững; Hệ thống quản lý & Tiêu chuẩn.
5. **GHG reduction framework:** 2 phases, 7 steps, feedback loop.
6. **Eight solution groups.** Each links to an anchor on `/giai-phap/giam-phat-thai` (C16).
7. **Industry solutions:** 6 industries. Selecting one swaps the image on desktop/tablet;
   on mobile each row is a direct link.
8. **Featured project / case study:** navy block; all values `[CASE DATA]`.
9. **Knowledge / resources:** "Góc nhìn & Tài liệu".
10. **Final CTA:** `CtaBand` variant `home`.
11. **Footer.**

**Solution-group anchors (V1).** Do not create eight separate service pages at this stage.

| # | Group (FD v3 label) | Link |
|---|---|---|
| 01 | Hiệu quả năng lượng | `/giai-phap/giam-phat-thai#hieu-qua-nang-luong` |
| 02 | Tối ưu quá trình | `/giai-phap/giam-phat-thai#toi-uu-qua-trinh` |
| 03 | Chuyển đổi nhiên liệu | `/giai-phap/giam-phat-thai#chuyen-doi-nhien-lieu` |
| 04 | Năng lượng tái tạo | `/giai-phap/giam-phat-thai#nang-luong-tai-tao` |
| 05 | Sinh khối & than sinh học | `/giai-phap/giam-phat-thai#sinh-khoi-than-sinh-hoc` |
| 06 | Quản lý nước | `/giai-phap/giam-phat-thai#quan-ly-nuoc` |
| 07 | Chất thải & tuần hoàn | `/giai-phap/giam-phat-thai#chat-thai-tuan-hoan` |
| 08 | Chuỗi cung ứng | `/giai-phap/giam-phat-thai#chuoi-cung-ung` |

---

## E. Global components (decisions)

**Header**

- Uses LWHeader anatomy with DS V3 behaviour:
  - Skip link.
  - Sticky, 80px, shrinking to 64px on scroll.
  - Mega menu with 4 columns; column 4, "ESG & Hệ thống quản lý", is separated by a
    vertical rule.
  - Full-screen mobile menu opened by a 48×48 button, with a one-group accordion and a
    focus trap. Esc closes it.
- **Mobile menu CTA: "Đăng ký đánh giá sơ bộ"** (C6).
- **No search in the global header for V1.**
- Tablet uses FD v3's full 7-item nav until a condensed nav is designed (C8).

**Footer**

- Final Direction v3 visual treatment with DS V3 behaviour and responsive rules:
  - 5 columns on desktop and tablet.
  - 2 columns on mobile, with rows at least 48px tall and a stacked legal row.
- **Groups:** Nhà máy xanh · Sản phẩm xanh · Chuỗi cung ứng xanh · **ESG & Hệ thống quản lý**.
- **Legal (Vietnamese only):** **Bảo mật · Điều khoản · Chính sách cookie**.
- Do not use the stale `LWFooter` taxonomy.

**Pillar lists vs navigation (C3).** These are two different concepts; do not force them to
match.

- *Pillar scope / topics* (homepage pillars, 5a–5c) → Final Direction v3.
- *Navigation / service catalogue* (mega menu, mobile menu) → DS V3 mega menu.
- Service and capability claims in either list are flagged for business verification
  (see `IMPLEMENTATION_PLAN.md` §6).

## F. Component mapping

| Design artifact | Production component | Notes |
|---|---|---|
| LWHeader + DS V3 + template M | `layout/SiteHeader`, `layout/MegaMenu`, `layout/MobileMenu`, `layout/SkipLink` | No search in V1 |
| FD v3 footer + DS V3 | `layout/SiteFooter` | Not LWFooter |
| FD v3 final CTA + LWCtaBand | `sections/CtaBand` (`home` \| `default`) | C10 |
| LWIndustryItem + FD v3 + DS V3 | `cards/IndustryRow` (`home` \| `overview`) + `sections/IndustryExplorer` | C11 |
| LWProjectItem | `cards/ProjectRow` | none |
| LWEventItem | `cards/EventRow` | none |
| LWResourceItem | `cards/ResourceRow` | none |
| LWRelated | `sections/RelatedContent` | none |
| LWStandards | `sections/StandardsBlock` | none |
| LWGatedForm | `forms/GatedDownloadForm` | none |
| LWSubscribe | `forms/SubscribeForm` | none |
| LWSearchBar | `forms/SearchInput` | Deferred: Knowledge / Resource search only |
| LWPhoto | `ui/ResponsiveImage` | Placeholder mode in development only |
| LWCredentials | `sections/Credentials` | **Deferred** until verified metrics, logos and permissions exist |
| DS V3 | `ui/Button`, `ui/TextLink`, `ui/Eyebrow`, `ui/Container`, `ui/Grid` | **Built (Foundation)** |
| DS V3 | `ui/Input`, `Select`, `Textarea`, `FileUpload`, `Checkbox`, `Chip`, `Breadcrumb`, `Pagination`, `Tabs`, `FaqAccordion`, `Metric`, `DataTable`, `Timeline` | Later phases |

## G. Content rules

- **Never invent** project data, quantitative savings or results, customer names or logos,
  dates, certifications, or standards capabilities.
- `[CASE DATA]`, `[NỘI DUNG]` and `[ẢNH THẬT]` **stay visible as placeholders** until
  the value is verified. Never substitute plausible-looking sample values.
- All final claims come from approved LEANWARES content or data, with a named source.
- Client logos appear only with written permission, and they are not links.
  - At most 8 logos: 6 cells on desktop, 4 on mobile.
  - No auto-playing carousel.
- Standards are reference knowledge, **never presented as badges or certification claims**.
  "Service" (what LEANWARES provides) and "Standard" (a reference) are separate entities
  with an N:N relationship.
- The About page presents capability "by standard & framework" **without claiming
  certification**.
- The UI language is Vietnamese only for V1, including the legal labels.

## H. Implementation guardrails & decision log

**Guardrails**

- Do not redesign the approved direction or introduce a new design language.
- Build from tokens and shared components. No raw hex, font or spacing values inside
  components.
- New pages must inherit the approved system and map to an existing archetype.
- Any deviation is logged below **before** it is implemented, with its reason and the approver.
- Fidelity to the design system comes before adopting third-party UI libraries.

**Decision log**

| ID | Decision | Status | Date |
|---|---|---|---|
| C1 | Domain-scoped source of truth (§B) | Approved | 2026-09-30 |
| C2 | Footer: FD v3 visual + DS V3 behaviour; group 4 "ESG & Hệ thống quản lý"; legal "Bảo mật · Điều khoản · Chính sách cookie" | Approved | 2026-09-30 |
| C3 | Pillar scope → FD v3; navigation/catalogue → DS V3 mega menu; lists may differ; claims flagged | Approved | 2026-09-30 |
| C4 | Footer "Carbon" / "Dữ liệu" link targets | **Open** | none |
| C5 | Links follow DS V3 (underline, hover navy) | By rule (§B.3) | 2026-09-30 |
| C6 | Mobile menu CTA "Đăng ký đánh giá sơ bộ" | Approved | 2026-09-30 |
| C7 | Menu button 48×48 | By rule | 2026-09-30 |
| C8 | Tablet nav: full 7 items until a condensed nav is designed | **Open** (provisional) | none |
| C9 | Sticky header 80 → 64px on desktop; mobile sticky behaviour | Desktop by rule; mobile **open** | none |
| C10 | `CtaBand` variants `home` / `default` | Approved | 2026-09-30 |
| C11 | `IndustryRow` variants `home` / `overview`, DS V3 tokens | Approved | 2026-09-30 |
| C12 | Event date treatment follows LWEventItem | By rule (latest template) | 2026-09-30 |
| C13 | DS V3 Case Study Card parked (unused) | Parked | 2026-09-30 |
| C14 | Homepage has 11 sections incl. cross-cutting capabilities | By rule (§B.2) | 2026-09-30 |
| C15 | Search: not in V1 header; components kept for Knowledge/Resource later | Approved (deferred) | 2026-09-30 |
| C16 | 8 solution groups → anchors on `/giai-phap/giam-phat-thai` | Approved | 2026-09-30 |
| C17 | Credentials deferred until verified data and permissions | Approved (deferred) | 2026-09-30 |
| C18 | `#B8620A` not tokenized; ↻ glyph uses the orange marker | By rule (tokens → DS V3) | 2026-09-30 |
| C19 | `#8C87C2` / `#8B88C0` merged into `--palette-navy-400` = #8B88C0 | By rule (tokens → DS V3) | 2026-09-30 |
| C20 | Mono scope per DS V3 / templates | By rule | 2026-09-30 |
| C21 | Tagline "Make Difference – Make Value" | **Open**: business confirmation | none |
| C22 | Legal labels Vietnamese only | Approved | 2026-09-30 |
| D1 | Cookie consent banner: not designed or implemented; revisit when analytics or non-essential cookies are introduced | Deferred | 2026-09-30 |
| D2 | Fluid type and spacing between reference widths (exact at 390/1024/1440) | Implementation choice | 2026-09-30 |
| D3 | Content capped at 1248px above 1440 (centred) | Provisional (Q-L1) | 2026-09-30 |
| D4 | Columns stack below 768px | Provisional (Q-L2) | 2026-09-30 |
| D5 | `inverse` (white) button hover: text turns blue-700. DS V3 draws no hover state for it. | Implementation choice, review in Foundation | 2026-09-30 |
| D6 | On navy/blue surfaces, the secondary button and quiet link outline switch to white (per 5t mobile "Xem dự án →") | Implementation choice, review in Foundation | 2026-09-30 |
| D7 | Whole site is `noindex, nofollow` until launch (Phase 7), so previews are never indexed | Implementation choice | 2026-09-30 |
| D3/D4 | Content capped at 1248px above 1440; multi-column layouts stack below 768 unless FD v3 specifies otherwise | **Approved** | 2026-09-30 |
| D5/D6 | White-button hover turns text blue-700; outline button on navy uses the white treatment | **Approved** | 2026-09-30 |
| C9 | Mobile header (below 1024) is not sticky in V1; desktop/tablet header is sticky, 80/72 → 64px | **Approved** | 2026-09-30 |
| C21 | Tagline "Make Difference – Make Value" not used | **Approved** (not used) | 2026-09-30 |
| R1 | V1 routes: /, /giai-phap, /giai-phap/giam-phat-thai, /nganh, /du-an, /kien-thuc, /ve-leanwares, /lien-he, /bao-mat, /dieu-khoan, /chinh-sach-cookie. Registry: `src/lib/routes.ts` | **Approved** | 2026-09-30 |
| C4 | Footer group 4 = ESG & Phát triển bền vững · Hệ thống quản lý · Tiêu chuẩn & Framework; no Carbon / Dữ liệu routes | **Approved** | 2026-09-30 |
| C3b | Mega menu / footer lists use the FD v3 footer lists + approved group 4. Unverified DS V3 entries (Green Factory Setup, ISO 14001/45001/50001/9001 systems, Tuân thủ TNXH, Tiêu chuẩn quản trị) are not shown | Implementation of approval ("no unverified claims") | 2026-09-30 |
| D8 | FD v3 homepage sizes not in the DS V3 table are added as named roles: h2-s 48/40/32, h4 36/32/30, feature 52/40/30, cta 72/52/38, cta-s 60/50/34, card-title 34/28/28, metric 44/44/38, title-m 22/20/18, body-s 15/15/14.5, data-l, data-table, nav, ui-leading 1.2 | Implementation choice, review | 2026-09-30 |
| D9 | `--block-space` 120/80/56 for the inner padding of full-bleed coloured blocks (FD: industries 112, featured 120/88, CTA 120/80) | Implementation choice | 2026-09-30 |
| D10 | Homepage composition tiers: mobile below 768 = FD 390 board, tablet 768–1279 = FD 1024 board, desktop 1280 and up = FD 1440 board. Header: hamburger below 1024 | Implementation choice, review | 2026-09-30 |
| D11 | Tablet-only omissions in FD v3 (section eyebrows; featured-project KPIs; supplier diagram note) are treated as artboard brevity and kept. Omissions at both tablet and mobile (GHG lead + axis label, topic lists, "Tất cả kiến thức", measurement-point overlay) are followed | Implementation choice, review | 2026-09-30 |
| D12 | Image ratios enforced per tier with approved ratios: hero 4:5 (mobile 1:1), factory 3:2, industries 4:3, featured project 6:5 (tablet 21:9, mobile 3:2), featured article 16:9 | Implementation choice, review | 2026-09-30 |
| D13 | Board annotations are not rendered: "Tương tác: rê chuột…" (industries) and "Không liệt kê toàn bộ tiêu chuẩn…" (mega menu) | Implementation choice | 2026-09-30 |
| D14 | On the homepage the active nav item is "Trang chủ" (aria-current); the boards show "Giải pháp" active as a demo state. "Giải pháp" is a disclosure button (DS V3: Enter / ↓ opens), not a link | Implementation choice | 2026-09-30 |
| D8–D14 | Homepage implementation choices | **Approved** | 2026-09-30 |
| H1 | Homepage CTAs: "Khám phá giải pháp" → /giai-phap; "Đánh giá cơ hội giảm phát thải" → /giai-phap/giam-phat-thai; "Đăng ký đánh giá sơ bộ" → /lien-he | **Approved** | 2026-09-30 |
| H2 | CBAM checklist resource: action is "Xem tài nguyên →" → /kien-thuc. No download action or file until a real file exists | **Approved** | 2026-09-30 |
| H3 | FeaturedProject tablet media 21:9 is a component-specific responsive treatment, not a design-system ratio rule (21:9 / 21:8 / 3:4 remain template-only ratios) | **Approved** | 2026-09-30 |
| P1 | /giai-phap follows template 5t. Three layers are kept apart: pillar scope (FD v3 topics), capability areas (FD v3 navigation lists), specific services (placeholders; business verification pending). 5t service counts and "Khám phá …" links are omitted (no verified catalogue, no pillar / 5x / 5y routes) | Implementation of approval | 2026-09-30 |
| P2 | 5t has no tablet board: tablet compositions for /giai-phap sections (pillar rows 2 columns + capabilities below, etc.) are interpolated between the 390 and 1440 boards | Implementation choice, review | 2026-09-30 |
| P3 | GhgFramework variants: `loop="arc"` + summary (FD v3: homepage, landing) and `loop="note"`, no summary (5t: /giai-phap). The mobile version keeps the FD v3 timeline on all routes | Implementation choice | 2026-09-30 |
| P4 | /giai-phap/giam-phat-thai is a dedicated landing archetype built from existing components (PageHero, ProcessTimeline, GhgFramework, SolutionGroups, FeaturedProject, CtaBand) plus two page-specific sections (ReductionGroups, PriorityCriteria) | Implementation of approval | 2026-09-30 |
| P5 | Landing copy for the hero lead, "why measurement first", group scope lines, prioritisation criteria questions and implementation steps was drafted for V1 (marked `reviewStatus: "draft"` in content). It is conservative and contains no numbers, technologies, savings, payback periods, rankings or results | **Needs LEANWARES review** | 2026-09-30 |
| P6 | New page-title role `display-s` 76 / 60 / 44 (templates 5a / 5t H1) | Implementation choice | 2026-09-30 |
| P7 | Anchors: global `scroll-margin-top` = compact header (64) + 24 from 1024; 16 below (header not sticky). In-page `#` links render native anchors so keyboard focus moves with the jump | Implementation choice | 2026-09-30 |
| P8 | PageHero keeps the secondary text link ("Xem khung GHG →") on mobile; template 5a shows only the primary button on mobile | Implementation choice, review | 2026-09-30 |
| P1–P8 | Phase 3A decisions | **Approved** | 2026-09-30 |
| H4 | Homepage resource format label: "Checklist / biểu mẫu" (no file implied); CTA stays "Xem tài nguyên →" | **Approved** | 2026-09-30 |
| VR-01 | Homepage mobile total height +12px vs the first Phase 2 measurement. Section-by-section check at 390 against FD v3: all sections match (margins, paddings, heading sizes). Known sub-token differences: knowledge top padding and final-CTA margin are 64px vs FD 72px (section-space token), i.e. shorter, not taller. No section visibly deviates, so no code change | **Accepted** (documented) | 2026-09-30 |
| B1 | /du-an follows 5v. Project rows use the LWProjectItem anatomy but the fact rows carry the case narrative (Dữ liệu / Phân tích / Giải pháp / Kết quả) instead of 5v's "Dịch vụ chính / Kết quả chính / Địa điểm"; location moves to the eyebrow | Implementation choice, review | 2026-09-30 |
| B2 | Case-structure band (Bối cảnh → Dữ liệu → Phân tích → Giải pháp → Kết quả) added under the /du-an hero (ProcessTimeline). Draft copy | Implementation choice, review | 2026-09-30 |
| B3 | Filters: industry (6) and solution group = 5 service groups (3 pillars + ESG & PTBV + Hệ thống quản lý & Tiêu chuẩn; replaces 5v "Carbon & ESG"); year only when records carry years. Filters are hidden while no project is verified | Implementation of approved IA | 2026-09-30 |
| B4 | Case Study Detail follows 5f plus the Phase 3B IA: added "Dữ liệu & đường cơ sở", "Triển khai", optional "Bài học", "Giải pháp liên quan". 5f's standards block is not rendered separately (standards shown in the meta row). 5f's illustrative before/after bars are NOT reproduced: bars render only from verified numeric pairs | Implementation choice (evidence integrity) | 2026-09-30 |
| B5 | New roles `display-m` 68 / 54 / 40 (5v, 5f, 5d, 5u H1; 5f mobile draws 36) and `metric-l` 64 / 52 / 40 (5f KPIs) | Implementation choice | 2026-09-30 |
| B6 | No tablet boards for 5v / 5f: tablet uses the desktop grids from 768 (rows 5 / 7, case sections 4 / 8, filter bar) with DS V3 spacing; results table + bars split only from 1280 | Interpolation, review | 2026-09-30 |
| B7 | Evidence integrity enforced in code (lib/content/projects.ts): only verified records are listed or routed; unverified text renders [CASE DATA]; a metric value renders only when verified AND it carries name, unit, source, period, baseline definition and comparison basis; misconfigured published records fail the build; anonymous cases show only an approved descriptor, never a name or logo slot | Implemented | 2026-09-30 |
| B8 | Case-study archetype preview is internal only: /foundation/case-study and /foundation/projects render fixtures in development or in builds made with LW_INTERNAL_PREVIEW=1; default production builds return 404. /du-an/[slug] generates only verified slugs (none yet) | Implemented | 2026-09-30 |
| B1–B8 | Phase 3B decisions (with Visual Review Checkpoint 1) | **Approved** | 2026-09-30 |
| I1 | Canonical industry taxonomy = the six approved industries; single source content/industries.ts (id, slug, name, shortName, summary, heroLead, context, image, challengeAreas, pillarIds, reductionGroupIds, standardsTopics, relatedProjectIds, reviewStatus). Slugs unchanged: thep-kim-loai, go-noi-that, giay-bao-bi, thuc-pham-nong-nghiep, san-xuat-cong-nghiep, khu-cong-nghiep. Detail route /nganh/[slug] replaces the planned /nganh#anchors | Implemented, awaiting approval | 2026-09-30 |
| I2 | Shared taxonomy IDs: IndustryId, CapabilityId (3 pillars + esg + managementSystems), ReductionGroupId (8 groups). Content stores IDs only; lib/content/taxonomy.ts resolves names and hrefs. ProjectRecord now carries id, industryId, pillarId, reductionGroupId; project filter keys are IDs | Implemented | 2026-09-30 |
| I3 | Standards / regulatory topics: only "approved" relationships render. Approved: CBAM ↔ Thép & kim loại (FD v3 "Checklist dữ liệu CBAM cho doanh nghiệp thép"; 5e / LWStandards industry). Stored as "proposed", NOT rendered, pending LEANWARES confirmation: ISO 50001 and GHG accounting ↔ Thép, Sản xuất công nghiệp; EUDR ↔ Gỗ, Giấy, Thực phẩm & nông nghiệp; ESG supplier requirements ↔ Thực phẩm & nông nghiệp, Khu công nghiệp. The section is omitted when an industry has no approved topic | Evidence rule, review | 2026-09-30 |
| I4 | 5e "Điểm nóng phát thải của ngành" bar chart is NOT reproduced (bar heights are illustrative). Replaced by "Lĩnh vực thách thức thường gặp": qualitative challenge areas from a controlled vocabulary (draft), no values. The 5u explorer insight "Điểm nóng phát thải" stays [NỘI DUNG] | Implementation choice (evidence integrity) | 2026-09-30 |
| I5 | 5e sections merged / added: "Yêu cầu thị trường và quy định" and LWStandards (industry) combined into one coded list with the LWStandards note; added "Bối cảnh ngành", "Trụ cột & năng lực liên quan" (RelatedContent) and "Dự án liên quan". The dark "Dự án tiêu biểu" band is replaced by verified project rows or a text empty state (no placeholder card). "Giải pháp ưu tiên" rows show the group scope summary, not an industry-specific reason | Implementation of Phase 3C IA, review | 2026-09-30 |
| I6 | /nganh explorer: the desktop "Xem giải pháp theo ngành →" link opens the selected industry; on mobile the link sits in each expanded accordion panel (the single 5u bottom button had no target). One accordion row open at a time, all collapsed by default. No tablet board: the 7 / 5 explorer is used from 768; "Vấn đề thường gặp" is one column below 1024 | Interpolation, review | 2026-09-30 |
| I7 | Mega menu and footer: the approved designs list no industries there, so no industry column was added; the "Ngành" nav item now resolves to /nganh. Homepage explorer rows link to /nganh/[slug] | Implementation of approved IA | 2026-09-30 |
| I8 | Draft (reviewStatus "draft"): industry summary, heroLead, context, challenge-area mappings and descriptions, pillar mappings, reduction-group mappings, standards-topic descriptions, empty-state copy. Qualitative only; no statistics, benchmarks or claims | Needs LEANWARES review | 2026-09-30 |
| I1–I8 | Phase 3C decisions | **Approved** | 2026-09-30 |
| I9 | Industry detail: "Trụ cột & năng lực liên quan" heading aligned to the section scale (t-h3) via RelatedContent `titleSize`; other RelatedContent uses keep h4 | **Approved** correction | 2026-09-30 |
| K1 | Knowledge templates: 5q (listing), 5r (article), 5l (resource). 5g / 5h are superseded. One canonical model (content/knowledge.ts): id, slug, type, title, summary, publishedAt, author, topic, industryIds, pillarIds, reductionGroupIds, standardsTopics, featuredImage, access (gated / ungated), downloadableAsset, body blocks, resource detail, relatedIds, reviewStatus, publicationStatus. Types: Bài phân tích, Hướng dẫn, Cập nhật quy định, Góc nhìn kỹ thuật, Tài liệu / biểu mẫu. Topics: 5k topic list | Implemented, awaiting approval | 2026-09-30 |
| K2 | Detail route /kien-thuc/[slug] (one archetype, article / resource layouts). Built only for publicationStatus "published" + reviewStatus "approved" + slug, title, summary, date; misconfigured records fail the build. None published yet → no detail pages; /kien-thuc lists marked layout placeholders (5q mix) with no links. Internal previews: /foundation/knowledge, /foundation/article, /foundation/resource (dev or LW_INTERNAL_PREVIEW=1) | Implemented | 2026-09-30 |
| K3 | Downloads: "Tải tài liệu" / "Tải xuống", file type, size and icon render only from a real downloadableAsset. Without one: "unavailable" panel (text + Liên hệ link). Gated form = LWGatedForm (4 fields + consent, no phone); the download appears only after a configured backend confirms the submission. The CBAM checklist (FD v3) is listed as "Chưa phát hành" with no link or file meta (decision H2 unchanged) | Evidence rule | 2026-09-30 |
| K4 | 5q deviations: tabs are shown only when real items exist (as /du-an filters); pagination omitted (≤ one page); "Sự kiện & Chia sẻ →" and LWSubscribe omitted (events not V1; no subscription backend). Added "Tiêu chuẩn & Framework" reference section (id tieu-chuan-framework) as the target of the footer link; standards vocabulary moved to content/standards.ts (shared with industries) | Implementation choice, review | 2026-09-30 |
| K5 | 5r / 5l / 5j 60px titles use display-m (68 / 54 / 40), as decided for 5f (B5); 5p 52 / 34 uses t-h2 (56 / 44 / 32). 5r body 18 / 1.75 uses the lead size with the body leading token. 5l "Xem trước" (page previews) is not built (needs real pages) | Implementation choice | 2026-09-30 |
| A1 | /ve-leanwares (5i): hero title verbatim; the unapproved tagline is replaced by the approved FD v3 homepage lead. Sections: LEANWARES là ai ([NỘI DUNG]), Lĩnh vực tập trung (3 pillars + 2 cross-cutting, approved copy), Ba cách nhìn (5i titles, [NỘI DUNG] descriptions), Năng lực nền (5i titles, [NỘI DUNG]). Omitted until approved / verified: Đội ngũ chuyên gia, Hành trình, Năng lực theo tiêu chuẩn (credentials) | Implementation of Phase 3D IA, review | 2026-09-30 |
| C23 | /lien-he (5j): H1 "Đăng ký đánh giá sơ bộ"; fields Họ và tên, Email công ty, Số điện thoại (optional), Tên công ty, Ngành sản xuất (optional), Nhu cầu trao đổi (optional; replaces 5j "Trụ cột quan tâm" with the six enquiry categories), Nội dung trao đổi, consent ([NỘI DUNG PHÁP LÝ CẦN DUYỆT] + Chính sách bảo mật link). File upload and response-time line omitted (no backend / no approved commitment). Contact details block omitted (no verified address / phone / email). Steps "Sau khi bạn gửi" use 5o titles without times. 5/7 split from 1024; stacked below | Implementation choice, review | 2026-09-30 |
| C24 | Form delivery: lib/forms/config.ts returns "unconfigured" for every form. Validation runs (blur + submit, focus to first error, text + orange bar); a valid submit shows an explicit non-production notice and never a success state; no network request. A first-party endpoint can be connected later ({ mode: "endpoint", url }); no third-party service referenced | Implemented; backend to be chosen | 2026-09-30 |
| L1 | Legal pages (5p, canonical footer): H1 Chính sách bảo mật / Điều khoản sử dụng / Chính sách cookie, "Cập nhật lần cuối: [NGÀY]", tabs between the three pages, TOC + sections only from approved text. No legal text supplied → [NỘI DUNG PHÁP LÝ CẦN DUYỆT] only. Footer labels unchanged (C2 / C22). No cookie banner: the site sets no cookies and loads no analytics / marketing tools | Implemented, needs legal text | 2026-09-30 |
| K1–K5, A1, C23, C24, L1 | Phase 3D decisions (Full-Site Review) | **Approved** | 2026-09-30 |
| N1 | Mega menu overview link renamed "Tổng quan giải pháp →" (→ /giai-phap). Mega menu = direct navigation; /giai-phap = overview page. Hero CTAs unchanged | **Approved** (Phase 4 brief) | 2026-09-30 |
| M1 | Launch modes development / staging / production (lib/site.ts); any production build defaults to staging (noindex, placeholders hidden). Indexing only in production with LW_ALLOW_INDEXING=1 (meta robots + robots.txt + X-Robots-Tag) | Implemented, awaiting approval | 2026-09-30 |
| M2 | Single publication policy (lib/content/publication.ts) applied in getters: placeholder sections hidden or neutralised outside development; drafts on staging only with LW_ALLOW_DRAFT=1; image slots without photos render without labels; legal / consent placeholders become neutral "đang chờ LEANWARES phê duyệt" notes; /du-an and /kien-thuc show honest empty states | Implemented, awaiting approval | 2026-09-30 |
| M3 | Build-time launch gate (lib/launch/gate.ts) in the root layout: staging fails on visible placeholders, unapproved drafts, missing LW_SITE_URL or logo (internal override LW_ALLOW_LOGO_FALLBACK=1); production fails on any open item (docs/LAUNCH_READINESS.md) | Implemented | 2026-09-30 |
| M4 | Metadata hierarchy (lib/seo.ts + content/seo.ts): site default → page entry → detail-record derived; canonical, OG title / description / URL / locale; no og:image until an approved asset exists. Sitemap = 17 public routes + published slugs only | Implemented | 2026-09-30 |
| M5 | Canonical company data (content/company.ts, all contact fields null until verified); legal single source with status (content/legal.ts); form adapter submitContactForm / submitDownloadRequest with same-origin endpoints only; /foundation reference page now gated like the fixtures | Implemented | 2026-09-30 |
| N1, M1–M5 | Phase 4 decisions | **Approved** | 2026-09-30 |
| S1 | Logo: approved `public/brand/leanwares-logo.jpg` (1315 × 729, white background) replaces the text fallback. Height-driven (tokens), width from intrinsic ratio; only on white or the footer white panel (FD v3). next/image at display size, quality 90. The production gate now requires an approved logo file in any format (SVG / PNG / JPG), not specifically SVG | Implemented (Phase 5 brief) | 2026-09-30 |
| S2 | Staging hosting: Vercel (dedicated staging project; LW_SITE_MODE=staging, LW_ALLOW_DRAFT=1, LW_ALLOW_INDEXING=0, LW_INTERNAL_PREVIEW=0). `.vercelignore` excludes design/, docs/, env files. /foundation/* metadata emitted only when internal preview is enabled | Prepared; awaits account authorisation | 2026-09-30 |
