# LEANWARES Website — Implementation Plan

Companion to [`DESIGN_HANDOFF.md`](./DESIGN_HANDOFF.md), which holds the design rules and
decisions. This document covers *how* and *in what order* the site gets built.

**Stack (approved 2026-09-30)**

- Next.js (App Router) with TypeScript.
- CSS custom properties for design tokens; CSS Modules for component-scoped styles.
- No UI framework and no CSS framework.
- No CMS yet. Structured content lives in TypeScript / JSON / MDX, behind a content layer
  that a CMS can replace later without rewriting presentation components.
- Deployment target: Vercel (later).

**Pinned toolchain**

| Tool | Version | Why |
|---|---|---|
| next / eslint-config-next | 16.3.x | Current stable |
| react / react-dom | 19.x | Required by Next 16 |
| typescript | 5.9.x | `typescript-eslint` (bundled with `eslint-config-next`) supports TS < 6.1 only, so TS 7 cannot be linted yet |
| eslint | 9.x | `eslint-plugin-react` (bundled with `eslint-config-next`) does not support ESLint 10 yet |

---

## 1. Production folder structure

```
lw-web/
├─ design/                     Claude Design export — flat, read-only (see design/README.md)
├─ docs/                       DESIGN_HANDOFF.md, IMPLEMENTATION_PLAN.md
├─ public/
│  └─ brand/                   leanwares-logo.svg (pending, see §5)
└─ src/
   ├─ app/                     Routes only: layout, metadata, data loading, composition
   │  ├─ layout.tsx            <html lang="vi">, fonts, global styles
   │  ├─ page.tsx              Homepage (placeholder until Phase 2)
   │  └─ foundation/           Internal token & primitive reference (noindex)
   ├─ components/
   │  ├─ layout/               SkipLink, SiteHeader, MegaMenu, MobileMenu, SiteFooter
   │  ├─ sections/             Page sections; sections/home/* for homepage-only sections
   │  ├─ cards/                ProjectRow, IndustryRow, EventRow, ResourceRow, ArticleRow…
   │  ├─ forms/                ContactForm, GatedDownloadForm, SubscribeForm, SearchInput
   │  └─ ui/                   Primitives: Button, TextLink, Eyebrow, Container, Grid, …
   ├─ content/                 Typed content modules (TS/JSON/MDX), no JSX
   ├─ lib/                     Helpers: brand, breakpoints, class names, content access
   └─ styles/
      ├─ tokens/               color, typography, spacing, layout, border, motion (CSS vars)
      ├─ base.css              Reset, element defaults, focus-visible
      ├─ typography.css        Type-role utility classes (.t-display … .t-data)
      └─ globals.css           Imports everything above in order
```

**Layering rules**

1. `styles/tokens/*` is the **only** place raw colours, font stacks and scale values live.
2. `components/ui` use tokens only. `components/sections|cards|forms|layout` compose `ui`
   primitives plus tokens.
3. **Presentation components receive content through props.** They never import from
   `src/content` directly.
4. `src/app/**` loads content through `src/lib/content` and passes it down as props.
5. **CMS readiness:** `src/lib/content` exposes typed async getters (e.g. `getHomepage()`,
   `getIndustries()`). In V1 they read `src/content`; later they call a CMS. Component
   props don't change.
6. `design/` is never imported, bundled or modified by the application.

---

## 2. Phases

| Phase | Scope | Exit criteria |
|---|---|---|
| **0: Decisions** ✅ | Audit, source-of-truth rules, conflict decisions, stack | `DESIGN_HANDOFF.md` approved |
| **1: Foundation** ✅ approved | Next.js scaffold; tokens; fonts (Vietnamese verified); `Button`, `TextLink`, `Eyebrow`, `Container`, `Grid`, base typography; `/foundation` reference page | Lint, typecheck and build pass; design files unchanged; Foundation approved |
| **2: Global chrome + Homepage** ✅ approved | `SkipLink`, `SiteHeader` (sticky 80→64, `MegaMenu`, `MobileMenu`), `SiteFooter`, `CtaBand` (`home`/`default`), `ResponsiveImage`, `Logo`; the 11 homepage sections from FD v3 at 1440/1024/390; content-layer types for the homepage | Visual check against FD v3 at the 3 reference widths; keyboard and screen-reader pass on header/menu; placeholders kept |
| **3A: Solutions architecture** ✅ approved | /giai-phap (5t) and /giai-phap/giam-phat-thai (dedicated landing with the 8 anchored groups); shared PageHero, SectionHeader, ProcessTimeline, ProjectTeaser, Breadcrumb, AppLink | Anchors clear the sticky header; no unverified service claims; placeholders kept |
| **3B: Projects & case studies** ✅ approved | /du-an (5v), Case Study Detail archetype (5f) at /du-an/[slug] (verified slugs only), canonical project model with evidence rules, internal fixtures under /foundation | No fabricated project data; filters ready; archetype previewable internally |
| **3C: Industries** ✅ approved | /nganh (5u) and the Industry Detail archetype (5e) at /nganh/[slug] for the six canonical industries; canonical `content/industries.ts`; shared taxonomy IDs (industry, pillar / capability, reduction group) used by Industries and Projects; `IndustryRow` `overview`, `SplitSection`, `IndexList`, PageHero wide image | Only approved relationships rendered; related projects verified-only; no invented benchmarks |
| **3D: Knowledge, About, Contact & Legal** ✅ approved (Full-Site Review) | /kien-thuc (5q) + Knowledge detail archetype at /kien-thuc/[slug] (5r article, 5l resource; published + approved only), canonical `content/knowledge.ts`, `GatedDownloadForm` (LWGatedForm states), /ve-leanwares (5i), /lien-he (5j) with `ContactForm` (unconfigured delivery), legal archetype (5p) for /bao-mat, /dieu-khoan, /chinh-sach-cookie; shared `content/standards.ts` | No invented content, dates, files, contact details or legal text; all V1 links resolve; no fake submission or download |
| **4: Content & launch readiness** ✅ approved | Launch modes (development / staging / production), central publication policy, build-time launch gate, route metadata + canonical + OG, robots / sitemap / X-Robots-Tag by mode, company contact and legal single sources, form adapter, docs: LAUNCH_READINESS, IMAGE_REQUIREMENTS, DEPLOYMENT_MODES, .env.example | Staging build passes with only approved switches; production build lists every open item; no placeholders, fake data or indexing on staging |
| **5: Staging deployment & online QA** ⏸ *(prepared; deployment awaits Vercel authorisation)* | Approved JPG logo integrated; format-agnostic logo gate (file must exist and be approved); foundation metadata gated; `.vercelignore`; Vercel staging config documented; local staging QA complete; online QA pending the staging URL (docs/STAGING_REVIEW.md) | Staging live on a noindex URL, online QA recorded |
| **(old 4) Projects & about/contact** *(absorbed by 3B / 3D; remaining: form backend, Thank-you 5o)* | Projects listing / detail (5v, 5f), About (5i), Contact (5j) + Thank-you (5o), form primitives, `ContactForm` | Form validation and a11y per DS V3; a real form backend is chosen |
| **5: Knowledge & growth** | 5q, 5r, resource library / detail (5k, 5l) + `GatedDownloadForm`, events (5w, 5m), `SubscribeForm`, `RelatedContent`, `StandardsBlock` | Download states A/B/C; no popups |
| **6: Standards architecture** | ESG (5x), Management systems (5y), Standards library / detail (5z, 5aa), Service ↔ Standard N:N | Service catalogue business-verified |
| **7: Utility & launch** | Legal pages (5p: Bảo mật, Điều khoản, Chính sách cookie), 404 (5s), metadata/OG, sitemap.xml/robots, performance, accessibility audit, Vercel deployment | Lighthouse / axe pass; launch checklist |
| Later | Search (5n + overlay), Credentials, cookie consent, CMS, analytics | Triggered by the deferred items in §4 |

---

## 3. Component dependency order

Build strictly bottom-up. Each level depends only on the levels above it.

1. **Tokens:** colour, typography, spacing, layout, border, motion. ✅
2. **Base styles:** reset, element defaults, focus ring, typography roles. ✅
3. **Layout primitives:** `Container`, `Grid`. ✅
4. **Text primitives:** `Eyebrow`, `TextLink`, `Button`. ✅
5. **Media and brand:** `ResponsiveImage` (with a dev placeholder mode that replaces
   LWPhoto) and `Logo`.
6. **Content patterns:**
   - `SectionHeader` (eyebrow + serif title + optional lead / action)
   - `NumberedRow` (01 → rows)
   - `Metric`
   - `DataTable` (Baseline / After / Δ)
   - `Timeline` (horizontal / vertical)
   - `Marker` (square marker)
7. **Global chrome:** `SkipLink` → `SiteFooter` → `MegaMenu` → `MobileMenu` → `SiteHeader`
   → `CtaBand`.
8. **Homepage sections:**
   - `Hero`
   - `MarketPressure`
   - `Pillars` (factory / product / supply-chain)
   - `CrossCutting`
   - `GhgFramework`
   - `SolutionGroups`
   - `IndustryRow` (`home`) → `IndustryExplorer`
   - `FeaturedProject`
   - `KnowledgeTeaser`
9. **Listing cards:** `ProjectRow`, `IndustryRow` (`overview`), `EventRow`, `ResourceRow`,
   `ArticleRow`.
10. **Form primitives:** `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Chip`,
    `FileUpload`, `FormError`.
11. **Navigation helpers:** `Breadcrumb`, `Tabs`, `Pagination`, `FilterPanel` +
    `BottomSheet`, `FaqAccordion`.
12. **Composite sections and forms:** `RelatedContent`, `StandardsBlock`, `ContactForm`,
    `GatedDownloadForm`, `SubscribeForm`, `ThankYou`.
13. **Deferred:** `SearchInput` / `SearchResults`, `Credentials`.

---

## 4. Deferred items

| Item | Trigger to revisit |
|---|---|
| Search in the global header | Not in V1. Components/specs kept for Knowledge/Resource search. |
| Search page / overlay (5n) | When Knowledge/Resource search is scheduled. Add the "Tiêu chuẩn" tab per DS V3 (C15). |
| Cookie consent banner | Not designed or implemented. Revisit when analytics or any non-essential cookie is introduced. |
| Credentials (metrics + logo strip + standards) | Verified metrics, client logos **and** publication permissions supplied |
| Separate pages for the 8 solution groups | Post-V1. V1 uses anchors on `/giai-phap/giam-phat-thai`. |
| CMS | Content volume / editor workflow requires it. The content layer (§1 rule 5) makes this a data-source swap. |
| DS V3 Case Study Card | Unused by any template; parked (C13) |
| Condensed tablet navigation | A design is supplied (C8) |
| Non-Vietnamese locales | Not in V1 scope |

---

## 5. Content & data dependencies

**Needed before Phase 2 (Homepage)**

| Dependency | Status | Notes |
|---|---|---|
| Logo: `public/brand/leanwares-logo.svg` | **Missing** | The JPG from the export is also acceptable as an interim input. Never redrawn. See `src/lib/brand.ts`. |
| Hero photo, 4:5 (on-site factory / engineer) | Missing | Placeholder allowed in development |
| Green Factory pillar photo, 3:2 | Missing | Same as above |
| 6 industry photos, 4:3 | Missing | Same as above |
| Featured project: name, industry/location, challenge / approach / solution / result, 3 indicators (baseline / after / Δ), 2 KPIs, photo 6:5 with measurement point | Missing | Remains `[CASE DATA]` until verified |
| Knowledge teaser: featured analysis + 2 articles + 1 resource | Missing | Titles remain placeholders; "Checklist dữ liệu CBAM cho doanh nghiệp thép" is the design's example resource and must be confirmed |
| Route slugs for pillars, industries, projects, knowledge, about, contact, legal | **Open** | Only `/giai-phap/giam-phat-thai` is approved. Needed for header, footer and homepage links. |
| Archetype for `/giai-phap/giam-phat-thai` | **Open** | Not in Summary V3. Candidates: Service Detail (5d) or a dedicated page with 8 anchored sections. |
| Mega menu / mobile menu labels | Available | DS V3 mega menu (subject to C3 business verification) |
| Footer group lists | Available | FD v3 footer (group 4 "ESG & Hệ thống quản lý"). C4 link targets are open. |
| Homepage copy (headlines, leads, 5 market questions, 7 GHG steps, 8 groups, 6 industries) | Available | FD v3 |

**Needed in later phases:** team profiles and portraits (1:1); company timeline; contact
details (address, phone, email); form backend and recipients; legal texts; resource files
(PDF/XLSX) and metadata; event data; the verified service catalogue for 5x/5y/5z;
standards descriptions; case studies.

**Content model** (from Summary V3 §10). Entities:

- Service, Standard/Framework, Industry, Project, Article, Resource, Event.
- Service ↔ Standard is **N:N**; Standard also relates N:N to Industry, Project, Article
  and Resource.
- A Service belongs to one of **5 groups**: 3 pillars + ESG & PTBV + Hệ thống quản lý &
  Tiêu chuẩn.
- The homepage's **8 solution groups** are a separate, homepage-level list anchored on
  `/giai-phap/giam-phat-thai`.

---

## 6. Unresolved business-content questions

1. **Service catalogue verification (C3).** Confirm every service or capability named in:
   - the DS V3 mega menu, including "Thiết lập nhà máy xanh (Green Factory Setup)" and the
     column-4 ISO 14001 / 45001 / 50001 / 9001 entries,
   - 5t, 5x (e.g. SMETA, BSCI, WRAP, SA8000, ESRS readiness, SBTi) and
     5y / 5z (e.g. ISO 27001, 28000, 37000, 26000, 14068).

   These are capability claims.
2. **Standards gated "only when approved":** ISO 50002 / 50006 / 50015 (LWStandards).
3. **Footer group 4 link targets (C4):** "Carbon" and "Dữ liệu" have no page in the sitemap.
4. **Tagline (C21):** "Make Difference – Make Value" (5i). Approved company copy?
5. **Example resource:** is "Checklist dữ liệu CBAM cho doanh nghiệp thép" (PDF + XLSX,
   09/2026) a real, publishable resource?
6. **Featured project:** which project, with verified data and client permission to publish?
7. **Credentials:** verified metrics (projects, industries, years, clients) and logo
   permissions. Deferred.
8. **Route slugs** and the archetype for `/giai-phap/giam-phat-thai` (see §5).
9. **Layout questions:**
   - Q-L1: max content width above 1440 (provisional: 1248px, centred).
   - Q-L2: the 768px column-stacking breakpoint (provisional).
   - Mobile sticky header behaviour (C9).

---

## 7. Font & Vietnamese glyph verification

Verified 2026-09-30 during Phase 1.

| Check | Method | Result |
|---|---|---|
| Subset availability | `next/font` Google metadata (`font-data.json`) | Newsreader, Public Sans and IBM Plex Mono all list `vietnamese` |
| Glyph coverage | Downloaded the Google Fonts TTF for every weight in use (Newsreader 400/500/600; Public Sans 400/500/600/700; Plex Mono 400/500) and read each `cmap` against 179 required code points: the full Vietnamese alphabet in upper and lower case, U+1EA0–1EF9 and ₫ | **0 missing** in all 9 files |
| Build output | `next build` CSS | Self-hosted `@font-face` with `unicode-range` U+1EA0-1EF9 for all three families |
| Rendering | `/foundation` renders the full alphabet in serif, sans and mono | Page served with `lang="vi"` |

Configuration: `src/lib/fonts.ts`.

- Newsreader: variable weight with the `opsz` axis, matching the design export's
  `opsz 6..72`.
- Public Sans: variable weight.
- IBM Plex Mono: static 400 and 500.
- All three: `display: swap`, subsets `latin`, `latin-ext` and `vietnamese`.
