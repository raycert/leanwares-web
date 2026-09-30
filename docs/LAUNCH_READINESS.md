# Launch readiness

Status: Phase 4 audit, 2026-09-30. Not deployed. Modes and switches: `docs/DEPLOYMENT_MODES.md`.
Images: `docs/IMAGE_REQUIREMENTS.md`. The launch gate (`src/lib/launch/gate.ts`) enforces
§3 and §4 at build time, so this list and the build cannot drift apart.

Current gate result:
- `LW_SITE_MODE=staging` + `LW_SITE_URL` + `LW_ALLOW_DRAFT=1` → **0 open items** (Phase 5: the approved JPG logo is in use).
- `LW_SITE_MODE=production` → **26 open items** (§4).

---

## 1. Route audit (17 public V1 routes)

| Route | Unresolved items | Staging behaviour |
|---|---|---|
| `/` | Hero, pillar and 6 industry photos; featured project `[CASE DATA]`; knowledge teaser placeholders (no published articles); GHG value row `[CASE DATA]` | Featured project + knowledge teaser hidden; GHG labels only; neutral image slots |
| `/giai-phap` | 3 pillar photos; service catalogue "[DỊCH VỤ] / [NỘI DUNG]" (unverified services); cross-cutting "[NỘI DUNG] Danh mục dịch vụ"; project teaser `[CASE DATA]` | Service section, pending line and teaser hidden |
| `/giai-phap/giam-phat-thai` | Hero photo; draft copy (hero, measurement, groups, prioritisation, implementation); per-group "[NỘI DUNG] Phạm vi …"; case study `[CASE DATA]`; draft meta description | Detail lines and case study hidden; draft copy needs `LW_ALLOW_DRAFT=1` |
| `/nganh` | 6 photos; insight "Điểm nóng phát thải" and "Áp lực thị trường" `[NỘI DUNG]` (except CBAM for Thép); teaser `[CASE DATA]` | Empty insight rows and teaser hidden |
| `/nganh/[slug]` × 6 | 6 hero photos; all records `reviewStatus: "draft"` (copy and mappings) | Draft copy needs `LW_ALLOW_DRAFT=1` |
| `/du-an` | No verified project; method band draft | Honest empty state; no placeholder cards |
| `/kien-thuc` | No published article or resource; CBAM checklist has no file, date or slug; lead and standards descriptions draft | Honest empty state; standards reference shown (draft) |
| `/ve-leanwares` | Hero photo; "LEANWARES là ai" `[NỘI DUNG]`; approach / capability descriptions `[NỘI DUNG]`; no team, timeline or credentials; draft meta description | "Là ai" hidden; titles without placeholder descriptions |
| `/lien-he` | No verified contact details; consent text not approved; no form backend; draft lead and steps | Details block hidden; neutral consent note; form says "chưa được gửi đi" |
| `/bao-mat`, `/dieu-khoan`, `/chinh-sach-cookie` | No approved legal text | Neutral "Văn bản đang chờ LEANWARES phê duyệt." |
| Global | Approved logo in use (`public/brand/leanwares-logo.jpg`); no favicon; no social preview image | Real logo in header, mobile menu and footer panel |

Site-wide checks:

| Area | Status |
|---|---|
| SEO metadata | ✅ Every public route: title, description, canonical, OG title / description / URL / locale / site name (lib/seo.ts). 7 descriptions are drafts |
| Social preview image | ❌ No approved asset; no `og:image` is emitted (nothing invented) |
| Favicon / app icons | ❌ None supplied; none generated |
| robots | ✅ Mode-aware (`app/robots.ts`, meta robots, X-Robots-Tag); staging always noindex |
| Sitemap | ✅ 17 public URLs; excludes `/foundation/*`, fixtures and unpublished slugs |
| Canonical URLs | ✅ Absolute, from `LW_SITE_URL` (required for staging / production) |
| Fixture exposure | ✅ `/foundation/*` 404 in staging / production builds |
| Accessibility | ✅ axe-core WCAG 2.1 A/AA: 0 violations on 17 routes at 1440 and 390 (§7) |
| Performance | ✅ All routes static; CLS 0. Font payload noted (§8) |
| Image optimisation | ✅ next/image with `sizes` in every slot; pending real photos |
| Forms | ⚠️ Validation complete; no backend (truthful non-submission state) |
| Cookies / tracking | ✅ No cookies set, no analytics, no consent banner needed |

---

## 2. Placeholder policy (every occurrence classified)

Classes from the Phase 4 brief:
1. must be replaced before staging;
2. may remain in internal preview only;
3. must be hidden on public staging if real content is unavailable;
4. acceptable temporary neutral state.

| Placeholder | Where | Class | Implementation |
|---|---|---|---|
| Logo text fallback | Header, footer, mobile menu | resolved | Approved JPG in use (Phase 5); the fallback remains only for development resilience |
| Fixture records (`[CASE DATA]`, `[Tiêu đề …]`, `[NGÀY]`, `[TÁC GIẢ]`) | `/foundation/*` | 2 | Routes 404 outside internal preview |
| `/du-an` placeholder rows + featured card | `/du-an` | 2 | Development only; staging shows the empty state (class 4) |
| `/kien-thuc` placeholder rows + unpublished CBAM row | `/kien-thuc` | 2 | Development only; staging shows the empty state (class 4) |
| Featured project / case study / project teasers `[CASE DATA]` | `/`, `/giai-phap`, `/giai-phap/giam-phat-thai`, `/nganh` | 3 | Hidden (getter returns null) |
| Knowledge teaser `[Tiêu đề bài viết]` | `/` | 3 | Hidden |
| Service catalogue `[DỊCH VỤ]`, `[NỘI DUNG] Danh mục dịch vụ` | `/giai-phap` | 3 | Hidden |
| Group detail `[NỘI DUNG] Phạm vi đánh giá …` | `/giai-phap/giam-phat-thai` | 3 | Hidden |
| Industry insights `[NỘI DUNG]` | `/nganh` | 3 | Rows hidden |
| About "LEANWARES là ai" / descriptions `[NỘI DUNG]` | `/ve-leanwares` | 3 | Section / descriptions hidden |
| GHG diagram values `: [CASE DATA]` | `/`, `/giai-phap`, `/giai-phap/giam-phat-thai` | 4 | Labels kept (concept diagram), value row hidden |
| Prioritisation note `: [CASE DATA]` | `/giai-phap/giam-phat-thai` | 4 | Sentence kept without the token |
| Image slots `[ẢNH …]` | 25 slots | 4 | Neutral striped slot without a label (production blocker) |
| `[NỘI DUNG PHÁP LÝ CẦN DUYỆT]` | Legal pages, consent label | 4 | Neutral "đang chờ LEANWARES phê duyệt" note (production blocker) |
| Legal `Cập nhật lần cuối: [NGÀY]` | Legal pages | 4 | Line hidden |
| Contact details | `/lien-he` | 4 | Block hidden (production blocker) |

No replacement data was invented anywhere.

---

## 3. Staging blockers (Phase 5 cannot start until resolved or explicitly waived)

| # | Item | Owner | Resolution |
|---|---|---|---|
| S1 | ~~Logo~~ | LEANWARES | **Resolved (Phase 5):** approved `public/brand/leanwares-logo.jpg` in use; `LW_ALLOW_LOGO_FALLBACK` not set |
| S2 | Draft copy (§5) | LEANWARES | **Configured (Phase 5):** staging runs with `LW_ALLOW_DRAFT=1` (approved in the Phase 5 brief). Drafts still block production |
| S3 | **Staging host** (`LW_SITE_URL`) | LEANWARES | **Open:** needs Vercel account authorisation, then the project URL (docs/STAGING_REVIEW.md §2) |

Everything else is hidden or neutral on staging, and staging is always noindex.

## 4. Production blockers (the gate fails the production build on each)

| # | Item | Count / detail |
|---|---|---|
| P1 | Favicon / app icon, default social preview image (logo resolved: approved JPG; SVG or higher-resolution source recommended, not required) | 2 assets |
| P2 | Approved photographs | 25 rendered slots (IMAGE_REQUIREMENTS.md) |
| P3 | Draft copy approved (§5) | 6 industry records, GHG reduction page, projects method, knowledge lead, contact copy, standards descriptions, 7 meta descriptions |
| P4 | Verified contact details | Address, email, phone (at least); website / LinkedIn / Zalo optional (`content/company.ts`) |
| P5 | Legal texts approved | Chính sách bảo mật, Điều khoản sử dụng, Chính sách cookie, contact-form consent (`content/legal.ts`) |
| P6 | Contact form backend | Choice approved + first-party endpoint implemented (`LW_CONTACT_FORM_ENDPOINT`) |
| P7 | Production domain + `LW_SITE_URL` | Required for canonical and sitemap |
| P8 | Explicit approval to index | `LW_ALLOW_INDEXING=1` (not a gate item: without it the site stays noindex) |

Recommended before production (not gated): a manual screen-reader pass (VoiceOver iOS,
NVDA Windows) on the header, menus and contact form, and a Lighthouse run on the staging host.

## 5. Draft copy awaiting LEANWARES approval

| Content | File |
|---|---|
| 6 industry records: summary, hero lead, context, challenge areas, pillar and solution-group mappings; proposed standards links (not rendered) | `src/content/industries.ts` |
| Standards topic descriptions (CBAM, EUDR, ISO 50001, GHG, ESG) | `src/content/standards.ts` |
| Solution-group one-line summaries | `src/content/solution-groups.ts` |
| GHG reduction page: hero, measurement, groups, prioritisation, implementation | `src/content/emission-reduction.ts` |
| Projects "Cách trình bày dự án" band | `src/content/projects.ts` |
| Knowledge lead | `src/content/knowledge.ts` |
| Contact lead and "Sau khi bạn gửi" descriptions | `src/content/contact.ts` |
| Meta descriptions: GHG reduction, Kiến thức, Về LEANWARES, Liên hệ, 3 legal pages | `src/content/seo.ts` |
| UI states: empty states, "pending approval" notes, form "not connected" notice | `src/lib/content/publication.ts`, `src/lib/forms/config.ts` |

To approve: change `reviewStatus: "draft"` to approved (remove the field or set it) in the
file, or supply replacement copy.

## 6. Deferred (may remain after launch)

- Verified projects and case-study pages (the `/du-an` empty state is honest).
- Published articles and resources; the CBAM checklist file (the "Checklist / biểu mẫu" and
  "Xem tài nguyên →" treatment stays until a real file exists; no PDF / Excel / size /
  download / gated form without one).
- Service catalogue per pillar (business verification); About team, timeline and credentials.
- Proposed industry ↔ standards relationships (EUDR, ISO 50001, GHG, ESG supplier).
- Events, subscription, search, Thank-you page (5o), resource page previews (5l).
- Analytics and a cookie-consent banner (only once analytics / marketing tools are approved).
- CMS.

## 7. Accessibility audit (staging build)

| Check | Result |
|---|---|
| axe-core 4.13, WCAG 2.1 A/AA (includes colour contrast, names, labels, landmarks, ARIA) | 0 violations, 17 routes × 1440 / 390 |
| Keyboard navigation and visible focus | Pass (existing suites: homepage 33, 3A 36, 3B 33, 3C 73, 3D 73 checks) |
| Landmarks (header, nav, main, footer), skip link | Pass on every route |
| Heading structure (one H1, no skipped levels) | Pass, 17 routes × 2 widths |
| Form labels, error association (`aria-describedby`), focus on first error, text + orange bar | Pass (/lien-he, gated form preview) |
| Modal focus trapping (mobile menu, mega menu, project filter sheet) | Pass (existing suites) |
| Reduced motion | Pass (transitions collapse to 0.01 ms) |
| Meaningful link text | Pass; repeated "Xem giải pháp theo ngành" carries a visually hidden industry name |
| Alt text policy | Enforced by type (`ImageAsset.alt`); placeholder slots are `aria-hidden` |

Unresolved / not automatable: screen-reader announcement quality (manual test pending),
contrast over real photographs (no photos yet), and alt-text quality (written with the photos).

## 8. Performance audit (staging build, 1440, cold cache, local server)

| Metric | Result |
|---|---|
| Rendering | All 17 public routes static (○ / ● SSG); no server work per request |
| HTML | 7–16 KB per route (compressed) |
| JavaScript | ≈153 KB per route (compressed; React 19 + Next runtime + shared header / menu client code). Client components are limited to interactive parts: header, menus, explorers, filters, tabs, forms |
| CSS | ≈22 KB (CSS Modules, one shared bundle) |
| Fonts | 12 woff2 files, ≈336 KB, self-hosted via next/font, `display: swap`, preloaded |
| CLS | 0 on every route |
| Images | None yet; next/image with responsive `sizes` in every slot, priority on heroes |

Findings:
- **Fonts are the largest payload.** Three families × three subsets (latin, latin-ext,
  vietnamese); the Newsreader opsz variable files are ~85 KB and ~129 KB. Dropping `latin-ext`
  was tested and rejected: next/font still declares it, and ă đ ơ ư fall in both the latin-ext
  and vietnamese ranges, so the files load anyway. Options for approval: (a) accept;
  (b) drop the `opsz` axis if static optical sizes are acceptable (visual change, needs design
  sign-off); (c) self-host a combined latin + Vietnamese subset (new font build step).
- JavaScript per route is at the framework baseline. All 10 client components are interactive (header, mega / mobile menu, industry explorers and rows, project filters, knowledge tabs, two forms); the rest of the site renders on the server.
- No unused CSS payload of note (22 KB total).

## 9. Exact inputs required from LEANWARES

1. ~~Logo file~~ (supplied: JPG, approved). Recommended, not required: SVG or a higher-resolution source, and a compact lockup for small sizes (§10).
2. Favicon / app icon source (from the approved logo mark) and the 1200 × 630 social preview image.
3. Photographs per `docs/IMAGE_REQUIREMENTS.md` (≈12–18 photos), with alt text and publishing rights.
4. Verified company contact data: address, email, phone; optional website, LinkedIn, Zalo.
5. Approved legal texts: privacy policy, terms of use, cookie policy (with effective dates), and the contact-form consent sentence.
6. Approval or edits for every draft in §5, or approval to show drafts on staging.
7. Contact form backend choice (who receives enquiries, where data is stored), then approval to implement it.
8. Staging domain, production domain and the go-ahead to index production.
9. Deferred content when ready: verified projects (with evidence metadata), articles and resources (with real files), service catalogue, team / timeline / credentials, standards relationships.

## 10. Logo assessment (Phase 5)

- File: `public/brand/leanwares-logo.jpg`, 1315 × 729, baseline JPEG, 104 KB, pure white
  background (255, 255, 255), artwork touches the canvas edges (no built-in clear space;
  clear space comes from the layout, as in Final Direction v3).
- Rendering: height-driven (header 48 / 52, compact 44, footer 56 / 72 in a white panel), width
  from the intrinsic ratio 1.804. Served by next/image as WebP at display size: ≈7 KB (header),
  ≈12 KB (footer), quality 90. Sharp at 1×, 2× and 3×; no visible compression artefacts.
- Matches Final Direction v3, which uses this file at the same heights.
- Observations for LEANWARES (not blocking): the lockup is tall (the circle), so at header
  height the wordmark is ≈10 px and the "MAKE DIFFERENCE - MAKE VALUE" line is not legible;
  the lockup includes that line and the ® mark. An SVG or higher-resolution source is
  recommended before production; a compact / horizontal lockup would improve legibility at
  small sizes (brand decision; the file is used unmodified).
