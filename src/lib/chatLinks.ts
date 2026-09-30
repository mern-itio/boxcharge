/** Public chat destinations. CMS / site settings override these when set. */
export const DEFAULT_WHATSAPP_NUMBER = "447700183599";
export const DEFAULT_TELEGRAM_URL = "https://t.me/Go2Hub";

const LEGACY_WHATSAPP_PLACEHOLDER = "447700900123";

export function resolveWhatsAppNumber(stored?: string | null) {
  const digits = (stored ?? "").replace(/\D/g, "");
  if (!digits || digits === LEGACY_WHATSAPP_PLACEHOLDER) return DEFAULT_WHATSAPP_NUMBER;
  return digits;
}

export function whatsAppHref(number: string, text?: string) {
  const digits = resolveWhatsAppNumber(number);
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Accept a full t.me URL or a @handle. */
export function telegramHref(urlOrHandle?: string | null) {
  const raw = urlOrHandle?.trim();
  if (!raw) return DEFAULT_TELEGRAM_URL;
  if (/^https?:\/\//i.test(raw)) return raw;
  const handle = raw.replace(/^@/, "");
  return `https://t.me/${handle}`;
}
