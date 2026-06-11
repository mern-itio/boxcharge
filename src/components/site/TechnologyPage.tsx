import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "./PageHero";
import { Section, CapabilityCards, FAQAccordion, CtaBanner } from "./PageBlocks";

export interface TechnologyPageConfig {
  eyebrow: string;
  title: string;
  summary: string;
  breadcrumbs: Array<{ name: string; path: string }>;
  overview: string;
  howItWorks: Array<{ title: string; body: string }>;
  useCases: string[];
  securityBenefits: string[];
  faq: Array<{ q: string; a: string }>;
}

export function TechnologyPage({ config }: { config: TechnologyPageConfig }) {
  const cmsSlug = config.breadcrumbs[config.breadcrumbs.length - 1]?.path.replace(/^\//, "");
  return (
    <>
      <PageHero
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.summary}
        breadcrumbs={config.breadcrumbs}
        primaryCta={{ label: "Talk to a Specialist", href: "/contact" }}
        cmsSlug={cmsSlug}
      />

      <CmsHtmlBody slug={cmsSlug}>
      <Section eyebrow="Overview" title={config.title + " Overview"}>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{config.overview}</p>
      </Section>

      <Section eyebrow="How It Works" title="Inside the Layer">
        <CapabilityCards items={config.howItWorks} />
      </Section>

      <Section eyebrow="Use Cases" title="Where It Applies">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {config.useCases.map((u) => (
            <div key={u} className="glass rounded-xl px-4 py-3 text-sm text-foreground/85">{u}</div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Security" title="Security Benefits">
        <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
          {config.securityBenefits.map((s) => (
            <li key={s} className="text-sm text-foreground/85">• {s}</li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="FAQ" title="Frequently Asked Questions">
        <FAQAccordion items={config.faq} />
      </Section>

      <CtaBanner
        title="Explore BoxCharge Technology"
        body="See how our infrastructure layers fit your payment operations."
        cta={{ label: "Request Consultation", href: "/contact" }}
      />
      </CmsHtmlBody>
    </>
  );
}
