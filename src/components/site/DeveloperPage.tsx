import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "./PageHero";
import { Section, CapabilityCards, FAQAccordion, CtaBanner } from "./PageBlocks";

export interface DeveloperPageConfig {
  eyebrow: string;
  title: string;
  summary: string;
  breadcrumbs: Array<{ name: string; path: string }>;
  overview: string;
  flow: Array<{ title: string; body: string }>;
  sampleTitle: string;
  sampleCode: string;
  securityNotes: string[];
  authentication: string;
  implementationNotes: string[];
  faq: Array<{ q: string; a: string }>;
}

export function DeveloperPage({ config }: { config: DeveloperPageConfig }) {
  const cmsSlug = config.breadcrumbs[config.breadcrumbs.length - 1]?.path.replace(/^\//, "");
  return (
    <>
      <PageHero
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.summary}
        breadcrumbs={config.breadcrumbs}
        primaryCta={{ label: "Talk to Integration Team", href: "/contact" }}
        cmsSlug={cmsSlug}
      />

      <CmsHtmlBody slug={cmsSlug}>
      <Section eyebrow="Overview" title="Overview">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{config.overview}</p>
      </Section>

      <Section eyebrow="Integration" title="Integration Flow">
        <CapabilityCards items={config.flow} />
      </Section>

      <Section eyebrow="Sample" title="Request / Response">
        <div className="glass-strong overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3 text-xs text-muted-foreground">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <span className="ml-2">{config.sampleTitle}</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-foreground/85">
{config.sampleCode}
          </pre>
        </div>
      </Section>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 pb-8 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold">Authentication</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{config.authentication}</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold">Security Notes</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {config.securityNotes.map((s) => <li key={s}>• {s}</li>)}
          </ul>
        </div>
      </div>

      <Section eyebrow="Notes" title="Implementation Notes">
        <ul className="space-y-2 text-sm text-foreground/85">
          {config.implementationNotes.map((n) => <li key={n}>• {n}</li>)}
        </ul>
      </Section>

      <Section eyebrow="FAQ" title="Developer FAQ">
        <FAQAccordion items={config.faq} />
      </Section>

      <CtaBanner
        title="Start Building With BoxCharge"
        cta={{ label: "Request Integration Access", href: "/contact" }}
      />
      </CmsHtmlBody>
    </>
  );
}
