import { Check, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const rows = [
  { label: "Acquirer connectivity", a: "Single provider", b: "70+ acquiring partners" },
  { label: "Routing logic", a: "Fixed routing", b: "Cascading & performance-aware" },
  { label: "APM coverage", a: "Limited regional methods", b: "40+ local payment methods" },
  { label: "Failover on declines", a: "Manual retries", b: "Automatic failover routes" },
  { label: "Integration scope", a: "Per-acquirer rework", b: "One unified API" },
  { label: "Reporting", a: "Fragmented dashboards", b: "Consolidated transaction view" },
  { label: "Onboarding", a: "Long, opaque review", b: "Structured, partner-led process" },
];

export function Compare() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Comparison
          </div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            <span className="gradient-text">Single Acquirer vs BoxCharge</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Why a multi-acquirer orchestration layer outperforms a single processing relationship.
          </p>
        </div>

        <Reveal>
          <div className="glass-strong mt-12 overflow-hidden rounded-3xl">
            <div className="grid grid-cols-3 gap-0 border-b border-border/60 px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">
              <div>Capability</div>
              <div className="text-center">Single Acquirer</div>
              <div className="text-center text-primary">BoxCharge</div>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className={`grid grid-cols-3 items-center gap-3 px-6 py-4 text-sm ${
                  i % 2 ? "bg-card/20" : ""
                }`}
              >
                <div className="font-medium text-foreground/90">{r.label}</div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <X className="h-4 w-4 text-destructive/70" />
                  <span className="text-center">{r.a}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-center">{r.b}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
