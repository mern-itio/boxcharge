import { useState } from "react";
import { ShoppingBag, Cloud, Plane, Store, GraduationCap } from "lucide-react";

export type IndustryKey = "ecom" | "saas" | "travel" | "marketplace" | "edu";

export const industryData: Record<
  IndustryKey,
  {
    label: string;
    icon: typeof ShoppingBag;
    sub: string;
    chips: string[];
  }
> = {
  ecom: {
    label: "E-commerce",
    icon: ShoppingBag,
    sub: "Card networks, digital wallets and local APMs in one global checkout — built to win every cart, in every market.",
    chips: ["Local APMs in 30+ markets", "One-click checkout flows", "Cascading retries"],
  },
  saas: {
    label: "SaaS",
    icon: Cloud,
    sub: "Recurring billing, tokenized cards and smart retries that quietly recover the revenue most platforms leak every month.",
    chips: ["Recurring billing", "Card tokenization", "Smart dunning logic"],
  },
  travel: {
    label: "Travel",
    icon: Plane,
    sub: "Multi-currency acceptance and regional acquiring for high-ticket bookings — designed for cross-border travel flows.",
    chips: ["25+ presentment currencies", "Regional acquiring", "3DS for high-ticket"],
  },
  marketplace: {
    label: "Marketplace",
    icon: Store,
    sub: "Split flows, multi-merchant onboarding and orchestrated payouts for platforms moving money between many parties.",
    chips: ["Split payments", "Multi-merchant onboarding", "Orchestrated payouts"],
  },
  edu: {
    label: "Education",
    icon: GraduationCap,
    sub: "Cross-border tuition collections with local payment methods — tuned for international students and recurring intake cycles.",
    chips: ["Cross-border tuition", "Local APMs by region", "Installment-ready flows"],
  },
};

interface Props {
  value: IndustryKey;
  onChange: (k: IndustryKey) => void;
}

export function IndustrySwitcher({ value, onChange }: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-1.5 rounded-full border border-border bg-card/40 p-1 text-xs">
      {(Object.keys(industryData) as IndustryKey[]).map((k) => {
        const { label, icon: Icon } = industryData[k];
        const active = value === k;
        return (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all ${
              active
                ? "bg-gradient-to-r from-primary to-electric-glow text-primary-foreground shadow-[0_0_24px_-6px_oklch(0.68_0.18_250/0.7)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={active}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function useIndustryState() {
  const [industry, setIndustry] = useState<IndustryKey>("ecom");
  return { industry, setIndustry, data: industryData[industry] };
}
