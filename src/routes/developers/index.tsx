import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Server, Webhook, ShoppingCart } from "lucide-react";
import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section, CtaBanner } from "@/components/site/PageBlocks";
import { buildHead } from "@/components/seo/buildHead";

const items = [
  { icon: Code2, title: "API Reference", to: "/developers/api-reference", body: "PAYIN S2S — simple, encrypted, webhooks, refunds (Peyx-compatible)." },
  { icon: Server, title: "Server-to-Server", to: "/developers/api-reference/simple-s2s", body: "POST /api/s2s — backend card payments with 3DS authurl." },
  { icon: Webhook, title: "Webhook Notifications", to: "/developers/webhooks", body: "Signed events for lifecycle and settlement updates." },
  { icon: ShoppingCart, title: "Hosted Checkout", to: "/developers/hosted-checkout", body: "PCI-friendly hosted payment page with branding controls." },
];

export const Route = createFileRoute("/developers/")({
  head: () => buildHead({
    title: "Developers — Built for Fast and Flexible Integration",
    description: "Integrate BoxCharge using REST APIs, S2S flows, signed webhooks, and hosted checkout.",
    path: "/developers",
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Developers", path: "/developers" }],
  }),
  component: DevLanding,
});

function DevLanding() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="Built for Fast and Flexible Integration"
        subtitle="Connect your platform, app, or back-office system using hosted checkout, server-to-server APIs, and signed webhooks."
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Developers", path: "/developers" }]}
        primaryCta={{ label: "Explore Integration Options", href: "/developers/api-integration" }}
        cmsSlug="developers"
      />
      <CmsHtmlBody slug="developers">
      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map(({ icon: Icon, title, to, body }) => (
            <Link key={to} to={to} className="group glass gradient-border relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 ring-1 ring-white/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <ArrowRight className="absolute right-5 top-5 h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60" />
            </Link>
          ))}
        </div>
      </Section>
      <CtaBanner title="Start Building With BoxCharge" cta={{ label: "Request Integration Access", href: "/contact" }} />
      </CmsHtmlBody>
    </>
  );
}
