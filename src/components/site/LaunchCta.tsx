import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { cmsList, sectionHeader } from "@/lib/homeCms";

const DEFAULT_BULLETS = [
  { icon: Sparkles, t: "Routing & APM map for your corridors" },
  { icon: ShieldCheck, t: "Compliance-aware onboarding outline" },
  { icon: Clock, t: "Typical response within 1 business day" },
  { icon: ArrowRight, t: "No obligation — review the plan first" },
];

const DEFAULT_STEPS = [
  "We review your details and corridors",
  "A specialist is matched to your profile",
  "You receive a tailored setup proposal",
  "Onboarding kicks off when you're ready",
];

const BULLET_ICONS = [Sparkles, ShieldCheck, Clock, ArrowRight];

export function LaunchCta() {
  const { c } = useContent("home");
  const header = sectionHeader(c, "launch", {
    eyebrow: "Plan your launch",
    title: "Ready to See Your Custom Setup?",
    subtitle:
      "Share a few details about your business and a BoxCharge specialist will come back with a tailored routing, APM and onboarding recommendation — typically within one business day.",
  });
  const cmsBullets = cmsList<{ text?: string }>(c, "launch_bullets");
  const bullets =
    cmsBullets.length > 0
      ? cmsBullets.map((b, i) => ({
          icon: BULLET_ICONS[i] ?? Sparkles,
          t: b.text ?? "",
        }))
      : DEFAULT_BULLETS;
  const cmsSteps = cmsList<{ text?: string }>(c, "launch_steps");
  const steps =
    cmsSteps.length > 0 ? cmsSteps.map((s) => s.text ?? "").filter(Boolean) : DEFAULT_STEPS;
  const ctaLabel = c("launch_cta_label", "Get My Custom Plan");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass-strong gradient-border relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {header.eyebrow && (
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {header.eyebrow}
                </div>
              )}
              <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                <span className="gradient-text">{header.title}</span>
              </h2>
              {header.subtitle && (
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {header.subtitle}
                </p>
              )}

              <ul className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
                {bullets.map(({ icon: Icon, t }) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground/85">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-electric-glow px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.68_0.18_250/0.7)] transition-opacity hover:opacity-90"
                >
                  {ctaLabel} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Or send a direct inquiry →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  What happens next
                </div>
                <ol className="mt-4 space-y-4 text-sm">
                  {steps.map((s, i) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-electric-glow text-[11px] font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span className="text-foreground/85">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
