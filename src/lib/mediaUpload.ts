import { supabase } from "@/integrations/supabase/client";

export const CMS_MEDIA_BUCKET = "cms-media";
export const CMS_MEDIA_SIGNED_TTL = 60 * 60 * 24 * 365; // 1 year
export const CMS_MEDIA_MAX_BYTES = 10 * 1024 * 1024;

type RecordMediaFn = (opts: {
  data: {
    filename: string;
    url: string;
    alt?: string;
    mime_type?: string;
    size_bytes?: number;
  };
}) => Promise<unknown>;

export async function uploadCmsImage(
  file: File,
  recordMedia: RecordMediaFn,
  options?: { alt?: string; filename?: string },
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file (JPEG, PNG, WebP, GIF, SVG).");
  }
  if (file.size > CMS_MEDIA_MAX_BYTES) {
    throw new Error("Max file size is 10 MB.");
  }

  const displayName = (options?.filename || file.name).trim() || file.name;
  const storageName = displayName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${Date.now()}-${storageName}`;
  const { error: upErr } = await supabase.storage.from(CMS_MEDIA_BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (upErr) throw upErr;

  const { data: signed, error: signErr } = await supabase.storage
    .from(CMS_MEDIA_BUCKET)
    .createSignedUrl(path, CMS_MEDIA_SIGNED_TTL);
  if (signErr || !signed?.signedUrl) {
    throw signErr ?? new Error("Failed to create image URL.");
  }

  await recordMedia({
    data: {
      filename: displayName,
      url: signed.signedUrl,
      alt: options?.alt || undefined,
      mime_type: file.type,
      size_bytes: file.size,
    },
  });

  return signed.signedUrl;
}
