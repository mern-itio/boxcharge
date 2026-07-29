import { createFileRoute } from "@tanstack/react-router";
import { Globe2, ShieldCheck, Route as RouteIcon, Network, Sparkles } from "lucide-react";
import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section, CapabilityCards, CtaBanner } from "@/components/site/PageBlocks";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { buildHead, serviceSchema } from "@/components/seo/buildHead";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const seo = pageSeoDefaults.about;

export const Route = createFileRoute("/about")({
  loader: () => resolvePageSeo("about", seo),
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData, seo);
    return buildHead({
      ...seoHeadFields(meta),
      path: "/about",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
      ],
      schemas: [
        serviceSchema(
          "BoxCharge Payment Infrastructure",
          "Global payment infrastructure and merchant enablement.",
          "/about",
        ),
      ],
    });
  },
  component: AboutPage,
});

const focus = [
  { title: "Cross-Border Payments", body: "Accept and process payments across multiple regions with secure gateway connectivity." },
  { title: "Merchant Enablement", body: "International merchant account enablement through trusted payment relationships." },
  { title: "Payment Orchestration", body: "Cascading logic, multi-acquirer connectivity, and performance-aware routing." },
  { title: "Secure Infrastructure", body: "Authentication, tokenization, monitoring, and compliance-aware foundations." },
  { title: "Developer Connectivity", body: "Hosted checkout, S2S APIs, webhooks, and integration-ready flows." },
];

const why = [
  { icon: RouteIcon, t: "Intelligent Routing", b: "Performance-aware routing across acquirers and corridors." },
  { icon: Network, t: "Payment Connectivity", b: "Cards, wallets, bank transfers, and local methods through one layer." },
  { icon: ShieldCheck, t: "Security Layer", b: "3DS, tokenization, fraud rules, and transaction monitoring." },
  { icon: Globe2, t: "APM Reach", b: "Regional alternative payment methods across multiple corridors." },
  { icon: Sparkles, t: "Partner-Led Onboarding", b: "Structured onboarding aligned with partner and compliance requirements." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About BoxCharge"
        title="Building Smarter Payment Infrastructure"
        subtitle="BoxCharge supports global businesses through merchant services, payment gateway connectivity, intelligent routing and secure transaction infrastructure."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
        primaryCta={{ label: "Start a Conversation", href: "/contact" }}
        cmsSlug="about"
      />

      <CmsHtmlBody slug="about">
      <CounterBand />

      <Section eyebrow="Why we exist" title="Built because merchants deserve better">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground lg:col-span-2">
            <p>
              BoxCharge was started by people who spent years on the merchant side of payments —
              chasing acquirers across borders, watching good transactions decline for no good reason,
              and reconciling settlements that arrived in five different formats.
            </p>
            <p>
              We built BoxCharge so businesses could stop assembling their own payment stack out of
              spare parts. One integration, many acquirers, every major payment method, and a team
              that actually owns the banking complexity so your team can own the growth.
            </p>
            <p className="text-foreground/90">
              <strong>We stand for our merchants.</strong> When a transaction fails, our routing
              retries it. When an acquirer changes terms, we find the next one. When a corridor
              opens, you&apos;re already connected.
            </p>
          </div>
          <div className="glass gradient-border rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-primary">Our promise to merchants</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2"><span className="text-primary">✓</span><span><strong>Transparency.</strong> No hidden routing, no surprise holds.</span></li>
              <li className="flex gap-2"><span className="text-primary">✓</span><span><strong>One dedicated specialist</strong> from day one through go-live.</span></li>
              <li className="flex gap-2"><span className="text-primary">✓</span><span><strong>We own the banking partnerships</strong> — you focus on your business.</span></li>
              <li className="flex gap-2"><span className="text-primary">✓</span><span><strong>Honest answers,</strong> even when a corridor isn&apos;t ready yet.</span></li>
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Built for merchants like you" title="Real journeys, anonymized">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { t: "SaaS scaling into APAC", b: "A European SaaS team wanted to accept PayNow, GrabPay and local cards across Singapore and Hong Kong without spinning up a regional entity. We placed them with the right APAC acquirer and switched on three APMs in under three weeks." },
            { t: "Travel agency consolidating 4 PSPs", b: "A MENA-based travel platform was juggling four PSPs and four reconciliation files. They moved everything behind one orchestration layer — same conversion, half the operational load, one settlement view." },
            { t: "B2B subscription moving to SEPA", b: "A UK B2B subscription business was losing 6% of monthly invoices to failed card payments. We routed European customers to SEPA Direct Debit with dedicated IBANs — failure rate dropped below 1%." },
          ].map((c) => (
            <div key={c.t} className="glass gradient-border rounded-2xl p-6">
              <div className="font-semibold">{c.t}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Core Focus" title="Where BoxCharge Operates">
        <CapabilityCards items={focus} />
      </Section>

      <Section eyebrow="Why BoxCharge" title="What Sets the Platform Apart">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {why.map(({ icon: Icon, t, b }) => (
            <div key={t} className="glass gradient-border rounded-2xl p-5">
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-3 font-semibold">{t}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <RelatedLinks
        title="Explore BoxCharge solutions"
        subtitle="See how merchant services, orchestration, and settlement fit together."
        items={[
          {
            label: "Global Merchant Services",
            to: "/solutions/global-merchant-services",
            description: "International merchant accounts and multi-currency acquiring.",
          },
          {
            label: "Payment Orchestration",
            to: "/solutions/payment-orchestration",
            description: "Smart routing and cascading across acquiring partners.",
          },
          {
            label: "Insights & guides",
            to: "/blog",
            description: "Practical articles on payments, merchant accounts, and settlement.",
          },
        ]}
      />

      <CtaBanner
        title="Start Your Payment Discussion"
        body="Talk to the BoxCharge team about your payment requirements."
        cta={{ label: "Contact Us", href: "/contact" }}
      />
      </CmsHtmlBody>
    </>
  );
}

const counters = [
  { value: 65, suffix: "+", label: "Business Segments Supported" },
  { value: 70, suffix: "+", label: "Acquiring & APM Partners" },
  { value: 180, suffix: "+", label: "Countries Reached" },
  { value: 99.99, suffix: "%", label: "Platform Uptime Target", decimals: 2 },
];

function CounterBand() {
  return (
    <section className="border-y border-border/60 bg-card/30 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {counters.map((c) => (
            <div key={c.label} className="text-center">
              <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                <AnimatedCounter
                  value={c.value}
                  decimals={c.decimals ?? 0}
                  className="gradient-text"
                />
                <span className="text-accent">{c.suffix}</span>
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
