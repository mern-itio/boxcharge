// Centralized SEO + JSON-LD head builder for TanStack Start routes.
// Use as: head: () => buildHead({ title, description, path, ... })

import {
  DEFAULT_OG_IMAGE_PATH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  resolveOgImageUrl,
  resolvePageUrl,
} from "@/lib/ogImage";

type MetaEntry = Record<string, string>;

export interface PageSeo {
  title: string;
  description: string;
  path: string; // e.g. "/about"
  keywords?: string[];
  ogType?: "website" | "article" | "product";
  /** Absolute or site-relative image URL. Falls back to /og-boxcharge.jpg. */
  image?: string | null;
  imageAlt?: string;
  /** Override canonical origin (defaults to https://boxchrge.com / env). */
  siteUrl?: string | null;
  breadcrumbs?: Array<{ name: string; path: string }>;
  faq?: Array<{ q: string; a: string }>;
  schemas?: Array<Record<string, unknown>>;
  robots?: string; // e.g. "noindex, nofollow"
  /** Optional crawlable pagination link relations */
  prevPath?: string | null;
  nextPath?: string | null;
}

const SITE_NAME = "BoxCharge";
const TITLE_SUFFIX = " | BoxCharge";

export function buildHead(seo: PageSeo) {
  // Only append the brand suffix when the title doesn't already mention BoxCharge
  // anywhere (case-insensitive). Prevents "... | BoxCharge" duplication on titles
  // like "BoxCharge — Global Merchant Services".
  const title = seo.title.trim();
  const fullTitle = /boxcharge/i.test(title) ? title : title + TITLE_SUFFIX;
  const pageUrl = resolvePageUrl(seo.path, seo.siteUrl);
  const imageUrl = resolveOgImageUrl(seo.image, seo.siteUrl);
  const imageAlt = seo.imageAlt?.trim() || fullTitle;
  const isDefaultImage = !seo.image?.trim() || seo.image.trim() === DEFAULT_OG_IMAGE_PATH;

  const meta: MetaEntry[] = [
    { title: fullTitle },
    { name: "description", content: seo.description },
    { name: "author", content: SITE_NAME },
    ...(seo.keywords?.length ? [{ name: "keywords", content: seo.keywords.join(", ") }] : []),
    ...(seo.robots ? [{ name: "robots", content: seo.robots }] : []),
    // Open Graph
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: seo.ogType ?? "website" },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
    { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
    { property: "og:image:alt", content: imageAlt },
    ...(isDefaultImage ? [] : [{ property: "og:image:type", content: guessImageMime(imageUrl) }]),
    // Twitter / X
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@BoxCharge" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ];

  // JSON-LD
  const ldScripts: Array<{ type: string; children: string }> = [];

  if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
    ldScripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: seo.breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: resolvePageUrl(b.path, seo.siteUrl),
        })),
      }),
    });
  }

  if (seo.faq && seo.faq.length > 0) {
    ldScripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seo.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    });
  }

  if (seo.schemas) {
    for (const s of seo.schemas) {
      ldScripts.push({ type: "application/ld+json", children: JSON.stringify(s) });
    }
  }

  return {
    meta,
    links: [
      { rel: "canonical", href: pageUrl },
      ...(seo.prevPath
        ? [{ rel: "prev", href: resolvePageUrl(seo.prevPath, seo.siteUrl) }]
        : []),
      ...(seo.nextPath
        ? [{ rel: "next", href: resolvePageUrl(seo.nextPath, seo.siteUrl) }]
        : []),
    ],
    scripts: ldScripts,
  };
}

function guessImageMime(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes(".png")) return "image/png";
  if (lower.includes(".webp")) return "image/webp";
  if (lower.includes(".gif")) return "image/gif";
  return "image/jpeg";
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: "https://boxchrge.com",
    logo: "https://boxchrge.com/favicon-192.png",
    description:
      "BoxCharge provides global merchant services, cross-border payment gateway connectivity, payment orchestration, APM access, and secure payment infrastructure.",
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Organization", name: SITE_NAME, url: "https://boxchrge.com" },
    areaServed: "Worldwide",
    url: resolvePageUrl(path),
  };
}
