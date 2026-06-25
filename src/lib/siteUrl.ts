const DEFAULT_SITE_URL = "https://boxchrge.com";

/** Canonical public site origin (no trailing slash). */
export function resolveSiteUrl(preferred?: string | null): string {
  const fromEnv =
    typeof process !== "undefined"
      ? process.env.SITE_URL || process.env.VITE_SITE_URL || process.env.PUBLIC_SITE_URL
      : undefined;

  const raw = (preferred || fromEnv || DEFAULT_SITE_URL).trim();
  if (!raw) return DEFAULT_SITE_URL;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

export function absoluteUrl(path: string, siteUrl?: string | null): string {
  const base = resolveSiteUrl(siteUrl);
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
