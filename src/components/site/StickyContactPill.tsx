import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, X } from "lucide-react";
import { TelegramIcon } from "@/components/site/TelegramIcon";
import { useContent } from "@/hooks/useContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { DEFAULT_WHATSAPP_NUMBER, resolveWhatsAppNumber, telegramHref, whatsAppHref } from "@/lib/chatLinks";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}

export function StickyContactPill() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { c } = useContent("global");
  const settings = useSiteSettings();
  const [open, setOpen] = useState(false);
  const waNumber = resolveWhatsAppNumber(c("whatsapp_number", DEFAULT_WHATSAPP_NUMBER));
  const waHref = whatsAppHref(waNumber, "Hi BoxCharge, I'd like to talk about payments.");
  const tgHref = telegramHref(settings?.social_telegram);
  const showExpert = path !== "/contact";

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end sm:right-6 sm:bottom-6">
      {open && (
        <div
          role="dialog"
          aria-label="Chat options"
          className="mb-3 w-[min(18.5rem,calc(100vw-2rem))] origin-bottom-right rounded-3xl border border-white/10 bg-[#07101c]/85 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between px-3 pb-1 pt-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Chat with us</p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">A specialist is online</p>
            </div>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
          </div>

          <div className="mt-1 space-y-1">
            {showExpert && (
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-electric-glow text-primary-foreground shadow-[0_8px_20px_-10px_oklch(0.68_0.18_250/0.9)]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">Talk to an Expert</span>
                  <span className="block text-xs text-muted-foreground">Send a business inquiry</span>
                </span>
              </Link>
            )}

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#25D366] text-white shadow-[0_8px_20px_-10px_#25D366]">
                <WhatsAppIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">WhatsApp</span>
                <span className="block text-xs text-muted-foreground">+44 7700 183599</span>
              </span>
            </a>

            <a
              href={tgHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#229ED9] text-white shadow-[0_8px_20px_-10px_#229ED9]">
                <TelegramIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">Telegram</span>
                <span className="block text-xs text-muted-foreground">@Go2Hub</span>
              </span>
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close chat menu" : "Open chat menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-electric-glow text-primary-foreground shadow-[0_16px_40px_-12px_oklch(0.68_0.18_250/0.85)] transition hover:scale-105"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
        )}
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-6 w-6" />}
      </button>
    </div>
  );
}
