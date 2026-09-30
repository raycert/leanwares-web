import type { Metadata } from "next";
import { ApproachColumns } from "@/components/sections/about/ApproachColumns/ApproachColumns";
import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { IndexList } from "@/components/sections/industries/IndexList/IndexList";
import { PageHero } from "@/components/sections/PageHero/PageHero";
import { SplitSection } from "@/components/sections/SplitSection/SplitSection";
import { getAboutPage } from "@/lib/content";
import { routes } from "@/lib/routes";
import { staticPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = staticPageMetadata(routes.about);

/*
 * /ve-leanwares: About (template 5i).
 * Hero (21:9) · LEANWARES là ai · Lĩnh vực tập trung · Ba cách nhìn (approach) ·
 * Năng lực nền · [Hành trình and credentials only when approved / verified] · CTA.
 */
export default async function AboutPage() {
  const content = await getAboutPage();
  const { who, focus, approach, capabilities, timeline, credentials } = content;
  return (
    <>
      <PageHero {...content.hero} titleSize="display-m" imageLayout="wide" />
      {who && (
        <SplitSection id="gioi-thieu" title={who.title}>
          <p className={`t-body ${styles.prose}`}>{who.text}</p>
        </SplitSection>
      )}
      <SplitSection id="linh-vuc" title={focus.title}>
        <IndexList
          items={focus.items.map((item) => ({ marker: item.number, title: item.title, description: item.description, href: item.href }))}
        />
      </SplitSection>
      <ApproachColumns id="cach-tiep-can" {...approach} />
      <SplitSection id="nang-luc" title={capabilities.title}>
        <IndexList items={capabilities.items.map((item) => ({ marker: item.number, title: item.title, description: item.description }))} />
      </SplitSection>
      {timeline && (
        <SplitSection id="hanh-trinh" title={timeline.title}>
          <IndexList items={timeline.steps.map((s) => ({ marker: s.label, title: s.title, description: s.description }))} />
        </SplitSection>
      )}
      {credentials && (
        <SplitSection id="nang-luc-tieu-chuan" title={credentials.title}>
          <IndexList items={credentials.items.map((c, i) => ({ marker: String(i + 1).padStart(2, "0"), title: c }))} />
        </SplitSection>
      )}
      <CtaBand {...content.cta} className={styles.cta} />
    </>
  );
}
