import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp } from "lucide-react";

type Tier = "conservative" | "typical" | "optimistic";

const TIERS: Record<Tier, { label: string; rate: number; mdr: number; sub: string }> = {
  conservative: { label: "Conservative", rate: 0.04, mdr: 0.0015, sub: "Bottom of the range" },
  typical: { label: "Typical", rate: 0.055, mdr: 0.0022, sub: "Average across our book" },
  optimistic: { label: "Optimistic", rate: 0.07, mdr: 0.003, sub: "Top of the range" },
};

export function RoiCalculator() {
  const [volume, setVolume] = useState(500_000);
  const [approval, setApproval] = useState(87);
  const [tier, setTier] = useState<Tier>("typical");

  const { recoveredMonthly, mdrSavings, annual } = useMemo(() => {
    const t = TIERS[tier];
    // Recovered = uplift % applied to current declined volume, capped by current decline gap
    const declineRate = (100 - approval) / 100;
    const declinedVolume = volume * declineRate;
    const upliftBaseline = volume * t.rate;
    const recovered = Math.round(Math.min(upliftBaseline, declinedVolume * 0.95));
    const savings = Math.round(volume * t.mdr);
    return {
      recoveredMonthly: recovered,
      mdrSavings: savings,
      annual: (recovered + savings) * 12,
    };
  }, [volume, approval, tier]);

  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Estimate
          </div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            <span className="gradient-text">What Smart Routing Could Recover</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            A scenario model based on industry-typical lift of 4–7% of declined volume. Not a
            guarantee — your real number depends on corridor, MCC, acquirer mix and 3DS coverage.
          </p>
        </div>

        <div className="glass-strong gradient-border mt-12 grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-2">
          <div className="space-y-8">
            <Slider
              label="Monthly processing volume"
              value={volume}
              min={50_000}
              max={5_000_000}
              step={50_000}
              format={fmt}
              onChange={setVolume}
            />
            <Slider
              label="Current approval rate"
              value={approval}
              min={70}
              max={98}
              step={1}
              format={(n) => `${n}%`}
              onChange={setApproval}
            />

            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                Scenario
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(TIERS) as Tier[]).map((k) => {
                  const t = TIERS[k];
                  const active = tier === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setTier(k)}
                      className={`rounded-xl border px-3 py-2.5 text-left transition ${
                        active
                          ? "border-primary bg-primary/15 text-foreground shadow-[0_0_24px_-8px_oklch(0.68_0.18_250/0.6)]"
                          : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="text-[12px] font-semibold">{t.label}</div>
                      <div className="text-[10px]">{(t.rate * 100).toFixed(1)}% lift</div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                {TIERS[tier].sub} · modeled on a {(TIERS[tier].rate * 100).toFixed(1)}% recovery of
                declined volume and a {(TIERS[tier].mdr * 100).toFixed(2)}% MDR efficiency from
                cost-optimal routing.
              </p>
            </div>
          </div>

          <div className="glass relative overflow-hidden rounded-2xl p-6">
            <TrendingUp className="absolute right-5 top-5 h-5 w-5 text-primary/40" />
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Estimated additional approved volume
            </div>
            <div className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              <span className="gradient-text">{fmt(recoveredMonthly)}</span>
              <span className="ml-2 text-sm font-normal text-muted-foreground">/ month</span>
            </div>

            <div className="mt-2 text-sm text-foreground/80">
              + <span className="font-medium">{fmt(mdrSavings)}</span>{" "}
              <span className="text-muted-foreground">/ month MDR savings</span>
            </div>
            <div className="mt-1 text-sm text-foreground/80">
              ~{fmt(annual)} <span className="text-muted-foreground">per year, combined</span>
            </div>

            <div className="mt-6 space-y-2 border-t border-border/60 pt-5 text-sm">
              <Row label="Monthly volume" value={fmt(volume)} />
              <Row label="Approval today" value={`${approval}%`} />
              <Row label="Scenario" value={TIERS[tier].label} />
              <Row label="Modeled lift" value={`${(TIERS[tier].rate * 100).toFixed(1)}% of declined`} />
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-electric-glow px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_oklch(0.68_0.18_250/0.7)] transition-opacity hover:opacity-90"
            >
              Get an exact estimate from a specialist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground/90">{value}</span>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
        <span className="font-display text-lg font-semibold text-foreground">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="boxchrge-slider w-full"
        style={
          {
            background: `linear-gradient(to right, oklch(0.68 0.18 250) 0%, oklch(0.78 0.16 240) ${pct}%, oklch(0.30 0.04 260 / 0.6) ${pct}%, oklch(0.30 0.04 260 / 0.6) 100%)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
