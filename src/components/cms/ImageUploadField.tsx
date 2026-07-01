import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { recordMedia } from "@/lib/cms.functions";
import { uploadCmsImage } from "@/lib/mediaUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload, FolderOpen, X } from "lucide-react";
import { toast } from "sonner";
import { MediaPickerDialog } from "./MediaPickerDialog";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
};

function filenameFromUrl(url: string): string {
  if (!url) return "";
  try {
    const base = new URL(url).pathname.split("/").pop();
    return base ? decodeURIComponent(base.split("?")[0]) : "";
  } catch {
    const base = url.split("/").pop();
    return base ? decodeURIComponent(base.split("?")[0]) : "";
  }
}

export function ImageUploadField({ label, value, onChange, hint }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const qc = useQueryClient();
  const recordFn = useServerFn(recordMedia);
  const currentFilename = filenameFromUrl(value);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const url = await uploadCmsImage(file, recordFn, {
        filename: filename.trim() || file.name,
      });
      qc.invalidateQueries({ queryKey: ["cms", "media"] });
      onChange(url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <Label>{label}</Label>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}

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

      <div className="mt-1.5 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          {uploading ? "Uploading…" : "Upload"}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setPickerOpen(true)}>
          <FolderOpen className="mr-1.5 h-3.5 w-3.5" />
          Library
        </Button>
      </div>

      <div className="mt-3 space-y-2">
        <div>
          <Label className="text-xs text-muted-foreground">File name (for uploads)</Label>
          <Input
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="mt-1 font-mono text-xs"
            placeholder="hero-banner.png"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Image URL</Label>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 font-mono text-xs"
            placeholder="https://… — paste, edit, or upload above"
          />
          <p className="mt-1 text-[11px] text-muted-foreground">
            Edit the full image URL directly. Upload or pick from the library to replace it.
          </p>
        </div>
        {currentFilename && (
          <div>
            <Label className="text-xs text-muted-foreground">Current file name</Label>
            <Input
              value={currentFilename}
              readOnly
              className="mt-1 font-mono text-xs text-muted-foreground"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Rename uploaded files in Admin → Media Library.
            </p>
          </div>
        )}
      </div>

      {value ? (
        <div className="relative mt-2 inline-block max-w-full">
          <img
            src={value}
            alt=""
            className="max-h-44 rounded-md border border-border/60 object-cover"
          />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="absolute right-2 top-2 h-7 w-7 p-0"
            onClick={() => onChange("")}
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <div className="mt-2 flex h-24 items-center justify-center rounded-md border border-dashed border-border/60 bg-card/20 text-xs text-muted-foreground">
          <ImageIcon className="mr-1.5 h-4 w-4" />
          No image selected
        </div>
      )}

      <MediaPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={onChange}
        title="Select featured image"
      />
    </div>
  );
}
