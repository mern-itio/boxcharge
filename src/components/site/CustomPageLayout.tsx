import { customPagePath } from "@/lib/customPagePath";
import { PageHero } from "./PageHero";
import { Section, CapabilityCards, ProcessFlow, FAQAccordion, CtaBanner } from "./PageBlocks";

export interface CustomPageData {
  title: string;
  slug: string;
  excerpt?: string | null;
  content_html?: string | null;
  featured_image_url?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

function defaultSubtitle(title: string, excerpt?: string | null) {
  if (excerpt?.trim()) return excerpt;
  return `${title} through BoxCharge — secure payment processing, intelligent routing, and global merchant infrastructure for cross-border businesses.`;
}

function defaultCapabilities(title: string) {
  return [
    {
      title: "Secure Processing",
      body: `Accept ${title} with PCI-aligned infrastructure, 3DS authentication, and real-time transaction monitoring.`,
    },
    {
      title: "Global Reach",
      body: "Route payments across multiple acquirers and corridors with multi-currency settlement support.",
    },
    {
      title: "Developer-Ready",
      body: "Integrate via S2S API, hosted checkout, or webhooks — with sandbox access during onboarding.",
    },
  ];
}

const DEFAULT_STEPS = [
  "Share your business profile and corridors",
  "Receive a tailored routing and setup proposal",
  "Complete onboarding and compliance review",
  "Go live with production credentials",
];

const DEFAULT_FAQ = [
  {
    q: "How do I get started?",
    a: "Submit an application through our contact page. A BoxCharge specialist will review your profile and respond with a tailored setup recommendation.",
  },
  {
    q: "Which regions are supported?",
    a: "Coverage depends on merchant profile, jurisdiction, and partner availability. We support multiple global corridors subject to onboarding review.",
  },
  {
    q: "Is there a sandbox environment?",
    a: "Yes. Sandbox credentials are provided during integration coordination so your team can test before going live.",
  },
];

export function CustomPageLayout({ page }: { page: CustomPageData }) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: page.title, path: customPagePath(page.slug) },
  ];
  const rawHtml = page.content_html?.trim() ?? "";
  const hasRichContent = rawHtml.length > 0 && stripHtml(rawHtml).length >= 60;
  const subtitle = defaultSubtitle(page.title, page.excerpt);

  return (
    <>
      <PageHero
        eyebrow="Payment Solutions"
        title={page.title}
        subtitle={subtitle}
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Consultation", href: "/contact" }}
        secondaryCta={{ label: "Apply Now", href: "/contact#apply" }}
      />

      {page.featured_image_url && (
        <div className="mx-auto -mt-6 max-w-5xl px-4 pb-4">
          <img
            src={page.featured_image_url}
            alt={page.title}
            className="w-full rounded-2xl border border-border/60 object-cover shadow-lg max-h-[420px]"
            loading="eager"
          />
        </div>
      )}

      {hasRichContent ? (
        <Section eyebrow="Overview" title={`About ${page.title}`}>
          <div className="mx-auto max-w-3xl">
            <div
              className="prose prose-invert max-w-none text-base leading-relaxed text-muted-foreground prose-headings:font-semibold prose-headings:text-foreground prose-a:text-primary prose-li:text-muted-foreground prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: rawHtml }}
            />
          </div>
        </Section>
      ) : (
        <>
          <Section eyebrow="Overview" title="What This Solution Supports">
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
              {page.excerpt?.trim() ||
                `BoxCharge enables merchants to accept and process ${page.title} through a single secure payment layer — combining gateway connectivity, smart routing, and compliance-aware onboarding.`}
            </p>
            {rawHtml && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {stripHtml(rawHtml)}
              </p>
            )}
          </Section>

          <Section eyebrow="Capabilities" title="Key Capabilities">
            <CapabilityCards items={defaultCapabilities(page.title)} />
          </Section>

          <Section
            eyebrow="Process"
            title="How It Works"
            subtitle="Onboarding is structured around documentation review and partner availability."
          >
            <ProcessFlow steps={DEFAULT_STEPS} />
          </Section>

          <Section eyebrow="FAQ" title="Frequently Asked Questions">
            <FAQAccordion items={DEFAULT_FAQ} />
          </Section>
        </>
      )}

      <CtaBanner
        title="Start Your Payment Conversation"
        body="Speak with a BoxCharge payment specialist to discuss your requirements."
        cta={{ label: "Request Consultation", href: "/contact" }}
      />
    </>
  );
}
