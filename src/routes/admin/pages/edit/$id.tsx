import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getCmsPageByIdAdmin, upsertCmsPage } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/cms/RichTextEditor";
import { ImageUploadField } from "@/components/cms/ImageUploadField";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { toast } from "sonner";
import { customPagePath } from "@/lib/customPagePath";
import { TitleSlugFields } from "@/components/cms/TitleSlugFields";
import { isDefaultDraftTitle, slugify, slugMatchesTitle } from "@/lib/slugify";

export const Route = createFileRoute("/admin/pages/edit/$id")({
  component: PageEditor,
});

function PageEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const getFn = useServerFn(getCmsPageByIdAdmin);
  const saveFn = useServerFn(upsertCmsPage);

  const { data: page, isLoading } = useQuery({
    queryKey: ["cms", "page-dynamic", id],
    queryFn: () => getFn({ data: { id } }),
  });

  const [form, setForm] = useState({
    slug: "", title: "", content_html: "", excerpt: "", featured_image_url: "",
    meta_title: "", meta_description: "", status: "draft" as "draft" | "published",
  });
  const [slugAuto, setSlugAuto] = useState(true);

  useEffect(() => {
    if (page) {
      const auto =
        isDefaultDraftTitle(page.title) || slugMatchesTitle(page.title, page.slug);
      setSlugAuto(auto);
      setForm({
        slug: auto && isDefaultDraftTitle(page.title) ? slugify(page.title) : page.slug,
        title: page.title,
        content_html: page.content_html ?? "",
        excerpt: page.excerpt ?? "",
        featured_image_url: page.featured_image_url ?? "",
        meta_title: page.meta_title ?? "",
        meta_description: page.meta_description ?? "",
        status: page.status as "draft" | "published",
      });
    }
  }, [page]);

  const save = useMutation({
    mutationFn: (status?: "draft" | "published") =>
      saveFn({
        data: {
          id,
          slug: slugify(form.slug.trim() || form.title),
          title: form.title.trim(),
          content_html: form.content_html,
          excerpt: form.excerpt.trim() || null,
          featured_image_url: form.featured_image_url.trim() || null,
          meta_title: form.meta_title.trim() || null,
          meta_description: form.meta_description.trim() || null,
          status: status ?? form.status,
        },
      }),
    onSuccess: (_d, status) => {
      toast.success(status === "published" ? "Published" : "Saved");
      qc.invalidateQueries({ queryKey: ["cms", "page-dynamic", id] });
      qc.invalidateQueries({ queryKey: ["cms", "pages", "admin"] });
      if (status) setForm((f) => ({ ...f, status }));
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="text-muted-foreground">Loading…</div>;
  if (!page) return (
    <div>
      <p>Page not found.</p>
      <Button variant="ghost" onClick={() => navigate({ to: "/admin/pages" })}>Back</Button>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link to="/admin/pages"><Button size="sm" variant="ghost"><ArrowLeft className="mr-1 h-4 w-4" /> All pages</Button></Link>
          <h1 className="text-xl font-semibold">Edit page</h1>
        </div>
        <div className="flex gap-2">
          {form.status === "published" && (
            <a href={customPagePath(form.slug)} target="_blank" rel="noreferrer">
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
            urlPreview={customPagePath(form.slug || "your-slug")}
            titlePlaceholder="Page title"
          />
          <div>
            <Label>Excerpt</Label>
            <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="mt-1.5" />
          </div>
          <div>
            <Label>Content</Label>
            <div className="mt-1.5">
              <RichTextEditor
                value={form.content_html}
                onChange={(html) => setForm((f) => ({ ...f, content_html: html }))}
                placeholder="Write your page content…"
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
              value={form.featured_image_url}
              onChange={(featured_image_url) => setForm((f) => ({ ...f, featured_image_url }))}
              hint="Hero banner on the live page."
            />
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
