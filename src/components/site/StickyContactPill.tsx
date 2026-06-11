import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

export function StickyContactPill() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path === "/contact") return null;

  return (
    <Link
      to="/contact"
      aria-label="Talk to a BoxCharge payment expert"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-electric-glow px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.68_0.18_250/0.7)] transition-all hover:scale-105 sm:px-5"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      <MessageCircle className="h-4 w-4" />
      <span className="hidden sm:inline">Talk to an Expert</span>
      <span className="sm:hidden">Talk</span>
    </Link>
  );
}
