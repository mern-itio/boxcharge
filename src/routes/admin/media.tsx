import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMedia, deleteMedia, recordMedia, updateMediaFilename } from "@/lib/cms.functions";
import { uploadCmsImage } from "@/lib/mediaUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Copy, Upload, Pencil, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/media")({
  component: MediaLibrary,
});

function MediaLibrary() {
  const listFn = useServerFn(listMedia);
  const recordFn = useServerFn(recordMedia);
  const deleteFn = useServerFn(deleteMedia);
  const renameFn = useServerFn(updateMediaFilename);
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [alt, setAlt] = useState("");
  const [filename, setFilename] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const { data: items = [] } = useQuery({ queryKey: ["cms", "media"], queryFn: () => listFn() });

  const del = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "media"] });
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rename = useMutation({
    mutationFn: ({ id, filename: name }: { id: string; filename: string }) =>
      renameFn({ data: { id, filename: name } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "media"] });
      setEditingId(null);
      toast.success("Filename updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadCmsImage(file, recordFn, { alt: alt || undefined, filename: filename || file.name });
      qc.invalidateQueries({ queryKey: ["cms", "media"] });
      toast.success("Uploaded");
      setAlt("");
      setFilename("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Media library</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Upload images here or directly from blog/page editors. All uploads appear in this library.
      </p>

      <div className="mt-5 rounded-xl border border-border/60 bg-card/30 p-4 space-y-3">
        <div>
          <Label className="text-sm">File name</Label>
          <Input value={filename} onChange={(e) => setFilename(e.target.value)} className="mt-1" placeholder="hero-banner.png" maxLength={255} />
        </div>
        <div>
          <Label className="text-sm">Alt text (optional, recommended for accessibility)</Label>
          <Input value={alt} onChange={(e) => setAlt(e.target.value)} className="mt-1" maxLength={200} />
        </div>
        <div className="flex items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="text-sm" />
          {uploading && <span className="text-xs text-muted-foreground"><Upload className="inline h-3 w-3" /> Uploading…</span>}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <div key={m.id} className="rounded-xl border border-border/60 bg-card/30 p-2">
            <div className="aspect-video overflow-hidden rounded-md bg-background/40">
              <img src={m.url} alt={m.alt ?? ""} className="h-full w-full object-cover" />
            </div>
            {editingId === m.id ? (
              <div className="mt-2 flex gap-1">
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-8 text-xs" />
                <Button size="sm" className="h-8 px-2" onClick={() => rename.mutate({ id: m.id, filename: editName })}>
                  <Check className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-1">
                <div className="min-w-0 flex-1 truncate text-xs">{m.filename}</div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    setEditingId(m.id);
                    setEditName(m.filename);
                  }}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </div>
            )}
            <div className="mt-2 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(m.url);
                  toast.success("URL copied");
                }}
              >
                <Copy className="mr-1 h-3 w-3" /> Copy URL
              </Button>
              <Button size="sm" variant="ghost" onClick={() => del.mutate(m.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
            No media yet. Upload your first image above.
          </div>
        )}
      </div>
    </div>
  );
}
