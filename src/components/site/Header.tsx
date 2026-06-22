import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/boxcharge-logo.png";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";

type NavItem = {
  label: string;
  to: string;
  items?: Array<{ label: string; to: string }>;
};

const nav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  {
    label: "Solutions",
    to: "/solutions",
    items: [
      { label: "Global Merchant Services", to: "/solutions/global-merchant-services" },
      { label: "Offshore Merchant Accounts", to: "/solutions/offshore-merchant-accounts" },
      { label: "Cross-Border Payment Gateway", to: "/solutions/cross-border-payment-gateway" },
      { label: "Payment Orchestration", to: "/solutions/payment-orchestration" },
      { label: "Alternative Payment Methods", to: "/solutions/apm-connectivity" },
      { label: "IBAN & Settlement Solutions", to: "/solutions/iban-settlement" },
    ],
  },
  {
    label: "Technology",
    to: "/technology",
    items: [
      { label: "Smart Routing", to: "/technology/smart-routing" },
      { label: "Cascading Payments", to: "/technology/cascading-payments" },
      { label: "Fraud Prevention Layer", to: "/technology/fraud-prevention" },
      { label: "3DS Authentication", to: "/technology/3ds-authentication" },
      { label: "Tokenization", to: "/technology/tokenization" },
      { label: "PCI DSS Aligned Infrastructure", to: "/technology/pci-security" },
    ],
  },
  {
    label: "Developers",
    to: "/developers",
    items: [
      { label: "API Integration", to: "/developers/api-integration" },
      { label: "Server-to-Server Integration", to: "/developers/s2s-integration" },
      { label: "Webhook Notifications", to: "/developers/webhooks" },
      { label: "Hosted Checkout", to: "/developers/hosted-checkout" },
      { label: "Integration Support", to: "/contact" },
    ],
  },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { c } = useContent("global");
  const settings = useSiteSettings();
  const ctaLabel = settings?.header_cta_label || c("header_cta_label", "Apply Now");
  const ctaHref = settings?.header_cta_href || c("header_cta_href", "/contact#apply");
  const logoSrc = settings?.logo_url || logo;
  const siteName = settings?.site_name || "BoxCharge";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-2 max-w-7xl px-3 sm:mt-3 sm:px-4">
        <div className="glass-strong gradient-border flex items-center justify-between gap-2 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3">
          <Link to="/" className="flex min-w-0 shrink items-center" aria-label={`${siteName} home`}>
            <img
              src={logoSrc}
              alt={`${siteName} — One API, Many Payments`}
              className="h-8 w-auto max-w-[140px] object-contain sm:h-9 sm:max-w-none md:h-10"
              width={1536}
              height={512}
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-white/5 hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                  {item.items && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                </Link>
                {item.items && (
                  <div className="invisible absolute left-1/2 top-full z-10 w-72 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="glass-strong rounded-xl p-2">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-white/5 hover:text-foreground"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              className="hidden bg-gradient-to-r from-primary to-electric-glow text-primary-foreground shadow-[0_0_30px_-5px_oklch(0.68_0.18_250/0.6)] hover:opacity-90 sm:inline-flex"
            >
              <a href={ctaHref}>{ctaLabel}</a>
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className="rounded-md p-2 lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="glass-strong mt-2 rounded-2xl p-4 lg:hidden">
            {nav.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-foreground/85 hover:bg-white/5"
                >
                  {item.label}
                </Link>
                {item.items && (
                  <div className="ml-3 border-l border-border/60 pl-3">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-white/5"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
