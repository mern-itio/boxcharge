import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const quotes = [
  {
    body: "BoxCharge gave us one integration to reach customers across three continents. Our APAC approval rate moved meaningfully within the first quarter.",
    role: "Head of Payments",
    industry: "Cross-Border SaaS",
    region: "Berlin, DE",
  },
  {
    body: "The orchestration layer quietly does what we used to assemble out of three different acquirer relationships. Operations is calmer, finance is happier.",
    role: "VP Finance",
    industry: "Travel & Hospitality",
    region: "Dubai, AE",
  },
  {
    body: "Onboarding was structured, the technical handoff was clean, and the APM coverage is exactly what our LATAM checkout needed.",
    role: "Director of Engineering",
    industry: "Marketplace Platform",
    region: "São Paulo, BR",
  },
  {
    body: "Smart routing recovered roughly 5% of our previously declined card volume in the first two months. The cascade rules are easy to reason about.",
    role: "CFO",
    industry: "D2C Subscription Brand",
    region: "London, UK",
  },
  {
    body: "We finally have one settlement view across SEPA, PayNow and local cards. Reconciliation went from a two-day job to a coffee-break job.",
    role: "Head of Finance Operations",
    industry: "B2B SaaS",
    region: "Singapore, SG",
  },
  {
    body: "The team understood our risk profile from day one and matched us with the right acquiring partners. No wasted onboarding cycles.",
    role: "Founder & CEO",
    industry: "Digital Education Platform",
    region: "Amsterdam, NL",
  },
  {
    body: "Their fraud and 3DS2 layer caught patterns our previous setup missed, without a hit to conversion. That's the part most providers get wrong.",
    role: "Head of Risk",
    industry: "Online Travel Agency",
    region: "Istanbul, TR",
  },
  {
    body: "We pay out to suppliers in six currencies through one balance. SEPA Instant credits and Faster Payments to the UK are a quiet game-changer for us.",
    role: "Finance Director",
    industry: "Cross-Border B2B Wholesale",
    region: "Hong Kong, HK",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 6500);
    return () => clearInterval(id);
  }, []);
  const q = quotes[i];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> What clients say
          </div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            <span className="gradient-text">Trusted by Teams Moving Global Payments</span>
          </h2>
        </div>

        <div className="glass-strong gradient-border relative mt-12 overflow-hidden rounded-3xl p-8 sm:p-12">
          <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/20" />
          <div key={i} className="reveal-init reveal-fade reveal-in">
            <p className="font-display text-xl leading-relaxed text-foreground/95 sm:text-2xl">
              "{q.body}"
            </p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{q.role}</div>
                <div className="text-xs text-muted-foreground">
                  {q.industry} · {q.region}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setI((v) => (v - 1 + quotes.length) % quotes.length)}
                  className="glass grid h-9 w-9 place-items-center rounded-full transition-colors hover:text-primary"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-1.5">
                  {quotes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setI(idx)}
                      aria-label={`Quote ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === i ? "w-6 bg-primary" : "w-1.5 bg-border"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setI((v) => (v + 1) % quotes.length)}
                  className="glass grid h-9 w-9 place-items-center rounded-full transition-colors hover:text-primary"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
