import { absoluteUrl, resolveSiteUrl } from "@/lib/siteUrl";

/** Default social share image (1200×630) served from /public. */
export const DEFAULT_OG_IMAGE_PATH = "/og-boxcharge.jpg";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Resolve a page OG image to an absolute HTTPS URL crawlers can fetch. */
export function resolveOgImageUrl(image?: string | null, siteUrl?: string | null): string {
  const trimmed = image?.trim();
  if (trimmed) {
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return absoluteUrl(path, siteUrl);
  }
  return absoluteUrl(DEFAULT_OG_IMAGE_PATH, siteUrl);
}

export function resolvePageUrl(path: string, siteUrl?: string | null): string {
  return absoluteUrl(path.startsWith("/") ? path : `/${path}`, siteUrl);
}

export function defaultSiteOrigin(): string {
  return resolveSiteUrl();
}
