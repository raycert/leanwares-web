# Image requirements

Status: Phase 4, 2026-09-30. **No approved photograph has been supplied yet.** Every slot
below renders a placeholder: labelled in development, a neutral striped slot on staging.
The production build fails while any rendered slot has no approved photo (launch gate).

## Rules (all slots)

- **Real LEANWARES photography only.** No stock imagery, no AI-generated images, no sourcing
  by the developers (Design System V3; Phase 4 brief).
- **Alt text is required.** The type `ImageAsset { src, alt }` has no photo without `alt`.
  Alt text is Vietnamese and describes what is visible and where, e.g. "Kỹ sư đo điện năng
  tại tủ điện nhà máy". Write it with the photo, not later. No decorative photos exist in V1,
  so none may have an empty alt.
- **Rights.** LEANWARES confirms the right to publish each photo. For client sites, the client
  must approve both the photo and any identifying detail (logos, faces, signage). Anonymous
  case studies must not show identifying detail.
- **Format.** Supply the original (JPEG, or PNG for screenshots). next/image serves resized
  WebP/AVIF automatically. Place files in `public/images/<area>/` and reference them from
  the content file shown below (`image: { src, alt }` beside the existing `placeholder`).
- **Crops.** Slots change aspect ratio by breakpoint (desktop / tablet / mobile), so keep the
  subject in the central safe area. Where one photo serves several ratios, supply the "master"
  size listed below.
- **Minimum sizes** are 2× the largest rendered width. Larger originals are fine.

Blocking legend: **P** = blocks production (gate). No slot blocks staging: neutral slots are
the accepted temporary state on a noindex preview. Hero images are **recommended** before
the staging review (marked ★), because the preview is judged largely on them.

## Homepage (`src/content/home.ts`)

| Slot | Ratio (desktop / tablet / mobile) | Minimum size | Subject | Blocking |
|---|---|---|---|---|
| Hero ★ | 4:5 / 4:5 / 1:1 | 1200 × 1500 (master covers 1:1) | Portrait: factory floor, or an engineer working at equipment (FD v3) | P |
| Pillar "Nhà máy xanh" | 3:2 | 1600 × 1067 | Wide shot: equipment systems in a workshop | P |
| Industry explorer × 6 | 4:3 (hidden on mobile) | 1200 × 900 each | One production area per industry: Thép & kim loại, Gỗ & nội thất, Giấy & bao bì, Thực phẩm & nông nghiệp, Sản xuất công nghiệp, Khu công nghiệp (infrastructure) | P |
| Featured project | 6:5 / 21:9 / 3:2 | master 2400 × 1600 | Verified project site | Hidden until a project is verified |
| Knowledge featured article | 16:9 | 1600 × 900 | Per published article | Hidden until an article is published |

The six homepage industry images can be the same photos as the industry pages below (supply
the 4:3 crop or the master).

## Solutions (`src/content/solutions.ts`)

| Slot | Ratio | Minimum size | Subject | Blocking |
|---|---|---|---|---|
| Pillar overview × 3 | 4:3 | 1200 × 900 each | Nhà máy xanh (plant / utilities), Sản phẩm xanh (product or production line), Chuỗi cung ứng xanh (suppliers, logistics, raw material) | P |
| Project teaser | 4:3 | 1200 × 900 | Verified project | Hidden until verified |

## GHG reduction (`src/content/emission-reduction.ts`)

| Slot | Ratio | Minimum size | Subject | Blocking |
|---|---|---|---|---|
| Hero ★ | 4:5 (side image) | 1200 × 1500 | Engineer measuring on site (5a/5d composition) | P |
| Case study | 6:5 / 21:9 / 3:2 | master 2400 × 1600 | Verified project | Hidden until verified |

## Industries (`src/content/industries.ts` → `image`)

One photo per industry, used in two places:

| Slot | Ratio | Minimum size | Subject | Blocking |
|---|---|---|---|---|
| `/nganh` explorer × 6 | 4:3 | 1200 × 900 | Production area of the industry | P |
| `/nganh/[slug]` hero × 6 ★ | 21:9 / 21:9 / 4:3 | 2500 × 1070 | Same subject, wide | P |

Supply either a master of **2560 × 1920** with the subject centred (both crops come from it) or
two crops per industry. Khu công nghiệp shows shared infrastructure (energy, water, waste),
not a single tenant.

## Projects (`src/content/projects.ts`, per verified record)

| Slot | Ratio | Minimum size | Subject | Blocking |
|---|---|---|---|---|
| Listing row | 4:3 | 1200 × 900 | Project site | Only with a verified project |
| Featured card | 3:2 / 3:2 / 4:3 | 1600 × 1067 | Same | Same |
| Case study hero | 21:9 / 21:9 / 4:3 | 2500 × 1070 (master 2560 × 1920) | Same | Same |
| Challenge photo | 3:2 (tablet up) | 1200 × 800 | The problem area before the project | Same |

Project photos need the client's approval; anonymous cases need no identifying detail.

## Knowledge (`src/content/knowledge.ts`, per published record)

| Slot | Ratio | Minimum size | Subject | Blocking |
|---|---|---|---|---|
| Article header | 21:9 / 21:9 / 16:9 | 2500 × 1070 | Topic photo (site, equipment, data work) | Only with a published article |
| Resource cover | not rendered in V1 | none | none | none |

## About (`src/content/about.ts`)

| Slot | Ratio | Minimum size | Subject | Blocking |
|---|---|---|---|---|
| Hero ★ | 21:9 / 21:9 / 4:3 | 2500 × 1070 (master 2560 × 1920) | The LEANWARES team at a plant (5i) | P |

## Count

Rendered on staging today: **25 slots** (homepage 8, solutions 3, GHG reduction 1,
`/nganh` 6, industry pages 6, about 1). Unique photos needed: **about 12–18**. The six
industry photos serve the homepage, `/nganh` and the six detail pages. The four heroes need
their own photos (homepage, GHG reduction, about; industry heroes come from the industry set).
The three pillar photos are also needed.

## Brand assets (not photos)

| Asset | Spec | Where | Blocking |
|---|---|---|---|
| Logo | **In use (Phase 5):** `public/brand/leanwares-logo.jpg`, 1315 × 729, white background, approved; on white or a white panel; min height 44 px. SVG / higher-resolution source recommended before production (not required); any approved format replaces it without layout changes | `src/lib/brand.ts` (`logo`) | Resolved |
| Favicon / app icon | Square, prepared by LEANWARES or its designer from the approved logo mark (not generated by the developers): `src/app/icon.png` (512 × 512) and `apple-icon.png` (180 × 180), or paths in `brandAssets` | `src/lib/brand.ts` | P |
| Default social preview | 1200 × 630 JPEG/PNG, approved design, e.g. `public/brand/og-default.jpg` | `brandAssets.socialImage` (with alt) | P |

No brand asset is generated or redrawn in their place.
