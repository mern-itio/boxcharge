import { Breadcrumbs } from "./Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/hooks/useContent";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** CMS page slug. When set, hero text + CTA labels can be overridden from /admin. */
  cmsSlug?: string;
  /** Tighter bottom spacing — for article/detail pages with content directly below. */
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  cmsSlug,
  compact = false,
}: PageHeroProps) {
  const { c } = useContent(cmsSlug ?? "__none__");

  const finalEyebrow = c("hero_eyebrow", eyebrow ?? "");
  const finalTitle = c("hero_headline", title);
  const finalSubtitle = c("hero_subheadline", subtitle ?? "");
  const finalPrimary = primaryCta
    ? {
        label: c("hero_cta_primary_label", primaryCta.label),
        href: c("hero_cta_primary_href", primaryCta.href),
      }
    : undefined;
  const finalSecondary = secondaryCta
    ? {
        label: c("hero_cta_secondary_label", secondaryCta.label),
        href: c("hero_cta_secondary_href", secondaryCta.href),
      }
    : undefined;

  return (
    <section
      className={`relative overflow-hidden pt-32 sm:pt-40 ${
        compact ? "pb-6 sm:pb-8" : "pb-16 sm:pb-20"
      }`}
    >
      <div className="grid-bg absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {finalEyebrow && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {finalEyebrow}
          </div>
        )}
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <span className="gradient-text">{finalTitle}</span>
        </h1>
        {finalSubtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {finalSubtitle}
          </p>
        )}
        {(finalPrimary || finalSecondary) && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {finalPrimary && (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-electric-glow px-6 text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.68_0.18_250/0.7)] hover:opacity-90"
              >
                <a href={finalPrimary.href}>
                  {finalPrimary.label} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            )}
            {finalSecondary && (
              <Button asChild variant="outline" size="lg" className="border-border bg-card/50">
                <a href={finalSecondary.href}>{finalSecondary.label}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
