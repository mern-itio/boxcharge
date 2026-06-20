import { useEffect, useState } from "react";
import { BrandIcon, BrandIconRow } from "@/components/site/PaymentMethodIcons";

const APPROVALS = [
  { country: "DE", amount: "€ 1,248.00", method: "SEPA" },
  { country: "GB", amount: "£ 879.50", method: "Visa" },
  { country: "SG", amount: "S$ 2,140.00", method: "PayNow" },
  { country: "AE", amount: "AED 4,320.00", method: "Mastercard" },
  { country: "US", amount: "$ 1,920.00", method: "Apple Pay" },
  { country: "HK", amount: "HK$ 6,480.00", method: "WeChat Pay" },
  { country: "BR", amount: "R$ 980.00", method: "Pix" },
  { country: "IN", amount: "₹ 18,420.00", method: "UPI" },
];

export function GlobeVisual() {
  const nodes = [
    { x: 160, y: 180, label: "EU" },
    { x: 300, y: 130, label: "UK" },
    { x: 440, y: 200, label: "APAC" },
    { x: 230, y: 320, label: "MEA" },
    { x: 410, y: 360, label: "SEA" },
    { x: 130, y: 380, label: "LATAM" },
    { x: 340, y: 460, label: "AU" },
    { x: 500, y: 290, label: "JP" },
  ];
  const center = { x: 300, y: 300 };

  return (
    <div
      className="relative aspect-square w-full"
      style={{ animation: "float 8s ease-in-out infinite" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-6 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute inset-20 rounded-full bg-accent/10 blur-2xl" />

      <svg
        viewBox="0 0 600 600"
        className="relative h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="globe" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="oklch(0.30 0.07 260)" />
            <stop offset="70%" stopColor="oklch(0.20 0.05 260)" />
            <stop offset="100%" stopColor="oklch(0.16 0.04 260)" />
          </radialGradient>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.16 240)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 50)" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.18 50)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 50)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="300" cy="300" r="240" fill="url(#globe)" />
        <circle
          cx="300"
          cy="300"
          r="240"
          fill="none"
          stroke="oklch(0.68 0.18 250 / 0.4)"
          strokeWidth="1"
        />

        {/* Lat/long grid — slow rotation */}
        <g
          fill="none"
          stroke="oklch(0.78 0.16 240 / 0.18)"
          strokeWidth="0.8"
          style={{
            transformOrigin: "300px 300px",
            animation: "globe-rotate 60s linear infinite",
          }}
        >
          {[60, 120, 180, 240].map((r) => (
            <ellipse key={r} cx="300" cy="300" rx="240" ry={r} />
          ))}
          {[0, 30, 60, 90, 120, 150].map((a) => (
            <ellipse
              key={a}
              cx="300"
              cy="300"
              rx="240"
              ry="80"
              transform={`rotate(${a} 300 300)`}
            />
          ))}
        </g>

        {/* Animated arcs firing sequentially */}
        {nodes.map((n, i) => {
          const cx = (center.x + n.x) / 2;
          const cy = (center.y + n.y) / 2 - 70;
          const d = `M ${center.x} ${center.y} Q ${cx} ${cy} ${n.x} ${n.y}`;
          return (
            <path
              key={`arc-${i}`}
              d={d}
              fill="none"
              stroke="url(#line)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="220"
              style={{ animation: `arc-draw 4.8s ease-in-out ${i * 0.55}s infinite` }}
            />
          );
        })}

        {/* Center hub with pulse */}
        <g>
          <circle cx="300" cy="300" r="28" fill="url(#pulse)">
            <animate attributeName="r" values="20;36;20" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="300" r="8" fill="oklch(0.78 0.16 240)" />
          <circle cx="300" cy="300" r="3" fill="white" />
        </g>

        {/* Node markers with pulsing rings */}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="6" fill="url(#pulse)">
              <animate
                attributeName="r"
                values="4;14;4"
                dur="2.4s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;0;0.9"
                dur="2.4s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={n.x} cy={n.y} r="4" fill="oklch(0.72 0.18 50)" />
            <text
              x={n.x + 10}
              y={n.y - 8}
              fill="oklch(0.92 0.02 250)"
              fontSize="10"
              fontFamily="Inter"
              opacity="0.7"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating transaction chips — hidden on narrow screens to avoid overflow */}
      <ApprovalChip className="left-2 top-8 hidden sm:block" />
      <Chip className="right-0 top-1/3 hidden sm:block" delay="2.4s" label="Routed via" value="Acquirer · APAC" />
      <ApmChip className="bottom-6 left-6 hidden md:block" delay="4.8s" />
      <Chip className="right-4 bottom-16 hidden md:block" delay="3.6s" label="3DS" value="Authenticated" />
    </div>
  );
}

function ApprovalChip({ className }: { className: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % APPROVALS.length), 3500);
    return () => clearInterval(id);
  }, []);
  const a = APPROVALS[i];
  return (
    <div
      className={`absolute glass rounded-xl px-3 py-2 text-xs ${className}`}
      style={{ animation: `chip-drift 7s ease-in-out 0s infinite` }}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Approved · {a.country}
      </div>
      <div key={i} className="reveal-init reveal-fade reveal-in flex items-center gap-2 font-medium">
        <span>{a.amount}</span>
        <BrandIcon name={a.method} size="xs" />
      </div>
    </div>
  );
}

function Chip({
  className,
  label,
  value,
  delay,
}: {
  className: string;
  label: string;
  value: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute glass rounded-xl px-3 py-2 text-xs ${className}`}
      style={{ animation: `chip-drift 7s ease-in-out ${delay} infinite` }}
    >
      <div className="text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function ApmChip({ className, delay }: { className: string; delay: string }) {
  return (
    <div
      className={`absolute glass rounded-xl px-3 py-2 text-xs ${className}`}
      style={{ animation: `chip-drift 7s ease-in-out ${delay} infinite` }}
    >
      <div className="text-muted-foreground">APM</div>
      <BrandIconRow names={["PIX", "iDEAL", "SEPA"]} size="xs" className="mt-1" gap="gap-1" />
    </div>
  );
}
