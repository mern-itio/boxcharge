import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// TODO: replace with your project URL once a custom domain is set.
const BASE_URL = "";

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

const blogSlugs = [
  "understanding-payment-orchestration",
  "apm-connectivity-explained",
  "designing-for-pci-aligned-operations",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          ...staticPaths,
          ...blogSlugs.map((s) => ({
            path: `/blog/${s}`,
            priority: "0.6",
            changefreq: "monthly" as const,
          })),
        ];

        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
