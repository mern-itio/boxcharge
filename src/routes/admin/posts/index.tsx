import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listPostsAdmin, deletePost, upsertPost } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit3, Search } from "lucide-react";
import { toast } from "sonner";
import { draftSlug } from "@/lib/slugify";

export const Route = createFileRoute("/admin/posts/")({
  component: PostsList,
});

function PostsList() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const listFn = useServerFn(listPostsAdmin);
  const delFn = useServerFn(deletePost);
  const createFn = useServerFn(upsertPost);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["cms", "posts", "admin"],
    queryFn: () => listFn(),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Post deleted");
      qc.invalidateQueries({ queryKey: ["cms", "posts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const create = useMutation({
    mutationFn: () =>
      createFn({
        data: {
          slug: draftSlug("Untitled post"),
          title: "Untitled post",
          body_md: "",
          tags: [],
          status: "draft" as const,
        },
      }),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["cms", "posts"] });
      navigate({ to: "/admin/posts/$id", params: { id: res.id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = posts.filter((p) => {
    if (filter !== "all" && p.status !== filter) return false;
    if (q && !p.title.toLowerCase().includes(q.toLowerCase()) && !p.slug.includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Blog Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create, edit, publish or delete posts.</p>
        </div>
        <Button onClick={() => create.mutate()} disabled={create.isPending}>
          <Plus className="mr-1.5 h-4 w-4" /> New post
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search posts…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        {(["all", "published", "draft"] as const).map((s) => (
          <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)}>
            {s[0].toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-card/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5">Title</th>
              <th className="px-4 py-2.5 hidden sm:table-cell">Slug</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5 hidden md:table-cell">Updated</th>
              <th className="px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">No posts. Click "New post" to create one.</td></tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-border/60 hover:bg-card/30">
                <td className="px-4 py-2.5 font-medium">{p.title}</td>
                <td className="px-4 py-2.5 hidden sm:table-cell text-muted-foreground">/blog/{p.slug}</td>
                <td className="px-4 py-2.5">
                  <Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge>
                </td>
                <td className="px-4 py-2.5 hidden md:table-cell text-muted-foreground">
                  {new Date(p.updated_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="inline-flex gap-1">
                    <Link to="/admin/posts/$id" params={{ id: p.id }}>
                      <Button size="sm" variant="ghost"><Edit3 className="h-3.5 w-3.5" /></Button>
                    </Link>
                    <Button
                      size="sm" variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete "${p.title}"?`)) del.mutate(p.id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
