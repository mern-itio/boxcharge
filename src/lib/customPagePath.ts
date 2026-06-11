/** Public URL for a custom CMS page (no /p/ prefix). */
export function customPagePath(slug: string): string {
  return `/${slug}`;
}

/** Slugs that cannot be used for custom pages (built-in routes). */
export const RESERVED_PAGE_SLUGS = new Set([
  "admin",
  "auth",
  "about",
  "blog",
  "contact",
  "developers",
  "faq",
  "p",
  "payouts",
  "policies",
  "reset-password",
  "solutions",
  "technology",
  "sitemap.xml",
]);

export function isReservedPageSlug(slug: string): boolean {
  return RESERVED_PAGE_SLUGS.has(slug.toLowerCase());
}
