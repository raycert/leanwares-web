import type { Metadata } from "next";
import { ContactView } from "@/components/sections/contact/ContactView/ContactView";
import { getContactPage } from "@/lib/content";
import { routes } from "@/lib/routes";
import { staticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = staticPageMetadata(routes.contact);

/*
 * /lien-he: Contact / assessment (template 5j). No form backend is configured, so the form
 * validates but reports that nothing was sent (lib/forms/config.ts).
 */
export default async function ContactPage() {
  const content = await getContactPage();
  return <ContactView {...content} />;
}
