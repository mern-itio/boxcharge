import { useState } from "react";
import { PaymentMethodIcon, CurrencyIcon } from "@/components/site/PaymentMethodIcons";

const regions = {
  EU: {
    apms: ["SEPA", "iDEAL", "Bancontact", "Sofort", "GiroPay", "P24"],
    currencies: ["EUR", "GBP", "CHF", "SEK", "NOK", "PLN"],
    lead: "2–4 weeks",
  },
  UK: {
    apms: ["Faster Payments", "Open Banking", "Apple Pay", "Google Pay"],
    currencies: ["GBP", "EUR", "USD"],
    lead: "2–3 weeks",
  },
  MENA: {
    apms: ["mada", "STC Pay", "Apple Pay", "Card networks"],
    currencies: ["AED", "SAR", "EGP", "USD"],
    lead: "3–5 weeks",
  },
  LATAM: {
    apms: ["PIX", "Boleto", "OXXO", "SPEI", "Local cards"],
    currencies: ["BRL", "MXN", "ARS", "COP", "USD"],
    lead: "3–5 weeks",
  },
  APAC: {
    apms: ["UPI", "PayNow", "GrabPay", "Alipay", "WeChat Pay"],
    currencies: ["SGD", "HKD", "INR", "PHP", "USD"],
    lead: "3–4 weeks",
  },
  AU: {
    apms: ["PayID", "PayTo", "BPAY", "Apple Pay", "Google Pay"],
    currencies: ["AUD", "NZD", "USD"],
    lead: "2–3 weeks",
  },
} as const;

type Region = keyof typeof regions;

export function CoverageMap() {
  const [r, setR] = useState<Region>("EU");
  const data = regions[r];
  return (
    <section className="relative py-24">
      <div className="grid-bg absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Coverage
          </div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            <span className="gradient-text">Pick a Region. See What You'd Unlock.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Click a region to see primary local payment methods, supported currencies and typical
            onboarding lead time.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {(Object.keys(regions) as Region[]).map((k) => {
            const active = k === r;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setR(k)}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  active
                    ? "bg-gradient-to-r from-primary to-electric-glow text-primary-foreground shadow-[0_0_24px_-6px_oklch(0.68_0.18_250/0.7)]"
                    : "glass text-foreground/85 hover:text-foreground"
                }`}
                aria-pressed={active}
              >
                {k}
              </button>
            );
          })}
        </div>

        <div key={r} className="reveal-init reveal-fade reveal-in mt-10 grid gap-4 sm:grid-cols-3">
          <div className="glass gradient-border rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Primary APMs
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.apms.map((a) => (
                <span
                  key={a}
                  title={a}
                  className="inline-flex items-center rounded-md border border-border bg-white/95 p-1.5"
                >
                  <PaymentMethodIcon name={a} size="sm" />
                </span>
              ))}
            </div>
          </div>
          <div className="glass gradient-border rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Supported Currencies
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.currencies.map((c) => (
                <span
                  key={c}
                  title={c}
                  className="inline-flex items-center rounded-md border border-border bg-card/50 p-1"
                >
                  <CurrencyIcon code={c} />
                </span>
              ))}
            </div>
          </div>
          <div className="glass gradient-border rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Typical Onboarding
            </div>
            <div className="mt-3 font-display text-3xl font-semibold">
              <span className="gradient-text">{data.lead}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Subject to business profile, jurisdiction and partner review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
