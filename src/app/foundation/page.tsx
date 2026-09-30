import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Button, Container, Eyebrow, Grid, type GridSplit, TextLink } from "@/components/ui";
import { isInternalPreviewEnabled } from "@/lib/preview";
import styles from "./page.module.css";

/*
 * Internal reference page for the Foundation (Phase 1): tokens and primitives, rendered
 * with real CSS so they can be checked against Design System V3 Final. Internal only: 404 unless
 * internal preview is enabled (lib/site.ts). Sample strings are taken from the DS V3 board.
 */

// Internal route: no metadata at all unless internal preview is enabled (the 404 carries none).
export async function generateMetadata(): Promise<Metadata> {
  return isInternalPreviewEnabled() ? {
  title: "Foundation",
} : {};
}

const colorGroups: Array<{ title: string; tokens: string[] }> = [
  {
    title: "Surfaces",
    tokens: [
      "--color-surface",
      "--color-surface-subtle",
      "--color-surface-inverse",
      "--color-surface-accent",
      "--color-surface-disabled",
      "--color-surface-placeholder",
    ],
  },
  {
    title: "Text (light)",
    tokens: [
      "--color-text-strong",
      "--color-text",
      "--color-text-muted",
      "--color-text-subtle",
      "--color-text-accent",
      "--color-text-link",
    ],
  },
  {
    title: "Text (on navy)",
    tokens: [
      "--color-text-inverse-strong",
      "--color-text-inverse-high",
      "--color-text-inverse",
      "--color-text-inverse-muted",
    ],
  },
  {
    title: "Borders",
    tokens: [
      "--color-border",
      "--color-border-soft",
      "--color-border-strong",
      "--color-border-input",
      "--color-border-disabled",
      "--color-border-inverse",
      "--color-border-inverse-strong",
    ],
  },
  {
    title: "Accent, marker, focus",
    tokens: ["--color-accent", "--color-accent-hover", "--color-marker", "--color-focus"],
  },
];

const typeRoles: Array<{ cls: string; label: string; spec: string; sample: string }> = [
  { cls: "t-display", label: "Display / H1", spec: "Newsreader 500 · 82 / 60 / 46", sample: "Giải pháp chuyển đổi xanh cho sản xuất" },
  { cls: "t-h2", label: "H2", spec: "Newsreader 500 · 56 / 44 / 32", sample: "Từ dữ liệu đến hành động" },
  { cls: "t-h3", label: "H3", spec: "Newsreader 500 · 44 / 36 / 30", sample: "Nhà máy xanh" },
  { cls: "t-quote", label: "Quote", spec: "Newsreader 400 · 30 / 27 / 21", sample: "Sản phẩm phát thải bao nhiêu?" },
  { cls: "t-title-l", label: "Title L", spec: "Public Sans 500 · 28 / 24 / 18", sample: "Thép & kim loại" },
  { cls: "t-title-s", label: "Title S", spec: "Public Sans 600 · 20 / 18 / 17", sample: "Hiệu quả năng lượng" },
  { cls: "t-lead", label: "Lead", spec: "Public Sans 400 · 20 / 18 / 16", sample: "LEANWARES đồng hành cùng doanh nghiệp" },
  { cls: "t-body", label: "Body", spec: "Public Sans 400 · 17 / 16 / 15", sample: "Tối ưu năng lượng, nước, nguyên liệu" },
  { cls: "t-small", label: "Small", spec: "Public Sans 400 · 14", sample: "Mô tả ngắn, chú thích thẻ" },
  { cls: "t-eyebrow", label: "Eyebrow", spec: "Public Sans 600 · 12 / 12 / 11 · .12em", sample: "Khung giảm phát thải GHG" },
  { cls: "t-data", label: "Data", spec: "IBM Plex Mono 400 · 12", sample: "Đường cơ sở (tCO2e): [CASE DATA]" },
];

const vietnameseSample =
  "AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY aăâbcdđeêghiklmnoôơpqrstuưvxy · àáảãạ ằắẳẵặ ầấẩẫậ èéẻẽẹ ềếểễệ ìíỉĩị òóỏõọ ồốổỗộ ờớởỡợ ùúủũụ ừứửữự ỳýỷỹỵ ₫";

const spaceScale = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 144];

const splits: GridSplit[] = ["7-5", "5-7", "4-8", "8-4", "6-6", "3-9"];

const surfaces = [
  { cls: "surface-default", name: "surface-default" },
  { cls: "surface-subtle", name: "surface-subtle" },
  { cls: "surface-inverse", name: "surface-inverse" },
  { cls: "surface-accent", name: "surface-accent" },
];

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Container>
        <div className={styles.sectionHead}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className="t-h3">
            {title}
          </h2>
        </div>
        {children}
      </Container>
    </section>
  );
}

export default function FoundationPage() {
  if (!isInternalPreviewEnabled()) notFound();
  return (
    <div>
      <header className={styles.intro}>
        <Container>
          <Eyebrow>Foundation · Internal reference</Eyebrow>
          <h1 className="t-display">Design tokens & primitives</h1>
          <p className="t-lead">
            Rendered from <code>src/styles/tokens</code> and <code>src/components/ui</code>. Source of truth: Design
            System V3 Final. Resize the window: type and spacing are exact at 390, 1024 and 1440.
          </p>
        </Container>
      </header>

      <Section id="color" eyebrow="01 · Colour" title="Semantic colour tokens">
        <div className={styles.stack}>
          {colorGroups.map((group) => (
            <div key={group.title}>
              <h3 className={`t-title-s ${styles.groupTitle}`}>{group.title}</h3>
              <ul role="list" className={styles.swatches}>
                {group.tokens.map((token) => (
                  <li key={token} className={styles.swatch}>
                    <span className={styles.chip} style={{ background: `var(${token})` }} />
                    <code className="t-data">{token}</code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="type" eyebrow="02 · Typography" title="Type roles">
        <ul role="list" className={styles.typeList}>
          {typeRoles.map((role) => (
            <li key={role.cls} className={styles.typeRow}>
              <div>
                <p className="t-title-s">{role.label}</p>
                <p className="t-data">
                  .{role.cls} · {role.spec}
                </p>
              </div>
              <p className={role.cls}>{role.sample}</p>
            </li>
          ))}
        </ul>
        <div className={styles.glyphs}>
          <Eyebrow tone="muted">Vietnamese glyph check</Eyebrow>
          <p className={styles.glyphSerif}>{vietnameseSample}</p>
          <p className={styles.glyphSans}>{vietnameseSample}</p>
          <p className={styles.glyphMono}>{vietnameseSample}</p>
        </div>
      </Section>

      <Section id="space" eyebrow="03 · Spacing" title="Base-8 scale and layout">
        <ul role="list" className={styles.spaceList}>
          {spaceScale.map((step) => (
            <li key={step} className={styles.spaceRow}>
              <code className="t-data">--space-{step}</code>
              <span className={styles.spaceBar} style={{ width: `var(--space-${step})` }} />
            </li>
          ))}
        </ul>
        <p className="t-small">
          Page margin <code>--page-margin</code> 96 / 56 / 20 · column gap <code>--column-gap</code> 96 / 48 / 0 ·
          section spacing <code>--section-space</code> 128 / 96 / 64 · content width <code>--content-max</code> 1248.
        </p>
      </Section>

      <Section id="grid" eyebrow="04 · Grid" title="Content splits and columns">
        <div className={styles.stack}>
          {splits.map((split) => (
            <Grid key={split} split={split}>
              <div className={styles.cell}>{split.split("-")[0]} / 12</div>
              <div className={styles.cell}>{split.split("-")[1]} / 12</div>
            </Grid>
          ))}
          <Grid columns={4}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={styles.cell}>
                columns=4 · {n}
              </div>
            ))}
          </Grid>
        </div>
      </Section>

      <Section id="controls" eyebrow="05 · Controls" title="Button, TextLink, Eyebrow on every surface">
        <div className={styles.stack}>
          {surfaces.map((surface) => (
            <div key={surface.cls} className={`${surface.cls} ${styles.surfaceDemo}`}>
              <p className="t-data">.{surface.name}</p>
              <div className={styles.row}>
                <Eyebrow>Eyebrow accent</Eyebrow>
                <Eyebrow tone="muted">Eyebrow muted</Eyebrow>
                <Eyebrow tone="strong">Pha 2</Eyebrow>
                <Eyebrow marker="orange">Tài liệu</Eyebrow>
                <Eyebrow marker="blue">Checklist</Eyebrow>
              </div>
              <div className={styles.row}>
                <Button>Khám phá giải pháp</Button>
                <Button variant="secondary">Liên hệ</Button>
                <Button variant="inverse">Đăng ký đánh giá sơ bộ</Button>
                <Button size="lg">Size lg</Button>
                <Button disabled>Disabled</Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
                <Button loading>Đang gửi…</Button>
              </div>
              <div className={styles.row}>
                <TextLink href="/foundation#controls" arrow>
                  Đánh giá cơ hội giảm phát thải
                </TextLink>
                <TextLink href="/foundation#controls" variant="quiet" arrow>
                  Tất cả kiến thức
                </TextLink>
                <p className="t-body">
                  Link trong đoạn văn:{" "}
                  <TextLink href="/foundation#controls" variant="inline">
                    bài phân tích về CBAM
                  </TextLink>
                  .
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="system" eyebrow="06 · Borders, focus, motion" title="Remaining tokens">
        <ul role="list" className={styles.borderList}>
          {["--border-hairline", "--border-rule", "--border-active", "--border-marker", "--border-marker-heavy"].map(
            (token) => (
              <li key={token} className={styles.borderRow}>
                <code className="t-data">{token}</code>
                <span className={styles.borderSample} style={{ borderTop: `var(${token})` }} />
              </li>
            ),
          )}
        </ul>
        <p className="t-small">
          Focus-visible: 2px ring, 3px offset, blue on light surfaces and white on navy / blue. Tab through the controls
          above to check. Motion: 150ms ease-out colour changes, 4px arrow nudge, 200ms image crossfade; all removed
          under <code>prefers-reduced-motion</code>.
        </p>
      </Section>
    </div>
  );
}
