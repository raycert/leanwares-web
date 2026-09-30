import type { Metadata } from "next";
import { pageSeo, siteSeo, type StaticRoute } from "@/content/seo";
import { brandAssets } from "./brand";
import { getSiteUrl, isIndexable } from "./site";

/*
 * Metadata hierarchy:
 *   rootMetadata()        site default (root layout): metadataBase, title template, robots,
 *                         default Open Graph, icons.
 *   staticPageMetadata()  page override from content/seo.ts.
 *   detailMetadata()      detail pages: title / description derived from the record.
 * Every page gets a canonical path, Open Graph title / description / URL and, once an
 * approved image exists (lib/brand.ts brandAssets.socialImage), an Open Graph image.
 */

const ogImages = () => {
  const image = brandAssets.socialImage;
  return image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined;
};

/** Search engines: noindex, nofollow unless production indexing is explicitly approved. */
export function robotsDirective(): Metadata["robots"] {
  return isIndexable() ? { index: true, follow: true } : { index: false, follow: false, nocache: true };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: siteSeo.defaultTitle, template: siteSeo.titleTemplate },
    description: siteSeo.defaultDescription,
    applicationName: siteSeo.siteName,
    robots: robotsDirective(),
    icons: {
      icon: brandAssets.favicon ?? undefined,
      apple: brandAssets.appleIcon ?? undefined,
    },
    openGraph: {
      type: "website",
      locale: siteSeo.locale,
      siteName: siteSeo.siteName,
      title: siteSeo.defaultTitle,
      description: siteSeo.defaultDescription,
      url: "/",
      images: ogImages(),
    },
    twitter: { card: brandAssets.socialImage ? "summary_large_image" : "summary" },
  };
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** true → `title` is the full title (homepage); otherwise the site template applies. */
  absoluteTitle?: boolean;
}

export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : siteSeo.titleTemplate.replace("%s", title);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteSeo.locale,
      siteName: siteSeo.siteName,
      title: fullTitle,
      description,
      url: path,
      images: ogImages(),
    },
    twitter: { card: brandAssets.socialImage ? "summary_large_image" : "summary", title: fullTitle, description },
  };
}

export function staticPageMetadata(route: StaticRoute): Metadata {
  const entry = pageSeo[route];
  return pageMetadata({ ...entry, path: route, absoluteTitle: route === "/" });
}

/** Detail pages: metadata from the record; description trimmed to ~160 characters. */
export function detailMetadata(title: string, description: string, path: string): Metadata {
  const clean = description.replace(/\s+/g, " ").trim();
  const short = clean.length > 160 ? `${clean.slice(0, 157).replace(/\s+\S*$/, "")}…` : clean;
  return pageMetadata({ title, description: short, path });
}
