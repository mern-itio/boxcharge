import { useContent } from "@/hooks/useContent";

export function useHomeSections() {
  const { c, raw } = useContent("home");
  const hidden = new Set(
    c<Array<{ id?: string }>>("hidden_sections", [])
      .map((x) => x.id?.trim().toLowerCase())
      .filter(Boolean) as string[],
  );
  return {
    c,
    raw,
    isVisible: (id: string) => !hidden.has(id.toLowerCase()),
    fullHtml: c("content_html", ""),
  };
}

export function sectionHeader(
  c: ReturnType<typeof useContent>["c"],
  prefix: string,
  defaults: { eyebrow?: string; title: string; subtitle?: string },
) {
  const eyebrow = c(`${prefix}_eyebrow`, defaults.eyebrow ?? "");
  const title = c(`${prefix}_title`, defaults.title);
  const subtitle = c(`${prefix}_subtitle`, defaults.subtitle ?? "");
  return {
    eyebrow: eyebrow || defaults.eyebrow,
    title: title || defaults.title,
    subtitle: subtitle || defaults.subtitle,
  };
}

export function cmsList<T extends Record<string, string>>(
  c: ReturnType<typeof useContent>["c"],
  key: string,
): T[] {
  const rows = c<T[]>(key, []);
  return Array.isArray(rows) ? rows.filter((r) => Object.values(r).some(Boolean)) : [];
}
