import { Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Bitrix24ContactForm } from "@/components/site/Bitrix24ContactForm";

export function ApplyForm() {
  return (
    <section id="apply" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-5">
          <aside className="lg:col-span-2">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Get a tailored plan
            </div>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              <span className="gradient-text">Get a Custom Integration Plan</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Share a few details and a BoxCharge specialist will get back to you with a tailored
              recommendation for your business.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                { icon: Sparkles, t: "Routing & APM recommendation for your corridors" },
                { icon: ShieldCheck, t: "Compliance-aware onboarding outline" },
                { icon: Clock, t: "Typical response within 1 business day" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Prefer email?{" "}
              <a href="mailto:growth@boxchrge.com" className="text-primary hover:underline">
                growth@boxchrge.com
              </a>
            </p>
          </aside>

          <div className="lg:col-span-3">
            <div className="glass-strong gradient-border rounded-3xl p-4 sm:p-6">
              <Bitrix24ContactForm />
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Applications are reviewed based on business profile, jurisdiction, partner availability,
              and compliance requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
