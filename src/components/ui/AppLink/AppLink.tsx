import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type AppLinkProps = ComponentPropsWithoutRef<typeof Link>;

/**
 * Link primitive. In-page anchors (`#…`) render a native <a> so the browser moves both
 * the scroll position and the sequential-focus starting point to the target (keyboard
 * users continue from the section they jumped to). Everything else uses next/link.
 */
export function AppLink({ href, prefetch, replace, scroll, shallow, locale, ...rest }: AppLinkProps) {
  if (typeof href === "string" && href.startsWith("#")) {
    return <a href={href} {...rest} />;
  }
  return <Link href={href} prefetch={prefetch} replace={replace} scroll={scroll} shallow={shallow} locale={locale} {...rest} />;
}
