import type { KnowledgeListingContent } from "@/lib/content/types";
import { IndexList } from "../../industries/IndexList/IndexList";
import { SplitSection } from "../../SplitSection/SplitSection";

export type StandardsReferenceProps = KnowledgeListingContent["standards"] & { className?: string };

/**
 * "Tiêu chuẩn & Framework" reference list on /kien-thuc (LWStandards resource variant, 4 / 8).
 * Reference knowledge only: codes and definitions, no service or certification claims.
 * Target of the footer link /kien-thuc#tieu-chuan-framework.
 */
export function StandardsReference({ id, title, note, items, className }: StandardsReferenceProps) {
  return (
    <SplitSection id={id} title={title} note={note} className={className}>
      <IndexList
        variant="codes"
        items={items.map((item) => ({ marker: item.code, title: item.label, description: item.description }))}
      />
    </SplitSection>
  );
}
