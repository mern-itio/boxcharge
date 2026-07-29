import { getPageContent } from "@/lib/cms.functions";

export type PageSeo = {
  title: string;
  description: string;
  keywords?: string[];
  /** Absolute or site-relative OG/Twitter image URL. */
  image?: string | null;
  imageAlt?: string;
};

/** Resolve SEO title/description/OG image from CMS content_blocks, falling back to code defaults. */
export async function resolvePageSeo(slug: string, defaults: PageSeo): Promise<PageSeo> {
  try {
    const map = (await getPageContent({ data: { slug } })) as Record<string, unknown>;
    const title = String(map.meta_title || "").trim() || defaults.title;
    const description = String(map.meta_description || "").trim() || defaults.description;
    const image = String(map.og_image || "").trim() || defaults.image || null;
    return {
      title,
      description,
      keywords: defaults.keywords,
      image,
      imageAlt: defaults.imageAlt || title,
    };
  } catch {
    return {
      ...defaults,
      image: defaults.image ?? null,
      imageAlt: defaults.imageAlt || defaults.title,
    };
  }
}

/** Safe head() helper when loaderData may be undefined during SSR edge cases. */
export function seoFromLoader(loaderData: PageSeo | undefined, defaults: PageSeo): PageSeo {
  const title = loaderData?.title || defaults.title;
  return {
    title,
    description: loaderData?.description || defaults.description,
    keywords: loaderData?.keywords ?? defaults.keywords,
    image: loaderData?.image || defaults.image || null,
    imageAlt: loaderData?.imageAlt || defaults.imageAlt || title,
  };
}

/** Spread into buildHead() so every page gets OG/Twitter image parity with blog posts. */
export function seoHeadFields(seo: PageSeo) {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    image: seo.image,
    imageAlt: seo.imageAlt || seo.title,
  };
}
