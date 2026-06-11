import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: Array<{ name: string; path: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
      {items.map((b, i) => {
        const last = i === items.length - 1;
        return (
          <span key={b.path} className="flex items-center gap-1.5">
            {last ? (
              <span className="text-foreground/80">{b.name}</span>
            ) : (
              <Link to={b.path} className="transition-colors hover:text-foreground">
                {b.name}
              </Link>
            )}
            {!last && <ChevronRight className="h-3 w-3 opacity-50" />}
          </span>
        );
      })}
    </nav>
  );
}
