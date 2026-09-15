-- SEO-managed URL redirects (admin CMS)

CREATE TABLE public.url_redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path TEXT NOT NULL,
  to_url TEXT NOT NULL,
  status_code INTEGER NOT NULL DEFAULT 301
    CHECK (status_code IN (301, 302, 307, 308)),
  enabled BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX url_redirects_from_path_unique
  ON public.url_redirects (from_path);

CREATE INDEX url_redirects_enabled_from_path_idx
  ON public.url_redirects (from_path)
  WHERE enabled;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.url_redirects TO authenticated;
GRANT ALL ON public.url_redirects TO service_role;

ALTER TABLE public.url_redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins manage url redirects" ON public.url_redirects
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER url_redirects_touch
  BEFORE UPDATE ON public.url_redirects
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
