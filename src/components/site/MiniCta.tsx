import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function MiniCta({ text, cta = "Talk to a Payment Specialist" }: { text: string; cta?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="glass gradient-border flex flex-col items-start justify-between gap-3 rounded-2xl px-5 py-4 sm:flex-row sm:items-center">
        <div className="text-sm text-foreground/85">{text}</div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-electric-glow px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {cta} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
