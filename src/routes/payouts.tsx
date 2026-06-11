import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Banknote,
  Globe2,
  Zap,
  Coins,
  Wallet,
  ArrowRight,
  Check,
  Clock,
  Repeat,
} from "lucide-react";
import { buildHead } from "@/components/seo/buildHead";
import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section, FAQAccordion, CtaBanner } from "@/components/site/PageBlocks";

export const Route = createFileRoute("/payouts")({
  head: () =>
    buildHead({
      title: "Global Payouts — One Balance, Many Rails — BoxCharge",
      description:
        "Send payouts to your customers, partners and suppliers worldwide via SEPA, Faster Payments, ACH, PIX, UPI and USDT. One balance, many rails.",
      path: "/payouts",
      keywords: [
        "global payouts",
        "SEPA payout",
        "USDT TRC-20 payout",
        "ACH payout",
        "Faster Payments",
        "cross-border disbursement",
      ],
    }),
  component: PayoutsPage,
});

const rails = [
  { icon: Banknote, name: "SEPA Credit Transfer", region: "Eurozone · 36 SEPA countries", time: "T+1", ccy: "EUR" },
  { icon: Zap, name: "SEPA Instant (SCT Inst)", region: "EUR · 24/7", time: "≤10 sec", ccy: "EUR" },
  { icon: Banknote, name: "Faster Payments", region: "United Kingdom", time: "≤2 hours", ccy: "GBP" },
  { icon: Banknote, name: "ACH", region: "United States", time: "T+1", ccy: "USD" },
  { icon: Zap, name: "PIX", region: "Brazil · 24/7", time: "Instant", ccy: "BRL" },
  { icon: Zap, name: "UPI / IMPS", region: "India · 24/7", time: "Instant", ccy: "INR" },
  { icon: Coins, name: "USDT TRC-20", region: "TRON network", time: "≤1 min", ccy: "USDT" },
  { icon: Coins, name: "USDT ERC-20", region: "Ethereum mainnet", time: "≤5 min", ccy: "USDT" },
];

const lifecycle = [
  { t: "Initiated", b: "Payout request submitted via API or dashboard." },
  { t: "Sanctions screened", b: "Beneficiary screened against OFAC / EU / UN lists." },
  { t: "Funded", b: "Debit from your balance, FX applied if needed." },
  { t: "Rail dispatched", b: "Sent on the cheapest viable rail per beneficiary country." },
  { t: "Confirmed", b: "Webhook fired with rail reference and arrival ETA." },
];

const faq = [
  { q: "Which currencies can I hold a balance in?", a: "EUR, USD, GBP, and USDT are supported core balances. Additional currencies are available on request through partner relationships." },
  { q: "Can I batch payouts?", a: "Yes — submit a CSV or single API call with up to 5,000 beneficiaries per batch. Reconciliation reports are issued per batch." },
  { q: "How is FX handled?", a: "FX is applied at the rate quoted at the moment of payout and shown to you for approval. Mid-market rate + a transparent spread, no hidden margin." },
  { q: "Do you support crypto payouts?", a: "Yes — USDT on TRC-20 and ERC-20 networks. Beneficiary KYC and corridor availability apply." },
];

function PayoutsPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Payouts"
        title="One Balance, Many Rails"
        subtitle="Pay out to customers, suppliers and partners in 60+ countries — via SEPA, Faster Payments, ACH, PIX, UPI and USDT. Fund once, dispatch everywhere."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Payouts", path: "/payouts" },
        ]}
        primaryCta={{ label: "Request Payout Access", href: "/contact" }}
        secondaryCta={{ label: "Talk to a Specialist", href: "/contact" }}
        cmsSlug="payouts"
      />

      <CmsHtmlBody slug="payouts">
      <Section eyebrow="Coverage" title="Supported Payout Rails">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rails.map(({ icon: Icon, name, region, time, ccy }) => (
            <div key={name} className="glass card-lift rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold leading-tight">{name}</div>
                  <div className="text-[11px] text-muted-foreground">{region}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {time}</span>
                <span className="rounded bg-card/60 px-1.5 py-0.5 font-mono">{ccy}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Lifecycle" title="How a Payout Travels">
        <div className="relative grid gap-3 sm:grid-cols-5">
          {lifecycle.map((s, i) => (
            <div key={s.t} className="glass rounded-2xl p-4">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Step {i + 1}</div>
              <div className="mt-1 text-sm font-semibold">{s.t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.b}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Settlement" title="FX &amp; Settlement Currencies">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { c: "EUR", b: "SEPA zone, 27 EU + EFTA partners" },
            { c: "USD", b: "ACH, FedWire, USDT off-ramp" },
            { c: "GBP", b: "Faster Payments, CHAPS" },
            { c: "USDT", b: "TRC-20 / ERC-20" },
          ].map((x) => (
            <div key={x.c} className="glass gradient-border rounded-2xl p-5">
              <div className="font-display text-2xl font-semibold">{x.c}</div>
              <div className="mt-1 text-xs text-muted-foreground">{x.b}</div>
            </div>
          ))}
        </div>
        <ul className="mt-6 grid max-w-3xl gap-2 text-sm">
          {[
            "Mid-market FX rate with a transparent published spread",
            "Auto-fund from your card-acquiring balance, no separate top-up needed",
            "Sanctions screening on every beneficiary",
            "Webhook events per payout state change",
            "Reconciliation reports per batch, per day, and per currency",
          ].map((p) => (
            <li key={p} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="FAQ" title="Payouts FAQ">
        <FAQAccordion items={faq} />
      </Section>

      <CtaBanner
        title="Replace 4 payout tools with one balance"
        body="One contract, one balance, one webhook stream — many rails."
        cta={{ label: "Start a Payout Conversation", href: "/contact" }}
      />
      </CmsHtmlBody>
    </>
  );
}
