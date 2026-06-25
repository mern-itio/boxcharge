import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { absoluteUrl, resolveSiteUrl } from "@/lib/siteUrl";

const staticPaths = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  { path: "/solutions", priority: "0.9", changefreq: "monthly" },
  { path: "/solutions/global-merchant-services", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/cross-border-payment-gateway", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/payment-orchestration", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/apm-connectivity", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/iban-settlement", priority: "0.7", changefreq: "monthly" },
  { path: "/solutions/offshore-merchant-accounts", priority: "0.7", changefreq: "monthly" },
  { path: "/technology", priority: "0.9", changefreq: "monthly" },
  { path: "/technology/smart-routing", priority: "0.8", changefreq: "monthly" },
  { path: "/technology/cascading-payments", priority: "0.8", changefreq: "monthly" },
  { path: "/technology/3ds-authentication", priority: "0.7", changefreq: "monthly" },
  { path: "/technology/tokenization", priority: "0.7", changefreq: "monthly" },
  { path: "/technology/fraud-prevention", priority: "0.7", changefreq: "monthly" },
  { path: "/technology/pci-security", priority: "0.7", changefreq: "monthly" },
  { path: "/developers", priority: "0.8", changefreq: "monthly" },
  { path: "/developers/api-integration", priority: "0.7", changefreq: "monthly" },
  { path: "/developers/hosted-checkout", priority: "0.7", changefreq: "monthly" },
  { path: "/developers/s2s-integration", priority: "0.7", changefreq: "monthly" },
  { path: "/developers/webhooks", priority: "0.7", changefreq: "monthly" },
  { path: "/policies/privacy", priority: "0.4", changefreq: "yearly" },
  { path: "/policies/terms", priority: "0.4", changefreq: "yearly" },
  { path: "/policies/aml", priority: "0.4", changefreq: "yearly" },
  { path: "/policies/chargeback", priority: "0.4", changefreq: "yearly" },
  { path: "/policies/merchant-protection", priority: "0.4", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: settings } = await supabaseAdmin
          .from("site_settings")
          .select("site_url, footer_domain")
          .eq("id", 1)
          .maybeSingle();

        const siteUrl = resolveSiteUrl(settings?.site_url || settings?.footer_domain || undefined);

        const { data: posts } = await supabaseAdmin
          .from("posts")
          .select("slug, updated_at, published_at")
          .eq("status", "published")
          .order("published_at", { ascending: false });

        const entries = [
          ...staticPaths,
          ...(posts ?? []).map((p) => ({
            path: `/blog/${p.slug}`,
            priority: "0.6",
            changefreq: "monthly" as const,
            lastmod: (p.updated_at || p.published_at || undefined)?.slice(0, 10),
          })),
        ];

        const urls = entries
          .map((e) => {
            const lastmod = "lastmod" in e && e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : "";
            return `  <url>\n    <loc>${absoluteUrl(e.path, siteUrl)}</loc>${lastmod}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`;
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
