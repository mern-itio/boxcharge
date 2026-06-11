/** URL-safe slug from plain text (titles, names). */
export function slugify(text: string): string {
  const s = text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
  return s || "untitled";
}

export function isDefaultDraftTitle(title: string): boolean {
  return /^untitled\s*(page|post)?$/i.test(title.trim());
}

/** True when slug still matches the auto-generated value for this title. */
export function slugMatchesTitle(title: string, slug: string): boolean {
  return slugify(title) === slug.trim();
}
