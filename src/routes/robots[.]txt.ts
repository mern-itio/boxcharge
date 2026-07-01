import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/siteUrl";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: settings } = await supabaseAdmin
          .from("site_settings")
          .select("site_url, footer_domain")
          .eq("id", 1)
          .maybeSingle();

        const siteUrl = settings?.site_url || settings?.footer_domain || undefined;
        const sitemapUrl = absoluteUrl("/sitemap.xml", siteUrl);

        const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
