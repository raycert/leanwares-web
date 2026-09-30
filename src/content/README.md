# content

Structured content for V1 (TypeScript / JSON / MDX). No CMS yet.

Rules:
- Content only; no JSX, no styling.
- Accessed through typed getters in `src/lib/content` (added in Phase 2). Presentation
  components receive content through props, so a CMS can replace this folder later
  without touching components.
- Unverified values stay as visible placeholders: `[CASE DATA]`, `[NỘI DUNG]`, `[ẢNH THẬT]`.
  Never invent project data, savings, customer names, dates or certifications.
