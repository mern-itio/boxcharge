import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listCategories, upsertCategory, deleteCategory } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/lib/slugify";

export const Route = createFileRoute("/admin/categories")({
  component: CategoriesPage,
});

function CategoriesPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listCategories);
  const upFn = useServerFn(upsertCategory);
  const delFn = useServerFn(deleteCategory);

  const { data: cats = [] } = useQuery({ queryKey: ["cms", "categories"], queryFn: () => listFn() });
  const [draft, setDraft] = useState({ name: "", slug: "", description: "" });

  const create = useMutation({
    mutationFn: () => upFn({ data: { name: draft.name.trim(), slug: draft.slug || slugify(draft.name), description: draft.description || null } }),
    onSuccess: () => { toast.success("Category added"); setDraft({ name: "", slug: "", description: "" }); qc.invalidateQueries({ queryKey: ["cms", "categories"] }); },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["cms", "categories"] }); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link to="/admin/posts"><Button size="sm" variant="ghost"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Button></Link>
        <h1 className="text-2xl font-semibold">Categories</h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Organize blog posts into categories.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-card/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-2.5">Name</th><th className="px-4 py-2.5">Slug</th><th className="px-4 py-2.5 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {cats.length === 0 && <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">No categories yet.</td></tr>}
              {cats.map((c) => (
                <tr key={c.id} className="border-t border-border/60">
                  <td className="px-4 py-2.5 font-medium">{c.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{c.slug}</td>
                  <td className="px-4 py-2.5 text-right">
                    <Button size="sm" variant="ghost" onClick={() => { if (confirm(`Delete "${c.name}"?`)) del.mutate(c.id); }}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/30 p-4 space-y-3 h-fit">
          <div className="text-sm font-semibold">Add category</div>
          <div>
            <Label>Name</Label>
            <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value, slug: draft.slug || slugify(e.target.value) })} className="mt-1.5" />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} className="mt-1.5 font-mono text-sm" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={2} className="mt-1.5" />
          </div>
          <Button onClick={() => create.mutate()} disabled={!draft.name.trim() || create.isPending} className="w-full">
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
