import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { TelegramIcon } from "@/components/site/TelegramIcon";
import { useContent } from "@/hooks/useContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { DEFAULT_WHATSAPP_NUMBER, resolveWhatsAppNumber, telegramHref, whatsAppHref } from "@/lib/chatLinks";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}

export function StickyContactPill() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { c } = useContent("global");
  const settings = useSiteSettings();
  const waNumber = resolveWhatsAppNumber(c("whatsapp_number", DEFAULT_WHATSAPP_NUMBER));
  const waHref = whatsAppHref(waNumber, "Hi BoxCharge, I'd like to talk about payments.");
  const tgHref = telegramHref(settings?.social_telegram);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {path !== "/contact" && (
        <Link
          to="/contact"
          aria-label="Talk to a BoxCharge payment expert"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-electric-glow px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.68_0.18_250/0.7)] transition-all hover:scale-105 sm:px-5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Talk to an Expert</span>
          <span className="sm:hidden">Talk</span>
        </Link>
      )}

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_#25D366] transition-all hover:scale-105 hover:bg-[#1ebe5d] sm:px-5"
      >
        <WhatsAppIcon />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      <a
        href={tgHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on Telegram @Go2Hub"
        className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_#229ED9] transition-all hover:scale-105 hover:bg-[#1b8ec4] sm:px-5"
      >
        <TelegramIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Telegram</span>
      </a>
    </div>
  );
}
