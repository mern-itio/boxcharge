import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, Network, Route as RouteIcon, Wallet, Banknote, Layers } from "lucide-react";
import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section, CtaBanner } from "@/components/site/PageBlocks";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { buildHead } from "@/components/seo/buildHead";
import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const items = [
  { icon: Globe2, title: "Global Merchant Services", to: "/solutions/global-merchant-services", body: "International merchant accounts and multi-currency acquiring for global growth." },
  { icon: Layers, title: "Offshore Merchant Accounts", to: "/solutions/offshore-merchant-accounts", body: "Partner-led offshore merchant enablement for multi-jurisdiction businesses." },
  { icon: Network, title: "Cross-Border Payment Gateway", to: "/solutions/cross-border-payment-gateway", body: "Secure multi-currency gateway connectivity for international checkout." },
  { icon: RouteIcon, title: "Payment Orchestration", to: "/solutions/payment-orchestration", body: "Cascading logic, multi-acquirer connectivity, and performance-aware routing." },
  { icon: Wallet, title: "Alternative Payment Methods", to: "/solutions/apm-connectivity", body: "Local wallets, bank transfers, and regional APM corridors." },
  { icon: Banknote, title: "IBAN & Settlement Solutions", to: "/solutions/iban-settlement", body: "SEPA collections, IBAN issuance, and euro-area settlement flows." },
];

const seo = pageSeoDefaults.solutions;

export const Route = createFileRoute("/solutions/")({
  loader: () => resolvePageSeo("solutions", seo),
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData, seo);
    return buildHead({
      ...seoHeadFields(meta),
      path: "/solutions",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
      ],
    });
  },
  component: SolutionsLanding,
});

function SolutionsLanding() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Solutions Designed for Global Payment Operations"
        subtitle="A modular payment infrastructure layer covering merchant enablement, gateway connectivity, orchestration, APMs, and settlement."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ]}
        cmsSlug="solutions"
      />
      <CmsHtmlBody slug="solutions">
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, to, body }) => (
            <Link
              key={to}
              to={to}
              className="group glass gradient-border relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
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
      <RelatedLinks
        title="Technology & developer resources"
        subtitle="Pair each solution with the infrastructure and integration paths that power live payments."
        items={[
          { label: "Smart Routing", to: "/technology/smart-routing", description: "Performance-aware acquirer selection." },
          { label: "Hosted Checkout", to: "/developers/hosted-checkout", description: "PCI-friendly payment pages for faster launch." },
          { label: "Payment insights", to: "/blog", description: "Guides on merchant accounts, gateways, and settlement." },
        ]}
      />
      <CtaBanner title="Find the Right Fit" cta={{ label: "Talk to a Specialist", href: "/contact" }} />
      </CmsHtmlBody>
    </>
  );
}
