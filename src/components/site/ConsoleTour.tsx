import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CreditCard,
  ShieldCheck,
  ArrowUpRight,
  Cpu,
  Megaphone,
  Code2,
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
  Bot,
  User,
  TrendingUp,
  Send,
  ArrowRight,
  Globe2,
  Repeat,
  Lock,
  AlertTriangle,
  Calendar,
  Download,
  ChevronDown,
  Search,
  Plus,
  GripVertical,
} from "lucide-react";
import { TransactionLifecycleModal, type LifecycleTxn } from "./TransactionLifecycleModal";

type Scene = 0 | 1 | 2 | 3 | 4;

const SCENES: { key: Scene; label: string; url: string; nav: number; duration: number; caption: string }[] = [
  { key: 0, label: "Dashboard", url: "console.boxchrge.com/dashboard", nav: 0, duration: 8500,
    caption: "One control plane. Real-time KPIs across every acquirer, currency, and method." },
  { key: 1, label: "Transactions", url: "console.boxchrge.com/transactions", nav: 1, duration: 9500,
    caption: "Every transaction, every currency — with the acquirer that routed it visible at a glance." },
  { key: 2, label: "Orchestration", url: "console.boxchrge.com/orchestration/router", nav: 2, duration: 10000,
    caption: "Smart routing & cascading — built visually, no code required." },
  { key: 3, label: "Regions", url: "console.boxchrge.com/insights/regions", nav: 3, duration: 7000,
    caption: "Global coverage with regional approval-rate transparency." },
  { key: 4, label: "AI Insight", url: "console.boxchrge.com/support-center", nav: 7, duration: 8500,
    caption: "AI assistant trained on your data — actionable insight, not chit-chat." },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: CreditCard, label: "Transactions" },
  { icon: ShieldCheck, label: "Orchestration" },
  { icon: Globe2, label: "Regions" },
  { icon: ArrowUpRight, label: "Payouts" },
  { icon: Cpu, label: "Terminals" },
  { icon: Megaphone, label: "Announcements" },
  { icon: Code2, label: "Developer" },
  { icon: LifeBuoy, label: "Support Center" },
];

export function ConsoleTour() {
  const [scene, setScene] = useState<Scene>(0);
  const [paused, setPaused] = useState(false);
  const [openTxn, setOpenTxn] = useState<LifecycleTxn | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pause rotation while modal is open
  const isPaused = paused || openTxn !== null;

  useEffect(() => {
    if (isPaused) return;
    const cur = SCENES[scene];
    timerRef.current = setTimeout(() => {
      setScene((s) => ((s + 1) % SCENES.length) as Scene);
    }, cur.duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scene, isPaused]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setScene((s) => ((s + 1) % SCENES.length) as Scene);
      if (e.key === "ArrowLeft") setScene((s) => ((s - 1 + SCENES.length) % SCENES.length) as Scene);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (s: Scene) => setScene(s);
  const next = () => setScene((s) => ((s + 1) % SCENES.length) as Scene);
  const prev = () => setScene((s) => ((s - 1 + SCENES.length) % SCENES.length) as Scene);

  const current = SCENES[scene];

  return (
    <section id="product-tour" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live Product Tour
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="gradient-text">See BoxCharge in Action</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A look inside the merchant console — smart routing, cascading recovery, regional insight and AI reporting, working in real time.
          </p>
        </div>

        <div
          className="group relative mx-auto mt-12 max-w-6xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/10 blur-3xl" />

          <div className="glass-strong relative overflow-hidden rounded-2xl">
            <div className="flex items-center gap-3 border-b border-border/60 bg-black/20 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="ml-2 flex-1">
                <div className="mx-auto flex max-w-md items-center gap-2 rounded-md border border-border/60 bg-card/50 px-3 py-1 text-[11px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span key={current.url} className="ct-fade truncate">{current.url}</span>
                </div>
              </div>
              <div className="hidden text-[11px] text-muted-foreground sm:block">
                Scene {scene + 1} / {SCENES.length}
              </div>
            </div>

            <div className="relative flex h-[520px] sm:h-[560px]">
              <ConsoleSidebar activeNav={current.nav} />

              <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-background/40 to-background/10">
                <div className="flex items-center justify-between border-b border-border/40 px-4 py-2 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span>Home</span>
                    <span>›</span>
                    <span key={current.label} className="ct-fade text-foreground/85">
                      {current.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span>live</span>
                  </div>
                </div>

                <div className="relative h-[calc(100%-33px)] overflow-hidden">
                  {scene === 0 && <SceneDashboard />}
                  {scene === 1 && <SceneTransactions onRowClick={setOpenTxn} />}
                  {scene === 2 && <SceneOrchestration />}
                  {scene === 3 && <SceneRegions />}
                  {scene === 4 && <SceneAIInsight />}
                  <TransactionLifecycleModal txn={openTxn} onClose={() => setOpenTxn(null)} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button onClick={prev} aria-label="Previous scene" className="glass rounded-full p-2 text-foreground/70 transition hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {SCENES.map((s) => {
                const active = s.key === scene;
                return (
                  <button
                    key={s.key}
                    onClick={() => go(s.key)}
                    aria-label={`Go to ${s.label}`}
                    className={`relative h-1.5 overflow-hidden rounded-full transition-all ${
                      active ? "w-10 bg-border" : "w-2 bg-border hover:bg-muted-foreground/50"
                    }`}
                  >
                    {active && (
                      <span
                        key={`${scene}-${isPaused}`}
                        className="co-progress absolute inset-0 block rounded-full bg-gradient-to-r from-primary to-electric-glow"
                        style={{
                          animationDuration: `${current.duration}ms`,
                          animationPlayState: isPaused ? "paused" : "running",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <button onClick={next} aria-label="Next scene" className="glass rounded-full p-2 text-foreground/70 transition hover:text-foreground">
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
              Like what you see? Get a 15-min walkthrough
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsoleSidebar({ activeNav }: { activeNav: number }) {
  return (
    <div className="hidden w-48 shrink-0 border-r border-border/40 bg-black/30 p-2 md:block">
      <div className="mb-3 flex items-center gap-2 px-2 py-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-electric-glow text-[10px] font-bold text-primary-foreground">
          BC
        </div>
        <div className="text-xs font-semibold">BoxCharge</div>
      </div>
      <nav className="relative space-y-0.5">
        <div
          className="absolute left-0 h-8 w-0.5 rounded-r bg-gradient-to-b from-primary to-electric-glow transition-all duration-500 ease-out"
          style={{ top: `${activeNav * 30}px` }}
        />
        {NAV_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const active = i === activeNav;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] transition-all duration-300 ${
                active ? "bg-primary/15 text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${active ? "text-primary" : ""}`} />
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

/* ============================== Scene 1: Dashboard ============================== */
function SceneDashboard() {
  const kpis: { label: string; value: string; delta: string; good?: boolean; spark: number[]; trend: "up" | "down" }[] = [
    { label: "Total Volume", value: "$7.42M", delta: "+18.4% vs prev 90d", spark: [42, 48, 55, 51, 62, 70, 74, 88], trend: "up" },
    { label: "Approval Rate", value: "94.3%", delta: "+0.6pp vs prev 90d", spark: [88, 89, 90, 91, 92, 93, 94, 94], trend: "up" },
    { label: "Declined", value: "5.7%", delta: "-0.6pp vs prev 90d", good: true, spark: [12, 11, 10, 9, 8, 7, 6, 5], trend: "down" },
    { label: "Transactions", value: "54,118", delta: "+12.7% vs prev 90d", spark: [40, 44, 48, 52, 58, 64, 70, 78], trend: "up" },
    { label: "Refunds", value: "$42,180", delta: "-6.1% vs prev 90d", good: true, spark: [70, 64, 60, 55, 50, 48, 44, 40], trend: "down" },
    { label: "Chargebacks", value: "0.18%", delta: "-0.04pp vs prev 90d", good: true, spark: [50, 45, 40, 38, 32, 28, 24, 22], trend: "down" },
    { label: "Settled", value: "$6.92M", delta: "+19.1% vs prev 90d", spark: [38, 44, 50, 56, 62, 70, 78, 86], trend: "up" },
    { label: "Pending Settlement", value: "$498,210", delta: "T+1 to T+2", spark: [60, 64, 58, 62, 66, 60, 64, 62], trend: "up" },
  ];
  const security = [
    { label: "3DS frictionless", value: "71.2%" },
    { label: "3DS challenge", value: "18.4%" },
    { label: "Tokenized cards", value: "64%" },
    { label: "Fraud rules fired", value: "1,284" },
  ];
  return (
    <div className="ct-scene relative h-full overflow-auto p-4">
      <div className="mb-3 flex items-start justify-between gap-3 ct-rise" style={{ animationDelay: "80ms" }}>
        <div>
          <div className="text-lg font-semibold">Dashboard Overview</div>
          <div className="text-[11px] text-muted-foreground">Live performance across acquirers, currencies and methods</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-card/60 px-2 py-1 text-[10px] text-foreground/85">
            <Calendar className="h-3 w-3 text-primary" />
            <span>Last 90 days</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="rounded-md border border-border/60 bg-card/40 px-2 py-1 text-[10px] text-muted-foreground">
            vs prev 90d
          </div>
          <button className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-card/40 px-2 py-1 text-[10px] text-foreground/80 hover:bg-card/70">
            <Download className="h-3 w-3" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {kpis.map((s, i) => {
          const positive = s.good ?? !s.delta.startsWith("-");
          const sparkMax = Math.max(...s.spark);
          return (
            <div
              key={s.label}
              className="ct-rise glass gradient-border rounded-lg p-2"
              style={{ animationDelay: `${150 + i * 70}ms` }}
            >
              <div className="text-[9px] text-muted-foreground">{s.label}</div>
              <div className="mt-0.5 flex items-end justify-between gap-1">
                <div className="text-[13px] font-semibold">{s.value}</div>
                <div className="flex h-5 items-end gap-[1px]">
                  {s.spark.map((v, j) => (
                    <span
                      key={j}
                      className={`w-[2px] rounded-sm ${positive ? "bg-emerald-400/70" : "bg-red-400/70"}`}
                      style={{ height: `${(v / sparkMax) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className={`mt-0.5 text-[9px] ${positive ? "text-emerald-400" : "text-red-400"}`}>
                {s.delta}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security strip */}
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {security.map((s, i) => (
          <div
            key={s.label}
            className="ct-rise flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-2 py-1.5"
            style={{ animationDelay: `${700 + i * 70}ms` }}
          >
            <Lock className="h-3 w-3 text-primary" />
            <div className="min-w-0">
              <div className="text-[9px] text-muted-foreground truncate">{s.label}</div>
              <div className="text-[11px] font-semibold">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Smart routing + payment mix */}
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="ct-rise glass col-span-2 rounded-lg p-3" style={{ animationDelay: "1000ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold flex items-center gap-1.5">
                <Repeat className="h-3.5 w-3.5 text-primary" /> Smart Routing &amp; Cascading
              </div>
              <div className="text-[10px] text-muted-foreground">Last 90 days · auto-recovery from soft declines</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-muted-foreground">Recovered</div>
              <div className="text-sm font-semibold text-emerald-300">
                <CountUp end={548600} prefix="$" duration={1400} />
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
            <div className="rounded-md bg-card/40 p-2">
              <div className="text-muted-foreground">Routed via primary</div>
              <div className="mt-0.5 text-[12px] font-semibold">87.1%</div>
            </div>
            <div className="rounded-md bg-card/40 p-2">
              <div className="text-muted-foreground">Cascade retries</div>
              <div className="mt-0.5 text-[12px] font-semibold">3,820</div>
            </div>
            <div className="rounded-md bg-card/40 p-2">
              <div className="text-muted-foreground">Est. MDR saving</div>
              <div className="mt-0.5 text-[12px] font-semibold text-emerald-300">$34,580</div>
            </div>
          </div>

          {/* Before/after bar */}
          <div className="mt-3 space-y-1.5">
            <div>
              <div className="flex justify-between text-[9px] text-muted-foreground"><span>Without cascading</span><span>87.4%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-card/40">
                <div className="h-full bg-muted-foreground/50" style={{ width: "87.4%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[9px] text-muted-foreground"><span>With cascading</span><span className="text-emerald-300">94.3%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-card/40">
                <div className="ct-area-in h-full bg-gradient-to-r from-primary to-electric-glow" style={{ width: "94.3%", transformOrigin: "left" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="ct-rise glass rounded-lg p-3" style={{ animationDelay: "1200ms" }}>
          <div className="text-xs font-semibold">Payment Mix</div>
          <div className="text-[10px] text-muted-foreground">Volume share</div>
          <div className="mt-2 flex items-center justify-center">
            <div
              className="ct-donut h-20 w-20 rounded-full"
              style={{
                background:
                  "conic-gradient(oklch(0.68 0.18 250) 0% 56%, oklch(0.72 0.18 50) 56% 80%, oklch(0.72 0.18 165) 80% 94%, oklch(0.5 0.02 260) 94% 100%)",
                mask: "radial-gradient(circle, transparent 55%, #000 56%)",
                WebkitMask: "radial-gradient(circle, transparent 55%, #000 56%)",
              }}
            />
          </div>
          <div className="mt-2 space-y-0.5 text-[9px]">
            <Legend color="bg-primary" label="Cards" value="56%" />
            <Legend color="bg-accent" label="APMs" value="24%" />
            <Legend color="bg-emerald-500" label="Wallets" value="14%" />
            <Legend color="bg-muted-foreground/60" label="Bank transfer" value="6%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1"><span className={`h-1.5 w-1.5 rounded-full ${color}`} />{label}</span>
      <span>{value}</span>
    </div>
  );
}

function CountUp({ end, prefix = "", duration = 1200 }: { end: number; prefix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return <>{prefix}{n.toLocaleString()}</>;
}

/* ============================== Scene 2: Transactions ============================== */
type TxnCategory = "Cards" | "APMs" | "Wallets" | "Bank" | "Crypto";
type TxnRow = LifecycleTxn & { time: string; status: string; category: TxnCategory };

const TXN_ROWS: TxnRow[] = [
  { id: "TXN-1284902", time: "14:32:09", customer: "Nimbus SaaS Co · Berlin",      method: "Visa · 4242",        amount: "$1,840.00",   routed: "Acquirer A",    status: "Approved",       category: "Cards" },
  { id: "TXN-1284901", time: "14:31:52", customer: "Atlas Marketplace · Paris",    method: "SEPA Direct Debit",  amount: "€1,248.00",   routed: "Acquirer B",    status: "Approved",       category: "Bank" },
  { id: "TXN-1284900", time: "14:31:18", customer: "Voyage Bookings · London",     method: "Mastercard · 5310",  amount: "£642.30",     routed: "Acquirer A",    status: "3DS challenge",  category: "Cards" },
  { id: "TXN-1284899", time: "14:30:47", customer: "Lumen Retail · Singapore",     method: "GrabPay",            amount: "SGD 489.50",  routed: "C → A",         status: "Cascaded",       category: "APMs" },
  { id: "TXN-1284898", time: "14:30:11", customer: "Pixel Studios · Bengaluru",    method: "UPI · @okhdfc",      amount: "₹74,500",     routed: "Acquirer B",    status: "Approved",       category: "APMs" },
  { id: "TXN-1284897", time: "14:29:38", customer: "Helios Travel · Madrid",       method: "Visa · 4011",        amount: "$3,120.00",   routed: "Acquirer A",    status: "Approved",       category: "Cards" },
  { id: "TXN-1284896", time: "14:29:02", customer: "Orion B2B · Amsterdam",        method: "USDT · TRC-20",      amount: "$12,400.00",  routed: "Crypto Rail",   status: "Approved",       category: "Crypto" },
  { id: "TXN-1284895", time: "14:28:21", customer: "Mira Goods · Hong Kong",       method: "WeChat Pay",         amount: "HK$ 6,480.00",routed: "Acquirer C",    status: "Approved",       category: "Wallets" },
  { id: "TXN-1284894", time: "14:27:50", customer: "Bryce Subs · New York",        method: "Apple Pay · Visa",   amount: "$48.00",      routed: "Acquirer A",    status: "Tokenized",      category: "Wallets" },
  { id: "TXN-1284893", time: "14:27:14", customer: "Nordic Apps · Stockholm",      method: "Mastercard · 5489",  amount: "SEK 1,290.00",routed: "B → A",         status: "Cascaded",       category: "Cards" },
  { id: "TXN-1284892", time: "14:26:40", customer: "Casa Flora · São Paulo",       method: "PIX",                amount: "R$ 318.00",   routed: "Acquirer D",    status: "Approved",       category: "APMs" },
  { id: "TXN-1284891", time: "14:26:02", customer: "Sundeck SaaS · Sydney",        method: "Visa · 4988",        amount: "AUD 220.00",  routed: "Acquirer A",    status: "Approved",       category: "Cards" },
];

const METHOD_FILTERS: ("All" | TxnCategory)[] = ["All", "Cards", "APMs", "Wallets", "Bank", "Crypto"];

function SceneTransactions({ onRowClick }: { onRowClick: (txn: LifecycleTxn) => void }) {
  const [filter, setFilter] = useState<"All" | TxnCategory>("All");
  const visible = filter === "All" ? TXN_ROWS : TXN_ROWS.filter((r) => r.category === filter);

  return (
    <div className="ct-scene relative h-full overflow-auto p-4">
      <div className="mb-3 flex items-start justify-between gap-3 ct-rise">
        <div>
          <div className="text-lg font-semibold">Transactions</div>
          <div className="text-[11px] text-muted-foreground">Click any row to view its full lifecycle</div>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-card/60 px-2 py-1 text-[10px] text-muted-foreground">
          <Search className="h-3 w-3" />
          <span>Search by ID, customer, email…</span>
        </div>
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-1 ct-rise" style={{ animationDelay: "120ms" }}>
        {METHOD_FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-2 py-0.5 text-[10px] transition ${
                active
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="glass rounded-lg">
        <div className="grid grid-cols-12 gap-2 border-b border-border/40 px-3 py-2 text-[9px] uppercase tracking-wide text-muted-foreground">
          <div className="col-span-2">Time</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-2">Method</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Routed via</div>
          <div className="col-span-1 text-right">Status</div>
        </div>
        {visible.map((r, i) => (
          <button
            key={r.id}
            onClick={() => onRowClick(r)}
            className="ct-row grid w-full grid-cols-12 items-center gap-2 border-b border-border/20 px-3 py-2 text-left text-[11px] transition hover:bg-primary/5 last:border-0"
            style={{ animationDelay: `${180 + i * 50}ms` }}
          >
            <div className="col-span-2 font-mono text-[10px] text-muted-foreground">{r.time}</div>
            <div className="col-span-3 truncate">{r.customer}</div>
            <div className="col-span-2 truncate text-foreground/85">{r.method}</div>
            <div className="col-span-2 font-medium tabular-nums">{r.amount}</div>
            <div className="col-span-2">
              <span className={`rounded-full border px-1.5 py-0.5 text-[9px] ${r.status === "Cascaded" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-primary/30 bg-primary/10 text-primary"}`}>
                {r.routed}
              </span>
            </div>
            <div className="col-span-1 flex justify-end"><StatusPill status={r.status} /></div>
          </button>
        ))}
        <div className="flex items-center justify-between px-3 py-2 text-[10px] text-muted-foreground">
          <span>
            Showing {visible.length} of 54,118 · Page 1 of {Math.ceil(54118 / 12).toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <button className="rounded border border-border/60 bg-card/40 p-1 opacity-50" disabled aria-label="Previous page">
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button className="rounded border border-border/60 bg-card/40 p-1 hover:bg-card/70" aria-label="Next page">
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    Pending: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    "3DS challenge": "border-violet-400/30 bg-violet-400/10 text-violet-300",
    Cascaded: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    Tokenized: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[9px] ${map[status] ?? "border-border bg-card/50"}`}>
      {status}
    </span>
  );
}

/* ============================== Scene 3: Orchestration ============================== */
function SceneOrchestration() {
  return (
    <div className="ct-scene relative h-full overflow-auto p-4">
      <div className="mb-3 ct-rise">
        <div className="text-lg font-semibold">Payment Orchestration</div>
        <div className="text-[11px] text-muted-foreground">Visual smart router with cascading fallback</div>
      </div>

      {/* Router diagram */}
      <div className="glass rounded-lg p-4">
        <div className="grid grid-cols-5 items-center gap-2">
          {/* Incoming */}
          <div className="ct-rise rounded-lg border border-border/60 bg-card/50 p-2 text-center text-[11px]" style={{ animationDelay: "100ms" }}>
            <div className="text-[9px] text-muted-foreground">Incoming</div>
            <div className="font-semibold">Transaction</div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="h-4 w-4 text-muted-foreground co-cascade-arrow" />
          </div>

          {/* Router */}
          <div className="ct-rise rounded-lg border border-primary/40 bg-primary/10 p-2 text-center text-[11px]" style={{ animationDelay: "300ms" }}>
            <div className="text-[9px] text-primary">Smart Router</div>
            <div className="font-semibold">BoxCharge</div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="h-4 w-4 text-muted-foreground co-cascade-arrow" style={{ animationDelay: "200ms" }} />
          </div>

          {/* Acquirers */}
          <div className="space-y-1.5">
            <div className="ct-rise flex items-center justify-between rounded-md border border-emerald-400/30 bg-emerald-400/5 px-2 py-1 text-[10px]" style={{ animationDelay: "500ms" }}>
              <span className="font-semibold">Acquirer A</span>
              <span className="text-emerald-300">primary</span>
            </div>
            <div className="ct-rise flex items-center justify-between rounded-md border border-border/60 bg-card/40 px-2 py-1 text-[10px]" style={{ animationDelay: "700ms" }}>
              <span className="font-semibold">Acquirer B</span>
              <span className="text-muted-foreground">fallback</span>
            </div>
            <div className="ct-rise flex items-center justify-between rounded-md border border-border/60 bg-card/40 px-2 py-1 text-[10px]" style={{ animationDelay: "900ms" }}>
              <span className="font-semibold">Acquirer C</span>
              <span className="text-muted-foreground">APAC SaaS</span>
            </div>
          </div>
        </div>

        {/* Rule */}
        <div className="ct-rise mt-4 rounded-md border-l-2 border-l-emerald-400/60 bg-card/30 p-3 text-[11px]" style={{ animationDelay: "1100ms" }}>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-300">ACTIVE RULE</span>
            <span className="text-muted-foreground">Rule ID: BCHG-RT-021</span>
          </div>
          <div className="mt-2 font-mono text-[11.5px] leading-relaxed">
            <span className="text-muted-foreground">IF</span>{" "}
            <span className="text-primary">primary_acquirer.declines</span>{" "}
            <span className="text-muted-foreground">WITH soft_code IN</span>{" "}
            <span className="text-emerald-300">(05, 51, 91)</span>
            <br />
            <span className="text-muted-foreground">THEN</span>{" "}
            <span className="text-primary">cascade</span>{" "}
            <span className="text-muted-foreground">TO fallback WITHIN</span>{" "}
            <span className="text-emerald-300">800 ms</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 border-t border-border/30 pt-2 text-[10px] text-muted-foreground">
            <span>Region: <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-sky-300">Global</span></span>
            <span>MCC: <span className="rounded bg-violet-500/20 px-1.5 py-0.5 text-violet-300">SaaS · Retail</span></span>
            <span>Recovered (90d): <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300">$548,600</span></span>
          </div>
        </div>
      </div>

      {/* Rules table */}
      <div className="ct-rise glass mt-3 rounded-lg" style={{ animationDelay: "1300ms" }}>
        <div className="flex items-center justify-between border-b border-border/40 px-3 py-2">
          <div>
            <div className="text-xs font-semibold">Orchestration Rules</div>
            <div className="text-[10px] text-muted-foreground">Priority-ordered · evaluated top-to-bottom per transaction</div>
          </div>
          <button className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary hover:bg-primary/20">
            <Plus className="h-3 w-3" /> Add rule
          </button>
        </div>
        <div className="grid grid-cols-12 gap-2 border-b border-border/40 px-3 py-1.5 text-[9px] uppercase tracking-wide text-muted-foreground">
          <div className="col-span-1">Status</div>
          <div className="col-span-5">Rule</div>
          <div className="col-span-3">Scope</div>
          <div className="col-span-2 text-right">Recovered 30d</div>
          <div className="col-span-1 text-right">Pri.</div>
        </div>
        {[
          { status: "Active", rule: "Cascade on soft decline (05 / 51 / 91)", scope: "Global · Cards", recovered: "$184,200", pri: 1, draft: false },
          { status: "Active", rule: "Route INR via APAC acquirer", scope: "IN · Cards / UPI", recovered: "$42,180", pri: 2, draft: false },
          { status: "Active", rule: "3DS challenge if risk score > 60", scope: "EU · Cards", recovered: "—", pri: 3, draft: false },
          { status: "Draft", rule: "Force USDT on B2B > $5,000", scope: "Global · Crypto", recovered: "$71,400", pri: 4, draft: true },
        ].map((r, i) => (
          <div
            key={r.rule}
            className="ct-row grid grid-cols-12 items-center gap-2 border-b border-border/20 px-3 py-2 text-[11px] transition hover:bg-primary/5 last:border-0"
            style={{ animationDelay: `${1400 + i * 80}ms` }}
          >
            <div className="col-span-1">
              <span className={`rounded-full border px-1.5 py-0.5 text-[9px] ${r.draft ? "border-amber-400/40 bg-amber-400/10 text-amber-300" : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"}`}>
                {r.status}
              </span>
            </div>
            <div className="col-span-5 flex items-center gap-1.5 truncate">
              <GripVertical className="h-3 w-3 text-muted-foreground/60" />
              <span className="truncate">{r.rule}</span>
            </div>
            <div className="col-span-3 truncate text-muted-foreground">{r.scope}</div>
            <div className="col-span-2 text-right font-medium tabular-nums text-emerald-300/90">{r.recovered}</div>
            <div className="col-span-1 text-right font-mono text-muted-foreground">#{r.pri}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================== Scene 4: Regions ============================== */
function SceneRegions() {
  const regions = [
    { name: "North America", code: "NA", rate: "95.1%", top: "30%", left: "22%" },
    { name: "Europe", code: "EU", rate: "94.6%", top: "26%", left: "52%" },
    { name: "APAC", code: "APAC", rate: "92.8%", top: "44%", left: "78%" },
    { name: "LATAM", code: "LATAM", rate: "89.4%", top: "70%", left: "30%" },
  ];
  const days = [180, 215, 198, 244, 268, 222, 290, 256, 310, 282];
  const max = Math.max(...days);
  return (
    <div className="ct-scene relative h-full overflow-hidden p-4">
      <div className="mb-3 ct-rise">
        <div className="text-lg font-semibold">Regional Performance</div>
        <div className="text-[11px] text-muted-foreground">Approval rate by region · 10-day volume</div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {/* Map */}
        <div className="ct-rise glass relative col-span-3 h-[270px] rounded-lg p-3" style={{ animationDelay: "150ms" }}>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Approval rate · last 30 days</div>
          <div
            className="relative mt-2 h-[220px] w-full rounded-md"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.68 0.18 250 / 0.12), transparent 70%)",
              backgroundColor: "oklch(0.22 0.06 260 / 0.4)",
            }}
          >
            {/* faux landmasses */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "radial-gradient(circle at 22% 32%, oklch(0.5 0.06 260) 0 6%, transparent 7%), radial-gradient(circle at 52% 28%, oklch(0.5 0.06 260) 0 5%, transparent 6%), radial-gradient(circle at 78% 46%, oklch(0.5 0.06 260) 0 6%, transparent 7%), radial-gradient(circle at 32% 72%, oklch(0.5 0.06 260) 0 5%, transparent 6%)",
            }} />
            {regions.map((r, i) => (
              <div
                key={r.code}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: r.top, left: r.left, animationDelay: `${400 + i * 150}ms` }}
              >
                <div className="relative">
                  <span className="co-region-pulse absolute inset-0 -m-1 rounded-full bg-primary/40" />
                  <span className="relative block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.78_0.16_240/0.8)]" />
                </div>
                <div className="mt-1 -translate-x-1/2 rounded-md border border-border/60 bg-card/80 px-1.5 py-0.5 text-center text-[9px] backdrop-blur">
                  <div className="font-semibold">{r.code}</div>
                  <div className="text-emerald-300">{r.rate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10-day bars */}
        <div className="ct-rise glass col-span-2 h-[270px] rounded-lg p-3" style={{ animationDelay: "300ms" }}>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Daily volume · last 10 days</div>
          <div className="mt-1 text-[11px] font-semibold">$2.48M total</div>
          <div className="mt-3 flex h-[180px] items-end gap-1.5">
            {days.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="ct-area-in w-full rounded-t bg-gradient-to-t from-primary to-electric-glow"
                  style={{
                    height: `${(d / max) * 100}%`,
                    animationDelay: `${500 + i * 60}ms`,
                  }}
                />
                <div className="text-[8px] text-muted-foreground">D{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Region table */}
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {regions.map((r, i) => (
          <div
            key={`tile-${r.code}`}
            className="ct-rise glass rounded-md p-2"
            style={{ animationDelay: `${700 + i * 90}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-muted-foreground">{r.name}</div>
              <Globe2 className="h-3 w-3 text-primary" />
            </div>
            <div className="mt-0.5 text-sm font-semibold">{r.rate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================== Scene 5: AI Insight ============================== */
function SceneAIInsight() {
  const userMsg = "Summarise the last 90 days — anything I should act on?";
  const bars = [42, 58, 51, 64, 70, 62, 78, 81, 74, 88, 92, 96];
  return (
    <div className="ct-scene relative h-full overflow-hidden p-4">
      <div className="mb-3 ct-rise">
        <div className="text-lg font-semibold">AI Insight Assistant</div>
        <div className="text-[11px] text-muted-foreground">Trained on your acquirer, routing and decline data</div>
      </div>

      <div className="space-y-3">
        <div className="ct-rise flex gap-2" style={{ animationDelay: "100ms" }}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <Bot className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="glass max-w-[80%] rounded-lg rounded-tl-none px-3 py-2 text-[11px]">
            Welcome back. How can I help you today?
          </div>
        </div>

        <div className="ct-rise flex justify-end gap-2" style={{ animationDelay: "900ms" }}>
          <div className="max-w-[80%] rounded-lg rounded-tr-none bg-foreground/95 px-3 py-2 text-[11px] text-background">
            <TypingText text={userMsg} startDelay={1000} speed={26} />
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
            <User className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="ct-rise flex gap-2" style={{ animationDelay: "3100ms" }}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <Bot className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="glass flex items-center gap-1 rounded-lg rounded-tl-none px-3 py-2">
            <span className="ct-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            <span className="ct-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "180ms" }} />
            <span className="ct-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "360ms" }} />
          </div>
        </div>

        <div className="ct-rise flex gap-2" style={{ animationDelay: "4400ms" }}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <Bot className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="glass max-w-[88%] space-y-1.5 rounded-lg rounded-tl-none px-3 py-2.5 text-[11px] leading-relaxed">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Last 90 days · BoxCharge AI Insight</div>
            <p>
              Smart routing recovered approximately <strong className="text-emerald-300">$184K</strong> in payment attempts that would otherwise have failed. APM share grew <strong>+6.2pp</strong> in APAC, led by GrabPay and PayNow. Card approval improved by <strong>+0.8pp</strong> after enabling 3DS frictionless and retry cascading on soft-decline codes (05 / 51 / 91). Tokenized cards now represent <strong>64%</strong> of card volume.
            </p>

            {/* 12 weekly bars */}
            <div className="mt-2 flex h-10 items-end gap-1">
              {bars.map((b, i) => (
                <div
                  key={i}
                  className="ct-area-in w-2 rounded-sm bg-gradient-to-t from-primary/60 to-electric-glow"
                  style={{ height: `${b}%`, animationDelay: `${4800 + i * 60}ms` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              <span>Recommendation: extend cascading to your EU acquirer slot — est. <strong>+$22K</strong> additional approvals next quarter.</span>
            </div>
            <div className="flex items-center gap-1.5 pt-0.5 text-[10px] text-amber-300">
              <AlertTriangle className="h-3 w-3" />
              <span>Chargeback rate stable at 0.18% — no action required.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-3">
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-muted-foreground">
          <span className="flex-1">Type your message...</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Send className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingText({ text, startDelay = 0, speed = 30 }: { text: string; startDelay?: number; speed?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const tick = () => {
        setI((v) => {
          if (v >= text.length) return v;
          timer = setTimeout(tick, speed);
          return v + 1;
        });
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, startDelay, speed]);
  return (
    <>
      {text.slice(0, i)}
      {i < text.length && <span className="ct-caret">|</span>}
    </>
  );
}
