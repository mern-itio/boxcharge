import {
  Globe2,
  Network,
  Route,
  Wallet,
  Banknote,
  Code2,
  ShieldCheck,
  Layers,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { CodeTabs, createPaymentSamples } from "@/components/site/CodeTabs";
import { BrandIconRow, PaymentMethodIcon } from "@/components/site/PaymentMethodIcons";
import { SecurityFeatureIcon } from "@/components/site/SecurityFeatureIcons";
import { useContent } from "@/hooks/useContent";
import { cmsList, sectionHeader } from "@/lib/homeCms";
import { solutionCardPath } from "@/lib/internalLinks";

const trust = [
  "Global Merchant Services",
  "Cross-Border Payments",
  "APM Connectivity",
  "Smart Routing",
  "Secure Processing",
  "Developer APIs",
];

export function TrustStrip() {
  return (
    <section className="border-y border-border/60 bg-card/30 py-6">
      <div className="mx-auto max-w-7xl overflow-hidden px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {trust.map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="whitespace-nowrap">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const solutions = [
  { icon: Globe2, title: "Global Merchant Services", body: "Support for international merchant account enablement and acquiring connectivity through trusted payment relationships." },
  { icon: Network, title: "Cross-Border Payment Gateway", body: "Accept and process payments across regions with secure gateway connectivity and multi-currency support." },
  { icon: Route, title: "Payment Orchestration", body: "Route transactions intelligently using cascading logic, multi-acquirer connectivity, and performance-based routing." },
  { icon: Wallet, title: "Alternative Payment Methods", body: "Offer customers more ways to pay through local and regional payment methods across Asia, Africa, Europe, and other expanding corridors." },
  { icon: Banknote, title: "IBAN & Settlement Solutions", body: "Support international collections, settlement flows, and account-based payment operations where available through partner infrastructure." },
  { icon: Code2, title: "Developer-Ready APIs", body: "Integrate using hosted checkout, server-to-server APIs, webhook notifications, and secure transaction flows." },
];

export function Solutions() {
  const { c } = useContent("home");
  const header = sectionHeader(c, "solutions", {
    eyebrow: "Core Solutions",
    title: "Payment Infrastructure for Worldwide Business",
    subtitle:
      "Connect to multiple payment capabilities through one flexible infrastructure layer designed for global merchants, platforms, and digital businesses.",
  });
  const cmsCards = cmsList<{ title?: string; body?: string }>(c, "solutions_cards");
  const cards =
    cmsCards.length > 0
      ? cmsCards.map((card, i) => ({
          icon: solutions[i]?.icon ?? Globe2,
          title: card.title ?? "",
          body: card.body ?? "",
        }))
      : solutions;

  return (
    <section id="solutions" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, body }, i) => {
            const to = solutionCardPath(title);
            const cardClass =
              "group glass gradient-border card-lift relative overflow-hidden rounded-2xl p-6";
            const cardInner = (
              <>
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 ring-1 ring-white/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                {to && (
                  <ArrowRight className="absolute right-5 top-5 h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60" />
                )}
              </>
            );

            return (
              <Reveal key={title} delay={i * 80}>
                {to ? (
                  <Link to={to} className={`block ${cardClass}`}>
                    {cardInner}
                  </Link>
                ) : (
                  <div className={cardClass}>{cardInner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const routingPoints = [
  "Cascading routing",
  "Multi-acquirer connectivity",
  "Smart MDR-based routing",
  "Transaction failover logic",
  "Regional payment optimization",
  "Approval performance monitoring",
  "Lower-cost routing where suitable",
];

export function Routing() {
  const { c } = useContent("home");
  const header = sectionHeader(c, "routing", {
    eyebrow: "Orchestration",
    title: "Convert More Payment Attempts Into Better Outcomes",
    subtitle:
      "BoxCharge uses intelligent routing and cascading payment logic to help reduce unnecessary declines and improve transaction performance.",
  });
  const cmsPoints = cmsList<{ text?: string }>(c, "routing_points");
  const points =
    cmsPoints.length > 0 ? cmsPoints.map((p) => p.text ?? "").filter(Boolean) : routingPoints;

  return (
    <section id="technology" className="relative py-24">
      <div className="grid-bg absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              eyebrow={header.eyebrow}
              title={header.title}
              subtitle={header.subtitle}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-foreground/85">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <RoutingFlow />
        </div>
      </div>
    </section>
  );
}

function RoutingFlow() {
  const Node = ({ title, sub }: { title: string; sub?: string }) => (
    <div className="glass gradient-border rounded-xl px-4 py-3 text-center">
      <div className="text-sm font-medium">{title}</div>
      {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
  return (
    <div className="glass-strong rounded-3xl p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Transaction Flow</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> live
        </span>
      </div>
      <div className="space-y-3">
        <div className="glass gradient-border rounded-xl px-4 py-3 text-center">
          <div className="text-sm font-medium">Customer</div>
          <BrandIconRow
            names={["VISA", "Apple Pay", "SEPA", "PIX"]}
            size="xs"
            className="mt-2 justify-center"
            gap="gap-1"
          />
        </div>
        <Arrow />
        <Node title="BoxCharge Intelligence Layer" sub="Cascading · Smart Routing" />
        <Arrow />
        <div className="grid grid-cols-3 gap-2">
          <Node title="Acquirer A" />
          <Node title="Acquirer B" />
          <Node title="APM" />
        </div>
        <Arrow />
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-center text-sm">
            Successful Processing
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-center text-sm">
            Retry · Failover Route
          </div>
        </div>
      </div>
    </div>
  );
}
function Arrow() {
  return (
    <div className="flex justify-center">
      <div className="h-6 w-px bg-gradient-to-b from-primary/60 to-transparent" />
    </div>
  );
}

const security = [
  "PCI DSS Aligned Infrastructure",
  "3DS Authentication Layer",
  "Advanced Card Tokenization",
  "Fraud Prevention Rules",
  "Velocity Controls",
  "Secure S2S Integration",
  "Transaction Monitoring",
  "Customer Authentication Mechanisms",
];

export function Security() {
  const { c } = useContent("home");
  const header = sectionHeader(c, "security", {
    eyebrow: "Security & Compliance",
    title: "Built With Multi-Layer Transaction Safety",
    subtitle:
      "Security, authentication, and compliance-aware infrastructure are placed at the center of every payment flow.",
  });
  const cmsItems = cmsList<{ text?: string }>(c, "security_items");
  const items =
    cmsItems.length > 0 ? cmsItems.map((x) => x.text ?? "").filter(Boolean) : security;
  const footer = c(
    "security_footer",
    "Designed to support secure payment operations and partner compliance workflows.",
  );

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, i) => (
            <Reveal key={t} delay={i * 60}>
              <div className="glass card-lift rounded-2xl p-5">
                <SecurityFeatureIcon name={t} />
                <div className="mt-3 text-sm font-medium">{t}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </section>
  );
}

const apms = ["SEPA", "iDEAL", "PIX", "UPI", "Bancontact", "Sofort", "Boleto", "OXXO", "Klarna", "P24", "PayID", "GiroPay"];
export function APM() {
  const { c } = useContent("home");
  const header = sectionHeader(c, "apm", {
    eyebrow: "Alternative Payment Methods",
    title: "Local Payment Methods for Global Reach",
    subtitle:
      "Expand payment acceptance with regional APM connectivity across selected markets in Asia, Africa, Europe, and additional corridors as they become available.",
  });
  const cmsMethods = cmsList<{ name?: string }>(c, "apm_methods");
  const methods =
    cmsMethods.length > 0 ? cmsMethods.map((m) => m.name ?? "").filter(Boolean) : apms;
  const footer = c(
    "apm_footer",
    "Coverage depends on merchant profile, region, partner availability, and onboarding review.",
  );

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {methods.map((a) => (
            <div
              key={a}
              className="glass flex flex-col items-center justify-center gap-2 rounded-xl px-4 py-5 transition-colors hover:bg-card/50"
            >
              <PaymentMethodIcon name={a} size="md" />
              <span className="text-[11px] font-medium text-muted-foreground">{a}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">{footer}</p>
      </div>
    </section>
  );
}

const developerChips = [
  "Hosted Checkout",
  "S2S API",
  "Webhooks",
  "Payment Status",
  "Tokenized Card Flow",
  "USDT TRC-20",
  "Pay-out APIs",
];

export function Developers() {
  const { c } = useContent("home");
  const header = sectionHeader(c, "developers", {
    eyebrow: "Developers",
    title: "Built for Fast, Clean Integration",
    subtitle:
      "Hosted Checkout, S2S APIs, webhooks and SDKs in Node, Python, PHP, Java, C#, Go and cURL — copy-paste a working call in your language.",
  });
  const cmsChips = cmsList<{ text?: string }>(c, "developers_chips");
  const chips =
    cmsChips.length > 0 ? cmsChips.map((x) => x.text ?? "").filter(Boolean) : developerChips;

  return (
    <section id="developers" className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              eyebrow={header.eyebrow}
              title={header.title}
              subtitle={header.subtitle}
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span key={chip} className="glass rounded-full px-3 py-1.5 text-xs text-foreground/85">
                  {chip}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-gradient-to-r from-primary to-electric-glow text-primary-foreground">
                <a href="/developers/api-reference">View API Reference <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" className="border-border bg-card/40">
                <a href="/contact">Get Sandbox Access</a>
              </Button>
            </div>
          </div>

          <CodeTabs
            endpoint="POST /api/s2s"
            samples={createPaymentSamples}
          />
        </div>
      </div>
    </section>
  );
}

const why = [
  { icon: Globe2, t: "Global Payment Reach", b: "Reach customers across multiple regions through international payment connectivity." },
  { icon: Route, t: "Smart Transaction Routing", b: "Performance-aware routing that adapts to acquirer and corridor conditions." },
  { icon: Layers, t: "Multi-Payment Connectivity", b: "Cards, wallets, bank transfers and local methods through one integration." },
  { icon: ShieldCheck, t: "Secure Processing Layer", b: "Authentication, tokenization, and monitoring at the core of every flow." },
  { icon: Sparkles, t: "Partner-Led Onboarding", b: "Responsive onboarding and technical coordination during business hours or agreed support windows." },
];

export function Why() {
  const { c } = useContent("home");
  const header = sectionHeader(c, "why", {
    eyebrow: "Why BoxCharge",
    title: "Why Businesses Choose BoxCharge",
    subtitle: "",
  });
  const cmsCards = cmsList<{ title?: string; body?: string }>(c, "why_cards");
  const cards =
    cmsCards.length > 0
      ? cmsCards.map((card, i) => ({
          icon: why[i]?.icon ?? Globe2,
          t: card.title ?? "",
          b: card.body ?? "",
        }))
      : why;

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle || undefined} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(({ icon: Icon, t, b }) => (
            <div key={t} className="glass gradient-border rounded-2xl p-5">
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-3 font-semibold">{t}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const al = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`${al} max-w-2xl`}>
      {eyebrow && (
        <div className={`mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground ${align === "center" ? "" : ""}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
