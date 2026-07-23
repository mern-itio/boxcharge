import { getPageContent } from "@/lib/cms.functions";

export type PageSeo = {
  title: string;
  description: string;
  keywords?: string[];
};

/** Resolve SEO title/description from CMS content_blocks, falling back to code defaults. */
export async function resolvePageSeo(slug: string, defaults: PageSeo): Promise<PageSeo> {
  try {
    const map = (await getPageContent({ data: { slug } })) as Record<string, unknown>;
    const title = String(map.meta_title || "").trim() || defaults.title;
    const description = String(map.meta_description || "").trim() || defaults.description;
    return { title, description, keywords: defaults.keywords };
  } catch {
    return defaults;
  }
}

/** Safe head() helper when loaderData may be undefined during SSR edge cases. */
export function seoFromLoader(loaderData: PageSeo | undefined, defaults: PageSeo): PageSeo {
  return {
    title: loaderData?.title || defaults.title,
    description: loaderData?.description || defaults.description,
    keywords: loaderData?.keywords ?? defaults.keywords,
  };
}
