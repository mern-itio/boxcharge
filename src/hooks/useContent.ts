import { useQuery } from "@tanstack/react-query";
import { getPageContent } from "@/lib/cms.functions";

export function pageContentQuery(slug: string) {
  return {
    queryKey: ["cms", "page", slug] as const,
    queryFn: () => getPageContent({ data: { slug } }),
    staleTime: 60_000,
  };
}

/**
 * Reads editable content for a page slug. Returns an accessor that always
 * falls back to the provided default — so the site renders exactly as before
 * until an admin saves an override.
 */
export function useContent(slug: string) {
  const { data } = useQuery(pageContentQuery(slug));
  const map = (data ?? {}) as Record<string, unknown>;

  function get<T = string>(key: string, fallback: T): T {
    const v = map[key];
    if (v === undefined || v === null || v === "") return fallback;
    return v as T;
  }

  return {
    c: <T = string>(key: string, fallback: T) => get<T>(key, fallback),
    raw: map,
  };
}
