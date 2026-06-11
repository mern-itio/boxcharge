import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { BrandIconRow } from "@/components/site/PaymentMethodIcons";

const payin = [
  {
    t: "Cards",
    b: "Global card acceptance with 3DS2 and tokenisation.",
    brands: ["VISA", "Mastercard", "AMEX", "JCB", "Diners", "UnionPay"],
  },
  {
    t: "Wallets & APMs",
    b: "One-click wallets and regional alternative payment methods.",
    brands: ["Apple Pay", "Google Pay", "PayPal", "GrabPay", "PayNow", "WeChat Pay", "Alipay"],
  },
  {
    t: "Bank rails",
    b: "Account-to-account and local bank transfer schemes.",
    brands: ["SEPA", "PIX", "iDEAL", "Bancontact", "Klarna", "GiroPay"],
  },
  {
    t: "Crypto",
    b: "USDT on TRC-20 / ERC-20 with auto-conversion.",
    brands: ["USDT"],
  },
];

const payout = [
  {
    t: "SEPA payouts",
    b: "SCT and SCT Inst across 36 SEPA-zone countries.",
    brands: ["SEPA"],
  },
  {
    t: "Local rails",
    b: "Faster Payments UK, ACH US, PIX BR, UPI IN, and more.",
    brands: ["SEPA", "PIX", "iDEAL", "P24"],
  },
  {
    t: "Wallet disbursements",
    b: "Pay suppliers, contractors and customers to local wallets.",
    brands: ["PayPal", "GrabPay", "Apple Pay", "Google Pay"],
  },
  {
    t: "Crypto payouts",
    b: "USDT TRC-20 / ERC-20 disbursements with on-chain receipts.",
    brands: ["USDT"],
  },
];

export function PayinPayoutExplainer() {
  return (
    <section className="relative py-24">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Pay-in & Pay-out
          </div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            <span className="gradient-text">One platform for collections and disbursements</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Most providers do one side well. BoxCharge handles both — collect from your customers
            (pay-in) and send money to suppliers, partners or customers (pay-out) through the same
            settlement balance.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass gradient-border h-full rounded-2xl p-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <ArrowDownToLine className="h-3.5 w-3.5" /> Collection · Pay-in
              </div>
              <h3 className="text-xl font-semibold">Accept money from your customers</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Cards, wallets, bank transfers and crypto — auto-localised at checkout, secured by
                3DS2 and tokenisation, settled into your BoxCharge balance.
              </p>
              <ul className="mt-5 space-y-4 text-sm">
                {payin.map(({ t, b, brands }) => (
                  <li key={t}>
                    <strong className="text-foreground/90">{t}</strong>
                    <p className="mt-1 text-muted-foreground">{b}</p>
                    <BrandIconRow names={brands} size="sm" className="mt-2" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass gradient-border h-full rounded-2xl p-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                <ArrowUpFromLine className="h-3.5 w-3.5" /> Disbursement · Pay-out
              </div>
              <h3 className="text-xl font-semibold">Send money where it needs to go</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                One balance, many rails. Pay your suppliers, contractors or customers across borders
                without juggling four banking portals.
              </p>
              <ul className="mt-5 space-y-4 text-sm">
                {payout.map(({ t, b, brands }) => (
                  <li key={t}>
                    <strong className="text-foreground/90">{t}</strong>
                    <p className="mt-1 text-muted-foreground">{b}</p>
                    <BrandIconRow names={brands} size="sm" className="mt-2" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
          Onshore, offshore and cross-border merchant accounts — orchestrated through one API.
        </p>
      </div>
    </section>
  );
}
