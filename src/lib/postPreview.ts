/** Plain text from HTML for previews and meta descriptions. */
export function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Preview blurb from blog body (preferred) with optional manual excerpt fallback. */
export function postPreviewText(
  contentHtml?: string | null,
  excerpt?: string | null,
  maxLength = 220,
): string {
  const fromContent = contentHtml ? stripHtml(contentHtml) : "";
  const text = fromContent || excerpt?.trim() || "";
  if (!text) return "";
  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.trimEnd()}…`;
}
