import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot/ImageSlot";
import type { PillarContent, SolutionPillarsContent } from "@/lib/content/types";
import { cx } from "@/lib/cx";
import styles from "./SolutionPillars.module.css";

/**
 * The three solution pillars (FD v3). Pillar 2 is the navy block. Scope topics are shown on
 * desktop only; FD v3 shortens or folds the leads on tablet and mobile.
 */
export function SolutionPillars({ eyebrow, title, factory, product, supplyChain }: SolutionPillarsContent) {
  return (
    <section className={styles.section} aria-labelledby="pillars-title">
      <Container className={styles.head}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="pillars-title" className="t-h2">
          {title}
        </h2>
      </Container>

      {/* 01 Nhà máy xanh */}
      <Container className={styles.factory}>
        <ImageSlot
          image={factory.image.image}
          placeholder={factory.image.placeholder}
          ratio="3:2"
          sizes="(min-width: 768px) 55vw, 100vw"
        />
        <PillarText pillar={factory} rule="blue" />
      </Container>

      {/* 02 Sản phẩm xanh (navy) */}
      <div id={product.id} className={cx("surface-inverse", styles.product)}>
        <Container className={styles.productInner}>
          <PillarText pillar={product} />
          <ol role="list" className={styles.lifecycle} aria-label={product.lifecycleLabel}>
            {product.lifecycle.map((stage, index) => (
              <li key={stage} className={styles.stage}>
                <span className={cx(styles.node, index === 0 && styles.nodeMarker)} aria-hidden="true" />
                <span className={styles.line} aria-hidden="true" />
                <span className={styles.stageLabel}>{stage}</span>
              </li>
            ))}
          </ol>
        </Container>
      </div>

      {/* 03 Chuỗi cung ứng xanh */}
      <Container className={styles.supply}>
        <PillarText pillar={supplyChain} rule="orange" />
        <figure className={styles.tiers} aria-label={supplyChain.tiersLabel}>
          <ul role="list" className={styles.tierList}>
            {supplyChain.tiers.map((tier) => (
              <li key={tier.label} className={styles.tier}>
                <span className={styles.tierLabel}>{tier.label}</span>
                <span className={styles.tierNodes} aria-hidden="true">
                  {Array.from({ length: tier.nodes }, (_, i) => (
                    <span key={i} className={styles.tierNode} />
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <figcaption className="t-data">{supplyChain.diagramNote}</figcaption>
        </figure>
      </Container>
    </section>
  );
}

function PillarText({ pillar, rule }: { pillar: PillarContent; rule?: "blue" | "orange" }) {
  const tablet = pillar.tabletLead ?? pillar.lead;
  const mobile = pillar.mobileLead ?? tablet;
  const leads =
    tablet === pillar.lead && mobile === pillar.lead
      ? [{ text: pillar.lead, className: undefined }]
      : [
          { text: pillar.lead, className: styles.onlyDesktop },
          { text: tablet, className: styles.onlyTablet },
          { text: mobile, className: styles.onlyMobile },
        ];

  return (
    <div
      id={rule ? pillar.id : undefined}
      className={cx(styles.text, rule && styles.ruled)}
      style={rule ? ({ "--pillar-rule": `var(--color-${rule === "blue" ? "accent" : "marker"})` } as CSSProperties) : undefined}
    >
      <h3 className="t-h3">{pillar.title}</h3>
      {leads.map((lead) => (
        <p key={lead.className ?? "all"} className={cx("t-body", lead.className)}>
          {lead.text}
        </p>
      ))}
      <ul role="list" className={styles.topics}>
        {pillar.topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </div>
  );
}
