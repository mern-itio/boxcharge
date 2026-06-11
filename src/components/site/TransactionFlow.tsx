import { useEffect, useState } from "react";
import {
  User,
  Lock,
  ShieldCheck,
  Route as RouteIcon,
  Banknote,
  ArrowRight,
  Check,
  AlertTriangle,
} from "lucide-react";

/**
 * Animated 5-step transaction pipeline that cycles through:
 *  Customer → Vault → Fraud/3DS → Smart Router → Acquirer
 * Once every loop, the Smart Router shows a Decline (05) → cascade → Success outcome.
 */
const STEPS = [
  { icon: User, label: "Customer", sub: "Card · Wallet · APM" },
  { icon: Lock, label: "PCI-aligned Vault", sub: "Tokenisation" },
  { icon: ShieldCheck, label: "Fraud & 3DS2", sub: "Sub-second checks" },
  { icon: RouteIcon, label: "Smart Router", sub: "Cascading fallback" },
  { icon: Banknote, label: "Acquirer", sub: "Approved & captured" },
];

export function TransactionFlow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % (STEPS.length + 1));
    }, 1400);
    return () => clearInterval(id);
  }, [paused]);

  const showCascade = active >= 3;
  const showSuccess = active >= 5;

  return (
    <section id="transaction-flow" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Transaction Flow
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="gradient-text">From Tap to Approved — In Under a Second</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every payment travels through tokenisation, fraud screening, 3DS and smart routing before
            reaching an acquirer. Soft declines are recovered automatically.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
            <ShieldCheck className="h-3 w-3" /> PCI-DSS L1 infrastructure
          </div>
        </div>

        <div
          className="glass-strong gradient-border mx-auto mt-12 max-w-6xl rounded-3xl p-6 sm:p-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = active >= i;
              const isCurrent = active === i;
              return (
                <div key={s.label} className="flex items-center lg:flex-1">
                  <div
                    className={`flex-1 rounded-2xl border p-4 text-center transition-all duration-500 ${
                      isCurrent
                        ? "border-primary bg-primary/15 shadow-[0_0_30px_-8px_oklch(0.68_0.18_250/0.7)]"
                        : isActive
                        ? "border-primary/40 bg-primary/5"
                        : "border-border bg-card/30"
                    }`}
                  >
                    <div
                      className={`mx-auto mb-2 grid h-10 w-10 place-items-center rounded-xl transition-colors ${
                        isActive
                          ? "bg-gradient-to-br from-primary to-electric-glow text-primary-foreground"
                          : "bg-card text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-[13px] font-semibold">{s.label}</div>
                    <div className="text-[10.5px] text-muted-foreground">{s.sub}</div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="px-2 lg:px-1">
                      <ArrowRight
                        className={`h-4 w-4 transition-colors ${
                          active > i ? "text-primary" : "text-muted-foreground/40"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cascade / outcome */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div
              className={`rounded-xl border p-3 text-[12px] transition-all ${
                showCascade
                  ? "border-amber-400/40 bg-amber-400/10 text-amber-200 opacity-100"
                  : "border-border bg-card/30 text-muted-foreground opacity-40"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-3.5 w-3.5" /> Primary acquirer declined · soft code 05
              </div>
              <div className="mt-1 text-[10.5px]">
                Smart Router cascades to fallback acquirer within 800 ms SLA.
              </div>
            </div>
            <div
              className={`rounded-xl border p-3 text-[12px] transition-all ${
                showSuccess
                  ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200 opacity-100"
                  : "border-border bg-card/30 text-muted-foreground opacity-40"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                <Check className="h-3.5 w-3.5" /> Approved on fallback · auth code 87521
              </div>
              <div className="mt-1 text-[10.5px]">
                Captured, tokenised for next time, webhook fired — total round-trip 388 ms.
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[10px] text-muted-foreground">
            <span className="rounded-full border border-border bg-card/40 px-2 py-1">PCI-DSS L1</span>
            <span className="rounded-full border border-border bg-card/40 px-2 py-1">3DS2</span>
            <span className="rounded-full border border-border bg-card/40 px-2 py-1">Network Token</span>
            <span className="rounded-full border border-border bg-card/40 px-2 py-1">Velocity Controls</span>
            <span className="rounded-full border border-border bg-card/40 px-2 py-1">Auto-cascade fallback</span>
          </div>
        </div>
      </div>
    </section>
  );
}
