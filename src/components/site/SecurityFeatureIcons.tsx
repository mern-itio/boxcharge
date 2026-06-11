import { useId, type ReactElement, type ReactNode } from "react";

function ShieldBadge({
  color,
  children,
  gradId,
  size = 48,
}: {
  color: string;
  children: ReactNode;
  gradId: string;
  size?: number;
}) {
  return (
    <svg viewBox="0 0 56 56" width={size} height={size} role="img" aria-hidden className="shrink-0 drop-shadow-sm">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M28 4 L48 12 V28 C48 40 38 50 28 52 C18 50 8 40 8 28 V12 Z"
        fill={`url(#${gradId})`}
        stroke={color}
        strokeWidth="1.2"
      />
      {children}
    </svg>
  );
}

function Badge({ color, top, bottom, icon }: { color: string; top: string; bottom?: string; icon?: ReactNode }) {
  const gradId = useId();
  return (
    <ShieldBadge color={color} gradId={gradId}>
      {icon}
      <text x="28" y={bottom ? 24 : 30} textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontWeight={800} fontSize="9" fill="#FFFFFF">
        {top}
      </text>
      {bottom && (
        <text x="28" y="38" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontWeight={700} fontSize="7" fill="rgba(255,255,255,0.9)">
          {bottom}
        </text>
      )}
    </ShieldBadge>
  );
}

const FEATURE_ICONS: Record<string, () => ReactElement> = {
  "PCI DSS Aligned Infrastructure": () => (
    <Badge color="#10B981" top="PCI" bottom="DSS" />
  ),
  "3DS Authentication Layer": () => (
    <Badge color="#6366F1" top="3DS2" bottom="AUTH" />
  ),
  "Advanced Card Tokenization": () => {
    const gradId = useId();
    return (
      <ShieldBadge color="#F59E0B" gradId={gradId}>
        <circle cx="28" cy="24" r="7" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="28" cy="24" r="2.5" fill="#FFFFFF" />
        <text x="28" y="40" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={700} fontSize="6.5" fill="#FFF7E6">TOKEN</text>
      </ShieldBadge>
    );
  },
  "Fraud Prevention Rules": () => {
    const gradId = useId();
    return (
      <ShieldBadge color="#EF4444" gradId={gradId}>
        <path d="M28 16 L34 22 L28 28 L22 22 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="28" cy="22" r="2" fill="#FFFFFF" />
        <text x="28" y="40" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={700} fontSize="6.5" fill="#FEE2E2">FRAUD</text>
      </ShieldBadge>
    );
  },
  "Velocity Controls": () => {
    const gradId = useId();
    return (
      <ShieldBadge color="#0EA5E9" gradId={gradId}>
        <path d="M18 30 L24 22 L30 26 L38 18" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="38" cy="18" r="2" fill="#FFFFFF" />
        <text x="28" y="40" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={700} fontSize="6" fill="#E0F2FE">VELOCITY</text>
      </ShieldBadge>
    );
  },
  "Secure S2S Integration": () => (
    <Badge color="#8B5CF6" top="S2S" bottom="API" />
  ),
  "Transaction Monitoring": () => {
    const gradId = useId();
    return (
      <ShieldBadge color="#14B8A6" gradId={gradId}>
        <path d="M18 28 H22 V24 H26 V30 H30 V22 H34 V28 H38" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
        <text x="28" y="40" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={700} fontSize="6" fill="#CCFBF1">MONITOR</text>
      </ShieldBadge>
    );
  },
  "Customer Authentication Mechanisms": () => {
    const gradId = useId();
    return (
      <ShieldBadge color="#EC4899" gradId={gradId}>
        <circle cx="28" cy="22" r="5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
        <path d="M22 32 C22 28 24 26 28 26 C32 26 34 28 34 32" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
        <text x="28" y="40" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={700} fontSize="6.5" fill="#FCE7F3">SCA</text>
      </ShieldBadge>
    );
  },
};

export function SecurityFeatureIcon({ name }: { name: string }) {
  const Cmp = FEATURE_ICONS[name];
  if (!Cmp) return null;
  return <Cmp />;
}
