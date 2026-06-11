import { createFileRoute, Link } from "@tanstack/react-router";
import { PAGES } from "@/content/pages";
import { Search } from "lucide-react";

export const Route = createFileRoute("/admin/seo")({
  component: SeoManager,
});

function SeoManager() {
  const pagesWithSeo = PAGES.filter((p) => p.blocks.some((b) => b.key.startsWith("meta_")));
  return (
    <div>
      <h1 className="text-2xl font-semibold">SEO Manager</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Per-page SEO title and description. Each page links to its editor — search the form for "SEO title" and "SEO description".
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {pagesWithSeo.map((p) => (
          <Link
            key={p.slug}
            to="/admin/pages/$"
            params={{ _splat: p.slug }}
            className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card/30 p-4 transition-colors hover:bg-card/60"
          >
            <Search className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">{p.label}</div>
              <div className="text-xs text-muted-foreground">/{p.slug === "home" ? "" : p.slug}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
