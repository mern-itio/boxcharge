import { X, Check, Clock, ShieldCheck, KeyRound, Route as RouteIcon, AlertTriangle, Banknote } from "lucide-react";

export interface LifecycleTxn {
  id: string;
  customer: string;
  method: string;
  amount: string;
  routed: string;
}

const steps = [
  { icon: Clock, label: "Initiated", detail: "Checkout submitted", time: "14:32:08.014" },
  { icon: KeyRound, label: "Tokenized", detail: "Network token vaulted", time: "14:32:08.092" },
  { icon: ShieldCheck, label: "3DS2 Authenticated", detail: "Frictionless · low risk", time: "14:32:08.341" },
  { icon: AlertTriangle, label: "Primary declined (05)", detail: "Acquirer A · soft decline", time: "14:32:08.612", warn: true },
  { icon: RouteIcon, label: "Cascaded to fallback", detail: "Routed → Acquirer B (≤800 ms SLA)", time: "14:32:08.794" },
  { icon: Check, label: "Approved", detail: "Auth code 87521 · Acquirer B", time: "14:32:09.118", good: true },
  { icon: Banknote, label: "Captured & queued for settlement", detail: "T+1 to merchant IBAN", time: "14:32:09.402" },
];

export function TransactionLifecycleModal({
  txn,
  onClose,
}: {
  txn: LifecycleTxn | null;
  onClose: () => void;
}) {
  if (!txn) return null;
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-strong relative max-h-[92%] w-[92%] max-w-[460px] overflow-auto rounded-2xl border border-border/60 p-5 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-card/60 hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-3">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Transaction Lifecycle</div>
          <div className="font-mono text-[11px] text-foreground/80">{txn.id}</div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-border/40 bg-card/30 p-2 text-[11px]">
          <Row k="Customer" v={txn.customer} />
          <Row k="Method" v={txn.method} />
          <Row k="Amount" v={txn.amount} />
          <Row k="Routed via" v={txn.routed} />
        </div>

        <ol className="relative space-y-3 border-l border-border/40 pl-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={i} className="relative">
                <span
                  className={`absolute -left-[27px] top-0 grid h-5 w-5 place-items-center rounded-full border ${
                    s.good
                      ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                      : s.warn
                      ? "border-amber-400/40 bg-amber-400/15 text-amber-300"
                      : "border-primary/40 bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                </span>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold">{s.label}</span>
                  <span className="font-mono text-[9.5px] text-muted-foreground">{s.time}</span>
                </div>
                <div className="text-[10.5px] text-muted-foreground">{s.detail}</div>
              </li>
            );
          })}
        </ol>

        <div className="mt-4 rounded-md border border-emerald-400/30 bg-emerald-400/10 p-2 text-[10.5px] text-emerald-200">
          Recovered by cascading orchestration · total round-trip 388 ms
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wide text-muted-foreground">{k}</div>
      <div className="truncate text-[11px] font-medium">{v}</div>
    </div>
  );
}
