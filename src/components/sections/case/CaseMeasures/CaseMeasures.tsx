import type { CaseStudyContent } from "@/lib/content/types";
import styles from "./CaseMeasures.module.css";

/** Interventions actually implemented (template 5f "03 → Giải pháp" rows). */
export function CaseMeasures({ measures }: { measures: CaseStudyContent["sections"]["solution"]["measures"] }) {
  return (
    <ol role="list" className={styles.list}>
      {measures.map((measure, index) => (
        <li key={`${measure.title}-${index}`} className={styles.row}>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <span className="t-title-s">{measure.title}</span>
          <span className={styles.note}>{measure.note}</span>
        </li>
      ))}
    </ol>
  );
}
