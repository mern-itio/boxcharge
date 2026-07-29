import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPageDef, type BlockDef } from "@/content/pages";
import { getPageContent, saveBlock } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MarkdownView } from "@/components/cms/MarkdownView";
import { RichTextEditor } from "@/components/cms/RichTextEditor";
import { ImageUploadField } from "@/components/cms/ImageUploadField";
import { getPublicPath } from "@/content/pages";
import { ChevronLeft, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pages/$")({
  loader: ({ params }) => {
    if (!getPageDef(params._splat ?? "")) throw notFound();
  },
  component: PageEditor,
  errorComponent: ({ error }) => <div className="p-6 text-sm text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-6 text-sm text-muted-foreground">Page not found.</div>,
});

function PageEditor() {
  const { _splat } = Route.useParams();
  const slug = _splat ?? "";
  const def = getPageDef(slug)!;
  const getFn = useServerFn(getPageContent);
  const saveFn = useServerFn(saveBlock);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cms", "page", slug],
    queryFn: () => getFn({ data: { slug } }),
  });

  const save = useMutation({
    mutationFn: (v: { key: string; value: unknown }) =>
      saveFn({ data: { slug, key: v.key, value: v.value as never } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "page", slug] });
      toast.success("Saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div>
      <Link to="/admin/pages" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-3 w-3" /> All pages
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">{def.label}</h1>
          <p className="text-sm text-muted-foreground">
            Slug: <code>{slug}</code>
            {getPublicPath(slug) && (
              <> · Live at <a href={getPublicPath(slug)!} target="_blank" rel="noreferrer" className="text-primary hover:underline">{getPublicPath(slug)}</a></>
            )}
          </p>
        </div>
      </div>

      {slug === "home" && (
        <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
          <strong className="text-foreground">Homepage tips:</strong> Use <em>Full page content</em> to
          replace the entire homepage with one rich editor. Or leave it empty and edit hero, stats, and
          each section below. Use <em>Hide sections</em> to turn off individual blocks.
        </div>
      )}

      <div className="mt-6 space-y-6">
        {def.blocks.map((b) => (
          <BlockField
            key={b.key}
            def={b}
            value={(data as Record<string, unknown> | undefined)?.[b.key]}
            saving={save.isPending}
            onSave={(value) => save.mutate({ key: b.key, value })}
          />
        ))}
      </div>
    </div>
  );
}

function BlockField({
  def,
  value,
  onSave,
  saving,
}: {
  def: BlockDef;
  value: unknown;
  onSave: (v: unknown) => void;
  saving: boolean;
}) {
  const [draft, setDraft] = useState<unknown>(value ?? defaultFor(def));
  useEffect(() => setDraft(value ?? defaultFor(def)), [value, def]);

  return (
    <div className="rounded-xl border border-border/60 bg-card/30 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Label className="text-sm font-medium">{def.label}</Label>
          <div className="text-xs text-muted-foreground">
            <code>{def.key}</code> · {def.type}
          </div>
          {def.help && <p className="mt-1 text-xs text-muted-foreground">{def.help}</p>}
        </div>
        <Button size="sm" onClick={() => onSave(draft)} disabled={saving}>
          <Save className="mr-1 h-3 w-3" /> Save
        </Button>
      </div>
      <div className="mt-3">{renderEditor(def, draft, setDraft)}</div>
    </div>
  );
}

function defaultFor(def: BlockDef): unknown {
  if (def.type === "list") return [];
  return "";
}

function renderEditor(def: BlockDef, value: unknown, set: (v: unknown) => void) {
  switch (def.type) {
    case "text":
      return <Input value={String(value ?? "")} onChange={(e) => set(e.target.value)} maxLength={500} />;
    case "textarea":
      return <Textarea value={String(value ?? "")} onChange={(e) => set(e.target.value)} rows={3} maxLength={2000} />;
    case "image":
      return (
        <ImageUploadField
          label={def.label}
          value={String(value ?? "")}
          onChange={(url) => set(url)}
          hint={def.help ?? "Recommended 1200×630 for Open Graph / social share images."}
        />
      );
    case "markdown": {
      const v = String(value ?? "");
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <Textarea value={v} onChange={(e) => set(e.target.value)} rows={10} className="font-mono text-xs" />
          <div className="rounded-md border border-border/60 bg-background/40 p-3">
            <div className="mb-1 text-xs uppercase text-muted-foreground">Preview</div>
            <MarkdownView>{v || "_Nothing yet_"}</MarkdownView>
          </div>
        </div>
      );
    }
    case "html": {
      const v = String(value ?? "");
      return (
        <RichTextEditor
          value={v}
          onChange={(html) => set(html)}
          placeholder="Write or paste full page content…"
        />
      );
    }
    case "list": {
      const items = Array.isArray(value) ? (value as Record<string, string>[]) : [];
      const fields = def.itemFields ?? [{ key: "value", label: "Value", type: "text" as const }];
      return (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-md border border-border/60 bg-background/40 p-3">
              <div className="grid gap-2 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.key}>
                    <Label className="text-xs">{f.label}</Label>
                    {f.type === "textarea" || f.type === "markdown" ? (
                      <Textarea
                        rows={2}
                        value={item[f.key] ?? ""}
                        onChange={(e) => {
                          const next = [...items];
                          next[idx] = { ...next[idx], [f.key]: e.target.value };
                          set(next);
                        }}
                      />
                    ) : (
                      <Input
                        value={item[f.key] ?? ""}
                        onChange={(e) => {
                          const next = [...items];
                          next[idx] = { ...next[idx], [f.key]: e.target.value };
                          set(next);
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="mt-2"
                onClick={() => set(items.filter((_, i) => i !== idx))}
              >
                <Trash2 className="mr-1 h-3 w-3" /> Remove
              </Button>
            </div>
          ))}
          <Button size="sm" variant="outline" onClick={() => set([...items, {}])}>
            <Plus className="mr-1 h-3 w-3" /> Add item
          </Button>
        </div>
      );
    }
  }
}
