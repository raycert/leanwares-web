import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink/SkipLink";
import { getSiteChrome } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { assertLaunchGate } from "@/lib/launch/gate";
import { rootMetadata } from "@/lib/seo";
import "@/styles/globals.css";

// Site-default metadata (lib/seo.ts): metadataBase, title template, robots by mode, OG.
export const metadata: Metadata = rootMetadata();

const MAIN_ID = "noi-dung";

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Staging / production builds fail here while their launch blockers are open.
  await assertLaunchGate();
  const chrome = await getSiteChrome();

  return (
    <html lang="vi" className={fontVariables}>
      <body>
        <SkipLink targetId={MAIN_ID} label={chrome.skipLinkLabel} />
        <SiteHeader chrome={chrome} />
        <main id={MAIN_ID} tabIndex={-1}>
          {children}
        </main>
        <SiteFooter footer={chrome.footer} homeLabel={chrome.homeLabel} />
      </body>
    </html>
  );
}
