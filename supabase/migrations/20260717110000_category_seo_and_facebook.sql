ALTER TABLE public.categories
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text;

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS social_facebook text;
