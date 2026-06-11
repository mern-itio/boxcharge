import { Link } from "@tanstack/react-router";
import {
  ShoppingBag,
  Cloud,
  Plane,
  GraduationCap,
  Store,
  Briefcase,
  Stethoscope,
  Truck,
  Megaphone,
  Package,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const industries = [
  { icon: ShoppingBag, t: "E-commerce & Retail", b: "Cards, wallets, and local APMs for global checkout." },
  { icon: Cloud, t: "SaaS & Digital Subscriptions", b: "Recurring billing, tokenized cards, smart retries." },
  { icon: Plane, t: "Travel & Hospitality", b: "Multi-currency acceptance and regional acquiring." },
  { icon: GraduationCap, t: "Education & E-learning", b: "Cross-border tuition collections and APMs." },
  { icon: Store, t: "Marketplaces & Platforms", b: "Split flows, multi-merchant onboarding, payouts." },
  { icon: Briefcase, t: "Professional Services", b: "Secure card capture, invoicing-friendly flows." },
  { icon: Stethoscope, t: "Healthtech & Wellness", b: "Compliant patient payments and subscription care." },
  { icon: Truck, t: "Logistics & Supply Chain", b: "B2B settlements, multi-currency invoicing, payouts." },
  { icon: Megaphone, t: "Digital Marketing Agencies", b: "International client billing and recurring retainers." },
  { icon: Package, t: "Subscription & D2C Brands", b: "Trial-to-paid flows, dunning, smart card retries." },
];

export function Industries() {
  return (
    <section className="relative py-24">
      <div className="grid-bg absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Industries
          </div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            <span className="gradient-text">Built for the Businesses You Run</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Payment flows tailored to how your customers buy, wherever they are.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ icon: Icon, t, b }, i) => (
            <Reveal key={t} delay={i * 70}>
              <Link
                to="/contact"
                className="group glass gradient-border card-lift relative block overflow-hidden rounded-2xl p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 ring-1 ring-white/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary transition-transform group-hover:translate-x-0.5">
                  Talk to us about {t.split(" ")[0]} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
