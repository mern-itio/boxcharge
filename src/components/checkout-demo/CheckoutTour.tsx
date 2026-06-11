import { useEffect, useMemo, useRef, useState } from "react";
import { RealQR } from "@/components/site/RealQR";
import { BrandIcon, BrandIconRow, CardNetworkIcon } from "@/components/site/PaymentMethodIcons";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Copy,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  CreditCard,
  Check,
  Download,
  Share2,
  ExternalLink,
  FileText,
  Receipt,
  Repeat,
  X,
  KeyRound,
  Fingerprint,
  Gauge,
} from "lucide-react";

type Scene = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const ORDER_REF = "MRC-INV-78291";
const APM_REF = "MRC-INV-78292";
const TXN_REF = "BCHG-TXN-2026-10482";
const USDT_ADDRESS = "TJRabPrwbZy45sbavfcjinPJC18kjpRTv8";

const SCENES: { key: Scene; label: string; url: string; duration: number; caption: string }[] = [
  { key: 0, label: "Methods",  url: `checkout.boxchrge.com/pay/${ORDER_REF.toLowerCase()}`,             duration: 6500,
    caption: "One checkout. 40+ payment methods. Auto-localised per buyer." },
  { key: 1, label: "Card",     url: `checkout.boxchrge.com/pay/${ORDER_REF.toLowerCase()}/card`,        duration: 7000,
    caption: "PCI-DSS aligned, 3DS2 ready, branded as your merchant." },
  { key: 2, label: "Secure",   url: `secure.boxchrge.com/verify/${TXN_REF.toLowerCase()}`,              duration: 4500,
    caption: "Every payment passes tokenisation, 3DS, fraud and velocity checks — in under a second." },
  { key: 3, label: "Routing",  url: `router.boxchrge.com/route/${TXN_REF.toLowerCase()}`,               duration: 5000,
    caption: "Smart routing with cascading fallback — soft declines recovered automatically." },
  { key: 4, label: "3DS",      url: `secure.boxchrge.com/3ds/${TXN_REF.toLowerCase()}`,                 duration: 7000,
    caption: "Issuer-grade authentication — zero extra integration on your side." },
  { key: 5, label: "Success",  url: `checkout.boxchrge.com/pay/${ORDER_REF.toLowerCase()}/success`,     duration: 6500,
    caption: "Instant confirmation. Auto-invoicing. Webhooks fired. Card tokenised for next time." },
  { key: 6, label: "GrabPay",  url: `checkout.boxchrge.com/pay/${APM_REF.toLowerCase()}/grabpay`,       duration: 6000,
    caption: "Live QR for SE Asia wallets — settled in your store currency." },
  { key: 7, label: "WeChat",   url: `checkout.boxchrge.com/pay/${APM_REF.toLowerCase()}/wechat`,        duration: 6000,
    caption: "Capture Chinese buyers without a CN entity." },
  { key: 8, label: "USDT",     url: `checkout.boxchrge.com/pay/${APM_REF.toLowerCase()}/usdt-trc20`,    duration: 7000,
    caption: "Crypto rails — accept USDT on TRC-20 with auto-conversion to your settlement currency." },
];

export function CheckoutTour() {
  const [scene, setScene] = useState<Scene>(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    const cur = SCENES[scene];
    timerRef.current = setTimeout(() => {
      setScene((s) => ((s + 1) % SCENES.length) as Scene);
    }, cur.duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scene, paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setScene((s) => ((s + 1) % SCENES.length) as Scene);
      if (e.key === "ArrowLeft") setScene((s) => ((s - 1 + SCENES.length) % SCENES.length) as Scene);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = SCENES[scene];

  return (
    <section id="checkout-tour" className="relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[560px] max-w-5xl -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live Checkout Preview
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="gradient-text">What Your Customers See at Checkout</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A polished, multi-method checkout flow — cards, secure-layer checks, smart routing, 3DS, wallets and APMs — built into every BoxCharge integration.
          </p>
        </div>

        <div
          className="group relative mx-auto mt-12 max-w-6xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="gradient-border overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_30px_120px_-30px_oklch(0.68_0.18_250/0.45)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-border/60 bg-background/60 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="ml-3 flex-1 truncate rounded-md border border-border bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
                <Lock className="mr-1.5 inline h-3 w-3 text-emerald-400" />
                {current.url}
              </div>
              <div className="hidden text-[10px] text-muted-foreground sm:block">
                PCI-DSS aligned · 3DS2 · SSL
              </div>
            </div>

            <div key={scene} className="ct-scene relative bg-background/40 text-foreground">
              <TopBanner scene={scene} />

              {scene === 2 ? (
                <SceneSecureLayer />
              ) : scene === 3 ? (
                <SceneSmartRouting />
              ) : scene === 4 ? (
                <Scene3DS />
              ) : (
                <div className="grid gap-5 px-5 pb-6 md:grid-cols-[1.05fr_1.4fr] md:px-7 md:pb-8">
                  <LeftSummary scene={scene} />
                  <div>
                    {scene === 0 && <SceneMethods />}
                    {scene === 1 && <SceneCardForm />}
                    {scene === 5 && <SceneSuccess />}
                    {scene === 6 && <SceneQR provider="GrabPay" amount="$1,314.00" payload={`grabpay://pay?merchant=BoxCharge&ref=${APM_REF}&amount=1314.00&ccy=USD`} />}
                    {scene === 7 && <SceneQR provider="WeChat Pay" amount="$1,314.00" payload={`weixin://wxpay/bizpayurl?pr=BoxCharge_${APM_REF}_1314_USD`} />}
                    {scene === 8 && <SceneUSDT />}
                  </div>
                </div>
              )}

              <TrustStrip />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous scene"
              onClick={() => setScene((s) => ((s - 1 + SCENES.length) % SCENES.length) as Scene)}
              className="rounded-full border border-border bg-card/50 p-2 text-muted-foreground transition hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              {SCENES.map((s) => {
                const active = s.key === scene;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setScene(s.key)}
                    className="group/dot flex flex-col items-center gap-1.5"
                    aria-label={`Go to ${s.label}`}
                  >
                    <span
                      className={`relative h-1.5 overflow-hidden rounded-full transition-all ${
                        active ? "w-10 bg-border" : "w-1.5 bg-border group-hover/dot:bg-foreground/40"
                      }`}
                    >
                      {active && (
                        <span
                          key={`${scene}-${paused}`}
                          className="co-progress absolute inset-0 block rounded-full bg-gradient-to-r from-primary to-electric-glow"
                          style={{
                            animationDuration: `${current.duration}ms`,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                        />
                      )}
                    </span>
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wider transition ${
                        active ? "text-foreground" : "text-muted-foreground/60"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next scene"
              onClick={() => setScene((s) => ((s + 1) % SCENES.length) as Scene)}
              className="rounded-full border border-border bg-card/50 p-2 text-muted-foreground transition hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 text-center">
            <p key={`cap-${scene}`} className="ct-fade mx-auto max-w-xl text-sm italic text-muted-foreground">
              {current.caption}
            </p>
          </div>

          <div className="mt-5 flex justify-center">
            <Link
              to="/contact"
              className="group/cta inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_24px_-6px_oklch(0.68_0.18_250/0.6)]"
            >
              Want this checkout on your store? Talk to our team
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Sub views -------------------------------- */

function TopBanner({ scene }: { scene: Scene }) {
  const isApm = scene === 6 || scene === 7;
  return (
    <div className="px-5 pt-5 md:px-7 md:pt-7">
      <div
        className={`relative overflow-hidden rounded-2xl border border-border/60 ${
          isApm
            ? "bg-gradient-to-r from-ember/10 via-card/40 to-primary/10"
            : "bg-gradient-to-r from-primary/10 via-card/40 to-ember/10"
        } p-4 md:p-5`}
      >
        <div className="flex items-center justify-center gap-2 text-center text-[13px] font-medium md:text-sm">
          {isApm ? (
            <span className="text-ember">Scan to pay — settled in your store currency</span>
          ) : (
            <span className="text-primary">Secure checkout powered by BoxCharge</span>
          )}
        </div>
        <div className="mt-2 flex items-center justify-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-navy-deep ring-1 ring-primary/40 text-[10px] font-bold text-primary">
            BC
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
              Premium Business Software — Annual
            </div>
            <div className="text-[11px] text-muted-foreground">
              nimbus.co <ExternalLink className="ml-0.5 inline h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card/60 p-5 shadow-[0_10px_40px_-20px_oklch(0.68_0.18_250/0.35)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

function LeftSummary({ scene }: { scene: Scene }) {
  const isSuccess = scene === 5;
  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-foreground">
            {isSuccess ? <Receipt className="h-4 w-4 text-foreground/80" /> : <FileText className="h-4 w-4 text-foreground/80" />}
            <h3 className="font-display text-[15px] font-semibold tracking-tight">
              {isSuccess ? "Your purchase breakdown" : "Transaction summary"}
            </h3>
          </div>
          <div className="flex gap-1.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-background/50 text-muted-foreground">
              <Download className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-b border-border/40 pb-3 text-[12px]">
          <span className="text-muted-foreground">Order ID</span>
          <span className="flex items-center gap-1.5 font-mono text-foreground/85">
            {scene >= 6 ? APM_REF : ORDER_REF}
            <Copy className="h-3 w-3 text-muted-foreground" />
          </span>
        </div>

        {isSuccess && (
          <div className="flex items-center justify-between border-b border-border/40 py-3 text-[12px]">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="flex items-center gap-1.5 font-mono text-foreground/85">
              {TXN_REF}
              <Copy className="h-3 w-3 text-muted-foreground" />
            </span>
          </div>
        )}

        <div className="mt-3 space-y-2 text-[13px]">
          <Row label="Premium Business Software · Annual" value="$1,200.00" bold />
          <Row label="Tax (8%)" value="$96.00" />
          <Row label="Network fee" value="$18.00" />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-[14px]">
          <span className="flex items-center gap-1.5 font-semibold text-foreground">
            <Lock className="h-3.5 w-3.5" /> Total
          </span>
          <span className="font-display text-[18px] font-semibold text-foreground">$1,314.00</span>
        </div>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[15px] font-semibold tracking-tight text-foreground">Customer Details</h3>
        </div>
        <div className="mt-3 space-y-2.5 text-[12.5px] text-foreground/80">
          <div className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-background/50 text-muted-foreground"><User className="h-3 w-3" /></span> Daniel Carter</div>
          <div className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-background/50 text-muted-foreground"><Mail className="h-3 w-3" /></span> daniel.carter@example.com</div>
          <div className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-background/50 text-muted-foreground"><Phone className="h-3 w-3" /></span> +44 7700 900128</div>
          <div className="flex items-start gap-2"><span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-background/50 text-muted-foreground"><MapPin className="h-3 w-3" /></span> 22 Bishopsgate, London EC2N 4BQ, United Kingdom</div>
        </div>
      </Panel>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-medium text-foreground/85" : "text-muted-foreground"}>{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

/* ------------------------------- Scene: Methods ------------------------------ */

function SceneMethods() {
  const wallets = [
    { name: "GrabPay" },
    { name: "Alipay" },
    { name: "WeChat Pay" },
    { name: "ShopeePay" },
    { name: "PayNow" },
    { name: "Apple Pay" },
  ];
  return (
    <Panel>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[15px] font-semibold tracking-tight text-foreground">Select Payment Method</h3>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-[12px] font-medium uppercase tracking-wider text-muted-foreground">Cards</div>
        <div className="co-pulse flex items-center gap-3 rounded-xl border-2 border-primary/50 bg-primary/10 p-3">
          <div className="flex h-9 w-14 items-center justify-center rounded-md bg-white/95 px-1.5">
            <CardNetworkIcon name="VISA" size="sm" />
          </div>
          <div className="flex-1">
            <div className="text-[13.5px] font-semibold text-foreground">Credit or debit card</div>
            <BrandIconRow
              names={["VISA", "Mastercard", "AMEX", "UnionPay"]}
              size="xs"
              className="mt-1"
              gap="gap-1"
            />
            <div className="mt-1 text-[10.5px] text-muted-foreground">3DS2 secured</div>
          </div>
          <ChevronRight className="h-4 w-4 text-primary" />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 text-[12px] font-medium uppercase tracking-wider text-muted-foreground">Digital Wallets &amp; APMs</div>
        <div className="grid grid-cols-2 gap-2.5">
          {wallets.map((w, i) => (
            <div
              key={w.name}
              className="ct-rise flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/40 p-2.5"
              style={{ animationDelay: `${250 + i * 90}ms` }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/90 px-1">
                <BrandIcon name={w.name} size="sm" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold text-foreground">{w.name}</div>
                <div className="truncate text-[10.5px] text-muted-foreground">Pay with {w.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-[12px] text-emerald-200">
        <ShieldCheck className="h-4 w-4 text-emerald-300" />
        <div>
          <div className="font-semibold">Tokenised &amp; fraud-scored</div>
          <div className="text-[11px] text-emerald-200/80">Card details are never stored on your servers.</div>
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------ Scene: Card form ----------------------------- */

function SceneCardForm() {
  return (
    <Panel>
      <button className="mb-3 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Go back to payment methods
      </button>

      <div className="flex items-center gap-3">
        <div className="flex h-8 w-12 items-center justify-center rounded-md bg-white/95 px-1">
          <CardNetworkIcon name="VISA" size="sm" />
        </div>
        <div>
          <div className="text-[14px] font-semibold text-foreground">Credit or debit card</div>
          <div className="text-[11px] text-muted-foreground">3DS2 secured · tokenised at submit</div>
        </div>
      </div>

      <div className="mt-5 space-y-3.5">
        <Field label="Card Number" hint="We never store card details.">
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2.5">
            <span className="ct-type font-mono text-[14px] tracking-wider text-foreground">4111 1111 1111 1111</span>
            <span className="flex h-5 w-9 items-center justify-center rounded bg-white/95 px-0.5">
              <CardNetworkIcon name="VISA" size="xs" />
            </span>
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Expiry Date" hint="MM/YY">
            <div className="rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 font-mono text-[14px] text-foreground">
              <span className="ct-type" style={{ animationDelay: "600ms" }}>01/30</span>
            </div>
          </Field>
          <Field label="CVV" hint="3–4 digits">
            <div className="rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 font-mono text-[16px] tracking-widest text-foreground">
              <span className="ct-type" style={{ animationDelay: "900ms" }}>•••</span>
            </div>
          </Field>
        </div>

        <Field label="Cardholder Name" hint="As shown on card">
          <div className="rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 text-[13.5px] text-foreground">
            <span className="ct-type" style={{ animationDelay: "1200ms" }}>Daniel Carter</span>
          </div>
        </Field>

        <button className="ct-rise mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-electric-glow py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.68_0.18_250/0.7)]" style={{ animationDelay: "1500ms" }}>
          <Lock className="h-4 w-4" />
          Pay $1,314.00 securely
        </button>
      </div>
    </Panel>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
      {hint && <div className="mt-1 text-[10.5px] text-muted-foreground/70">{hint}</div>}
    </div>
  );
}

/* ----------------------- Scene: Secure Layer Check --------------------------- */

function SceneSecureLayer() {
  const checks = [
    { icon: KeyRound, label: "Tokenisation", detail: "Card replaced with single-use network token" },
    { icon: ShieldCheck, label: "3DS2", detail: "Issuer authentication — frictionless flow" },
    { icon: Fingerprint, label: "Fraud rules", detail: "Device, geo and behavioural signals scored" },
    { icon: Gauge, label: "Velocity controls", detail: "Per-card, per-IP, per-merchant thresholds" },
  ];
  return (
    <div className="px-5 pb-8 pt-2 md:px-7">
      <div className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card/60 p-6 shadow-[0_20px_60px_-20px_oklch(0.68_0.18_250/0.45)] backdrop-blur">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
            Securing your payment
          </h3>
          <p className="mt-1 text-[12px] text-muted-foreground">
            BoxCharge runs four secure-layer checks before any acquirer sees the card.
          </p>
        </div>

        <div className="mt-5 space-y-2.5">
          {checks.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="co-secure-tick flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3"
                style={{ animationDelay: `${200 + i * 750}ms` }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/15 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-foreground">{c.label}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{c.detail}</div>
                </div>
                <span
                  className="co-secure-check grid h-7 w-7 place-items-center rounded-full bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/40"
                  style={{ animationDelay: `${600 + i * 750}ms` }}
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-center text-[12px] text-emerald-200">
          All checks passed in <strong>620 ms</strong> — routing to acquirer…
        </div>
      </div>
    </div>
  );
}

/* ----------------------- Scene: Smart Routing -------------------------------- */

function SceneSmartRouting() {
  return (
    <div className="px-5 pb-8 pt-2 md:px-7">
      <div className="mx-auto max-w-xl rounded-2xl border border-border/60 bg-card/60 p-6 shadow-[0_20px_60px_-20px_oklch(0.68_0.18_250/0.45)] backdrop-blur">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
            <Repeat className="h-6 w-6" />
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
            Smart routing in action
          </h3>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Soft decline on primary acquirer → automatic cascade to fallback within 800 ms.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-white/95 px-1">
              <CardNetworkIcon name="VISA" size="sm" />
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground co-cascade-arrow" />
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2">
              <div className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
                <Repeat className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-foreground">BoxCharge Smart Router</div>
                <div className="text-[10px] text-muted-foreground">Evaluating route · MCC SaaS · region EU</div>
              </div>
            </div>
          </div>

          <div
            className="co-secure-tick flex items-center justify-between rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2.5"
            style={{ animationDelay: "600ms" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-destructive/30 text-destructive-foreground ring-1 ring-destructive/50">
                <X className="h-4 w-4" strokeWidth={3} />
              </span>
              <div>
                <div className="text-[13px] font-semibold text-foreground">Acquirer A · primary</div>
                <div className="text-[11px] text-destructive-foreground/90">Soft decline · code 05 (Do not honour)</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-destructive-foreground/90">312 ms</span>
          </div>

          <div
            className="co-secure-tick flex items-center justify-center gap-2 text-[11px] text-primary"
            style={{ animationDelay: "1500ms" }}
          >
            <Repeat className="h-3.5 w-3.5" />
            <span>Cascading to fallback in 480 ms…</span>
          </div>

          <div
            className="co-secure-tick flex items-center justify-between rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2.5"
            style={{ animationDelay: "2400ms" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/40">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <div>
                <div className="text-[13px] font-semibold text-foreground">Acquirer B · fallback</div>
                <div className="text-[11px] text-emerald-300">Approved · auth code 8AB221</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-300">418 ms</span>
          </div>
        </div>

        <div
          className="co-secure-tick mt-4 rounded-xl border border-border/50 bg-background/40 p-3 text-center text-[12px] text-foreground/80"
          style={{ animationDelay: "3000ms" }}
        >
          Recovered automatically — without this, the buyer would have seen a failure.
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Scene: 3DS -------------------------------- */

function Scene3DS() {
  const otp = useMemo(() => "123456".split(""), []);
  return (
    <div className="px-5 pb-8 pt-2 md:px-7">
      <div className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card/60 p-6 shadow-[0_20px_60px_-20px_oklch(0.68_0.18_250/0.45)] backdrop-blur">
        <button className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <span className="grid h-7 w-7 place-items-center rounded bg-primary/15 text-primary"><CreditCard className="h-3.5 w-3.5" /></span>
            Barclays Bank UK
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Verified by</span>
            <CardNetworkIcon name="VISA" size="sm" />
          </div>
        </div>

        <h3 className="text-center font-display text-xl font-semibold tracking-tight text-foreground">
          Cardholder Authentication
        </h3>
        <p className="mt-1 text-center text-[12px] leading-relaxed text-muted-foreground">
          Please verify your transaction by entering the One-Time Password (OTP) sent to your registered mobile ending ****128.
        </p>

        <div className="mt-4 rounded-xl border border-border/50 bg-background/40 p-3.5 text-[12px]">
          <Row3DS k="Card:" v="4111****1111" />
          <Row3DS k="Product:" v="Premium Business Software" />
          <Row3DS k="Bill amount:" v="USD 1,314.00" valueClass="font-semibold text-foreground" />
          <Row3DS k="Transaction ID:" v={TXN_REF} />
        </div>

        <div className="mt-5">
          <div className="mb-2 text-[12px] font-semibold text-foreground/85">Enter OTP</div>
          <div className="flex justify-center gap-2">
            {otp.map((d, i) => (
              <div
                key={i}
                className="co-otp grid h-11 w-9 place-items-center rounded-lg border border-border/60 bg-background/50 font-mono text-[16px] font-semibold text-foreground shadow-sm"
                style={{ animationDelay: `${300 + i * 220}ms` }}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="mt-2 text-center text-[11px] text-muted-foreground">OTP expires in <span className="font-semibold text-foreground/85">04:55</span></div>
        </div>

        <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-primary to-electric-glow py-2.5 text-sm font-semibold text-primary-foreground">
          Submit
        </button>
      </div>
    </div>
  );
}

function Row3DS({ k, v, valueClass }: { k: string; v: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-muted-foreground">{k}</span>
      <span className={`font-mono text-foreground/80 ${valueClass ?? ""}`}>{v}</span>
    </div>
  );
}

/* ------------------------------- Scene: Success ------------------------------ */

function SceneSuccess() {
  return (
    <div className="relative space-y-4 overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 shadow-[0_20px_60px_-20px_oklch(0.68_0.18_250/0.45)] backdrop-blur">
      <Confetti />
      <div className="co-success relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/90 to-emerald-700/90 p-6 text-center text-white ring-1 ring-emerald-400/30">
        <div className="relative mx-auto mb-3 grid h-14 w-14 place-items-center">
          <span className="co-ripple absolute inset-0 rounded-full bg-white/40" />
          <span className="co-ripple absolute inset-0 rounded-full bg-white/30" style={{ animationDelay: "300ms" }} />
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white/20 ring-4 ring-white/30">
            <Check className="h-7 w-7" strokeWidth={3} />
          </span>
        </div>
        <div className="font-display text-2xl font-semibold tracking-tight">Payment Successful</div>
        <div className="mt-1 text-sm text-white/85">Your transaction has been completed</div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-[12px]">
        <div>
          <div className="text-muted-foreground">Amount</div>
          <div className="font-display text-2xl font-semibold text-foreground">$1,314.00</div>
          <div className="mt-3 text-muted-foreground">Date &amp; Time</div>
          <div className="text-foreground/85">26 May 2026 · 11:30 GMT</div>
        </div>
        <div>
          <div className="text-muted-foreground">Transaction ID</div>
          <div className="font-mono text-[11px] text-foreground">{TXN_REF}</div>
          <div className="mt-3 text-muted-foreground">Routed via</div>
          <div className="font-semibold text-foreground">Acquirer A · primary</div>
          <div className="text-[10.5px] text-emerald-300">Cascade not required</div>
        </div>
      </div>

      <div className="ct-rise flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-[12px] text-primary" style={{ animationDelay: "300ms" }}>
        <span className="co-pulse grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
          <KeyRound className="h-3.5 w-3.5" />
        </span>
        <span><strong className="text-foreground">Token saved</strong> — next purchase will be one-tap.</span>
      </div>

      <div className="flex gap-3">
        <button className="ct-rise flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground" style={{ animationDelay: "400ms" }}>
          <Download className="h-4 w-4" /> Download Invoice (PDF)
        </button>
        <button className="ct-rise flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy-deep ring-1 ring-border px-4 py-2.5 text-[13px] font-semibold text-foreground" style={{ animationDelay: "600ms" }}>
          <Share2 className="h-4 w-4" /> Share via Email
        </button>
      </div>

      <button className="ct-rise mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-electric-glow px-4 py-3 text-[13px] font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.68_0.18_250/0.7)]" style={{ animationDelay: "900ms" }}>
        <ExternalLink className="h-4 w-4" /> Return to nimbus.co
      </button>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 22 });
  const colors = ["bg-emerald-400", "bg-primary", "bg-ember", "bg-electric-glow", "bg-sky-400"];
  return (
    <div className="pointer-events-none absolute inset-0">
      {pieces.map((_, i) => (
        <span
          key={i}
          className={`co-confetti absolute h-1.5 w-1.5 rounded-sm ${colors[i % colors.length]}`}
          style={{
            left: `${(i * 47) % 100}%`,
            top: "20%",
            animationDelay: `${(i % 8) * 120}ms`,
            transform: `rotate(${(i * 33) % 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- Scene: QR --------------------------------- */

function SceneQR({ provider, amount, payload }: { provider: string; amount: string; payload: string }) {
  return (
    <Panel>
      <button className="mb-3 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Go back to payment methods
      </button>
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <div className="font-display text-[16px] font-semibold tracking-tight text-foreground">
            {provider}
          </div>
          <div className="text-[11.5px] text-muted-foreground">
            Scan the QR with your {provider} app to confirm payment
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-[13.5px] text-foreground/85">
        Send <span className="font-semibold text-foreground">{amount}</span> to complete this order
      </div>

      <div className="mt-4 flex justify-center">
        <div className="co-qr relative rounded-2xl border border-border/60 bg-white p-4 shadow-[0_10px_30px_-10px_oklch(0.68_0.18_250/0.5)]">
          <RealQR value={payload} size={168} />
          <span className="co-qr-scan absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
        </div>
      </div>

      <div className="mt-3 text-center text-[11.5px] text-muted-foreground">
        Settlement in your store currency · no FX exposure
      </div>
    </Panel>
  );
}

/* --------------------------------- Scene: USDT TRC-20 --------------------------------- */
function SceneUSDT() {
  const [secs, setSecs] = useState(20 * 60);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 20 * 60)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const payload = `tron:${USDT_ADDRESS}?amount=1314.00&token=USDT`;
  return (
    <Panel>
      <button className="mb-3 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Go back to payment methods
      </button>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30">
            <span className="text-[11px] font-bold">USDT</span>
          </div>
          <div>
            <div className="font-display text-[16px] font-semibold tracking-tight text-foreground">
              USDT · TRC-20
            </div>
            <div className="text-[11.5px] text-muted-foreground">
              Tron network · low-fee stablecoin rail
            </div>
          </div>
        </div>
        <div className="rounded-full border border-ember/40 bg-ember/15 px-2 py-1 text-[10px] font-semibold text-ember">
          ⏱ {mm}:{ss}
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-ember/30 bg-ember/10 px-3 py-2 text-[11px] text-ember">
        Send exactly <span className="font-semibold">1,314.00 USDT</span> on the <span className="font-semibold">TRC-20 (Tron)</span> network.
        Wrong network = lost funds.
      </div>

      <div className="mt-3 flex justify-center">
        <div className="co-qr relative rounded-2xl border border-border/60 bg-white p-4 shadow-[0_10px_30px_-10px_oklch(0.68_0.18_250/0.5)]">
          <RealQR value={payload} size={168} dark="#047857" />
          <span className="co-qr-scan absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
        </div>
      </div>

      <div className="mt-3 rounded-md border border-border/50 bg-background/40 px-2.5 py-2">
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Deposit address (TRC-20)</div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <span className="truncate font-mono text-[11.5px] text-foreground/85">{USDT_ADDRESS}</span>
          <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10.5px]">
        <div className="rounded-md bg-background/40 ring-1 ring-border/40 p-2">
          <div className="text-muted-foreground">Network</div>
          <div className="font-semibold text-foreground/85">TRC-20</div>
        </div>
        <div className="rounded-md bg-background/40 ring-1 ring-border/40 p-2">
          <div className="text-muted-foreground">Confirmations</div>
          <div className="font-semibold text-foreground/85">1 / 1</div>
        </div>
        <div className="rounded-md bg-background/40 ring-1 ring-border/40 p-2">
          <div className="text-muted-foreground">Settled in</div>
          <div className="font-semibold text-foreground/85">USD · EUR</div>
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------ Trust footer strip --------------------------- */

function TrustStrip() {
  return (
    <div className="border-t border-border/60 bg-background/40 px-5 py-4 md:px-7">
      <div className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Secure payment infrastructure
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { t: "PCI-DSS", s: "Aligned", c: "text-emerald-300" },
          { t: "3DS2", s: "EMV Authenticated", c: "text-primary" },
          { t: "Tokenised", s: "Network Token", c: "text-electric-glow" },
          { t: "Fraud-scored", s: "Real-time", c: "text-ember" },
        ].map((b) => (
          <div key={b.t} className="rounded-lg border border-border/50 bg-card/60 px-3 py-2 text-center backdrop-blur">
            <div className={`text-[11px] font-extrabold leading-tight ${b.c}`}>{b.t}</div>
            <div className="text-[9px] font-medium tracking-wider text-muted-foreground">{b.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
