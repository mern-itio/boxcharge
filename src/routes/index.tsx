import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Route as RouteIcon } from "lucide-react";
import { pageContentQuery, useContent } from "@/hooks/useContent";
import { GlobeVisual } from "@/components/site/GlobeVisual";
import {
  Solutions,
  Routing,
  Security,
  APM,
  Developers,
  Why,
} from "@/components/site/Sections";
import { StatsStrip } from "@/components/site/StatsStrip";
import { PartnerWall } from "@/components/site/PartnerWall";
import { LogoWall } from "@/components/site/LogoWall";
import { Industries } from "@/components/site/Industries";
import { Testimonials } from "@/components/site/Testimonials";
import { RoiCalculator } from "@/components/site/RoiCalculator";
import { CoverageMap } from "@/components/site/CoverageMap";
import { MiniCta } from "@/components/site/MiniCta";
import { Compare } from "@/components/site/Compare";
import { Insights } from "@/components/site/Insights";
import { Particles } from "@/components/site/Particles";
import { LaunchCta } from "@/components/site/LaunchCta";
import { ConsoleTour } from "@/components/site/ConsoleTour";
import { CheckoutTour } from "@/components/checkout-demo";
import { PayinPayoutExplainer } from "@/components/site/PayinPayoutExplainer";
import { TransactionFlow } from "@/components/site/TransactionFlow";
import { SecurityBadges } from "@/components/site/SecurityBadges";
import { FAQ } from "@/components/site/FAQ";
import {
  IndustrySwitcher,
  useIndustryState,
} from "@/components/site/IndustrySwitcher";
import { ClientOnly } from "@/components/site/ClientOnly";
import { Button } from "@/components/ui/button";
import { buildHead } from "@/components/seo/buildHead";
import { useHomeSections } from "@/lib/homeCms";

import { pageSeoDefaults } from "@/content/seoCopy";

const DEFAULT_SEO = pageSeoDefaults.home;

export const Route = createFileRoute("/")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageContentQuery("home")),
  head: ({ loaderData }) => {
    const map = (loaderData ?? {}) as Record<string, unknown>;
    const title = String(map.meta_title || DEFAULT_SEO.title);
    const description = String(map.meta_description || DEFAULT_SEO.description);
    return buildHead({
      title,
      description,
      path: "/",
      keywords: DEFAULT_SEO.keywords,
    });
  },
  component: Home,
});

function Home() {
  const { c, isVisible, fullHtml } = useHomeSections();

  if (fullHtml) {
    return (
      <div
        className="prose prose-invert mx-auto max-w-7xl px-4 pt-32 pb-20 prose-headings:font-semibold prose-a:text-primary sm:pt-40"
        dangerouslySetInnerHTML={{ __html: fullHtml }}
      />
    );
  }

  return (
    <>
      <Hero />
      {isVisible("logo_wall") && <LogoWall />}
      {isVisible("stats") && <StatsStrip />}
      {isVisible("partner_wall") && <PartnerWall />}
      {isVisible("solutions") && <Solutions />}
      {isVisible("mini_cta_1") && (
        <MiniCta
          text={c(
            "mini_cta_1_text",
            "Not sure which solution fits your business? Our specialists will map it out for you.",
          )}
          cta={c("mini_cta_1_label", "Talk to a Payment Specialist")}
        />
      )}
      {isVisible("payin_payout") && <PayinPayoutExplainer />}
      {isVisible("routing") && <Routing />}
      {isVisible("transaction_flow") && <TransactionFlow />}
      {isVisible("console_tour") && <ConsoleTour />}
      {isVisible("security_badges") && <SecurityBadges />}
      {isVisible("coverage_map") && <CoverageMap />}
      {isVisible("industries") && <Industries />}
      {isVisible("testimonials") && <Testimonials />}
      {isVisible("mini_cta_2") && (
        <MiniCta
          text={c(
            "mini_cta_2_text",
            "Operating in a specific region or industry? Let's discuss the right setup.",
          )}
          cta={c("mini_cta_2_label", "Request a Consultation")}
        />
      )}
      {isVisible("roi") && <RoiCalculator />}
      {isVisible("security") && <Security />}
      {isVisible("compare") && <Compare />}
      {isVisible("apm") && <APM />}
      {isVisible("checkout_tour") && <CheckoutTour />}
      {isVisible("developers") && <Developers />}
      {isVisible("why") && <Why />}
      {isVisible("insights") && <Insights />}
      {isVisible("launch") && <LaunchCta />}
      {isVisible("faq") && <FAQ />}
    </>
  );
}

const DEFAULT_HEADLINE = ["Accept", "Payments", "Anywhere", "Your", "Customers", "Are."];
const DEFAULT_BADGE_LINES = [
  "Trusted by merchants in 50+ countries",
  "$2.4B+ in annual routed volume",
  "70+ acquiring & APM partners",
  "One API · Many Payments · Built Global",
];

function Hero() {
  const { c } = useContent("home");
  const { industry, setIndustry, data } = useIndustryState();
  const Icon = data.icon;
  const cmsHeadline = c("hero_headline", "");
  const cmsSubtitle = c("hero_subheadline", "");
  const tagline = c(
    "hero_tagline",
    "Onshore, offshore and cross-border merchant accounts — one orchestration layer.",
  );
  const primaryLabel = c("hero_cta_primary_label", "Get a Custom Plan");
  const primaryHref = c("hero_cta_primary_href", "/contact");
  const secondaryLabel = c("hero_cta_secondary_label", "Explore Solutions");
  const secondaryHref = c("hero_cta_secondary_href", "#solutions");

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="grid-bg absolute inset-0" />
      <Particles count={24} />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-3 sm:px-4">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <RotatingBadge />

            <IndustrySwitcher value={industry} onChange={setIndustry} />

            <h1 className="font-display text-[clamp(1.75rem,7.5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight">
              {cmsHeadline ? (
                <span className="gradient-text break-words">{cmsHeadline}</span>
              ) : (
                <>
                  {DEFAULT_HEADLINE.slice(0, 2).map((w, i) => (
                    <span
                      key={`a-${w}`}
                      className="word-rise gradient-text mr-1.5 inline-block break-words sm:mr-2 lg:mr-3"
                      style={{ animationDelay: `${120 + i * 90}ms` }}
                    >
                      {w}
                    </span>
                  ))}
                  <br className="hidden min-[420px]:block" />
                  {DEFAULT_HEADLINE.slice(2).map((w, i) => (
                    <span
                      key={`b-${w}`}
                      className="word-rise mr-1.5 inline-block break-words text-foreground sm:mr-2 lg:mr-3"
                      style={{ animationDelay: `${360 + i * 90}ms` }}
                    >
                      {w}
                    </span>
                  ))}
                </>
              )}
            </h1>

            <p
              key={industry}
              className="reveal-init reveal-fade reveal-in mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {cmsSubtitle || data.sub}
            </p>
            <p className="reveal-init reveal-fade reveal-in mt-3 max-w-xl text-sm text-foreground/75">
              {tagline}
            </p>

            <div
              className="word-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "940ms" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-electric-glow px-6 text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.68_0.18_250/0.7)] hover:opacity-90"
              >
                {primaryHref.startsWith("/") ? (
                  <Link to={primaryHref}>
                    {primaryLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a href={primaryHref}>
                    {primaryLabel} <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border bg-card/50 text-foreground hover:bg-card"
              >
                {secondaryHref.startsWith("/") ? (
                  <Link to={secondaryHref}>{secondaryLabel}</Link>
                ) : (
                  <a href={secondaryHref}>{secondaryLabel}</a>
                )}
              </Button>
            </div>

            <LiveTicker />

            <div
              key={`chips-${industry}`}
              className="reveal-init reveal-fade reveal-in mt-8 grid max-w-xl grid-cols-1 gap-3 min-[420px]:grid-cols-3"
            >
              {data.chips.map((t, i) => {
                const ChipIcon = i === 0 ? Icon : i === 1 ? RouteIcon : ShieldCheck;
                return (
                  <div key={t} className="glass card-lift rounded-xl px-3 py-3">
                    <ChipIcon className="h-4 w-4 text-primary" />
                    <div className="mt-2 text-[12px] font-medium leading-tight text-foreground/85">
                      {t}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <GlobeVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function RotatingBadge() {
  const { c } = useContent("home");
  const cmsLines = c<Array<{ text?: string }>>("badge_lines", []);
  const lines =
    cmsLines.length > 0
      ? cmsLines.map((l) => l.text ?? "").filter(Boolean)
      : DEFAULT_BADGE_LINES;
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % lines.length), 3500);
    return () => clearInterval(id);
  }, [lines.length]);
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-foreground/80">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
      <span key={i} className="reveal-init reveal-fade reveal-in">
        {lines[i]}
      </span>
    </div>
  );
}

function LiveTicker() {
  return (
    <ClientOnly
      fallback={
        <div className="mt-6 flex min-h-[34px] flex-wrap items-center gap-2" aria-hidden />
      }
    >
      <LiveTickerInner />
    </ClientOnly>
  );
}

function LiveTickerInner() {
  // Seed today's count based on seconds elapsed in UTC day so SSR + client roughly agree
  const [n, setN] = useState(() => {
    const now = new Date();
    const utcSecs =
      now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds();
    // ~average 230 tx/s baseline
    return Math.floor(utcSecs * 230);
  });
  const [clock, setClock] = useState(() => fmtUtc(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const utcSecs =
        now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds();
      setClock(fmtUtc(now));
      // Reset at UTC midnight
      if (utcSecs < 2) {
        setN(Math.floor(10 + Math.random() * 440));
      } else {
        setN((v) => v + Math.floor(10 + Math.random() * 441));
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span>
          Live · <span className="font-mono text-foreground/80">UTC {clock}</span> ·{" "}
          <span className="font-medium text-foreground tabular-nums">{n.toLocaleString("en-US")}</span>{" "}
          routed today
        </span>
      </div>
      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Operational · 99.98% uptime (30d)
      </div>
    </div>
  );
}

function fmtUtc(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

