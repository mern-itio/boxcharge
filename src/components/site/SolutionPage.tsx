import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "./PageHero";
import { Section, CapabilityCards, ProcessFlow, FAQAccordion, CtaBanner } from "./PageBlocks";
import { Check } from "lucide-react";

export interface SolutionPageConfig {
  eyebrow: string;
  title: string;
  summary: string;
  breadcrumbs: Array<{ name: string; path: string }>;
  supports: string;
  capabilities: Array<{ title: string; body: string }>;
  steps?: string[];
  techLayer: string[];
  faq: Array<{ q: string; a: string }>;
}

export function SolutionPage({ config }: { config: SolutionPageConfig }) {
  const cmsSlug = config.breadcrumbs[config.breadcrumbs.length - 1]?.path.replace(/^\//, "");
  return (
    <>
      <PageHero
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.summary}
        breadcrumbs={config.breadcrumbs}
        primaryCta={{ label: "Request Consultation", href: "/contact" }}
        secondaryCta={{ label: "Apply Now", href: "/contact#apply" }}
        cmsSlug={cmsSlug}
      />

      <CmsHtmlBody slug={cmsSlug}>
      <Section eyebrow="Overview" title="What This Solution Supports">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{config.supports}</p>
      </Section>

      <Section eyebrow="Capabilities" title="Key Capabilities">
        <CapabilityCards items={config.capabilities} />
      </Section>

      {config.steps && (
        <Section
          eyebrow="Process"
          title="How It Works"
          subtitle="Onboarding is structured around documentation review and partner availability. Activation is subject to onboarding and partner review."
        >
          <ProcessFlow steps={config.steps} />
        </Section>
      )}

      <Section eyebrow="Technology" title="Technology Layer" subtitle="Applicable infrastructure components powering this solution.">
        <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
          {config.techLayer.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-foreground/85">{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="FAQ" title="Frequently Asked Questions">
        <FAQAccordion items={config.faq} />
      </Section>

      <CtaBanner
        title="Start Your Payment Conversation"
        body="Speak with a BoxCharge payment specialist to discuss your requirements."
        cta={{ label: "Request Consultation", href: "/contact" }}
      />
      </CmsHtmlBody>
    </>
  );
}
