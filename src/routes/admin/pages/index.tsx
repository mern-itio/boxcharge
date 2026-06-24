import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listCmsPagesAdmin, deleteCmsPage, upsertCmsPage } from "@/lib/cms.functions";
import { PAGES, getPageCategory, getPublicPath } from "@/content/pages";
import { customPagePath } from "@/lib/customPagePath";
import { draftSlug, slugify } from "@/lib/slugify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit3, Search, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pages/")({
  component: PagesList,
});

type Filter = "all" | "builtin" | "custom";

function PagesList() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const listFn = useServerFn(listCmsPagesAdmin);
  const delFn = useServerFn(deleteCmsPage);
  const createFn = useServerFn(upsertCmsPage);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const { data: customPages = [], isLoading } = useQuery({
    queryKey: ["cms", "pages", "admin"],
    queryFn: () => listFn(),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Page deleted");
      qc.invalidateQueries({ queryKey: ["cms", "pages", "admin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const create = useMutation({
    mutationFn: () =>
      createFn({
        data: {
          slug: draftSlug("Untitled page"),
          title: "Untitled page",
          content_html: "",
          status: "draft" as const,
        },
      }),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["cms", "pages", "admin"] });
      navigate({ to: "/admin/pages/edit/$id", params: { id: res.id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rows = useMemo(() => {
    const builtin = PAGES.map((p) => ({
      kind: "builtin" as const,
      id: p.slug,
      title: p.label,
      path: getPublicPath(p.slug),
      category: getPageCategory(p.slug),
      fields: p.blocks.length,
      status: "live" as const,
      updated: null as string | null,
    }));
    const custom = customPages.map((p) => ({
      kind: "custom" as const,
      id: p.id,
      title: p.title,
      path: customPagePath(p.slug),
      category: "Custom",
      fields: null as number | null,
      status: p.status as string,
      updated: p.updated_at as string,
    }));
    return [...builtin, ...custom];
  }, [customPages]);

  const filtered = rows.filter((r) => {
    if (filter === "builtin" && r.kind !== "builtin") return false;
    if (filter === "custom" && r.kind !== "custom") return false;
    if (q) {
      const s = q.toLowerCase();
      if (!r.title.toLowerCase().includes(s) && !(r.path ?? "").includes(s)) return false;
    }
    return true;
  });

  const builtinCount = PAGES.length;
  const customCount = customPages.length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Pages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit all site pages — home, about, solutions, policies, and custom pages.
          </p>
        </div>
        <Button onClick={() => create.mutate()} disabled={create.isPending}>
          <Plus className="mr-1.5 h-4 w-4" /> New custom page
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search pages…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        {([
          ["all", `All (${builtinCount + customCount})`],
          ["builtin", `Site pages (${builtinCount})`],
          ["custom", `Custom (${customCount})`],
        ] as const).map(([f, label]) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-card/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5">Page</th>
              <th className="px-4 py-2.5 hidden sm:table-cell">URL</th>
              <th className="px-4 py-2.5 hidden md:table-cell">Type</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && filter !== "builtin" && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No pages match your search.</td></tr>
            )}
            {filtered.map((r) => (
              <tr key={`${r.kind}-${r.id}`} className="border-t border-border/60 hover:bg-card/30">
                <td className="px-4 py-2.5">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.category}</div>
                </td>
                <td className="px-4 py-2.5 hidden sm:table-cell text-muted-foreground">
                  {r.path ?? "—"}
                </td>
                <td className="px-4 py-2.5 hidden md:table-cell">
                  <Badge variant="outline">{r.kind === "builtin" ? "Site page" : "Custom"}</Badge>
                </td>
                <td className="px-4 py-2.5">
                  <Badge variant={r.status === "published" || r.status === "live" ? "default" : "secondary"}>
                    {r.status}
                  </Badge>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="inline-flex gap-1">
                    {r.path && (r.status === "published" || r.status === "live") && (
                      <a href={r.path} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="ghost"><ExternalLink className="h-3.5 w-3.5" /></Button>
                      </a>
                    )}
                    {r.kind === "builtin" ? (
                      <Link to="/admin/pages/$" params={{ _splat: r.id }}>
                        <Button size="sm" variant="ghost"><Edit3 className="h-3.5 w-3.5" /></Button>
                      </Link>
                    ) : (
                      <Link to="/admin/pages/edit/$id" params={{ id: r.id }}>
                        <Button size="sm" variant="ghost"><Edit3 className="h-3.5 w-3.5" /></Button>
                      </Link>
                    )}
                    {r.kind === "custom" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (confirm(`Delete "${r.title}"?`)) del.mutate(r.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        <strong>Site pages</strong> — home, about, solutions, policies, etc. Use the rich editor at the top to replace full page content, or edit hero/SEO fields below.
        <br />
        <strong>Custom pages</strong> — new pages you create; live at <code>/your-slug</code> (direct URL, no /p/ prefix).
      </p>
    </div>
  );
}
