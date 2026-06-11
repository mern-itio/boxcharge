import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { cmsList } from "@/lib/homeCms";

const baseFaqs = [
  { q: "What does BoxCharge provide?", a: "BoxCharge provides global merchant services, payment gateway connectivity, payment orchestration, APM access, IBAN & SEPA settlement, payouts and developer-friendly payment infrastructure." },
  { q: "Can any business apply?", a: "Legitimate businesses operating under applicable laws may apply. We work with a wide network of acquiring and banking partners worldwide, so most viable business models can be placed — availability depends on jurisdiction, documentation and partner review." },
  { q: "Do you provide instant approval?", a: "No. Applications are reviewed through onboarding and compliance checks before activation — typically 7–21 business days." },
  { q: "Do you support local payment methods?", a: "Yes — 40+ APMs including SEPA, iDEAL, PIX, UPI, Bancontact, GrabPay, PayNow, WeChat Pay, Alipay and USDT TRC-20, with coverage depending on market and partner availability." },
  { q: "Is the platform developer-friendly?", a: "Yes — API-based integration, hosted checkout, S2S flows, webhook notifications and SDKs in Node, Python, PHP, Java, C#, Go and cURL." },
  { q: "Is payment processing real-time?", a: "Transaction processing and payment status flows are designed for real-time operations, subject to network and partner processing conditions." },
];

const industryFaqs: Record<string, { q: string; a: string }[]> = {
  SaaS: [
    { q: "Do you support subscription / recurring billing?", a: "Yes. Network tokens are vaulted on first purchase and reused for recurring charges, with automatic retries on soft declines." },
    { q: "Can I issue prorated refunds via API?", a: "Yes — partial and full refunds are supported via REST and webhooks." },
    { q: "Do you handle dunning?", a: "We surface decline reasons + recovery suggestions; dunning logic stays in your billing system." },
    { q: "Can I localise pricing per country?", a: "Yes — multi-currency presentment with auto-FX, or hold separate price books per region." },
  ],
  Travel: [
    { q: "Do you support delayed capture / auth-only?", a: "Yes — authorise at booking, capture on departure or itinerary confirmation." },
    { q: "Can I split payments across multiple suppliers?", a: "Yes — split-payout flows route a single customer charge to multiple beneficiaries." },
    { q: "Are 3DS exemptions available for low-risk bookings?", a: "Yes — low-value and trusted-beneficiary exemptions are applied where the issuer allows." },
    { q: "Do you support multi-currency settlement?", a: "Yes — settle in EUR, USD, GBP and more through partner banking relationships." },
  ],
  "E-commerce": [
    { q: "How do you reduce cart abandonment?", a: "Localised methods, one-click tokenised re-orders, Apple/Google Pay, and a checkout that auto-detects buyer country." },
    { q: "Do you support marketplaces with sub-merchants?", a: "Yes — split settlement, KYB on sub-merchants and per-merchant reporting." },
    { q: "How are chargebacks handled?", a: "Realtime chargeback webhooks + evidence-upload via dashboard or API; representment within issuer windows." },
  ],
  B2B: [
    { q: "Can I invoice in EUR and accept SEPA?", a: "Yes — issue per-invoice virtual IBANs for clean reconciliation; SCT and SCT Inst supported." },
    { q: "Do you support purchase orders / Net-30?", a: "We integrate with leading B2B BNPL partners and let you collect on the due date via SEPA Direct Debit." },
    { q: "Can payments come from multiple buyer entities?", a: "Yes — multi-payer reconciliation against a single invoice is supported." },
  ],
  Marketplaces: [
    { q: "Do you support split payments?", a: "Yes — a single buyer charge can be split across multiple seller payouts with separate fees." },
    { q: "What about seller onboarding (KYB)?", a: "We coordinate KYB on each seller via partner banking infrastructure." },
    { q: "Are payouts per seller or pooled?", a: "Either — per-seller direct payout, or pooled then disbursed." },
  ],
  "Crypto-adjacent": [
    { q: "Can I accept USDT for fiat-priced orders?", a: "Yes — USDT TRC-20 / ERC-20 with auto-conversion to your settlement currency." },
    { q: "Do you handle on/off-ramp?", a: "Through licensed partners — coverage depends on jurisdiction and beneficiary KYC." },
    { q: "Is fiat-out via SEPA available?", a: "Yes — convert and settle in EUR to your IBAN, T+0 via SCT Inst where supported." },
  ],
};

const TABS = ["General", ...Object.keys(industryFaqs)] as const;

export function FAQ() {
  const { c } = useContent("home");
  const cmsRows = cmsList<{ q?: string; a?: string }>(c, "faq_items");
  const cmsFaqs = cmsRows.length
    ? cmsRows.map((r) => ({ q: r.q ?? "", a: r.a ?? "" })).filter((r) => r.q && r.a)
    : baseFaqs;

  const [tab, setTab] = useState<(typeof TABS)[number]>("General");
  const [open, setOpen] = useState<string | null>("General::0");
  const items = tab === "General" ? cmsFaqs : industryFaqs[tab];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> FAQ
          </div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            <span className="gradient-text">Common Questions</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Pick your industry for tailored answers — or browse the generic set.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setOpen(`${t}::0`);
                }}
                className={`rounded-full border px-3 py-1.5 text-[12px] font-medium transition ${
                  active
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          {items.map((f, i) => {
            const key = `${tab}::${i}`;
            const isOpen = open === key;
            return (
              <div key={key} className="glass rounded-2xl">
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : key)}
                >
                  <span className="font-medium">{f.q}</span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 text-primary" />
                  ) : (
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
