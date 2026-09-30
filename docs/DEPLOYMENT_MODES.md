# Deployment modes

Status: Phase 4 (content & launch readiness), 2026-09-30. Nothing is deployed yet.
Code: `src/lib/site.ts` (mode, URL, indexing, policy), `src/lib/content/publication.ts`
(content visibility), `src/lib/launch/gate.ts` (build-time launch gate), `src/lib/seo.ts`,
`src/app/robots.ts`, `src/app/sitemap.ts`, `next.config.ts` (X-Robots-Tag). Variables:
`.env.example`.

## 1. The three modes

| | Internal development | Staging / public preview | Production |
|---|---|---|---|
| `LW_SITE_MODE` | `development` (default for `next dev`) | `staging` (default for any production build) | `production` (explicit only) |
| Placeholders (`[CASE DATA]`, `[NỘI DUNG]`, image labels) | Shown | Hidden: section removed, or neutral state (see §3) | Build fails if any would render |
| Draft copy (`reviewStatus: "draft"`) | Shown | Only with `LW_ALLOW_DRAFT=1`; otherwise the build fails | Build fails |
| Legal text awaiting approval | `[NỘI DUNG PHÁP LÝ CẦN DUYỆT]` | Neutral note "Văn bản đang chờ LEANWARES phê duyệt."; draft legal text only with `LW_ALLOW_DRAFT=1`, marked "Bản nháp" | Build fails unless approved |
| Internal previews `/foundation/*` | Yes (`next dev`), or `LW_INTERNAL_PREVIEW=1` | Only with `LW_INTERNAL_PREVIEW=1` (internal review deployments) | Never (404) |
| Indexing | noindex | noindex, nofollow (always) | noindex until `LW_ALLOW_INDEXING=1` (explicit approval) |
| robots.txt | `Disallow: /` | `Disallow: /` | `Disallow: /` until approval; then `Allow: /`, `Disallow: /foundation/`, sitemap line |
| Launch gate | Off | Staging blockers fail the build | Every open item fails the build |
| `LW_SITE_URL` | Optional (localhost) | Required | Required |
| Forms | Validate; "not connected" notice | Same | Build fails until a backend is configured |
| Analytics / tracking | None | None | None (not approved) |

Indexing is controlled three ways at once: `<meta name="robots">`, `robots.txt` and the
`X-Robots-Tag` response header. Staging can never be indexed, whatever the other variables say.

## 2. Content-visibility policy (single rule)

`src/lib/content/publication.ts` is the only place that decides what unfinished content
does. Components never check the mode. Getters (`src/lib/content/index.ts`) apply the rule to
each page's view model:

| State | Development | Staging | Production |
|---|---|---|---|
| approved | show | show | show |
| draft | show | show only with `LW_ALLOW_DRAFT=1` | not allowed (gate) |
| placeholder | show | hide the section, or a neutral state if hiding would break the page | not allowed (gate) |
| fixture | `/foundation/*` only | `/foundation/*` only with `LW_INTERNAL_PREVIEW=1` | never |

Record-level rules stay as before: projects are public only when verified + published
(`lib/content/projects.ts`); knowledge records only when published + approved with slug,
title, summary and date (`lib/content/knowledge.ts`). Unpublished records have no route,
no metadata and no sitemap entry in every mode.

## 3. What staging hides or neutralises today

| Route | Staging treatment |
|---|---|
| `/` | Featured project (all `[CASE DATA]`) and "Góc nhìn & Tài liệu" teaser (placeholder articles) hidden; GHG diagram keeps labels, value row hidden |
| `/giai-phap` | "Dịch vụ theo trụ cột" (unverified services) and project teaser hidden; cross-cutting "[NỘI DUNG] Danh mục dịch vụ" line hidden; GHG value row hidden |
| `/giai-phap/giam-phat-thai` | Case study hidden; per-group "[NỘI DUNG] Phạm vi …" line hidden; prioritisation note keeps its sentence without "[CASE DATA]" |
| `/nganh` | Insight rows without content (Điểm nóng phát thải; Áp lực thị trường except Thép) hidden; project teaser hidden |
| `/du-an` | Placeholder rows and featured card replaced by: "Chưa có dự án được công bố. Dự án sẽ được công bố khi dữ liệu được LEANWARES xác minh." |
| `/kien-thuc` | Placeholder rows and the unpublished CBAM row replaced by: "Chưa có bài viết hoặc tài liệu được phát hành." |
| `/ve-leanwares` | "LEANWARES là ai" hidden; approach / capability items keep titles, placeholder descriptions hidden |
| `/lien-he` | Consent label: "Nội dung đồng ý xử lý dữ liệu đang chờ LEANWARES phê duyệt." + privacy link |
| Legal pages | Neutral "pending approval" note; no date line |
| All | Image slots without an approved photo render as neutral striped slots (no bracketed label) |

## 4. Building each mode

PowerShell uses `$env:NAME = "value"`; bash uses `NAME=value` before the command.

```bash
# Internal development (local)
npm run dev

# Internal review build with fixture previews (never public)
LW_SITE_MODE=development LW_INTERNAL_PREVIEW=1 npm run build && npm run start

# Staging / public preview (current content: drafts allowed, noindex)
LW_SITE_MODE=staging LW_SITE_URL=https://<staging-host> LW_ALLOW_DRAFT=1 npm run build

# Production (fails today: see docs/LAUNCH_READINESS.md)
LW_SITE_MODE=production LW_SITE_URL=https://<production-host> npm run build
# … and only after explicit approval to index:
LW_SITE_MODE=production LW_SITE_URL=https://<production-host> LW_ALLOW_INDEXING=1 npm run build
```

A plain `npm run build` runs in staging mode and therefore fails until `LW_SITE_URL` is
set, drafts are allowed or approved, and the logo is supplied. This is intentional: an
unconfigured build can never publish placeholders or be indexed.

## 5. Launch gate

`assertLaunchGate()` runs in the root layout during prerendering and reads the same view
models the pages render. Items are tagged:

- **staging**: visible placeholder text; draft copy or draft meta descriptions without
  `LW_ALLOW_DRAFT=1`; missing `LW_SITE_URL`; missing logo (unless `LW_ALLOW_LOGO_FALLBACK=1`
  for an internal review build).
- **production**: all of the above, plus image slots without approved photos, favicon, social
  image, verified contact details, approved legal documents and consent text, and a configured
  form backend.

The build error lists every open item. The current list is in `docs/LAUNCH_READINESS.md` §3–4.

## 6. Forms

`src/lib/forms/submit.ts` is the only exit point: `submitContactForm(payload, config)` and
`submitDownloadRequest(payload, config)` return `{ ok: true }` or `{ ok: false, reason }`.
With no endpoint configured the result is `unconfigured`: no request is sent and the form says
"Biểu mẫu chưa được kết nối với hệ thống nhận thông tin. Thông tin của bạn chưa được gửi đi."
A success state appears only for `{ ok: true }` (a 2xx response). Endpoints come from
`LW_CONTACT_FORM_ENDPOINT` / `LW_DOWNLOAD_FORM_ENDPOINT` and must be same-origin paths, so a
third-party service cannot be connected by configuration alone.

## 7. Staging on Vercel (Phase 5)

Project fit: stock Next.js 16 App Router, npm + `package-lock.json`, Node ≥ 20.9, no native
modules, database, server secrets or runtime services; all public pages are static; image
optimisation uses the Vercel next/image service. Build command `next build` (default), output
`.next` (default), install `npm install` (default). `.vercelignore` keeps `design/`, `docs/` and
env files out of the upload. `public/brand/leanwares-logo.jpg` is served from `public/`.

Staging environment variables (Vercel project → Settings → Environment Variables):

| Variable | Value |
|---|---|
| `LW_SITE_MODE` | `staging` |
| `LW_SITE_URL` | the staging origin, e.g. `https://<project>.vercel.app` (no trailing slash) |
| `LW_ALLOW_DRAFT` | `1` |
| `LW_ALLOW_INDEXING` | `0` (ignored in staging anyway) |
| `LW_INTERNAL_PREVIEW` | `0` |
| `LW_ALLOW_LOGO_FALLBACK` | not set (the approved logo is present) |
| `LW_CONTACT_FORM_ENDPOINT`, `LW_DOWNLOAD_FORM_ENDPOINT` | not set |

Terminology: a dedicated Vercel project for staging (e.g. `leanwares-staging`) gives a stable
`<project>.vercel.app` domain through what Vercel calls a "production deployment" of that
project. That is Vercel terminology only: the site still builds with `LW_SITE_MODE=staging`, so
it is noindex, placeholder-free and gate-checked as staging. The LEANWARES production domain
is not connected in this phase.

`LW_SITE_URL` drives canonical URLs, Open Graph URLs and `sitemap.xml`. On staging these point
at the staging host and are not permanent canonicals (staging is noindex, so they are never
indexed). For production (Phase 6) `LW_SITE_URL` becomes the approved production origin in a
separate production environment or project, together with `LW_SITE_MODE=production`; the build
then enforces every production blocker. Changing the value requires a rebuild (metadata is
static).
