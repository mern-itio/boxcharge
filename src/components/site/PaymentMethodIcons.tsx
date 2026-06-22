import type { ReactElement, ReactNode } from "react";

import alipayLogo from "@/assets/payment-icons/apm-alipay.svg?url";
import bancontactLogo from "@/assets/payment-icons/apm-bancontact.svg?url";
import giropayLogo from "@/assets/payment-icons/apm-giropay.svg?url";
import grabLogo from "@/assets/payment-icons/apm-grab.svg?url";
import idealLogo from "@/assets/payment-icons/apm-ideal.svg?url";
import klarnaLogo from "@/assets/payment-icons/apm-klarna.svg?url";
import paypalLogo from "@/assets/payment-icons/apm-paypal.svg?url";
import pixLogo from "@/assets/payment-icons/apm-pix.svg?url";
import przelewy24Logo from "@/assets/payment-icons/apm-przelewy24.svg?url";
import sepaLogo from "@/assets/payment-icons/apm-sepa.svg?url";
import shopeeLogo from "@/assets/payment-icons/apm-shopee.svg?url";
import usdtLogo from "@/assets/payment-icons/apm-usdt.svg?url";
import wechatLogo from "@/assets/payment-icons/apm-wechat-pay.svg?url";
import amexLogo from "@/assets/payment-icons/cards-american-express.svg?url";
import dinersLogo from "@/assets/payment-icons/cards-diners.svg?url";
import discoverLogo from "@/assets/payment-icons/cards-discover.svg?url";
import jcbLogo from "@/assets/payment-icons/cards-jcb.svg?url";
import mastercardLogo from "@/assets/payment-icons/cards-mastercard.svg?url";
import unionpayLogo from "@/assets/payment-icons/cards-unionpay.svg?url";
import visaLogo from "@/assets/payment-icons/cards-visa.svg?url";
import applePayLogo from "@/assets/payment-icons/wallets-apple-pay.svg?url";
import googlePayLogo from "@/assets/payment-icons/wallets-google-pay.svg?url";

type IconProps = { className?: string; size?: "xs" | "sm" | "md" | "lg" };

const SIZE: Record<NonNullable<IconProps["size"]>, string> = {
  xs: "h-4",
  sm: "h-5",
  md: "h-6",
  lg: "h-8",
};

const BRAND_LOGOS: Record<string, string> = {
  VISA: visaLogo,
  Visa: visaLogo,
  "Card networks": visaLogo,
  Mastercard: mastercardLogo,
  "Local cards": mastercardLogo,
  AMEX: amexLogo,
  Amex: amexLogo,
  "American Express": amexLogo,
  JCB: jcbLogo,
  Discover: discoverLogo,
  Diners: dinersLogo,
  "Diners Club": dinersLogo,
  UnionPay: unionpayLogo,
  SEPA: sepaLogo,
  "SEPA Direct Debit": sepaLogo,
  "SEPA Instant": sepaLogo,
  "SEPA payouts": sepaLogo,
  "SEPA Credit Transfer": sepaLogo,
  "SEPA Instant (SCT Inst)": sepaLogo,
  PIX: pixLogo,
  Pix: pixLogo,
  Klarna: klarnaLogo,
  Sofort: klarnaLogo,
  Alipay: alipayLogo,
  "WeChat Pay": wechatLogo,
  WeChat: wechatLogo,
  PayPal: paypalLogo,
  "Apple Pay": applePayLogo,
  "Google Pay": googlePayLogo,
  GrabPay: grabLogo,
  ShopeePay: shopeeLogo,
  USDT: usdtLogo,
  "USDT TRC-20": usdtLogo,
  iDEAL: idealLogo,
  Bancontact: bancontactLogo,
  GiroPay: giropayLogo,
  giropay: giropayLogo,
  P24: przelewy24Logo,
  Przelewy24: przelewy24Logo,
};

function BrandImage({ src, alt, className, size = "md" }: { src: string; alt: string } & IconProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`${SIZE[size]} w-auto max-w-[80px] object-contain ${className ?? ""}`}
    />
  );
}

function BrandFallback({ name, size = "md" }: { name: string } & IconProps) {
  return (
    <span
      className={`inline-flex ${SIZE[size]} min-w-[2.5rem] items-center justify-center rounded bg-muted/40 px-1.5 text-[9px] font-bold uppercase tracking-wide text-foreground/90`}
    >
      {name.slice(0, 6)}
    </span>
  );
}

export function BrandIcon({ name, className, size = "md" }: { name: string } & IconProps) {
  const src = BRAND_LOGOS[name];
  if (src) return <BrandImage src={src} alt={name} className={className} size={size} />;
  return <BrandFallback name={name} size={size} />;
}

export function PaymentMethodIcon({ name, className, size = "md" }: { name: string } & IconProps) {
  return <BrandIcon name={name} className={className} size={size} />;
}

export function CardNetworkIcon({ name, className, size = "md" }: { name: string } & IconProps) {
  return <BrandIcon name={name} className={className} size={size} />;
}

export function BrandIconRow({
  names,
  size = "sm",
  className,
  gap = "gap-2",
}: {
  names: string[];
  size?: IconProps["size"];
  className?: string;
  gap?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center ${gap} ${className ?? ""}`}>
      {names.map((n) => (
        <span
          key={n}
          title={n}
          className="inline-flex items-center rounded-lg border border-border/50 bg-white/95 px-2 py-1 dark:bg-white/90"
        >
          <BrandIcon name={n} size={size} />
        </span>
      ))}
    </div>
  );
}

/* --------------------------------- Currencies -------------------------------- */

const CURRENCY_META: Record<string, { sym: string; bg: string; fg: string }> = {
  EUR: { sym: "€", bg: "#10298E", fg: "#FFCC00" },
  GBP: { sym: "£", bg: "#012169", fg: "#FFFFFF" },
  USD: { sym: "$", bg: "#0B6E4F", fg: "#FFFFFF" },
  CHF: { sym: "₣", bg: "#D52B1E", fg: "#FFFFFF" },
  SEK: { sym: "kr", bg: "#006AA7", fg: "#FECC02" },
  NOK: { sym: "kr", bg: "#BA0C2F", fg: "#FFFFFF" },
  PLN: { sym: "zł", bg: "#DC143C", fg: "#FFFFFF" },
  AED: { sym: "د.إ", bg: "#00732F", fg: "#FFFFFF" },
  SAR: { sym: "﷼", bg: "#165B33", fg: "#FFFFFF" },
  EGP: { sym: "£", bg: "#CE1126", fg: "#FFFFFF" },
  BRL: { sym: "R$", bg: "#009C3B", fg: "#FFDF00" },
  MXN: { sym: "$", bg: "#006847", fg: "#CE1126" },
  ARS: { sym: "$", bg: "#74ACDF", fg: "#FFFFFF" },
  COP: { sym: "$", bg: "#FCD116", fg: "#003893" },
  SGD: { sym: "S$", bg: "#EF3340", fg: "#FFFFFF" },
  HKD: { sym: "HK$", bg: "#DE2910", fg: "#FFFFFF" },
  INR: { sym: "₹", bg: "#FF9933", fg: "#138808" },
  PHP: { sym: "₱", bg: "#0038A8", fg: "#FCD116" },
  AUD: { sym: "A$", bg: "#012169", fg: "#FFFFFF" },
  NZD: { sym: "NZ$", bg: "#000B3F", fg: "#FFFFFF" },
  USDT: { sym: "₮", bg: "#26A17B", fg: "#FFFFFF" },
};

export function CurrencyIcon({ code, className }: { code: string; className?: string }) {
  const m = CURRENCY_META[code];
  if (!m) return <span className="text-[10px] font-medium text-foreground/80">{code}</span>;
  const w = 60;
  const h = 22;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label={code} className={className}>
      <rect x="0" y="0" width={w} height={h} rx="4" fill={m.bg} />
      <rect x="0" y="0" width="20" height={h} fill="rgba(255,255,255,0.12)" />
      <text
        x="10"
        y={h / 2 + 4}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
        fontWeight={700}
        fontSize="11"
        fill={m.fg}
      >
        {m.sym}
      </text>
      <text
        x="40"
        y={h / 2 + 3.5}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
        fontWeight={700}
        fontSize="10"
        letterSpacing="0.5"
        fill={m.fg}
      >
        {code}
      </text>
    </svg>
  );
}

/* ----------------------------- Compliance Badges ----------------------------- */

function Shield({ children, color = "#3B82F6" }: { children: ReactNode; color?: string }) {
  return (
    <svg viewBox="0 0 56 56" width={56} height={56} role="img" aria-hidden>
      <defs>
        <linearGradient id="shGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M28 4 L48 12 V28 C48 40 38 50 28 52 C18 50 8 40 8 28 V12 Z"
        fill="url(#shGrad)"
        stroke={color}
        strokeWidth="1.2"
      />
      {children}
    </svg>
  );
}

const COMPLIANCE_ICONS: Record<string, () => ReactElement> = {
  "PCI-DSS L1": () => (
    <Shield color="#10B981">
      <text x="28" y="26" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={800} fontSize="9" fill="#FFFFFF">PCI</text>
      <text x="28" y="38" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={700} fontSize="7" fill="#E6FFF5">DSS L1</text>
    </Shield>
  ),
  "3DS2 / EMV": () => (
    <Shield color="#6366F1">
      <text x="28" y="26" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={800} fontSize="10" fill="#FFFFFF">3DS2</text>
      <text x="28" y="38" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={700} fontSize="7" fill="#E6E8FF">EMV</text>
    </Shield>
  ),
  "Network Tokens": () => (
    <Shield color="#F59E0B">
      <circle cx="28" cy="26" r="6" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="28" cy="26" r="2" fill="#FFFFFF" />
      <text x="28" y="42" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={700} fontSize="6" fill="#FFF7E6">TOKEN</text>
    </Shield>
  ),
  "GDPR-ready": () => (
    <Shield color="#0EA5E9">
      <text x="28" y="28" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={800} fontSize="9" fill="#FFFFFF">GDPR</text>
      <circle cx="22" cy="36" r="1.2" fill="#FFFFFF" />
      <circle cx="28" cy="38" r="1.2" fill="#FFFFFF" />
      <circle cx="34" cy="36" r="1.2" fill="#FFFFFF" />
      <circle cx="25" cy="40" r="1.2" fill="#FFFFFF" />
      <circle cx="31" cy="40" r="1.2" fill="#FFFFFF" />
    </Shield>
  ),
  "ISO 27001-aligned": () => (
    <Shield color="#8B5CF6">
      <text x="28" y="26" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={800} fontSize="9" fill="#FFFFFF">ISO</text>
      <text x="28" y="38" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={800} fontSize="8" fill="#EDE9FE">27001</text>
    </Shield>
  ),
  "SOC 2 Type II controls": () => (
    <Shield color="#EC4899">
      <text x="28" y="26" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={800} fontSize="10" fill="#FFFFFF">SOC 2</text>
      <text x="28" y="38" textAnchor="middle" fontFamily="ui-sans-serif" fontWeight={700} fontSize="7" fill="#FCE7F3">TYPE II</text>
    </Shield>
  ),
};

export function ComplianceIcon({ name }: { name: string }) {
  const Cmp = COMPLIANCE_ICONS[name];
  if (!Cmp) return null;
  return <Cmp />;
}
