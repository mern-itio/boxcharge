import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Globe, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/boxcharge-logo.png";
import { TelegramIcon } from "@/components/site/TelegramIcon";
import { useContent } from "@/hooks/useContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const linkCols = [
  {
    title: "Solutions",
    items: [
      { label: "Global Merchant Services", to: "/solutions/global-merchant-services" },
      { label: "Offshore Merchant Accounts", to: "/solutions/offshore-merchant-accounts" },
      { label: "Cross-Border Gateway", to: "/solutions/cross-border-payment-gateway" },
      { label: "Payment Orchestration", to: "/solutions/payment-orchestration" },
      { label: "Alternative Payment Methods", to: "/solutions/apm-connectivity" },
      { label: "IBAN & SEPA Settlement", to: "/solutions/iban-settlement" },
    ],
  },
  {
    title: "Technology",
    items: [
      { label: "Smart Routing", to: "/technology/smart-routing" },
      { label: "Cascading Payments", to: "/technology/cascading-payments" },
      { label: "Fraud Prevention", to: "/technology/fraud-prevention" },
      { label: "3DS Authentication", to: "/technology/3ds-authentication" },
      { label: "Tokenization", to: "/technology/tokenization" },
      { label: "PCI DSS Infrastructure", to: "/technology/pci-security" },
    ],
  },
  {
    title: "Developers",
    items: [
      { label: "API Reference", to: "/developers/api-reference" },
      { label: "Server-to-Server", to: "/developers/api-reference/simple-s2s" },
      { label: "Webhooks", to: "/developers/api-reference/webhooks" },
      { label: "Hosted Checkout", to: "/developers/hosted-checkout" },
      { label: "Integration Guide", to: "/developers" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Blog", to: "/blog" },
      { label: "Payouts", to: "/payouts" },
      { label: "Apply Now", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "AML Policy", to: "/policies/aml" },
      { label: "Privacy Policy", to: "/policies/privacy" },
      { label: "Terms of Use", to: "/policies/terms" },
      { label: "Merchant Protection", to: "/policies/merchant-protection" },
      { label: "Chargeback Policy", to: "/policies/chargeback" },
    ],
  },
];

const WHATSAPP_NUMBER = "447700900123";
const WHATSAPP_PREFILLS = [
  "Hi BoxCharge, I'd like to discuss merchant onboarding for my SaaS business.",
  "Hi BoxCharge, exploring cross-border payment options for our e-commerce store.",
  "Hi BoxCharge, interested in SEPA pay-in and pay-out for our EU customers.",
  "Hi BoxCharge, looking at orchestration & smart routing for our checkout.",
  "Hi BoxCharge, can you support APMs for travel bookings in APAC?",
];

const TRUST_BADGES = ["PCI DSS Aligned", "3DS2 Ready", "GDPR Aware", "Global Coverage"];

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center text-[13px] leading-snug text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="mr-0 h-px w-0 bg-primary transition-all duration-200 group-hover:mr-2 group-hover:w-2" />
        {label}
      </Link>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 text-foreground transition hover:border-primary/60 hover:bg-primary/20"
    >
      {children}
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
}

export function Footer() {
  const { c } = useContent("global");
  const settings = useSiteSettings();
  const waNumber = c("whatsapp_number", WHATSAPP_NUMBER);
  const [prefillIdx, setPrefillIdx] = useState(0);
  useEffect(() => {
    setPrefillIdx(Math.floor(Math.random() * WHATSAPP_PREFILLS.length));
  }, []);
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(WHATSAPP_PREFILLS[prefillIdx])}`;

  const blurb =
    settings?.footer_blurb ||
    c(
      "footer_blurb",
      "BoxCharge provides global merchant services, cross-border payment gateway connectivity, payment orchestration, APM access, and secure payment infrastructure for legitimate businesses operating across international markets.",
    );
  const domain = settings?.footer_domain || c("footer_domain", "boxchrge.com");
  const email = settings?.footer_email || c("footer_email", "growth@boxchrge.com");
  const logoSrc = settings?.logo_url || logo;
  const siteName = settings?.site_name || "BoxCharge";
  const tagline = c("tagline", "One API · Many Payments · Built Global");
  const bandTitle = c("expert_band_title", `Talk to a ${siteName} expert`);
  const bandSubtitle = c(
    "expert_band_subtitle",
    "Get a tailored setup proposal — typical response within one business day.",
  );
  const year = new Date().getFullYear();

  const socials = [
    { href: settings?.social_linkedin ?? "", label: "LinkedIn", icon: Linkedin },
    { href: settings?.social_facebook ?? "", label: "Facebook", icon: Facebook },
    { href: settings?.social_twitter ?? "", label: "Twitter", icon: Twitter },
    { href: settings?.social_telegram ?? "", label: "Telegram", icon: TelegramIcon },
    { href: settings?.social_youtube ?? "", label: "YouTube", icon: Youtube },
  ].filter((s) => s.href);

  return (
    <footer className="relative border-t border-border/50 bg-[#070b14]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14">
        {/* Expert CTA */}
        <div className="mb-14 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 via-card/40 to-primary/5">
          <div className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Merchant support
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{bandTitle}</h3>
              <p className="mt-1.5 max-w-md text-sm text-muted-foreground">{bandSubtitle}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-electric-glow px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-[0_0_32px_-8px_oklch(0.68_0.18_250/0.6)] transition hover:opacity-90"
              >
                Start a Conversation
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-2.5 text-xs font-semibold text-[#4ade80] transition hover:bg-[#25D366]/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Main grid — brand + 5 equal columns */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-2">
            <Link to="/" className="inline-flex" aria-label={`${siteName} home`}>
              <img
                src={logoSrc}
                alt={`${siteName} — ${tagline}`}
                className="h-9 w-auto"
                width={1536}
                height={512}
                loading="lazy"
              />
            </Link>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-primary/80">
              {tagline}
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
              {blurb}
            </p>

            <div className="mt-5 space-y-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-[13px] text-muted-foreground transition hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                  {email}
                </a>
              )}
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Globe className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                {domain}
              </div>
            </div>

            {socials.length > 0 && (
              <div className="mt-5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Follow us
                </div>
                <div className="flex flex-wrap items-center gap-2">
                {socials.map(({ href, label, icon: Icon }) => (
                  <SocialIcon key={label} href={href} label={label}>
                    <Icon className="h-4 w-4" />
                  </SocialIcon>
                ))}
                </div>
              </div>
            )}
          </div>

          {linkCols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/90">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <FooterLink key={item.to + item.label} to={item.to} label={item.label} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-border/40 py-5">
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
            >
              <span className="h-1 w-1 rounded-full bg-primary/80" />
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-4 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <p>© {year} {siteName}. All rights reserved.</p>
          <p className="max-w-xl text-center lg:text-right">
            Services subject to onboarding, jurisdiction review, and compliance approval.
            Coverage depends on merchant profile and partner availability.
          </p>
        </div>
      </div>
    </footer>
  );
}
