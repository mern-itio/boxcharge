import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugify } from "@/lib/slugify";
import { Link2, RefreshCw } from "lucide-react";

type Props = {
  title: string;
  slug: string;
  slugAuto: boolean;
  onTitleChange: (title: string) => void;
  onSlugChange: (slug: string) => void;
  onSlugAutoChange: (auto: boolean) => void;
  urlPreview: string;
  titlePlaceholder?: string;
};

export function TitleSlugFields({
  title,
  slug,
  slugAuto,
  onTitleChange,
  onSlugChange,
  onSlugAutoChange,
  urlPreview,
  titlePlaceholder = "Page title",
}: Props) {
  const handleTitle = (value: string) => {
    onTitleChange(value);
    if (slugAuto) onSlugChange(slugify(value));
  };

  const handleSlug = (value: string) => {
    onSlugAutoChange(false);
    onSlugChange(value);
  };

  const syncFromTitle = () => {
    onSlugAutoChange(true);
    onSlugChange(slugify(title));
  };

  return (
    <>
      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
          className="mt-1.5 text-lg"
          placeholder={titlePlaceholder}
        />
      </div>
      <div>
        <div className="flex items-center justify-between gap-2">
          <Label>URL slug</Label>
          {!slugAuto && (
            <button
              type="button"
              onClick={syncFromTitle}
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
            >
              <RefreshCw className="h-3 w-3" />
              Sync from title
            </button>
          )}
        </div>
        <Input
          value={slug}
          onChange={(e) => handleSlug(e.target.value)}
          className="mt-1.5 font-mono text-sm"
          placeholder="url-slug"
        />
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link2 className="h-3 w-3 shrink-0" />
          <span>{urlPreview || "—"}</span>
          {slugAuto && (
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
              auto
            </span>
          )}
        </p>
      </div>
    </>
  );
}
