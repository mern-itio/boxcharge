import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPostByIdAdmin, upsertPost, listCategories } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/cms/RichTextEditor";
import { ImageUploadField } from "@/components/cms/ImageUploadField";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { toast } from "sonner";
import { AdminSelect } from "@/components/cms/AdminSelect";
import { TitleSlugFields } from "@/components/cms/TitleSlugFields";
import { isDefaultDraftTitle, slugify, slugMatchesTitle } from "@/lib/slugify";

function toDatetimeLocal(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const Route = createFileRoute("/admin/posts/$id")({
  component: PostEditor,
});

function PostEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const getFn = useServerFn(getPostByIdAdmin);
  const saveFn = useServerFn(upsertPost);
  const catsFn = useServerFn(listCategories);

  const { data: post, isLoading } = useQuery({
    queryKey: ["cms", "post", id],
    queryFn: () => getFn({ data: { id } }),
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["cms", "categories"],
    queryFn: () => catsFn(),
  });

  const [form, setForm] = useState({
    slug: "", title: "", excerpt: "", content_html: "", cover_url: "",
    tags: "", category_id: "", meta_title: "", meta_description: "",
    published_at: "",
    status: "draft" as "draft" | "published",
  });
  const [slugAuto, setSlugAuto] = useState(true);

  useEffect(() => {
    if (post) {
      const auto =
        isDefaultDraftTitle(post.title) || slugMatchesTitle(post.title, post.slug);
      setSlugAuto(auto);
      setForm({
        slug: auto && isDefaultDraftTitle(post.title) ? slugify(post.title) : post.slug,
        title: post.title,
        excerpt: post.excerpt ?? "",
        content_html: post.content_html ?? post.body_md ?? "",
        cover_url: post.cover_url ?? "",
        tags: (post.tags ?? []).join(", "),
        category_id: post.category_id ?? "",
        meta_title: post.meta_title ?? "",
        meta_description: post.meta_description ?? "",
        published_at: toDatetimeLocal(post.published_at),
        status: post.status as "draft" | "published",
      });
    }
  }, [post]);

  const save = useMutation({
    mutationFn: (status?: "draft" | "published") =>
      saveFn({
        data: {
          id,
          slug: slugify(form.slug.trim() || form.title),
          title: form.title.trim(),
          excerpt: form.excerpt.trim() || null,
          body_md: "",
          content_html: form.content_html,
          cover_url: form.cover_url.trim() || null,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          category_id: form.category_id || null,
          meta_title: form.meta_title.trim() || null,
          meta_description: form.meta_description.trim() || null,
          published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
          status: status ?? form.status,
        },
      }),
    onSuccess: (_d, status) => {
      toast.success(status === "published" ? "Published" : "Saved");
      qc.invalidateQueries({ queryKey: ["cms", "post", id] });
      qc.invalidateQueries({ queryKey: ["cms", "posts"] });
      if (status) setForm((f) => ({ ...f, status }));
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="text-muted-foreground">Loading…</div>;
  if (!post) return (
    <div>
      <p>Post not found.</p>
      <Button variant="ghost" onClick={() => navigate({ to: "/admin/posts" })}>Back</Button>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link to="/admin/posts"><Button size="sm" variant="ghost"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Button></Link>
          <h1 className="text-xl font-semibold">Edit post</h1>
        </div>
        <div className="flex gap-2">
          {form.status === "published" && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline"><Eye className="mr-1 h-4 w-4" /> View</Button>
            </a>
          )}
          <Button size="sm" variant="outline" onClick={() => save.mutate(undefined)} disabled={save.isPending}>
            <Save className="mr-1 h-4 w-4" /> Save
          </Button>
          {form.status === "draft" ? (
            <Button size="sm" onClick={() => save.mutate("published")} disabled={save.isPending}>Publish</Button>
          ) : (
            <Button size="sm" variant="secondary" onClick={() => save.mutate("draft")} disabled={save.isPending}>Unpublish</Button>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <TitleSlugFields
            title={form.title}
            slug={form.slug}
            slugAuto={slugAuto}
            onTitleChange={(title) => setForm((f) => ({ ...f, title }))}
            onSlugChange={(slug) => setForm((f) => ({ ...f, slug }))}
            onSlugAutoChange={setSlugAuto}
            urlPreview={`/blog/${form.slug || "your-slug"}`}
            titlePlaceholder="Post title"
          />
          <div>
            <Label>Excerpt</Label>
            <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="mt-1.5" />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Optional. Used for SEO meta description when set. Blog listing previews are generated automatically from the content below.
            </p>
          </div>
          <div>
            <Label>Content</Label>
            <div className="mt-1.5">
              <RichTextEditor
                value={form.content_html}
                onChange={(html) => setForm((f) => ({ ...f, content_html: html }))}
                placeholder="Tell your story…"
              />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-card/30 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</div>
            <div className="mt-2 text-sm">{form.status === "published" ? "Published" : "Draft"}</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4">
            <ImageUploadField
              label="Featured image"
              value={form.cover_url}
              onChange={(cover_url) => setForm((f) => ({ ...f, cover_url }))}
              hint="Shown on the blog listing and homepage preview cards — not inside the article body."
            />
          </div>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4">
            <Label>Category</Label>
            <AdminSelect
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="mt-1.5"
            >
              <option value="">— Select category —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </AdminSelect>
            {categories.length === 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                No categories yet. Create one first to organize posts.
              </p>
            )}
            <Link to="/admin/categories" className="mt-2 inline-block text-xs text-primary hover:underline">
              Manage categories →
            </Link>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4">
            <Label>Publish date & time</Label>
            <Input
              type="datetime-local"
              value={form.published_at}
              onChange={(e) => setForm({ ...form, published_at: e.target.value })}
              className="mt-1.5"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Controls the date shown on the blog and in search results. Leave blank to use the publish moment.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4">
            <Label>Tags (comma-separated)</Label>
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="mt-1.5"
              maxLength={8000}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Up to 80 tags, 200 characters each — e.g. payments, cross-border, PCI compliance
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SEO</div>
            <div>
              <Label>Meta title</Label>
              <Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} className="mt-1.5" placeholder="Defaults to title" />
            </div>
            <div>
              <Label>Meta description</Label>
              <Textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows={3} className="mt-1.5" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
