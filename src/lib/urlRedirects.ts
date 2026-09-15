export type RedirectStatusCode = 301 | 302 | 307 | 308;

export type UrlRedirectRecord = {
  id: string;
  from_path: string;
  to_url: string;
  status_code: RedirectStatusCode;
  enabled: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
};

const RESERVED_PREFIXES = ["/admin", "/auth", "/_server", "/_build", "/assets"];

/** Strip origin / query / hash and normalize to a leading-slash path (no trailing slash except `/`). */
export function normalizeFromPath(input: string): string {
  const raw = input.trim();
  if (!raw) throw new Error("Old URL / path is required.");

  let pathname = raw;
  try {
    if (/^https?:\/\//i.test(raw)) {
      pathname = new URL(raw).pathname;
    } else if (raw.includes("?") || raw.includes("#")) {
      const withoutHash = raw.split("#")[0] ?? raw;
      pathname = withoutHash.split("?")[0] ?? withoutHash;
    }
  } catch {
    throw new Error("Old URL is not valid. Use a path like /old-page/ or a full https:// URL.");
  }

  pathname = pathname.trim();
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  pathname = pathname.replace(/\/{2,}/g, "/");
  if (pathname.length > 1) pathname = pathname.replace(/\/+$/, "");

  if (pathname.length > 500) throw new Error("Old path is too long.");
  if (isReservedRedirectPath(pathname)) {
    throw new Error(`Cannot redirect from reserved path "${pathname}".`);
  }
  return pathname;
}

/** Accept absolute https URLs or site-relative paths. */
export function normalizeToUrl(input: string): string {
  const raw = input.trim();
  if (!raw) throw new Error("Destination URL is required.");

  if (/^https?:\/\//i.test(raw)) {
    let url: URL;
    try {
      url = new URL(raw);
    } catch {
      throw new Error("Destination URL is not a valid absolute URL.");
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("Destination must be an http(s) URL or a site path.");
    }
    return url.toString();
  }

  let path = raw.split("#")[0]?.split("?")[0] ?? raw;
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1) path = path.replace(/\/+$/, "") || "/";
  if (path.length > 500) throw new Error("Destination path is too long.");
  return path;
}

export function isReservedRedirectPath(pathname: string): boolean {
  const p = pathname.toLowerCase();
  return RESERVED_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
}

const STATIC_EXT =
  /\.(?:js|css|map|mjs|cjs|json|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot|mp4|webm|txt|xml|pdf)$/i;

/** Paths that should never run redirect lookup (assets, admin, RPC). */
export function shouldSkipRedirectLookup(pathname: string, method: string): boolean {
  const m = method.toUpperCase();
  if (m !== "GET" && m !== "HEAD") return true;
  if (STATIC_EXT.test(pathname)) return true;
  return isReservedRedirectPath(pathname) || pathname.startsWith("/__");
}

export function redirectLookupCandidates(pathname: string): string[] {
  let path = pathname || "/";
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;
  const withSlash = trimmed === "/" ? "/" : `${trimmed}/`;
  return trimmed === withSlash ? [trimmed] : [trimmed, withSlash];
}

export function resolveRedirectLocation(toUrl: string, requestOrigin: string): string {
  if (/^https?:\/\//i.test(toUrl)) return toUrl;
  const origin = requestOrigin.replace(/\/+$/, "");
  const path = toUrl.startsWith("/") ? toUrl : `/${toUrl}`;
  return `${origin}${path}`;
}

function pathOnly(pathname: string): string {
  let path = pathname.trim() || "/";
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path;
}

export function assertNoSelfRedirect(fromPath: string, toUrl: string, siteOrigin?: string | null) {
  const from = pathOnly(fromPath);
  if (/^https?:\/\//i.test(toUrl)) {
    try {
      const dest = new URL(toUrl);
      const destPath = pathOnly(dest.pathname);
      if (siteOrigin) {
        const origin = new URL(siteOrigin).origin;
        if (dest.origin === origin && destPath === from) {
          throw new Error("Destination cannot be the same as the old path.");
        }
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes("Destination cannot")) throw e;
    }
    return;
  }
  if (pathOnly(toUrl) === from) {
    throw new Error("Destination cannot be the same as the old path.");
  }
}

type CacheEntry = {
  expiresAt: number;
  map: Map<string, { to_url: string; status_code: number }>;
};

let cache: CacheEntry | null = null;
const CACHE_TTL_MS = 30_000;

export function invalidateUrlRedirectCache() {
  cache = null;
}

export async function lookupEnabledRedirect(
  pathname: string,
): Promise<{ to_url: string; status_code: number } | null> {
  const candidates = redirectLookupCandidates(pathname);
  const now = Date.now();

  if (!cache || cache.expiresAt <= now) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("url_redirects")
      .select("from_path,to_url,status_code")
      .eq("enabled", true);

    if (error) {
      console.error("[url-redirects] lookup failed:", error.message);
      return null;
    }

    const map = new Map<string, { to_url: string; status_code: number }>();
    for (const row of data ?? []) {
      map.set(row.from_path, {
        to_url: row.to_url,
        status_code: row.status_code,
      });
    }
    cache = { map, expiresAt: now + CACHE_TTL_MS };
  }

  for (const key of candidates) {
    const hit = cache.map.get(key);
    if (hit) return hit;
  }
  return null;
}
