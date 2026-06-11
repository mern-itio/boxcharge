import { ComplianceIcon } from "@/components/site/PaymentMethodIcons";

const badges = [
  { label: "PCI-DSS L1", sub: "Service provider" },
  { label: "3DS2 / EMV", sub: "Issuer authentication" },
  { label: "Network Tokens", sub: "Vault + on-network" },
  { label: "GDPR-ready", sub: "EU data residency" },
  { label: "ISO 27001-aligned", sub: "Information security" },
  { label: "SOC 2 Type II controls", sub: "Operational rigor" },
];

export function SecurityBadges() {
  return (
    <section className="border-y border-border/40 bg-card/20 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 text-center">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Security &amp; Compliance Stack
          </div>
          <h3 className="mt-1 text-lg font-semibold">
            Trust, baked into every transaction
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map(({ label, sub }) => (
            <div
              key={label}
              className="glass card-lift flex flex-col items-center gap-2 rounded-xl border border-border/40 p-3 text-center"
            >
              <ComplianceIcon name={label} />
              <div className="text-[12px] font-semibold leading-tight">{label}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
