import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";

type Channel = "whatsapp" | "telegram";
type Data = {
  name: string;
  email: string;
  channel: Channel;
  handle: string;
  company: string;
  website: string;
  volume: string;
  regions: string;
  message: string;
};

const empty: Data = {
  name: "",
  email: "",
  channel: "whatsapp",
  handle: "",
  company: "",
  website: "",
  volume: "",
  regions: "",
  message: "",
};

export function ApplyForm() {
  const [step, setStep] = useState<0 | 1>(0);
  const [data, setData] = useState<Data>(empty);
  const [sent, setSent] = useState(false);
  const set = (k: keyof Data) => (v: string) => setData((d) => ({ ...d, [k]: v }));

  const canNext =
    step === 0
      ? data.name.trim() && data.email.trim() && data.handle.trim()
      : data.company.trim() && data.website.trim();

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
          </aside>

          <div className="lg:col-span-3">
            <div className="glass-strong gradient-border rounded-3xl p-6 sm:p-8">
              {sent ? (
                <Done />
              ) : (
                <>
                  {/* Step 0 has NO progress bar — feels like a simple form */}
                  {step === 1 && (
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Step 2 of 2 · Tell us about your business</span>
                        <span>100%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-border/60">
                        <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-electric-glow transition-all duration-500" />
                      </div>
                    </div>
                  )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (step === 0 && canNext) setStep(1);
                      else if (step === 1 && canNext) setSent(true);
                    }}
                    className={step === 0 ? "space-y-4" : "mt-6 space-y-4"}
                  >
                    {step === 0 && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Full Name" value={data.name} onChange={set("name")} required />
                        <Field label="Email" value={data.email} onChange={set("email")} type="email" required />
                        <div className="sm:col-span-2">
                          <label className="mb-1.5 block text-xs font-medium text-foreground/80">
                            How would you prefer we contact you? <span className="text-accent">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {(["whatsapp", "telegram"] as const).map((c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => set("channel")(c)}
                                className={`rounded-full border px-4 py-1.5 text-xs font-medium capitalize transition ${
                                  data.channel === c
                                    ? "border-primary bg-primary/15 text-primary"
                                    : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <Field
                            label={data.channel === "whatsapp" ? "WhatsApp number" : "Telegram handle"}
                            value={data.handle}
                            onChange={set("handle")}
                            required
                            placeholder={data.channel === "whatsapp" ? "+44 7700 900000" : "@yourhandle"}
                          />
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Company Name" value={data.company} onChange={set("company")} required />
                        <Field label="Company Website" value={data.website} onChange={set("website")} required placeholder="https://" />
                        <Field label="Monthly Volume (optional)" value={data.volume} onChange={set("volume")} placeholder="e.g. $250,000" />
                        <Field label="Target Regions" value={data.regions} onChange={set("regions")} placeholder="EU, MENA, APAC…" />
                        <div className="sm:col-span-2">
                          <label className="mb-1.5 block text-xs font-medium text-foreground/80">
                            Tell us a bit about your business
                          </label>
                          <textarea
                            value={data.message}
                            onChange={(e) => set("message")(e.target.value)}
                            maxLength={1000}
                            rows={4}
                            placeholder="What you sell, who you sell to, payment methods you need…"
                            className="w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none ring-primary/40 transition focus:ring-2"
                          />
                        </div>
                        <label className="flex items-start gap-2 text-xs text-muted-foreground sm:col-span-2">
                          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[oklch(0.68_0.18_250)]" />
                          <span>
                            I confirm the submitted business information is accurate and the business
                            operates in accordance with applicable laws.
                          </span>
                        </label>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        disabled={step === 0}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:invisible"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <Button
                        type="submit"
                        disabled={!canNext}
                        className="bg-gradient-to-r from-primary to-electric-glow px-6 text-primary-foreground"
                      >
                        {step === 0 ? "Continue" : "Submit Inquiry"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Applications are reviewed based on business profile, jurisdiction, partner availability, and compliance requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Done() {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/40">
        <Check className="h-7 w-7 text-emerald-400" />
      </div>
      <div className="mt-4 text-xl font-semibold">Inquiry received</div>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        A BoxCharge specialist will reach out via your preferred channel from a boxchrge.com address.
      </p>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-foreground/80">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        maxLength={255}
        className="w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none ring-primary/40 transition focus:ring-2"
      />
    </div>
  );
}
