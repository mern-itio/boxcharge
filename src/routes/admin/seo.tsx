import { createFileRoute, Link } from "@tanstack/react-router";
import { getPublicPath, PAGES } from "@/content/pages";
import { AlertTriangle, CheckCircle2, Search } from "lucide-react";

export const Route = createFileRoute("/admin/seo")({
  component: SeoManager,
});

function SeoManager() {
  const homepage = PAGES.find((page) => page.slug === "home")!;
  const disconnectedPages = PAGES.filter(
    (page) =>
      page.slug !== "global" &&
      page.slug !== "home" &&
      !page.slug.startsWith("blog/") &&
      page.blocks.some((block) => block.key.startsWith("meta_")),
  );
  const noEditorUrls = [
    "/developers/api-reference",
    "/developers/api-reference/simple-s2s",
    "/developers/api-reference/encrypted-s2s",
    "/developers/api-reference/transaction-status",
    "/developers/api-reference/webhooks",
    "/developers/api-reference/refund",
    "/developers/api-reference/payout",
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">SEO Manager</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Coverage of editable Meta Title and Meta Description fields across public URLs.
      </p>

      <section className="mt-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <h2 className="font-semibold">Editable and active</h2>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link
            to="/admin/pages/$"
            params={{ _splat: homepage.slug }}
            className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card/30 p-4 transition-colors hover:bg-card/60"
          >
            <Search className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">Homepage</div>
              <div className="text-xs text-muted-foreground">/</div>
            </div>
          </Link>
          <Link to="/admin/posts" className="rounded-xl border border-border/60 bg-card/30 p-4 hover:bg-card/60">
            <div className="font-medium">Published blog posts</div>
            <div className="text-xs text-muted-foreground">/blog/{"{post-slug}"}</div>
          </Link>
          <Link to="/admin/categories" className="rounded-xl border border-border/60 bg-card/30 p-4 hover:bg-card/60">
            <div className="font-medium">Blog categories</div>
            <div className="text-xs text-muted-foreground">/category/{"{category-slug}"}</div>
          </Link>
          <Link to="/admin/pages" className="rounded-xl border border-border/60 bg-card/30 p-4 hover:bg-card/60">
            <div className="font-medium">Custom CMS pages</div>
            <div className="text-xs text-muted-foreground">/{"{custom-slug}"}</div>
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h2 className="font-semibold">Fields exist, but live metadata is not connected</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          These editors contain SEO fields, but their routes currently use hardcoded metadata.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {disconnectedPages.map((page) => (
            <Link
              key={page.slug}
              to="/admin/pages/$"
              params={{ _splat: page.slug }}
              className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 hover:bg-amber-500/10"
            >
              <div className="font-medium">{page.label}</div>
              <div className="text-xs text-muted-foreground">{getPublicPath(page.slug)}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold">No admin SEO fields</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {noEditorUrls.map((url) => (
            <div key={url} className="rounded-lg border border-border/60 bg-card/20 px-4 py-3 font-mono text-xs text-muted-foreground">
              {url}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
