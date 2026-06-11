import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMedia, recordMedia } from "@/lib/cms.functions";
import { uploadCmsImage } from "@/lib/mediaUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  title?: string;
};

export function MediaPickerDialog({ open, onOpenChange, onSelect, title = "Choose image" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const qc = useQueryClient();
  const listFn = useServerFn(listMedia);
  const recordFn = useServerFn(recordMedia);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["cms", "media"],
    queryFn: () => listFn(),
    enabled: open,
  });

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const url = await uploadCmsImage(file, recordFn);
      qc.invalidateQueries({ queryKey: ["cms", "media"] });
      toast.success("Image uploaded");
      onSelect(url);
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border/60 bg-card/30 p-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
            }}
          />
          <Button
            type="button"
            size="sm"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="mr-1.5 h-4 w-4" />
            {uploading ? "Uploading…" : "Upload from computer"}
          </Button>
          <span className="text-xs text-muted-foreground">JPEG, PNG, WebP, GIF — max 10 MB</span>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Media library
          </p>
          {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {!isLoading && items.length === 0 && (
            <p className="rounded-lg border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
              No images yet. Upload one above.
            </p>
          )}
          <div className="grid max-h-[50vh] gap-2 overflow-y-auto sm:grid-cols-3">
            {items.map((m) => (
              <button
                key={m.id}
                type="button"
                className="group overflow-hidden rounded-lg border border-border/60 text-left transition hover:border-primary/50 hover:ring-1 hover:ring-primary/30"
                onClick={() => {
                  onSelect(m.url);
                  onOpenChange(false);
                }}
              >
                <div className="aspect-video bg-background/40">
                  <img src={m.url} alt={m.alt ?? m.filename} className="h-full w-full object-cover" />
                </div>
                <div className="truncate px-2 py-1.5 text-[11px] text-muted-foreground group-hover:text-foreground">
                  {m.filename}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 border-t border-border/60 pt-3">
          <p className="mb-1.5 text-xs text-muted-foreground">Or paste image URL</p>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem("url") as HTMLInputElement).value.trim();
              if (!input) return;
              onSelect(input);
              onOpenChange(false);
            }}
          >
            <Input name="url" placeholder="https://…" className="font-mono text-xs" />
            <Button type="submit" size="sm" variant="outline">
              Use URL
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
