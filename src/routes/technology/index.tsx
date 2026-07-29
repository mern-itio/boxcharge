import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Route as RouteIcon, Layers, Fingerprint, Lock, KeyRound, ShieldCheck } from "lucide-react";
import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section, CtaBanner } from "@/components/site/PageBlocks";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { buildHead } from "@/components/seo/buildHead";
import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const items = [
  { icon: RouteIcon, title: "Smart Routing", to: "/technology/smart-routing", body: "Performance-aware routing across acquirers and corridors." },
  { icon: Layers, title: "Cascading Payments", to: "/technology/cascading-payments", body: "Automatic retry across alternative acquirers for eligible declines." },
  { icon: Fingerprint, title: "Fraud Prevention", to: "/technology/fraud-prevention", body: "Configurable rules, velocity controls, and monitoring signals." },
  { icon: Lock, title: "3DS Authentication", to: "/technology/3ds-authentication", body: "Issuer-led cardholder authentication integrated into the flow." },
  { icon: KeyRound, title: "Tokenization", to: "/technology/tokenization", body: "Replace card data with secure references for reuse." },
  { icon: ShieldCheck, title: "PCI DSS Aligned Infrastructure", to: "/technology/pci-security", body: "Infrastructure designed for PCI DSS aligned operations." },
];

const seo = pageSeoDefaults.technology;

export const Route = createFileRoute("/technology/")({
  loader: () => resolvePageSeo("technology", seo),
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData, seo);
    return buildHead({
      ...seoHeadFields(meta),
      path: "/technology",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Technology", path: "/technology" },
      ],
    });
  },
  component: TechLanding,
});

function TechLanding() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="Built With Intelligent Payment Infrastructure"
        subtitle="A modular technology stack covering routing, authentication, tokenization, and monitoring — placed at the center of every payment flow."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ]}
        cmsSlug="technology"
      />
      <CmsHtmlBody slug="technology">
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
          title="Solutions that use this stack"
          subtitle="See how technology layers power merchant services and gateway products."
          items={[
            {
              label: "Payment Orchestration",
              to: "/solutions/payment-orchestration",
              description: "Routing and cascading for multi-acquirer merchants.",
            },
            {
              label: "Cross-Border Gateway",
              to: "/solutions/cross-border-payment-gateway",
              description: "Secure international acceptance with 3DS and tokens.",
            },
            {
              label: "Developer integrations",
              to: "/developers",
              description: "Hosted checkout, S2S APIs, and webhooks.",
            },
          ]}
        />
        <CtaBanner title="See How It Fits" cta={{ label: "Talk to a Specialist", href: "/contact" }} />
      </CmsHtmlBody>
    </>
  );
}
