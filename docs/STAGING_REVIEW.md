# Staging review

Status: **Phase 5, prepared but NOT deployed** (2026-09-30).
The build is staging-ready and validated locally in staging mode. Deployment stops at the
Vercel account authorisation step (§2). Online QA (§6) runs once a staging URL exists.
Production is a separate, later approval (Phase 6).

## 1. Summary

| Item | Value |
|---|---|
| Staging URL | **Not yet deployed:** Vercel CLI reports "Logged out"; no token or linked project |
| Deployment identifier / commit | None (the project is not a git repository; the Vercel CLI deploys from the working directory) |
| Environment mode | `LW_SITE_MODE=staging` (see §3) |
| Staging launch gate | **Passes** (0 open items) with `LW_SITE_URL` + `LW_ALLOW_DRAFT=1` |
| Production launch gate | Fails as intended: **26 open items** (docs/LAUNCH_READINESS.md §4) |
| Logo | `public/brand/leanwares-logo.jpg` (approved JPG), no text fallback |
| Indexing | noindex, nofollow (meta + robots.txt + X-Robots-Tag), also with `LW_ALLOW_INDEXING=1` |
| Forms | Not connected: validate locally, no request, never a success state |
| Analytics / cookies | None |

## 2. Deployment: exact next action (needs the account owner)

Nothing below has been run: each step needs LEANWARES / account authorisation.

1. **Authorise Vercel** on this machine: `npx vercel login` (browser sign-in to the LEANWARES
   Vercel account or team), or provide a `VERCEL_TOKEN` for a named team/project.
2. **Create / link the staging project** from `D:\App\lw-web`: `npx vercel link` →
   new project, e.g. `leanwares-staging` (framework detected: Next.js; defaults for build,
   output and install). The stable URL will be `https://<project>.vercel.app` (Vercel may add
   a suffix if the name is taken).
3. **Set the environment variables** for the environment that builds the staging domain
   (docs/DEPLOYMENT_MODES.md §7): `LW_SITE_MODE=staging`, `LW_SITE_URL=https://<project>.vercel.app`,
   `LW_ALLOW_DRAFT=1`, `LW_ALLOW_INDEXING=0`, `LW_INTERNAL_PREVIEW=0`. Do not set
   `LW_ALLOW_LOGO_FALLBACK` or any form endpoint.
4. **Deploy:** `npx vercel deploy --prod` (Vercel terminology for the project's main domain;
   the site still builds in staging mode). If the assigned URL differs from `LW_SITE_URL`,
   update the variable and redeploy.
5. **Run online QA** against the URL (§6): scripts accept `BASE=https://…`.

Alternative that needs no account: `vercel deploy --temporary` creates an anonymous
deployment that can be claimed later. It was **not** used: it would publish the site outside a
LEANWARES-controlled account, with no environment-variable management. Use only with explicit approval.

Not in scope: the LEANWARES production domain, production mode, indexing.

## 3. Environment (no secrets exist)

```
LW_SITE_MODE=staging
LW_SITE_URL=<staging URL, set after step 2>
LW_ALLOW_DRAFT=1
LW_ALLOW_INDEXING=0
LW_INTERNAL_PREVIEW=0
# not set: LW_ALLOW_LOGO_FALLBACK, LW_CONTACT_FORM_ENDPOINT, LW_DOWNLOAD_FORM_ENDPOINT
```

`.env*` files are git-ignored (except `.env.example`) and excluded from the Vercel upload
(`.vercelignore`, which also excludes `design/` and `docs/`).

## 4. Hosting suitability (checked)

- Next.js 16.3.7 App Router, React 19.3, npm lockfile, Node ≥ 20.9: supported by Vercel.
- Build `next build`, output `.next`: defaults. No custom server, no database, no runtime
  secrets, no native modules. 17 public routes static (SSG); `robots.txt` and `sitemap.xml`
  static; `/foundation/*` prerendered as 404 with no fixture content or metadata.
- `next.config.ts`: `X-Robots-Tag` header, `images.qualities` [75, 90]. next/image uses the
  Vercel image optimiser (logo only for now).
- The logo is in `public/brand/` and is included in the deployment; the build output
  references it.

## 5. Pre-deployment validation (local, staging mode, `LW_SITE_URL=http://localhost:3456`)

| Check | Result |
|---|---|
| Lint · typecheck · staging production build · launch gate | Pass · Pass · Pass (27 pages) · Pass |
| Real JPG logo renders; no text fallback | Pass (header, compact header, mobile menu, footer panel) |
| Production blockers still enforced | Pass (production build fails with 26 items) |
| Default build without configuration | Fails (staging gate: no `LW_SITE_URL`, drafts), as intended |
| `/foundation/*` unavailable; no fixture strings in the build output (HTML, RSC, client JS) | Pass |
| robots.txt `Disallow: /`; meta noindex, nofollow; X-Robots-Tag; still noindex with `LW_ALLOW_INDEXING=1` | Pass |
| sitemap.xml = the 17 public routes only | Pass |
| All 43 unique links resolve (header, footer, main; 1440 and 390) | Pass |
| No download action / file type / size / gated form | Pass |
| No fake form submission (no POST, "chưa được gửi đi") | Pass |
| No placeholder text or image labels visible (17 routes × 7 widths) | Pass |
| No horizontal overflow (17 × 7) | Pass |
| One H1, hierarchy, unique IDs, landmarks, img alt (1440, 390) | Pass |
| Functional suite (skip link, mega menu keyboard, sticky header, anchor offsets, explorer, accordion, mobile-menu focus trap, form errors, empty states, back / forward, deep links, 404, reduced motion) | 18/18 |
| Development-mode regression suites (fixtures, placeholders) | 3D 73/73 · 3C 73/73 · 3B 33/33 · 3A 36/36 · home 33/33 |
| 22 design exports byte-identical | Pass |

Suites: `phase4.mjs` (43), `functional.mjs` (18), `logo.mjs` (15), `perf2.mjs`; all take `BASE`.

## 6. Online QA (pending deployment)

To run against the staging URL, at 1440 / 1024 / 390 plus spot checks at 320 / 768 / 1280 / 1920,
on every route in scope:
`/`, `/giai-phap`, `/giai-phap/giam-phat-thai`, `/nganh`, the six industry pages, `/du-an`,
`/kien-thuc`, `/ve-leanwares`, `/lien-he`, `/bao-mat`, `/dieu-khoan`, `/chinh-sach-cookie`.

| Area | Local staging result | Online |
|---|---|---|
| Routes, links, overflow, metadata, canonical (staging URL) | Pass | Pending |
| Search-engine protection (meta, robots.txt, header) | Pass | Pending (**deployment blocker if it fails**) |
| Logo visual QA | Pass (§7) | Pending |
| Functional checks | 18/18 | Pending |
| Accessibility (axe) | 0 violations | Pending |
| Performance | §8 | Pending (real network / CDN) |

Expected differences online: absolute URLs in canonical / OG / sitemap become the staging
origin; images come from the Vercel image optimiser; CDN caching and HTTP/2 change timings.

## 7. Logo

- File: `public/brand/leanwares-logo.jpg`, 1315 × 729, baseline JPEG, 104 KB, approved.
- Rendering: height from the placement tokens (header 48 → 52 at ≥ 1280, compact 44, mobile
  48, footer 56 → 72); width from the intrinsic ratio 1.804, never stretched or cropped.
  Placed only on white (header, mobile menu) and in the footer's white panel on navy
  (Final Direction v3). next/image serves display-sized WebP: ≈7 KB (header) and ≈12 KB
  (footer) at quality 90.
- Quality: sharp at 1×, 2× and 3×; no visible compression artefacts; background is pure
  white, so it shows no box on white; aspect ratio exact; aligned to the container edge.
- Observation: the lockup is tall (circle), so at header height the wordmark is ≈10 px and
  the "MAKE DIFFERENCE - MAKE VALUE" line is not legible. This matches Final Direction v3,
  which uses the same file at the same heights. **Recommended before production (not
  blocking): SVG or higher-resolution source; LEANWARES may consider a compact lockup for
  small sizes.** The file is used unmodified.

## 8. Performance (local staging build, cold cache)

| Profile | Page weight | JS | CSS | Fonts | Images | LCP | CLS | INP (menu click) |
|---|---|---|---|---|---|---|---|---|
| Desktop 1440 | 576–605 KB | 156 KB | 24 KB | 340 KB | 9 KB (logo) | 184–380 ms | 0 | 24–40 ms |
| Mobile 390, 4× CPU, 1.6 Mbps / 150 ms | 577–593 KB | 154–156 KB | 24 KB | 340 KB | 19 KB (logo, 3×) | 1.4–2.2 s | 0 | 64–112 ms |

LCP element is text (H1 or lead); no image LCP yet. Fonts are ~57 % of the weight (known;
font architecture unchanged pending approval, LAUNCH_READINESS §8). No image warnings: no
photos yet, and the logo is served at display size.

## 9. Accessibility

| Check | Result (local staging) |
|---|---|
| axe-core 4.13 WCAG 2.1 A/AA, 17 routes × 1440 / 390 | 0 violations |
| Keyboard-only navigation, visible focus | Pass (skip link first, rings on every stop) |
| Mobile menu focus trap, Escape | Pass |
| Mega menu keyboard, Escape restores focus | Pass |
| Form error flow (text errors, `aria-describedby`, focus to first error, status message) | Pass |
| Reading order (DOM order = visual order; hidden sections removed, not visually hidden) | Pass |
| Skip link to `<main>` | Pass |
| Logo alt text | "LEANWARES" in header, mobile menu and footer (link names read "LEANWARES — Trang chủ") |

Dependent on final content: alt text and contrast over real photographs; screen-reader pass
(VoiceOver / NVDA) recommended on the live staging URL.

## 10. Known staging exceptions (by design)

- Draft copy is visible (`LW_ALLOW_DRAFT=1`); drafts remain production blockers.
- Image slots without photos render as neutral striped slots.
- Hidden: featured project, case study, project teasers, homepage knowledge teaser, service
  catalogue, `[NỘI DUNG]` detail lines, About "LEANWARES là ai", empty insight rows.
- `/du-an` and `/kien-thuc` show honest empty states.
- Legal pages and the consent label show "đang chờ LEANWARES phê duyệt".
- Contact details block hidden (no verified data). Forms not connected.
- No favicon (browser default) and no social preview image.

## 11. Issues requiring action

| # | Issue | Owner |
|---|---|---|
| 1 | Authorise Vercel and create the staging project (§2) | LEANWARES |
| 2 | Confirm the staging URL (or a LEANWARES staging subdomain later) | LEANWARES |
| 3 | Run online QA and record results here (§6) | Dev, after 1–2 |
| 4 | Logo: SVG / higher-resolution source recommended before production | LEANWARES (optional) |

## 12. Production blockers remaining (26 gate items)

Favicon / app icon, social preview image, 25 photo slots (1 item), draft approvals (17 items:
page drafts and draft meta descriptions), verified contact details, three legal texts and the
consent text (4 items), contact form backend, plus production domain / `LW_SITE_URL` and the
explicit indexing approval. Full list: docs/LAUNCH_READINESS.md §4 and §9.
