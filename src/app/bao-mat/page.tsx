import type { Metadata } from "next";
import { LegalView } from "@/components/sections/legal/LegalView/LegalView";
import { getLegalPage } from "@/lib/content";
import { routes } from "@/lib/routes";
import { staticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = staticPageMetadata(routes.privacy);

/* Legal page (template 5p). Text awaits legal review: the page shows the placeholder only. */
export default async function PrivacyPage() {
  const content = await getLegalPage("privacy");
  return <LegalView {...content} />;
}
