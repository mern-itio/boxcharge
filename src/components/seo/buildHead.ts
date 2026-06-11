// Centralized SEO + JSON-LD head builder for TanStack Start routes.
// Use as: head: () => buildHead({ title, description, path, ... })

type MetaEntry = Record<string, string>;

export interface PageSeo {
  title: string;
  description: string;
  path: string; // e.g. "/about"
  keywords?: string[];
  ogType?: "website" | "article" | "product";
  image?: string; // absolute or relative
  breadcrumbs?: Array<{ name: string; path: string }>;
  faq?: Array<{ q: string; a: string }>;
  schemas?: Array<Record<string, unknown>>;
  robots?: string; // e.g. "noindex, nofollow"
}

const SITE_NAME = "BoxCharge";
const TITLE_SUFFIX = " | BoxCharge";

export function buildHead(seo: PageSeo) {
  const fullTitle = seo.title.endsWith(SITE_NAME) ? seo.title : seo.title + TITLE_SUFFIX;

  const meta: MetaEntry[] = [
    { title: fullTitle },
    { name: "description", content: seo.description },
    { name: "author", content: SITE_NAME },
    ...(seo.keywords?.length ? [{ name: "keywords", content: seo.keywords.join(", ") }] : []),
    ...(seo.robots ? [{ name: "robots", content: seo.robots }] : []),
    // Open Graph
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: seo.ogType ?? "website" },
    { property: "og:url", content: seo.path },
    ...(seo.image ? [{ property: "og:image", content: seo.image }] : []),
    // Twitter / X
    { name: "twitter:card", content: seo.image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: seo.description },
    ...(seo.image ? [{ name: "twitter:image", content: seo.image }] : []),
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
          item: b.path,
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
    links: [{ rel: "canonical", href: seo.path }],
    scripts: ldScripts,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: "https://boxchrge.com",
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
    url: path,
  };
}
