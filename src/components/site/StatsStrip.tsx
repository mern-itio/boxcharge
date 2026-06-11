import { useContent } from "@/hooks/useContent";
import { AnimatedCounter } from "./AnimatedCounter";

const DEFAULT_STATS = [
  { value: 70, suffix: "+", label: "Acquiring Partners", decimals: 0 },
  { value: 40, suffix: "+", label: "Payment Methods", decimals: 0 },
  { value: 25, suffix: "+", label: "Currencies", decimals: 0 },
  { value: 6, suffix: "", label: "Global Regions", decimals: 0 },
  { value: 99.95, suffix: "%", label: "Uptime Target", decimals: 2 },
];

type StatRow = { value: string; suffix?: string; label: string; decimals?: string };

function resolveStats(rows: StatRow[]) {
  if (!rows.length) return DEFAULT_STATS;
  return rows.map((s) => ({
    value: Number.parseFloat(s.value) || 0,
    suffix: s.suffix ?? "",
    label: s.label,
    decimals: Number.parseInt(s.decimals ?? "0", 10) || 0,
  }));
}

export function StatsStrip() {
  const { c } = useContent("home");
  const stats = resolveStats(c<StatRow[]>("stats", []));

  return (
    <section className="border-y border-border/60 bg-card/30 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                <AnimatedCounter
                  value={s.value}
                  decimals={s.decimals ?? 0}
                  className="gradient-text"
                />
                <span className="text-accent">{s.suffix}</span>
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
          {c(
            "stats_footer",
            "Coverage subject to merchant profile, jurisdiction, and partner availability",
          )}
        </p>
      </div>
    </section>
  );
}
